#!/usr/bin/env python3
"""
Runs every table in the Military Service Retirement Bridge fiscal model and
writes them to out/*.csv plus a consolidated out/TABLES.md.

    python3 run_model.py

Illustrative. Not an actuarial certification.
"""
from __future__ import annotations

import csv
import os
from collections import defaultdict

import actuarial as A
import aggregate as AG
import inputs as I
import population as POP
import price_vs_value as PV

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), "out")
os.makedirs(OUT, exist_ok=True)
TABLES: list[tuple[str, str, list[str], list[list]]] = []


def table(key: str, title: str, header: list[str], rows: list[list]) -> None:
    TABLES.append((key, title, header, rows))
    with open(os.path.join(OUT, f"{key}.csv"), "w", newline="") as f:
        w = csv.writer(f)
        w.writerow(header)
        w.writerows(rows)


def m(x, nd=0):
    return f"{x:,.{nd}f}"


def usd(x, nd=0):
    return f"${x:,.{nd}f}"


# ===========================================================================
print("Building grids and projection...")
GRIDS, RECON = POP.build_grids()
PROJ = POP.project(GRIDS, include_hybrid=False)
PROJ_HY = POP.project(GRIDS, include_hybrid=True)

# ---------------------------------------------------------------------------
# T1 — per-member price versus value, both baselines
# ---------------------------------------------------------------------------
print("T1 price vs value...")
CASES = {pid: PV.evaluate(I.PROFILES[pid]) for pid in "ABCDEFG"}
rows = []
for pid, c in CASES.items():
    for base in ("SUB", "WTE"):
        val = c.value_sub if base == "SUB" else c.value_wte
        net = c.net_sub if base == "SUB" else c.net_wte
        rows.append([
            c.scenario.replace("-SUB", f"-{base}"), c.plan, c.path, c.employer,
            m(c.age_now, 2), m(c.service_now, 2), usd(c.salary),
            m(c.deficit, 2), m(c.years_purchased, 2),
            f"{c.anc_rate*100:.2f}%", usd(c.price_base), usd(c.price_paid),
            m(c.acceleration_years, 2),
            m(c.prop_age, 2), m(c.prop_service, 2),
            usd(c.prop_annual), usd(c.prop_pv),
            base,
            (c.sub_label if base == "SUB" else
             f"works {c.wte_age - c.age_now:.2f} more years to first unreduced "
             f"eligibility at age {c.wte_age:.2f} with {c.wte_service:.2f} years"),
            usd(c.sub_annual if base == "SUB" else c.wte_annual),
            (f"{c.sub_factor:.3f}" if base == "SUB" and c.sub_factor else
             ("1.000" if base == "WTE" else "n/a")),
            usd(c.sub_pv if base == "SUB" else c.wte_pv),
            usd(val), usd(net),
            (f"{c.price_paid / val * 100:.1f}%" if val > 0 else "n/a"),
            (f"{val / (c.years_purchased * c.price_base) * 100:.1f}%"
             if val > 0 and c.years_purchased else "n/a"),
        ])
table("T1-price-vs-value", "Per-member price versus value of the acceleration",
      ["Scenario", "Plan", "Path", "Employer plan", "Age at purchase",
       "Creditable service at purchase", "Salary", "Eligibility deficit",
       "Years purchased", "Approx normal cost rate",
       "Price base (higher of salary/AFC)", "Price paid by member",
       "Years of acceleration", "Retirement age under the bill",
       "Creditable service at retirement", "Annual allowance under the bill",
       "PV of allowance under the bill", "Baseline", "Baseline description",
       "Baseline annual allowance", "Baseline reduction factor",
       "PV of baseline allowance", "Value of acceleration",
       "Net per-member subsidy (value less price)",
       "Share of value recovered by the price",
       "Breakeven purchase rate (% of salary per year purchased)"], rows)

# ---------------------------------------------------------------------------
# T2 — the valuation-consistent decomposition for the WTE baseline
# ---------------------------------------------------------------------------
print("T2 decomposition...")
rows = []
for pid, c in CASES.items():
    rows.append([
        c.scenario.replace("-SUB", "-WTE"), usd(c.price_paid),
        usd(c.value_wte), usd(-c.net_wte), usd(c.pv_payroll_forgone),
        usd(c.pv_total_normal_cost_forgone),
        usd(c.pv_member_contrib_forgone),
        usd(c.pv_employer_db_contrib_forgone),
        usd(c.net_wte_if_not_refilled),
        ("net cost to the plan" if c.net_wte_if_not_refilled > 0
         else "net gain to the plan"),
    ])
