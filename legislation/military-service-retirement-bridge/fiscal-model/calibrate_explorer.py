#!/usr/bin/env python3
"""
Calibration export for the Legislative Scenario Explorer (MOO-257).

Re-runs the committed fiscal model and emits the baseline JSON the browser
engine is calibrated against:

  * the FY2029-FY2038 near-threshold population, split by benefit structure
    (Plan 1 / Plan 2) as well as by employer plan, which the committed tables
    report only in aggregate;
  * the cumulative purchasable pool and purchaser counts by plan;
  * the exposure-weighted mean age, service, salary and eligibility deficit of
    the members who actually buy, which are the representative-member
    parameters the browser engine evaluates;
  * the central-case aggregate price, SUB value, WTE value and basis-point
    impact, so the browser engine can be reconciled against the Python model
    cell-by-cell result rather than merely asserted to agree.

Nothing here changes the model. Every figure is derived from the committed
modules. Illustrative. Not an actuarial certification.

    python3 calibrate_explorer.py          # writes out/explorer-baseline.json
"""
from __future__ import annotations

import json
import os
from collections import defaultdict

import actuarial as A
import aggregate as AG
import inputs as I
import population as POP
import price_vs_value as PV

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
EMPLOYERS = ("ST", "TC", "PS")
PLANS = ("P1", "P2", "HY")


def exposure_cells(grids, *, include_hybrid=True, band=4.0,
                   other_decrement=0.03):
    """The exposure mix the browser engine evaluates.

    One row per (employer, benefit structure, age, service, fiscal year) cell
    that is exposed to a purchase opportunity, carrying the RAW exposed
    headcount -- before the veteran funnel and before take-up, both of which the
    browser applies live from user inputs.

    A single representative member cannot stand in for this mix: the
    early-retirement reduction and the eligibility deficit are both convex over
    it, so collapsing it to the exposure-weighted mean member misstates the
    frozen-service value by about -19% for Plan 1 and the work-to-eligibility
    value by about +25%. The browser therefore evaluates every cell.
    """
    cur = {emp: dict(g) for emp, g in grids.items()}
    rows = []
    for fy in range(POP.BASE_DATE_FY + 1, max(I.SCN_PROJECTION_FY) + 1):
        nxt = {}
        for emp, cells in cur.items():
            nc = defaultdict(float)
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
        for emp, cells in cur.items():
            for (a, s, plan), n in sorted(cells.items(), key=lambda kv: kv[0][:2]):
                ok, d = POP.bridge_eligible(plan, a, s, include_hybrid)
                if not ok or d > band:
                    continue
                was_in_band, d_prev = POP.bridge_eligible(plan, a - 1.0, s - 1.0,
                                                          include_hybrid)
                if was_in_band:
                    was_in_band = d_prev <= band
                exposed = n if (first_year or not was_in_band) else 0.0
                if exposed <= 1e-9:
                    continue
                rows.append([emp, plan, round(a, 1), round(s, 1), fy,
                             round(exposed, 6)])
    return rows


