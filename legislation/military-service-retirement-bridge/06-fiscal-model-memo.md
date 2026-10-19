# FISCAL ANALYSIS — Military Service Retirement Bridge

### Price versus value of accelerated unreduced retirement under draft Va. Code § 51.1-142.4

**Prepared for:** Joint Leadership Council of Veterans Service Organizations; prospective patron; VRS and Commonwealth budget reviewers
**Prepared by:** VRS2 — Policy Financial Analysis Modeler
**Issue:** MOO-259 (parent: MOO-257)
**Version:** 1.0 | **Date:** October 19, 2026
**Model, tables and reproducible code:** `fiscal-model/` (methodology and reconciliation in `fiscal-model/README.md`; every table in `fiscal-model/out/`)

> **Status.** This is an illustrative public-finance model built entirely from published VRS, Commonwealth and federal documents. **It is not an actuarial certification, not the VRS Board impact statement required by Va. Code § 30-19.1:7, and not a General Assembly fiscal impact statement.** Every figure is tagged as a published fact (`SRC-xx`), an analytical assumption (`ASM-xx`), or a scenario value. No member-level VRS data was used, because none is public.

---

## 1. Executive summary

**The bill is not cost neutral, and it must not be presented as cost neutral.** The approximate normal cost is the price of a year of *benefit accrual*. The bridge sells a different good — removal of the actuarial early-retirement reduction, and in the Plan 2 case the creation of retirement eligibility where current law offers none. On the measure that isolates that good, holding service, average final compensation and retirement date constant, **the statutory price recovers between 11% and 78% of the value conferred**, depending on the member. For the maximum-acceleration Plan 1 profile the member pays **$42,500** for **$383,565** of value — a **$341,065 per-member subsidy at 11.1% cost recovery**. Charging an actuarially equivalent price for that acceleration would require roughly **112.8% of salary per year purchased**, not 12.50%.

**And the aggregate employer contribution rate impact is a fraction of one basis point.** Modeled over the FY2029–FY2038 cohort at moderate take-up: **0.22 basis points** on the state plan, **0.20** on the teacher plan, **0.14** on the participating political subdivision plans, **0.19** combined. Across every sensitivity tested — including the adverse case in which the subsidy measure is applied to every purchaser at high take-up — no plan exceeds **0.84 basis points**. The reason is arithmetic, not optimism: roughly **222 members** are modeled to purchase over ten years against **$26.05 billion** of combined covered payroll.

Those two statements are both true, and the brief has to carry both. A committee told "no cost" will be contradicted by the Board's § 30-19.1:7 statement. A committee told "a $341,000 subsidy per veteran" without the denominator will kill the bill. The defensible framing is: **a deliberate, quantified subsidy for a small and closing population, costing employers less than one basis point.**

**Three findings change how the package should be argued.**

1. **The sign of the per-member result depends on behaviour, not on pricing.** A member who would otherwise have worked on to unreduced eligibility and then retired **overpays** — in every one of the seven profiles modeled. Profile A pays $42,500 to create a **$21,000** increase in the present value of their own benefit stream, because the bridge requires them to surrender four years of accrual (30 years of creditable service becomes 26) and four years of average-final-compensation growth. The subsidy exists only for members who were going to leave anyway. The fiscal answer therefore turns on an unknowable behavioural mix, and the model reports both ends of it rather than picking one.

2. **Extending the bridge to hybrid retirement program participants (DECISION 2) costs essentially nothing through FY2038.** Not because the hybrid defined benefit is cheap, but because almost no hybrid participant can satisfy § 51.1-142.4 B 5 and C inside the window. Modeled effect of inclusion: **+5 purchasers over ten years and −0.00 basis points.** The earliest hybrid participant who can qualify at all overpays on both measures. **DECISION 2 is an equity and precedent question, not a near-term fiscal one** — which removes the strongest objection to resolving it in favour of inclusion.

3. **Plan 1 and Plan 2 are closed benefit structures, so this is a one-time, exhausting cost, not a permanent liability.** The § 51.1-153 B 2 population drains as Plan 1 members pass 30 years of service; the § 51.1-153 B 3 population fills and then drains as Plan 2 members accumulate service. Unless hybrid participants are included, the bridge extinguishes itself.

**Principal uncertainty.** The number of active members with verified, unpurchased, non-retired-pay-barred qualifying active duty military service is not published by VRS and is not derivable from any public source. The model builds it from a Virginia Department of Human Resource Management veteran share and four assumed filters (ASM-15 through ASM-18, ASM-25). Across the low and high cases that funnel moves the aggregate from **0.07 to 0.44 basis points**. Everything else — discount rate, mortality improvement, salary growth, decrements — moves the answer by less than 0.05 basis points.

---

## 2. Why the policy change is being considered

**Current rule.** Va. Code § 51.1-142.2 B 2 lets a VRS member purchase up to four years of service credit for prior active duty military service. Subdivision B 3 prices that purchase at the **approximate normal cost** only if the member purchases, or contracts to purchase, within the first 24 months of active service following first hire. After the window closes the price becomes the **actuarial equivalent cost**.

