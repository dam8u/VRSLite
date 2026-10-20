# Legal Analysis Memorandum — Military Service Retirement Bridge

**To:** Joint Leadership Council of Veterans Service Organizations (JLCVSO); prospective patron; Division of Legislative Services
**From:** VRS2 — Virginia Public Pension Benefits Attorney
**Date:** October 19, 2026
**Re:** Statutory architecture, defined terms, conflicts, unintended-effects review, and open questions for the proposed Military Service Retirement Bridge
**Companion documents:** `01-bill-draft.md`, `03-jlc-one-page-brief.md`, `04-jlc-two-page-brief.md`, `05-source-appendix.md`
**Authority current through:** Code of Virginia as published at law.lis.virginia.gov, retrieved October 19, 2026 (§ 51.1-142.2 includes 2026 Acts, c. 563)

> **Status of this document.** This is legal-policy analysis and draft language for a sponsor to take to DLS. It is not a legal opinion to a client, and it is not final statutory text. Items marked **DECISION** change the bill. Items marked **ACTUARY** or **COUNSEL** cannot be resolved from the statute alone.
>
> **Revised October 19, 2026 for bill version 1.1.** Two changes to this memorandum are substantive and correct earlier statements:
>
> 1. **Part 4 contained two wrong conclusions.** The health insurance credit row said "No — protected by definition" and the hazardous-duty row said "No — express exclusion." Both were incorrect. The health insurance credit **commences earlier** because it keys off the date of retirement, which no exclusion in this bill reaches; and § 51.1-153 B 4 public-safety employees are **inside** the bill permanently by operation of the third sentence of § 51.1-169 A. Both rows are corrected below, and so are the corresponding statements in Part 3.4 and Part 5.5.
> 2. **DECISIONS 1 through 4 are resolved** by JLCVSO as of this date and are recorded in Part 6. Three new blocking items replace them.
>
> Both changes come from the independent adversarial review in MOO-260 (`06-red-team-review.docx`), which should be read alongside this memorandum.

---

## Part 1 — Current law baseline

### 1.1 What current law actually does with purchased military service

| Question | Current law | Authority |
|---|---|---|
| Is prior active duty military service purchasable? | Yes, up to **four years**, if the discharge from a period of active duty status "was not dishonorable." The four years are **in addition to** the four-year aggregate for the other purchasable categories. | § 51.1-142.2 B 2 |
| What counts as "active duty military service"? | "full-time service of at least 180 consecutive days in the United States Army, Navy, Air Force, Marines, Coast Guard, or any other distinct branch of the armed services as established by the federal government, or reserve components thereof." | § 51.1-142.2 B (final paragraph) |
| When may it be purchased? | **Any time while a member in service.** There is no deadline on the right to purchase. | § 51.1-142.2 B 2 |
| What changes at 24 months? | **Only the price.** A member who purchases, or enters a purchase of service contract, within the first 24 months of active service following first date of hire pays the **approximate normal cost**; after that window the member pays the **actuarial equivalent cost**. Inactive periods do not count toward the 24 months. | § 51.1-142.2 B 3 |
| What is the conversion ratio? | One year of service credit per one year purchased; portions proportional. | § 51.1-142.2 B 3 |
| What does purchased military service become? | **Creditable service.** "'Creditable service' means prior service as set forth in § 51.1-142.2 plus membership service for which credit is allowable." It therefore counts for the five-year thresholds, benefit accrual, retirement eligibility, HIC, group life thresholds, PLOP, and COLA commencement, exactly like worked service. | § 51.1-124.3 ("Creditable service"); § 51.1-142.2 |
| Hard bar on double counting | No service credit may be purchased if the service "is included in the calculation of any retirement allowance received or to be received by the member from this or another retirement system," or if a primary-retirement defined contribution account holds a balance for it — **except as required by 10 U.S.C. ch. 1223** (reserve-component non-regular retired pay). | § 51.1-142.2 B |
| Free military credit (separate right) | A member on leave of absence from a covered position who returns within one year of a not-dishonorable discharge, has not withdrawn contributions, and was not disabled or killed receives credit **at no cost**. Untouched by this proposal. | § 51.1-142.2 I |

**Current approximate normal cost rates** (VRS, effective July 1, 2025), applied to creditable compensation or AFC, whichever is higher:

| Plan / position class | Approximate normal cost, per year purchased |
|---|---|
| Plan 1 — state, teacher, local non-hazardous | **12.50%** of salary |
| Plan 2 — state, teacher, local non-hazardous | **10.74%** of salary |
| Hybrid — non-judicial | **6.68%** of salary |
| Plan 1 — hazardous duty (VaLORS/SPORS/pol. sub.) | 23.78% of salary |
| Plan 2 — hazardous duty | 19.15% of salary |

After the 24-month window, the price is "Actuarial Cost." Refunded-service repurchase uses a 6.75% compounded interest rate.

### 1.2 The unreduced-retirement pathways the bridge is aimed at

"Unreduced retirement" is **not a defined term in Title 51.1**. The phrase "unreduced service retirement allowance" appears in § 51.1-165.01 B and "unreduced allowance" in § 51.1-166 D 3 and D 4, in each case undefined. The operative statutory mechanism is reduction "on an actuarial equivalent basis" under § 51.1-155 A 2 and A 3, and the routing of certain retirement pathways directly to the unreduced formula in § 51.1-155 A 1.

| Pathway | Statutory test | Allowance | Who |
|---|---|---|---|
| Normal retirement | Normal retirement date + 5 years creditable service | § 51.1-155 A 1 (unreduced) | All. "Normal retirement date" = 65th birthday for Plan 1; Social Security retirement age for a person who becomes a member on or after July 1, 2010, or who lacks 60 months of creditable service as of January 1, 2013 (§ 51.1-124.3). |
| Age 50 / 30 years | § 51.1-153 B 2: age 50 + 30 years creditable service | § 51.1-155 A 1 (unreduced) — by express cross-reference in B 2 | The "Plan 1" population |
| Rule of 90 | § 51.1-153 B 3: age + creditable service = 90 | § 51.1-155 A 1 (unreduced) — by express cross-reference in B 3 | Persons who become members on or after July 1, 2010, or who lack 60 months as of January 1, 2013 — i.e., "Plan 2" **and hybrid** |
| Involuntary separation (certain officials) | §§ 51.1-155.1, 51.1-155.2: 20 years creditable service + involuntary separation + age 50/60 | § 51.1-155 A 1, or no A 2/A 3 reduction | Narrow classes of state and local officials |
| Reduced early retirement | § 51.1-153 B 1 (age 55, or 60 for the post-2010 population) and § 51.1-153 D (50/10, Plan 1 only) | Reduced under § 51.1-155 A 2 or A 3 | — |

**Three consequences for drafting:**