def exposure_walk(grids, *, include_hybrid=False, band=4.0, rule="D4a",
                  pop_case="central", other_decrement=0.03,
                  discount=I.SRC_01_INVESTMENT_RETURN, salary_growth=0.0350,
                  improvement=0.0075):
    """Re-walk aggregate.run's exposure loop, retaining the benefit-structure
    split and the exposure-weighted member characteristics that aggregate.run
    collapses. The cell arithmetic is aggregate.cell_result itself, so this
    cannot drift from the committed model."""
    cur = {emp: dict(g) for emp, g in grids.items()}
    # [employer][plan] -> accumulators
    acc = {e: {p: defaultdict(float) for p in PLANS} for e in EMPLOYERS}
    band_pop = {e: {p: defaultdict(float) for p in PLANS} for e in EMPLOYERS}

    for fy in range(POP.BASE_DATE_FY + 1, max(I.SCN_PROJECTION_FY) + 1):
        nxt = {}
        for emp, cells in cur.items():
            nc = defaultdict(float)
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
        for emp, cells in cur.items():
            share = POP.purchasable_share(emp, pop_case)
            for (a, s, plan), n in cells.items():
                ok, d = POP.bridge_eligible(plan, a, s, include_hybrid)
                if not ok or d > band:
                    continue
                bp = band_pop[emp][plan]
                bp["stock_%d" % fy] += n
                bp["stock_sum"] += n

                was_in_band, d_prev = POP.bridge_eligible(plan, a - 1.0, s - 1.0,
                                                          include_hybrid)
                if was_in_band:
                    was_in_band = d_prev <= band
                exposed = n if (first_year or not was_in_band) else 0.0
                if exposed <= 0.0:
                    continue
                r, p_buy = AG.cell_result(emp, plan, a, s, fy, rule, discount,
                                          salary_growth, improvement)
                if p_buy <= 0.0:
                    continue
                pool = exposed * share
                w = pool * p_buy              # purchasable weight
                g = acc[emp][plan]
                g["exposed"] += exposed
                g["purchasable"] += w
                g["years_bought"] += pool * r["years_bought"]
                g["price"] += pool * r["price"]
                g["value_sub"] += pool * r["value_sub"]
                g["value_wte"] += pool * r["value_wte"]
                g["nc_offset"] += pool * r["nc_offset"]
                g["pv_payroll_forgone"] += pool * r["pv_payroll_forgone"]
                g["accel_years"] += pool * r["acceleration"]
                # exposure-weighted member characteristics of actual buyers
                g["w_age"] += w * a
                g["w_service"] += w * s
                g["w_salary"] += w * r["salary"]
                g["w_deficit"] += w * d
    return acc, band_pop


