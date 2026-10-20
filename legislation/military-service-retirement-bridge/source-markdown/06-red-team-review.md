# Red Team / Counsel Review — Military Service Retirement Bridge

**Issue:** MOO-260 (adversarial pass on the MOO-257 package)
**Reviewer:** VRS2 — Virginia Public Pension Benefits Attorney
**Date:** October 19, 2026
**Materials reviewed:** `01-bill-draft.md`, `02-legal-analysis-memo.md`, `03-jlc-one-page-brief.md`, `04-jlc-two-page-brief.md`, `05-source-appendix.md`
**Authority:** every Code citation below was read in the official text at law.lis.virginia.gov on October 19, 2026 (per-section pages and `vacodefull` chapter text). Full Title 51.1 Chapters 1, 4, 5, 11, 11.1 and 14 were retrieved and searched programmatically for "unreduced," for creditable-service thresholds, and for retirement-eligibility triggers. Titles 2.2 and 30 cross-references were read directly.

> **Verdict.** The three-move architecture (new section + definitional carve-out + conforming amendments) is sound and does what the memo claims for *benefit-amount* protection. It fails in a different place: the bill controls what bridge credit **is**, but not what an **earlier retirement date** does. Four of the findings below are leaks of that second kind, and one of them (F-01) is an order of magnitude larger than anything in the memo's Part 5.1 pricing discussion. Twelve findings; five are blockers before introduction.

---

## Findings, ranked

### F-01 — BLOCKER. A member may buy at normal cost, resign the next day, and take an unreduced allowance at 50 that they could otherwise never obtain before 65. Acceleration up to ~15 years, not four.

**Cites.** Va. Code § 51.1-153 C; § 51.1-153 B 2; § 51.1-155 A 2; draft § 51.1-142.4 B 1, B 5; memo Part 1.2 ¶3 and DECISION 5.

§ 51.1-153 C provides that "[a]ny member who terminates service after five or more years of creditable service, regardless of termination date, may retire under the provisions of subsection A, B, or D if he has not withdrawn his accumulated contributions prior to the effective date of his retirement," and that "any requirements as to the member being in service shall not apply." Subsection B includes **B 2 and B 3**. A deferred member's creditable service is frozen.

Draft § 51.1-142.4 B 1 requires member-in-service status **only on the purchase date**. Nothing in the bill conditions the credit on continued service, and the memo's DECISION 5 affirmatively elects to let deferred members keep it.

**Failure scenario (B 2 / "Plan 1").** Member joined 2005, age 44, 26.0 years of creditable service, $70,000 salary. Eligibility deficit under C 1 a = 4.0. Buys 4 years at the Plan 1 approximate normal cost: 4 × 12.50% × $70,000 ≈ **$35,000**. Resigns the following month; does not withdraw contributions. At age 50 she retires under § 51.1-153 C → B 2 (age 50 ✓, "30 years of creditable service" ✓ by force of the § 51.1-153 B 2 amendment) and receives the **unreduced** § 51.1-155 A 1 allowance.

Counterfactual without the credit: her creditable service is frozen at 26, so § 51.1-155 A 2 clause (ii) — "the first date on which he would have completed a total of 30 years of creditable service" — never arrives. Her only unreduced route is **normal retirement at 65** (§ 51.1-153 A; "normal retirement date" = 65th birthday, § 51.1-124.3). Retiring at 55 under B 1 would carry a full ten-year A 2 actuarial reduction.

**Result: ~15 years of acceleration purchased for ~$35,000.** The memo's Part 5.1 illustration prices a four-year acceleration. This is not that case, and the behavioral incentive to produce it is obvious and self-selecting: buy while employed at normal cost, leave, defer, collect unreduced at 50.

**Same defect, smaller magnitude, on the B 3 pathway.** Memo Part 1.2 ¶3 states that under B 3 "the sum of age and service grows at two points per year, so four bridge points accelerate unreduced eligibility by only two years." That is true only for a member who **stays**. For a deferred member, service is frozen and the sum grows at **one** point per year, so four bridge points accelerate by a full **four years** (age 64 → age 60 on a 26-year record). The memo's stated maximum B 3 acceleration is wrong for the population most likely to buy.

**Fix options.** (i) Require member-in-service status at retirement, not merely at purchase; (ii) forfeit or pro-rate the credit on termination; (iii) make the credit usable only in combination with creditable service actually earned after purchase; (iv) if DECISION 5 is kept deliberately, price it — the actuary must model the deferred-member case separately, because it is the dominant-strategy case.

---

### F-02 — BLOCKER. Health insurance credit and COLA both commence up to four years earlier. Neither is addressed, neither is fixable by exclusion drafting, and the briefs tell JLCVSO the opposite.

**Cites.** Va. Code §§ 51.1-1400 A, 51.1-1401 A, 51.1-1402 A, 51.1-1403 A; § 51.1-166 C and D; § 51.1-1400 D (HIC funded through the employer contribution rate under § 51.1-145); draft § 51.1-142.4 F 7, F 8; `04-jlc-two-page-brief.md` line 51; `03-jlc-one-page-brief.md` line 36.

The memo's own method identifies three provisions that key off the *date* of unreduced eligibility and closes them. It does not apply the same method to provisions that key off the **date of retirement itself**. Two do, and they are the two largest recurring costs after the early-retirement subsidy.

**(a) Health insurance credit.** § 51.1-1400 A: the credit is payable to a former state employee "who retired under the Virginia Retirement System ... and who (i) rendered at least 15 years of total creditable service," and is "credited monthly to any retired state employee participating in the state retiree health benefits program." The trigger is **retirement plus 15 years**. Bridge credit does not change the 15-year threshold and does not change the per-year dollar amount — the brief's claim on that point is literally correct — but it moves the **commencement date** up to four years earlier, which adds up to four years of payments. For a state retiree with 26 years: $4.25 × 26 = $110.50/month = $1,326/year, **≈ $5,300 per member** of additional HIC trust-fund liability. §§ 51.1-1401, 51.1-1402 and 51.1-1403 work the same way for teachers ($4.00/yr), local employees ($1.50/yr, $45 cap) and local officers ($1.75/yr, $52.50 cap, borne by the Commonwealth). Each section separately provides that a member who defers under § 51.1-153 C receives the credit "on the effective date of his retirement" — so F-01's deferred-member path accelerates HIC too.