**Problem the rule creates.** A veteran who does not purchase in the first 24 months — typically because, at the start of a public-service career, the lump sum is unaffordable — permanently loses access to the affordable price. The actuarial equivalent cost later in a career, measured against a higher salary and a nearer retirement date, is a multiple of the approximate normal cost. The practical effect is that the benefit is available only to veterans who could afford it when they were most junior.

**What the bill does differently.** New § 51.1-142.4 creates a distinct **military retirement eligibility credit** at approximate normal cost, available after the 24-month window has closed, which counts **only** toward the creditable-service component of the two unreduced-retirement tests in § 51.1-153 B 2 and B 3, and is expressly excluded from "creditable service" by the § 51.1-124.3 amendment. It buys a date, not a dollar.

**Affected population.** Non-hybrid VRS Plan 1 and Plan 2 members in non-hazardous state, teacher and political subdivision positions, who are vested, who are not already eligible for an unreduced allowance, who are within four years or points of a threshold, and who hold qualifying active duty service that is not already counted in military retired pay. Modeled at **roughly 14,000 to 17,000** members in the four-point band in any year, of whom **246 to 347** are estimated to hold purchasable qualifying service (central case).

---

## 3. Current law versus the proposal

| Dimension | Current law | Draft § 51.1-142.4 |
|---|---|---|
| Price of military service after the 24-month window | Actuarial equivalent cost (§ 51.1-142.2 B 3) | Approximate normal cost (§ 51.1-142.4 D): 12.50% Plan 1, 10.74% Plan 2, 6.68% hybrid, per year, on the higher of creditable compensation and AFC (SRC-08) |
| What the purchase buys | Creditable service: eligibility **and** benefit amount **and** AFC period **and** every service-based ancillary benefit | Eligibility **only**, and only for § 51.1-153 B 2 and B 3 (§ 51.1-142.4 E) |
| Benefit formula | 1.70% / 1.65% × AFC × creditable service, including purchased service | Unchanged. Credit excluded by § 51.1-124.3 as amended and § 51.1-142.4 F 3 |
| Four-year military cap | Four years under § 51.1-142.2 B 2 | Combined four-year cap (§ 51.1-142.4 H 2); no period purchased twice (H 3) |
| Attained age | — | Credit never increases attained age (§ 51.1-142.4 C 4), so the age-50 condition in B 2 still has to be met by waiting |
| PLOP, health insurance credit, group life, disability, death-in-service, COLA commencement | Keyed to creditable service or the unreduced-eligibility date | All expressly excluded or frozen (§ 51.1-142.4 F; conforming amendments to §§ 51.1-162, 51.1-165.01, 51.1-166) |
| Hybrid, SPORS, VaLORS, JRS, § 51.1-138 | n/a | Excluded (§ 51.1-142.4 B 1, J) — **DECISION 2** |

---

## 4. The measurement problem, and the two baselines

Approximate normal cost prices a year of accrual. The bridge sells removal of a reduction. There is no reason for the one to cover the other — but **what the acceleration is worth depends entirely on what the member would otherwise have done**, and that changes the sign of the answer, not merely its size. The model therefore computes every case on two baselines and reports both. Neither is "the" answer.

**Baseline `SUB` — frozen service.** Retirement date, creditable service and AFC held constant; the only change is reduced versus unreduced. This isolates the value of the good the bridge sells and is the right measure for a member leaving public employment anyway. For a Plan 1 member the comparator is the § 51.1-153 subsection D 50/10 or B 1 55/5 reduced allowance at the same date, using the published reduction construction (SRC-12: 0.5% per month for the first 60 months to unreduced eligibility, 0.4% per month thereafter, plus 0.6% per month under age 55 on the 50/10 route). For a Plan 2 member below age 60 there is **no** current-law allowance at that date, so the comparator is a deferred unreduced allowance commencing at normal retirement, per VRS's own published deferred-commencement assumption (SRC-07).

**Baseline `WTE` — work to eligibility.** The member works under current law to first unreduced eligibility and then retires. This nets off forgone accrual, forgone AFC growth and forgone contributions. It is the measure closest to a valuation liability change and therefore the measure most likely to resemble the Board's § 30-19.1:7 figure.

Aggregates blend the two at **φ (ASM-22)**, the assumed share of purchasers who would have worked on. **No published data bears on φ.** Central 0.50; low 0.25; high 0.75. VRS's own published retirement rates (SRC-23) show that only 12.5% of male and 7.5% of female Plan 1 state employees are assumed to retire at age 50 once they hold 30 years, and 11.5% of Plan 2 members in the year age plus service reaches 90 — which says most members work on, but says nothing about members who have just paid several months of salary for the option to leave.

---

## 5. Deliverable 1 — per-member price versus value

Full detail: `fiscal-model/out/T1-price-vs-value.csv`. Profiles are defined in `fiscal-model/README.md`. Discount rate 6.75%, COLA 2.50% Plan 1 / 2.25% Plan 2 and hybrid, Pub-2010 amount-weighted mortality with the published per-plan adjustments, all per SRC-01 and SRC-05 and SRC-20.