table("T2-wte-decomposition",
      "Work-to-eligibility baseline: full decomposition per member",
      ["Scenario", "Member payment received", "Increase in PV of benefit stream",
       "Member overpayment (payment less liability increase)",
       "PV of payroll forgone during acceleration",
       "PV of total normal cost forgone (employer + member)",
       "  of which member contributions",
       "  PV of employer DB contributions forgone",
       "Net charge to the plan if the position is NOT refilled",
       "Direction"], rows)

# ---------------------------------------------------------------------------
# T2b — DECISION 4: effect of the purchase-amount rule at member level
# ---------------------------------------------------------------------------
print("T2b DECISION 4...")
rows = []
for pid in ("A", "C", "D"):
    p = I.PROFILES[pid]
    for qual, w in PV.QUALIFYING_SERVICE_DIST:
        for rule in ("D4a", "D4b"):
            c = PV.evaluate(p, rule=rule, qualifying_available=qual)
            rows.append([
                f"{p['plan']}-{p['path']}-{pid}-{p['employer']}-{rule}-Q{int(qual)}",
                rule, m(qual, 1), f"{w*100:.0f}%", m(c.deficit, 2),
                m(c.years_purchased, 2), usd(c.price_paid),
                (m(c.prop_age, 2) if c.years_purchased else "no purchase"),
                m(c.acceleration_years, 2),
                usd(c.value_sub), usd(c.value_wte), usd(c.net_sub),
            ])
table("T2b-decision4",
      "DECISION 4: purchase-amount rule against available qualifying service",
      ["Scenario", "Rule", "Qualifying service available (yrs)",
       "Assumed share of veterans (ASM-25)", "Eligibility deficit",
       "Years purchased", "Price paid", "Retirement age under the bill",
       "Years of acceleration", "Value (SUB baseline)", "Value (WTE baseline)",
       "Net subsidy (SUB baseline)"], rows)

# ---------------------------------------------------------------------------
# T3 — affected population by fiscal year
# ---------------------------------------------------------------------------
print("T3 population...")
rows = []
for fy in I.SCN_PROJECTION_FY:
    r, rh = PROJ[fy], PROJ_HY[fy]
    be = r["by_employer"]
    purch = sum(be[e]["total"] * POP.purchasable_share(e, "central")
                for e in ("ST", "TC", "PS"))
    purch_lo = sum(be[e]["total"] * POP.purchasable_share(e, "low")
                   for e in ("ST", "TC", "PS"))
    purch_hi = sum(be[e]["total"] * POP.purchasable_share(e, "high")
                   for e in ("ST", "TC", "PS"))
    rows.append([
        f"FY{fy}", m(r["total_in_band_B2"]), m(r["total_in_band_B3"]),
        m(r["total_in_band"]),
        m(be["ST"]["total"]), m(be["TC"]["total"]), m(be["PS"]["total"]),
        f"{sum(be[e]['deficit_weighted'] for e in be)/max(1e-9, r['total_in_band']):.2f}",
        m(purch_lo), m(purch), m(purch_hi),
        m(rh["total_in_band"] - r["total_in_band"]),
    ])
table("T3-population-by-fy",
      "Bridge-eligible members within four years/points of a threshold, by fiscal year",
      ["Fiscal year", "§ 51.1-153 B 2 path (Plan 1)",
       "§ 51.1-153 B 3 path (Plan 2)", "Total in band",
       "State plan", "Teacher plan", "Political subdivision plans",
       "Mean eligibility deficit (yrs/pts)",
       "With purchasable service — low", "— central", "— high",
       "Additional if hybrid participants included"], rows)

# ---------------------------------------------------------------------------
# T4 — employer contribution rate impact, basis points
# ---------------------------------------------------------------------------
print("T4 rate impact...")
RUNS: dict[tuple, dict] = {}


def get(**kw):
    key = tuple(sorted(kw.items()))
    if key not in RUNS:
        RUNS[key] = AG.run(GRIDS, PROJ, **kw)
    return RUNS[key]