def main() -> None:
    print("Building grids and projection (committed model)...")
    grids, recon = POP.build_grids()
    proj = POP.project(grids, include_hybrid=False)
    proj_hy = POP.project(grids, include_hybrid=True)

    print("Walking exposure with the benefit-structure split retained...")
    acc, band_pop = exposure_walk(grids)

    print("Re-running the committed aggregate for reconciliation...")
    central = AG.run(grids, proj, take_up="M", rule="D4a", pop_case="central",
                     phi=AG.PHI["central"], refill=True)

    # ---- per-plan calibration -------------------------------------------
    plans_out = {}
    for plan in ("P1", "P2"):
        tot = defaultdict(float)
        by_emp = {}
        for emp in EMPLOYERS:
            g = acc[emp][plan]
            if g["purchasable"] <= 0:
                continue
            w = g["purchasable"]
            by_emp[emp] = {
                "purchasable": w,
                "mean_age": g["w_age"] / w,
                "mean_service": g["w_service"] / w,
                "mean_salary": g["w_salary"] / w,
                "mean_deficit": g["w_deficit"] / w,
                "price_per_purchasable": g["price"] / w,
                "value_sub_per_purchasable": g["value_sub"] / w,
                "value_wte_per_purchasable": g["value_wte"] / w,
                "years_per_purchasable": g["years_bought"] / w,
                "accel_per_purchasable": g["accel_years"] / w,
                "nc_offset_per_purchasable": g["nc_offset"] / w,
                "pv_payroll_forgone_per_purchasable": g["pv_payroll_forgone"] / w,
                "payroll": I.SRC_15_PLANS[emp]["payroll"],
                "er_db_rate": I.SRC_15_PLANS[emp]["er_db_rate"],
                "member_contrib": I.SRC_15_PLANS[emp]["member_contrib"],
                "total_normal_cost": (I.SRC_15_PLANS[emp]["total_normal_cost"]
                                      or (I.SRC_15_PLANS[emp]["er_normal_cost"]
                                          + I.SRC_15_PLANS[emp]["member_contrib"])),
                "amort_years": I.SRC_15_PLANS[emp]["amort_years"],
                "payroll_growth": I.SRC_15_PLANS[emp]["payroll_growth"],
            }
            for k in ("purchasable", "years_bought", "price", "value_sub",
                      "value_wte", "nc_offset", "pv_payroll_forgone",
                      "accel_years", "w_age", "w_service", "w_salary",
                      "w_deficit"):
                tot[k] += g[k]
        w = tot["purchasable"]
        plans_out[plan] = {
            "purchasable_pool": w,
            "mean_age": tot["w_age"] / w,
            "mean_service": tot["w_service"] / w,
            "mean_salary": tot["w_salary"] / w,
            "mean_deficit": tot["w_deficit"] / w,
            "mean_years_bought": tot["years_bought"] / w,
            "mean_acceleration": tot["accel_years"] / w,
            "price_per_purchaser": tot["price"] / w,
            "value_sub_per_purchaser": tot["value_sub"] / w,
            "value_wte_per_purchaser": tot["value_wte"] / w,
            "nc_offset_per_purchaser": tot["nc_offset"] / w,
            "pv_payroll_forgone_per_purchaser": tot["pv_payroll_forgone"] / w,
            "by_employer": by_emp,
        }

    # ---- employer-plan weights used to blend payroll/rate parameters ------
    emp_weights = {}
    for plan in ("P1", "P2"):
        tot = sum(v["purchasable"] for v in plans_out[plan]["by_employer"].values())
        emp_weights[plan] = {e: v["purchasable"] / tot
                             for e, v in plans_out[plan]["by_employer"].items()}

    # ---- reconciliation against the committed aggregate ------------------
    roll = central["rollup"]
    agg_payroll = sum(I.SRC_15_PLANS[e]["payroll"] for e in EMPLOYERS)
    agg_liab = sum(roll[e]["net_liability_increase"] for e in EMPLOYERS)
    agg_bp = A.liability_to_basis_points(agg_liab, agg_payroll, 20,
                                        I.SRC_04_PAYROLL_GROWTH)
    recon_out = {
        "python_model": {
            "purchasers": sum(roll[e]["purchasers"] for e in EMPLOYERS),
            "purchasable": sum(roll[e]["purchasable"] for e in EMPLOYERS),
            "years": sum(roll[e]["years"] for e in EMPLOYERS),
            "price": sum(roll[e]["price"] for e in EMPLOYERS),
            "value_sub": sum(roll[e]["value_sub"] for e in EMPLOYERS),
            "value_wte": sum(roll[e]["value_wte"] for e in EMPLOYERS),
            "value_blended": sum(roll[e]["value_blended"] for e in EMPLOYERS),
            "net_liability_increase": agg_liab,
            "basis_points_aggregate": agg_bp,
            "aggregate_payroll": agg_payroll,
            "by_employer": {e: {
                "purchasers": roll[e]["purchasers"],
                "price": roll[e]["price"],
                "value_sub": roll[e]["value_sub"],
                "value_wte": roll[e]["value_wte"],
                "net_liability_increase": roll[e]["net_liability_increase"],
                "basis_points": roll[e]["basis_points"],
            } for e in EMPLOYERS},
        },
    }

    # ---- population funnel, by fiscal year and plan ----------------------
    funnel_fy = []
    for fy in I.SCN_PROJECTION_FY:
        rec = proj[fy]
        row = {"fy": fy, "total_in_band": rec["total_in_band"],
               "B2": rec["total_in_band_B2"], "B3": rec["total_in_band_B3"],
               "hybrid_additional": (proj_hy[fy]["total_in_band"]
                                     - rec["total_in_band"]),
               "mean_deficit": sum(
                   rec["by_employer"][e]["mean_deficit"]
                   * rec["by_employer"][e]["total"] for e in EMPLOYERS)
               / max(1e-9, rec["total_in_band"]),
               "by_employer": {e: rec["by_employer"][e]["total"]
                               for e in EMPLOYERS}}
        funnel_fy.append(row)

    active_total = sum(I.SRC_15_PLANS[e]["active"] for e in EMPLOYERS)
    out = {
        "generated_note": ("Derived from the committed fiscal model "
                           "(inputs.py, actuarial.py, price_vs_value.py, "
                           "population.py, aggregate.py). Illustrative only."),
        "bill_version_modelled": (
            "Eligibility, purchase-cap and scope mechanics implement the bill "
            "version 1.2 operative text (D4a partial purchase capped at the "
            "deficit; hybrid participants excluded; PLOP and COLA eligibility "
            "dates frozen). The aggregate tables this is calibrated against "
            "were produced for bill version 1.1: complete for version 1.1, "
            "version 1.2 refresh required before external use. Both "
            "version 1.2 decisions of October 20, 2026 move the modeled result "
            "DOWNWARD (an in-service-at-retirement condition closes a path "
            "never priced; clause B 1(iv) removes a population that was "
            "counted), so no figure here is an understatement on their "
            "account."),
        "published": {
            "active_by_employer": {e: I.SRC_15_PLANS[e]["active"] for e in EMPLOYERS},
            "active_total_three_plans": active_total,
            "payroll_by_employer": {e: I.SRC_15_PLANS[e]["payroll"] for e in EMPLOYERS},
            "aggregate_payroll": agg_payroll,
            "active_by_plan": I.SRC_16_ACTIVE_BY_PLAN,
            "active_total_system": I.SRC_16_ACTIVE_TOTAL,
            "anc": {"P1": I.SRC_08_APPROX_NORMAL_COST["P1_NONHAZ"],
                    "P2": I.SRC_08_APPROX_NORMAL_COST["P2_NONHAZ"],
                    "HY": I.SRC_08_APPROX_NORMAL_COST["HY_NONJUD"]},
            "discount": I.SRC_01_INVESTMENT_RETURN,
            "wage_inflation": I.SRC_03_WAGE_INFLATION,
            "payroll_growth": I.SRC_04_PAYROLL_GROWTH,
            "cola": I.SRC_05_COLA,
            "er_db_rate": {e: I.SRC_15_PLANS[e]["er_db_rate"] for e in EMPLOYERS},
            "member_contrib": {e: I.SRC_15_PLANS[e]["member_contrib"] for e in EMPLOYERS},
            "veteran_share_state_classified": I.SRC_24_VETERAN_SHARE_STATE_CLASSIFIED,
            "mult_17": I.SRC_09_MULT_17,
            "mult_165": I.SRC_09_MULT_165,
            "mult_hybrid": I.SRC_10_MULT_HYBRID,
            "afc_months": I.SRC_11_AFC_MONTHS,
        },
        "funnel_assumptions": {
            "veteran_share": POP.VETERAN_SHARE,
            "veteran_band": POP.VETERAN_BAND,
            "qualifying_share": POP.QUALIFYING_SHARE,
            "retired_pay_bar": POP.RETIRED_PAY_BAR,
            "not_already_bought": POP.NOT_ALREADY_BOUGHT,
            "take_up": I.SCN_TAKEUP,
            "phi": AG.PHI,
            "qualifying_service_dist": PV.QUALIFYING_SERVICE_DIST,
        },
        "plans": plans_out,
        "employer_weights": emp_weights,
        "funnel_by_fy": funnel_fy,
        "reconciliation": recon_out,
        "grid_reconciliation": {k: v for k, v in recon.items()
                                if not isinstance(v, dict)},
    }

    # ---- actuarial tables and the salary curve the browser engine needs ---
    out["actuarial"] = {
        "q_healthy_postret": {e: {str(k): v for k, v in
                                  I.SRC_20_Q_HEALTHY_POSTRET[e].items()}
                              for e in EMPLOYERS},
        "q_preret": {e: {str(k): v for k, v in I.SRC_21_Q_PRERET[e].items()}
                     for e in EMPLOYERS},
        "terminal_age": A.TERMINAL_AGE,
        "q_cap": A.Q_CAP,
        "improvement_base_year": A.IMPROVEMENT_BASE_YEAR,
        "improvement_central": 0.0075,
        "red_first60": I.SRC_12_RED_FIRST60,
        "red_addl": I.SRC_12_RED_ADDL,
        "red_under55": I.SRC_12_RED_UNDER55,
        "p1_nra": I.SRC_13_P1_NRA,
        "ssa_nra_1960_plus": I.SRC_14_SSA_NRA_1960_PLUS,
        "member_contrib_interest": I.SRC_06_MEMBER_CONTRIB_INTEREST,
        "p2_svc_pre2013": AG.P2_SVC_PRE2013,
        "valuation_year": PV.VALUATION_YEAR,
        "base_date_fy": POP.BASE_DATE_FY,
        "projection_fy": I.SCN_PROJECTION_FY,
    }
    out["salary_curve"] = {
        "ST": [[lo, hi, v] for (lo, hi), v in sorted(AG._PAY_ST.items())],
        "TC": [[lo, hi, v] for (lo, hi), v in sorted(AG._PAY_TC.items())],
        "PS_RATIO": AG._PS_RATIO,
    }
    out["profiles"] = {k: dict(v) for k, v in I.PROFILES.items()}

    # ---- the source-and-assumption registry ------------------------------
    # Exported from inputs.py rather than retyped, so the registry the
    # explorer shows cannot drift from the model that produced the numbers.
    import re as _re
    out["registry"] = {
        "sources": I.SOURCES,
        "assumptions": {k: _re.sub(r"\s+", " ", v).strip()
                        for k, v in I.ASSUMPTIONS.items()},
        "extra_assumptions": {
            "ASM-22": ("Behavioural mix. Share of purchasers who, under current "
                       "law, would have worked on to first unreduced eligibility "
                       "and then retired (baseline WTE); the remainder would have "
                       "separated or retired at the purchase date anyway "
                       "(baseline SUB). Low 0.25, central 0.50, high 0.75. This "
                       "is the single most consequential assumption in the "
                       "model and no published data bears on it."),
            "ASM-23": ("Service / tenure dispersion. Benefit structure is set by "
                       "membership date, i.e. by tenure, while the published grid "
                       "tabulates total service. The model treats tenure = total "
                       "service + mu + sigma*Z over a fixed five-point discrete "
                       "kernel and fits (mu, sigma) so the derived system-wide "
                       "plan split reproduces the published split (SRC-16)."),
            "ASM-24": ("Share of service performed before January 1, 2013 for a "
                       "Plan 2 cell, which sets the 1.70%/1.65% multiplier blend "
                       "(SRC-09). Plan 2 membership dates run January 1, 2008 to "
                       "December 31, 2013, so pre-2013 service is 0 to 5 years; "
                       "the midpoint of 2.5 years is used."),
            "ASM-25": ("Distribution of purchasable qualifying active duty "
                       "service among veterans who have any. The statutory cap "
                       "is four years. No Virginia or VRS data is published on "
                       "this distribution; the shape used (1 yr 10%, 2 yrs 15%, "
                       "3 yrs 20%, 4 yrs 55%) reflects that most non-career "
                       "separations follow a single enlistment term."),
        },
        "naming_convention": _re.sub(r"[ \t]+", " ", I.NAMING_CONVENTION).strip(),
    }

    # ---- the exposure cell mix -------------------------------------------
    print("Exporting the exposure cell mix (hybrid cells included, gated "
          "off in the browser)...")
    cells = exposure_cells(grids)
    exposed_by_plan = defaultdict(float)
    for emp, plan, a, s, fy, n in cells:
        exposed_by_plan[plan] += n
    out["exposed_headcount_by_plan"] = dict(exposed_by_plan)
    cells_doc = {
        "columns": ["employer", "plan", "age", "service", "fy", "exposed"],
        "note": ("Raw exposed headcount per cell, BEFORE the veteran funnel "
                 "and BEFORE take-up. Derived from the committed population "
                 "projection; hybrid cells are present so the browser can "
                 "offer the separate hybrid scenario, and are excluded from "
                 "the primary model."),
        "rows": cells,
    }

    path = os.path.join(OUT, "explorer-baseline.json")
    with open(path, "w") as f:
        json.dump(out, f, indent=1, sort_keys=True)
    print("wrote", path)

    # ---- browser-loadable copies -----------------------------------------
    # Legislators open this from the filesystem, where fetch() of a .json file
    # is blocked by the browser's file:// origin rules. The web app therefore
    # loads plain <script> assignments instead.
    web = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                       "..", "explorer", "data")
    web = os.path.normpath(web)
    os.makedirs(web, exist_ok=True)
    banner = ("/* GENERATED by fiscal-model/calibrate_explorer.py -- do not "
              "edit by hand.\n   Derived from the committed Military Service "
              "Retirement Bridge fiscal model.\n   Illustrative. Not an "
              "actuarial certification. */\n")
    with open(os.path.join(web, "baseline.js"), "w") as f:
        f.write(banner + "window.VRS_BASELINE = ")
        json.dump(out, f, indent=1, sort_keys=True)
        f.write(";\n")
    with open(os.path.join(web, "cells.js"), "w") as f:
        f.write(banner + "window.VRS_CELLS = ")
        json.dump(cells_doc, f, separators=(",", ":"), sort_keys=True)
        f.write(";\n")
    print("wrote", os.path.join(web, "baseline.js"))
    print("wrote", os.path.join(web, "cells.js"),
          f"({len(cells)} cells, "
          f"{os.path.getsize(os.path.join(web, 'cells.js'))/1024:.0f} KB)")

    # ---- console summary for the run record ------------------------------
    print("\n--- central case reconciliation target -----------------------")
    pm = recon_out["python_model"]
    print(f"  purchasers (10-yr cohort, 20% take-up) : {pm['purchasers']:,.0f}")
    print(f"  purchasable pool                       : {pm['purchasable']:,.0f}")
    print(f"  member payments (price)                : ${pm['price']:,.0f}")
    print(f"  value SUB                              : ${pm['value_sub']:,.0f}")
    print(f"  value WTE                              : ${pm['value_wte']:,.0f}")
    print(f"  value blended (phi=0.50)               : ${pm['value_blended']:,.0f}")
    print(f"  net liability increase                 : ${agg_liab:,.0f}")
    print(f"  aggregate rate impact                  : {agg_bp:.4f} bp")
    for plan in ("P1", "P2"):
        p = plans_out[plan]
        print(f"\n--- {plan} representative buyer (exposure-weighted) ----------")
        print(f"  purchasable pool      : {p['purchasable_pool']:,.1f}")
        print(f"  mean age / service    : {p['mean_age']:.2f} / {p['mean_service']:.2f}")
        print(f"  mean salary           : ${p['mean_salary']:,.0f}")
        print(f"  mean deficit          : {p['mean_deficit']:.3f}")
        print(f"  mean years bought     : {p['mean_years_bought']:.3f}")
        print(f"  mean acceleration     : {p['mean_acceleration']:.3f} yrs")
        print(f"  price / purchaser     : ${p['price_per_purchaser']:,.0f}")
        print(f"  value SUB / purchaser : ${p['value_sub_per_purchaser']:,.0f}")
        print(f"  value WTE / purchaser : ${p['value_wte_per_purchaser']:,.0f}")


if __name__ == "__main__":
    main()