### 5.1 Plan 1 — § 51.1-153 B 2 pathway (age 50 and 30 years of creditable service)

Service accrues one year per year, so **four bridge years accelerate eligibility by up to four years.**

| Scenario | Age / service | Salary | Years bought | Price paid | Acceleration | Value of acceleration | Net per-member subsidy | Price recovers | Actuarially equivalent rate |
|---|---|---|---|---|---|---|---|---|---|
| `P1-B2-A-ST-SUB` | 50 / 26.0 | $85,000 | 4.00 | **$42,500** | 4.00 yrs | **$383,565** | **+$341,065** | **11.1%** | **112.8%** of salary/yr |
| `P1-B2-A-ST-WTE` | 50 / 26.0 | $85,000 | 4.00 | $42,500 | 4.00 yrs | $21,000 | **−$21,500** (member overpays) | 202.4% | 6.2% |
| `P1-B2-B-TC-SUB` | 54 / 28.0 | $80,000 | 2.00 | $20,000 | 2.00 yrs | $121,480 | +$101,480 | 16.5% | 75.9% |
| `P1-B2-B-TC-WTE` | 54 / 28.0 | $80,000 | 2.00 | $20,000 | 2.00 yrs | $13,994 | −$6,006 | 142.9% | 8.7% |
| `P1-B2-C-PS-SUB` | 56 / 27.0 | $72,000 | 3.00 | $27,000 | 3.00 yrs | $92,368 | +$65,368 | 29.2% | 42.8% |
| `P1-B2-C-PS-WTE` | 56 / 27.0 | $72,000 | 3.00 | $27,000 | 3.00 yrs | $21,273 | −$5,727 | 126.9% | 9.8% |

Profile A is the memo's own example and the worst case for the fund on the `SUB` measure, for a reason worth stating plainly: a Plan 1 member at age 50 with 26 years who retires under current law takes the 50/10 reduction, which on the published construction is **60%** — 48 months to unreduced eligibility at 0.5% plus 60 months under age 55 at 0.6%, leaving a factor of 0.400. The bridge replaces a 40-cent benefit with a dollar benefit for life. The reduction formula is published (SRC-12 / `ERMSR2026` p. 4) and the 55/5 branch was validated against an independent published factor table, but the additive 50/10 construction should be confirmed against VRS's actual factor tables before the 112.8% figure is used in public.

### 5.2 Plan 2 — § 51.1-153 B 3 pathway (Rule of 90)

The Rule-of-90 sum grows **two points per year worked** (one of age, one of service), while a bridge year adds **one point**. So **four bridge points accelerate eligibility by only two years** — the asymmetry flagged in the issue, and it materially reduces the cost.

| Scenario | Age / service | Points | Salary | Years bought | Price paid | Acceleration | Value | Net subsidy | Price recovers |
|---|---|---|---|---|---|---|---|---|---|
| `P2-B3-D-ST-SUB` | 61 / 25.0 | 86 | $90,000 | 4.00 | $38,664 | 2.00 yrs | $60,451 | +$21,787 | 64.0% |
| `P2-B3-D-ST-WTE` | 61 / 25.0 | 86 | $90,000 | 4.00 | $38,664 | 2.00 yrs | $14,111 | −$24,553 | 274.0% |
| `P2-B3-E-TC-SUB` | 60 / 27.0 | 87 | $78,000 | 3.00 | $25,132 | 1.50 yrs | $44,706 | +$19,574 | 56.2% |
| `P2-B3-E-TC-WTE` | 60 / 27.0 | 87 | $78,000 | 3.00 | $25,132 | 1.50 yrs | $10,583 | −$14,549 | 237.5% |
| `P2-B3-F-PS-SUB` | 64 / 22.0 | 86 | $76,000 | 4.00 | $32,650 | 2.00 yrs | $41,572 | +$8,923 | 78.5% |
| `P2-B3-F-PS-WTE` | 64 / 22.0 | 86 | $76,000 | 4.00 | $32,650 | 2.00 yrs | $9,821 | −$22,829 | 332.4% |

**Plan 2 is priced far closer to value than Plan 1** — 56% to 79% recovery versus 11% to 29% — for three compounding reasons: the two-points-per-year asymmetry halves the acceleration; the 10.74% rate is only 14% below the Plan 1 rate; and Plan 2's 60-month AFC and 2.25% COLA both reduce the annuity value relative to Plan 1's 36-month AFC and 2.50% COLA.

The Plan 2 `SUB` comparator uses a documented **proxy** (ASM-09) for the 60/5 reduction, because VRS does not publish the numeric Plan 2 factor table. Below age 60 no proxy is needed and none is used: a Plan 2 member under 60 cannot retire at all under current law, so the comparator is the deferred allowance.

### 5.3 The work-to-eligibility decomposition

Full detail: `fiscal-model/out/T2-wte-decomposition.csv`. This is the table a VRS actuary will recognise.