rows = []
for tu in ("L", "M", "H"):
    for rule in ("D4a", "D4b"):
        r = get(take_up=tu, rule=rule)
        for emp in ("ST", "TC", "PS"):
            v = r["rollup"][emp]
            rows.append([
                f"{emp}-{tu}-{rule}", I.SRC_15_PLANS[emp]["label"],
                tu, rule, m(v["purchasers"]), m(v["years"], 1),
                usd(v["price"] / 1e6, 2) + "M",
                usd(v["value_sub"] / 1e6, 2) + "M",
                usd(v["value_wte"] / 1e6, 2) + "M",
                usd(v["value_blended"] / 1e6, 2) + "M",
                usd(v["net_liability_increase"] / 1e6, 2) + "M",
                f"{v['basis_points']:.2f}",
                f"{v['basis_points_sub_only']:.2f}",
                f"{v['er_db_rate']*100:.2f}%",
                f"{v['er_db_rate']*100 + v['basis_points']/100:.2f}%",
            ])
table("T4-rate-impact",
      "Employer contribution rate impact, FY2029-FY2038 cohort, basis points",
      ["Scenario", "Plan", "Take-up", "DECISION 4 rule", "Purchasers",
       "Years purchased", "Member payments received",
       "Value of acceleration (SUB baseline)",
       "Value of acceleration (WTE baseline)",
       "Value of acceleration (blended, phi=0.50)",
       "Net increase in unfunded accrued liability",
       "Rate impact (bp, blended)", "Rate impact (bp, SUB baseline only)",
       "Published employer DB rate", "Employer DB rate including impact"], rows)

# ---------------------------------------------------------------------------
# T5 — sensitivity: what moves the answer
# ---------------------------------------------------------------------------
print("T5 sensitivity...")
base = get(take_up="M", rule="D4a")


def total_bp(run):
    num = sum(v["net_liability_increase"] for v in run["rollup"].values())
    den = sum(v["payroll"] for v in run["rollup"].values())
    return A.liability_to_basis_points(num, den, 20), num


bp0, liab0 = total_bp(base)
rows = [["Central case", "phi=0.50, moderate take-up, central population, "
         "6.75% discount, 3.50% salary growth, 0.75% mortality improvement, "
         "position refilled", usd(liab0 / 1e6, 2) + "M", f"{bp0:.2f}", "—"]]

sens = [
    ("Behavioural mix (ASM-22)", "phi=0.25 (more purchasers leaving anyway)",
     dict(take_up="M", phi=AG.PHI["low"])),
    ("Behavioural mix (ASM-22)", "phi=0.75 (more purchasers would have worked on)",
     dict(take_up="M", phi=AG.PHI["high"])),
    ("Veteran / purchasability funnel (ASM-15 to ASM-18)", "low case",
     dict(take_up="M", pop_case="low")),
    ("Veteran / purchasability funnel (ASM-15 to ASM-18)", "high case",
     dict(take_up="M", pop_case="high")),
    ("Take-up (ASM-19)", "10% low", dict(take_up="L")),
    ("Take-up (ASM-19)", "30% high", dict(take_up="H")),
    ("DECISION 4 purchase rule", "D4b, deficit must be fully coverable",
     dict(take_up="M", rule="D4b")),
    ("Discount rate (SRC-01)", "5.75%", dict(take_up="M", discount=0.0575)),
    ("Discount rate (SRC-01)", "7.75%", dict(take_up="M", discount=0.0775)),
    ("Salary growth (ASM-07)", "2.50%", dict(take_up="M", salary_growth=0.025)),
    ("Salary growth (ASM-07)", "4.50%", dict(take_up="M", salary_growth=0.045)),
    ("Mortality improvement (ASM-05)", "0.00% (no improvement)",
     dict(take_up="M", improvement=0.0)),
    ("Mortality improvement (ASM-05)", "1.25%",
     dict(take_up="M", improvement=0.0125)),
    ("Other decrements (ASM-13)", "2.00%",
     dict(take_up="M", other_decrement=0.02)),
    ("Other decrements (ASM-13)", "5.00%",
     dict(take_up="M", other_decrement=0.05)),
    ("Position refilled (ASM-21)", "position NOT refilled; plan also loses "
     "contributions", dict(take_up="M", refill=False)),
    ("Hybrid inclusion (DECISION 2)", "hybrid participants included",
     dict(take_up="M", include_hybrid=True)),
    # --- Compound adverse case. Every row above this one varies ONE driver.
    # MOO-264 finding M-13: take-up (ASM-19) and the behavioural mix phi
    # (ASM-22) are inversely correlated by this model's own logic, because a
    # member who would have worked on to unreduced eligibility overpays and is
    # therefore less likely to purchase. Varying them separately suppresses the
    # adverse tail by construction. This row stacks the three drivers that
    # actually move the answer. It is the adverse tail, NOT a prediction: no
    # evidence says the three co-occur.
    ("COMPOUND ADVERSE (not one-at-a-time)",
     "high population funnel + phi=0.25 + 30% take-up, together",
     dict(take_up="H", pop_case="high", phi=AG.PHI["low"])),
]
for driver, variant, kw in sens:
    r = get(**kw)
    if not kw.get("refill", True):
        num = sum(v["net_charge_to_plan"] for v in r["rollup"].values())
        den = sum(v["payroll"] for v in r["rollup"].values())
        bp = A.liability_to_basis_points(num, den, 20)
    else:
        bp, num = total_bp(r)
    rows.append([driver, variant, usd(num / 1e6, 2) + "M", f"{bp:.2f}",
                 f"{bp - bp0:+.2f}"])
