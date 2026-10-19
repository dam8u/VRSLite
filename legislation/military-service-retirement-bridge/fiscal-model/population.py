"""
Deliverable 2 — affected-population estimate, FY2029 through FY2038.

Builds a single-age by single-service active-member grid from the published
VRS age x service tabulations (SRC-18), infers benefit structure from completed
service (ASM-10), calibrates to the published plan split (SRC-16 / ASM-11),
constructs a political subdivision grid (ASM-12), rolls the closed Plan 1 and
Plan 2 cohorts forward (ASM-13), and applies the statutory screens in
§ 51.1-142.4 B and C.

Illustrative. Not an actuarial certification.
"""
from __future__ import annotations

from collections import defaultdict

import actuarial as A
import inputs as I

# Benefit-structure boundaries in completed years of service at June 30, 2025
# (ASM-10): membership date proxies.
HYBRID_MAX_SERVICE = 11.5    # membership date on/after 1/1/2014
PLAN2_MAX_SERVICE = 17.5     # membership date 1/1/2008 - 12/31/2013
BASE_DATE_FY = 2025          # grid is as of June 30, 2025 (end of FY2025)


# ---------------------------------------------------------------------------
# Grid construction
# ---------------------------------------------------------------------------
def disaggregate(grid: dict[tuple[int, int], list[float]]
                 ) -> dict[tuple[float, float], float]:
    """Spread each (age band x service band) count uniformly over single
    age x single service cells. Cell keys are (age, service) midpoints."""
    out: dict[tuple[float, float], float] = defaultdict(float)
    for (a_lo, a_hi), row in grid.items():
        n_ages = a_hi - a_lo
        for (s_lo, s_hi), count in zip(I.SRC_18_SERVICE_BANDS, row):
            if count == 0:
                continue
            n_svc = s_hi - s_lo
            per = count / (n_ages * n_svc)
            for a in range(a_lo, a_hi):
                for s in range(s_lo, s_hi):
                    out[(a + 0.5, s + 0.5)] += per
    return dict(out)


def assign_plan(service: float) -> str:
    if service < HYBRID_MAX_SERVICE:
        return "HY"
    if service < PLAN2_MAX_SERVICE:
        return "P2"
    return "P1"


def plan_totals(cells: dict[tuple[float, float], float]) -> dict[str, float]:
    t: dict[str, float] = defaultdict(float)
    for (a, s), n in cells.items():
        t[assign_plan(s)] += n
    return dict(t)


def shift_service(cells: dict[tuple[float, float], float], target_mean: float
                  ) -> dict[tuple[float, float], float]:
    """ASM-12. Rescale the service dimension of a grid so its mean service equals
    `target_mean`, preserving the age margin and total headcount. Each member's
    service is multiplied by target_mean / current_mean and re-binned."""
    tot = sum(cells.values())
    cur = sum(s * n for (a, s), n in cells.items()) / tot
    k = target_mean / cur
    out: dict[tuple[float, float], float] = defaultdict(float)
    for (a, s), n in cells.items():
        s2 = s * k
        lo = int(s2 - 0.5)
        frac = (s2 - 0.5) - lo
        out[(a, lo + 0.5)] += n * (1 - frac)
        out[(a, lo + 1.5)] += n * frac
    return dict(out)


# ---------------------------------------------------------------------------
# ASM-23 — service / tenure dispersion, fitted to the published plan split
# ---------------------------------------------------------------------------
# Benefit structure is set by MEMBERSHIP DATE, i.e. by tenure, while the
# published grid tabulates TOTAL SERVICE. The two differ in both directions:
#   tenure > service  for part-time service, breaks in service, leave, and
#                     refunded service not repurchased;
#   tenure < service  for purchased prior service, military purchases under
#                     § 51.1-142.2, and prior non-contiguous VRS service.
# Rather than leave this as a free calibration factor, the model treats
#     tenure = total service + D,      D = mu + sigma * Z
# with Z a fixed five-point discrete kernel, and FITS (mu, sigma) so that the
# derived system-wide Plan 1 / Plan 2 / Hybrid split reproduces the published
# split (SRC-16). Two parameters, two independent share targets.
_Z = [(-2.0, 0.10), (-1.0, 0.20), (0.0, 0.40), (1.0, 0.20), (2.0, 0.10)]


def _plan_weights(service: float, mu: float, sigma: float) -> dict[str, float]:
    """P(benefit structure | observed total service), under ASM-23."""
    w: dict[str, float] = defaultdict(float)
    for z, pz in _Z:
        tenure = service + mu + sigma * z
        if tenure < HYBRID_MAX_SERVICE:
            w["HY"] += pz
        elif tenure < PLAN2_MAX_SERVICE:
            w["P2"] += pz
        else:
            w["P1"] += pz
    return dict(w)