| Scenario | Member payment received | Increase in PV of benefit stream | Member overpayment | PV of total normal cost forgone | **Net charge to the plan if the position is not refilled** |
|---|---|---|---|---|---|
| `P1-B2-A-ST-WTE` | $42,500 | $21,000 | $21,500 | $28,354 | **+$6,853** cost |
| `P1-B2-B-TC-WTE` | $20,000 | $13,994 | $6,006 | $14,527 | **+$8,521** cost |
| `P1-B2-C-PS-WTE` | $27,000 | $21,273 | $5,727 | $26,501 | **+$20,774** cost |
| `P2-B3-D-ST-WTE` | $38,664 | $14,111 | $24,553 | $15,475 | **−$9,078** gain |
| `P2-B3-E-TC-WTE` | $25,132 | $10,583 | $14,549 | $10,678 | **−$3,871** gain |
| `P2-B3-F-PS-WTE` | $32,650 | $9,821 | $22,829 | $18,935 | **−$3,893** gain |
| `HY-B3-G-ST-WTE` | $22,712 | $2,035 | $20,677 | $7,420 | **−$13,257** gain |

Read this carefully, because it is easy to misuse. The normal cost forgone is charged against the plan **only where the position is eliminated or held vacant.** Where the position is refilled — the ordinary case in state government — the employer keeps paying contributions on that payroll and the plan does not lose them, so the correct measure is the liability column alone and **every profile is a net gain to the plan on this baseline.** The aggregate tables default to the refilled case for that reason.

A second-order point in the plan's favour: a position vacated by a Plan 1 or Plan 2 member is refilled by a hybrid participant accruing at 1.00% rather than 1.70%, so refilling the position improves the plan's position further. The model does not take credit for that.

---

## 6. Deliverable 2 — affected population, FY2029 through FY2038

Full detail: `fiscal-model/out/T3-population-by-fy.csv`. The bill takes effect July 1, 2028, so FY2029 is the first year of operation.

Built from VRS's published active-member tabulations by attained age and completed total service (SRC-18, June 30, 2025), with benefit structure inferred and **fitted to VRS's published Plan 1 / Plan 2 / Hybrid split** (SRC-16) rather than assumed — see the reconciliation note in `fiscal-model/README.md`, item R-1. The statutory screens in § 51.1-142.4 B 3, B 5, B 6 and C are applied cell by cell.

| Fiscal year | B 2 path (Plan 1) | B 3 path (Plan 2) | Total in four-point band | State | Teacher | Pol. subdiv. | Mean deficit | With purchasable service — low | central | high | Added if hybrid included |
|---|---|---|---|---|---|---|---|---|---|---|---|
| FY2029 | 14,238 | 0 | 14,238 | 2,554 | 9,656 | 2,028 | 2.23 | 93 | **246** | 578 | 0 |
| FY2030 | 14,909 | 0 | 14,909 | 2,567 | 10,001 | 2,341 | 2.06 | 98 | 261 | 612 | 0 |
| FY2031 | 14,215 | 194 | 14,409 | 2,378 | 9,359 | 2,673 | 2.03 | 98 | 259 | 607 | 0 |
| FY2032 | 14,040 | 642 | 14,682 | 2,520 | 9,173 | 2,989 | 2.18 | 102 | 271 | 635 | 0 |
| FY2033 | 13,780 | 1,260 | 15,040 | 2,692 | 9,075 | 3,273 | 2.24 | 107 | 284 | 665 | 0 |
| FY2034 | 13,513 | 2,055 | 15,568 | 2,890 | 9,081 | 3,596 | 2.22 | 113 | 299 | 702 | 0 |
| FY2035 | 13,264 | 2,871 | 16,135 | 3,089 | 9,139 | 3,907 | 2.16 | 119 | 316 | 740 | 0 |
| FY2036 | 12,600 | 3,736 | 16,336 | 3,057 | 8,933 | 4,345 | 2.23 | 123 | 326 | 766 | 0 |
| FY2037 | 12,843 | 4,405 | 17,248 | 3,336 | 9,275 | 4,637 | 2.31 | 131 | 347 | 815 | 264 |
| FY2038 | 9,247 | 4,742 | 13,989 | 2,746 | 7,277 | 3,966 | 1.95 | 108 | 287 | 672 | 760 |

**Three structural facts emerge from this table and none of them depends on the veteran assumptions.**

**The B 2 population drains.** Plan 1 closed to new members on July 1, 2010. The four-year band is creditable service between 26 and 30 years, and the cohort sweeps through it. The count falls from 14,909 in FY2030 to 9,247 in FY2038 and keeps falling after the window.

**The B 3 population is zero in FY2029 and FY2030, then fills.** This is not a modeling artifact; it is the Plan 2 closure date. A Plan 2 member needs more than 19 years of creditable service to reach 86 points while still below Social Security normal retirement age, because § 51.1-142.4 B 5 bars anyone already eligible for an unreduced allowance under § 51.1-153 A. Plan 2 membership dates run no later than December 31, 2013, so Plan 2 members do not reach that service level until the early 2030s. **The Plan 2 half of this bill does nothing for its first two fiscal years.**