table("T5-sensitivity",
      "Sensitivity of the aggregate rate impact (all three plans combined)",
      ["Driver", "Variant", "Net liability increase, FY2029-FY2038 cohort",
       "Aggregate rate impact (bp)", "Change from central case (bp)"], rows)

# ---------------------------------------------------------------------------
# T6 — hybrid-inclusion variant
# ---------------------------------------------------------------------------
print("T6 hybrid variant...")
r_no = get(take_up="M", include_hybrid=False)
r_yes = get(take_up="M", include_hybrid=True)
rows = []
for emp in ("ST", "TC", "PS"):
    a, b = r_no["rollup"][emp], r_yes["rollup"][emp]
    rows.append([
        I.SRC_15_PLANS[emp]["label"],
        m(a["purchasers"]), m(b["purchasers"]),
        usd(a["price"] / 1e6, 2) + "M", usd(b["price"] / 1e6, 2) + "M",
        usd(a["net_liability_increase"] / 1e6, 2) + "M",
        usd(b["net_liability_increase"] / 1e6, 2) + "M",
        f"{a['basis_points']:.2f}", f"{b['basis_points']:.2f}",
        f"{b['basis_points'] - a['basis_points']:+.2f}",
    ])
rg = CASES["G"]
rows.append([
    "Earliest possible hybrid purchaser (profile G: age 66, 20 yrs, $85,000)",
    "—", "1", "—", usd(rg.price_paid),
    "—", usd(rg.value_sub) + " (SUB) / " + usd(rg.value_wte) + " (WTE)",
    "—", "—", "—"])
table("T6-hybrid-variant",
      "Hybrid-inclusion variant (DECISION 2): headline numbers with and without "
      "§ 51.1-169 participants",
      ["Plan", "Purchasers — hybrid excluded", "Purchasers — hybrid included",
       "Member payments — excluded", "Member payments — included",
       "Net liability increase — excluded", "Net liability increase — included",
       "Rate impact bp — excluded", "Rate impact bp — included",
       "Change (bp)"], rows)

# ---------------------------------------------------------------------------
# T7 — reconciliation
# ---------------------------------------------------------------------------
print("T7 reconciliation...")
derived_after = defaultdict(float)
for g in GRIDS.values():
    for (a, s, plan), n in g.items():
        derived_after[plan] += n
