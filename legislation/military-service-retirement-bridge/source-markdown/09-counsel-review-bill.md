# Independent Counsel Review — Military Service Retirement Bridge, bill text version 1.2

**Prepared by Policy Development Team using legal, policy, and financial analysis tools, pending review by veterans' legal counsel.**

**This document:** independent adversarial review by the Red Team / Counsel Reviewer, performed without participation by the drafting team. **Review date:** October 20, 2026. **Subject:** operative bill text **version 1.2**, package **version 1.3**, repo `dam8u/VRSLite` branch `main` at commit `5963f90`, path `legislation/military-service-retirement-bridge/`. **Requested by:** MOO-264.

**Authority read:** official Code of Virginia at `law.lis.virginia.gov`, retrieved October 20, 2026 (Title 51.1 Chapters 1, 2, 2.1, 3, 4, 5, 6, 6.1, 7, 8, 9, 10, 11, 11.1, 12, 13, 14, 15 in full; Title 2.2 Chapter 32 in full; Constitution of Virginia art. IV §§ 12, 14 and art. X § 11). Federal authority read in primary text: 10 U.S.C. § 12736; I.R.C. § 415(n).

> **Scope and status.** This is **internal risk analysis, not legal advice.** It is not a legal opinion, it creates no attorney-client relationship, and **no counsel has reviewed or cleared any part of this package.** Nothing here authorizes introduction. I have not edited the bill or any other package document, as directed; every proposed change is stated as a redline for the Title 51.1 sign-off owner to apply.
>
> **Posture.** I treated every conclusion in `01-bill-draft.md`, `02-legal-analysis-memo.md`, `05-source-appendix.md` and `06-red-team-review.md` as a claim under test, including the three structural moves and the seven recorded decisions. Where I agree, I say so explicitly in Part 7, because a null result is a finding. Where I disagree with the Title 51.1 sign-off analysis, Part 8 says so and shows the provision.

---

## Part 0 — Bottom line

**30 findings: 3 blockers, 15 material, 12 minor.**

**The single most serious finding is C-02:** subdivision **K 1 b** directs that the Board **"shall cancel"** the member's eligibility credit and **refund the purchase price with interest** upon *"the occurrence of any event … after which eligibility credit granted to the member can no longer be applied as authorized by subsection E."* **Retirement is such an event.** Read as written, every member who successfully uses the bridge to retire under § 51.1-153 B 2 or B 3 is entitled, on the day she retires, to a mandatory refund of everything she paid for the acceleration she has just received. Subsection K's heading ("Cancellation and refund where eligibility credit *cannot produce acceleration*") shows the contrary intent, but a heading is not operative text and "the earlier of" makes retirement the controlling trigger because the K 1 a trigger never fires for a member who retires early. This is a one-clause fix and it must be made before the text goes anywhere.

**Two further blockers also sit in the version 1.2 additions**, i.e. in the newest and least-reviewed language: **C-01** (subdivision E 3 voids the credit for an ordinary member whose last day of service is not the calendar day before her retirement date — which § 51.1-153 E expressly permits) and **C-03** (the in-service condition is defeated by a single day of rehire, which reopens the roughly fifteen-year acceleration path that DECISION 8 was adopted to close, and with it restores the understatement in the cost model that the package has now withdrawn).

**The one leak I found that the package has not:** clause B 1 does not reach persons who are **ineligible for the hybrid retirement program because they are "eligible to be participants in" an optional retirement plan under §§ 51.1-126.1, 51.1-126.3, 51.1-126.4 or 51.1-126.7** (§ 51.1-169 A, second sentence) and who participate in the VRS defined benefit plan instead. That class is open in **every hire year**, exactly like the § 51.1-153 B 4 class that DECISION 10 was adopted to close. The package's headline fact for the money committees — that **"the beneficiary class is now closed and shrinking across the entire bill"** — is therefore **not established** and should be withdrawn or qualified until VRS confirms the headcount. See **M-01**.

**On the three questions you put to counsel:**

- **10 U.S.C. § 12736 does not preempt any part of this bill as drafted** — but the package's quotation of § 12736 is **wrong**, and the words it omits are the dispositive ones. See **M-02** and Part 3.C.
- **I.R.C. § 415(n)(3)(A)(i) is very likely not satisfied**, and the package's diagnosis is right. Its *sizing* is wrong: the serious consequence is the loss of 403(b)/457(b) trustee-to-trustee funding, not § 415(c). See **M-15** and Part 3.E, which states the exact question to put to tax counsel.
- **The § 51.1-153 B 4 fix in new subdivision C 1 c is not sound.** It is in the wrong instrument. See **M-04** and Part 3.D.

---

## Part 1 — The strongest case against, in the opposition's voice

*What follows is the brief I would write if I were opposing this bill before House Appropriations, drawing only on this package and the Code.*

> The Commonwealth already sells this product. Under § 51.1-142.2 B 2 a veteran may buy up to four years of **real** creditable service — service that raises the allowance, counts toward the health insurance credit, counts toward the group life thresholds, and counts toward the thirty-year floor — and may do so **at any time** while a member in service. Nothing in current law shuts that door; after twenty-four months the price simply becomes the actuarial equivalent cost, which is to say the honest price. What this bill adds is not access. It is a **discount**. It takes the one thing the existing purchase right prices correctly and sells a different, more expensive good at the cheaper good's price.
>
> We do not have to argue about the magnitude, because the proponents have modeled it. Their own figures: the price recovers **eleven cents on the dollar** in the lead profile; an actuarially equivalent price would be **112.8 percent of salary** per year purchased against the **12.50 percent** charged; the member pays **$42,500** for **$383,565** of value. And the General Assembly has already fixed its own price for manufacturing retirement eligibility: **fifteen percent of the employee's present annual compensation**, § 2.2-3204 A. This bill asks veterans to pay *less* than the Commonwealth charges itself for the identical good.
>
> Second, the beneficiary class is not the class in the one-pager. The twenty-year career retiree drawing retired pay — the veteran in the photograph — generally **cannot use this at all**, because § 51.1-142.2 B bars the purchase of service counted in another retirement allowance and § 51.1-142.4 H 5 inherits that bar verbatim. The members who *can* use it are veterans who served, separated, and have since accumulated twenty-six years in VRS. The proponents' own model concedes the rest: on a work-to-eligibility baseline the member **overpays in every profile tested**. So the subsidy exists only for members who were going to leave anyway. The bill moves money out of the trust to the people who need it least and charges the people it was written for $42,500 for nothing.
>
> Third, this is a new species in Virginia pension law: a **second, parallel service ledger** that counts for one purpose and is excluded from every other, which the Retirement System must now carry for forty years across member statements, benefit estimators, employer reporting, the group life interface and the health insurance credit interface. Subsection F contains **fifteen separate exclusions**. Each one is a seam. And the drafters concede that the seams already leak at the edges that matter: the health insurance credit and the COLA both commence **up to four years early** because they follow the retirement date rather than creditable service, and the COLA exposure has **never been quantified by anyone**.
>
> Fourth — and this is the paragraph that ends the bill in committee — read new subdivision **E 3** against **subsection K**. E 3 says the credit counts only if the member "was a member in service **on the day immediately preceding the effective date of his retirement**." § 51.1-153 E says the effective date of retirement "shall be **after** the last day of service of the member." A teacher whose last contract day is June 10 and whose retirement is effective July 1 was not in service on June 30. Her four years vanish, and she learns it at the counselling appointment. Meanwhile **K 1 b** commands that the Board "**shall cancel**" the credit and refund the price "upon … the occurrence of any event … after which eligibility credit … can no longer be applied as authorized by subsection E" — and retirement is such an event. So the bill as written either strips the benefit from the member who did everything right, or hands the money back to the member who has already banked the benefit. One constituent with one letter is sufficient.
>
> Fifth, the funding posture. Article X, § 11 of the Constitution of Virginia requires that "[r]etirement system benefits shall be funded using methods which are consistent with generally accepted actuarial principles," and that the trust funds "be invested and administered **solely in the interests of the members and beneficiaries** thereof." In January 2026, on a different benefit-enhancement bill, the Board told this committee in its fiscal impact statement that "it would be **prudent from a fiduciary standpoint to only enhance benefits if they can be funded upfront** to avoid creating additional unfunded liabilities." This bill funds nothing upfront, requests no appropriation, and has not been to the Board at all — the § 30-19.1:7 statement has not even been **requested**.
>
> We are not asked to decide whether veterans deserve something. We are asked to decide whether *this* is it, and whether a bill whose newest three provisions contradict each other on their face is ready for a floor vote.

I can make this case. That is the test the working method sets, and the bill survives it only once the three blockers in Part 2 are fixed — and only if the "closed and shrinking" claim in Part 0 is corrected rather than repeated.

---

## Part 2 — Findings, ranked

### Index

| # | Sev. | Category | What is wrong | Where |
|---|---|---|---|---|
| C-01 | **Blocker** | Drafting / benefit void | E 3's in-service test is keyed to the calendar day before retirement; § 51.1-153 E permits a gap | § 51.1-142.4 E 3 |
| C-02 | **Blocker** | Drafting / windfall | K 1 b mandates refund of the price on retirement, i.e. for every successful user | § 51.1-142.4 K 1 b |
| C-03 | **Blocker** | Compliance arbitrage | One day of rehire restores the ~15-year deferred acceleration DECISION 8 closed | E 3; G 2; K |
| M-01 | Material | Scope leak | ORP-eligible / hybrid-ineligible VRS DB participants stay inside the bill in every hire year | § 51.1-142.4 B 1 |
| M-02 | Material | Citation integrity | 10 U.S.C. § 12736 is misquoted package-wide; the omitted proviso is dispositive | Note 8; memo 5.2, 5.3; review F-12(d) |
| M-03 | Material | Undefined / misused term | "Purchase of service contract" is a § 51.1-124.3 defined term limited to § 51.1-142.2 | B, C 1, I 1, I 2, cl. 2 |
| M-04 | Material | Wrong instrument | C 1 c cannot make § 51.1-153 B 2 *apply* to a member to whom it does not otherwise apply | C 1 c |
| M-05 | Material | Effective-date trap | Reenacting § 51.1-155 effective July 1, 2028 collides with the July 1, 2028 sunset of B 3 and B 4 | § 51.1-155 note; cl. 2 |
| M-06 | Material | Double count | A K refund is not deducted from accumulated contributions | K 3; G 1 |
| M-07 | Material | Indeterminate standard | C 2 d inside a "least of" list reads as the *smallest* amount producing acceleration | C 2 d |
| M-08 | Material | Drafting | K 1 interest has no accrual period, compounding rule or start date | K 1 |
| M-09 | Material | Disclosure misstates law | I 2(vii) tells the member two things that are not true | I 2(vii) |
| M-10 | Material | Constitutional form | Art. IV, § 12 requires the amended sections be "reenacted and published at length" | Whole draft |
| M-11 | Material | Unimplemented fix | No rule fixes the member's B 2 / B 3 classification as of the purchase date | B 2; C 1; E |
| M-12 | Material | Evidence label | "$341,065 … frozen-service/subsidy scenario" misdescribes the model's own baseline | README; briefs; note 7(c); memo 5.1 |
| M-13 | Material | Fiscal assumption | One-at-a-time sensitivity treats take-up and φ as independent; compounding gives 1.16 bp | memo 5.1; fiscal memo |
| M-14 | Material | Unpropagated finding | Group life and death-in-service detriments never reached memo Part 4 or I 2 | memo Part 4; I 2 |
| M-15 | Material | Risk mis-sizing | § 415(c) is not the live tax exposure; the funding-source loss is | Note 8; memo 5.3 |
| m-01 … m-12 | Minor | — | See **Minor findings** below | — |

---

### C-01 — BLOCKER. Subdivision E 3 voids the credit for an ordinary member whose last day of service is not the calendar day before her retirement date.

**Statutory basis.** New § 51.1-142.4 **E 3**, first sentence: eligibility credit is included "only if the member **was a member in service on the day immediately preceding the effective date of his retirement**." Against **Va. Code § 51.1-153 E**: "The effective date of retirement shall be **after the last day of service of the member**, but shall not be more than 90 days prior to the filing of the notice of retirement." (Verified verbatim, § 51.1-153 E, read October 20, 2026.)