**The band is small relative to the plans.** 14,000 to 17,000 members out of a combined 366,000 non-hazardous actives, with a **mean eligibility deficit of about 2.2 years** — most members in the band need two years, not four. The mean deficit is what drives the aggregate down: the headline four-year purchase is the exception.

### 6.1 The veteran and purchasability funnel — what had to be assumed

This is the weakest part of the estimate and the issue asks for it to be stated plainly. Published anchor, then four assumed filters:

| Step | Value | Basis |
|---|---|---|
| Veteran share of the covered workforce | **6.0%** state; 2.5% teacher; 7.0% political subdivision | **Published for state only.** DHRM presentation to Senate Finance and Appropriations, January 21, 2025, slide 8: veterans are 6% of the Virginia classified state workforce as of June 30, 2024. That report's average age (46.7) and average service (10.3) match VRS's published state-employee averages (46.9, 10.1), which supports using it as the state anchor. **No published figure exists for teachers or political subdivisions**; ASM-15. Self-identification undercounts, which pushes the central estimate down. Band 0.6× / 1.6×. |
| Has qualifying active duty service (180+ consecutive days, not dishonorably discharged) | **80%** | ASM-16. Assumption. Low 70%, high 90%. |
| Not barred because the service is counted in military retired pay | **82%** | ASM-17 / **DECISION 3**. Assumption. § 51.1-142.2 B bars service counted in any retirement allowance except as required by 10 U.S.C. ch. 1223, and § 51.1-142.4 B 4 and H 5 inherit the bar. Low 75%, high 88%. |
| Did not already purchase inside the § 51.1-142.2 B 3 24-month window | **70%** | ASM-18. Assumption. VRS does not publish purchase-of-prior-service take-up. Members who bought in-window already hold the service as creditable service and gain nothing. Low 55%, high 85%. |
| **Compounded purchasable share** | **2.76%** state, 1.15% teacher, 3.22% political subdivision | |
| Behavioural take-up of the bridge among those members | **20%** moderate (10% low, 30% high) | ASM-19. Default scenarios; cross-checked against SRC-23 but not evidence-based. |

Net result at moderate take-up: **222 purchasers over the ten years**, buying about **607 years** of eligibility credit and paying about **$7.29 million** into the trust funds.

---

## 7. Deliverable 3 — employer contribution rate impact, in basis points

Full detail: `fiscal-model/out/T4-rate-impact.csv`. The liability increase is amortized as a level percent of payroll over the published 20-year period at 6.75% interest and 3.00% payroll growth (ASM-20), which mirrors VRS's method but is not VRS's calculation. Published employer DB rates are the FY2027–FY2028 certified rates (SRC-15).

### 7.1 Headline, moderate take-up, purchase rule as drafted (D4a), φ = 0.50

| Plan | Published employer DB rate | Purchasers FY2029-38 | Member payments received | Value of acceleration — `SUB` | — `WTE` | — blended | Net liability increase | **Rate impact** | Rate impact on `SUB` measure alone |
|---|---|---|---|---|---|---|---|---|---|
| VRS State Employees | 11.07% | 60 | $2.13M | $7.25M | $1.11M | $4.18M | $2.05M | **0.22 bp** | 0.56 bp |
| VRS Teachers | 12.20% | 75 | $2.35M | $10.45M | $1.22M | $5.83M | $3.48M | **0.20 bp** | 0.47 bp |
| Participating political subdivisions (aggregate) | 10.59% | 88 | $2.80M | $7.33M | $1.53M | $4.43M | $1.62M | **0.14 bp** | 0.39 bp |
| **Combined** | — | **222** | **$7.29M** | **$25.03M** | **$3.86M** | **$14.44M** | **$7.15M** | **0.19 bp** | **0.47 bp** |

**Rounded to the basis point, every plan's employer contribution rate is unchanged.** The state rate goes from 11.07% to 11.07%; the teacher rate from 12.20% to 12.20%.

### 7.2 Sensitivity over take-up and the DECISION 4 purchase rule

| | Take-up L (10%) | Take-up M (20%) | Take-up H (30%) |
|---|---|---|---|
| **State plan** — D4a as drafted | 0.11 bp | **0.22 bp** | 0.34 bp |
| **State plan** — D4b stricter | 0.08 bp | 0.15 bp | 0.23 bp |
| **Teacher plan** — D4a | 0.10 bp | **0.20 bp** | 0.31 bp |
| **Teacher plan** — D4b | 0.07 bp | 0.14 bp | 0.21 bp |
| **Political subdivisions** — D4a | 0.07 bp | **0.14 bp** | 0.21 bp |
| **Political subdivisions** — D4b | 0.05 bp | 0.10 bp | 0.14 bp |