def _derived_split(grids: dict, mu: float, sigma: float) -> dict[str, float]:
    t: dict[str, float] = defaultdict(float)
    for g in grids.values():
        for (a, s), n in g.items():
            for plan, w in _plan_weights(s, mu, sigma).items():
                t[plan] += n * w
    return dict(t)


def _fit_dispersion(grids: dict) -> tuple[float, float, dict]:
    """Grid-search (mu, sigma) to match the published plan shares (SRC-16)."""
    tot = sum(sum(g.values()) for g in grids.values())
    target = {k: I.SRC_16_ACTIVE_BY_PLAN[k] / I.SRC_16_ACTIVE_TOTAL * tot
              for k in ("P1", "P2", "HY")}
    best = None
    mu = -6.0
    while mu <= 6.0001:
        sigma = 0.0
        while sigma <= 6.0001:
            d = _derived_split(grids, mu, sigma)
            err = sum((d.get(k, 0.0) - target[k]) ** 2 for k in ("P1", "P2"))
            if best is None or err < best[0]:
                best = (err, mu, sigma, d)
            sigma += 0.25
        mu += 0.25
    err, mu, sigma, d = best
    return mu, sigma, {"target": target, "fitted": d, "sse": err}


def build_grids(fit: bool = True) -> tuple[dict, dict]:
    """Returns ({employer: {(age, service, plan): count}}, reconciliation_info)."""
    st = disaggregate(I.SRC_18_GRID_STATE)
    tc = disaggregate(I.SRC_18_GRID_TEACHER)

    # ASM-12: political subdivision grid from the state shape, scaled to the
    # published political subdivision headcount and mean service.
    ps_scale = I.SRC_15_PLANS["PS"]["active"] / I.SRC_15_PLANS["ST"]["active"]
    ps = {k: v * ps_scale for k, v in st.items()}
    ps = shift_service(ps, I.SRC_15_PLANS["PS"]["avg_service"])
    raw = {"ST": st, "TC": tc, "PS": ps}

    hard = defaultdict(float)
    for g in raw.values():
        for k, v in plan_totals(g).items():
            hard[k] += v

    if fit:
        mu, sigma, info = _fit_dispersion(raw)
    else:
        mu, sigma, info = 0.0, 0.0, {"target": {}, "fitted": dict(hard), "sse": 0.0}

    # Expand each cell into plan-specific sub-cells.
    grids: dict[str, dict[tuple[float, float, str], float]] = {}
    for emp, g in raw.items():
        cells: dict[tuple[float, float, str], float] = defaultdict(float)
        for (a, s), n in g.items():
            for plan, w in _plan_weights(s, mu, sigma).items():
                if w > 0:
                    cells[(a, s, plan)] += n * w
        grids[emp] = dict(cells)

    recon = {
        "hard_rule_P1": hard["P1"], "hard_rule_P2": hard["P2"],
        "hard_rule_HY": hard["HY"], "grid_total": sum(hard.values()),
        "published_P1": I.SRC_16_ACTIVE_BY_PLAN["P1"],
        "published_P2": I.SRC_16_ACTIVE_BY_PLAN["P2"],
        "published_HY": I.SRC_16_ACTIVE_BY_PLAN["HY"],
        "published_total": I.SRC_16_ACTIVE_TOTAL,
        "excluded_systems_active": (I.SRC_17_ACTIVE_BY_SYSTEM["SPORS"]
                                    + I.SRC_17_ACTIVE_BY_SYSTEM["VaLORS"]
                                    + I.SRC_17_ACTIVE_BY_SYSTEM["JRS"]),
        "fitted_mu": mu, "fitted_sigma": sigma,
        "fit_target": info["target"], "fit_result": info["fitted"],
        "fit_sse": info["sse"],
    }
    return grids, recon


# ---------------------------------------------------------------------------
# Statutory screens — § 51.1-142.4 B and C
# ---------------------------------------------------------------------------
def already_unreduced(plan: str, age: float, service: float) -> bool:
    """§ 51.1-142.4 B 5. Determined without regard to any eligibility credit."""
    if plan == "P1":
        return (age >= I.SRC_13_P1_NRA and service >= 5.0) or \
               (age >= 50.0 and service >= 30.0)
    nra = A.ssa_nra(None)   # 67 for anyone born 1960 or later
    return (age >= nra and service >= 5.0) or (age + service >= 90.0)


def deficit(plan: str, age: float, service: float) -> float:
    """§ 51.1-142.4 C 1."""
    if plan == "P1":
        return 30.0 - service
    return 90.0 - (age + service)


def bridge_eligible(plan: str, age: float, service: float,
                    include_hybrid: bool) -> tuple[bool, float]:
    """Applies § 51.1-142.4 B 1, B 3, B 5, B 6 and C. Returns
    (eligible, deficit). Does not apply the qualifying-service or
    military-retired-pay screens, which are population factors, not cell tests."""
    if plan == "HY" and not include_hybrid:
        return False, 0.0
    if service < 5.0:                                    # B 3
        return False, 0.0
    if already_unreduced(plan, age, service):            # B 5
        return False, 0.0
    d = deficit(plan, age, service)
    if d <= 0.0:                                         # B 6 / C 5
        return False, 0.0
    return True, d