**Failure scenario.** A teacher in a VRS-participating school division buys four years of eligibility credit at age 46 with 26 years of creditable service. Her last contract day is **June 10, 2032**. Her retirement is effective **July 1, 2032**, which is the ordinary VRS practice and is expressly authorised by § 51.1-153 E. On **June 30, 2032** — "the day immediately preceding the effective date of his retirement" — she is not in service. Under E 3 her four years are disregarded; she is not eligible under § 51.1-153 B 2; her application is denied or converted to a reduced § 51.1-153 B 1 or D allowance. She paid roughly $35,000 for a benefit the statute took back on a technicality about a twenty-day gap that the Code itself authorises. The same result catches every member who uses accrued leave between her last worked day and her retirement date, every member whose separation date falls mid-month, and (under § 51.1-505 B's own phrasing) every member "who elects to postpone the receipt of his retirement allowance to some date other than his last day of service."

**Why the drafting note does not cover this.** Drafting note 10 identifies the approved-leave / long-term-disability case as the open question. It does not identify this one, which is not an edge case — it is the ordinary case for the teacher population the bill is largely aimed at.

**Proposed redline.** Replace the test with the concept the Code already uses for exactly this distinction. § 51.1-1400 A speaks of a person "who **elects to defer his retirement pursuant to subsection C of § 51.1-153**." Key E 3 to that:

> **3. Notwithstanding subsection C of § 51.1-153, eligibility credit shall be included as provided in subdivisions 1 and 2 only if the member ~~was a member in service on the day immediately preceding the effective date of his retirement~~ **retires directly from service and does not retire pursuant to subsection C of § 51.1-153. For purposes of this subdivision, a member retires directly from service if he was a member in service on his last day of service preceding the effective date of his retirement and did not terminate service, within the meaning of subsection C of § 51.1-153, before that effective date.** …**

This states the policy DECISION 8 actually adopted (exclude the deferred retiree) without creating a calendar trap for the member who retires in the ordinary way. It also resolves most of drafting note 10's open question as a by-product: see Part 6.

---

### C-02 — BLOCKER. Subdivision K 1 b commands a mandatory refund of the purchase price to every member who successfully uses the credit.

**Statutory basis.** New § 51.1-142.4 **K 1**: "The Board **shall cancel** a member's eligibility credit and **refund** to the member the amount the member paid … together with interest … **upon the earlier of**: a. The member's unaffected eligibility date, **if the member has not retired on or before that date**; or b. **The occurrence of any event, including a change in the member's membership or the plan or chapter under which the member's retirement eligibility is determined, after which eligibility credit granted to the member can no longer be applied as authorized by subsection E**; c. … ; or d. … ."

**Failure scenario.** A state employee buys four years at age 50 with 26 years, paying $42,500. Her unaffected eligibility date is age 54. She retires **effective age 50** under § 51.1-153 B 2 using the credit, and receives the unreduced allowance for life — the model values that at $383,565. K 1 a cannot fire: she *has* retired before her unaffected eligibility date. K 1 b does fire: retirement is "the occurrence of any event … after which eligibility credit granted to the member can no longer be applied as authorized by subsection E," because subsection E operates only on the determination of eligibility to retire, and after retirement there is no further such determination to make. K 1 b is cast in mandatory terms ("shall cancel … and refund"). The Board must therefore return her $42,500 with interest at the Board's assumed rate of return — and, because K 1 says "cancel," must also cancel the credit on which the allowance she is now drawing was granted. The bill contains no provision reversing or reducing an allowance already in pay status on cancellation of the credit, so the member keeps the unreduced allowance and gets the price back. Cost recovery falls from 11.1% to **zero**, for every purchaser, in every profile; the fiscal model's entire member-payment line ($7.29M of receipts) disappears.

**Why the heading does not save it.** Subsection K is captioned "Cancellation and refund **where eligibility credit cannot produce acceleration**," which states the opposite intent. Virginia courts treat catchlines as not part of the law (Va. Code § 1-217 provides that section catchlines are not law and may be changed by the Code Commission), and in any event the caption of a *subsection* in a bill is a drafting convenience with no enacted status at all. The operative words control.

**Proposed redline.** Add an express exclusion to K 1 b and a savings sentence to K 1:

> **b. The occurrence of any event, including a change in the member's membership or the plan or chapter under which the member's retirement eligibility is determined, after which eligibility credit granted to the member can no longer be applied as authorized by subsection E, **other than the member's retirement at which such credit was so applied**;**
>
> **No eligibility credit that has been applied as authorized by subsection E in determining a member's eligibility to retire shall be cancelled, and no amount paid for such credit shall be refunded, under this subsection.**

Also change "upon the earlier of" to "upon the **earliest** of" (four items; see **m-05**).

---

### C-03 — BLOCKER. The in-service-at-retirement condition is defeated by one day of rehire, which reopens the ~15-year acceleration path and restores the cost model's understatement.

**Statutory basis.** New § 51.1-142.4 **E 3** (condition attaches to *effect*, tested only "on the day immediately preceding the effective date of his retirement"); **G 2** (forfeiture occurs only where the member "ceases to be a member under § 51.1-128 **and receives a refund of his accumulated contributions**," or elects a § 51.1-161 C transfer); **K 1 a** (automatic refund only at the unaffected eligibility date) and **K 1 d** (refund only "upon the written request" of the member). Against **Va. Code § 51.1-128** (membership ceases on withdrawal of accumulated contributions, retirement, death, or Board dormancy policy — **not** on termination of service) and **§ 51.1-153 C**.

**Failure scenario.** A political-subdivision employee, age 44 with 26 years of creditable service, buys four years of eligibility credit for roughly $35,000 while in service. She resigns at 44 and does **not** withdraw her accumulated contributions, so under § 51.1-128 she remains a member and under G 2 she forfeits nothing. Her creditable service is frozen at 26, so her unaffected eligibility date is her normal retirement date — Social Security retirement age if she is in the § 51.1-153 B 3 class, or 65 — and K 1 a therefore will not fire for twenty-one years. She never makes a K 1 d written request. In the month she turns 50 she accepts any covered position with any participating employer for **one day**, becoming a member in service. The next day is the effective date of her retirement. She satisfies E 3 literally: she "was a member in service on the day immediately preceding the effective date of his retirement." She is not retiring "pursuant to subsection C of § 51.1-153," so the second sentence of E 3 and the § 51.1-153 C amendment are both inapplicable. Her 26 years plus 4 years of credit equal 30, she is 50, and § 51.1-153 B 2 as amended gives her the unreduced allowance — at age 50 rather than at her normal retirement date. Her average final compensation is unharmed because AFC runs on her **highest** consecutive 60 months of creditable service (§ 51.1-124.3), not her last.

That is the **roughly fifteen years of acceleration for about $35,000** that `06-red-team-review.md` F-01 identified as the largest unpriced exposure in the bill, reconstituted at the cost of one day of covered employment. The package currently tells the money committees that "closing that path means the model's aggregates are no longer understatements on this account, and the model does not need to be redone for F-01" (bill note 7(a); memo Part 5.1 "What the model does not price"). If this finding is right, **that statement must be withdrawn**, because the model prices four years of acceleration and this path delivers roughly fifteen. Using the model's own single-profile anchors, the per-member value moves from the **$21,000** work-to-eligibility figure toward the **$341,065** frozen-service figure — a factor of about sixteen on the profile the package itself publishes.

**Proposed redline.** Attach the condition to continuity of service, not to a single day, and make termination a forfeiture or refund trigger in its own right:

> **3. … only if the member **has been a member in service continuously from the date the eligibility credit was granted to his last day of service preceding the effective date of his retirement**. …**

and, in subsection K 1, add:

> **b1. The member's termination of service, whether or not he withdraws his accumulated contributions and whether or not he thereafter re-enters service;**

If the Council prefers to preserve a return-to-service route, the alternative is a minimum-service condition — e.g. the credit is included only if the member performs at least 60 months of membership service after the date the credit was granted — which keeps the benefit available to a member whose career is interrupted while removing the arbitrage. Either way, the present drafting cannot stand: it tests a status on one named calendar day and the status is purchasable.

---

### M-01 — Material. Clause B 1 does not reach persons made hybrid-ineligible by optional-retirement-plan eligibility, so the beneficiary class is **not** closed and shrinking.

**Statutory basis.** **Va. Code § 51.1-169 A, second sentence**, read October 20, 2026, verbatim: "Persons who are participants in, **or eligible to be participants in**, the retirement plans under the provisions of Chapter 2 (§ 51.1-200 et seq.), Chapter 2.1 (§ 51.1-211 et seq.), **the optional retirement plans established under §§ 51.1-126.1, 51.1-126.3, 51.1-126.4, and 51.1-126.7**, or a person eligible to earn the benefits permitted by § 51.1-138 **shall not be eligible to participate in the hybrid retirement program**." **Fourth sentence**: the hybrid mandate for persons first hired or rehired on or after January 1, 2014 applies only to "[e]very person **who is otherwise eligible to participate in the program**." Against new § 51.1-142.4 **B 1**, clauses (i)–(iv), and **J**.

**Who is in this class.** Each of the four named optional plans leaves a continuing route into the VRS **defined benefit** plan for new hires:

- **§ 51.1-126.1** (health care providers at affiliated teaching hospitals other than VCU Health and the UVA Medical Center): "**Any** health care provider employed by such teaching hospital on or after July 1, 1991, **may make an irrevocable election to participate in either the retirement plan established by this chapter** or the plan provided by the teaching hospital."
- **§ 51.1-126.3** (UVA Medical Center): an employee hired on or after July 1, 2003 who is a current VRS defined benefit member "**shall elect to either** (i) **continue to participate in such defined benefit retirement plan** or (ii) choose the plan provided by the Medical Center."
- **§ 51.1-126.4** (Virginia Port Authority), subsection D: "Pursuant to § 62.1-129.1, employees of the Authority **shall be eligible to continue their participation in the Virginia Retirement System** or may participate in an alternative retirement plan offered pursuant to this section." Subsection A's new-hire default is "subject to the eligibility criteria of that plan."
- **§ 51.1-126.7** (Virginia Outdoors Foundation): same structure as § 51.1-126.4.

**Failure scenario.** A health care provider is hired by an affiliated teaching hospital in **March 2031**. She is a veteran with four years of qualifying active duty service and no military retired pay. Within thirty-one days she makes the § 51.1-126.1 election to participate in "the retirement plan established by this chapter." Because she is "eligible to be a participant in" the § 51.1-126.1 plan, § 51.1-169 A's second sentence makes her **ineligible for the hybrid retirement program**, and the fourth sentence's January 1, 2014 hybrid mandate does not reach her because she is not "otherwise eligible to participate in the program." She is therefore a Chapter 1 **defined benefit** member who became a member after July 1, 2010, so § 51.1-153 **B 3** applies to her and § 51.1-142.4 B 2 is satisfied. Clause B 1(i) misses her (she is not a hybrid *participant*). Clause (ii) misses her (she is not a Chapter 2, 2.1 or 3 member). Clause (iii) misses her (no § 51.1-138 benefits). Clause (iv) misses her (she is not a § 51.1-153 B 4 public-safety employee). She buys the bridge in 2036. So will her successors hired in 2041 and 2051.

**Why this matters more than its headcount.** This is the **same structural defect** as F-04 / DECISION 10, which the package rated a blocker and spent a decision on: a route to hybrid-ineligibility that operates **in every hire year**, producing a population the actuary cannot close. The package's response to F-04 was to exclude post-2014 entrants in that route. It did not sweep the rest of § 51.1-169 A's second sentence. As a result the following statements are not established on the text and should not be repeated to a legislator: README ("**The beneficiary class is now closed and shrinking across the entire bill**"); bill note 7(c) (same; "the single most useful fact for the money committees"); bill note 5 ("As of version 1.2 that is now true without qualification"); memo Part 6.1 DECISION 10 ("closed and shrinking across the entire bill"); memo Part 6.0 DECISION 2 ("the exclusion now *does* produce a uniformly closing cohort — the earlier caveat is spent"); memo Part 5.5 ("the remaining eligible class … is closed and shrinking").

**I rate this material rather than blocker**, and the reason is honest severity discipline, not hedging: unlike F-04, the affected population is bounded by **four named employers** rather than open-ended across local government, and the money at stake is almost certainly immaterial. The *claim* it falsifies, however, is the one the package calls its most useful fact for the money committees, and a committee member who finds it has found the proponents overstating their own fix.

**Proposed redline.** Add a fifth clause to B 1 and a cross-reference in J:

> **(v) a person who was not a member of a retirement plan administered by the Virginia Retirement System the first time he was hired or rehired on or after January 1, 2014, in a covered position, and who is not eligible to participate in the hybrid retirement program described in § 51.1-169 by reason of his being a participant in, or eligible to be a participant in, a retirement plan established under § 51.1-126.1, 51.1-126.3, 51.1-126.4, or 51.1-126.7;**

and, in J, after "to any person described in clause (iv) of subdivision B 1," insert "**or clause (v) of subdivision B 1**."

**Verification caveat, stated plainly.** VRS may administer such hires into the hybrid program notwithstanding the second sentence of § 51.1-169 A. I could not confirm administrative practice from published sources. The finding is on the statutory text, which is where a litigant or a committee analyst will read it; the headcount question goes to VRS.

---

### M-02 — Material. 10 U.S.C. § 12736 is misquoted throughout the package, and the clause the package omits is the one that answers the question.

**What the package says.** Bill note 8: § 12736 "provides that service counted toward non-regular retired pay may not be excluded 'in determining his **eligibility** for any annuity, pension, or old-age benefit, **under any other provision of law, State or Federal**.'" The same quotation, with the same words, appears at memo Part 5.2, memo Part 5.3, and `06-red-team-review.md` F-12(d) (where it originated).

**What § 12736 actually says**, read in primary text on October 20, 2026:

> "No period of service included wholly or partly in determining a person's right to, or the amount of, retired pay under this chapter may be excluded in determining his eligibility for any annuity, pension, or old-age benefit, **under any other law, on account of civilian employment by the United States or otherwise**, or in determining the amount payable under that law, **if that service is otherwise properly credited under it**."

**Two defects.**

1. **The quoted words "under any other provision of law, State or Federal" do not appear in the statute.** The actual phrase is "under any other law, on account of civilian employment by the United States or otherwise." The package's version inserts an express reference to **State** law that the federal text does not contain — and the inserted words are precisely what makes the preemption worry look sharp. The real text reaches state benefits only through the general words "or otherwise," which is a materially weaker footing for the argument the package says must go to counsel.
2. **The package omits the closing proviso entirely: "if that service is otherwise properly credited under it."** That clause is dispositive. § 12736 is an **anti-exclusion** rule, not a crediting mandate: it forbids a benefit scheme from carving out chapter 1223 service that the scheme *otherwise properly credits*. It does not require a State plan to credit service the plan does not credit at all. Virginia does not "otherwise properly credit" unpurchased prior active duty service for § 51.1-153 B 2 or B 3 eligibility — such service enters the Code only through a **purchase** right in § 51.1-142.2 B 2 and, under this bill, § 51.1-142.4. There is accordingly nothing for § 12736 to operate on, and the argument the memo fears — "that chapter 1223 service must count toward § 51.1-153 B 2 and B 3 eligibility **at no cost**" — is defeated by the words the package left out.

**Failure scenario for the package, not for the bill.** A legislative-counsel reviewer, or a committee staffer, pulls § 12736 and finds that the package's central quotation of the one federal provision it says is load-bearing is not the statute's language. Every other federal and State citation in the package is then re-opened on the floor. The package's own credibility rule — "do not assert either to a legislator until closed" — is breached by a quotation the package presents as settled.

**Proposed redline.** In bill note 8, memo Part 5.2 and memo Part 5.3, replace the quotation with the verbatim text above, and replace the conclusion with:

> **10 U.S.C. § 12736 bars the exclusion of chapter 1223 service "in determining his eligibility for any annuity, pension, or old-age benefit, under any other law, on account of civilian employment by the United States or otherwise … if that service is otherwise properly credited under it." Because Virginia credits prior active duty service for § 51.1-153 B 2 and B 3 purposes only where the member purchases it, such service is not "otherwise properly credited" and § 12736 has no operative effect on this bill. The savings clause in § 51.1-142.4 H 5 ("Except as otherwise required by Chapter 1223 of Title 10 of the United States Code") in any event yields to whatever § 12736 does require. The narrow residual question for counsel is stated in Part 3.C of the counsel review: H 5 carries the savings clause, but the subsection B eligibility screen and subdivision C 2 c do not.**

Do not leave the memo saying that § 12736's application "is subject to counsel confirmation" without also stating the proviso, because the proviso is the answer and a reader who finds it will conclude the package did not read the section.

---

### M-03 — Material. "Purchase of service contract" is a defined term in § 51.1-124.3 limited to § 51.1-142.2 purchases, and the bill uses it throughout § 51.1-142.4 without amending the definition.

**Statutory basis.** **Va. Code § 51.1-124.3**, read October 20, 2026: "**'Purchase of service contract' means a contract entered into by the member and the Retirement System for the purchase of service credit by the member as provided in § 51.1-142.2.**" The bill uses the term in § 51.1-142.4 **B** (lead-in), **C 1**, **C 1 a**, **C 1 b**, **I 1**, **I 2**, and in **enactment clause 2**, in each case for a contract to purchase **eligibility credit under § 51.1-142.4** — which the bill's own subsection A says "does not constitute … creditable service" and which is not purchased "as provided in § 51.1-142.2."

**This is the identical failure mode the drafting team already found and fixed once.** The bill amends the § 51.1-124.3 definition of "accumulated contributions" for exactly this reason, and the draft's own explanation says why: "The definition reaches amounts contributed to purchase *creditable service*, and this bill is built on eligibility credit **not** being creditable service" (bill, "Why the 'accumulated contributions' amendment is necessary"). The same sentence, with "purchase of service contract" substituted, states this finding.

**Failure scenario.** The bill's effective-date clause provides that the act "shall apply only to purchases of, and **purchase of service contracts for**, military retirement eligibility credit entered into on or after [July 1, 2028]." A member enters a payroll-deduction arrangement in August 2028 to buy eligibility credit. The Board, applying the § 51.1-124.3 definition, concludes that what she signed is not a "purchase of service contract" within the meaning of Title 51.1, because the definition reaches only contracts for the purchase of service credit under § 51.1-142.2. Every statutory consequence the bill attaches to the existence of such a contract becomes arguable: the date on which her eligibility deficit is "determined as of" under C 1; the trigger for the pre-purchase written statement under I 2; and the act's own effective-date boundary. Nothing in the bill supplies a substitute term.

**Proposed redline.** Add to the § 51.1-124.3 amendment already in the bill:

> **"Purchase of service contract" means a contract entered into by the member and the Retirement System for the purchase of service credit by the member as provided in § 51.1-142.2 **or for the purchase of military retirement eligibility credit by the member as provided in § 51.1-142.4**.**

---

### M-04 — Material. New subdivision C 1 c is in the wrong instrument: it fixes the deficit formula but cannot make § 51.1-153 B 2 *apply* to the member.

**Statutory basis.** **Va. Code § 51.1-153 B 4**, verified verbatim October 20, 2026: a political subdivision may declare "that, **for purposes of subdivisions B 1 and B 3 and subsection D, and subdivision A 3 of § 51.1-155**," qualifying public-safety employees "(i) shall not be considered a person who becomes a member on or after July 1, 2010, and (ii) shall be deemed to have at least 60 months of creditable service as of January 1, 2013." **Subdivision B 2 is not in that list** — confirmed. **§ 51.1-153 B 2** opens: "**Subject to the provisions of subdivision 3**, any state employee, teacher, or employee of a political subdivision …". New § 51.1-142.4 **B 2** requires the member be "a member to whom subdivision **B 2 or B 3** of § 51.1-153 **applies**." New **C 1 c** provides that such a member "shall be treated **for purposes of this section** as a member to whom subdivision B 2 of § 51.1-153 applies."

**Why the fix does not reach the defect.** `06-red-team-review.md` F-10(a) correctly identified two available readings for a B 4-resolution member who became a VRS member on or after July 1, 2010. Under **Reading 1**, the B 4 deeming switches off B 3, so B 2's "subject to" condition is vacuously satisfied and B 2 applies. Under **Reading 2**, the deeming is scoped away from B 2, so for B 2 purposes the member remains a post-2010 member and B 2's "subject to subdivision 3" clause defers to B 3 — while B 3 is simultaneously switched off — so **neither** pathway is available to her.

C 1 c resolves which **deficit formula** § 51.1-142.4 uses. It cannot resolve Reading 2, because the member's right to retire comes from **§ 51.1-153**, not from § 51.1-142.4, and C 1 c is expressly limited to "purposes of this section." Under Reading 2 the member buys a credit under C 1 a, is granted it, satisfies E 3, and then cannot retire under B 2 at all — because § 51.1-153 B 2 does not apply to her and no provision of the bill makes it apply. The bill's § 51.1-153 B 2 amendment adds the credit into B 2's *service test*; it does not touch B 2's lead-in or B 4's purposes list. The bill's note for § 51.1-153 expressly states that "subdivisions B 1 and B 4 are unchanged."

**Failure scenario.** A firefighter employed by a resolution locality became a VRS member in **September 2011** (so clause B 1(iv) does not exclude her — she was a VRS member before January 1, 2014). In 2032, at age 46 with 26 years of combined creditable service, she buys four years of eligibility credit under C 1 a for roughly $35,000 at the hazardous-duty approximate normal cost rate. At age 50 she applies to retire under § 51.1-153 B 2. The Board, taking Reading 2, denies the application: B 3 has been switched off by the irrevocable resolution, and B 2 is "subject to the provisions of subdivision 3," to which she remains subject because the B 4 deeming does not extend to B 2. K 1 b then refunds her money (see C-02), four years late, and she has lost four years of accrual she would otherwise have earned. The class is small but identifiable: members of resolution localities whose first VRS membership falls between July 1, 2010 and December 31, 2013, plus any member who lacked 60 months of creditable service as of January 1, 2013.

**Proposed redline — fix it in § 51.1-153, which the bill already amends and reenacts.** The cleanest change is one word in B 4:

> **4. Notwithstanding the foregoing, a political subdivision by legally adopted resolution may declare to the Board that, for purposes of subdivisions B 1**, B 2** and B 3 and subsection D, and subdivision A 3 of § 51.1-155, …**

If the Council will not touch B 4 (it reaches beyond this bill's object and changes current law for non-veterans), the alternative is to amend B 2's lead-in in the bill's existing § 51.1-153 amendment:

> **2. Subject to the provisions of subdivision 3 **and except as provided in subdivision 4**, any state employee, teacher, or employee of a political subdivision …**

Either way, the fix belongs in § 51.1-153. Retain C 1 c for the deficit-formula question, which it answers correctly.

---

### M-05 — Material. Reenacting § 51.1-155 with a July 1, 2028 effective date collides with the July 1, 2028 expiration of § 51.1-155 B 3 and B 4.

**Statutory basis.** **Va. Code § 51.1-155 B 3** and **B 4** are each published with the catchline "**(Expires July 1, 2028)**" — confirmed in the current official text on October 20, 2026. The bill's § 51.1-155 bracketed note: "Subsections A and B are **unchanged and would be reenacted as they appear in current law**. A new subsection C is added." The bill's **enactment clause 2**: "the provisions of this act shall become effective on **July 1, 2028**."

**Failure scenario.** A 2027 act amends and reenacts § 51.1-155 "as it appears in current law," including subdivisions B 3 and B 4 and their expiration notations, with the whole act effective July 1, 2028. On July 1, 2028 two things purport to happen at once: the 2023 sunset expires B 3 and B 4, and a later-enacted act reenacts them at length. A party relying on the retiree-rehire exception in B 3 (school-board instructional employees) or B 4 (law-enforcement retirees serving as school security officers) argues that the 2027 reenactment, being later in time and expressly republishing the text, revived provisions the General Assembly intended to lapse. That is a live question of statutory construction with real money on both sides, created entirely by the interaction of this bill's effective date with a sunset the drafting notes never mention. It is also precisely the kind of collateral consequence that makes a patron drop a bill rather than defend it.

**Proposed redline — drafting note, not bill text.** Add to drafting note 4 or a new note:

> **Sunset interaction, for DLS and the patron. § 51.1-155 B 3 and B 4 expire July 1, 2028, which is this act's effective date. The reenacted § 51.1-155 must either omit subdivisions B 3 and B 4, or carry their expiration notations expressly, so that the reenactment is not read to revive them. The patron should be told that the July 1, 2028 effective date was chosen for VRS implementation lead time (memo Part 5.4) and that moving it to July 1, 2029 would remove this collision at no policy cost.**

Also check at drafting whether any other section the act reenacts carries an expiration; of the eight amended sections, § 51.1-155 is the only one that does on the October 20, 2026 text.

---

### M-06 — Material. A refund under subsection K is not deducted from the member's accumulated contributions, producing a double count against § 51.1-163 and § 51.1-155 A 5.

**Statutory basis.** New § 51.1-142.4 **G 1**: member-paid amounts "shall be credited to the member's individual account in the member's contribution account and **shall be included in the member's accumulated contributions**." New **K 3**: "A refund under this subsection shall not constitute a refund of accumulated contributions for purposes of § 51.1-128, § 51.1-153, or § 51.1-161, **and shall not affect the member's membership, creditable service, or any other benefit**." Against **Va. Code § 51.1-163**: "any excess of his accumulated contributions **as of the effective date of his retirement**, over the total retirement allowances received by him, shall be paid …"; and **§ 51.1-155 A 5**: the 50/10 allowance equals "the greater of (i) the actuarial equivalent of the benefit the member would have received had he terminated service and deferred retirement to age 55 or (ii) the actuarially calculated **present value of the member's accumulated contributions**, including accrued interest."

**Failure scenario.** A member buys four years of eligibility credit for $35,000 at age 46 with 24 years of creditable service, intending to reach age 50 with 30. At 50 she has 28 actual years, is short of the B 2 threshold even with the credit by the terms of her own deficit computation, and retires instead under § 51.1-153 **D** (50/10). K 1 b fires: after retirement the credit can no longer be applied under subsection E, so the Board cancels it and refunds the $35,000 with interest. Her allowance under § 51.1-155 **A 5** was computed at retirement on the greater of two measures, one of which is the present value of her accumulated contributions — a figure that, under G 1, **included the $35,000**. K 3 says the refund "shall not affect … any other benefit," so nothing reduces that computation. She receives the $35,000 twice: once as a cash refund, once as a permanently higher annuity floor. She then dies at 62; **§ 51.1-163** pays her beneficiary the excess of accumulated contributions "**as of the effective date of his retirement**" over allowances received — a figure that again includes the $35,000 already refunded to her in cash.

**Proposed redline.** Replace the second clause of K 3 and add a deduction rule:

> **3. A refund under this subsection shall not constitute a refund of accumulated contributions for purposes of § 51.1-128, § 51.1-153, or § 51.1-161, and shall not affect the member's membership or creditable service. **The amount refunded shall be deducted from the member's individual account in the member's contribution account and shall not thereafter be included in the member's accumulated contributions for any purpose, including subdivision A 5 of § 51.1-155 and §§ 51.1-162 and 51.1-163.**

---

### M-07 — Material. Subdivision C 2 d is indeterminate, and the reading that the "least of" construction compels defeats the benefit.

**Statutory basis.** New § 51.1-142.4 **C 2**: "The amount of eligibility credit a member may purchase **shall not exceed the least of**: … **d. The amount of eligibility credit that would advance the date on which the member becomes eligible for an unreduced service retirement allowance to a date earlier than the member's unaffected eligibility date.** The Board shall determine such amount, taking into account … (iii) **the creditable service the member is projected to perform**."

**Three problems.**

1. **Indeterminacy.** The description "the amount of eligibility credit that would advance the date …" is satisfied by *any* amount that produces acceleration. Because it sits inside a "shall not exceed the **least** of" list, the construction that the sentence structure compels is the **smallest** such amount. For a Plan 1 member at age 46 with 26 years, one month of credit advances her eligibility date; so does four years. Under the compelled reading her cap is one month. The purposive reading (the *largest* amount that still advances the date) is available and is obviously intended, but the bill should not make the size of the benefit turn on which reading the Board adopts.
2. **A projection is not an objective standard.** C 2 d makes the **maximum purchasable amount** turn on the Board's projection of future service. The memo's Part 5.3 downgrades the I.R.C. § 401(a) "definitely determinable benefits" concern on the stated ground that "the eligibility condition is **objective and fixed in statute**," satisfying Treas. Reg. § 1.401-1(b)(1)(i) on its face. C 2 d is not objective and not fixed in statute. The downgrade therefore rests on a premise the text does not supply, and the point should be restored to the question put to tax counsel.
3. **No true-up.** The cap is computed once, at purchase, on a projection. Nothing recomputes it. A member projected to work six more years, whose purchase is capped accordingly, who then leaves after two, keeps a credit that accelerates her far more than the cap contemplated. This is the same mechanism as C-03, reached by a different route.

**Failure scenario.** Two members with identical facts purchase in the same month under different Board guidance. One is sold four years; the other, under a Board reading that applies "the least of" literally, is sold one month and told that is the statutory maximum. The second member's counsel writes to the Board. Whichever way the Board has gone, it is exposed on the other.

**Proposed redline.**

> **d. The **greatest** amount of eligibility credit **beyond which no additional amount of eligibility credit would further advance** the date on which the member becomes eligible for an unreduced service retirement allowance to a date earlier than the member's unaffected eligibility date. The Board shall determine such amount, taking into account (i) the attainment of age 50 required by subdivision B 2 of § 51.1-153, (ii) the member's normal retirement date and the member's eligibility for an unreduced service retirement allowance under subsection A of § 51.1-153, and (iii) the member's creditable service **at the date of purchase, together with the creditable service the member would perform if he remained in service continuously to each date considered**. …**

Removing the open-ended "projected to perform" in favour of a continuous-service convention makes the computation objective, restores the § 401(a) answer the memo wants, and does not change the result for any ordinary purchaser.

---

### M-08 — Material. The K 1 interest provision has no accrual period, no compounding convention and no start date, and uses a rate inconsistent with the Code's own idiom.

**Statutory basis.** New § 51.1-142.4 **K 1**: refund "together with interest at the rate of return assumed by the Board for the actuarial valuation of the retirement system **in effect at the time of the refund**." Against **Va. Code § 51.1-142.2 C**, which is the Code's existing formula for exactly this computation: "plus interest **accrued daily and compounded annually from the date of withdrawal to the date of payment** at the assumed rate of return established by the Board for the actuarial valuation of the retirement system that is **in effect at the time of the purchase**."

**Failure scenario.** A member buys in 2029 and is refunded in 2049 under K 1 a. The Board must compute interest. The bill tells it the *rate* but not the *period*, not whether to compound, and not from when. One reading pays twenty years of compounding; another pays a single year's interest; another pays nothing because no accrual period is specified. Separately, the rate is fixed "at the time of the refund," so a 2049 assumption is applied retroactively to 2029–2049 — the opposite of the convention § 51.1-142.2 C adopts for the analogous repurchase computation, and a convention that moves money in whichever direction assumptions have moved. The source appendix's own correction C-8 records that the team already learned this lesson once: "Treated 6.75% as a rate attaching to refunded service. It is the Board's current assumed rate of return, which will move."

**Proposed redline.**

> **… together with interest **accrued daily and compounded annually from the date the member paid the amount to the date of payment of the refund** at the assumed rate of return established by the Board for the actuarial valuation of the retirement system that is in effect **at the time of the purchase**, …**

Memo Part 6.2 DECISION 11 already flags for JLCVSO whether the Board's assumed rate or a lower statutory rate should apply. That question is separate from and subordinate to this one: the mechanics must be specified whichever rate is chosen.

---

### M-09 — Material. The statutory pre-purchase disclosure in I 2(vii) tells the member two things that are not true.

**Statutory basis.** New § 51.1-142.4 **I 2(vii)**: the Board must furnish a written statement that "under subdivision E 3, eligibility credit will be included in determining the member's eligibility to retire only if the member is a member in service immediately preceding the effective date of his retirement, and that **a member who terminates service before retiring will not be able to use the credit and will be entitled to a refund under subsection K**."

**Both halves fail.**

1. "**[W]ill not be able to use the credit**" is false if **C-03** is right: a member who terminates service and later re-enters service for a single day *can* use the credit, and will obtain a far larger acceleration than one who stays. The Commonwealth would be making a mandatory written representation of law to each purchaser that its own text contradicts.
2. "**[W]ill be entitled to a refund under subsection K**" overstates subsection K. A member who terminates service and does nothing receives no refund until **K 1 a** fires at her unaffected eligibility date, which for a frozen-service member is her normal retirement date — potentially twenty years later. **K 1 d** requires her affirmative "written request," and conditions it on her remaining "a member," which § 51.1-128(iv) permits the Board to end by dormant-account policy (see **m-06**). The statement as drafted implies an automatic entitlement the bill does not create.

**Failure scenario.** A member separates involuntarily at 45, two years after purchasing. She relies on the Board's statutory written statement that she "will be entitled to a refund," makes no request, and discovers at 48 that nothing has been returned and nothing will be until she is 67. The representation was mandated by statute and furnished by the Commonwealth.

**Proposed redline.** Conform I 2(vii) to whatever E 3 and K are redrafted to say. On the C-01 and C-03 redlines above, it would read:

> **(vii) a statement that, under subdivision E 3, eligibility credit will be included in determining the member's eligibility to retire only if the member has been a member in service continuously from the date the credit was granted to his last day of service preceding the effective date of his retirement; that a member who terminates service before retiring will not be able to use the credit; and that such a member's credit will be cancelled and the amount he paid refunded with interest under subsection K **upon his termination of service**.**

---

### M-10 — Material. The draft is not in introducible form, and the reason is constitutional, not stylistic.

**Statutory basis.** **Va. Const. art. IV, § 12**, second clause: "**Nor shall any law be revived or amended with reference to its title, but the act revived or the section amended shall be reenacted and published at length.**" The draft amends eight existing sections and publishes the full text of **none** of them. Each is reproduced as an excerpt under a bracketed note of the form "Only the affected language … is reproduced; the balance … is unchanged and **would be** reenacted as it appears in current law."

**Why I raise it despite the handoff framing.** Drafting note 4 and memo Part 7.3 are candid that DLS controls "the final form [and] section-reenactment scope." I accept that. The finding is about the **status labels the package attaches to this document**, which are inconsistent with that candour: "**Operative text version:** 1.2"; README's index entry "Draft bill text … **Version 1.2 — all policy decisions drafted**"; and the explicit contemplation of "external or patron use" once drafting note 10 is resolved. A patron cannot introduce this document, and the obstacle is not conventions (underscore versus bold) but art. IV, § 12. The risk of leaving the labels as they are is that someone treats "all policy decisions drafted, one narrow question open" as meaning "ready," and the first person to discover otherwise is the patron's office.

**Failure scenario.** The package clears drafting note 10 in November 2026 and goes to a patron. The patron's office forwards it to DLS as a request to prepare for pre-filing. DLS returns it with the observation that seven of the eight amended sections must be set out at length — roughly 9,000 additional words for § 51.1-155 alone — and that the § 51.1-155 sunset collision (**M-05**) must be resolved first. Pre-filing slips past the deadline.

**Proposed redline.** No bill-text change. Two document changes:

> **In the bill's status block, replace "Operative text version: 1.2" with "Operative text version: 1.2 — drafting handoff, not introducible form." Add to drafting note 4: "Va. Const. art. IV, § 12 requires that each amended section be 'reenacted and published at length.' This draft reproduces only the affected language of the eight amended sections. DLS must set each out in full before introduction; until then this document is a drafting request and not a bill."**

I rate this **material** rather than minor because the package is explicitly being prepared for external and patron use and the labels are what an outside reader will act on.

---

### M-11 — Material. The internal review's reclassification fix was not implemented: nothing fixes the member's § 51.1-153 B 2 / B 3 classification.

**Statutory basis.** New § 51.1-142.4 **B 2** (member must be one "to whom subdivision B 2 **or** B 3 of § 51.1-153 applies"), **C 1 a** and **C 1 b** (two different deficit formulas, one per pathway, determined "as of the date the member purchases"), and **E 1** and **E 2** (two different inclusion rules, one per pathway, applied at the eligibility determination, i.e. at retirement). Against **Va. Code § 51.1-153 B 3** and § 51.1-155 A 1, which turn on whether a member "does not have at least 60 months of creditable service **as of January 1, 2013**."

`06-red-team-review.md` F-10(b) identified this and specified the fix: "**a provision that a member's classification under § 51.1-153 B 2 or B 3 is determined as of the purchase date and is not altered by any subsequent purchase.**" Version 1.2 implemented F-10(a) (via C 1 c) and **not** F-10(b). The bill contains no such provision; C 1 fixes the *deficit* as of the purchase date but says nothing about the *classification*.

**Failure scenario.** A member who lacks 60 months of creditable service as of January 1, 2013 is in the B 3 class. At age 55 with 20 years she has 75 points, a 15-point deficit, and under C 2 a may buy nothing useful; she buys **one** year of eligibility credit, which C 1 b computes against the Rule of 90. She subsequently purchases four years of *prior* service under § 51.1-142.2 B 2 at actuarial equivalent cost — service attributable to a pre-membership period. If that purchase is treated as creditable service she held as of January 1, 2013, she moves into the **B 2** class, where her credit should have been computed under C 1 a against a 30-year threshold. The bill provides no reclassification rule, no recomputation, and no cancellation. The internal review's own analysis is that the better reading is that reclassification cannot occur — § 51.1-155 A 1's distinction between creditable service "performed **or purchased** on or after January 1, 2013" shows the General Assembly treats purchased service as having its own date — but, as that review said, "the statute does not say so, and the whole deficit architecture depends on the answer."

**Proposed redline.** Add to subsection C:

> **6. A member's classification as a member to whom subdivision B 2 or subdivision B 3 of § 51.1-153 applies shall be determined for purposes of this section as of the date the member purchases, or enters into a purchase of service contract for, eligibility credit, and shall not be altered by any subsequent purchase of service credit under § 51.1-142.2 or by any other event.**

---

### M-12 — Material. The standardized label for the $341,065 figure misdescribes the model's own baseline.

**What the package says.** Version 1.3 change-log item 13 standardized the figure across README, both briefs, bill note 7(c), memo Part 5.1 and the fiscal memo as "**the maximum modeled net value above the member purchase price under the frozen-service/subsidy scenario**."

**What the model says.** I re-ran `fiscal-model/run_model.py` from a copy and read `out/T1-price-vs-value.csv`. The row producing $341,065 is `P1-B2-A-ST-SUB`, and the model's own **"Baseline description"** column for that row reads: "**same date (age 50.00), same 26.00 years, reduced allowance (50/10)**", reduction factor **0.400**. That is a *same-retirement-date* counterfactual: the member retires at 50 either way, and the bridge converts her § 51.1-153 D reduced allowance into an unreduced one. It is **not** a frozen-service scenario. "Frozen service" is the deferred-member concept in DECISION 8, which the package states repeatedly — correctly — that the model **does not price**.

**Failure scenario.** A money-committee analyst reads "frozen-service/subsidy scenario" in the brief, concludes that the $341,065 figure already prices the deferred path, and cross-reads memo Part 5.1 ("the model prices four years of acceleration, not fifteen") and bill note 7(a) ("the MOO-259 model … did not price the deferred path"). The package appears to contradict itself on its single most quoted number. Worse, if **C-03** is right the deferred path is live again, and the one number that looks like it prices it does not.

**Proposed redline.** Replace the standardized phrase everywhere it appears with the model's own description:

> **the maximum modeled net value above the member purchase price in the single most favourable modeled profile — a Plan 1 state employee at age 50 with 26 years at $85,000, measured against the counterfactual that she retires on the same date with the same service under the § 51.1-153 D 50/10 reduced allowance — and not a cost per veteran**

---

### M-13 — Material. The fiscal case rests on an untested independence assumption; compounding three of the model's own adverse variants puts the aggregate outside its disclosed range.

This is the fiscal assumption challenge required of this review. It is set out in full, with the rerun numbers, in **Part 5**. In summary: the model's sensitivity table **T5** is strictly one-at-a-time, and the package's headline robustness claim — "**[a]cross every sensitivity tested the aggregate stays between 0.05 and 0.44 bp**" and "to the nearest basis point, no plan's rate changes" — is a claim about one-at-a-time excursions only. Take-up (**ASM-19**) and the behavioural mix **φ** (**ASM-22**) are **inversely correlated by the model's own logic**: the model shows that a member who would have worked on to unreduced eligibility *overpays*, so high take-up necessarily implies a purchaser pool weighted toward members who were leaving anyway, i.e. **low** φ. Treating them as independent drivers structurally suppresses the adverse tail. Running the model's own code with funnel-high + φ = 0.25 + 30% take-up gives **1.16 bp and $43.79M** of net liability increase, against the published central case of 0.19 bp / $7.15M and the published maximum of 0.44 bp. At 1.16 bp a plan's rate **does** change to the nearest basis point.

**Proposed redline.** In memo Part 5.1 and fiscal memo § 13, qualify the robustness claim:

> **Full sensitivity range 0.05 to 0.44 bp aggregate on **one-at-a-time** excursions; no single plan exceeds 0.84 bp in any single-driver scenario tested. **The sensitivity design is one-at-a-time. Take-up and φ are inversely correlated, because a member who would have worked on to unreduced eligibility overpays and is therefore less likely to purchase; the model does not impose that correlation. A compound adverse case combining the high population funnel, φ = 0.25 and 30% take-up yields 1.16 bp aggregate and $43.8M of net liability increase, which is outside the single-driver range and is the figure a money committee should be given as the adverse tail.**

---

### M-14 — Material. Member-detriment findings made in the internal review never reached the memo's unintended-effects table or the bill's statutory disclosure.

**Statutory basis.** `06-red-team-review.md`, "Member-detriment disclosures JLCVSO should make affirmatively," records four relevant items with authority: loss of the **$8,000 group life floor** for a B 2 retiree with 26–29 actual years (§ 51.1-505 B); that **retiree group life begins its 25%-per-year reduction earlier**; that retiring early **ends death-in-service coverage**, so survivors fall under § 51.1-163 rather than the § 51.1-162 B joint-and-survivor-equivalent allowance; and reduced accrual and AFC.

**What happened to them.** Nothing. Memo **Part 4**'s "Group life insurance" row still reads "**No** — protected by definition," with the explanation that the thresholds "run on creditable service … Reinforced by F 11." That is the same error pattern the package corrected twice for the health insurance credit and COLA: it describes what the credit *is* and not what an **earlier separation date** does. I verified the mechanism directly: **§ 51.1-505 B** provides that the amount of life insurance on an employee who retires for service on an immediate retirement allowance is reduced "by an amount equal to 25 percent thereof on the January 1 following the first full year **from the date the employee is separated from service** and each January 1 thereafter" — separation date, not normal retirement date (which governs only the *disability* retiree in the same subsection). And § 51.1-505 F: "the amount of life insurance on each insured employee who retires shall be determined under the provisions of this chapter as it exists on the employee's **date of retirement**."

None of these appear in **I 2**, the bill's mandatory pre-purchase disclosure list, which covers the unaffected eligibility date, the accelerated date, cost, the no-increase-in-allowance statement, PLOP, subsection K rights, and the E 3 condition — but not group life, not death-in-service, and not the forgone accrual and AFC.

**Failure scenario.** A member retires at 50 under the bridge with 26 years at $85,000. Her group life coverage is $170,000. Under § 51.1-505 B the 25%-per-year reduction begins on the January 1 following her first full year from separation, so she reaches the 25% floor of $42,500 at about age 54 instead of about age 58 — four years of lost death benefit, caused by the bill, disclosed nowhere, and not curable by F 11 (which bars only *establishing eligibility for* or *increasing* group life, not a decrease). She also has 26 years, so the $8,000 statutory floor for members with 30 or more years of creditable service never applies to her, and § 51.1-142.4 F 11 expressly prevents the credit from supplying the thirtieth year. Had she died in service at 52, her survivor would have received a § 51.1-162 B allowance for life; having retired, the survivor receives only the § 51.1-163 excess-of-contributions payment unless she elected a § 51.1-165 option and accepted the actuarial reduction.

**Proposed redline.** Two changes. First, correct memo Part 4's group life row:

> **| Group life insurance | § 51.1-505 B, C | **Thresholds and amounts: No** — protected by definition. **Reduction schedule: YES — affected, and not cured.** | The 30-year $8,000 floor and the 20-year double-salary provision run on creditable service, and F 11 bars the credit from supplying either. But § 51.1-505 B measures the 25%-per-year retiree reduction from **the date the employee is separated from service**, so an earlier retirement starts the step-down up to four years earlier. This is a member detriment rather than a trust cost, it follows the separation date in the same way the health insurance credit and COLA follow the retirement date, and it is **not** reached by the exclusion architecture. Disclose it. |**

Second, add to **I 2** a clause (viii):

> **(viii) a statement that retiring on an earlier date (a) begins the reduction of the member's group life insurance under subsection B of § 51.1-505 earlier, (b) ends the member's eligibility for a death-before-retirement allowance under subsection B of § 51.1-162, and (c) results in fewer years of creditable service and a lower average final compensation than the member would have had on retiring at a later date.**

---

### M-15 — Material. The tax risk is mis-sized: § 415(c) is unlikely to bind on the modeled profiles; the funding-source loss is the live exposure.

**Statutory basis.** **I.R.C. § 415(n)(3)(A)**, read in primary text October 20, 2026: "permissive service credit" means service credit "(i) **recognized by the governmental plan for purposes of calculating a participant's benefit under the plan**, (ii) which such participant has not received under such governmental plan, and (iii) which such participant may receive only by making a voluntary additional contribution … which **does not exceed the amount necessary to fund the benefit** attributable to such service credit." **§ 415(n)(1)**: where a participant purchases permissive service credit, "the requirements of this section shall be treated as met **only if** (A) the requirements of subsection (b) are met … **or** (B) the requirements of subsection (c) are met …". **§ 415(n)(2)(B)**: in applying (1)(B), "the plan shall not fail to meet the **percentage limitation** under subsection (c)(1)(B) solely by reason of this subsection." **§ 415(n)(3)(C)(iv)**: "military service (other than qualified military service under section 414(u)) **recognized by such governmental plan**" is *not* nonqualified service credit.

**Where the package is right.** Clause **(i)** is very likely not satisfied, for exactly the reason the package gives: the credit is by design not recognized for calculating the benefit. (Note the package's quotation drops the word "governmental" from clause (i); immaterial, but it should be exact.) I add a point in the bill's favour that the package does not make: clause **(iii)** *is* satisfied, and the fiscal model proves it — a contribution recovering 11%–78% of value plainly "does not exceed the amount necessary to fund the benefit."

**Where the package is wrong on sizing.** Memo Part 5.3 and bill note 8 lead with § 415(c): "a lump sum of roughly $35,000 could exceed the § 415(c) limit in the year of purchase." For the profiles in the model that is unlikely. Without § 415(n) relief the ordinary § 415(c)(1) limit applies: the **lesser** of the indexed dollar limit (on the order of $70,000) or **100% of the participant's compensation**. The lead profile is a $85,000-salary member paying $42,500 — 50% of compensation, and well under the dollar limit even after adding her 5% mandatory contribution. The 100%-of-compensation branch binds only for a member whose compensation is below roughly the purchase price, i.e. a part-year or very low-paid member. § 415(c) is a real edge case, not the headline.

**What the live exposure is.** **I.R.C. §§ 403(b)(13)(A) and 457(e)(17)(A)** permit trustee-to-trustee transfers to a governmental defined benefit plan only for the purchase of "permissive service credit (as defined in section 415(n)(3)(A))." If the credit is not permissive service credit, members **cannot fund it from a 403(b) or 457(b) account** — which is how most VRS members fund service purchases. That is a design fact about who can afford the bridge, and the package already says so; it should be the lead, not the second item.

**Failure scenario.** JLCVSO engages tax counsel on the question the memo frames, counsel spends the engagement on § 415(c) and reports that the exposure is immaterial for members earning more than the purchase price, and the package goes to a patron reassured — while the funding-source question, which determines whether a $42,500 purchase is reachable by anyone without $42,500 in after-tax cash, remains open.

**The specific question to put to tax counsel**, which is the deliverable this attack surface asks for:

> 1. Does eligibility credit under proposed Va. Code § 51.1-142.4 — which by the express terms of § 51.1-142.4 E and F is taken into account **only** in determining whether a member satisfies the creditable-service component of Va. Code § 51.1-153 B 2 or B 3, and is excluded from the computation of the allowance under § 51.1-155 A 1 — constitute "permissive service credit" within I.R.C. § 415(n)(3)(A), given that clause (i) requires credit "recognized by the governmental plan for purposes of calculating a participant's benefit under the plan"? If a credit that affects only the **date** on which an unreduced allowance becomes payable is "recognized … for purposes of calculating a participant's benefit," identify the authority.
> 2. If it is not permissive service credit: (a) may a member fund the purchase by trustee-to-trustee transfer under I.R.C. § 403(b)(13)(A) or § 457(e)(17)(A), each of which is limited to "permissive service credit (as defined in section 415(n)(3)(A))"? (b) Is the member's voluntary after-tax contribution an annual addition under I.R.C. § 415(c)(2) and Treas. Reg. § 1.415(c)-1(a)(2)(ii)(B), and does the 100%-of-compensation limit in § 415(c)(1)(B) apply without the relief in § 415(n)(2)(B)?
> 3. Does a payroll-deduction purchase under proposed § 51.1-142.4 D, which borrows the mechanics of § 51.1-142.2 F, require a separate pick-up determination under I.R.C. § 414(h)(2), and does Va. Code § 51.1-168 (which addresses §§ 415(b) and 415(d) only) need conforming amendment?
> 4. Does the Board's determination of the maximum purchasable amount under proposed § 51.1-142.4 C 2 d — which takes into account "the creditable service the member is **projected** to perform" — create a definitely-determinable-benefits problem under Treas. Reg. § 1.401-1(b)(1)(i), notwithstanding that the **amount** of the allowance is unaffected?

---

### Minor findings

**m-01 — The new sentence in § 51.1-142.2 B is surplusage that undercuts the bill's own premise.** The bill adds: "The provisions of **this paragraph** governing the cost of service credit shall not apply to the purchase of military retirement eligibility credit under § 51.1-142.4." That paragraph by its own terms applies to purchases "under this **subsection**," and a § 51.1-142.4 purchase is not one. The express disapplication invites the inference that § 51.1-142.2's provisions *would* otherwise reach § 51.1-142.4 — which is the opposite of the premise that makes H 5 "load-bearing" (bill note 5; S-04). *Redline:* strike the sentence, or if DLS prefers belt-and-braces, add "for the avoidance of doubt" and say in the note that no implication is intended.

**m-02 — B 4's "except" clause addresses a disqualification that does not exist.** B 4 requires service "the member would be eligible to purchase as service credit under subdivision B 2 of § 51.1-142.2, **except that the expiration of the 24-month period described in subsection B of § 51.1-142.2 shall not render the member ineligible under this section**." The 24-month window does not render anyone ineligible; it changes only the price — memo Part 1.1 ("What changes at 24 months? **Only the price.**") and S-03. The clause implies the contrary. *Redline:* "…under subdivision B 2 of § 51.1-142.2, **determined without regard to the cost provisions of subsection B of § 51.1-142.2**."

**m-03 — Subsection E's numbering is broken.** E's lead-in is "Eligibility credit … shall be included, and shall be included **only**:", followed by items 1 and 2 (the closed list), then item 3 (a condition, which does not complete the lead-in), then an unnumbered flush paragraph stating the allowance rule. Read as a list item, E 3 is ungrammatical; and the flush paragraph now attaches to subdivision 3 rather than to subsection E, so the allowance rule reads as applying only in the E 3 case. No substantive gap results, because new § 51.1-155 C duplicates the allowance rule, but *redline:* move the in-service condition to its own subsection (a new subsection F, renumbering), and restore the allowance paragraph as a flush paragraph of E.

**m-04 — Subsection B's conjunctions and redundancy.** B 5 and B 6 both end "; and", so "and" appears twice before the final item. B 6 (deficit greater than zero), B 7 (purchasable amount greater than zero) and C 5 (no purchase when the deficit is zero or less) overlap; B 7 subsumes B 6 because C 2 a caps the purchasable amount at the deficit. *Redline:* strike the "and" at the end of B 5; consider striking B 6.

**m-05 — "the earlier of" governs a four-item list in K 1.** Should be "the **earliest** of."

**m-06 — K 1 d's "while he remains a member" is a trap.** Under **Va. Code § 51.1-128**(iv) membership ceases "as provided by Board policy for dormant accounts," without any refund. A member whose account goes dormant loses the K 1 d written-request route. K 1 a still eventually applies, but the limitation serves no purpose. *Redline:* strike "made at any time while he remains a member."

**m-07 — F 9's references to §§ 51.1-1157 and 51.1-1165 are inoperative.** Both sections sit in **Title 51.1 Chapter 11.1, "Disability Program for Hybrid Retirement Program Participants,"** and hybrid participants are excluded from the bridge outright by B 1(i) and J. The internal review justified the set by reference to § 51.1-1400 A's cross-references, which is a reason to keep it for parallelism, but the note should say the two are included for completeness and can never operate. No action required; recorded so that a committee analyst's question has an answer.

**m-08 — The § 2.2-3204 C sentence is redundant.** The bill's new sentence in § 2.2-3204 **A** is prefaced "**For purposes of this section**," which already reaches subsection C. The separate sentence added to subsection C ("For purposes of this subsection, whether the provisions of subdivision B 3 of § 51.1-153 apply …") adds nothing. *Redline:* strike the subsection C addition, or narrow the subsection A preface to "For purposes of this subsection."

**m-09 — The title should name the transitional severance benefit.** **Va. Const. art. IV, § 12**, first clause: "No law shall embrace more than one object, which shall be expressed in **its title**." The bill amends § 2.2-3204, in the Workforce Transition Act of 1995, while the title reads only "relating to the Virginia Retirement System; purchase of prior active duty military service; military retirement eligibility credit." Virginia construes the single-object requirement liberally and the § 2.2-3204 amendment is plainly germane to VRS retirement eligibility, so the risk is low. It is also free to remove. *Redline:* "… relating to the Virginia Retirement System; **transitional severance benefit;** purchase of prior active duty military service; military retirement eligibility credit."

**m-10 — "Service" *is* a defined term, and two package statements say otherwise.** **Va. Code § 51.1-124.3**: "**'Service' means service as an employee.**" The bill's "Note on the word 'service'" calls the term in § 51.1-155 A 2 "a bare term the section does not define," and memo Part 2's terminology table omits "Service" from the defined terms while listing "Active service," "Earned service" and "Benefit-calculation service." The practical effect runs in the bill's **favour** — because the credit is expressly not "service as an employee," § 51.1-155 A 2's "30 years of service" test was already protected by the chapter-wide definition before the § 51.1-155 C amendment was written. *Redline:* add "Service" to memo Part 2's table, and correct the bill's note to say that A 2's term is the § 51.1-124.3 defined term "Service," that the definition already excludes the credit, and that the § 51.1-155 C amendment is retained for clarity.

**m-11 — The amendment counts do not reconcile.** Drafting note 4, the README and the memo all say "**six conforming amendments across five sections**," while the enacting clause amends and reenacts **eight** existing sections. Both numbers are correct — the six counts only the amendments the team classifies as "conforming," excluding the four enabling amendments to §§ 51.1-124.3, 51.1-142.2, 51.1-153 B 2/B 3 and 51.1-155 — but a reader comparing the note to the enacting clause will think one of them is wrong. *Redline:* "…six conforming amendments across five sections, within a bill that amends and reenacts eight sections in total and adds one."

**m-12 — The art. X, § 11 funding point and the Board's published posture belong in the memo's risk section.** **Va. Const. art. X, § 11** requires that the trust funds "be invested and administered **solely in the interests of the members and beneficiaries** thereof" and that "[r]etirement system benefits shall be **funded using methods which are consistent with generally accepted actuarial principles**." A facial challenge is weak — amortizing an unfunded liability into employer contribution rates is a generally accepted actuarial method, and the General Assembly is expressly empowered to prescribe "restrictions, terms, and conditions" — so I do not rate this as a litigation risk of consequence. If anyone were to bring it, the plaintiff would be a VRS member or beneficiary seeking a declaratory judgment in the Circuit Court of the City of Richmond, and the claim would fail. Its real force is as the **constitutional hook for the adverse § 30-19.1:7 statement the memo already predicts**. The Board's own published language on a 2026 benefit-enhancement bill is the best available predictor: "it would be **prudent from a fiduciary standpoint to only enhance benefits if they can be funded upfront to avoid creating additional unfunded liabilities**" (VRS, *2026 General Assembly Session Fiscal Impact Statement*, SB 419, published January 28, 2026). *Redline:* add both to memo Part 5.1's "Options if containment is required," and note that option (iv) — an appropriation to offset the liability — is the one that answers the Board's stated test.

---

## Part 3 — The seven priority attack surfaces, answered

### A. Find a leak you have not found.

**Found one, and it is structural rather than arithmetic: M-01.** Clause B 1 closes four routes into the bridge and misses the fifth route into **hybrid-ineligibility** created by § 51.1-169 A's second sentence — eligibility to participate in an optional retirement plan under §§ 51.1-126.1, 51.1-126.3, 51.1-126.4 or 51.1-126.7. That route is open in every hire year, which falsifies the "closed and shrinking" claim.

**Also found, in the "earlier separation date" family rather than the "eligibility date" family: M-14.** **§ 51.1-505 B** measures the retiree group life 25%-per-year reduction from "**the date the employee is separated from service**." The internal review caught this as a member detriment; it never reached memo Part 4 (which still says group life is "protected by definition") or the bill's statutory disclosure. It belongs in the same category the package created for the health insurance credit and COLA: a consequence of the date, not of the credit.

**The sweep itself, and what it found nothing in.** I ran the "unreduced" search the internal review ran over six chapters across **all** of Title 51.1 (Chapters 1, 2, 2.1, 3, 4, 5, 6, 6.1, 7, 8, 9, 10, 11, 11.1, 12, 13, 15) **and** Title 2.2 Chapter 32. The word appears in exactly **five** places: § 51.1-165.01 B 1, B 2 and B 3; § 51.1-166 D 3; § 51.1-166 D 4; and § 2.2-3204 A. All five are addressed. **The bill's coverage of the term "unreduced" is complete across Title 51.1 and the Workforce Transition Act.** That is a genuine null result and it should be stated in the memo at that scope rather than at six chapters.

I also swept the places you asked me to look hardest, and report the following as clean:

- **Chapter 2 (group life).** The retiree-coverage condition (five or more years of service as an employee), the $8,000 / 30-year floor and the 20-year double-salary provision are all creditable-service or service-as-an-employee tests and are reached by the definition and F 11. The one effect that is **not** reached is the separation-date reduction schedule — **M-14**.
- **Chapter 14 (health insurance credit).** I verified § 51.1-1400 A in full: the trigger is "retired under the Virginia Retirement System … [and] rendered at least 15 years of total creditable service," the rate is "$4 per year of creditable service or … effective July 1, 2024, $4.25," and the section separately provides that a member who "elects to defer his retirement pursuant to subsection C of § 51.1-153 shall be entitled to receive the allowable credit … on the effective date of his retirement." The package's analysis of this row — affected, not cured, accepted by DECISION 9 — is **correct**, and the word "unreduced" appears nowhere in Chapter 14.
- **§§ 51.1-155 through 51.1-162.** § 51.1-155 A 2 and A 3's reduction tests ("less than 30 years of service," "30 or more years of creditable service," "age … plus … creditable service … equal to 90") are all reached by new § 51.1-155 C — I checked each of the five tests in A 2 and A 3 individually. § 51.1-155 A 5's 50/10 floor is reached by F 1 for eligibility but creates the accumulated-contributions double count at **M-06**. § 51.1-155 B 1 (allowance ceases on return to covered employment) does not move. §§ 51.1-155.1 and 51.1-155.2 require involuntary separation and 20 years of creditable service and are reached by B 5 and F 5. §§ 51.1-156 and 51.1-157 are reached by F 9 and F 1. § 51.1-161 is reached by G. § 51.1-162 B's "would have been payable … had the member retired on the date of his death" sentence is reached by the express amendment, which I confirmed is inserted at a sentence that exists verbatim.
- **Chapter 11 / 11.1 (disability).** § 51.1-1116's cessation triggers run on **normal retirement date** (age-based) and age 65, which the credit cannot move — C 4 bars treating it as increasing attained age, and I confirmed § 51.1-124.3's "Normal retirement date" is purely age-based. § 51.1-1110 H terminates program eligibility on "termination of employment, death, or **retirement from service**," so a bridge retiree loses VSDP coverage as a consequence of retiring, not of the credit. **No leak.** But see **Part 6**, because § 51.1-1117 C changes the answer to the open policy question.
- **Local plans and ORP cross-references.** Chapter 8 is "Local Retirement Systems"; F 14 reaches it, as narrowed by correction C-10. § 51.1-143.1 creates only an inbound purchase mechanism, which C-10 already recorded. § 51.1-161 C's optional-plan list (§§ 51.1-126, 126.3, 126.5, 126.6) is **different** from § 51.1-169 A's list (§§ 51.1-126.1, 126.3, 126.4, 126.7) — a distinction the package nowhere notes and which is what makes **M-01** possible.
- **§ 51.1-166 D 3 — I confirm the package's conclusion and the reasoning.** D 3's determination is anchored "as of January 1, 2013," and no credit granted on or after July 1, 2028 can bear on it. **No conforming amendment is needed and DLS should not add one.**
- **§ 51.1-166 D 4 — I confirm the package's arithmetic.** For a B 3 purchaser to have under 20 years of creditable service with age plus service at 90, she must be over 70; § 51.1-124.3 caps "Normal retirement date" at Social Security retirement age (67 at most), so § 51.1-153 A already affords her an unreduced allowance and § 51.1-142.4 B 5 bars the purchase. A B 2 purchaser necessarily has at least 26 actual years. **D 4 is unreachable and the amendment is correctly characterised as belt-and-braces.**

### B. The in-service-at-retirement condition and § 51.1-153 C.

**Does the override hold? Partly — the mechanism works, the condition does not.**

**What holds.** The decision to state the condition in both § 51.1-142.4 E 3 and § 51.1-153 C is correct and the reasoning in the bill's "Why this amendment is necessary" note is right on the text. I verified § 51.1-153 C verbatim: "For the purposes of this subsection, **any requirements as to the member being in service shall not apply**." That sentence is a general waiver, subsection C opens the door to "subsection A, **B**, or D," and subsection B contains B 2 and B 3. A condition stated only in § 51.1-142.4 would have been met with the argument that § 51.1-153 C waives it for the deferred retiree. Both provisions are enacted by the same act, so there is no later-enacted-statute problem, and E 3's express statement that "the second sentence of subsection C of § 51.1-153 shall not operate to waive the requirement stated in this subdivision" is belt-and-braces of the right kind. **On this point the drafting is sound and I would not change it.**

**What does not hold.** The *condition itself* fails twice. **C-01**: keyed to "the day immediately preceding the effective date of his retirement," it voids the credit for an ordinary member, because § 51.1-153 E permits the effective date to be any date "after the last day of service." **C-03**: because the credit is not forfeited on termination of service (G 2 forfeits only on refund or § 51.1-161 C transfer) and K 1 a does not fire until the unaffected eligibility date, the condition is satisfiable by one day of rehire — which restores the fifteen-year path the condition was written to close.

**On "member in service" bearing the weight.** The term is **not** defined in § 51.1-124.3 — S-46 verified; the section defines "Member," "Membership service," "Prior service," "Service," "Retirement allowance" and nineteen others, and not "member in service." I agree with drafting note 10 that reliance on settled administrative usage is tolerable, and that § 51.1-142.2 B 2 already stands on the same footing. **But the footing is not the same, and that is the point the note misses.** In § 51.1-142.2 B 2 the term gates *access to a purchase*, which the member controls and can retry. In E 3 it gates *the effect of a purchase already paid for*, tested on one named calendar day, with no cure. An undefined term can carry a gate the member can walk through twice; it should not carry a forfeiture. If the Council keeps a day-certain test, the term must be defined. The redline at **C-01** removes the need by keying to the § 51.1-153 C concept the Code already uses.

**Are K 1 c / K 1 d and I 2(vii) coherent? No, in three respects.** K 1 c (refund on application for deferred retirement) interacts correctly with § 51.1-153 C's no-withdrawal condition, because K 3 saves the member's § 51.1-153 C eligibility — that part is carefully done and I credit it. But: K 1 b swallows the whole scheme (**C-02**); the interest computation has no period, compounding rule or start date (**M-08**); K 1 d's "while he remains a member" collides with § 51.1-128(iv) (**m-06**); the refund is not deducted from accumulated contributions (**M-06**); and I 2(vii) makes two statements of law that are not true (**M-09**).

### C. The retired-pay bar, and 10 U.S.C. § 12736.

**First half — confirmed on the text.** **§ 51.1-142.2 B**, concluding paragraphs, verified verbatim: "Except as otherwise required by Chapter 1223 of Title 10 of the United States Code, as amended, **no service credit may be purchased under this section if it is included in the calculation of any retirement allowance received or to be received by the member from this or another retirement system**, or if there is a balance in a defined contribution account that serves as a primary retirement account related to such service." A 20-year active-component retiree's retired pay is computed on all 20 years, so every year of her service "is included in the calculation" and none of it is purchasable. **§ 51.1-142.4 H 5 replicates the bar for the bridge, so the reading in memo Part 5.2 and DECISION 3 is correct: a career active-duty retiree drawing retired pay generally cannot use the bridge at all.** The package states this correctly and discloses it. I confirm it.

**One drafting observation.** The bar sits in an **unnumbered paragraph of subsection B**, not in subdivision B 2. The bill's **B 4** condition is framed by reference to what the member "would be eligible to purchase as service credit under **subdivision B 2**," which arguably does not import a bar stated at the subsection level. **H 5 therefore does all the work**, which is what the package says, and H 5's independent statement of the bar is the reason the result is safe. Worth one sentence in note 5 so that nobody later "simplifies" H 5 on the view that B 4 already carries the bar.

**Second half — does § 12736 preempt any part of this bill as drafted? No.** Two independent reasons, both on the text I read:

1. **§ 12736 is an anti-exclusion rule limited to service "otherwise properly credited" under the other law.** The omitted proviso — "**if that service is otherwise properly credited under it**" — means the section prevents a benefit scheme from carving out chapter 1223 service that the scheme otherwise credits. Virginia does not otherwise credit unpurchased prior active duty service toward § 51.1-153 B 2 or B 3 eligibility; it credits such service only on purchase. There is nothing for § 12736 to prohibit. See **M-02** for the misquotation that obscured this.
2. **Even if § 12736 did require something, the bill already yields.** H 5 opens "Except as otherwise required by Chapter 1223 of Title 10 of the United States Code, as amended," which is the same savings clause the General Assembly used in § 51.1-142.2 B. A statute that expressly defers to the federal requirement cannot conflict with it.

**The narrow residual question, which is the right one for counsel.** The savings clause appears in **H 5 only**. The subsection **B** eligibility screen (B 4, which requires qualifying service "the member would be eligible to purchase … under subdivision B 2 of § 51.1-142.2") and **C 2 c** (which limits the purchasable amount to qualifying service "that has not been purchased or credited under § 51.1-142.2 or this section") contain no savings clause. If counsel concludes — contrary to my reading — that § 12736 requires chapter 1223 service to count toward § 51.1-153 B 2 and B 3 eligibility at no cost, the conflict would arise in subsections B and C, where the bill is silent, not in H 5, where it defers. *Redline for safety, at no cost either way:* add to subsection B, after the lead-in, "**Nothing in this subsection or subsection C shall be construed to require anything contrary to Chapter 1223 of Title 10 of the United States Code, as amended.**"

**Reserve/Guard language.** The package's narrowing is correct: chapter 1223 is "Retired Pay for Non-Regular Service," and federal protection attaches to qualifying service associated with **non-regular Reserve-component retired pay** under that chapter, not to all Reserve and Guard service. No document should say otherwise, and after the version 1.3 cleanup none does. **Confirmed sound.**

**One unmodeled narrowing of the population, flagged for the actuary rather than as a finding.** § 51.1-142.2 B's second limb bars purchase "if there is a balance in a **defined contribution account that serves as a primary retirement account** related to such service," and H 5 replicates it. Service members who entered under the federal Blended Retirement System from January 1, 2018 carry a Thrift Savings Plan balance attributable to that service. Whether a BRS TSP account is a "primary retirement account" within the meaning of § 51.1-142.2 B is a question VRS administers, not one the Code answers. It does not affect the population the bill principally reaches — members whose first VRS membership predates January 1, 2014, who mostly served before 2018 — but it bears on **ASM-17** and should be put to VRS with the other member-level data items.

### D. § 51.1-153 B 4 public-safety scope.

**Does clause B 1(iv) track § 51.1-169 A? Yes, substantially, and the drafting is careful.** I compared it word by word against **§ 51.1-169 A, fourth sentence**, verified verbatim: "Every person who is otherwise eligible to participate in the program but is **not a member of a retirement plan administered by the Virginia Retirement System the first time he is hired or rehired on or after January 1, 2014, in a covered position**, shall participate in the hybrid retirement program." Clause B 1(iv)(a) reproduces the membership test and correctly **omits** the "otherwise eligible to participate in the program" preface — which it had to, because a B 4-resolution employee is never otherwise eligible (§ 51.1-169 A, third sentence, also verified verbatim). Clause (iv)(b) then supplies that third-sentence condition. The two clauses intersect correctly.

**Does it preserve a pre-2014 member who is later rehired? Yes.** Because the test asks whether the person was a member of a VRS-administered plan at the first hire or rehire occurring on or after January 1, 2014, a member who was already in such a plan at that moment is outside clause (iv). The package's statement that this is "a *membership* test rather than a hire-date test" is **correct**. One qualification the package does not state: a pre-2014 member who terminates and **withdraws** her accumulated contributions ceases to be a member under § 51.1-128, so on a later rehire she is not "a member of a retirement plan administered by the Virginia Retirement System" and clause (iv) catches her. That is probably the intended result, and it matches § 51.1-169 A's own operation, but it should be stated so VRS and members are not surprised.

**One drafting nit.** The bill punctuates the borrowed phrase as "the first time he **was** hired or rehired**,** on or after January 1, 2014**,** in a covered position," setting the date off with commas that the statute does not use, and shifting to the past tense. Neither changes the meaning. DLS should conform to the statute exactly, because clause (iv) is doing scope work and any divergence from § 51.1-169 A invites an argument that a different test was intended.

**Is the B 2 / C 1 c fix sound? No — see M-04.** C 1 c resolves which deficit formula applies but cannot make § 51.1-153 B 2 *apply* to a member to whom it does not otherwise apply, because it operates only "for purposes of this section" while the right to retire comes from § 51.1-153. The internal review's "Reading 2" survives version 1.2, and the fix belongs in § 51.1-153 B 4 or B 2 — both of which the bill already amends and reenacts.

**Verified independently:** § 51.1-153 B 4's purposes list is "for purposes of subdivisions B 1 and B 3 and subsection D, and subdivision A 3 of § 51.1-155," **B 2 is absent**, and "Such resolution shall be irrevocable." S-45 is correct.

### E. Federal tax.

Answered at **M-15**, including the four numbered questions to put to tax counsel. In short: the package's diagnosis of § 415(n)(3)(A)(i) is right and I verified the clause in primary text; its sizing is wrong (§ 415(c) is an edge case for the modeled profiles, the 403(b)/457(b) funding loss is the live consequence); clause (iii) is satisfied and that point helps the bill and is not made anywhere; and the § 401(a) downgrade in memo Part 5.3 rests on a premise that C 2 d's "projected to perform" standard contradicts (**M-07**).

### F. Drafting mechanics.

- **Is § 51.1-142.4 unoccupied? Yes — verified independently.** Title 51.1 Chapter 1 contains §§ 51.1-142, 51.1-142.2 and 51.1-142.3 and **no** § 51.1-142.4; a search of the full chapter text returns zero occurrences of the number. S-38 is correct. The residual risk is a competing 2027 introduction claiming the number, which is DLS's assignment to make, not LIS's to answer — see Part 4 on the LIS search.
- **Enacting clause versus sections amended: nine headings, nine items — reconciled.** The title and enactment clause 1 both list § 2.2-3204 plus §§ 51.1-124.3, 51.1-142.2, 51.1-153, 51.1-155, 51.1-162, 51.1-165.01 and 51.1-166 (eight amended) and add § 51.1-142.4 (one new) = **nine**. The body carries **nine** section headings in the same set. **Consistent.** The only reconciliation problem is the "six amendments across five sections" phrasing in the notes — **m-11**.
- **Defined-term consistency.** "Military Retirement Bridge Credit" appears **nowhere in the bill**, which is correct: the operative defined term is "military retirement eligibility credit" and the short title is "Military Service Retirement Bridge." The phrase survives only in memo Part 6.1's verbatim record of the DECISION 10 resolution, which is where it belongs, and memo Part 6.1 explains the conforming. **No defect here; your concern on this point is resolved.** The genuine defined-term defects are **M-03** ("purchase of service contract"), **m-10** ("Service") and **m-03** (E's numbering).
- **Internal cross-references — each checked against the current official text.** E 3 → § 51.1-153 C: the second sentence exists verbatim and the override is correctly targeted. B 1(iv) → § 51.1-169 A: tracks, with the punctuation nit above. C 1 c → § 51.1-153 B 4 and § 51.1-155 A 3: both resolutions exist and the B 2 omission is real. K 1 c → § 51.1-153 C: correct. K 1 d → "remains a member": see **m-06**. I 2(vii) → E 3 and K: see **M-09**. F savings paragraph → F 7, F 8, Chapter 14 and § 51.1-166: all resolve, and the paragraph does the affirmative-acceptance job DECISION 9 asked of it. F 6 → § 51.1-165.01 B: both branches of B 1(i) exist, including the "satisfied the requirements for normal retirement after January 1, 2004" branch, and the § 51.1-165.01 A definition of "normal retirement" refers to "normal retirement as described in §§ 51.1-153 …", which is subsection A of that section and not B 2 or B 3 — so a bridge retiree at the accelerated date does not reach branch (a) and the package's DECISION 1 analysis holds. F 7 → § 51.1-166 D 4: correct. F 10 → § 51.1-162 B: the quoted phrase exists verbatim. F 11 → § 51.1-505 B and C: the 30-year/$8,000 floor is in B and the 20-year double-salary provision is in C, as S-32 states. F 12 → § 51.1-138: correct, and § 51.1-138 C does use the bare term "service." **No stranded cross-reference found** other than the inoperative pair at **m-07**.
- **Effective-date traps.** Two. **M-05** (the § 51.1-155 B 3 / B 4 sunset collides with the July 1, 2028 effective date) and the surplusage in enactment clause 2's "shall apply only to purchases … entered into on or after that date," which can have no application because no such credit can exist earlier.
- **Do the drafting notes tell DLS the truth?** Mostly yes, and notes 4, 7(b), 8, 9 and 10 are unusually candid. Three corrections are required: note 4's amendment count (**m-11**), the note on the word "service" (**m-10**), and note 8's § 12736 quotation (**M-02**). One addition is required: the § 51.1-155 sunset (**M-05**). And note 4's claim that the § 51.1-124.3 carve-out is one of the three provisions doing "the real protective work" overstates it — see Part 8.

### G. Citation audit.

Part 4 reports the full results. Headline: **every Virginia Code citation I re-checked holds**, including the 2026 text of § 51.1-142.2. **One federal citation does not hold** (**M-02**). **Two Code provisions are mischaracterised** rather than miscited: "Service" is a defined term (**m-10**) and "Purchase of service contract" is a defined term the bill misuses (**M-03**). On the two cheap open items: I **partly closed** the 2026 c. 563 question and **could not close** the LIS full-text search. Details in Part 4.

---

## Part 4 — Citation verification results

### 4.1 Verified correct against the official text, October 20, 2026

Read in the current official Code of Virginia and confirmed verbatim or substantively exact as the package states them:

| Entry | Result |
|---|---|
| S-01 — four years of prior active duty military service, "not dishonorable," "in addition to" the subdivision 1 four-year aggregate | **Correct.** § 51.1-142.2 B 2, read with B 1's closing sentence |
| S-02 — one-for-one purchase ratio | **Correct.** § 51.1-142.2 B 3, first sentence |
| S-03 — the cost / 24-month paragraph is framed "under this **subsection**" and reads as a concluding paragraph of subsection B | **Correct**, and the version 1.1 correction C-4 was the right call |
| S-04 — the double-counting bar, framed "under this **section**," in the second-to-last paragraph of subsection B | **Correct**, including the paragraph order: cost/24-month, then the ch. 1223 bar, then the "active duty military service" definition |
| S-05 — "active duty military service" = 180 consecutive days, branches "or reserve components thereof" | **Correct.** § 51.1-142.2 B, final paragraph |
| S-06 — free military credit on return within one year | **Correct.** § 51.1-142.2 I, all five conditions |
| S-07 — lump sum or payroll deduction; employer may pay in lieu | **Correct.** § 51.1-142.2 F, G |
| S-08 to S-13 — the § 51.1-124.3 definitions of "creditable service," "normal retirement date," "accumulated contributions," "actuarial equivalent," "prior service," "membership service," "average final compensation" | **All correct, verbatim.** I re-read each |
| S-14 to S-18 — § 51.1-153 A, B 1, B 2, B 3, C, D | **All correct, verbatim** |
| S-19, S-45 — § 51.1-153 B 4, including that the deeming runs "for purposes of subdivisions B 1 and B 3 and subsection D, and subdivision A 3 of § 51.1-155" with **B 2 absent**, and "Such resolution shall be irrevocable" | **Correct, verbatim** |
| S-20 to S-22 — § 51.1-155 A 1 (1.70%/1.65%), A 2 ("less than 30 years of **service** at retirement"), A 3 (30 years and 90 points) | **Correct**, and A 2's term is the § 51.1-124.3 defined term "Service" — see **m-10** |
| S-23 — both branches of § 51.1-165.01 B 1(i) | **Correct**, and the version 1.1 correction C-5 mattered: branch (a) is what preserves PLOP for a member who works to normal retirement date |
| S-25 — § 51.1-166 D 4 | **Correct, verbatim** |
| S-26 — § 51.1-166 B COLA caps; hybrid treated as post-2010 | **Correct** |
| S-27 — § 51.1-162 B death-in-service, including "would have been payable to the member had the member retired on the date of his death" and the age 55 / 60 presumptions | **Correct, verbatim**; and § 51.1-162 has only subsections A, B and C, as correction C-1 recorded |
| S-28 — § 51.1-163 | **Correct**, and note the words "**as of the effective date of his retirement**," which are what create **M-06** |
| S-29 — § 51.1-156 eligibility; § 51.1-157 A's five-year condition | **Correct**; correction C-6 was right |
| S-30 — § 51.1-161 A 1, A 2 | **Correct** |
| S-31 — HIC 15-year threshold; $4.00 / $4.25 and $1.50 / $1.75 | **Correct.** § 51.1-1400 A verified in full |
| S-32 — § 51.1-505 B ($8,000 / 30 years) and C (20 years / double highest salary) | **Correct** |
| S-33 — § 51.1-138 B, C, including C's own 30-year reduction test and its bare use of "service" | **Correct** |
| S-34 — §§ 51.1-155.1, 51.1-155.2 | **Correct** |
| S-35 — the § 51.1-303 B quotation | **Exact** |
| S-36 — "vesting" used for hybrid employer DC amounts, § 51.1-169 B 3 | **Correct** |
| S-38 — § 51.1-142.4 unoccupied | **Correct**, independently verified |
| S-42 — § 51.1-153 C in full, including the employer-paid-contributions disjunct | **Correct, verbatim** |
| S-43 — § 51.1-169 A, third sentence | **Correct, verbatim** |
| S-44 — § 51.1-169 A, fourth sentence | **Correct, verbatim** |
| S-46 — "member in service" is **not** defined in § 51.1-124.3 | **Correct.** I enumerated all 25 definitions in the section; the term is absent |
| S-47 — § 51.1-153 history line ends "2015, cc. 502, 503"; no 2026 amendment | **Correct** |
| Part C — § 51.1-142.2 history line ends "2024, cc. 267, 353; **2026, c. 563**" | **Correct** |
| Part C — § 51.1-162 history ends "2011, c. 880; 2014, c. 356; 2015, c. 660" | **Correct** |
| Memo Part 3.4 — § 51.1-166 D 3 is safe | **Correct**, for the reason stated |
| Memo Part 3.4 / review F-09(a) — § 51.1-166 D 4 is arithmetically unreachable | **Correct**; I reproduced the arithmetic |
| Review F-09(c) — the "unreduced" sweep | **Correct, and I extended it** to all of Title 51.1 and Title 2.2 ch. 32 with the same result |
| § 2.2-3204 A and C as reproduced in the bill | **Correct**, including the 15%-of-compensation price and the age-versus-creditable-service switch |
| Fiscal model figures: $42,500 / $383,565 / $341,065 / 11.1% / 112.8%; 0.22 / 0.20 / 0.14 / 0.19 bp; 222 purchasers; $7.29M; $26.05bn payroll; 0.05–0.44 bp range | **All reproduced** by re-running `fiscal-model/run_model.py` from a copy. See Part 5 |

### 4.2 Verified as **wrong**

| # | Claim | What the source actually says |
|---|---|---|
| 1 | **10 U.S.C. § 12736** quoted as "in determining his eligibility for any annuity, pension, or old-age benefit, **under any other provision of law, State or Federal**" (bill note 8; memo Parts 5.2 and 5.3; review F-12(d)) | The statute reads "under any other law, **on account of civilian employment by the United States or otherwise**," and closes "**if that service is otherwise properly credited under it**." The quoted words do not appear, and the omitted proviso is dispositive. **M-02** |
| 2 | **"Service" is an undefined bare term** (bill, "Note on the word 'service'"; memo Part 2 omits it from the defined-terms table) | § 51.1-124.3: "**'Service' means service as an employee.**" Chapter-wide definition. **m-10** |
| 3 | **"Purchase of service contract" used as a general term** throughout § 51.1-142.4 and enactment clause 2 | § 51.1-124.3 defines it as "a contract … for the purchase of service credit by the member **as provided in § 51.1-142.2**." **M-03** |
| 4 | **"$341,065 … under the frozen-service/subsidy scenario"** (change-log item 13, applied package-wide) | The model's own baseline description for that row is "**same date (age 50.00), same 26.00 years, reduced allowance (50/10)**" — a same-retirement-date counterfactual, not a frozen-service one. **M-12** |
| 5 | **"The beneficiary class is now closed and shrinking across the entire bill"** (README; bill notes 5 and 7(c); memo Parts 5.5, 6.0, 6.1) | § 51.1-169 A's second sentence leaves an open-ended route into hybrid-ineligibility that clause B 1 does not reach. **M-01** |
| 6 | **I.R.C. § 415(n)(3)(A)(i)** quoted as "recognized by **the plan**" | "recognized by the **governmental** plan." Immaterial to the analysis; correct for exactness |
| 7 | **"[A] lump sum of roughly $35,000 could exceed the § 415(c) limit in the year of purchase"** (memo Part 5.3; bill note 8) | Unlikely for the modeled profiles: the § 415(c)(1) limit is the lesser of the indexed dollar limit (~$70,000) or 100% of compensation, and the lead profile's $42,500 is 50% of an $85,000 salary. **M-15** |

### 4.3 Claims I **could not verify** — stated separately, as requested

| Item | What I did | Status |
|---|---|---|
| **The enactment clauses of 2026 c. 563** — delayed effective date, second enactment, reenactment clause, or sunset | Tried the legacy `legp604.exe` chapter-full endpoint on both `lis.virginia.gov` and `legacylis.virginia.gov` (returns "the document you requested does not exist"); the new LIS REST endpoints (`/Legislation/api/…`, `/LegislationText/api/…`), which return **401** without an API key; `law.lis.virginia.gov/uncodifiedacts/2026/…` (500); the 2026 Acts PDF reachable from LIS blob storage (contains a different chapter); and the VRS 2026 session fiscal-impact PDF cited at S-39's source block (no reference to c. 563 or § 51.1-142.2) | **Partly closed.** The **delayed-effective-date** limb is effectively answered in the negative: `law.lis.virginia.gov` publishes a future-dated version of a section under an "(Effective …)" catchline when a chapter's effect is delayed, and the § 51.1-142.2 page as of October 20, 2026 carries **no such annotation and no alternate version**, while already bearing c. 563 in its history line. c. 563 is therefore operative now. **Still unknown:** whether c. 563 carries a second enactment, a reenactment clause or a sunset. The route is the printed Acts of Assembly volume or the enrolled bill from DLS — **not** a web source from this environment |
| **LIS full-text search confirming no comparable 2027 bill** | Same API-key barrier. I did establish that LIS has a live **2027 session (code 20271)** and that at least one retirement bill is carried into it — **SB 419 (2027)**, amending §§ 51.1-203 and 51.1-214, "relating to retirement systems and creditable service," which is the SPORS/VaLORS additional-creditable-service bill. It does **not** touch § 51.1-142.2 or claim § 51.1-142.4 | **Not closed.** Someone with LIS credentials must run the full-text search. Two notes: (a) the § 51.1-142.4 number question is properly put to **DLS**, which assigns section numbers at drafting, rather than to LIS; (b) SB 419 (2027) is directly relevant to the precedent and stakeholder scan and to memo Part 5.5's equal-treatment answer, because it would award SPORS/VaLORS members additional creditable service in the same session in which this bill would exclude them, and the VRS fiscal impact statement on it is the best available predictor of the § 30-19.1:7 statement on this bill (see **m-12**) |
| **The novelty claim** (no prior Virginia eligibility-only military service credit bill) | Not independently confirmable without LIS full-text search | **Not closed**, as the package already states. Do not assert novelty to a legislator |
| **Approximate normal cost rate for eligible pre-2014 § 51.1-153 B 4 public-safety members** | Not published | **Not closed.** VRS. The package states this correctly |
| **VRS administrative treatment of a "member in service" on approved leave or VSDP long-term disability** | Statutory analysis only; VRS practice not published | **Not closed**, but see Part 6, where § 51.1-1117 C and § 51.1-1110 H substantially narrow the question |
| **Whether VRS routes §§ 51.1-126.1 / 126.3 / 126.4 / 126.7-eligible post-2014 hires into the hybrid program** notwithstanding § 51.1-169 A's second sentence | Statutory analysis only | **Not closed.** Goes to the headcount in **M-01**, not to the existence of the textual gap |

---

## Part 5 — Fiscal assumption challenge

**The model is reproducible.** I copied `fiscal-model/` to a scratch directory and ran `run_model.py` without modification. It regenerated all eleven tables, and the figures quoted across the package reproduce exactly: `T1` row `P1-B2-A-ST-SUB` gives price $42,500, value of acceleration $383,565, net $341,065, cost recovery 11.1%, breakeven purchase rate 112.8%; `T1` row `P1-B2-A-ST-WTE` gives a net of **−$21,500**, i.e. the member overpays by that amount, at 202.4% recovery; `T4` gives 0.22 / 0.20 / 0.14 bp by plan; `T5` gives 0.19 bp central and a 0.05–0.44 bp one-at-a-time range. **I found no arithmetic error and no figure in the package that the model does not support.** That is worth saying plainly: the model is honest, well-documented, and its 24-entry assumption register is better practice than most fiscal notes.

**The load-bearing assumption is not any input. It is the independence of two inputs.**

The package nominates its own weakest input — the veteran-and-purchasability funnel, ASM-15 to ASM-18, "the single largest uncertainty in the fiscal case," which alone moves the aggregate from 0.07 to 0.44 bp. That nomination is correct about magnitude and wrong about consequence: **the funnel does not break the conclusion.** At 0.44 bp the headline still holds — to the nearest basis point no plan's rate changes.

The assumption that *does* break the conclusion is structural. **T5 is strictly one-at-a-time**, and the package's robustness claim is correspondingly one-at-a-time: "[a]cross every sensitivity tested the aggregate stays between **0.05 and 0.44 bp**." But two of the model's drivers are **not independent, and the model's own findings prove it**:

- **ASM-19 (take-up)** ranges 10% / 20% / 30%.
- **ASM-22 (φ)**, the share of purchasers who would have worked on to unreduced eligibility, ranges 0.25 / 0.50 / 0.75.

The model's `T2` decomposition shows that a member on the work-to-eligibility baseline **overpays in every profile** — the lead profile by $21,500. A rational member who intends to work on to unreduced eligibility therefore has a positive reason **not** to buy. So a world with **high take-up** is necessarily a world with a purchaser pool weighted toward members who were leaving anyway, i.e. **low φ**. The model treats the two as independent dials, which means its adverse tail is suppressed by construction.

**The test, and the alternate number.** I re-ran the model's own `aggregate.run()` with three of its own adverse variants applied **simultaneously** — none individually implausible, and all three descriptions of the same world:

| Scenario | Net liability increase, FY2029–FY2038 | Aggregate rate impact |
|---|---|---|
| Central case (package figure) | **$7.15M** | **0.19 bp** |
| Population funnel high only (package's published maximum) | $16.78M | 0.44 bp |
| φ = 0.25 only (package) | $12.44M | 0.33 bp |
| Take-up 30% only (package) | $10.73M | 0.28 bp |
| **Compound: funnel high + φ = 0.25 + 30% take-up** | **$43.79M** | **1.16 bp** |
| Compound, plus the published 5.75% discount-rate variant | $51.72M | 1.37 bp |
| φ = 0 (no purchaser would have worked on), central funnel and take-up | $17.74M | 0.47 bp |

**The result.** The compound adverse case is **$43.79M and 1.16 bp** — **six times** the central liability and **2.6 times** the published maximum. It sits outside the range the package tells the money committees is the full sensitivity envelope, and at 1.16 bp a plan's contribution rate **does** change to the nearest basis point, which contradicts the package's most-repeated reassurance. The purchaser count rises from 222 to 781.

**This is not a criticism of the model's construction; it is a criticism of how the package characterises the model's coverage.** The fix is a sentence, not a rebuild — see the redline at **M-13**. A money committee that is given 0.19 bp central and 1.16 bp adverse, with the correlation explained, will trust the number. One that is given 0.19 bp and "0.05 to 0.44 across every sensitivity tested," and then has a staffer reproduce 1.16 bp from the published code, will not.

**Two further qualifications on the fiscal case.**

1. **If C-03 is right, the aggregates are understatements again.** The package has withdrawn the F-01 understatement on the strength of DECISION 8: "closing that path means the model's aggregates are no longer understatements on this account." C-03 says the path is not closed, only priced at one day of rehire. The model values four years of acceleration; the path delivers roughly fifteen. On the model's own single-profile anchors that is a move from $21,000 to $341,065 — about sixteenfold per member. **The withdrawal of the F-01 caveat should itself be withdrawn until E 3 is redrafted.**
2. **One input I can partly close in the model's favour.** ACTUARY residual (i) asks VRS to confirm the additive 50/10 reduction construction yielding the model's 0.400 factor. I cannot confirm the factor, but I can confirm that the **statutory floor does not bind**: § 51.1-155 A 5 sets the 50/10 allowance at "**the greater of** (i) the actuarial equivalent of the benefit the member would have received had he terminated service and deferred retirement to age 55 **or** (ii) the actuarially calculated present value of the member's accumulated contributions, including accrued interest." For the lead profile the model's PV of the baseline allowance is $255,710, which comfortably exceeds any plausible present value of a 26-year member's accumulated contributions at 5% of an $85,000 salary. Branch (i) governs, so the model's use of a single reduction factor does not understate the baseline through the A 5 floor. **The 0.400 factor itself still needs VRS confirmation before the 112.8% figure is used publicly**, and the package is right to say so.

---

## Part 6 — The one open policy question: subdivision E 3, approved leave, and long-term disability

You identified this as the single genuinely open policy question. **It is materially narrower than drafting note 10 states, and the note's premise is wrong for the long-term-disability half.**

**Note 10 says:** "Subdivision E 3 as drafted would disregard the credit for a member who is not in service immediately before retirement, which could catch a member who separates for reasons outside her control," and asks whether to "treat a member receiving long-term disability benefits as in service for purposes of subdivision E 3 only."

**What the Code says about a member on VSDP long-term disability.** Three provisions, read October 20, 2026:

1. **§ 51.1-1110 H**: "Eligibility for participation in the program shall terminate upon the earliest to occur of an employee's (i) **termination of employment**, (ii) death, or (iii) **retirement from service**." A member receiving long-term disability benefits has therefore **not** terminated employment and has not retired; she is still a participating employee.
2. **§ 51.1-1117 C**: "The **creditable service** of a participating full-time employee taking service retirement pursuant to this section **shall include periods during which the employee received disability benefits**." Her creditable service continues to accrue while she is on long-term disability — so her shortfall to the § 51.1-153 B 2 or B 3 threshold keeps closing without the credit.
3. **§ 51.1-1117 A**: an employee receiving disability benefits who is a vested member "**shall be eligible for service retirement under any provision of this title for which the employee is otherwise eligible**" — which includes § 51.1-153 B 2.

**Conclusion.** On the statutory text, a member on VSDP long-term disability is still employed, is still accruing creditable service, and is retiring *from* service rather than deferring under § 51.1-153 C. She is therefore very likely a "member in service" and **E 3 does not disregard her credit**. The problem note 10 describes does not arise for her, and the § 51.1-1123 supplemental programme for political-subdivision and school-board employees works the same way (§ 51.1-1128 C mirrors § 51.1-1117 C). The hybrid disability programme in Chapter 11.1 is irrelevant, because hybrid participants cannot purchase at all.

**Where the real gap is.** Two narrow cases:

- **Unpaid approved leave of absence.** A member on leave without pay is "inactive" in the sense § 51.1-142.2 B uses, contributions are not being reported, and § 51.1-1110 H **suspends** VSDP eligibility "during periods that an employee is placed on nonpay status, including leave without pay." A member in that posture on the day before her retirement date is the one who plausibly fails E 3.
- **The ordinary gap between the last day of service and the effective date of retirement** — which is **C-01**, and which is not a policy question at all but a drafting defect affecting a far larger population than either of the cases note 10 raises.

**What I recommend you put to the Council — and what you need not.** The **C-01** redline removes the larger part of this problem as a by-product: keying E 3 to "retires directly from service and does not retire pursuant to subsection C of § 51.1-153," with the member in service on her **last day of service** preceding the effective date, carries both the VSDP long-term disability member and the member whose retirement date falls after an interval of leave. What remains for the Council is one bounded question:

> **Should a member who is on an approved leave of absence without pay on her last day of service preceding the effective date of her retirement be treated as a member in service for purposes of subdivision E 3?**

If the answer is yes, the drafting is one clause: "**For purposes of this subdivision, a member on an approved leave of absence shall be deemed to have been a member in service.**" If the answer is no, say so expressly, because the class exists and will present.

**Correction to carry into note 10.** The long-term-disability option it offers ("treat a member receiving long-term disability benefits as in service for purposes of subdivision E 3 only") should be withdrawn or recast as a confirmation item, because §§ 51.1-1110 H and 51.1-1117 C already produce that result. **Flag for VRS confirmation rather than for Council decision**, with the question put as: *does VRS treat a member receiving benefits under § 51.1-1112 or § 51.1-1123 as a member in service?* That is a one-line answer from VRS and it closes the item.

---

## Part 7 — What I checked and found sound

Stated explicitly, because a null result is a finding and because the three structural moves held up better than the newest drafting did.

1. **Move 1 — placement in a new § 51.1-142.4 rather than inside § 51.1-142.2 — is correct and is the move that actually does the work.** "Creditable service" is defined as "prior service **as set forth in § 51.1-142.2** plus membership service," so credit created inside § 51.1-142.2 would have been creditable service by operation of the definition. Credit created in § 51.1-142.4 is not. Verified verbatim. Sound.
2. **Move 3 — the conforming amendments — is correct in target and in placement.** Each of §§ 51.1-162 B, 51.1-165.01 B, 51.1-166 D 4, 51.1-153 C, 51.1-155 (new C) and 51.1-153 B 2 / B 3 keys off something the definition does not reach, and in each case I confirmed the sentence the bill amends exists verbatim in the current text. The § 2.2-3204 A and C amendments correctly close a Title 2.2 route that every "this title" catch-all in subsection F would have missed; the F 15 extension to Title 2.2 would probably **not** have reached § 2.2-3204 A on its own, because the WTA switch turns on a status ("is eligible for unreduced retirement") rather than on a date, which is why the express amendment is necessary and correct.
3. **The "unreduced" sweep is complete** — and I extended it from six chapters to all of Title 51.1 plus Title 2.2 Chapter 32 with the same five hits. See Part 3.A.
4. **§ 51.1-166 D 3 is safe, and D 4 is unreachable.** Both package conclusions confirmed, with the arithmetic reproduced.
5. **The DECISION 3 retired-pay-bar reading is correct**, and H 5 is load-bearing for the reason the package gives.
6. **The DECISION 1 PLOP analysis is correct**, including the S-23 correction. § 51.1-165.01 A defines "normal retirement" by reference to "normal retirement as described in §§ 51.1-153 …", which is subsection A of that section — so a bridge retiree at the accelerated date does not satisfy B 1(i) branch (a), and a member who works to normal retirement date does. The package's statement of the trade-off is accurate in both directions.
7. **The DECISION 12 free-military-credit fix is correctly implemented, including a subtlety the memo does not claim.** C 2 b limits the four-year aggregate by reference to service **purchased** under § 51.1-142.2 B 2, excluding subsection I credit — which is the DECISION 12 outcome. C 2 c separately limits the purchasable amount to qualifying service "that has not been purchased **or credited**," which does capture subsection I periods — correctly, because H 3 bars double-counting the **same period**. The two provisions operate on different axes (aggregate cap versus period) and do not conflict. Sound.
8. **The F-07 over-reach fix in G is sound,** including the § 51.1-161 C limb the internal review identified: G 2 now forfeits the credit both on a § 51.1-128 cessation with refund **and** on a § 51.1-161 C transfer election, which is exactly the gap F-07 named. And K 3's preservation of § 51.1-153 C eligibility notwithstanding a K refund is carefully done.
9. **The § 51.1-153 C override mechanism is correct** — stating the condition in both places was necessary, and the "notwithstanding" plus the express anti-waiver sentence in E 3 is the right belt-and-braces. The condition's *content* fails (C-01, C-03); the *mechanism* does not.
10. **The DECISION 9 savings paragraph does its job.** The flush paragraph at the end of subsection F states the acceptance affirmatively, which is what prevents F 8 from being misread as a delay in commencement. The HIC and COLA analysis behind it is correct and I verified § 51.1-1400 A, including its deferred-retirement sentence.
11. **Clause B 1(iv) tracks § 51.1-169 A**, including the membership-not-hire-date point, with only a punctuation nit.
12. **§ 51.1-142.4 is unoccupied; § 51.1-155 has only subsections A and B; § 51.1-162 has only A, B and C; § 51.1-165.01 has A–F; § 51.1-166 has A–C and D 1–4.** All independently verified. Adding § 51.1-155 C is clean.
13. **Every internal cross-reference in the bill resolves** except the two inoperative-but-harmless references at m-07. No stranded cross-reference.
14. **"Military Retirement Bridge Credit" is correctly absent from the bill.** Your concern on this point does not survive inspection: the bill uses the operative defined term throughout and reserves "Military Service Retirement Bridge" as the short title, and memo Part 6.1 records the conforming. No change needed.
15. **No constitutional defect of consequence.** On Va. Const. art. IV, § 12's single-object clause, the § 2.2-3204 amendment is germane to the expressed object and Virginia construes the requirement liberally; the title should nonetheless name the transitional severance benefit (m-09). On art. IV, § 14's prohibitions on special legislation, clause B 1(iv) draws a classification that tracks the § 51.1-169 A hybrid boundary rather than singling out a locality, and none of the enumerated subjects is engaged. On art. X, § 11, a challenge would fail (m-12). **No retroactivity, no vagueness of constitutional dimension, no delegation defect of constitutional dimension** — the Board's discretion over price under subsection D is the same discretion § 51.1-142.2 B 3 already commits to it, and the C 2 d projection problem is a tax-qualification and administrability defect rather than a delegation one. **No takings, no compelled speech, no First Amendment surface, no equal protection claim with a plausible plaintiff.** The only constitutional finding in this review is **M-10**, and it is about the form of the document rather than the substance of the policy.
16. **No preemption, in either direction.** Federal: see Part 3.C — § 12736 does not preempt the bill. State-of-local: the bill displaces no local ordinance and the Dillon's Rule question does not arise, because the bill imposes no new duty on a locality and creates no new local power. The one local election the bill engages — the § 51.1-153 B 4 irrevocable resolution — is an existing, expressly granted power the bill does not alter.
17. **No enforcement-reality defect.** This is a benefit statute administered by the Board under subsection I with express separate-accounting and separate-reporting duties, and enactment clause 3 puts eleven reporting items on the record. There is no unenforced duty here, and no unfunded inspector.
18. **The model is reproducible and arithmetically sound.** See Part 5.
19. **The package's candour is better than its labels.** Drafting notes 8, 9, 10 and 11, memo Part 7, the source appendix's corrections log and "Still open on the evidence record," and the README's standing caveat that the MOO-260 pass "was not independent and must not be described as independent" are all accurate and unusually direct. I found **no instance** of a claim being quietly strengthened between documents in version 1.3, and the fourteen change-log items check out against the documents — except item 13's label (**M-12**).

---

## Part 8 — Where I disagree with the Title 51.1 sign-off analysis

Stated plainly, as requested, with the provision shown.

**1. The § 51.1-124.3 "creditable service" carve-out is confirmatory, not load-bearing, and the package's quantification of its value measures a different bill.**

Memo Part 3.1 says: "**Both moves are required; neither alone is safe.**" Memo Part 1.2 calls the carve-out "**the single most important protective move in the bill**." Memo Part 5.1 quantifies it: without it "the modeled liability increase for the lead profile would rise from **$21,000 to $119,349 — 5.7 times larger**," and concludes "[t]he three-move architecture in Part 3 is vindicated **quantitatively**, not merely conceptually." The README repeats the 5.7× figure as one of "three things that follow."

Read the definition: "'Creditable service' means prior service **as set forth in § 51.1-142.2** plus membership service for which credit is allowable." Eligibility credit granted under § 51.1-142.4 is not prior service as set forth in § 51.1-142.2, and it is not membership service. **It is already outside the definition by the definition's own terms, because of move 1.** The carve-out adds certainty and forecloses argument — keep it, it costs nothing — but "neither alone is safe" is not right: move 1 alone *is* safe on the text, and move 2 alone would not be, which is the asymmetry the memo's formulation obscures.

The 5.7× figure compounds the problem. It prices the counterfactual in which the credit **is** creditable service — i.e. a bill drafted inside § 51.1-142.2 without the carve-out. That is a measure of move **1**, not move 2, and it is a measure of a bill nobody proposed. Presenting it as the quantified vindication of the carve-out invites a committee member to ask what the carve-out is worth on *this* bill, and the honest answer is: litigation insurance, not $98,349.

*Suggested correction:* "Move 1 — placing the credit in a new section — is what keeps it outside the § 51.1-124.3 definition, which by its terms reaches only prior service as set forth in § 51.1-142.2 plus membership service. Move 2 — the express carve-out — forecloses argument and costs nothing, and should be retained. The 5.7× figure measures what the bill would cost if the credit were creditable service, which is the bill that move 1 avoids; it is not a valuation of the carve-out."

**2. The "closed and shrinking" claim should be withdrawn, not qualified.** See **M-01**. Until VRS confirms that no post-2014 hire can reach the VRS defined benefit plan through §§ 51.1-126.1, 126.3, 126.4 or 126.7, the sentence cannot be put in front of a money committee as "the single most useful fact." The right posture for now is the one the package took on DECISION 2 before version 1.2: the class is *substantially* closing, with named exceptions under review.

**3. Drafting note 10 understates the E 3 problem and misstates its content.** The note treats the in-service condition as raising one narrow question about leave and long-term disability. The long-term-disability half is probably already answered by §§ 51.1-1110 H and 51.1-1117 C (Part 6), and the question the note does not ask — what happens to a member whose last day of service is not the calendar day before her retirement date — is **C-01**, a blocker affecting the ordinary case.

**4. The F-01 withdrawal was premature.** Bill note 7(a) and memo Part 5.1 both record that closing the deferred path means "the model's aggregates are no longer understatements on this account." If **C-03** holds, they are, and the caveat should be reinstated until E 3 is redrafted.

**5. I do not agree that version 1.2's three additions are the most settled part of the bill.** The package's framing is that version 1.2 closed the three blockers and that what remains is process (the Board statement, tax counsel, a model refresh, one narrow policy question). On my reading the **three newest provisions — E 3, the § 51.1-153 C amendment, and subsection K's new triggers — contain all three of this review's blockers**, and they contain them because they were drafted fastest and have been read least. That is not a criticism of the decisions; DECISION 8 was right and the § 51.1-153 C amendment was a genuinely good catch. It is a statement about where the remaining risk sits, and it argues for one more full pass over subsections E, I and K specifically, after the redlines above are applied.

---

## Part 9 — Method, sources, limits

**What I did.** Read all nine package documents and the fiscal model code. Re-read every Virginia Code section the bill amends, cross-references, or relies on, in the current official text at `law.lis.virginia.gov` on October 20, 2026, retrieving whole chapters for programmatic searching: Title 51.1 Chapters 1, 2, 2.1, 3, 4, 5, 6, 6.1, 7, 8, 9, 10, 11, 11.1, 12, 13, 15; Title 2.2 Chapter 32; and § 2.2-3204 from its own section page. Read Va. Const. art. IV §§ 12 and 14 and art. X § 11 in the official text. Read 10 U.S.C. § 12736 and I.R.C. § 415(n) in primary federal text. Copied `fiscal-model/` to a scratch directory, re-ran `run_model.py` unmodified to reproduce the package's figures, then called the model's own `aggregate.run()` with combined adverse parameters to produce the compound case in Part 5.

**What I did not modify.** Nothing. I did not edit the bill or any package document, as directed. The fiscal model was copied before running; the originals are untouched. Every change in this review is a proposed redline for the Title 51.1 sign-off owner to apply.

**Limits, stated so they are not discovered later.**

- **This is internal risk analysis, not legal advice.** It is not a legal opinion, it is not a document the organization can rely on as counsel's work, and **no counsel has cleared any part of this package.** I am not counsel of record.
- **I am one reader.** This pass is independent of the drafting team, which is what MOO-260 was not, but independence is not infallibility. The findings most likely to be wrong are **M-01** (which turns on whether VRS administers § 51.1-169 A's second sentence as its text reads) and **C-03** (which turns on whether "member in service" bears the one-day reading; it plainly does on the text, but VRS's administrative gloss could differ).
- **I could not close the two cheap verification items.** The 2026 c. 563 enactment clauses are **partly** closed (no delayed effective date; second enactment and sunset unknown) and the LIS full-text search is **not** closed. Both need a credentialed LIS user or the printed Acts of Assembly. Part 4.3 records exactly what I tried.
- **I did not re-derive the actuarial mathematics.** I reproduced the model's outputs and tested its parameterisation. Whether its annuity factors, mortality interpolation and amortisation are right is a question for the VRS actuary, and the model says so itself.
- **Nothing here authorizes introduction**, and this review does not substitute for the VRS Board's mandatory statement under Va. Code § 30-19.1:7, which has not been requested.

**For the Editor — findings that must appear in the memo's risk section.** C-01, C-02, C-03, M-01, M-02, M-05, M-10, M-13, M-14, M-15, and the Part 8 item 1 correction to the carve-out claim. The remainder are drafting items for the Drafting Specialist and verification items for the Statutory Researcher and the VRS actuary.
