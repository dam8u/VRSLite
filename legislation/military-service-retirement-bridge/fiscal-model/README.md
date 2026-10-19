# Military Service Retirement Bridge — actuarial cost model

**Prepared for:** MOO-259. Supports the legislative package in
`../01-bill-draft.md`, `../02-legal-analysis-memo.md` and `../05-source-appendix.md`.
**Prepared by:** VRS2 — Policy Financial Analysis Modeler
**Version:** 1.0 | **Date:** October 19, 2026
**Source law and data current through:** VRS June 30, 2025 annual actuarial
valuation (transmitted December 23, 2025); VRS FY2025 Annual Comprehensive
Financial Report; VRS purchase-of-prior-service cost rates effective July 1, 2025.

---

## Status of this model

**This is an illustrative public-finance model. It is not an actuarial
certification, not a VRS Board impact statement under Va. Code § 30-19.1:7, and
not a General Assembly fiscal impact statement.** Every figure is either a
published fact tagged `SRC-xx`, an analytical assumption tagged `ASM-xx`, or a
scenario value tagged `SCN`. The model is built entirely from publicly published
VRS, Commonwealth and federal documents; it uses no member-level data, because
none is public.

The model **does not assert cost neutrality.** It reports a measured per-member
subsidy with a number attached, and it reports the aggregate employer
contribution rate impact with a number attached. Where the two measures point in
opposite directions, both are reported and the reason is explained.

---

## Deliverable map

| Deliverable (MOO-259) | Where |
|---|---|
| 1. Price-versus-value model, per member, Plan 1 and Plan 2 separately | `out/T1-price-vs-value.csv`, `out/T2-wte-decomposition.csv`, `out/T2b-decision4.csv` |
| 2. Affected-population estimate by fiscal year, FY2029-FY2038 | `out/T3-population-by-fy.csv`, reconciliation in `out/T7-reconciliation.csv` |
| 3. Employer contribution rate impact in basis points, by plan, with take-up and DECISION 4 sensitivities | `out/T4-rate-impact.csv`, `out/T5-sensitivity.csv` |
| 4. Hybrid-inclusion variant | `out/T6-hybrid-variant.csv` |
| 5. Scenario-naming convention and reconciliation note | this file, sections "Scenario naming" and "Reconciliation note" |
| Assumption register | `out/T9-assumptions.csv` |
| Sourced inputs | `out/T10-sourced-inputs.csv` |

The narrative analysis is in `../06-fiscal-model-memo.md`. All tables are also
consolidated in `out/TABLES.md`.

---

## Reproducing the model

```
python3 run_model.py
```

Requires Python 3.10 or later and no third-party packages. Runtime is a few
seconds. Output goes to `out/` as one CSV per table plus `out/TABLES.md`.

| File | Contents |
|---|---|
| `inputs.py` | every sourced input (`SRC-xx`), every assumption (`ASM-xx`), the scenario-naming convention, and the representative profiles |
| `actuarial.py` | mortality tables, survival functions, COLA-indexed annuity factors, statutory eligibility and reduction-factor arithmetic, level-percent-of-payroll amortization |
| `price_vs_value.py` | the per-case price-versus-value engine, including partial purchases |
| `population.py` | grid construction, benefit-structure inference, statutory screens, cohort projection, veteran/purchasability funnel |
| `aggregate.py` | cell-by-cell aggregation to plan level, basis-point conversion |
| `run_model.py` | builds every table |

---

## The two baselines, and why there have to be two

Approximate normal cost is the price of a year of **benefit accrual**. The
bridge sells something different: removal of the **actuarial early-retirement
reduction**, or in the Plan 2 case the creation of retirement eligibility where
none existed. There is no reason for the normal-cost rate to cover that. But
what the acceleration is *worth* depends entirely on what the member would
otherwise have done, and that is not a detail — it changes the sign of the
answer. The model therefore computes both baselines for every case.

**`SUB` — frozen-service baseline.** Retirement date, creditable service and
average final compensation are held constant. The only thing that changes is
whether the allowance is reduced or unreduced. This isolates the value of the
good the bridge actually sells, and it is the right measure for a member who was
going to leave public employment anyway. For a Plan 1 member it compares the
unreduced allowance against the Va. Code § 51.1-153 B 1 / subsection D reduced
allowance at the same date. For a Plan 2 member below age 60 there is no
current-law allowance at that date at all, so the comparator is a deferred
unreduced allowance commencing at normal retirement, consistent with VRS's own
published deferred-commencement assumption (SRC-07).