rows = [
    ["Plan 1", m(RECON["hard_rule_P1"]), m(derived_after["P1"]),
     m(RECON["published_P1"]),
     f"{derived_after['P1'] / RECON['published_P1'] * 100:.1f}%"],
    ["Plan 2", m(RECON["hard_rule_P2"]), m(derived_after["P2"]),
     m(RECON["published_P2"]),
     f"{derived_after['P2'] / RECON['published_P2'] * 100:.1f}%"],
    ["Hybrid", m(RECON["hard_rule_HY"]), m(derived_after["HY"]),
     m(RECON["published_HY"]),
     f"{derived_after['HY'] / RECON['published_HY'] * 100:.1f}%"],
    ["Total (non-hazardous plans in the model)",
     m(RECON["grid_total"]), m(sum(derived_after.values())),
     m(RECON["published_total"]) + " (all systems)",
     f"{sum(derived_after.values()) / RECON['published_total'] * 100:.1f}%"],
    ["SPORS + VaLORS + JRS (excluded by § 51.1-142.4 B 1 and J)",
     "n/a", "n/a", m(RECON["excluded_systems_active"]), "n/a"],
]
table("T7-reconciliation",
      "Reconciliation of the derived benefit-structure split to the published split",
      ["Benefit structure", "Hard service rule (ASM-10), uncalibrated",
       "After fitting tenure offset (ASM-23)",
       "Published, VRS ACFR FY2025 (SRC-16)", "Derived as % of published"], rows)

# ---------------------------------------------------------------------------
# T8 — workforce / replacement effect
# ---------------------------------------------------------------------------
print("T8 workforce...")
rows = []
for pid in ("A", "B", "C", "D"):
    c = CASES[pid]
    pay = c.pv_payroll_forgone
    erd = I.SRC_15_PLANS[c.employer]["er_db_rate"]
    for ratio in I.SCN_REPLACEMENT_RATIOS:
        rows.append([
            f"{c.scenario.replace('-SUB','')}-R{int(ratio*100)}",
            m(c.acceleration_years, 2),
            usd(pay), usd(pay * ratio),
            usd(pay * (1 - ratio)),
            usd(pay * erd), usd(pay * ratio * erd),
            usd(pay * (1 - ratio) * (1 + erd)),
        ])
table("T8-workforce",
      "Workforce replacement effect over the acceleration window (ASM-21)",
      ["Scenario", "Years of acceleration",
       "PV of departing member payroll", "PV of replacement payroll",
       "PV of gross payroll difference",
       "PV employer DB contributions on departing payroll",
       "PV employer DB contributions on replacement payroll",
       "PV net employer compensation difference"], rows)

# ---------------------------------------------------------------------------
# T9 — assumption register
# ---------------------------------------------------------------------------
rows = [[k, " ".join(v.split())] for k, v in I.ASSUMPTIONS.items()]
rows.append(["ASM-22", " ".join("""Behavioural mix. Share of purchasers who, under
    current law, would have worked on to first unreduced eligibility and then
    retired (baseline WTE); the remainder would have separated or retired at the
    purchase date anyway (baseline SUB). Central 0.50, low 0.25, high 0.75. This
    is the single most consequential assumption in the model and no published
    data bears on it.""".split())])
rows.append(["ASM-23", " ".join("""Tenure offset. Benefit structure is set by
    membership date, but the published grid tabulates total service. The model
    sets tenure = total service + D with D fitted so that the derived system-wide
    plan split reproduces the published split (SRC-16). The fitted value is
    D = +3.0 years with zero dispersion needed, consistent with part-time
    service, breaks in service, leave, and refunded service not
    repurchased.""".split())])
rows.append(["ASM-24", " ".join("""Pre-2013 service share for a Plan 2 cell, used
    to blend the 1.70% and 1.65% multipliers: 2.5 years (midpoint of the 0-to-5
    year range implied by Plan 2 membership dates).""".split())])
table("T9-assumptions", "Assumption register", ["ID", "Assumption"], rows)