1. The bridge must operate on § 51.1-153 **B 2 and B 3**, because those are the only unreduced pathways whose test contains a creditable-service component the credit can move. Normal retirement is age-gated plus a five-year threshold the policy expressly excludes; §§ 51.1-155.1 and 51.1-155.2 require involuntary separation.
2. Because B 2 and B 3 each route the allowance to § 51.1-155 A 1, and A 1 multiplies AFC by "creditable service," excluding bridge credit from "creditable service" is by itself sufficient to prevent any benefit-amount increase. That is the single most important protective move in the bill.
3. The **asymmetry in acceleration** is unavoidable and should be disclosed to JLCVSO. Under B 2 only service counts, and service accrues at one year per year, so four bridge years accelerate unreduced eligibility by up to **four years**. Under B 3 the sum of age and service grows at **two points per year**, so four bridge points accelerate unreduced eligibility by only **two years**. The one-for-one Rule-of-90 ratio the proposal specifies therefore delivers roughly half the acceleration of the Plan 1 pathway. (A two-for-one ratio would equalize acceleration but would roughly double the Plan 2 cost and would depart from the proposal's express instruction; the one-for-one rule is drafted as directed.)

---

## Part 2 — Terminology discipline

These terms are **not** interchangeable, and conflating them is how a narrow-scope bill leaks.

| Term | Statutory status | What it controls | Treatment in the bill |
|---|---|---|---|
| **"Creditable service"** | Defined, § 51.1-124.3: "prior service as set forth in § 51.1-142.2 plus membership service for which credit is allowable" | Nearly everything: 5-year thresholds, benefit formula, retirement eligibility, HIC 15-year threshold and dollar amount, group life thresholds, PLOP, COLA, disability allowance | Bridge credit **expressly excluded** by amendment to the definition. This is the keystone. |
| **"Service credit"** | Not separately defined; used throughout § 51.1-142.2 to describe what a purchase produces, which then feeds the "creditable service" definition | Purchase mechanics and caps | Bridge credit is expressly **not** service credit. |
| **"Prior service"** | Defined, § 51.1-124.3: "service rendered prior to becoming a member" | Feeds "creditable service" | Bridge credit expressly **not** prior service. Critical: this is why the new credit is placed in a **new § 51.1-142.4** rather than inside § 51.1-142.2 — anything characterized as prior service "as set forth in § 51.1-142.2" becomes creditable service automatically. |
| **"Membership service"** | Defined, § 51.1-124.3: "service as an employee rendered while a contributing member" | Feeds "creditable service" | Bridge credit expressly **not** membership service. |
| **"Earned service"** | **Not a Title 51.1 term.** VRS administrative usage only. | Nothing, statutorily | Not used in the bill. The proposal's "earned service" exclusions are implemented through the "creditable service," "membership service," and "service as an employee" exclusions. |
| **"Active service"** | Used in § 51.1-142.2 B 3 to measure the 24-month pricing window ("24 months of the member's active service"), not as a general benefit term | Pricing window only | Bill expressly provides that the expiration of the 24-month window does not disqualify a bridge purchase and does not trigger actuarial equivalent cost for bridge credit. |
| **"Benefit-calculation service"** | **Not a Title 51.1 term.** | Nothing, statutorily | Implemented as "creditable service … by which an allowance is multiplied or otherwise computed under § 51.1-155, 51.1-157, or any other provision of this title." |
| **"Unreduced retirement"** | Not defined; "unreduced service retirement allowance" used in § 51.1-165.01 B; "unreduced allowance" in § 51.1-166 D 3, D 4 | PLOP eligibility window; COLA commencement | **Defined for the first time** in § 51.1-142.4 A as an allowance under § 51.1-155 A 1 not subject to reduction under A 2 or A 3. See the warning in Part 3.6. |
| **"Vesting"** | In Chapter 1, used only for **employer defined contribution** amounts in the hybrid program, § 51.1-169 B 3. ("Vesting requirements" also appears in §§ 51.1-138 C, 51.1-205, 51.1-216 as shorthand for the five-year service condition.) | DC employer money | The proposal's "must already be vested" condition is drafted as "**five or more years of creditable service**, determined without regard to any eligibility credit." |
| **"Actuarial equivalent"** | Defined, § 51.1-124.3: "a benefit of equal value when computed upon the basis of actuarial tables adopted by the Board" | Price of post-window purchases; early-retirement reductions; PLOP conversion | Preserved for full-value purchases; the bill expressly makes the actuarial equivalent cost inapplicable to bridge credit. |
| **"Approximate normal cost"** | Not defined in statute; committed to the Board "in its sole discretion," § 51.1-142.2 B 3 | Price of in-window purchases | Used as the bridge price, as directed. See the pricing problem in Part 5.1. |

**Drafting precedent worth citing to DLS.** § 51.1-303 B (Judicial Retirement System) already contains a narrow-scope carve-out of exactly this type: "Service purchased in accordance with the provisions of § 51.1-142.2 shall not be considered in determining the actuarial equivalent for early retirement nor shall it be considered twice in determining any disability allowance payable under this chapter." The General Assembly has therefore already accepted the concept that purchased service can be given a limited statutory effect.

---

## Part 3 — Conflicts with existing statutes, and the conforming amendments that resolve them

### 3.1 § 51.1-124.3, "creditable service" — **direct conflict; resolved**

If the credit were created as a purchase right inside § 51.1-142.2, the definition of "creditable service" ("prior service as set forth in § 51.1-142.2 plus membership service") would automatically convert it into creditable service and every exclusion in the proposal would fail. **Resolution:** place the credit in a new § 51.1-142.4 *and* amend the definition to say creditable service "does not include military retirement eligibility credit granted under § 51.1-142.4." Both moves are required; neither alone is safe.

### 3.2 § 51.1-153 B 2 and B 3 — **amendment required to make the bill work**

A closed-list authorization in § 51.1-142.4 E alone would conflict with the plain text of § 51.1-153 B 2 ("30 years of creditable service") and B 3 ("the sum of his age and years of creditable service"), because the bill elsewhere says the credit is not creditable service. Both subdivisions must be amended to name the credit expressly. Without these two amendments the bridge grants nothing.

### 3.3 § 51.1-165.01 (PLOP) — **the most serious leak in the proposal as written**

PLOP eligibility in § 51.1-165.01 B turns on being "credited with at least three [two] [one] years of creditable service for service performed **after the date he was first eligible for an unreduced service retirement allowance**," plus corresponding years in service after January 1, 2001.

The proposal correctly says bridge credit must not *substitute* for that post-eligibility active service. But the real exposure is different and is not addressed in the proposal: the bridge **moves the "first eligible" date earlier**, which starts the PLOP qualifying window earlier. A Plan 1 member who reaches unreduced eligibility four years sooner begins banking PLOP-qualifying service four years sooner. The credit never substitutes for service, yet PLOP eligibility arrives earlier anyway.

**Resolution (drafted):** amend § 51.1-165.01 B so that the "first eligible for an unreduced service retirement allowance" date is determined **without regard to** bridge credit, and reinforce with § 51.1-142.4 F 6.

**Consequence JLCVSO must accept and understand.** Under this rule, a member who retires *at* the accelerated date will generally have **no** PLOP eligibility, because they will have no creditable service performed after the unaffected eligibility date. That is faithful to the stated policy ("not establish or increase PLOP eligibility"), but it means the bridge and PLOP are practically mutually exclusive for the member who uses the bridge to leave early. A member who uses the bridge and then keeps working retains the status quo PLOP timetable. **DECISION 1** in Part 6.

### 3.4 § 51.1-166 (post-retirement supplements / COLA) — **leak not identified in the proposal**

§ 51.1-166 D 4: a retiree with **less than 20 years of creditable service** must receive the allowance for one full calendar year "after the date he would otherwise have been eligible for an unreduced allowance" before COLA begins. Bridge credit would, absent an express rule, move that date earlier.

**Resolution (drafted):** amend § 51.1-166 D 4 and add § 51.1-142.4 F 7.

**Correction (version 1.1): this amendment is belt-and-braces only, and the worked example in the earlier version of this paragraph was impossible.** D 4 reaches only a person with **less than 20 years of creditable service**, and essentially no bridge purchaser can be in that class. A B 2 purchaser necessarily has at least 26 actual years. A B 3 purchaser could have under 20 years of creditable service only if age plus service reaches 90 with service under 20 — i.e. age above 70 — and such a member is already past normal retirement date with five or more years of service, so § 51.1-153 A already affords an unreduced allowance and § 51.1-142.4 B 5 bars the purchase outright. The earlier illustration ("age 70 + 16 years + 4 bridge years = 90") therefore described a member who cannot buy. VRS's actuary would have falsified it in the § 30-19.1:7 statement. Keep the D 4 amendment; it costs nothing and forecloses an edge case.

**The real COLA exposure is not D 4 and is not closed.** A bridge retiree falls outside D 1, D 2, D 3 and D 4, so COLA commences on the ordinary § 51.1-166 C determination-date schedule, measured from the member's **actual** retirement — up to four years earlier, on a longer-lived annuity, compounding for life. Nothing in this bill reaches that, because it keys off the date of retirement rather than off creditable service or the date of unreduced eligibility. See the new **DECISION 9** in Part 6.

**§ 51.1-166 D 3 — flagged in Part 2 but not previously analyzed; on review it is safe.** D 3's test is fixed "as of January 1, 2013," and no credit granted on or after July 1, 2028 can bear on a January 1, 2013 determination. No conforming amendment is needed and DLS should not add one.

**Completeness of the "unreduced" sweep.** A programmatic search of Title 51.1 Chapters 1, 4, 5, 11, 11.1 and 14 found the word "unreduced" only in § 51.1-165.01 B and § 51.1-166 D 3 and D 4. The bill's coverage of that term within Title 51.1 is complete. The remaining gaps lie **outside Title 51.1** (§ 2.2-3204, Part 3.9A) and **outside the word "unreduced"** (the health insurance credit and ordinary COLA commencement, which key off the retirement date itself).

### 3.5 § 51.1-162 B (death in service) — **leak not identified in the proposal**

The § 51.1-162 B survivor allowance equals "the decreased retirement allowance that would have been payable under the joint and survivor option," computed on the allowance "that would have been payable to the member had the member retired on the date of his death," with the member presumed age 55 (or 60 for the post-2010 population). That hypothetical allowance depends on whether the member **would have been eligible for an unreduced allowance** — so bridge credit would increase the death-in-service benefit by removing an actuarial reduction, even though it adds no creditable service. The proposal's exclusion item 10 states the intent; nothing in the proposal's architecture implements it.

**Resolution (drafted):** amend § 51.1-162 B and add § 51.1-142.4 F 10. The proposal's "Survivor Benefit Clarification" is preserved separately and correctly: a member who actually retires using bridge credit may elect any available survivor option under § 51.1-165, and the survivor amount derives from the member's actual allowance.

### 3.6 § 51.1-165.01 B and § 51.1-166 D 3/D 4 — defining a term they already use

Defining "unreduced service retirement allowance" in § 51.1-142.4 A gives content, for the first time, to a phrase those provisions already use without definition. The definition is written to apply "as used in this section," so it does not silently redefine the term for § 51.1-165.01 or § 51.1-166. **COUNSEL 1** in Part 6: DLS should decide whether a single definition belongs in § 51.1-124.3 instead, which would be cleaner but would have effects beyond this bill.

### 3.7 §§ 51.1-128 and 51.1-161 (withdrawal and refund) — gap in the proposal

"Accumulated contributions" (§ 51.1-124.3) includes "all amounts the member may contribute to purchase **creditable service**." Because bridge credit is expressly not creditable service, a member's bridge payment would arguably fall outside accumulated contributions and would be **neither refundable nor returnable on death** — the member's own money would be stranded. The proposal is silent. **Resolution (drafted):** § 51.1-142.4 G places member-paid bridge amounts in the member's contribution account and inside accumulated contributions for §§ 51.1-128, 51.1-161, 51.1-162, and 51.1-163; makes **employer**-paid amounts non-refundable (implementing proposal exclusion 16); and forfeits bridge credit on withdrawal.

### 3.8 § 51.1-138 and Chapters 2, 2.1, 3 — scope conflict

§ 51.1-153 B 3 reaches **every** person who becomes a member on or after July 1, 2010, which includes hybrid retirement program participants (§ 51.1-169) — so amending B 3 without an express carve-out would extend the bridge to hybrid members, beyond the proposal's stated Plan 1/Plan 2 scope. Separately, employees earning § 51.1-138 benefits are Chapter 1 members receiving SPORS-equivalent benefits, and § 51.1-138 C contains its own 30-year reduction test. **Resolution (drafted):** express non-application in § 51.1-142.4 B 1 and J. See **DECISION 2** — this is the largest open policy question in the package.

### 3.9 § 30-19.1:7 — procedural requirement, not a conflict

Any bill related to VRS triggers a mandatory Board of Trustees impact statement to the Clerks, the Commission on Local Government, House Appropriations, and Senate Finance and Appropriations, covering both financial impact on the general fund and participating localities and **policy implications** for the systems the Board administers, including potential impact on local independent retirement systems. Plan for an adverse or heavily caveated statement on the pricing question in Part 5.1; the third enactment clause is drafted to get that analysis on the record early.

---

## Part 4 — Unintended-effects check

Each item states whether the provision is **affected**, and why. "Protected by definition" means the protection comes from excluding bridge credit from "creditable service" in § 51.1-124.3. "Protected by express amendment" means the definition alone was **not** sufficient because the provision keys off the *date of unreduced-retirement eligibility* rather than off creditable service.

| VRS provision | Authority | Affected? | Why |
|---|---|---|---|
| Benefit formula / Basic Benefit | § 51.1-155 A 1 | **No** — protected by definition + § 51.1-155 C | Allowance = 1.70%/1.65% × AFC × *creditable service*. Bridge credit is not creditable service. |
| Average final compensation | § 51.1-124.3 | **No** — protected by definition | AFC averages compensation over highest consecutive months *of creditable service*; bridge credit adds no months of creditable service and no compensation. |
| Early-retirement reduction factors | § 51.1-155 A 2, A 3 | **Yes, by design, and only to the extent intended** | The whole point is to reach an unreduced allowance. § 51.1-142.4 E limits the effect to the B 2 and B 3 eligibility tests; § 51.1-155 C bars the credit from the A 2/A 3 30-year and 90-point tests, which govern members retiring under § 51.1-153 B 1 or D. |
| Five-year threshold (vesting analogue) | § 51.1-153 A, C; § 51.1-161 A | **No** — express exclusion | § 51.1-142.4 F 1. The member must independently have five years of creditable service to buy at all (§ 51.1-142.4 B 3). |
| Normal retirement date | § 51.1-124.3 | **No** | Purely age-based (65, or Social Security retirement age). § 51.1-142.4 C 4 bars treating the credit as increasing attained age. |
| 50/10 retirement | § 51.1-153 D | **No** — express exclusion | F 1 covers the 10-year creditable-service requirement; the allowance under § 51.1-155 A 5 is unaffected. |
| **PLOP** | § 51.1-165.01 | **Yes — requires express amendment** | Eligibility keys off creditable service performed *after the date first eligible for an unreduced allowance*. Bridge credit would move that date earlier. Neutralized by the § 51.1-165.01 B amendment and F 6. See Part 3.3 and DECISION 1. |
| **Post-retirement supplements (COLA)** | § 51.1-166 D 4 | **Yes — requires express amendment** | Commencement for retirees with under 20 years of creditable service keys off the unreduced-eligibility date. Neutralized by the § 51.1-166 D 4 amendment and F 7. See Part 3.4. |
| **Death before retirement (death in service)** | § 51.1-162 B | **Yes — requires express amendment** | The hypothetical allowance depends on unreduced-eligibility status. Neutralized by the § 51.1-162 B amendment and F 10. See Part 3.5. |
| Death before retirement (refund of contributions) | § 51.1-162 A | **Yes, intentionally and favorably** | Member-paid bridge amounts sit in accumulated contributions, so they are returned to the beneficiary rather than forfeited (§ 51.1-142.4 G). |
| Death after retirement | § 51.1-163 | **No material effect** | Pays the excess of accumulated contributions over allowances received. Including the member's own bridge payment returns the member's money; it creates no employer-financed value. |
| Survivor / optional allowances | § 51.1-165 | **No** | Options are actuarial conversions of the allowance actually payable. Bridge credit does not increase that allowance. A bridge retiree may elect any option otherwise available — preserving the proposal's Survivor Benefit Clarification. |
| Disability retirement — eligibility | § 51.1-156 | **No** | Eligibility requires only being a member in service (or within 90 days of termination); no service threshold the credit could satisfy. |
| Disability retirement — amount | § 51.1-157 A | **No** — protected by definition + F 9 | Allowance = 1.70%/1.65% × AFC × the lesser of twice creditable service or creditable service projected to age 60. Bridge credit adds no creditable service. The five-year condition in § 51.1-157 A is covered by F 1. |
| Disability — workers' comp and special guarantees | § 51.1-157 B, C, D | **No** | Percentage-of-AFC guarantees; no service component. |
| VSDP / long-term disability | §§ 51.1-1112, 51.1-1123, 51.1-1157, 51.1-1165 | **No** — express exclusion | F 9. HIC amounts for disability retirees are computed on creditable service at disability (§ 51.1-1400 A), which bridge credit does not change. |
| **Health insurance credit — threshold and amount** | §§ 51.1-1400 through 51.1-1403 | **No** — protected by definition | Both the **15-year eligibility threshold** and the **per-year dollar amount** ($4.00/$4.25 state and teacher; $1.50/$1.75 local and local officer, with caps) run on "total creditable service." Bridge credit never enters either. Reinforced by F 8. |
| **Health insurance credit — commencement date** | §§ 51.1-1400 A, 51.1-1401 A, 51.1-1402 A, 51.1-1403 A | **YES — affected, and NOT closed by this bill.** Corrects the earlier "No" conclusion. | The credit is payable to a former employee "who retired under the Virginia Retirement System" with at least 15 years of total creditable service, credited **monthly** from retirement. The trigger is **retirement plus 15 years**, not the unreduced-eligibility date. An earlier retirement therefore adds up to four years of monthly payments: for a state retiree with 26 years, $4.25 × 26 = $110.50/month ≈ **$5,300 per member** of additional trust liability. F 8 bars *eligibility* and *amount*; neither verb reaches **duration**. Each of §§ 51.1-1401 through 51.1-1403 separately provides that a member who defers under § 51.1-153 C receives the credit "on the effective date of his retirement," so the deferred-member path in DECISION 8 accelerates this too. Closing it requires amending Chapter 14 to delay commencement for bridge retirees. See **DECISION 9**. |
| **Post-retirement supplements (COLA) — ordinary commencement** | § 51.1-166 C | **YES — affected, and NOT closed by this bill.** | A bridge retiree falls outside D 1–D 4, so COLA commences on the ordinary subsection C determination-date schedule measured from actual retirement — up to four years earlier, compounding for life. See Part 3.4 as corrected and **DECISION 9**. |
| **Workforce Transition Act purchased years** | § 2.2-3204 A, C (Title 2.2) | **YES — required a new conforming amendment** | Employer-funded severance-conversion years go to the employee's **age** unless the employee "is eligible for unreduced retirement," in which case they go to **creditable service** and multiply into the § 51.1-155 A 1 allowance. Bridge credit flips that switch, producing an employer-funded increase in the allowance itself. F 1, F 12 and F 15 were all limited to "this title" and did not reach Title 2.2. Closed in version 1.1 by amending § 2.2-3204 A and C and extending F 15 to Title 2.2. |
| **Deferred retirement under § 51.1-153 C** | § 51.1-153 C | **YES — affected; partially constrained, not closed** | Subsection C lets a member who terminates with five or more years retire under subsection B — **including B 2 and B 3** — with the member-in-service requirement expressly inapplicable, and a deferred member's creditable service frozen. § 51.1-142.4 B 1 requires member-in-service status only at purchase. Acceleration for such a member can reach roughly 15 years, not four. The new C 2 d cap measures acceleration against the member's own unaffected eligibility date, which constrains abuse but does not foreclose the strategy. See **DECISION 8**. |
| Group life insurance | § 51.1-505 B, C | **No** — protected by definition | The 30-year floor ($8,000) and the 20-year double-salary provision run on creditable service; the retiree-coverage condition runs on "five or more years of service as an employee." Reinforced by F 11. |
| Hazardous duty — § 51.1-138 employees | § 51.1-138 B, C | **No** — express exclusion | § 51.1-142.4 B 1 and J exclude these employees from purchasing at all; F 12 bars any effect on § 51.1-138 benefits, including that section's own 30-year reduction test. Note that § 51.1-138 C uses the bare term "service," which is why version 1.1 adds "service" to F's opening enumeration. |
| **Public-safety employees in § 51.1-153 B 4 "resolution" localities** | § 51.1-153 B 4; **§ 51.1-169 A, third sentence**; § 51.1-155 A 3 | **YES — these employees are INSIDE the bill, permanently, including current hires.** Corrects the earlier blanket "hazardous-duty members are excluded" conclusion. | Where a locality has adopted the irrevocable B 4 resolution, its EMS personnel, firefighters and law-enforcement officers are deemed not to be post-2010 members and to have 60 months of creditable service as of January 1, 2013. The third sentence of § 51.1-169 A then makes them **ineligible for the hybrid retirement program** — in a sentence separate from the one excluding § 51.1-138 employees, which is conclusive that the two local elections are distinct. Such an employee, hired in any year, is therefore caught by none of clauses B 1(i), (ii) or (iii), and the pathway left open is **B 2 — age 50 plus 30 years, one-for-one** — the most generous acceleration in the bill. Two further problems: the B 4 deeming is scoped to B 1, B 3, subsection D and § 51.1-155 A 3, and **B 2 is not in that list**, so it is indeterminate whether such a member uses the C 1 a or C 1 b deficit formula or neither; and the applicable approximate normal cost rate for the class needs confirmation. See **DECISION 10**. |
| SPORS, VaLORS, JRS | Chapters 2, 2.1, 3 | **No** — express non-application | § 51.1-142.4 J. Note § 51.1-303 B already limits how § 51.1-142.2 purchases operate in JRS. |
| Hybrid retirement program | § 51.1-169 | **No** — express non-application | § 51.1-142.4 B 1 and J. **This is the scope question in DECISION 2, not a technical conclusion.** |
| Post-threshold pension accrual | § 51.1-155 A 1 | **No** — express exclusion | F 13. Continued work after the accelerated date accrues allowance normally on actual creditable service; the credit itself never accrues. |
| Portability / transfer | § 51.1-143.1; other systems | **No** — express exclusion | F 14. |
| Refund of contributions | §§ 51.1-128, 51.1-161 | **Yes, intentionally** | § 51.1-142.4 G: member-paid amounts refundable; employer-paid amounts not; credit forfeited on withdrawal. |
| Return to covered employment | § 51.1-155 B 1 | **No** | Allowance ceases while re-employed in a covered position regardless of how eligibility was attained. |
| Existing § 51.1-142.2 B 2 purchase right | § 51.1-142.2 | **No** — expressly preserved | § 51.1-142.4 H 1. Members keep the in-window normal-cost right and the post-window actuarial-cost right, and § 51.1-142.4 H 4 adds a conversion right with credit for amounts already paid. |
| Free military credit for members on military leave | § 51.1-142.2 I | **No** | Untouched; a different right with different conditions. |
| Four-year aggregate military cap | § 51.1-142.2 B 2 | **Preserved** | § 51.1-142.4 H 2 and the § 51.1-142.2 B 2 amendment make the cap a combined cap, with H 3 barring double purchase of the same period. |
| Four-year cap on other purchasable categories | § 51.1-142.2 B 1 | **No** | A separate cap; the bill does not touch it. |

---

## Part 5 — Risks that are not drafting problems

### 5.1 The pricing problem (the central fiscal issue) — **ACTUARY 1, now modeled**

The proposal prices bridge credit at the **approximate normal cost** — the price of a year of *benefit accrual*. But the bridge sells a different good: **removal of an actuarial early-retirement reduction**, i.e., the early-retirement subsidy. These two things do not have the same actuarial value, and there is no reason to expect the normal-cost rate to cover the subsidy.

**Version 1.1 update — the number now exists.** The ACTUARY 1 and ACTUARY 2 questions have been modeled (MOO-259; memorandum at `08-fiscal-model-memo.docx`, reproducible code and tables in `fiscal-model/`). The model is an illustrative public-finance model built from published VRS, Commonwealth and federal sources. **It is not an actuarial certification and it does not substitute for the VRS Board's statement under Va. Code § 30-19.1:7.** It confirms the diagnosis in this Part and supplies magnitudes:

| Question | Modeled answer |
|---|---|
| Does approximate normal cost cover the value of the acceleration? | **No.** Price recovers **11% to 78%** of value, depending on plan and profile. An actuarially equivalent price for the maximum-acceleration Plan 1 case would be about **112.8% of salary per year purchased**, versus the 12.50% charged. |
| Largest per-member subsidy | Plan 1, age 50 with 26 years at $85,000: pays **$42,500**, receives **$383,565** of value — **$341,065** net, at **11.1%** cost recovery. The driver is that the current-law 50/10 reduction is about **60%**, so the bridge converts a 40-cent benefit into a dollar benefit for life. |
| Why Plan 2 prices better | **56% to 79%** recovery. The Rule-of-90 sum grows two points per year worked while a bridge year adds one, so four bridge points accelerate eligibility by only **two years** — this memorandum's Part 1.2 asymmetry, confirmed and now priced. |
| Aggregate employer contribution rate impact, FY2029–FY2038 | **0.22 bp** state, **0.20 bp** teacher, **0.14 bp** political subdivisions, **0.19 bp** combined — about **222 purchasers** against **$26.05 billion** of covered payroll, paying about **$7.29M** in. To the nearest basis point no plan's rate changes. Full sensitivity range **0.05 to 0.44 bp** aggregate; no single plan exceeds **0.84 bp** in any scenario tested. |
| Does any scenario make it cost-neutral? | **No.** Nothing tested flips the aggregate into a saving. Cost neutrality is not an available claim. |

Three consequences for this memorandum's legal analysis:

1. **The § 51.1-124.3 carve-out is doing more work than any other provision.** If eligibility credit counted as creditable service, the modeled liability increase for the lead profile would rise from **$21,000 to $119,349 — 5.7 times larger**, and the annual allowance from $35,696 to $41,188 for life. The three-move architecture in Part 3 is vindicated quantitatively, not merely conceptually.
2. **The sign of the per-member result depends on member behaviour, not on drafting.** On the "work-to-eligibility" baseline — the member would have worked on to unreduced eligibility and then retired — the member **overpays in every profile modeled**, because the bridge requires surrendering four years of accrual and of AFC growth. The subsidy exists only for members who were going to leave anyway. No public data bears on the mix, which is why the aggregate is reported as a range.
3. **DECISION 2 (hybrid exclusion) cannot be defended on near-term cost.** Including hybrid participants changes the ten-year number by **less than one hundredth of a basis point**, because almost no hybrid participant can satisfy § 51.1-142.4 B 5 and C before FY2038. The exclusion JLCVSO chose stands on equity and precedent grounds; if a committee asks for the fiscal justification, there is not one inside the window. Material hybrid cost begins in the **2040s**, outside any fiscal note horizon and unmodeled.

Options if containment is required: (i) Board-set bridge-specific rate under § 51.1-142.4 D; (ii) require actuarial equivalent cost measured against the *acceleration*, not against a year of accrual; (iii) cap the acceleration at fewer than four years; (iv) require an appropriation to offset the liability. (i) and (ii) would substantially raise the price and undercut the policy; they are not drafted. The model adds a fifth that is **not** recommended: the stricter DECISION 4 purchase rule (permit a purchase only where it fully completes eligibility) saves about **0.06 bp** but denies the benefit outright to every veteran whose qualifying service is shorter than their deficit. JLCVSO chose the partial-purchase rule, and **0.06 bp is its measured price** — a defensible trade to put to a committee.

**What the model does not price, and it matters.** The deferred-member strategy in DECISION 8 is **not** in any figure above; the model prices four years of acceleration, not fifteen. If DECISION 8 is resolved by keeping the deferred path open, every aggregate in this Part is an understatement and the bill must be re-costed with the deferred case modeled as the dominant strategy. Likewise the DECISION 9 health insurance credit and COLA commencement costs sit on **separately funded trusts** and are outside the contribution-rate figures; only the per-member health insurance credit order of magnitude (≈ $5,300) has been estimated.

### 5.2 Military retirees may be excluded from the bridge entirely — **COUNSEL 2 / DECISION 3**

§ 51.1-142.2 B bars purchase of service "included in the calculation of any retirement allowance received or to be received by the member from this or another retirement system," except as required by **10 U.S.C. ch. 1223** (reserve-component non-regular retired pay). VRS administers this as a bar where the service "qualifies you for a military pension."

The practical consequence is severe and runs against the proposal's framing: a **career active-component military retiree** — precisely the "long-serving veteran" the brief describes — generally **cannot** purchase the service, because it is counted in military retired pay. The bridge as drafted inherits that bar through § 51.1-142.4 B 4 and H 5. The realistic beneficiary population is veterans who served and separated **without** retirement-eligible service, plus reserve/Guard members protected by 10 U.S.C. ch. 1223.

JLCVSO should decide whether to (a) accept the bar, (b) seek an express exception for military retired pay — which raises a genuine double-counting objection and a much larger fiscal number, or (c) at minimum require VRS to publish the rule plainly so members are not surprised. The bill as drafted does (a).

### 5.3 Federal tax qualification — **COUNSEL 3**

Member purchases of service in a governmental plan are normally analyzed as "permissive service credit" under **IRC § 415(n)**, which is framed in terms of purchasing *service credit* that increases benefits. A purchase that buys **no** benefit accrual and only eligibility is unusual and does not map cleanly onto § 415(n)'s structure.

**Sharpened in version 1.1 — the problem is not a poor fit but probable non-application, and it has a design consequence.** § 415(n)(3)(A) defines permissive service credit as service credit "**recognized by the plan for purposes of calculating a participant's benefit under the plan**." Bridge credit is, by express design, not recognized for that purpose, so clause (i) appears **not to be satisfied at all**. Three consequences follow:

1. **§ 415(c) exposure.** Voluntary after-tax employee contributions to a governmental defined benefit plan are annual additions (Treas. Reg. § 1.415(c)-1(a)(2)(ii)(B)). § 415(n)(1)(B) is the relief that lets a governmental plan avoid an annual-additions failure on a service purchase. Without it, a lump sum of roughly $35,000 could exceed the § 415(c) limit in the year of purchase. § 51.1-168 addresses §§ 415(b) and 415(d), not this.
2. **Funding sources disappear — a design fact, not a footnote.** IRC §§ 403(b)(13) and 457(e)(17) permit trustee-to-trustee transfers to a governmental defined benefit plan only for the purchase of "permissive service credit (as defined in section 415(n)(3)(A))" or a § 415(k)(3) repayment. If bridge credit is not permissive service credit, members **cannot fund it from a 403(b) or 457(b) account** — which is how most VRS members fund service purchases. JLCVSO should know this before the bill is introduced, because it materially changes who can afford the bridge.
3. **§ 414(h)(2) pick-up.** The payroll-deduction route in § 51.1-142.4 D borrows § 51.1-142.2 F, but a pick-up determination for one section does not carry over to a different section buying a different thing.

**Downgraded:** § 401(a) definitely-determinable benefits. The benefit *amount* is untouched and the eligibility condition is objective and fixed in statute, so Treas. Reg. § 1.401-1(b)(1)(i) is satisfied on its face; the governmental-plan exemptions in IRC §§ 401(a)(5)(G) and 401(a)(26)(G) also take § 401(a)(4) and § 401(a)(26) off the table. Counsel's time belongs on § 415(n)/§ 415(c).

**Added: 10 U.S.C. § 12736 is the operative federal provision, and this package previously cited only the chapter.** § 12736 provides that no period of service included in determining a person's right to non-regular retired pay "may be excluded in determining his **eligibility** for any annuity, pension, or old-age benefit, under any other provision of law, State or Federal." Virginia has long read chapter 1223 as permitting *purchase* of reserve-component service rather than mandating free credit. But this bill's entire subject matter **is eligibility**, which engages § 12736's operative word directly and invites the argument that chapter 1223 service must count toward § 51.1-153 B 2 and B 3 eligibility **at no cost**. Put that question to legislative counsel with § 12736 in front of them before introduction.

This should be resolved **before** introduction, not in committee.

### 5.4 Administration — **ACTUARY 2 / COUNSEL 4**

VRS must carry a **second, parallel service ledger** that is excluded from every downstream calculation, which touches member statements, benefit estimators, employer reporting, the HIC and group life interfaces, and the § 30-19.1:7 and annual valuation processes. § 51.1-142.4 I requires separate accounting and separate reporting. The implementation lead time is the reason the drafted effective date is **July 1, 2028** rather than July 1, 2027. VRS should state the lead time it actually needs.

### 5.5 Equal-treatment and precedent exposure

Three fairness arguments will be made against the bill and should be answered in advance, not improvised at the podium: (i) hybrid members — most veterans hired since January 1, 2014 — are excluded (DECISION 2, now settled as exclusion); (ii) SPORS, VaLORS and § 51.1-138 members are excluded even though many are veterans; (iii) other groups (first responders, teachers with out-of-state service) will argue for parallel eligibility-only bridges. The narrow-scope architecture is itself the best answer to (iii): the bill creates a *military-specific* credit, not a general eligibility-purchase mechanism.

**Correction to (ii), and it changes the whole argument.** Version 1.0 stated flatly that hazardous-duty members are excluded. That is wrong for the largest group of them. Public-safety employees in § 51.1-153 B 4 resolution localities are **inside** the bill, permanently, including employees hired this year — see the new Part 4 row and DECISION 10. So as currently drafted the operative line is not "veterans vs. non-veterans." It is **"public-safety employees in resolution localities vs. everyone hired since January 1, 2014"** — a distinction that has nothing to do with military service and is considerably harder to defend than the one this memorandum previously prepared for. It also weakens the answer to (iii), because a de facto beneficiary class defined by occupation rather than by service is exactly the precedent other occupations will cite. Resolving DECISION 10 is the fix; until it is resolved, do not deploy the equal-treatment answer above.

**A better precedent than § 51.1-303 B, previously missed.** § 51.1-303 B is good precedent for narrow-scope *carve-outs*. **§ 2.2-3204 is precedent for the thing itself:** under the Workforce Transition Act the Commonwealth already purchases age or creditable service on an employee's behalf in order to manufacture retirement eligibility, by statute, at a stated price of **15 percent of the employee's present annual compensation**. That cuts both ways and both are worth preparing. Adverse: a committee member who finds it will ask why veterans should pay 12.50% (Plan 1) or 10.74% (Plan 2) when the Commonwealth's own statutory price for the same good is 15%. Favorable: it defeats the objection that eligibility-purchasing is unprecedented in Virginia law — it is not, and the General Assembly wrote the precedent. Note the irony that § 2.2-3204 is also the source of the Title 2.2 leak closed in version 1.1.

---

## Part 6 — Open questions requiring JLCVSO, VRS, or counsel resolution

### 6.0 Resolved by JLCVSO, October 19, 2026

| # | Question | Decision | Effect on the bill |
|---|---|---|---|
| DECISION 1 | PLOP window | **Freeze** the unreduced-eligibility date without regard to eligibility credit, and disclose the trade-off in the JLCVSO briefs | No text change — § 51.1-165.01 amendment and F 6 already implement it. Disclosure added to both briefs, and version 1.1 adds a statutory pre-purchase disclosure requirement in § 51.1-142.4 I 2(v) |
| DECISION 2 | Hybrid plan scope | **Exclude** hybrid participants; Plan 1 / Plan 2 only | No text change — B 1(i) and J already implement it. But see DECISION 10: the exclusion does **not** produce a uniformly closing cohort |
| DECISION 3 | Military retired pay bar | **Inherit** the bar; no express exception sought | No text change — H 5 carries it, and H 5 is load-bearing because the § 51.1-142.2 bar is framed "under this **section**" and does not reach § 51.1-142.4 of its own force. Career active-component retirees are generally unable to use the bridge; disclosed in both briefs and in I 2 |
| DECISION 4 | Purchase amount | **Partial purchase capped at the shortfall** | C 2 retained. Version 1.1 adds the achievable-acceleration cap in C 2 d, which is a different constraint: it prevents purchases that move the retirement date by nothing. See DECISION 11 |

**Consequence of DECISION 1 that must be in member-facing material.** Because PLOP eligibility under § 51.1-165.01 B runs on creditable service performed after the *unaffected* eligibility date, a member who retires at the accelerated date will generally have **no PLOP**. A member who uses the credit and works through to normal retirement date retains full PLOP eligibility through clause B 1(i) of that section — a point the source appendix originally stated incompletely (it recorded only the three-year branch of B 1(i), not the "satisfied the requirements for normal retirement after January 1, 2004" branch), and which materially softens the warning in Part 3.3.

### 6.1 New blocking items — the bill should not go to a patron until these are resolved

- **DECISION 8 — Deferred-member acceleration (supersedes DECISION 5; highest priority).** § 51.1-153 C lets a member who terminates with five or more years of creditable service retire under subsection B — **including B 2 and B 3** — and expressly disapplies any member-in-service requirement; a deferred member's creditable service is frozen. § 51.1-142.4 B 1 requires member-in-service status only on the purchase date. A member who buys four years at age 44 with 26 years of service, resigns, and defers can take an **unreduced** allowance at age 50 that she could otherwise obtain only at 65, since with frozen service the clause (ii) date in § 51.1-155 A 2 never arrives. That is roughly **15 years of acceleration for about $35,000** — an order of magnitude beyond the four-year illustration in Part 5.1. The same defect runs on the B 3 pathway at smaller magnitude, and it corrects a statement in Part 1.2: four bridge points accelerate B 3 eligibility by only two years for a member who **stays** (age and service each advance), but by a full **four** years for a deferred member whose service is frozen. The deferred case is the dominant strategy and must be priced as such. Options: (i) require member-in-service status at retirement, not merely at purchase; (ii) forfeit or pro-rate the credit on termination; (iii) make the credit usable only in combination with creditable service earned after purchase; (iv) keep it deliberately and have the actuary model the deferred case separately. *Owner: JLCVSO, with VRS actuarial input.*
- **DECISION 9 — Health insurance credit and COLA commencement.** See the two new Part 4 rows and Part 3.4 as corrected. Neither cost is reachable by exclusion drafting, because both key off the **date of retirement**. Options: (i) accept and price both, and say so in the brief and to the money committees; (ii) amend Chapter 14 and § 51.1-166 to delay commencement for bridge retirees by the period of acceleration — which is more intrusive than anything else in the bill and will be read as creating a second class of retiree; or (iii) offset by raising the bridge price above approximate normal cost, which abandons the proposal's central pricing premise. **Magnitude as modeled (MOO-259):** the health insurance credit exposure is roughly **$5,300 per state retiree** with 26 years of service, on a separately funded trust; the COLA exposure is not separately quantified. Neither sits inside the 0.19 bp contribution-rate figure in Part 5.1, because both run on trusts outside the retirement allowance funds — a committee will ask for them separately. *Owner: JLCVSO.*
- **DECISION 10 — § 51.1-153 B 4 public-safety scope.** See the new Part 4 row. Either add an express exclusion for B 4-resolution employees in B 1 and J, or include them knowingly and give the actuary a permanent, growing population. This decision also determines the equal-treatment answer in Part 5.5: as currently drafted the operative line is **not** "veterans vs. non-veterans" but "public-safety employees in resolution localities vs. everyone hired since January 1, 2014," which has nothing to do with veteran status. Resolving this also requires an express rule for which deficit formula applies to a B 4 member, since the B 4 deeming does not reach B 2. *Owner: JLCVSO.*

### 6.2 Items drafted in version 1.1 that should be confirmed

- **DECISION 11 — Achievable-acceleration cap and refund right.** Version 1.1 adds C 2 d (no purchase of credit that would not advance the member's eligibility date, measured against the age-50 gate and the member's normal retirement date), I 2 (mandatory written pre-purchase estimate), and subsection K (cancellation and refund with interest where the credit cannot produce acceleration). These respond to four scenarios in which the bill as first drafted authorized purchases that provably bought nothing — including a member at age 44 with 26 years who would reach 30 actual years by age 50 anyway, and a member at 65 with 17 years whose normal retirement date arrives at the same time as her Rule-of-90 date. A single constituent who paid $35,000 for nothing would end this bill in a later session. Confirm the architecture, and in particular whether refunds should carry the Board's assumed rate of return (drafted) or a lower statutory rate. *Owner: JLCVSO + VRS.*
- **DECISION 12 — Free military credit under § 51.1-142.2 I no longer consumes the bridge allowance.** Version 1.0 capped the bridge at four years less all military service "purchased by **or credited to**" the member under § 51.1-142.2, which swept in the **no-cost** credit granted under subsection I to a member who deploys from a covered position and returns within a year of discharge — the mechanism through which Virginia honors 38 U.S.C. § 4318. A Guard member with three years of subsection I credit would have had a one-year bridge cap, penalised for the most sympathetic fact pattern in the target population and arguably for exercising a federally protected right. C 2 b and H 2 are now limited to service **purchased** under § 51.1-142.2 B 2. Confirm; this slightly increases the aggregate military credit available to that group. *Owner: JLCVSO.*
- ~~**DECISION 5 — Deferred retirement.**~~ **Superseded by DECISION 8.** Version 1.0 proposed to let a deferred member keep purchased credit, and treated that as a member-favorable confirmation item. Independent review showed it is the bill's largest unpriced exposure, not a detail. It is now a blocker.
- **DECISION 6 — Rule-of-90 ratio.** One-for-one is drafted as directed. Confirm with the acceleration asymmetry in Part 1.2 in mind: four bridge years produce up to four years of acceleration under B 2 but only **two** under B 3 for a member who remains in service, because age and service each advance by one point a year. **Correction:** for a **deferred** member whose creditable service is frozen, the sum advances by only one point a year, so four bridge points accelerate B 3 eligibility by a full **four** years. The two-year figure stated in version 1.0 holds only for members who stay. *Owner: JLCVSO.*
- **DECISION 7 — Conversion right.** § 51.1-142.4 H 4 lets a member later convert bridge credit to full creditable service at actuarial equivalent cost, crediting amounts already paid. This is member-favorable and keeps the full-value route genuinely open, but adds administrative complexity and an actuarial question about the credit's application. Confirm retention. *Owner: JLCVSO + VRS.*
- **COUNSEL 1 — Placement of the "unreduced service retirement allowance" definition.** Section-scoped (drafted) or chapter-wide in § 51.1-124.3. *Owner: DLS.*

**Items that must be answered but do not change the drafted text.**

- ~~**ACTUARY 1 — Price versus value.**~~ **Modeled and closed as an internal work item (MOO-259).** Price recovers 11%–78% of value; maximum per-member subsidy $341,065; employer rate impact 0.19 bp combined. See Part 5.1 and `08-fiscal-model-memo.docx`. **Two residual asks remain open against VRS:** (i) confirm the additive 50/10 early-retirement reduction construction (the model's 0.400 factor) against the Board's actual factor tables before the 112.8% actuarially-equivalent figure is used publicly; and (ii) produce the numeric Plan 2 and hybrid 60/5 reduction factor table, which VRS does not publish and for which the model substitutes a documented proxy. *Owner: VRS actuary.*
- ~~**ACTUARY 2 — Population.**~~ **Modeled and closed as an internal work item (MOO-259).** 14,000–17,000 members in the four-point band per year, mean eligibility deficit 2.2 years, of whom 246–347 are estimated to hold purchasable qualifying service; ~222 purchasers over FY2029–FY2038 at moderate take-up. **Residual ask:** the veteran-and-purchasability funnel rests on one published anchor (6% veteran share of the classified state workforce, DHRM, January 21, 2025) and four assumed filters, and no published figure exists for teachers or political subdivisions. That funnel alone moves the aggregate from 0.07 to 0.44 bp and is the single largest uncertainty in the fiscal case. Section 12 of the fiscal memorandum lists the ten member-level data items VRS should supply; **items 4, 5, 6 and 7 of that list should be added to the § 51.1-142.4 reporting requirement in section 3 of the bill** before introduction. *Owner: VRS actuary; drafting owner: this office.*
- **COUNSEL 2 / 3 / 4** — see Parts 5.2, 5.3, 5.4.
- **VRS policy** — whether the Board reads "approximate normal cost of the retirement plan under which the member is covered" as permitting a bridge-specific rate under the language as drafted, or whether the bill must say so expressly.
- **Effective date** — July 1, 2028 is drafted. VRS should confirm the implementation lead time it needs for separate accounting under § 51.1-142.4 I.

---

## Part 7 — What this package does and does not claim

1. Every Code citation in this package was read in the current official text at law.lis.virginia.gov on October 19, 2026. No section number was inferred. § 51.1-142.4 was confirmed unoccupied.
2. "Plan 1," "Plan 2," "vesting," "earned service," and "benefit-calculation service" are **not** operative terms in Title 51.1 and are not used in the bill. Each was traced to the statutory provision that actually controls before any language was drafted.
3. The bill is **not** final statutory text. It is a drafting handoff. DLS controls the final form, section-reenactment scope, and conventions.
4. The claim that the package is complete as to unintended effects is bounded by Part 4's enumeration and by Part 6's open items. **Version 1.1 update:** the independent adversarial pass has reported (MOO-260) and returned twelve findings and fourteen citation defects, two of which falsified Part 4 conclusions; the precedent and stakeholder scan has reported (MOO-261); and the cost model for ACTUARY 1 and ACTUARY 2 has reported (MOO-259) and is integrated into Part 5.1. The cost model is illustrative and is **not** the VRS Board's § 30-19.1:7 statement, which has not been requested; its weakest input is the veteran-population funnel, which VRS does not publish, and it does **not** price the DECISION 8 deferred-member case. The adversarial pass was performed by the same attorney who drafted the package, because the independent Red Team / Counsel Reviewer was unavailable. That is a real limitation on its value and it should be re-run by a different reader before introduction.
5. Two factual claims in this package remain **unverified** and should not be repeated to a legislator until they are: the enactment clauses of 2026 c. 563 (whether that act carries a delayed effective date, a second enactment or a sunset), and the assertion that no comparable eligibility-only military service credit bill has been introduced in Virginia before, which requires a direct LIS full-text search.
6. Part 4's enumeration of creditable-service thresholds is not exhaustive. Two further sets exist and are protected by the § 51.1-124.3 carve-out without amendment: § 51.1-513.2 (long-term care program, five-year threshold) and Chapter 4 (§ 51.1-403 C, thirty-year allowance floor; § 51.1-404 D, twenty-year provision).