**`WTE` — work-to-eligibility baseline.** The member works under current law
until first unreduced eligibility and then retires. This nets off the accrual
the member gives up, the AFC growth the member gives up, and the contributions
the plan stops receiving. It is the measure closest to a valuation liability
change, and therefore the measure most likely to resemble the VRS Board's
§ 30-19.1:7 number.

The aggregate tables blend the two at `phi` (ASM-22), the assumed share of
purchasers who would have worked on under current law. **No published data bears
on `phi`, and it is the single most consequential assumption in the model.**
Central 0.50; low 0.25; high 0.75.

---

## Scenario naming

Used in every table.

```
{PLAN}-{PATH}-{PROFILE}-{EMPLOYER}-{BASELINE}[-{TAKEUP}][-{RULE}][-{REPLACEMENT}]
```

| Field | Values |
|---|---|
| `PLAN` | `P1` VRS Plan 1 non-hazardous · `P2` VRS Plan 2 non-hazardous · `HY` Hybrid Retirement Plan non-judicial |
| `PATH` | `B2` unreduced via § 51.1-153 B 2 (age 50 + 30 years) · `B3` unreduced via § 51.1-153 B 3 (Rule of 90) |
| `PROFILE` | `A`-`G` representative member profile |
| `EMPLOYER` | `ST` state plan · `TC` teacher plan · `PS` participating political subdivision plans (aggregate) |
| `BASELINE` | `SUB` frozen-service · `WTE` work-to-eligibility |
| `TAKEUP` | `L` 10% · `M` 20% · `H` 30% |
| `RULE` | `D4a` purchase up to the lesser of deficit, remaining four-year allowance and available qualifying service (as drafted) · `D4b` purchase only where the deficit is fully coverable (stricter) |
| `REPLACEMENT` | `R100` / `R90` / `R80` replacement employee at that share of the departing member's compensation |

Aggregate scenarios use `{EMPLOYER}-{TAKEUP}-{RULE}`. Qualifying-service variants
append `-Q{n}` for *n* years available.

Representative profiles:

| Profile | Plan | Path | Plan | Age | Creditable service | Salary | Why this profile |
|---|---|---|---|---|---|---|---|
| A | P1 | B2 | State | 50.00 | 26.00 | $85,000 | Four years short of 30 at the minimum B 2 age. Maximum four-year acceleration. The example in the legal memo, Part 5.1. |
| B | P1 | B2 | Teacher | 54.00 | 28.00 | $80,000 | Two years short, already past age 50. |
| C | P1 | B2 | Political subdivision | 56.00 | 27.00 | $72,000 | Three years short, 55/5 rather than 50/10 reduction applies. |
| D | P2 | B3 | State | 61.00 | 25.00 | $90,000 | At 86 points. Four bridge points buy two years, not four. |
| E | P2 | B3 | Teacher | 60.00 | 27.00 | $78,000 | At 87 points. Three bridge points buy 1.5 years. |
| F | P2 | B3 | Political subdivision | 64.00 | 22.00 | $76,000 | At 86 points, close enough to Social Security normal retirement age that § 51.1-153 A caps the acceleration. |
| G | HY | B3 | State | 66.00 | 20.00 | $85,000 | Hybrid-inclusion variant. The earliest profile that can satisfy § 51.1-142.4 B 5 and C at all. |

Salaries are scenario values set at or modestly above the published plan average
compensation (SRC-15), reflecting that members with 20 or more years of service
earn above the plan mean. They are not published facts.

---

## Reconciliation note

Three reconciliations matter.

**R-1. Benefit-structure split.** VRS publishes active-member counts by attained
age and completed **total service** (SRC-18) and, separately, active-member
counts by **benefit structure** (SRC-16). It does not publish the two jointly.
Benefit structure is set by membership date — that is, by tenure — not by total
service, and the two differ in both directions: tenure exceeds service for
part-time service, breaks in service, leave and refunded service not
repurchased; service exceeds tenure for purchased prior service, military
purchases under § 51.1-142.2 and prior non-contiguous VRS service.