Draft F 8 bars the credit from "[e]stablish[ing] eligibility for, or increas[ing] the amount of, a health insurance credit." Neither verb reaches duration. There is no exclusion that can fix this without amending Chapter 14 to delay HIC commencement for bridge retirees.

**(b) COLA.** The bill amends § 51.1-166 **D 4** and adds F 7. But D 4 applies only to a person "who has less than 20 years of creditable service," and **no bridge purchaser can ever be in that class** (see F-09). The actual COLA question is not D 1–D 4 at all: a bridge retiree falls outside D 1, D 2, D 3 and D 4, so COLA commences on the ordinary § 51.1-166 C determination-date schedule — measured from the member's **actual** retirement, i.e. up to four years earlier, on a longer-lived annuity, compounding at up to 3% (5% for the pre-2010 population) for life. The bill closes a door that was never open and leaves the real one wide.

**Messaging exposure.** `04-...` line 51 says the § 51.1-124.3 carve-out protects "the health insurance credit (both its 15-year eligibility threshold and its per-year dollar amount) ... automatically," and `03-...` line 36 lists "the health insurance credit" and "COLA start date" among items carrying "express exclusions." A money committee will read those as "no HIC cost, no COLA cost." The Board's mandatory § 30-19.1:7 statement will say otherwise, on two separately funded trusts. Per the briefs' own warning — "if we claim cost-neutrality and the Board says otherwise, the bill dies" — these two lines must be rewritten before the package goes to a patron.

---

### F-03 — BLOCKER. § 2.2-3204 A converts employer-purchased Workforce Transition Act years from *age* into *creditable service* once the employee is "eligible for unreduced retirement." Bridge credit flips that switch, and every catch-all in the bill stops at the Title 51.1 line.

**Cites.** Va. Code § 2.2-3204 A (and C); § 2.2-3202; § 51.1-166 D 2 (which already cross-references § 2.2-3204); draft § 51.1-142.4 F 1, F 12, F 15.

§ 2.2-3204 A: an involuntarily separated employee who is a vested VRS member and at least 50 "may elect to have the Commonwealth purchase on his behalf years to be credited to **either his age or creditable service** or a combination of age and creditable service, **except that any years of credit purchased on behalf of a member ... who is eligible for unreduced retirement shall be added to his creditable service and not his age**."

Whether the employer-funded years land on **age** (which only shortens an actuarial reduction) or on **creditable service** (which multiplies straight into the § 51.1-155 A 1 allowance at 1.70%/1.65% × AFC) turns entirely on unreduced-retirement eligibility. Bridge credit creates that eligibility.

**Failure scenario.** State employee, age 50, 26 years, $70,000. Buys 4 bridge years for ~$35,000 → eligible for an unreduced allowance under § 51.1-153 B 2. Is then involuntarily separated in a reduction in force. She elects § 2.2-3204 in lieu of severance. Her severance cash value (15+ years of service → up to 36 weeks of salary plus 12 months of benefit continuation under § 2.2-3203 A(iv) and D) divided by 15% of annual compensation yields roughly 2–3 purchased years. Because she is now "eligible for unreduced retirement," those years are added to **creditable service**, not age: her allowance rises by roughly 1.70% × 3 × AFC ≈ **5.1% of AFC, permanently, employer-funded.** Without the bridge the same years would have gone to age and produced no increase in the multiplier.

That is a direct, employer-paid **benefit-amount increase** caused by bridge credit — the one thing the design intent forbids absolutely.

**Why the bill does not catch it.** F 15's catch-all reaches only benefits "under **this title**." F 1 reaches only requirements "under **this title**." F 12 is limited to § 51.1-138 and Chapters 2 and 2.1. § 2.2-3204 is in **Title 2.2**. The bill contains no Title 2.2 conforming amendment and the memo's Part 4 table contains no Title 2.2 row.

**Secondary exposure in the same section.** § 2.2-3204 A conditions the age-50 (rather than age-60) gate on the employee being "a person to whom the provisions of subdivision B 3 of § 51.1-153 do not apply," and § 2.2-3204 C 1 turns on whether "the provisions of subdivision B 3 of § 51.1-153 apply to him." If "apply" is read as "qualifies under," bridge credit also moves the WTA age gate and the C 1 reduction. That reading is available and should be foreclosed.

**Fix.** Add a conforming amendment to § 2.2-3204 A (and C) providing that eligibility for unreduced retirement, and the application of § 51.1-153 B 3, are determined without regard to credit granted under § 51.1-142.4; and change F 15's "under this title" to "under this title or Title 2.2."

---

### F-04 — BLOCKER. Local firefighters, law-enforcement officers and EMS personnel in "B 4 resolution" localities are permanently **inside** the bridge — including 2026 hires. The memo and both briefs say hazardous-duty members are excluded.

**Cites.** Va. Code § 51.1-153 B 4; § 51.1-155 A 3 (final paragraph); **§ 51.1-169 A, third sentence**; § 51.1-138 B; draft § 51.1-142.4 B 1, J; memo Part 4 ("Hazardous duty / § 51.1-138 benefits — **No** — express exclusion") and Part 5.5(ii); `03-...` line 36 ("hazardous-duty benefits").