# ---------------------------------------------------------------------------
# Cohort projection
# ---------------------------------------------------------------------------
def project(grids: dict, include_hybrid: bool = False,
            other_decrement: float = 0.03,
            band: float = 4.0) -> dict:
    """Roll the June 30, 2025 grid forward to each fiscal year end and count
    bridge-eligible members whose deficit is at or below `band`.

    Plan 1 and Plan 2 are closed benefit structures, so no new entrants are
    added to them (ASM-13). Hybrid is open, but the published grid already
    contains every hybrid member who can reach the Rule-of-90 band inside the
    projection horizon, because a hybrid member needs more than 19 years of
    service to reach 86 points before Social Security normal retirement age.
    """
    out: dict[int, dict] = {}
    cur = {emp: dict(g) for emp, g in grids.items()}
    prev_band: dict[str, float] = defaultdict(float)

    for fy in range(BASE_DATE_FY + 1, max(I.SCN_PROJECTION_FY) + 1):
        nxt: dict[str, dict] = {}
        for emp, cells in cur.items():
            nc: dict[tuple[float, float, str], float] = defaultdict(float)
            for (a, s, plan), n in cells.items():
                surv = 1.0 - other_decrement
                # published retirement decrement once unreduced-eligible
                if already_unreduced(plan, a, s):
                    r = (I.SRC_23_P1_RET_RATE_AGE50_30YRS["M"]
                         + I.SRC_23_P1_RET_RATE_AGE50_30YRS["F"]) / 2 \
                        if plan == "P1" else I.SRC_23_P2_RET_RATE_AT_RULE90
                    surv *= 1.0 - r
                if a + 1 > 75:
                    continue
                nc[(a + 1.0, s + 1.0, plan)] += n * surv
            nxt[emp] = dict(nc)
        cur = nxt

        if fy not in I.SCN_PROJECTION_FY:
            continue

        rec: dict = {"fy": fy, "by_employer": {}, "total_in_band": 0.0,
                     "total_in_band_B2": 0.0, "total_in_band_B3": 0.0,
                     "new_entrants": 0.0}
        for emp, cells in cur.items():
            agg: dict = {"B2": 0.0, "B3": 0.0,
                         "by_plan": defaultdict(float),
                         "deficit_weighted": 0.0, "mean_age": 0.0,
                         "mean_service": 0.0}
            for (a, s, plan), n in cells.items():
                ok, d = bridge_eligible(plan, a, s, include_hybrid)
                if not ok or d > band:
                    continue
                path = "B2" if plan == "P1" else "B3"
                agg[path] += n
                agg["by_plan"][plan] += n
                agg["deficit_weighted"] += n * min(d, band)
                agg["mean_age"] += n * a
                agg["mean_service"] += n * s
            tot = agg["B2"] + agg["B3"]
            if tot:
                agg["mean_deficit"] = agg["deficit_weighted"] / tot
                agg["mean_age"] /= tot
                agg["mean_service"] /= tot
            else:
                agg["mean_deficit"] = 0.0
            agg["by_plan"] = dict(agg["by_plan"])
            agg["total"] = tot
            # flow of members newly entering the band this fiscal year
            agg["new"] = max(0.0, tot - prev_band[emp] * (1.0 - other_decrement))
            prev_band[emp] = tot
            rec["by_employer"][emp] = agg
            rec["total_in_band"] += tot
            rec["total_in_band_B2"] += agg["B2"]
            rec["total_in_band_B3"] += agg["B3"]
            rec["new_entrants"] += agg["new"]
        out[fy] = rec
    return out


# ---------------------------------------------------------------------------
# Veteran / purchasability filters
# ---------------------------------------------------------------------------
VETERAN_SHARE = {"ST": 0.060, "TC": 0.025, "PS": 0.070}      # ASM-15
VETERAN_BAND = {"low": 0.60, "central": 1.00, "high": 1.60}  # ASM-15
QUALIFYING_SHARE = {"low": 0.70, "central": 0.80, "high": 0.90}   # ASM-16
RETIRED_PAY_BAR = {"low": 0.25, "central": 0.18, "high": 0.12}    # ASM-17
                                                             # (low = most excluded)
NOT_ALREADY_BOUGHT = {"low": 0.55, "central": 0.70, "high": 0.85}  # ASM-18


def purchasable_share(employer: str, case: str = "central") -> float:
    return (VETERAN_SHARE[employer] * VETERAN_BAND[case]
            * QUALIFYING_SHARE[case]
            * (1.0 - RETIRED_PAY_BAR[case])
            * NOT_ALREADY_BOUGHT[case])