**DECISION 4 is worth about a third of the cost.** The stricter rule — permit a purchase only where the deficit is fully coverable, so that the purchase itself completes eligibility — cuts modeled purchasers from **222 to 137** and the aggregate impact from **0.19 to 0.13 basis points**, because it excludes every veteran whose qualifying service is shorter than their deficit. `fiscal-model/out/T2b-decision4.csv` shows the member-level trade-off: a Profile A veteran with three years of qualifying service against a four-year deficit either buys three years and retires at 51 instead of 54 (rule as drafted, paying $31,875 for $297,542 of frozen-service value), or gets nothing at all (stricter rule). **The drafted rule is the more protective one and costs about 0.06 basis points.** That is the number to put in front of the JLC.

### 7.3 What moves the answer

Full detail: `fiscal-model/out/T5-sensitivity.csv`. Aggregate across all three plans; central case 0.19 bp.

| Driver | Variant | Net liability increase | Aggregate impact | Change |
|---|---|---|---|---|
| **Veteran / purchasability funnel (ASM-15 to ASM-18)** | **low** | $2.70M | **0.07 bp** | **−0.12** |
| | **high** | $16.78M | **0.44 bp** | **+0.25** |
| **Behavioural mix φ (ASM-22)** | 0.25 — more purchasers leaving anyway | $12.44M | 0.33 bp | +0.14 |
| | 0.75 — more would have worked on | $1.86M | 0.05 bp | −0.14 |
| **Take-up (ASM-19)** | 10% / 30% | $3.58M / $10.73M | 0.09 / 0.28 bp | ∓0.09 |
| **DECISION 4 rule** | D4b stricter | $4.91M | 0.13 bp | −0.06 |
| Position not refilled (ASM-21) | plan also loses contributions | $9.27M | 0.24 bp | +0.06 |
| Discount rate (SRC-01) | 5.75% / 7.75% | $8.10M / $6.37M | 0.21 / 0.17 bp | +0.03 / −0.02 |
| Salary growth (ASM-07) | 2.50% / 4.50% | $8.03M / $6.09M | 0.21 / 0.16 bp | +0.02 / −0.03 |
| Other decrements (ASM-13) | 2.00% / 5.00% | $7.72M / $6.14M | 0.20 / 0.16 bp | +0.01 / −0.03 |
| Mortality improvement (ASM-05) | 0.00% / 1.25% | $6.89M / $7.33M | 0.18 / 0.19 bp | −0.01 / +0.00 |
| **Hybrid inclusion (DECISION 2)** | hybrid participants included | $7.06M | **0.19 bp** | **−0.00** |

**Only two assumptions matter, and both are about people rather than actuarial method.** The veteran funnel and the behavioural mix each move the answer by roughly 0.12 to 0.25 basis points. Every classical actuarial lever — discount rate, mortality improvement, salary growth, decrements — moves it by 0.05 basis points or less. **Nothing tested flips the aggregate into a saving, and nothing tested takes it above 0.84 basis points on any single plan.** The model therefore does not support a claim of cost neutrality, and it does not support a claim that the bill is expensive either.

---

## 8. Deliverable 4 — hybrid-inclusion variant (DECISION 2)

Full detail: `fiscal-model/out/T6-hybrid-variant.csv`.

The legal memo calls DECISION 2 "the single largest policy choice in the package" and expects inclusion to "raise the fiscal number." **Through FY2038 it does not.**

| Plan | Purchasers — hybrid excluded | — included | Net liability — excluded | — included | Rate impact — excluded | — included | Change |
|---|---|---|---|---|---|---|---|
| VRS State Employees | 60 | 61 | $2.05M | $2.02M | 0.22 bp | 0.22 bp | −0.00 |
| VRS Teachers | 75 | 76 | $3.48M | $3.46M | 0.20 bp | 0.20 bp | −0.00 |
| Participating political subdivisions | 88 | 90 | $1.62M | $1.58M | 0.14 bp | 0.13 bp | −0.00 |
| **Combined** | **222** | **227** | **$7.15M** | **$7.06M** | **0.19 bp** | **0.19 bp** | **−0.00** |

**Why the number is zero, and it is not because the hybrid defined benefit is cheap.** Hybrid participants are subject to § 51.1-153 B 3, so they need age plus creditable service of at least 86 to be within four points of the Rule of 90. They must also not already be eligible for an unreduced allowance under § 51.1-153 A, which for anyone born in 1960 or later means they must be under age 67. Those two conditions together require **more than 19 years of creditable service**. The hybrid plan opened on **January 1, 2014**. The first hybrid participants reach 20 years of service in **2034**, and only those hired at age 46 or older are in range even then. The modeled hybrid population enters the band in FY2037 (264 members) and FY2038 (760 members), and after the veteran funnel and take-up that is **about five additional purchasers across the whole decade.**

**The sign is also mildly favourable.** Profile G — age 66, 20 years, $85,000, the earliest hybrid participant who can satisfy § 51.1-142.4 B 5 and C at all — pays **$22,712** and receives **$12,355** on the frozen-service measure or **$2,035** on the work-to-eligibility measure. **The hybrid participant overpays on both.** Three reasons: the 6.68% rate is applied to full salary while the benefit accrues at only 1.00% of AFC; Social Security normal retirement age at 67 caps the acceleration at **one year** no matter how many points are bought; and the hybrid COLA is 2.25% rather than 2.50%.