§ 51.1-153 B 4 lets a political subdivision irrevocably resolve that its EMS personnel, firefighters and law-enforcement officers "shall not be considered a person who becomes a member on or after July 1, 2010" and "shall be deemed to have at least 60 months of creditable service as of January 1, 2013," for purposes of B 1, B 3, subsection D and § 51.1-155 A 3. The source appendix records this correctly at **S-19** — and then the memo draws the opposite conclusion.

The decisive provision, which the package never cites, is **§ 51.1-169 A**: "Any person who meets the definition of 'emergency medical services personnel' in § 32.1-111.1 or is employed as a firefighter, or law-enforcement officer as those terms are defined in § 15.2-1512.2 **and whose employing political subdivision has legally adopted an irrevocable resolution as described in subdivision B 4 of § 51.1-153 and subdivision A 3 of § 51.1-155 shall not be eligible to participate in the hybrid retirement program.**"

So a B 4-resolution public-safety employee, **whenever hired, including this year**, is:

- **not** a hybrid participant → draft B 1(i) does not exclude them;
- **not** a Chapter 2 / 2.1 / 3 member → B 1(ii) does not exclude them;
- **not necessarily** covered by § 51.1-138 → B 1(iii) does not exclude them. § 51.1-169 A excludes § 51.1-138-eligible persons and B 4-resolution persons in **two separate sentences**, which is conclusive that the two elections are distinct. A locality may adopt a B 4 resolution without electing § 51.1-138 B SPORS-equivalent benefits, and many do.

Because the B 4 deeming turns B 3 off for them, the pathway that remains is **B 2 — age 50 plus 30 years, one point of credit for one year of service, the most generous acceleration in the bill.**

**Failure scenario.** A city firefighter hired in 2026 in a B 4-resolution locality, age 50 with 26 years in 2052, buys 4 bridge years at the **Plan 1 non-hazardous** approximate normal cost and retires unreduced at 50. Meanwhile a veteran teacher hired the same year in the same city is excluded as a hybrid participant. Nothing about veteran status distinguishes them.

**Consequences.** (1) The population VRS must price is permanent and growing, not a closing pre-2014 cohort — the memo's DECISION 2 premise ("the exclusion will narrow further every year") is wrong for this group. (2) The Part 4 table row and the Part 5.5(ii) equal-treatment answer are both incorrect and will be falsified by the first local public-safety association that reads the bill. (3) The equal-treatment argument inverts: the bill's line is not "veterans vs. non-veterans," it is "public-safety employees in resolution localities vs. everyone hired since 2014."

**Fix.** Decide the question on the merits and draft it: either add an express exclusion for B 4-resolution employees in § 51.1-142.4 B 1 and J, or include them knowingly, correct the memo and briefs, and give the actuary the right population. Also confirm the applicable approximate normal cost rate for this class.

---

### F-05 — BLOCKER. The eligibility-deficit formulas ignore the age-50 gate and the normal retirement date, so the bill authorizes purchases that provably buy nothing — and there is no refund or cancellation path.

**Cites.** Draft § 51.1-142.4 B 5, B 6, C 1 a, C 1 b, C 2, G; Va. Code § 51.1-153 A and B 2; § 51.1-124.3 ("Normal retirement date").

§ 51.1-153 B 2 requires **age 50 *and* 30 years**. Draft C 1 a measures the deficit against the service leg only: "30 years minus the member's creditable service." B 5 bars a purchase only if the member has **already attained** unreduced eligibility. B 6 requires only that the deficit exceed zero. Nothing tests whether the purchase can move the eligibility date at all.

**Failure scenario 1 (total loss).** Member hired at 18; at age 44 she has 26.0 years. Deficit = 4.0. She buys 4 years for ~$35,000 and is credited with "30 years" at 44 — but B 2 holds her to age 50, and by 50 she has **32 actual years** and satisfies B 2 without any credit. Her unreduced date is age 50 either way. She paid $35,000 for nothing. G gives her no refund: the only exit is cessation of membership plus a refund of accumulated contributions under §§ 51.1-128 / 51.1-161, which forfeits the credit and wrecks her pension.

The correct cap for a B 2 member is **min(30 − CS, age + 30 − CS − 50)**. The second term is the binding constraint and it is absent from the bill. Whenever `age − CS ≤ 20`, the second term is ≤ 0 and **every** purchase is worthless.

