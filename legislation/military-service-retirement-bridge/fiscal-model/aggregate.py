"""
Deliverables 3 and 4 — aggregate liability effect, employer contribution rate
impact in basis points, take-up and DECISION 4 sensitivities, and the
hybrid-inclusion variant.

The aggregate is built cell by cell from the projected age x service x plan grid
rather than by scaling a single representative profile, so that the mix of
eligibility deficits, ages and salaries in the actual near-threshold population
drives the result.

Illustrative. Not an actuarial certification.
"""
from __future__ import annotations

from collections import defaultdict
from functools import lru_cache

import actuarial as A
import inputs as I
import population as POP
import price_vs_value as PV

# ASM-22 — behavioural mix. Share of purchasers who, under current law, would
# have worked on to first unreduced eligibility and then retired (baseline WTE).
# The remainder would have separated or retired at the purchase date anyway
# (baseline SUB). This is the single most consequential assumption in the model.
PHI = {"low": 0.25, "central": 0.50, "high": 0.75}

# ASM-24 — share of service performed before January 1, 2013 for a Plan 2 cell,
# which sets the 1.70% / 1.65% multiplier blend (SRC-09). Plan 2 membership dates
# run 1 January 2008 - 31 December 2013, so pre-2013 service is 0 to 5 years;
# the midpoint is used.
P2_SVC_PRE2013 = 2.5


# ---------------------------------------------------------------------------
# Age-banded average salary from the published payroll columns (SRC-19)
# ---------------------------------------------------------------------------
def _avg_pay_by_age(grid: dict, payroll: dict) -> dict[tuple[int, int], float]:
    out = {}
    for band, pay in payroll.items():
        n = sum(grid[band])
        out[band] = pay / n if n else 0.0
    return out


_PAY_ST = _avg_pay_by_age(I.SRC_18_GRID_STATE, I.SRC_19_PAYROLL_BY_AGE_STATE)
_PAY_TC = _avg_pay_by_age(I.SRC_18_GRID_TEACHER, I.SRC_19_PAYROLL_BY_AGE_TEACHER)
_PS_RATIO = I.SRC_15_PLANS["PS"]["avg_comp"] / I.SRC_15_PLANS["ST"]["avg_comp"]


def salary_at(employer: str, age: float, years_forward: float,
              growth: float = 0.0350) -> float:
    """Average creditable compensation for a member of this age in this plan,
    from the published age-banded payroll (SRC-19), rolled forward at `growth`.
    Political subdivision pay is the state curve scaled by the ratio of published
    average compensation (ASM-12)."""
    src = _PAY_TC if employer == "TC" else _PAY_ST
    base_age = age - years_forward
    pay = None
    for (lo, hi), v in src.items():
        if lo <= base_age < hi:
            pay = v
            break
    if pay is None:
        pay = src[(70, 76)] if base_age >= 70 else src[(20, 25)]
    if employer == "PS":
        pay *= _PS_RATIO
    return pay * (1.0 + growth) ** years_forward


# ---------------------------------------------------------------------------
# Cell-level price and value, averaged over the ASM-25 qualifying-service
# distribution (which is what makes DECISION 4 rule D4b bite)
# ---------------------------------------------------------------------------
@lru_cache(maxsize=None)
def cell_result(employer: str, plan: str, age: float, service: float,
                fy: int, rule: str = "D4a",
                discount: float = I.SRC_01_INVESTMENT_RETURN,
                salary_growth: float = 0.0350,
                improvement: float = 0.0075) -> tuple:
    """Probability-weighted per-member price, SUB value, WTE value and
    contribution effects for one (age, service, plan) cell at fiscal year `fy`.
    Returns (dict, purchase_probability)."""
    path = "B2" if plan == "P1" else "B3"
    svc_pre = service if plan == "P1" else (P2_SVC_PRE2013 if plan == "P2" else 0.0)
    salary = salary_at(employer, age, fy - POP.BASE_DATE_FY, salary_growth)

    acc = defaultdict(float)
    p_buy = 0.0
    for qual, w in PV.QUALIFYING_SERVICE_DIST:
        c = PV.evaluate_case(
            employer=employer, plan=plan, path=path, age=age, service=service,
            svc_pre2013=svc_pre, salary=salary, birth_year=None, sex="B",
            rule=rule, qualifying_available=qual, valuation_year=float(fy),
            discount=discount, salary_growth=salary_growth,
            improvement=improvement)
        if c.years_purchased <= 0.0:
            continue
        p_buy += w
        acc["years_bought"] += w * c.years_purchased
        acc["price"] += w * c.price_paid
        acc["value_sub"] += w * c.value_sub
        acc["value_wte"] += w * c.value_wte
        acc["nc_offset"] += w * c.pv_total_normal_cost_forgone
        acc["pv_payroll_forgone"] += w * c.pv_payroll_forgone
        acc["acceleration"] += w * c.acceleration_years
    acc["salary"] = salary
    return dict(acc), p_buy