Applying a hard service rule (ASM-10) to the published grid produces
Plan 1 81,690 / Plan 2 54,448 / Hybrid 230,151 against a published split of
110,474 / 67,333 / 200,253 — it understates Plan 1 by 26% and Plan 2 by 19%.
Rather than apply a free calibration factor, the model treats
`tenure = total service + D` and **fits `D` to the published split** (ASM-23).
The fitted value is `D = +3.0 years` with no dispersion required, which
reproduces the published split to within 3.4% on Plan 1, 1.0% on Plan 2 and 3.7%
on Hybrid (`out/T7-reconciliation.csv`). The residual 3.1% gap on the total is
the SPORS, VaLORS and JRS membership, which § 51.1-142.4 B 1 and J exclude from
the bridge and which the model therefore does not carry.

This matters because the hard rule produces a **§ 51.1-153 B 3 population of
exactly zero in every projection year**, which is an artifact, not a finding:
under the hard rule anyone with enough service to reach 86 points before Social
Security normal retirement age is classified Plan 1. With the fitted offset the
B 3 population is zero in FY2029 and FY2030 for a real structural reason —
Plan 2 closed to new members on January 1, 2014, so Plan 2 members cannot have
enough tenure to reach 86 points below age 67 until the early 2030s — and then
grows to about 4,700 by FY2038.

**R-2. Political subdivision distribution.** The June 30, 2025 valuation
tabulates state, teacher, SPORS, VaLORS and judicial members by age and service.
It does not tabulate the aggregate political subdivision plan. The political
subdivision grid is constructed from the state-employee grid shape, scaled to
the published political subdivision active count (124,066) and rescaled on the
service dimension to match the published political subdivision mean service of
8.3 years (ASM-12). The constructed grid reproduces the published headcount and
mean service exactly; its shape is borrowed. **The political subdivision line in
every table should be read as the least reliable.**

**R-3. Basis-point conversion.** The liability increase emerging in each of
FY2029 through FY2038 is stated as a present value at the fiscal year in which
it emerges, and those present values are summed and amortized as a single layer
over 20 years as a level percent of payroll at 6.75% interest and 3.00% payroll
growth (ASM-20). Two approximations run in opposite directions and roughly
offset: summing present values struck at different dates without discounting
them to a common date overstates the total, while holding the payroll
denominator at its published FY2025 level understates future payroll and so
overstates the rate. Both push the reported basis points **up**, so the reported
figures are conservative. The amount involved is a fraction of one basis point
on every scenario tested, so neither approximation is material to any
conclusion.

---

## What this model cannot do, and what VRS must supply

The model is built on published aggregates. The following inputs are assumptions
precisely because VRS does not publish them, and each should be replaced with
VRS member-level analysis before any number here is put in front of a committee:

1. **Benefit structure jointly with age and service** (drives R-1 and the whole
   population estimate).
2. **Age and service distribution for the aggregate political subdivision plan**
   (drives R-2).
3. **Number of active members with verified, unpurchased, qualifying active duty
   military service**, and how much each has. This is ASM-15, ASM-16 and ASM-25,
   and it is the largest single uncertainty in the aggregate.
4. **How many members with qualifying service already purchased it inside the
   § 51.1-142.2 B 3 twenty-four-month window** (ASM-18). Those members gain
   nothing from the bridge.
5. **How many members' qualifying service is barred because it is counted in
   military retired pay** (ASM-17 / DECISION 3). This screen alone moves the
   estimate by a factor of roughly 1.2.
6. **Expected retirement behaviour of members who purchase bridge credit**
   (ASM-22 / `phi`). This determines the sign of the per-member result.
7. **The numeric Plan 2 and Hybrid 60/5 early-retirement reduction factor
   table** (ASM-09). The model uses the published Plan 1 construction as a proxy.
8. **MP-2021 mortality improvement rates at 75%** (ASM-05). The model uses a
   flat 0.75% per annum proxy.
9. **Service-based merit and longevity salary increase rates** (ASM-07). The
   model uses the published 3.50% wage inflation assumption alone.
10. **Actuarial accrued liability under current law and under the bill**, which
    only VRS's actuary can compute, and the resulting employer rate impact for
    the state, teacher and each participating political subdivision plan.

Section 3 of the draft bill already requires the Board to report items 1, 3 and
10 by December 1, 2027. Items 4, 5 and 6 should be added to that list.