**Failure scenario 2 (partial loss, far more common).** Age 48, 25.0 years. Buys 2 years (deficit 5, cap 4 — C 2's "lesser of" rule permits a partial purchase). One year later C 1 a recomputes the deficit as 30 − 26 − 2 = 2; she buys 2 more, reaching the 4-year ceiling. At age 50 she has 27 actual + 4 credit = 31. Without any credit she would have reached 30 years at age 53. Actual acceleration: **3 years purchased as 4.** One year — about $8,750 — is dead.

**Failure scenario 3 (B 3 against the normal-retirement ceiling).** Age 65, 17.0 years, so 82 points; deficit 8, cap 4. She buys 4 → 86, needs two more calendar years → reaches 90 at age 67. Her normal retirement date is Social Security retirement age — **also 67** — at which § 51.1-153 A gives her an unreduced allowance with five years of service. **Zero acceleration.** B 5 does not catch this because she has not yet *attained* eligibility on the purchase date.

**Failure scenario 4 (buy and keep working).** B 2 member buys 4 at age 50 with 26 years, then works to 60. Her allowance, PLOP window (frozen at the unaffected age-54 date), HIC and COLA are all identical to the no-purchase case. The credit bought nothing and the money is unrecoverable.

**Fix.** (i) Cap the purchase at the acceleration actually achievable, computed against the age-50 gate and the member's normal retirement date; (ii) add a cancellation-and-refund right, with interest, where credit has not been used to establish eligibility by the member's unaffected unreduced-eligibility date; (iii) require VRS to furnish a written acceleration estimate before any purchase of service contract is executed. A single constituent who paid $35,000 for nothing is enough to kill this bill in a subsequent session.

---

### F-06 — HIGH. § 51.1-155 A 2's test is "30 years of **service**," not "creditable service." Neither the new § 51.1-155 C nor the F exclusion list uses that word.

**Cites.** Va. Code § 51.1-155 A 2 ("If the member has less than 30 years of **service** at retirement, the amount of the retirement allowance shall be reduced on an actuarial equivalent basis..."); compare § 51.1-155 A 3 ("creditable service"); § 51.1-138 C (same bare "service"); draft § 51.1-155 C, third sentence; draft § 51.1-142.4 F, opening words.

The new § 51.1-155 C bars bridge credit from "determining whether a member has 30 or more years of **creditable service** ... for purposes of subdivision A 2." A 2 does not use that term. F's opening excludes the credit from being "service credit, creditable service, prior service, membership service, active service, service as an employee, or service for which retirement credit is granted" — **bare "service" is not in the list.**

**Failure scenario.** A Plan 1 member retires at 55 under § 51.1-153 B 1 with 26 actual years plus 4 bridge years. Her allowance is computed under § 51.1-155 A 2. She argues she has "30 years of service at retirement" within A 2's plain words — the statutory term the drafters never excluded — and therefore takes an **unreduced** allowance at 55 through a pathway subsection E was written to foreclose. The counter-argument (E's "shall be included only" closed list, plus F's "service for which retirement credit is granted") is probably good, but it is an argument, not a provision, and it has to be made against the literal text of the section the bill itself is amending.

**Fix.** Add "service" to F's opening enumeration, and conform § 51.1-155 C to A 2's actual language ("30 years of service"). One word in two places.

---

### F-07 — HIGH. Internal contradiction between F 10 and G: the bill both requires and forbids the return of the member's own bridge payment on death or withdrawal. (This is the over-reach the review was asked to look for.)

**Cites.** Draft § 51.1-142.4 F 10 and G; Va. Code § 51.1-124.3 ("Accumulated contributions" — "all amounts the member may contribute to purchase **creditable service**"); §§ 51.1-162 A, 51.1-163, 51.1-161, 51.1-142.2 C, 51.1-153 C.

G provides that member-paid bridge amounts "shall be included in the member's accumulated contributions for purposes of §§ 51.1-128, 51.1-161, 51.1-162, and 51.1-163." F 10 provides that eligibility credit shall not be used to "[d]etermine eligibility for, or the amount of, **any benefit payable under § 51.1-162 or 51.1-163**." § 51.1-162 A is the return of accumulated contributions on death before retirement; § 51.1-163 is the post-retirement excess-of-contributions payment. A VRS administrator applying F 10 literally would exclude the bridge money from exactly the two payments G was drafted to secure. The distinction the drafters intend — between the *credit* and the *amounts paid for* the credit — is nowhere stated.

**Related over-reach by omission.** G's fix is a **section-list override, not an amendment to the § 51.1-124.3 definition.** Every other use of "accumulated contributions" in the Code therefore excludes bridge money, including:

- **§ 51.1-142.2 C** — repurchase of refunded service is priced at "the withdrawn amount ... plus interest ... at the assumed rate of return established by the Board." If the refund included the bridge money, is the repurchase price inflated by it? And the member who repays it does **not** get the bridge credit back: G restores it only "by a new purchase." The member can end up **paying twice for one thing, or paying and receiving nothing.** Administratively undeterminable as drafted.
- **§ 51.1-153 C** — deferred retirement conditioned on not having "withdrawn his accumulated contributions."
- **§ 51.1-161 C** — an election to transfer accumulated contributions to an optional retirement plan "shall be treated as a withdrawal ... for purposes of § 51.1-128," but it is **not a "refund ... received"** by the member, which is G's forfeiture trigger. A member who transfers out keeps the bridge credit on the ledger while taking the money.

**Fix.** Amend the § 51.1-124.3 definition of "accumulated contributions" to include amounts paid under § 51.1-142.4; carve the amounts (as distinct from the credit) out of F 10; add § 51.1-142.2 C and § 51.1-161 C rules.

---

### F-08 — HIGH. No disposition path when bridge credit becomes permanently unusable: the money is stranded with no refund.

**Cites.** Draft § 51.1-142.4 J, G, H 4; Va. Code § 51.1-138 B; Chapters 2, 2.1, 3; § 51.1-205; § 51.1-169 A; § 51.1-161 C.

J provides that the section "shall not apply" to Chapter 2 / 2.1 / 3 members, hybrid participants and § 51.1-138 employees — but says nothing about a member who **becomes** one after purchasing. Three ordinary career moves strand the payment:

1. **Promotion into a § 51.1-138 B hazardous-duty position** (a locality election, not a plan change). The member remains a Chapter 1 member but retirement eligibility is now determined on the SPORS-equivalent terms of § 51.1-138 B/C, not § 51.1-153 B 2/B 3. The credit's only authorized use (subsection E) evaporates. F 12 bars any § 51.1-138 effect. No refund.
2. **Transfer into SPORS or VaLORS.** Eligibility is then governed by § 51.1-205 / § 51.1-216, not § 51.1-153. J says the section does not apply to such members — ambiguous as between "no new purchases" and "the credit is void" — and either way the credit can never be used. No refund.
3. **Election into an optional retirement plan under § 51.1-161 C.** See F-07.

**Fix.** Add an express rule: on any event that makes the credit permanently unusable, the member-paid amount is refunded with interest at the Board's assumed rate (or converted to § 51.1-142.2 service credit under the H 4 mechanism), and the credit is cancelled.

---

### F-09 — MEDIUM. Two provisions the memo bills as discovered leaks cannot actually be reached; one provision the memo flags is never analyzed.

**(a) § 51.1-166 D 4 is arithmetically unreachable.** D 4 applies only to a person "who has less than 20 years of creditable service." A B 2 bridge retiree necessarily has at least 26 actual years. A B 3 bridge retiree can have under 20 years of creditable service only if `age + service ≥ 90` with `service < 20`, i.e. **age > 70** — and at that age the member is long past normal retirement date (65, or Social Security retirement age) with five or more years of service, so § 51.1-153 A already gives them an unreduced allowance and draft **B 5 bars the purchase outright.** The memo's Part 3.4 worked example — "age 70 + 16 years + 4 bridge years = 90" — is therefore impossible: that member is already unreduced-eligible and ineligible to buy. Keep the D 4 amendment as belt-and-braces, but **fix the example**; VRS's actuary will falsify it in the § 30-19.1:7 statement, and the real COLA problem is F-02(b).

**(b) § 51.1-166 D 3 is named in the memo's Part 2 table but never resolved.** On review it is safe, and the package should say why: D 3's test is fixed "as of January 1, 2013," and no credit granted on or after July 1, 2028 can bear on a January 1, 2013 determination. Worth one sentence so that DLS does not add a conforming amendment that is not needed.

**(c) Title 51.1 "unreduced" coverage is otherwise complete.** A programmatic search of Chapters 1, 4, 5, 11, 11.1 and 14 found the word "unreduced" **only** in § 51.1-165.01 B and § 51.1-166 D 3 and D 4. The bill's Title 51.1 coverage of that term is complete. The gaps are outside Title 51.1 (F-03) and outside the word "unreduced" (F-02).

---

### F-10 — MEDIUM. For a § 51.1-153 B 4 member, VRS cannot determine which deficit formula applies; and Plan 1/Plan 2 reclassification by later purchase is unaddressed.

**Cites.** Va. Code § 51.1-153 B 2 ("Subject to the provisions of subdivision 3") and B 4; § 51.1-155 A 1 ("creditable service performed **or purchased** on or after January 1, 2013"); draft § 51.1-142.4 B 2, C 1.

**(a) The B 4 straddle.** The B 4 deeming is scoped "for purposes of subdivisions B 1 and B 3 and subsection D, and subdivision A 3 of § 51.1-155" — **B 2 is not in the list.** Two readings are available for a post-2010 B 4-resolution member:

- *Reading 1:* evaluating B 2 requires asking whether B 3 applies; the deeming answers that question in the negative; so B 3 is off and B 2 is available. → **C 1 a** applies (30-year deficit, one-for-one, four years of acceleration).
- *Reading 2:* the deeming is scoped to B 3 only, so for B 2 purposes the member remains a post-2010 member and B 2's "subject to" clause bars them — while B 3 is simultaneously switched off. → **neither** formula applies and the member cannot buy at all.

That latent ambiguity in current law is harmless today. Draft B 2 ("Is a member to whom subdivision B 2 or B 3 of § 51.1-153 applies") and C 1 make it **determinative of eligibility, price and amount**, which is an administratively undeterminable result for a real and identifiable class of members.

**(b) Reclassification.** The B 2/B 3 line turns on whether a member "does not have at least 60 months of creditable service **as of January 1, 2013**." A later purchase of *prior* service under § 51.1-142.2 is creditable service attributable to a pre-membership period. If such a purchase could retroactively satisfy the 60-month test, a member could move from B 3 to B 2 **after** the deficit was computed and the credit priced, and the bill contains no reclassification rule. The better reading is that it cannot — § 51.1-155 A 1 distinguishes creditable service "performed **or purchased** on or after January 1, 2013," which shows the General Assembly treats purchased service as having its own date — but the statute does not say so, and the whole deficit architecture depends on the answer.

**Fix.** Add an express rule in § 51.1-142.4 for B 4-resolution members, and a provision that a member's classification under § 51.1-153 B 2 or B 3 is determined as of the purchase date and is not altered by any subsequent purchase.

---

### F-11 — MEDIUM. Over-reach: C 2 b and H 2 make **free** military credit — including credit a member receives as of right after military leave — consume the bridge allowance.

**Cites.** Draft § 51.1-142.4 C 2 b and H 2; Va. Code § 51.1-142.2 B 2 and **subsection I**; 38 U.S.C. § 4318.

§ 51.1-142.2 **I** grants credit **at no cost** to a member who was on leave of absence from a covered position, was not dishonorably discharged, did not withdraw contributions, and reentered covered service within one year. It is a standalone right; the four-year cap sits in subdivision B 2 and does not reach it. It is also the provision through which Virginia honors the pension-accrual guarantee of 38 U.S.C. § 4318.

Draft C 2 b caps the bridge at four years less "all service credit for prior active duty military service previously purchased by **or credited to** the member under § 51.1-142.2," and H 2 imposes the same combined cap. The words "or credited to ... under § 51.1-142.2" sweep in **subsection I credit**.

**Failure scenario.** A Guard member deploys for three years from a covered position and returns within a year of discharge. She receives three years at no cost under § 51.1-142.2 I. Fifteen years later, four points short of the Rule of 90, she applies for bridge credit. Her C 2 b cap is 4 − 3 = **1 year**. She is denied three-quarters of the bridge *because she deployed from a Virginia public job and came back* — the single most sympathetic fact pattern in the bill's target population, and arguably a penalty attached to a federally protected right.

**Fix.** Limit C 2 b and H 2 to service credit **purchased** under subdivision B 2 of § 51.1-142.2, expressly excluding credit granted under subsection I.

---

### F-12 — MEDIUM. Federal law: the purchase probably falls **outside** IRC § 415(n) precisely because it buys no accrual, which creates § 415(c) exposure and removes 403(b)/457(b) funding. Resolve before introduction.

**(a) § 415(n) likely does not apply.** IRC § 415(n)(3)(A) defines "permissive service credit" as service credit "**recognized by the plan for purposes of calculating a participant's benefit under the plan**," which the member has not received and may receive only by voluntary additional contribution. Bridge credit is, by express design, **not** recognized for calculating the benefit. The memo (Part 5.3) calls the mapping "unusual"; the sharper point is that clause (i) appears **not to be satisfied at all**, with three consequences the memo does not draw:

1. **§ 415(c).** Voluntary after-tax employee contributions to a governmental defined benefit plan are treated as annual additions (Treas. Reg. § 1.415(c)-1(a)(2)(ii)(B)). § 415(n)(1)(B) is the relief provision that lets a governmental plan avoid an annual-additions failure on a service purchase. Without it, a ~$35,000 lump sum could exceed the § 415(c) limit in the year of purchase. § 51.1-168 addresses §§ 415(b) and 415(d), not this.
2. **Funding sources disappear.** IRC § 403(b)(13) and § 457(e)(17) permit trustee-to-trustee transfers to a governmental defined benefit plan only "for the purchase of permissive service credit (as defined in section 415(n)(3)(A))" or a § 415(k)(3) repayment. If bridge credit is not permissive service credit, members **cannot** fund it from a 403(b) or 457(b) account — which is how most VRS members fund service purchases. That is a material design fact for JLCVSO, not just a tax footnote.
3. **§ 414(h)(2) pick-up.** The bill's payroll-deduction route (§ 51.1-142.4 D, via § 51.1-142.2 F) needs a determination that the deductions are picked-up employee contributions. Do not assume the § 51.1-142.2 treatment carries over to a different section buying a different thing.

**(b) § 401(a) definitely-determinable benefits — downgrade this concern.** The *amount* of the benefit is untouched by bridge credit, and the eligibility condition is objective and fixed in statute. Treas. Reg. § 1.401-1(b)(1)(i) is satisfied on its face. The governmental-plan exemptions in IRC §§ 401(a)(5)(G) and 401(a)(26)(G) also take § 401(a)(4) nondiscrimination and § 401(a)(26) off the table. Counsel's time is better spent on (a).

**(c) USERRA / 38 U.S.C. ch. 43 — no conflict, with one exception.** § 4318's reemployment pension guarantee reaches service performed **during** covered employment, which § 51.1-142.2 I implements. The bridge addresses service **before** VRS membership and is outside ch. 43. The exception is F-11, where the bill makes federally protected no-cost credit consume a state purchase allowance.

**(d) 10 U.S.C. ch. 1223 — the package never cites the operative section, and the eligibility framing changes the analysis.** The controlling provision is **10 U.S.C. § 12736**: no period of service included in determining a person's right to non-regular retired pay "may be excluded in determining his **eligibility** for any annuity, pension, or old-age benefit, under any other provision of law, State or Federal." The package cites only "10 U.S.C. ch. 1223" generically (draft H 5; memo Part 1.1, 5.2). Virginia has long read it as permitting *purchase* of reserve-component service rather than mandating free credit. But this bill's entire subject matter **is eligibility**, which engages § 12736's operative word directly and invites the argument that ch. 1223 service must be counted toward § 51.1-153 B 2/B 3 eligibility **at no cost**. That question must be put to legislative counsel with § 12736 in front of them before introduction, not met for the first time in committee.

---

## Citation and verification results (issue item 2)

Verified against the official text at law.lis.virginia.gov, October 19, 2026.

**Confirmed correct.** § 51.1-142.4 is unoccupied (the URL resolves to the Title 51.1 table of contents; Chapter 1 runs §§ 51.1-100–51.1-169 and contains §§ 51.1-142, 51.1-142.2, 51.1-142.3 only) — S-38 ✓. The § 51.1-124.3 definitions of "creditable service," "prior service," "membership service," "accumulated contributions," "normal retirement date," "actuarial equivalent" and "average final compensation" are quoted **verbatim correctly** — S-08 through S-13 ✓. The draft's reproductions of § 51.1-142.2 B 2 and B 3, § 51.1-153 B 2 and B 3, and § 51.1-162 B's "subdivision A 4 of § 51.1-155" sentence are verbatim correct. § 51.1-155 has only subsections A and B, so adding a subsection C is clean ✓. § 51.1-153's unchanged-subsection note (A, C, D, E, F; B 1, B 4) ✓. § 51.1-165.01 has subsections A–F ✓. § 51.1-166 has A–C and D 1–4 ✓. The § 51.1-303 B quotation is **exact** — S-35 ✓. § 51.1-505's $8,000 / 30-year floor is in **subsection B** and the 20-year double-salary provision in **subsection C** — S-32 ✓. § 51.1-169 B 3's vesting schedule ✓ — S-36 ✓. § 51.1-157 A does contain the five-year creditable-service condition the memo's Part 4 relies on ✓. § 51.1-124.3's history line ends "2018, cc. 53, 305; 2021, Sp. Sess. I, cc. 53, 54" ✓. § 51.1-142.2's history line ends "2024, cc. 267, 353; **2026, c. 563**" ✓.

**Defects to correct.**

| # | Location | Defect |
|---|---|---|
| C-1 | `01-bill-draft.md`, § 51.1-162 bracketed note | "Subsections A and C through E are unchanged" — **§ 51.1-162 has only subsections A, B and C.** There is no D or E. |
| C-2 | `01-bill-draft.md`, § 51.1-142.4 D | "in the same manner as for a purchase of service credit under subsection B of § 51.1-142.2" — **§ 51.1-142.2 B is silent on the compensation base.** It says only "the approximate normal cost ... as determined by the Board in its sole discretion." The "creditable compensation or average final compensation, whichever is greater" rule is VRS administrative practice, and its only statutory analogue is **§ 51.1-142.3 B**. As drafted the bill writes practice into statute while attributing it to a section that does not contain it, creates an unintended divergence from § 51.1-142.2 pricing, and arguably displaces the Board's sole discretion. Cite § 51.1-142.3 B or state the base expressly. |
| C-3 | `05-source-appendix.md`, S-04 | "subsection B, **third-to-last** paragraph." Subsection B's unnumbered paragraphs after subdivision 3 are, in order: the cost/24-month paragraph; the 10 U.S.C. ch. 1223 bar; the "active duty military service" definition. The ch. 1223 bar is the **second-to-last** paragraph. |
| C-4 | `01-bill-draft.md` § 51.1-142.4 B 4 and H 1; `05-...` S-03 | "the 24-month period described in **subdivision B 3** of § 51.1-142.2." That paragraph is framed "under this **subsection**" and reads as a concluding paragraph of **subsection B**, not of subdivision 3. DLS will need the right pinpoint; cite "subsection B." Same issue for the ch. 1223 bar, which reads "under this **section**" — note that it therefore does **not** reach purchases under § 51.1-142.4, which is why H 5 is load-bearing and must be retained. |
| C-5 | `05-...` S-23 | Incomplete statement of law. § 51.1-165.01 B 1(i) is satisfied by **either** "satisfied the requirements for normal retirement after January 1, 2004" **or** three years of post-unreduced-eligibility creditable service. The appendix states only the second branch. This matters: a bridge purchaser who works to normal retirement date retains full PLOP eligibility, which softens the memo's Part 3.3 warning. |
| C-6 | `05-...` S-29 | "Disability retirement requires only a member in service" omits **§ 51.1-157 A's** own "a member who has five or more years of creditable service" condition on the allowance. § 51.1-156 is correctly described; the allowance provision is not. |
| C-7 | `05-...` line 3 | "the per-section pages render their text client-side and do not return it in the page body" — **not correct.** The per-section pages (e.g. `.../section51.1-153/`) return full section text in the response body; all verification for this review was done that way. The stated methodological reason for relying on `vacodefull` is wrong and should be removed from the evidence record. |
| C-8 | `02-...` Part 1.1; `05-...` S-39 | "Refunded-service repurchase uses a 6.75% compounded interest rate." The statutory rate is **the Board's assumed rate of return** for the actuarial valuation in effect at the time of purchase (§ 51.1-142.2 C). 6.75% is the current Board assumption, not a statutory figure, and will move. |
| C-9 | `05-...` Part C, § 51.1-162 row | "(verify at drafting; not transcribed in full)" — now verified: the history line ends **"2011, c. 880; 2014, c. 356; 2015, c. 660."** |
| C-10 | `01-...` § 51.1-142.4 F 14 | The § 51.1-143.1 reference is **inapposite**: that section authorizes only **inbound** purchases of VRS service credit funded by a transfer *from* a political subdivision plan. It creates no outbound mechanism for anything to leave VRS. Separately, "shall not be ... recognized by any other retirement system or plan, **whether or not administered by the Board**" purports to bind plans Virginia has no authority over; limit it to plans administered by the Board and to agreements under § 51.1-143.1 and Chapter 8. |
| C-11 | `01-...` § 51.1-142.4 A, "Unreduced service retirement allowance" | The definition ("determined under subdivision A 1 of § 51.1-155 that is not subject to reduction ... under subdivision A 2 or A 3") does not track the section's architecture: A 1, A 2 and A 3 are **alternative** allowance subdivisions, not a base plus a reduction, and an A 2 allowance for a member with 30+ years is itself unreduced. The definition works only if read as "an allowance under A 1." Say that, or define it by reference to the absence of an actuarial-equivalent reduction however arrived at. |
| C-12 | `01-...` § 51.1-142.4 H 4 | Two gaps. (i) The conversion right is open to "a member," but § 51.1-142.2 B 2 requires a **member in service**; a deferred member or retiree cannot use it. Say "member in service." (ii) It credits "the amount previously paid **by or on behalf of** the member" against the actuarial equivalent cost — so an **employer**-paid bridge amount, which G makes non-refundable to the member, becomes a credit against the member's personal purchase obligation. That converts employer money into a member windfall and contradicts G. |
| C-13 | `01-...` § 51.1-142.4 F 13 | "shall not be used to ... [c]reate any accrual of or increase in a retirement allowance for any period, including any period after the member attains eligibility" is read-ably ambiguous as to the member's **own continued actual service** after the accelerated date. Recast affirmatively: "No eligibility credit shall itself accrue any retirement allowance for any period." |
| C-14 | `01-...` § 51.1-142.4 B | Subsection B screens eligibility to purchase but never requires that the amount purchasable under subsection C exceed zero. A member who already bought four years of military service credit under § 51.1-142.2 passes every B condition and is rejected only at the C stage. Add the condition to B. |

**Not verified — must be closed before introduction.** The **enactment clauses of 2026, c. 563** could not be retrieved: the LIS bill and chapter interfaces are now a client-rendered application and the legacy `legp604.exe` endpoints return "document does not exist" for every session-code variant tried. What *is* confirmed is that the § 51.1-142.2 text published as current on October 19, 2026 carries c. 563 in its history line and that the draft's reproduction of B 2 and B 3 matches that published text verbatim. What remains unknown is whether c. 563 carries a delayed effective date, a second enactment, a reenactment clause or a sunset. **Action:** pull the enrolled text of 2026 c. 563 from LIS (or the printed Acts of Assembly) and read its enactment clauses. Appendix Part C's caution on this point is correct and should stay until that is done.

Likewise, appendix Part D's statement that no prior Virginia bill proposing an eligibility-only military service credit was located **could not be independently confirmed** — LIS full-text search was not reachable from this environment. Do not let the brief assert novelty until someone runs that search in LIS directly.

---

## Exclusion list: completeness and over-reach (issue item 4)

**Over-reach found:** F-07 (F 10 vs. G, on the member's own money), F-11 (free § 51.1-142.2 I credit consuming the allowance), C-12(ii) (employer money converted to a member credit), C-10 (F 14 purporting to bind plans outside Virginia's authority), C-13 (F 13's ambiguity as to the member's own accrual).

**No over-reach found in:** F 1 (it bars only the *use of the credit* to satisfy service thresholds; a member's actual creditable service is untouched, so nothing a member earned is cut off), F 2, F 3, F 5, F 6, F 8, F 9, F 11, F 13. F 9's cross-references to §§ 51.1-1112, 51.1-1123, 51.1-1157 and 51.1-1165 are the correct set — they are precisely the four LTD sections § 51.1-1400 A itself cross-references.

**Completeness gaps beyond the findings above.** Two sets of creditable-service thresholds exist that the Part 4 table does not enumerate. Both are protected by the § 51.1-124.3 carve-out and need no amendment, but the memo should not claim an exhaustive enumeration without them: **§ 51.1-513.2** (long-term care program; "five or more years of creditable service with any retirement plan administered by the Virginia Retirement System") and **Chapter 4** (§ 51.1-403 C, thirty-or-more-years allowance floor; § 51.1-404 D, twenty-or-more-years provision).

---

## Political and messaging exposure (issue item 6)

**1. The pricing attack, which the memo already answers well — and a benchmark it missed.** Part 5.1 and the briefs correctly refuse the cost-neutrality frame. What the package does not have is the General Assembly's **own published price for exactly this good**: § 2.2-3204 A sets the cost of each year of age-or-creditable-service credit purchased under the Workforce Transition Act at **15 percent of the employee's present annual compensation.** That cuts both ways and both ways are useful. Adverse: the Commonwealth's own statutory number is 15%, against the bridge's 12.50% Plan 1 / 10.74% Plan 2 approximate normal cost — a committee member who finds this will ask why veterans should pay less than the WTA rate. Favorable: it is far better precedent than § 51.1-303 B. § 51.1-303 B is precedent for narrow-scope *carve-outs* (correctly characterized in the memo), but **§ 2.2-3204 is precedent for the thing itself** — the Commonwealth already buys age and service credit to manufacture retirement eligibility, by statute, at a stated price. Put it in the brief.

**2. The two claims that will be contradicted by the Board's own impact statement.** `04-...` line 51 ("the health insurance credit (both its 15-year eligibility threshold and its per-year dollar amount) ... automatically") and `03-...` line 36 (listing "the health insurance credit," "COLA start date" and "hazardous-duty benefits" among protected items). F-02 and F-04 show all three are wrong or materially incomplete. The § 30-19.1:7 statement goes to the Clerks, the Commission on Local Government, House Appropriations and Senate Finance and Appropriations — i.e. to the same members reading the brief. Rewrite these lines before the package leaves the building.

**3. Equal treatment — the line is not the one the brief defends.** Part 5.5 frames the exposure as hybrid members excluded and hazardous-duty members excluded. After F-04 the real line is: **public-safety employees in B 4-resolution localities are in, forever, including 2026 hires, while everyone else hired since January 1, 2014 is out.** That distinction has nothing to do with veteran status and is much harder to defend than the one the brief prepares for. Either fix the scope or prepare the actual answer.

**4. "You can buy your way out of an actuarial reduction, and some people will buy nothing at all."** F-05's stranded-purchase scenarios and F-01's deferred-member scenario are the two most quotable attacks available to an opponent: one veteran pays $35,000 and gets nothing; another pays $35,000 and gets fifteen years. Both are products of the draft as written, and both are fixable.

**5. Precedent risk.** The memo's answer — that the credit is military-specific rather than a general eligibility-purchase mechanism — is the right answer and should be kept. It is weakened by F-04 (because the de facto beneficiary class is defined by occupation, not service) and by F-01 (because a buy-and-defer mechanic generalizes trivially to any group).

---

## Member-detriment disclosures JLCVSO should make affirmatively

None of these are drafting errors; all are consequences of retiring earlier, and all should be in the member-facing materials so no one is surprised.

| Effect | Authority |
|---|---|
| A member who retires at the accelerated date will generally have **no PLOP**, because the qualifying window is frozen at the unaffected eligibility date. A member who uses the bridge and keeps working to normal retirement date retains PLOP via § 51.1-165.01 B 1(i). | § 51.1-165.01 B; draft F 6; cf. C-5 |
| Retiring early ends **death-in-service** coverage; survivors fall under § 51.1-163 instead of the § 51.1-162 B joint-and-survivor-equivalent allowance. | § 51.1-162 B ("dies **in service**") |
| A B 2 bridge retiree with 26–29 actual years **loses the $8,000 group life floor**, which requires 30 years of creditable service; bridge credit cannot supply it. | § 51.1-505 B; draft F 11 |
| Retiree group life begins its 25%-per-year reduction earlier, and the coverage amount is fixed on a lower final salary. | § 51.1-505 B |
| Fewer years of accrual and a lower AFC: the unreduced allowance is computed on actual creditable service only. | § 51.1-155 A 1; draft E, final paragraph |
| Career active-component military retirees are generally barred from purchasing at all. Memo Part 5.2 states this correctly and it is the single most important expectation to manage. | § 51.1-142.2 B, concluding paragraphs; draft B 4, H 5 |

---

## Priority order for the parent task

1. **F-01** — deferred-member acceleration. Largest unpriced exposure in the bill.
2. **F-02** — HIC and COLA commencement; rewrite the two brief claims.
3. **F-03** — § 2.2-3204 conforming amendment; extend F 15 beyond Title 51.1.
4. **F-04** — decide B 4-resolution scope; correct Part 4 and Part 5.5.
5. **F-05** — cap the purchase at achievable acceleration; add a refund path.
6. **F-06, F-07, F-08** — term mismatch; F 10/G contradiction; stranded-credit disposition.
7. **F-12** — § 415(n)/§ 415(c) and § 12736 to counsel **before** introduction.
8. **C-1 through C-14** — citation and drafting corrections.
9. **2026 c. 563 enactment clauses** and the LIS novelty search — both still open.

Fixes belong to the parent task owner (MOO-257). No changes were made to the package files.