# ---------------------------------------------------------------------------
# T10 — sourced inputs
# ---------------------------------------------------------------------------
rows = [
    ["SRC-01", "Investment return / discount rate", "6.75%", "EXP2024 p. C-1"],
    ["SRC-02", "Price inflation", "2.50%", "EXP2024 p. C-1"],
    ["SRC-03", "Wage inflation", "3.50%", "EXP2024 p. C-1"],
    ["SRC-04", "Payroll growth (amortization)", "3.00%", "EXP2024 p. C-1"],
    ["SRC-05", "COLA", "Plan 1 2.50%; Plan 2 and Hybrid 2.25%",
     "EXP2024 p. B-29; ACFR2025 Fig. 4.2"],
    ["SRC-06", "Interest on member contributions", "4.00%", "EXP2024 p. B-29"],
    ["SRC-07", "Deferred benefit commencement", "Normal retirement",
     "EXP2024 p. B-29"],
    ["SRC-08", "Approximate normal cost, Plan 1 non-hazardous", "12.50% of salary",
     "PPS2025 p. 2"],
    ["SRC-08", "Approximate normal cost, Plan 2 non-hazardous", "10.74% of salary",
     "PPS2025 p. 3"],
    ["SRC-08", "Approximate normal cost, Hybrid non-judicial", "6.68% of salary",
     "PPS2025 p. 1"],
    ["SRC-09", "Benefit multiplier", "1.70% / 1.65%", "Va. Code § 51.1-155 A 1"],
    ["SRC-10", "Hybrid DB multiplier", "1.00%", "ACFR2025 plan comparison"],
    ["SRC-11", "AFC averaging period", "Plan 1 36 months; Plan 2 and Hybrid 60",
     "Va. Code § 51.1-124.3; ACFR2025"],
    ["SRC-12", "Early-retirement reduction, Plan 1",
     "0.5%/month for 60 months, then 0.4%/month; plus 0.6%/month under age 55 "
     "on the 50/10 route", "ERMSR2026 p. 4"],
    ["SRC-13", "Unreduced eligibility", "Plan 1 age 65+5 or age 50+30; "
     "Plan 2/Hybrid SSA NRA+5 or age+service=90",
     "Va. Code § 51.1-153 A, B 2, B 3"],
    ["SRC-14", "Social Security normal retirement age", "67 for births 1960+",
     "ERMSR2026 p. 3"],
    ["SRC-15", "State plan: 81,274 actives, $6.276bn payroll, 11.07% employer DB "
     "rate, 20-year amortization", "", "VAL2025 pp. 12, 18"],
    ["SRC-15", "Teacher plan: 160,949 actives, $11.732bn payroll, 12.20% employer "
     "DB rate", "", "VAL2025 pp. 13, 18"],
    ["SRC-15", "Political subdivisions: 124,066 actives, $8.041bn payroll, 10.59% "
     "average employer DB rate", "", "VAL2025 p. 17"],
    ["SRC-16", "Active members by benefit structure",
     "Plan 1 110,474; Plan 2 67,333; Hybrid 200,253; total 378,060",
     "ACFR2025"],
    ["SRC-18", "Active members by attained age and completed total service",
     "state and teacher grids", "VAL2025 pp. 50-51"],
    ["SRC-20", "Healthy post-retirement mortality",
     "Pub-2010 amount-weighted with per-plan adjustments applied, 75% MP-2021 "
     "generational", "APPX2025 pp. 49-50"],
    ["SRC-23", "Retirement rates", "Plan 1 state, age 50 with 30 years: 12.5% M / "
     "7.5% F. Plan 2 and Hybrid: 11.5% when age plus service equals 90",
     "ACFR2025 Fig. 4.3"],
    ["SRC-24", "Veteran share of the Virginia classified state workforce",
     "6% (self-identified, June 30, 2024)", "DHRM2025 slide 8"],
]
table("T10-sourced-inputs", "Sourced inputs",
      ["ID", "Input", "Value", "Source"], rows)

# ---------------------------------------------------------------------------
# Write the consolidated markdown
# ---------------------------------------------------------------------------
print("Writing TABLES.md...")
with open(os.path.join(OUT, "TABLES.md"), "w") as f:
    f.write("# Military Service Retirement Bridge — model tables\n\n")
    f.write("Generated by `run_model.py`. Illustrative; not an actuarial "
            "certification. See `../README.md` for the scenario naming "
            "convention and the reconciliation note.\n\n")
    f.write("## Source documents\n\n")
    for k, v in I.SOURCES.items():
        f.write(f"- **{k}** — {v}\n")
    f.write("\n")
    for key, title, header, rows in TABLES:
        f.write(f"\n## {key}. {title}\n\n")
        f.write("| " + " | ".join(header) + " |\n")
        f.write("|" + "|".join(["---"] * len(header)) + "|\n")
        for r in rows:
            f.write("| " + " | ".join(str(c).replace("|", "\\|") for c in r) + " |\n")
        f.write("\n")

print(f"\nWrote {len(TABLES)} tables to {OUT}")
for key, title, _, rows in TABLES:
    print(f"  {key}.csv  ({len(rows)} rows)")