# ---------------------------------------------------------------------------
# Aggregate run
# ---------------------------------------------------------------------------
def run(grids: dict, projection: dict, *, include_hybrid: bool = False,
        take_up: str = "M", rule: str = "D4a", pop_case: str = "central",
        phi: float = PHI["central"], band: float = 4.0,
        refill: bool = True,
        discount: float = I.SRC_01_INVESTMENT_RETURN,
        salary_growth: float = 0.0350, improvement: float = 0.0075,
        other_decrement: float = 0.03) -> dict:
    """Aggregate the per-cell results over the projected band population.

    `refill` True means the vacated position is refilled, so employer and member
    contributions on that payroll continue and the normal-cost offset is NOT
    charged against the plan (policy-financial-analysis rule: do not count
    avoided salary as a saving unless the position is eliminated).
    """
    tu = I.SCN_TAKEUP[take_up]
    cur = {emp: dict(g) for emp, g in grids.items()}
    by_fy: dict[int, dict] = {}

    for fy in range(POP.BASE_DATE_FY + 1, max(I.SCN_PROJECTION_FY) + 1):
        nxt: dict[str, dict] = {}
        for emp, cells in cur.items():
            nc: dict = defaultdict(float)
            for (a, s, plan), n in cells.items():
                surv = 1.0 - other_decrement
                if POP.already_unreduced(plan, a, s):
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

        first_year = (fy == min(I.SCN_PROJECTION_FY))
        rec: dict = {"fy": fy, "by_employer": {}}
        for emp, cells in cur.items():
            tot = {"eligible": 0.0, "purchasable": 0.0, "purchasers": 0.0,
                   "years": 0.0, "price": 0.0, "value_sub": 0.0,
                   "value_wte": 0.0, "nc_offset": 0.0,
                   "pv_payroll_forgone": 0.0, "accel_years": 0.0,
                   "stock": 0.0, "new_in_band": 0.0}
            share = POP.purchasable_share(emp, pop_case)
            for (a, s, plan), n in cells.items():
                ok, d = POP.bridge_eligible(plan, a, s, include_hybrid)
                if not ok or d > band:
                    continue
                tot["eligible"] += n
                tot["stock"] += n
                # A member gets ONE opportunity to purchase. In the first year of
                # operation the whole accumulated stock is exposed; thereafter
                # only members who newly crossed into the band this year are,
                # since everyone else was already offered the purchase.
                was_in_band, _ = POP.bridge_eligible(plan, a - 1.0, s - 1.0,
                                                     include_hybrid)
                if was_in_band:
                    _, d_prev = POP.bridge_eligible(plan, a - 1.0, s - 1.0,
                                                    include_hybrid)
                    was_in_band = d_prev <= band
                exposed = n if (first_year or not was_in_band) else 0.0
                if exposed <= 0.0:
                    continue
                tot["new_in_band"] += 0.0 if first_year else n
                r, p_buy = cell_result(emp, plan, a, s, fy, rule,
                                       discount, salary_growth, improvement)
                if p_buy <= 0.0:
                    continue
                # `r` is already probability-weighted over ASM-25, so a cell
                # where rule D4b blocks some qualifying-service outcomes
                # contributes proportionately less.
                pool = exposed * share
                tot["purchasable"] += pool * p_buy
                tot["purchasers"] += pool * tu * p_buy
                tot["years"] += pool * tu * r["years_bought"]
                tot["price"] += pool * tu * r["price"]
                tot["value_sub"] += pool * tu * r["value_sub"]
                tot["value_wte"] += pool * tu * r["value_wte"]
                tot["nc_offset"] += pool * tu * r["nc_offset"]
                tot["pv_payroll_forgone"] += pool * tu * r["pv_payroll_forgone"]
                tot["accel_years"] += pool * tu * r["acceleration"]

            blended_value = phi * tot["value_wte"] + (1 - phi) * tot["value_sub"]
            tot["value_blended"] = blended_value
            tot["net_liability_increase"] = blended_value - tot["price"]
            charge = blended_value - tot["price"]
            if not refill:
                charge += phi * tot["nc_offset"]
            tot["net_charge_to_plan"] = charge
            rec["by_employer"][emp] = tot
        by_fy[fy] = rec

    # --- roll up to a ten-year liability and a contribution-rate impact
    rollup: dict[str, dict] = {}
    for emp in grids:
        agg = defaultdict(float)
        for fy, rec in by_fy.items():
            for k, v in rec["by_employer"][emp].items():
                if k != "scale_applied":
                    agg[k] += v
        pd = I.SRC_15_PLANS[emp]
        bp_liab = A.liability_to_basis_points(
            agg["net_liability_increase"], pd["payroll"], pd["amort_years"],
            pd["payroll_growth"])
        bp_charge = A.liability_to_basis_points(
            agg["net_charge_to_plan"], pd["payroll"], pd["amort_years"],
            pd["payroll_growth"])
        bp_sub_only = A.liability_to_basis_points(
            agg["value_sub"] - agg["price"], pd["payroll"], pd["amort_years"],
            pd["payroll_growth"])
        rollup[emp] = dict(
            agg, basis_points=bp_liab, basis_points_no_refill=bp_charge,
            basis_points_sub_only=bp_sub_only,
            payroll=pd["payroll"], er_db_rate=pd["er_db_rate"],
            amort_years=pd["amort_years"],
        )

    return {"by_fy": by_fy, "rollup": rollup,
            "params": dict(include_hybrid=include_hybrid, take_up=take_up,
                           rule=rule, pop_case=pop_case, phi=phi, band=band,
                           refill=refill, discount=discount,
                           salary_growth=salary_growth,
                           improvement=improvement,
                           other_decrement=other_decrement)}