**Consequences for the package.** DECISION 2 should be decided on equity and precedent, not on cost. The fairness objection the legal memo anticipates — that hybrid members, meaning most veterans hired since 2014, are excluded and the exclusion narrows further every year — can now be answered with a number: **including them changes the ten-year employer rate impact by less than one hundredth of a basis point.** Two caveats belong in any brief that uses this:

1. **Material hybrid cost begins in the 2040s, outside any fiscal note window.** Hybrid participants hired in 2014 at age 30 reach 86 points around 2042. The ten-year number is genuinely near zero; the thirty-year number is not, and the model does not estimate it. If the General Assembly includes hybrid participants, it should be told that the cost is deferred, not absent.
2. **A hybrid-inclusive bill is a larger commitment even at zero near-term cost**, because the hybrid plan is open and growing while Plan 1 and Plan 2 are closed. Inclusion converts a self-extinguishing benefit into a permanent one.

---

## 9. Workforce effects

Full detail: `fiscal-model/out/T8-workforce.csv`. These are **employer payroll effects, not pension effects**, and they are reported separately because they do not belong in the contribution rate.

Over Profile A's four-year acceleration window the present value of the departing member's payroll is **$324,786**, carrying **$35,954** of employer DB contributions.

| Replacement at | PV replacement payroll | PV gross payroll difference | PV net employer compensation difference |
|---|---|---|---|
| 100% of departing compensation | $324,786 | $0 | **$0** |
| 90% | $292,307 | $32,479 | **$36,074** |
| 80% | $259,829 | $64,957 | **$72,148** |

**No avoided salary is counted as a saving to the Commonwealth unless the position is eliminated, held vacant, or refilled at lower total compensation.** Where the position is refilled at the same compensation the payroll effect is zero by construction. Where it is refilled at 80% — plausible for a 26-year incumbent replaced by a new hire — the modeled employer saving over the window is **$72,148 per accelerated retirement**, which exceeds the $42,500 the member paid and dwarfs the $6,853 net pension charge. **That comparison is real but it must not be put in a brief as a saving**, because the model assigns no dollar value to recruiting cost, onboarding, vacancy duration, productivity ramp-up, or loss of institutional knowledge, and those run the other way. The honest statement is that the payroll effect is **directionally favourable to the employer and quantitatively indeterminate.**

The workforce case for the bill — orderly succession, promotion opportunity, pipeline renewal in agencies with aging workforces (VRS's published state-employee average age is 46.9 with 10.1 years of service) — is a management argument, not a fiscal one, and should be made as such.

---

## 10. Fiscal safeguards actually doing the work

The pricing is not what contains this bill. Five drafting features are, and the brief should name them because they are the answer to "why will this not blow up."

1. **The § 51.1-124.3 carve-out is the single most important provision in the bill.** If eligibility credit counted as creditable service, Profile A's annual allowance would rise from **$35,696 to $41,188** for life, and the work-to-eligibility liability increase would rise from **$21,000 to $119,349 — 5.7 times larger.** Everything else in the bill is secondary to this one sentence.

2. **The eligibility-deficit cap (§ 51.1-142.4 C 1 and C 2 a).** A member may buy only the shortfall. The modeled mean deficit in the four-point band is **2.23 years**, not four, so the cap reduces the average purchase — and the average subsidy — by roughly 45% against a flat four-year entitlement.

3. **Eligibility credit cannot increase attained age (§ 51.1-142.4 C 4).** This is what prevents the bridge from helping a Plan 1 member who is short on age rather than service. A member with 26 years at age 46 may purchase, but still cannot retire before 50.

4. **The combined four-year cap and the no-double-purchase rule (§ 51.1-142.4 H 2, H 3).**

5. **The military retired pay bar inherited at § 51.1-142.4 B 4 and H 5.** This is the largest single population screen in the model and it is **not** a drafting choice the package made — it is inherited from § 51.1-142.2 B. It is worth 18% of the eligible population in the central case. **DECISION 3 should be resolved by accepting the bar**, as drafted, and the brief should say so plainly rather than let a committee discover it.

**One safeguard in the bill is not doing the work it appears to do.** The conforming amendment to § 51.1-166 D 4 freezes COLA commencement for a retiree with fewer than 20 years of creditable service. That rule is **effectively inoperative for the bridge population**: under § 51.1-153 B 2 the member has 30 years by definition, and under B 3 a member with fewer than 20 years who is within four points of 90 must be at least age 66, where § 51.1-142.4 B 5 already bars them. **Keep the amendment** — it closes a real leak at zero cost and costs nothing to retain — but do not present it as a material fiscal safeguard, because a committee staffer who works the arithmetic will find that it never binds.

---

## 11. Risks, and where this analysis may be wrong

**Where the model may understate the cost.**
- **Self-selection is not modeled.** The model applies a single take-up rate to the eligible population. In reality the members who buy will be disproportionately those who intend to leave immediately — exactly the `SUB` population. If selection is strong, φ is closer to 0.25 than 0.50 and the aggregate is 0.33 bp rather than 0.19 bp.
- **Generational mortality improvement is proxied** at a flat 0.75% per annum rather than 75% of MP-2021 (ASM-05). Omitting improvement entirely understates annuity values by roughly 4% to 6%.
- **The annuity is valued as a single life**, ignoring the modified cash refund feature VRS actually assumes. The refund floor is worth more in the accelerated case, so this understates the subsidy slightly (ASM-04).
- **The thirty-year horizon is not modeled at all**, which matters only if hybrid participants are included (section 8).
- **Teacher and political subdivision veteran shares are assumed**, not published. If teachers are 5% veteran rather than 2.5%, the teacher-plan number roughly doubles — to 0.40 bp.

**Where the model may overstate the cost.**
- **Basis-point conversion is deliberately conservative** in two ways that both push the reported figure up (reconciliation note R-3).
- **The 50/10 reduction factor of 0.400** rests on the published additive construction. If VRS's actual factor tables are less severe, the Plan 1 `SUB` subsidy falls proportionately.
- **No credit is taken** for the cheaper hybrid accrual on refilled positions, for member contributions already in the trust funds, or for any payroll effect.
- **The political subdivision line borrows the state-employee distribution shape** (ASM-12). It is the least reliable line in every table and should be read as indicative only.

**Where the model is probably simply wrong, pending VRS data.** The joint distribution of benefit structure with age and service. The model fits a +3.0-year tenure offset to VRS's published plan split (ASM-23) and reproduces it to within 1% to 4%, but a fitted aggregate is not member-level data. The § 51.1-153 B 3 counts in particular — zero in FY2029, rising to 4,742 by FY2038 — are the most data-dependent figures in the analysis.

---

## 12. Data VRS should provide for the official fiscal note

Section 3 of the draft bill already requires the Board to report items 1, 3 and 10 below by December 1, 2027. **Items 4, 5, 6 and 7 should be added to that list**, because without them the Board's own statement will carry the same assumptions this model does.

1. Active members by benefit structure **jointly with** attained age and creditable service, for the state, teacher and each political subdivision plan.
2. Age and service distribution for the aggregate political subdivision plan.
3. Number of active non-hybrid members with verified, unpurchased qualifying active duty military service, **and the distribution of how much each has**.
4. How many members with qualifying service already purchased it inside the § 51.1-142.2 B 3 24-month window.
5. How many members' qualifying service is barred because it is counted in military retired pay (DECISION 3).
6. Expected retirement behaviour of members who purchase eligibility credit — specifically, what share would have worked on to unreduced eligibility under current law (φ).
7. The numeric Plan 2 and Hybrid 60/5 early-retirement reduction factor table.
8. Members 1, 2, 3 and 4 years or points from a § 51.1-153 B 2 or B 3 threshold, by fiscal year, for FY2029 through FY2038 and beyond.
9. Actuarial accrued liability under current law and under the bill, and the resulting employer contribution rate impact for the state plan, the teacher plan, and each participating political subdivision plan.
10. The administrative lead time VRS actually needs for the separate ledger required by § 51.1-142.4 I, which determines whether the July 1, 2028 effective date holds.

---

## 13. Bottom-line fiscal interpretation

**Modeled net cost. Not cost neutral. Small.**

On the measure that isolates what the bridge sells, the approximate normal cost recovers **11% to 78%** of the value conferred, and the per-member subsidy reaches **$341,065** in the maximum-acceleration Plan 1 case. **The package should present this as a deliberate, quantified subsidy for veterans, with the number attached.**

On the measure closest to a valuation liability change, the member **overpays** in every profile modeled, and where the vacated position is refilled the plan is better off.

Blending the two and aggregating over the published near-threshold population, the modeled employer contribution rate impact for the FY2029–FY2038 cohort is **0.22 basis points on the state plan, 0.20 on the teacher plan and 0.14 on the participating political subdivision plans — 0.19 basis points combined.** Across every sensitivity tested the aggregate stays between **0.05 and 0.44 basis points**, and no single plan exceeds **0.84**. **To the nearest basis point, no plan's employer contribution rate changes.**

**Extending the bridge to hybrid retirement program participants changes the ten-year number by less than one hundredth of a basis point**, and the earliest qualifying hybrid participant overpays. DECISION 2 should be decided on equity and precedent.

**The stricter DECISION 4 purchase rule would save about 0.06 basis points** and would deny the benefit entirely to veterans whose qualifying service is shorter than their eligibility deficit. The drafted rule is worth its price.

**None of these figures can substitute for the VRS Board's statement under Va. Code § 30-19.1:7.** The eligible-population inputs are not public, and the sign of the per-member result depends on a behavioural assumption on which no published data bears. The correct posture before the General Assembly is: *this is a deliberate subsidy, here is its size per member, here is why the aggregate is less than one basis point, and here is the member-level data VRS needs to confirm it.*
