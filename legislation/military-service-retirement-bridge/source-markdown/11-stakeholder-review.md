# Independent Stakeholder and Political-Viability Review — Military Service Retirement Bridge

**Task:** MOO-266 (dependency of MOO-257) · **Independent of MOO-261**
**Prepared by Policy Development Team using legal, policy, and financial analysis tools, pending review by veterans' legal counsel.**
**Package reviewed:** version 1.3 — External-Review Cleanup; operative bill text version 1.2; Legislative Scenario Explorer at `explorer/dist/explorer-standalone.html`
**All sources retrieved October 20, 2026** unless stated otherwise.

**Scope.** Findings only. No package document was edited. Where a change is proposed, exact
replacement wording is given; adopting it is the Policy Director's call, and all Title 51.1
drafting remains with `a92b5d16`. Legal characterisation is routed to MOO-264 and
computational defects to MOO-265 rather than decided here.

---

## 0. The one-line political read

**The bill is viable; the 2027 date is not.** The Joint Leadership Council closes its
annual package in June of the preceding year, so the 2027 slot shut in June 2026 and the
earliest Council cycle this can enter is April–June 2027 for the **2028** session. The real
chokepoint is not the retired-pay bar — the Council has already advanced a benefit that
expressly excludes military retirees — it is the House Appropriations **Compensation and
Retirement Subcommittee**, which is where the closest analogue died 8-Y 0-N, and which the
package never names.

---

## 1. Findings table

Severity: **BLOCKER** — must close before external or patron use. **HIGH** — must close
before the package is handed to the Council. **MEDIUM** — fix in the next revision.
**LOW** — correct when convenient. **CLEARED** — tested at the Director's request and found
sound.

Confidence: **high** — direct public record on a close question. **medium** — inferred from a
consistent documented pattern. **low** — inferred from interest only.

| ID | Sev. | Document / section | Stakeholder whose reaction is predicted | Finding | Evidence | Conf. |
|---|---|---|---|---|---|---|
| **S-01** | BLOCKER | `03` header; `04` §5 "Recommended sequence"; `README` §Target | JLC Legislative Committee (8 members) | The 2027 target is unreachable through the Council, and the recommended sequence contains no Council adoption step at all. | JLC Legislative Committee minutes, 23 Apr 2025 (S‑A); RD986 p.27 (S‑B) | high |
| **S-02** | BLOCKER | `04` §4 "What it costs"; `README` | A legislative staffer opposing, or an advocate overselling | **The brief's absolute claim "No sensitivity makes this a saving" is false as against the package's own shipped tool.** The underlying control defect is MOO‑265 **F-9**, independently reached; this finding is the document consequence, which MOO‑265 does not cover. | Own drive log (S‑K); MOO‑265 F-9; `data/baseline.js` ASM‑22 | high |
| **S-03** | HIGH | Explorer, Source & assumption registry panel, closing note | VRS staff reviewer; any reader who screenshots the registry | A bare **"per-member $341,065"** and a bare **"0.19 bp"** sit in one sentence whose rhetorical function is verification. "Per-member" is the exact characterisation the briefs spend a paragraph forbidding. | `dist/explorer-standalone.html` offset 219826 | high |
| **S-04** | HIGH | `03` ¶"Career military retirees"; `04` §4; MOO‑261 §4 | Board of Veterans Services; JLC Chair; MOAA | The advisory bodies that must carry this bill are chaired and populated by the class it excludes, and no package document notes that the messenger is in the excluded group. | RD986 pp. 72, 74 (S‑B); S‑A guest list | high |
| **S-05** | HIGH | `03`; `04` §5; MOO‑261 §4 | Commissioner of DVS (ex officio, JLC and BVS) | The official whose strategic plan the Council is twice told to align to is on the record in Council minutes preferring "transitioning service members whose needs are very different than older retirees." The bridge reaches only vested members within four years of an unreduced threshold. | S‑A, Item VII | high (quote), medium (application) |
| **S-06** | HIGH | MOO‑261 §4; `04` §5 | An opponent on the JLC Legislative Committee | § 2.2‑2682 C — "The Council shall not impose unreasonable burdens or costs in connection with requests of agencies" — is a statutory objection to a proposal carrying an expected six-figure VRS build, and the package never addresses it. MOO‑261 cited § 2.2‑2682 for duties only. | RD986 p.73 (S‑B); MOO‑261 §2.4 | high |
| **S-07** | HIGH | Whole package — absent | House Appropriations Compensation and Retirement Subcommittee | No document in the package names the committee of reference or the subcommittee. The subcommittee is where the closest analogue actually died. | House Appropriations (S‑C); MOO‑261 §3 | high |
| **S-08** | HIGH | `04` §5; MOO‑261 §4 | Prospective patron | The best-evidenced patron candidate in the record sits on the chokepoint subcommittee, and MOO‑261 never crossed its own bill table against current committee membership. | S‑C roster; S‑D; MOO‑261 §1.1–1.2 | high (seat/district), medium (bill patronage — see §5) |
| **S-09** | MEDIUM | `03` ¶"Decisions resolved"; `04` §4 blocker 3 | 27 VSO service officers; DVS benefits staff; a 2026-hire veteran | "Closed and shrinking" is written as a selling point to the money committees and handed, unmodified, to the body whose newest members it excludes. No document gives the Council words to use. | `03` line 16; `04` ¶30 | high (text), medium (reaction) |
| **S-10** | MEDIUM | `03` ¶"Career military retirees"; `04` §4 | Virginia National Guard Association; Va. Army/Air National Guard Enlisted Association; Reserve Organization of America | The brief tells a sitting Legislative Committee member that his own members' eligibility is "subject to counsel confirmation." | S‑A (Marts on Legislative Cttee); RD986 p.74; `04` ¶20 | high |
| **S-11** | MEDIUM | Explorer preset "Conservative / Low Participation" | Any reader; a committee aide looking for the cautious number | "Conservative" is the lowest-cost label in the tool, inverting fiscal convention. One click cuts the headline 87%. | Own drive log (S‑K) | high |
| **S-12** | MEDIUM | Explorer `buildCsv` | A reviewer who receives only the CSV | The CSV drops the φ provenance note the handout carries, while still exporting φ's value. | Own export capture (S‑K §3) | high |
| **S-13** | MEDIUM | Explorer `buildCsv` outputs | A reader who sorts the CSV | Panel D's ordering discipline ("read it last") does not survive export; the combined figure travels as a flat row. | S‑K §3 | high |
| **S-14** | MEDIUM | Explorer Panel D caption | Anyone on a negative-sign screen | A static caption asserts the sign: "−$859,000 … a cost to the plan." | S‑K §2 | high |
| **S-15** | MEDIUM | Explorer provenance system | VRS staff reviewer | No provenance badge reaches any output figure; all 11 badge elements sit in Panel G and its legend. | S‑K §4 | high |
| **S-16** | MEDIUM | Explorer Panel G, step 3 | VRS staff reviewer | One badge overstates. "Estimated veterans" is badged **Derived Estimate**; ASM‑15 says the 6.0% anchor is published for state employees only and that 2.5% (teachers) and 7.0% (political subdivisions) have no published basis. Teachers are the largest sub-population. | S‑K §4–5; ASM‑15 | high |
| **S-17** | MEDIUM | `08`; bill enactment cl. 3(ix) | A committee member asking "how many does this leave out?" | The exclusion count is an unsourced 18% Scenario Assumption, and the bill defers the real count to a post-enactment report. | Explorer funnel (S‑K §3); `01` cl. 3(ix) | high |
| **S-18** | LOW | `03` ¶"Carry this into the money committees"; `04` §4 "Say both or neither"; mandate premise | Patron; committee clerk | The subsidy framing is the right play, but its procedural premise is overstated: § 30‑19.1:7 obliges the **Board** to prepare and submit on the session's scheduling resolution. Its text contains no bar on committee consideration and no precondition to introduction. | § 30‑19.1:7 (S‑E) | high |
| **S-19** | LOW | Whole package; `01` H 5 | A member deciding whether to buy; counsel | The H 5 defined-contribution clause is never tested against the military Blended Retirement System, under which the TSP carries agency and matching contributions. No member can be told in advance whether a TSP balance bars them. Legal characterisation routed to MOO‑264. | `01` line 212; `02` line 36 (no BRS/TSP text anywhere in the package) | medium |
| **S-20** | CLEARED | Explorer handout and CSV | — | Neither export contains **0.19** or **341,065**; both carry the required qualifier verbatim, the § 30‑19.1:7 non-substitution line and the version‑1.1 caveat. The Director's specific export worry does not reproduce. | S‑K §3 | high |
| **S-21** | CLEARED | Explorer "No Workforce Savings" preset | Money committee | The preset does its job: payroll effect is exactly $0 and Panel D item 1 shows the pension impact standing alone at −$7.152M / 0.1888 bp. | S‑K §1 | high |
| **S-22** | GOOD NEWS | `03`; `04` §4; mandate Q3 | JLC Legislative Committee | The retired-pay bar is **not** categorically disqualifying in this forum. The Committee has already advanced an initiative that expressly excludes military retirees. | S‑A, Item VII, initiative 8 | high |
| **S-23** | GOOD NEWS | `04` §5 sequencing | JLC Chairman; DVS Commissioner | A Chairman's letter to the Commissioner is a documented second channel with a real precedent — six letters advanced at the same April 2025 meeting — and is the lowest-cost landing place if the bill is not carried. | S‑A, Item VIII | high |

---

## 2. The findings in full, with proposed wording

### S-01 — BLOCKER. The 2027 target is unreachable through the Council, and the brief never asks the Council to do anything

Both briefs are addressed to the JLCVSO and the README names it the **client**. Neither
document, nor MOO‑261, identifies how the Council actually adopts an item.

The April 23, 2025 minutes of the **JLC Legislative Committee** (S‑A) document the machinery:

> "The JLC Legislative committee discussed seventeen potential legislative initiatives and
> decided on nine legislative initiatives to move forward to the full JLC on June 18th."

> "Chairman Yarborough told members that if their initiative moves forward to the full JLC,
> that they must be prepared to speak to it in front of the whole group."

So the gates are: **Legislative Committee, late April** → **full Council vote, mid-June** →
package published in the autumn → **Day on the Hill in mid-January**, which RD986 p.27 fixes
at January 15, 2026 for the 2026 session. The throughput is now sourced at both ends:
**17 proposed → 9 advanced → five or six adopted.** MOO‑261's "roughly five or six items a
year" is confirmed, and the upstream funnel is worse than that figure suggests — a new item
competes against roughly sixteen others in April.

**Consequence.** For the 2027 session the equivalent gates fell in **April and June 2026**,
both already past. The 2027 Council package is closed. The earliest Council cycle this
proposal can enter is **April–June 2027, for the 2028 session**.

A patron can of course introduce the bill in 2027 on their own initiative — nothing requires
Council sponsorship. But the package is built as a Council product, and its stated target is
unachievable by that route.

Compounding this: `04` §5's **Recommended sequence** reads "re-run the cost model → tax
questions to counsel → patron → DLS → VRS pre-filing briefing." There is **no Council
adoption step in it.** The document that exists to persuade the Council does not tell the
Council what it is being asked to decide or when.

**Proposed wording.** In `04` §5, replace the recommended sequence with:

> **Recommended sequence:** re-run the cost model against version 1.2 — both October 20
> decisions move it **downward** → tax questions to counsel → **JLC Legislative Committee,
> April 2027** → **full Council vote, June 2027** → patron → DLS → VRS pre-filing briefing,
> targeting the **2028** session. The Council's adoption gates for the 2027 session closed in
> June 2026; a 2027 introduction is available only on a patron's own initiative, outside the
> Council package.

In `03` and `04` headers, replace "2027 General Assembly" with "**2028 General Assembly**".

### S-02 — BLOCKER. One slider, two notches past its own documented range, makes the bill a saving

I drove the shipped standalone document in Chrome through every control
(`explorer/test/hostile-drive.js`, `explorer/test/phi-sweep.js`; log at S‑K). The φ slider
runs 0 to 100 in steps of 5. `data/baseline.js` describes ASM‑22 in its own words:

> "Low 0.25, central 0.50, high 0.75. This is the single most consequential assumption in the
> model and no published data bears on it."

Holding everything else at the committed central case and moving only φ:

| φ | Combined bp | Net liability | Member payments ÷ value |
|---|---|---|---|
| 0.50 (central) | **0.1888** | $7,151,771 | 50% |
| 0.75 (documented high) | 0.0491 | $1,858,819 | 80% |
| 0.80 | 0.0211 | $800,228 | 90% |
| **0.85** | **−0.0068** | **−$258,362** | **104%** |
| 1.00 (slider maximum) | **−0.0906** | **−$3,434,133** | **189%** |

The sign flips above φ = 0.80, past ASM‑22's own stated high bound. At the slider's maximum
Panel B renders, verbatim:

> Employer contribution-rate impact · **-0.02 bp** · basis points on $26048.74M of covered payroll
> Member ANC payments received · $1.82M · **recovers 189% of the value conferred**

Nothing on the screen tells the reader they have left the model's documented sensitivity
envelope. The published sensitivity rows stop at φ = 0.75 and are all positive, so the
envelope claim is true *inside* the envelope — but the control does not stop there.

**Attribution, and the division of labour.** MOO‑265 reached the same control defect
independently and more precisely — its **F-9** fixes the break-even at **φ ≈ 0.838** and
rates it MATERIAL, and its §5 is the better treatment of the fiscal consequence, including
the point that self-selection skews the defensible range *low*, toward more subsidy. **The
control fix belongs to F-9 and I do not restate it.** My finding is the one MOO‑265 does not
reach, because it reviews the explorer and not the briefs:

**The two-page brief contains an absolute claim that the package's own shipped tool refutes.**
`04` §4 says:

> "**No sensitivity makes this a saving, so cost neutrality is unavailable.**"

A hostile staffer needs two moves — take-up to its floor, φ to its maximum — to put that
sentence and the tool side by side. The claim is defensible only inside the model's own
φ band, and the sentence does not say so. `04` §4 goes to a legislator; a reader who can
falsify a flat assertion in the brief with two clicks on the brief's own companion tool will
discount everything around it. Candour is the right strategy (see S‑18); it does not survive
an overstatement that the proposer's own artifact can disprove.

This is why I rate it BLOCKER while MOO‑265 rates F-9 MATERIAL: the explorer defect is a
tool that can be mis-driven, which is recoverable; the brief sentence is a false absolute in
the document that is handed over, which is not.

**One addition to F-9, offered rather than duplicated.** φ is exogenous in the model, but a
member decides whether to buy **after** knowing which type they are — which
`methodology.html` § 9.4 concedes. At φ = 1.00 the tool still reports 55 purchasers, members
who by the assumption just selected each knowingly overpay by 89%. Purchaser counts are not
re-estimated when φ moves, so any guard band F-9 produces should say so, not merely that the
value is out of range.

**Proposed wording (`04` §4).** Replace "No sensitivity makes this a saving, so cost
neutrality is unavailable" with:

> No sensitivity inside the model's documented range for the behavioural assumption
> (φ from 0.25 to 0.75) makes this a saving, so cost neutrality is unavailable.

### S-03 — HIGH. The two figures the package most carefully qualifies appear bare, together, in the explorer's provenance panel

In the Source & assumption registry panel — the panel a VRS reviewer reads precisely to judge
what stands behind the numbers — the closing note reads, verbatim:

> "The browser engine is verified against the model's committed CSV tables by
> `explorer/test/reconcile.js` — 98 assertions, including the **per-member $341,065** and the
> **0.19 bp** aggregate."

Two defects in one sentence:

1. **"per-member $341,065."** Every other document in the package goes out of its way to deny
   that reading. `README` §11, `03` and `04` all say it is "the maximum modeled net value
   above the member purchase price under the frozen-service/subsidy scenario — the single most
   favorable modeled profile, **not** a cost per veteran." The explorer calls it per-member.
2. **"the 0.19 bp aggregate"** carries neither the HIC/COLA exclusion nor the version‑1.1
   caveat, both of which the tool attaches everywhere else.

The sentence's function is to assert verification, so it lends both figures more authority
than either carries. This is the second escape of a bare 0.19 bp; the first was the tooltip.

**And it compounds with MOO‑265 F-3.** That review finds that $341,065 **is not the maximum**
modeled net value — the model's own grid reaches $418,729 and exceeds $341,065 in every
projection year. So the explorer's registry panel asserts, under the banner of verification,
a figure that is both mislabelled as per-member and wrong as a maximum. Fix F-3 first; the
wording below assumes the corrected figure and characterisation are substituted in.

The two properly-qualified uses of 0.19 elsewhere in the build (offsets 114371 and 114480, in
the basis-point explainer) are correct and should be left alone.

**Proposed replacement wording.**

> The browser engine is verified against the model's committed CSV tables by
> `explorer/test/reconcile.js` — 98 assertions, including the maximum modeled net value above
> the member purchase price under the frozen-service/subsidy scenario ($341,065 — the single
> most favorable modeled profile, not a cost per veteran) and the central-case combined
> employer contribution-rate impact (0.19 bp — the modeled retirement-plan impact, excluding
> the separately funded health insurance credit and COLA effects, including unquantified COLA
> exposure; model complete for bill version 1.1).

### S-04 — HIGH. The bodies that must carry this bill are chaired and populated by the class it excludes

This is the finding behind the Director's question 3, and it is sharper than "career retirees
are shut out."

The Commonwealth's own report describes the Board of Veterans Services membership as of
December 1, 2025 (RD986 p.72). Eight listed members are identified **in their public
capacity** as retired career officers: Claudia Flores (Commander, U.S. Navy (Retired)),
Malcom Frost (Retired Major General, U.S. Army), Vanessa Gattis (Colonel, U.S. Army
(Retired)), Vincent L. Griffith (RADM USN Ret), Joyce Henderson, Vice Chair (Retired
Lieutenant Colonel, U.S. Army), Terence E. McKnight (Rear Admiral, U.S. Navy (Retired)),
Wendell Warner (Retired Colonel, U.S. Army) and Chuck Zingler, ex officio (U.S. Navy Retired
Captain). JLC Chair Bill Aramony sits on that Board ex officio.

On the JLC side, **MOAA holds a seat on the eight-member Legislative Committee** (John Down),
and MOAA's Richmond Area Chapter legislative chair attended the April 2025 meeting as a guest
(S‑A) — making MOAA the most visibly active organisation in the room. MOAA's membership is
open to active duty, former, **retired**, and National Guard and Reserve commissioned and
warrant officers (S‑F; retrieved as a search snippet of MOAA's own membership page rather
than directly — see §5).

So the people who would have to take this bill to the General Assembly are, to a substantial
degree, people the bill's retired-pay bar excludes. The package discloses the bar — `03`
("Career military retirees are generally shut out — manage this expectation") and `04` §4
both do, honestly and prominently. What no document does is acknowledge that the Council is
being asked to carry a bill its own leadership cannot use.

Taken with **S-22**, this is a presentation problem rather than a viability problem. But it
has to be said out loud in the room, by the proposer, before someone else says it.

**Proposed wording** — add to `03`, in the "Career military retirees" paragraph:

> Say this in the room, first, and not defensively: several of the Council's and the Board's
> own leaders are career retirees this bill cannot help. The bridge is aimed at the member who
> separated **without** retirement-eligible service and then spent a public-sector career
> three years short of an unreduced retirement. Asking the Council to carry a bill its
> leadership cannot use is a real ask, and it should be made as one.

### S-05 — HIGH. The DVS Commissioner's documented preference is adverse, quotable, and unanswered

The April 2025 minutes record the adoption test the Council applies. Twice:

> "He reminded members to try to link their ideas back to the DVS strategic plan and work
> together." (Legislative Chair Yarborough)

> "Commissioner Zingler then provided remarks, reminding committee members to tie initiatives
> back to the Virginia Veterans strategic plan. He emphasized the importance of **investing in
> transitioning service members whose needs are very different than older retirees**."

The agenda packet for that meeting included "DVS Strategic Plan Goals" as a standing item.

This upgrades MOO‑261 §4 from inference to a documented adoption criterion — and the criterion
is adverse. The bridge has no DVS strategic-plan hook: DVS does not administer VRS, gains
nothing, and is not even a stakeholder in the implementation. And the beneficiary is the
opposite of a transitioning service member — by construction a vested member within four
years of an unreduced threshold, in a benefit structure closed to new entrants since January
1, 2014.

**Proposed wording** — add to `04` §5:

> **The Council's adoption test, and the answer to it.** The JLC Legislative Committee asks
> members to tie each initiative to the DVS strategic plan, and the Commissioner has
> emphasised investing in transitioning service members "whose needs are very different than
> older retirees" (JLC Legislative Committee minutes, April 23, 2025). This proposal does not
> serve transitioning service members and should not be presented as though it does. Its claim
> on the Council is different and narrower: it corrects a pricing cliff in a right the
> Commonwealth has already granted, for a population that is closed and shrinking, at a cost
> under one basis point. It asks the Council for sponsorship of a correction, not for a new
> program.

### S-06 — HIGH. § 2.2-2682 C is a statutory objection inside the Council, and the package never addresses it

MOO‑261 §4 cites § 2.2‑2682 for the Council's powers and duties. It does not quote subsection
C, reproduced in RD986 Appendix J (p.73):

> "C. The Council may apply for funds from the Veterans Services Foundation to enable it to
> better carry out its objectives. **The Council shall not impose unreasonable burdens or
> costs in connection with requests of agencies.**"

Read alongside MOO‑261 §2.4 — which expects "a six-figure VRS implementation appropriation" on
the analogue of SB 419's $374,500 FY2027 system-change estimate — an opponent on the eight-
member Legislative Committee has a clean statutory line: the Council is told by statute not to
impose unreasonable costs on agencies, and this item asks the Council to impose a six-figure
build on VRS for a credit that VRS gains nothing from administering.

Note also what subsection A actually authorises: advising on "methods of providing support for
ongoing veterans services and programs," recommending issues that "may potentially impact
veterans," and promoting "new efficient and effective **administrative** initiatives that
enhance existing veterans' services and programs." A defined-benefit pension amendment is a
poor fit for every one of those verbs. This is the strongest available version of MOO‑261's fit
objection, and it is in the statute MOO‑261 already cited.

**Proposed wording** — add to `04` §5:

> **Anticipate § 2.2‑2682 C.** The Council is directed by statute not to "impose unreasonable
> burdens or costs in connection with requests of agencies," and this proposal is expected to
> carry a six-figure VRS implementation appropriation. The answer is that the cost is a
> one-time system build, that enactment clause 3 requires the Board to report it before the
> credit becomes available on July 1, 2028, and that the Council is free to condition its
> sponsorship on the Board's estimate. If the Council is unwilling to carry an agency-cost
> item, the Chairman's-letter route is the alternative.

### S-07 — HIGH. The committee path, including the subcommittee, is named nowhere in the package

MOO‑261 §3 is a good money-committee *history*. It is not a decision path. No document in the
package names the committee of reference, and none names a subcommittee — which matters
because in Virginia most bills die in subcommittee on an unrecorded voice vote, and MOO‑261's
own closest analogue died exactly there ("HB 1867 (2023) — subcommittee recommended laying on
the table, 8-Y 0-N; left in Appropriations").

The venue, as of the 2026 session (S‑C):

**House Appropriations Committee → Compensation and Retirement Subcommittee.** Stated
jurisdiction: "State Employee Compensation Retirement Worker's Compensation State Health
Insurance Plan"; it "advise[s] the Committee on matters related to public employee
compensation, benefits and retirement." Chair: **Alex Askew (95th)**. Members: Askew, C. E.
Cliff Hayes (91st), Rodney Willett (58th), Kathy Tran (18th), Shelly Simonds (70th),
M. Keith Hodges (68th), Scott Wyatt (60th). The subcommittee met four times in the 2026
session (January 19, February 2, February 13, March 2) and handled HB 204, HB 205, HB 987 and
HB 1107, all VRS bills.

**Senate Finance and Appropriations Committee** on the Senate side — the committee that
continued SB 419 to 2027, 14-Y 0-N, and the committee in which SB 419 is live again.

**Proposed wording** — add a numbered part to `04` §5, or a standalone paragraph:

> **Where this bill goes.** In the House, to the Committee on Appropriations and from there to
> its **Compensation and Retirement Subcommittee**, whose stated remit is public employee
> compensation, benefits and retirement. That subcommittee is the decision point: it is where
> HB 1867 (2023), the closest analogue in the record, was recommended for the table 8-Y 0-N
> without a recorded floor vote. In the Senate, to Finance and Appropriations, which continued
> SB 419 to 2027 by 14-Y 0-N and will hear SB 419 again in the same session. Plan the case for
> seven subcommittee members, not for a floor audience.

### S-08 — HIGH. The best-evidenced patron candidate sits on the chokepoint subcommittee, and MOO-261 never looked

MOO‑261 §1.1 lists the patron of every § 51.1‑142.2 bill since 1994 and §1.2 establishes that
only three bills in LIS history contain the phrase "approximate normal cost" — the exact
pricing mechanism this bill reopens. Two of the three are HB 1830 (2025) and HB 139 (2026),
both patroned by **Simonds**. MOO‑261 then spends §4 looking for an internal VSO champion and
never crosses its own table against current committee membership.

**Delegate Shelly Simonds (70th District, Newport News) sits on the House Appropriations
Compensation and Retirement Subcommittee** (S‑C, S‑D). She is, on the record MOO‑261 itself
assembled, the only sitting legislator with a demonstrated record of carrying
approximate-normal-cost purchase-of-service legislation — HB 1830 (2025), which passed and was
vetoed, and HB 139 (2026), Chapter 563. Her district covers Newport News, with Newport News
Shipbuilding, Fort Eustis and Langley nearby.

I am identifying a plausible patron from the public record. I have not contacted anyone and
will not; the approach is the Policy Director's to make or decline.

Two honest qualifications. First, the bill-patronage facts rest on MOO‑261's direct LIS
retrieval, which I could not independently re-verify (§5). Second, a patron whose prior
approximate-normal-cost bill was vetoed is not an unalloyed asset, and HB 139's subject
(employee-association educational leave) is unrelated to veterans; the relevance is to the
pricing mechanism and the venue, not to the policy.

**Proposed wording** — add to `04` §5:

> **Patron.** Prefer a patron who already sits on the House Appropriations Compensation and
> Retirement Subcommittee, because that is where the bill will be decided. On the record
> assembled in the precedent scan, the member with a demonstrated history of carrying
> approximate-normal-cost purchase-of-service legislation and a seat on that subcommittee is
> Delegate Simonds (70th, Newport News). Confirm current committee assignments for the 2027
> session before approaching anyone.

### S-09 — MEDIUM. "Closed and shrinking" has no answer for a 2026-hire veteran

`03` line 16 ends the decisions paragraph: "so the group is **closed and shrinking**." `04`
¶30 does the same: "**the covered group is closed and shrinking**." The phrase was built for
the money committees, where it bounds the cost, and it is the package's most useful fact
there.

Handed unmodified to the Council, it says something different. Plan 1 closed July 1, 2010 and
Plan 2 closed January 1, 2014 (ASM‑13). Every veteran hired into VRS-covered employment on or
after January 1, 2014 is a hybrid participant and is excluded by DECISION 2, and the
§ 51.1‑153 B 4 public-safety carve-out is drawn at the same date. So the answer to "is there a
constituency that reads this bill as excluding them?" is yes, and it is the entire post-2014
cohort — which is now more than twelve years of hiring and grows every year. These are the
post-9/11-era veterans the Council's member organisations are actively recruiting, and the
group the Commissioner called the priority (S‑05).

No package document gives a service officer or a DVS counsellor a sentence to say to that
person. That gap, not the policy, is the finding. The exclusion itself is settled and I am not
reopening it.

**Proposed wording** — add to `04` §4, immediately after blocker 3:

> **What to tell a post-2014 hire.** A veteran hired into VRS-covered employment on or after
> January 1, 2014 is a hybrid participant and this bill does not reach them. The reason is
> structural, not a judgment about their service: the hybrid program has no unreduced-service
> threshold for a bridge to shorten, because its defined benefit component uses a different
> eligibility test and the member's own balance drives most of the outcome. A hybrid
> equivalent would be a separate proposal against a different mechanism, and the Council
> should decide whether it wants one. Until then, say plainly that this bill fixes a pricing
> cliff for the closing Plan 1 and Plan 2 cohorts and does nothing for anyone hired since.

If the Council will not accept that answer, the honest alternative is to commission the hybrid
analysis before seeking sponsorship. That is a Policy Director call, not a reviewer's.

### S-10 — MEDIUM. The brief tells a sitting Legislative Committee member his members' eligibility is unresolved

`04` ¶20 and `03` ¶22 both state that federal law protects qualifying service associated with
**non-regular Reserve-component retired pay** under 10 U.S.C. chapter 1223, but that whether
§ 12736 reaches this bridge is "subject to counsel confirmation," and instruct that no broader
Reserve or Guard protection be asserted. That discipline is correct and I am not questioning
it.

The stakeholder consequence is unflagged. Three of the Council's 27 member organisations exist
for that exact population: the **Virginia National Guard Association** (Jay Marts), the
**Virginia Army/Air National Guard Enlisted Association** (Carl Holcomb), and the **Reserve
Organization of America** (David Sitler) (RD986 p.74). Marts is one of the eight members of
the Legislative Committee that decides whether the item advances (S‑A).

So the document asks a Legislative Committee member to vote to sponsor a bill whose
application to his own members is expressly undetermined. That is a predictable "no," or at
best an abstention, from a vote where eight members is the whole room.

**Proposed wording** — add to `04` §4, after the Reserve-component sentence:

> **Say this to the Guard and Reserve organisations directly.** Three Council member
> organisations represent Guard and Reserve populations, and the § 12736 question is open for
> exactly those members. The proposal does not resolve it and should not pretend to. Counsel's
> answer should be obtained **before** the Council is asked to vote, not after, because a
> Legislative Committee member cannot responsibly sponsor an item whose application to his own
> members is undetermined.

### S-11 — MEDIUM. "Conservative" is the lowest-cost label in the tool

The explorer's six presets, driven in order (S‑K §1), produce combined employer
contribution-rate impacts of: Central 0.1888 bp, **Conservative / Low Participation 0.0245
bp**, High Participation 0.6642 bp, Workforce Turnover 0.1888 bp, No Workforce Savings 0.1888
bp, Hybrid Variant 0.1864 bp.

**One click of the button labelled "Conservative" cuts the headline figure by 87%**, to a
number that renders as "0.02 bp," and Panel B then reads "recovers 80% of the value
conferred." In fiscal work "conservative" conventionally means conservative *as to cost* —
prudent, therefore high. Here it means low take-up and a high φ, therefore low cost. The
label inverts the convention on the one control a cautious reader is most likely to reach for
first.

**Proposed fix.** Rename the preset **"Low Participation (low-cost case)"** and change its
description to:

> Low take-up, positions refilled at full salary, no workforce reduction, and a high share of
> purchasers who would have worked on to eligibility anyway. This is the **low-cost** corner of
> the model, not a prudence case — it understates the pension impact relative to the central
> case. For the figure a money committee should start from, use *No Workforce Savings*.

### S-12 — MEDIUM. The CSV exports φ's value and drops φ's warning

Captured from the same screen (S‑K §3). The handout carries:

> "The behavioural assumption φ decides whether a purchaser is subsidised or overpays, and no
> published data bears on it."

The CSV does not. It carries the Status line, the Required qualifier, and then
`"Input","Behavioural assumption φ (share who would have worked on)","100%"` — the value,
with nothing saying the value is unsourced or that it determines the sign. The CSV is the
export most likely to be pasted into someone else's spreadsheet and re-shared.

**Proposed fix.** Add one header row to `buildCsv`, immediately after the Required qualifier:

> `"Header","Behavioural assumption basis","The behavioural assumption (phi) decides whether a purchaser is subsidised or overpays, and no published data bears on it. ASM-22 states low 0.25, central 0.50, high 0.75. Population inputs are estimated from one published anchor (veterans are 6% of the Virginia classified state workforce, June 30, 2024) plus four assumed filters; no published veteran share exists for teachers or political subdivisions."`

### S-13 — MEDIUM. Panel D's ordering discipline does not survive export

On screen, Panel D is careful and well written: three totals kept separate, the combined
figure "shown last and smallest on purpose: it is the least reliable of the three."

In the CSV the same figure is `"Output","Combined scenario effect","$8,566,766"` — a flat row
among forty others, with no ordering, no reliability ranking, and no "read it last." A reader
who sorts the file descending by value sees the combined scenario effect at the top.

This is a bigger export-travel risk than the 0.19 bp and $341,065 worries, both of which turn
out not to reproduce (S‑20).

**Proposed fix.** Change the CSV label to:

> `"Output","Combined scenario effect (READ LAST — least reliable of the three totals; adds a pension measurement to a workforce assumption the Commonwealth controls and this model cannot observe)","$8,566,766"`

### S-14 — MEDIUM. A static caption asserts the sign of a figure that can be negative

On the negative-sign screen, Panel D item 1 renders:

> 1. Modeled pension impact · **−$859,000** · -0.02 bp on employer contribution rates — **a
> cost to the plan**

The number is a credit and the caption calls it a cost. Either a hostile reader screenshots a
tool that contradicts itself, or a friendly reader takes the caption and reports a cost that
is not there.

The code fix belongs to MOO‑265; I record it here because it is a legibility defect in the
sentence a reader actually believes. Suggested caption: "a cost to the plan" when the figure
is positive, "a credit to the plan at the selected behavioural assumption — see the φ note
below" when negative.

### S-15 — MEDIUM. No provenance badge reaches any output figure

I enumerated every badge element in the live document (S‑K §4): 11 elements, six distinct,
all of them in **Panel G (Population funnel)** and its legend. The three classes are
`●Published Fact`, `◑Derived Estimate`, `○Scenario Assumption`.

Not one output figure carries a badge. Not the combined bp, not the net liability, not the
combined scenario effect, not the HIC estimate. A VRS reviewer who has learned to trust the
badge system gets provenance on the funnel inputs and silence on every result.

**Proposed fix.** Badge the Panel B, C and D headline figures as **◑Derived Estimate** where
they follow from published rates and methods (the bp figures, which use certified FY2027–FY2028
rates and VRS's published 20-year level-percent amortization) and as **○Scenario Assumption**
where they do not (anything on the φ-blended line, and the whole of Panel C and Panel D item
3, which rest on a hiring assumption the model cannot observe).

### S-16 — MEDIUM. One badge overstates what stands behind the number

The Director asked whether any badge overstates. One does, and it is the step the whole
population estimate turns on.

Panel G step 3, "**Estimated veterans**" (2,416.6), is badged **◑Derived Estimate**. ASM‑15,
in the registry on the same page, says:

> "SRC‑24 gives 6% for the Virginia classified state workforce as of June 30, 2024
> (self-identified). **No published figure exists for VRS teachers or political subdivision
> employees.** The model uses 6.0% for state employees (published anchor), **2.5% for teachers,
> and 7.0% for political subdivision non-hazardous employees**, with a low/high band of
> 0.6x / 1.6x on each."

So the step is a published anchor for **one of three** plans and the modeler's own number for
the other two. "Derived Estimate" reads as *computed from published data*; for two of the
three plans it is not. And those two dominate: the teacher and political-subdivision plans
supply about **three quarters** of the modeled purchasers and **$19.77 billion of the $26.05
billion** of covered payroll that the bp denominator runs on.

Two other steps deserve a note, though their badges are defensible. Step 2, "Exposed to a
purchase opportunity," is badged **Derived Estimate** but rests on ASM‑10 — which the registry
itself calls "the largest single source of uncertainty in the population estimate" and
describes as a proxy that "FAILS for members with purchased prior service, prior non-contiguous
VRS service, part-time service, or a hybrid opt-in" — and on ASM‑12, whose own entry reads
"Direction of error: unquantified. This number should be replaced with VRS data."

**Proposed fix.** Split step 3 into its published and assumed components, or re-badge it
**○Scenario Assumption** with the label:

> Estimated veterans — **6.0% published anchor for state employees only** (SRC‑24, self-
> identified, June 30, 2024); the teacher (2.5%) and political subdivision (7.0%) shares are
> assumed, and no published figure exists for either. Those two plans carry about three
> quarters of the modeled purchasers and $19.77 billion of the $26.05 billion of covered
> payroll.

### S-17 — MEDIUM. The number the committee will ask for first is an unsourced 18%

A subcommittee member hearing "career military retirees are generally shut out" asks the
obvious next question: how many? The explorer's funnel answers it — "Not barred by the
military retired pay rule … 1,585.3" from 1,933.3, i.e. an assumed **18% excluded** — and
badges that step **○Scenario Assumption**, correctly, because there is no source.

The direction of likely error is adverse to the beneficiary count. The relevant population is
not veterans generally but veterans *within four years of a VRS unreduced threshold* — mid-to
late-career public employees, among whom a 20-year retiree who separated in their late
thirties and took a second career in state or local government is the classic path, not an
outlier. If the true share is materially above 18%, the covered group is smaller than modeled
and the exclusion story is correspondingly larger.

The package already knows it does not know: bill enactment clause 3(ix) asks the Board to
report "the number of members whose qualifying active duty military service is excluded from
purchase because it is included in the calculation of a retirement allowance received or to be
received from another retirement system." That is the right instrument. But it produces the
number **after** enactment, and the question will be asked **before**.

**Proposed wording** — add to `04`:

> **If asked how many veterans this bill leaves out, say that we do not know.** The model
> assumes 18% of otherwise-eligible veteran members are barred because their military service
> is already counted toward retired pay, and that 18% is an assumption with no published
> source — the Commonwealth does not collect it. Enactment clause 3(ix) requires the Board to
> count it. Virginia is among the leading states for military retirees, so the share may well
> be higher than assumed, which would make the covered group smaller than modeled and the
> cost lower.

### S-18 — LOW, and a correction to a premise in my own mandate

The mandate states that "§ 30-19.1:7 makes a VRS Board impact statement mandatory" and asks
whether, if nothing can be introduced until the Board statement exists, I should say so in
those words.

**It is not the case, and I should say that instead.** § 30‑19.1:7 reads, in the operative
part (S‑E):

> "In accordance with a joint resolution that establishes a schedule for the conduct of
> business coming before a regular session of the General Assembly, the Board of Trustees of
> the Virginia Retirement System shall investigate, prepare, and submit to the Clerk of the
> House of Delegates, the Clerk of the Senate, the Commission on Local Government, the House
> Committee on Appropriations, and the Senate Committee on Finance and Appropriations, a
> statement of (i) the financial impact of the proposed bill upon the general fund and the
> various local governments that have elected to become part of the Virginia Retirement System
> pursuant to § 51.1‑800 and (ii) the policy implications that such bill will have on the
> various systems administered by the Board of Trustees."

The duty runs to the **Board**, on the schedule set by the session's own procedural
resolution. The section contains **no** sentence barring a committee from considering or
reporting a bill that lacks the statement, and no precondition to introduction.

**No conflict with MOO‑265.** That review independently verified § 30‑19.1:7 and concluded
"the statement is genuinely mandatory for this bill," which is correct and is the same
reading: the Board's duty to prepare and submit is mandatory. My point is narrower and does
not contradict it — the obligation binds the Board, not the patron, and it is not a gate on
introduction or on committee action.

**What this means for the strategy, which survives.** The subsidy framing is the right play
and I would not change it. The reason it is right is not procedural compulsion but certainty:
the Board will produce a statement on this bill, the statement will quantify a subsidy, and a
neutrality claim contradicted by it is unrecoverable in the venue that decides the bill.
MOO‑261 §2 establishes the Board's consistent language on exactly this point — "Enhancing
member benefits without an immediate cash infusion to offset the increase in liability is not
an actuarially sound method of funding benefit plans."

What should change is any implication that the statement is a gate. The sequencing claim to
make is the weaker, true one: a Board statement will arrive during session whether or not the
patron has prepared for it, so the patron should have the model, the 0.19 bp denominator and
the subsidy figure in hand before the statement lands — not that the bill cannot be filed
without it.

**Proposed wording** — in `03`, replace "Carry both halves: 'no cost' will be contradicted by
the Board's § 30-19.1:7 statement" with:

> Carry both halves. The Board will prepare a § 30‑19.1:7 statement on this bill on the
> session's own schedule, and it will quantify the subsidy. "No cost" is therefore not
> survivable — not because the statement gates the bill, but because it will arrive during
> session and the patron will be asked to reconcile it.

### S-19 — LOW. The Blended Retirement System is not tested anywhere in the package

Subdivision H 5 inherits § 51.1-142.2 B's bar in full, including its second limb: no purchase
"**if there is a balance in a defined contribution account that serves as a primary retirement
account related to such service**."

No document in the package — bill, memo, red team, precedent scan, fiscal memo, README — uses
the words Blended Retirement System, BRS or Thrift Savings Plan. Under BRS the TSP carries
automatic and matching government contributions as a designed component of the retirement
benefit, which is at least arguably a "primary retirement account related to such service."

The eligibility gates make the overlap narrow — Plan 1 and Plan 2 are closed to new entrants,
and BRS covers entrants from January 1, 2018 plus opt-ins — but it is not empty: a pre-2014
VRS member who left for active duty after 2017 and returned is the live case.

**This is a legal characterisation question and I am not answering it.** Routed to MOO‑264.
The stakeholder point is the one in my lane: until it is answered, a VRS counsellor cannot
tell a member with a TSP balance whether they qualify, and the § 51.1-142.4 I 2 written
pre-purchase estimate is the document that would have to say so.

### S-20 — CLEARED. The export worry does not reproduce

Driven to the cheapest screen and exported (S‑K §3): the handout is 5,855 bytes, the CSV
5,098. **Neither contains "0.19". Neither contains "341,065."** The exports carry the live
scenario, not the published central figures, so the bare-figure risk the Director identified
is confined to the registry note (S‑03).

Both exports carry, verbatim: the full Required qualifier (every bp figure is the modeled
retirement-plan employer contribution impact, excludes HIC and COLA including unquantified
COLA exposure, model complete for version 1.1 only); the status line that this is not an
actuarial certification, not the Board statement under § 30‑19.1:7 and not a General Assembly
fiscal impact statement; the scenario label, which correctly read "Custom scenario" on a
hand-driven screen; the HIC estimate marked "illustrative, outside the bp figures"; and COLA
as "NOT QUANTIFIED". The handout additionally carries the population-anchor note, the φ note
and the Reserve-component note. The CSV carries provenance badges on all eight funnel steps.

This is better than the mandate assumed. The remaining export gaps are S-12 and S-13 only.

### S-21 — CLEARED. The No Workforce Savings preset does its job

One click produces payroll effect exactly **$0** (replacement 100%, nothing eliminated, zero
vacancy months) and Panel D item 1 showing the pension impact standing alone at
**−$7,151,771 / 0.1888 bp**, with the on-screen note "Setting replacement to 100% with nothing
eliminated — the No Workforce Savings preset — shows the pension impact standing alone, which
is the figure a money committee should start from." Its description also says "This is the
scenario to read first." The pension impact is legible with no workforce offset. Working as
designed.

The one improvement worth making is that the preset does not pin φ, so it inherits whatever φ
the user last set — including a φ outside the documented band. Fixing S-02 fixes that.

### S-22 — GOOD NEWS. The retired-pay bar is not categorically disqualifying in this forum

This is the finding the Director most expected me to come back hard on. I come back on it
only halfway, and the reason is a document.

Among the nine initiatives the JLC Legislative Committee voted to advance to the full Council
on April 23, 2025 (S‑A, Item VII), initiative 8 reads:

> "Income tax credit of $1500 will apply to all Virginia veterans (including reserve and
> national guard) beginning in fiscal year 2027. **This would exclude retired Virginia
> veterans**."

The Council's own legislative gatekeepers advanced a benefit that expressly excludes military
retirees. The retired-pay bar therefore lands on a line this body has already drawn
deliberately, in the same room, within the last eighteen months. A veterans bill that excludes
career military retirees is **sustainable** in front of this Council, as a matter of its
revealed preference.

Two qualifications, both real. The Committee also advanced initiative 3, "Removal of the
$40,000 cap on military benefits" — a retiree-focused item — and that item does not appear in
the 2026 adopted list; if the 9→6 narrowing dropped it, the Council's revealed preference when
it has to choose is against retiree items, which cuts the same way. I could not source the
adopted 2026 list primarily (§5), so I am flagging that as an observation, not a finding.
Second, a $1,500 credit and a pension-eligibility mechanism are not the same kind of
exclusion: the bridge is the only instrument addressing the gap it addresses, so exclusion
from it is more consequential to the individual even if less controversial to the body.

**The practical consequence is a change of register, not of policy.** Stop treating the
retired-pay bar as a liability to be managed defensively, and state it as a scope decision of
the kind this Council already makes. Combined with S-04, that is the whole fix.

### S-23 — GOOD NEWS. There is a documented second channel, and it is the right fallback

At the same April 2025 meeting the Committee advanced **six letters** from the JLC Chairman to
the DVS Commissioner (S‑A, Item VIII), on subjects it was not carrying as legislation —
including a letter "requesting the determination of how many absentee votes are rejected"
and one asking the Department of Health to change a records standard.

That is a real, used, low-cost mechanism, and it fits this proposal's actual blocking
condition. The package's own open items are a Board statement that has not been requested, an
actuarial question only VRS can answer, and a count (clause 3(ix)) that nobody has. A
Chairman's letter asking the Commissioner to put the eligibility-cliff question and the
approximate-normal-cost pricing question to VRS would produce exactly the evidence the bill
needs, inside one Council cycle, without spending a legislative slot.

**Proposed wording** — add to `04` §5 as the fallback branch:

> **If the Council will not carry a bill this cycle.** The Council has an established second
> channel — a letter from the JLC Chairman to the Commissioner of Veterans Services — and it
> fits this proposal's blocking condition exactly. A letter asking the Commissioner to put two
> questions to VRS (what is the actuarial value of accelerated unreduced eligibility for a
> member purchasing under § 51.1‑142.2 B 3, and how many otherwise-eligible veteran members
> are barred because their service is counted toward military retired pay) would produce the
> evidence the bill needs within one Council cycle, without consuming a legislative slot.
> Sponsorship can then be sought in April 2027 for the 2028 session on a complete record.

---

## 3. Where MOO-261's internal conclusions do not survive

MOO‑261 is a better document than its "internal" label implies, and most of it holds. Named
specifically, here is what does not.

| MOO-261 claim | Verdict | Why |
|---|---|---|
| §4: "it needs an internal champion before it needs a patron" — followed by five candidate organisations | **Does not survive as stated.** | The Council's decision point is an eight-member **Legislative Committee** meeting in April and a full-Council vote in June (S‑A). MOO‑261 does not identify that body, its membership, its calendar or its criteria. Of the five organisations MOO‑261 names as likely champions, **two — Marine Corps League and Air Force Sergeants Association — hold no seat on the Legislative Committee at all.** A champion who is not in the room in April cannot advance the item. |
| §4 (implicitly): the fit question is about the Council's demonstrated subject-matter profile | **Survives, but was gettable at much higher confidence.** | MOO‑261 inferred fit from the published agenda list. The adoption criterion is documented: members are twice told to tie initiatives to the **DVS strategic plan** (S‑A), and the agenda packet carries "DVS Strategic Plan Goals" as a standing item. The conclusion is right; the evidence available for it is far stronger than inference. |
| §4: "No member organization has a recorded position on VRS matters, so this is inference and is labeled as such." | **Honest and correct as to VRS, but it stopped one question short.** | No VRS position exists, true. But the Council has a **recorded position on excluding military retirees from a veterans benefit** (S‑22, initiative 8), and a recorded adverse **posture from the DVS Commissioner on older retirees versus transitioning service members** (S‑05). Both bear directly on this bill and both are in the public record MOO‑261 was searching. |
| §4: cites § 2.2‑2682 for the Council's powers and duties | **Incomplete in a way that matters.** | It omits subsection C — "The Council shall not impose unreasonable burdens or costs in connection with requests of agencies" — which is the strongest in-statute objection to an item MOO‑261 itself expects to carry a six-figure VRS appropriation (§2.4). |
| §3: money-committee history | **Survives as history; does not function as a decision path.** | It names no committee of reference and no subcommittee, though its own closest analogue (HB 1867) died in subcommittee 8-Y 0-N. The venue is House Appropriations → **Compensation and Retirement Subcommittee** (S‑C). |
| §1.1–1.2: the bill and patron table | **Survives; its most useful implication is unused.** | MOO‑261 establishes that only three LIS-era bills contain "approximate normal cost" and names their patrons, then never asks which patrons still serve or where they sit. One of them sits on the subcommittee that will decide this bill (S‑08). |
| §4 caveat: the 2027 JLC package was not publicly available; the DVS page returns HTTP 403 | **Survives, independently reproduced.** | The DVS page still returns 403 to automated retrieval, including with a browser user-agent and full browser headers (Akamai, reference #18.9deda17.1792488673.eae1db7). MOO‑261's use of RD986 as the authoritative substitute was the right call. |
| §4: VMSDEP is the Board of Veterans Services' repeatedly identified sustainability priority | **Survives, verified at primary source.** | RD986 p.26: "We continue to advocate for the sustainability and long-term protection of the Virginia Military Survivors and Dependents Education Program (VMSDEP)." |
| §4: the Council advances "roughly five or six items a year" | **Survives, and the upstream funnel is now sourced.** | 17 initiatives discussed → 9 advanced by the Legislative Committee → five or six adopted (S‑A; RD986 p.27). The displacement cost is therefore higher than the throughput figure alone suggests. |
| §2: expect an adverse VRS statement; expect a six-figure implementation ask | **Survives. I found nothing to weaken it and did not re-verify the LIS impact statements.** | See §5. |
| §5.1: Texas (TCDRS) is an exact precedent that charges nothing | **Survives; outside my remit to re-verify.** | Not re-checked. Flagged in §5 as not independently verified. |

**On the Director's framing of question 1.** The mandate says MOO‑261 "concluded this bill fits
the Council's annual legislative package." It did not. MOO‑261 §4 concludes the opposite — "a
VRS retirement-eligibility item **does not fit** the Council's established agenda" — and says
so in bold. My review strengthens that conclusion rather than overturning it, and adds the
mechanism (S‑01), the criterion (S‑05) and the statutory objection (S‑06) that MOO‑261 was
missing. The premise in the mandate should be corrected before anyone relies on it.

---

## 4. Coalition map

### Who gains

| Actor | Type | Likely position | Reason | Conf. |
|---|---|---|---|---|
| Vested Plan 1 / Plan 2 members with 180+ days of qualifying active duty who separated **without** retirement-eligible service and are within four years of an unreduced threshold | Individual beneficiaries | **Support**, and intensely | Sole beneficiaries. Modeled at about 1,110 able-and-willing members, ~222 purchasers over FY2029–FY2038 | medium |
| Pre-2014 § 51.1-153 B 4 public-safety employees in resolution localities | Individual beneficiaries | **Support** | Retained by new B 1(iv) through the bill's most generous pathway | medium |
| Associations of the U.S. Army; Marine Corps League; Air Force Sergeants Association; VFW; AMVETS; Vietnam Veterans of America | Council member VSOs | **Lean support** | Memberships include separatees without retired pay in second public-sector careers. **No recorded position on any VRS matter** — inference from constituency only | low |

### Who is excluded, and has to be told so

| Actor | Type | Likely position | Reason | Conf. |
|---|---|---|---|---|
| Career active-component military retirees drawing retired pay | Individual; large and organised | **Opposed or indifferent; will ask why** | Barred by H 5. Virginia is among the leading states for military retirees. The exclusion is disclosed in both briefs and is a settled decision | high (effect), medium (reaction) |
| **Military Officers Association of America** | Council member VSO, **seat on the Legislative Committee** | **The pivotal vote, and not naturally favourable** | Membership expressly includes retired officers; MOAA was the most visibly active organisation at the April 2025 meeting (member seat plus a chapter legislative chair as guest). Core constituency is the barred class | high (seat and composition), low (position) |
| Veterans hired into VRS-covered employment on or after January 1, 2014 | Individual; permanent and growing | **Reads the bill as excluding them** | Hybrid participants, excluded by DECISION 2. Twelve-plus years of hiring and counting | high (effect), medium (reaction) |
| Virginia National Guard Association (**seat on the Legislative Committee**); Va. Army/Air National Guard Enlisted Association; Reserve Organization of America | Council member VSOs | **Cannot responsibly support until § 12736 is answered** | The package expressly declines to assert Reserve or Guard protection beyond ch. 1223 non-regular retired pay | high (the gap), medium (reaction) |
| Disabled American Veterans; Military Order of the Purple Heart; Paralyzed Veterans of America; Wounded Warrior Project; Hope for the Warriors (**seat on the Legislative Committee**) | Council member VSOs | **Indifferent** | Service-connected disability and survivor populations; the bill reaches only vested members in covered employment. MOO‑261's reading, which I confirm | medium |
| Student Veterans of America (**seat on the Legislative Committee**) | Council member VSO | **Indifferent, possibly adverse on displacement** | Constituency is transitioning and student veterans, the population the Commissioner named as the priority. Competes for the same slot | medium |

### Who decides

| Actor | Type | Role | What the record shows | Conf. |
|---|---|---|---|---|
| **JLC Legislative Committee** (8 members: Yarborough/AUSA chair, Aramony/American Legion, Martin/Fleet Reserve, Martinez/SVA, Down/MOAA, Marts/VNGA, McConnell/NVVA, Kelleher/Hope for the Warriors) | Council body | **First gate.** April meeting, 17 → 9 | Applies a DVS-strategic-plan test. Two of the eight seats are held by organisations whose constituency the bill excludes outright (MOAA) or leaves undetermined (Virginia National Guard Association); two more (SVA, Hope for the Warriors) are served not at all | high (composition), medium (positions) |
| Full JLC (27 VSOs) | Council | **Second gate.** June vote, 9 → 5 or 6 | Adopted lists are consistently low-cost, administrative, benefits-access, education, tax-subtraction and facility items; no pension item in the LIS-era record MOO‑261 swept | high |
| **Commissioner of DVS** (ex officio, JLC and BVS) | Agency head | Shapes the adoption test | On record preferring transitioning service members over "older retirees"; twice directed members to tie initiatives to the DVS strategic plan | high |
| **House Appropriations → Compensation and Retirement Subcommittee** (Askew chair; Hayes, Willett, Tran, Simonds, Hodges, Wyatt) | Legislative | **The decision point** | Where HB 1867 (2023) was recommended for the table 8-Y 0-N. Four meetings in the 2026 session; handled four VRS bills | high |
| Senate Finance and Appropriations | Legislative | Senate gate | Continued SB 419 to 2027, 14-Y 0-N, with a $258M adverse statement; SB 419 is live again in the same session | high (per MOO‑261's LIS retrieval) |
| **VRS Board of Trustees / VRS staff** | Agency | Produces the § 30-19.1:7 statement; the statement is often decisive | Consistent published language against enhancements not funded upfront. Expect an adverse statement and a six-figure implementation ask | high (per MOO‑261 §2) |

### Who has to carry the explanation

Three groups, and none of them has been given words:

1. **The 27 VSOs' service officers**, who will have to tell a post-2014 hire and a career
   retiree that the Council's own bill does not reach them (S‑09, S‑04).
2. **VRS member counsellors**, who must deliver the § 51.1-142.4 I 2 written pre-purchase
   statement, including the PLOP trade-off, the in-service condition, and — unresolved — the
   effect of a TSP balance (S‑19).
3. **The patron**, who will be asked in subcommittee why the General Assembly should partially
   reverse a 2015 cost-neutrality reform it adopted unanimously (MOO‑261 §1.2, open item 3),
   and how many veterans the bill leaves out (S‑17). Neither answer is drafted.

### Coalition options, with the price of each ally

| Ally to be won | What it would cost in scope | Reviewer's note |
|---|---|---|
| MOAA, and career retirees generally | An express exception to the retired-pay bar — a settled decision, and per `02` line 228 it "raises a genuine double-counting objection and a much larger fiscal number" | **Do not pay this.** S‑22 shows it is not necessary in this forum. Pay in candour instead (S‑04) |
| Guard and Reserve organisations, including a Legislative Committee seat | Nothing in scope — only a counsel answer on § 12736, obtained **before** the Council vote | **Cheapest ally available.** Buy it |
| Post-2014 hires, and SVA's indifference | A hybrid-equivalent analysis, or an explicit statement that one will follow | Costs analysis time, not scope. Settled policy is untouched |
| Student Veterans of America, Hope for the Warriors, DAV, MOPH | Nothing available — the bill cannot be made to reach their constituencies | Accept indifference; do not spend effort converting it |
| VRS staff | A funded implementation appropriation in the bill, and a delayed effective date validated against the Board's build estimate | Expensive but probably unavoidable, and it answers § 2.2‑2682 C (S‑06) |
| The subcommittee | The honest subsidy frame plus a prepared answer on 2015 c. 508 | Already the strategy; needs the missing answer drafted |

### The real fight

**Two actors and one provision.** The eight-member JLC Legislative Committee in April, where
at least three seats belong to organisations the bill excludes or leaves undetermined and where
the adoption test is alignment with a DVS strategic plan this bill does not touch; and the
seven-member House Appropriations Compensation and Retirement Subcommittee, where the
provision at issue is the approximate-normal-cost price in subsection D — because the whole
case is that it is the actuarially correct price for a credit that produces no accrual, and
that claim is still unsupported.

### The silent beneficiary

The ~1,110 modeled able-and-willing members are unorganised and will not appear. Nobody will
testify for this bill except the VSO that sponsors it. Do not read the absence of opposition
from beneficiaries as support; read it as absence.

---

## 5. What I could not source — stated as unsourced, not inferred

1. **The JLC's adopted 2027 package, and whether the Council will carry a pension item at all.**
   Not publicly available. The DVS JLCVSO page returns HTTP 403 to automated retrieval,
   reproduced today with full browser headers (Akamai reference #18.9deda17.1792488673.eae1db7).
   MOO‑261's caveat stands unchanged. **Resolved by:** the 2026 Legislative Committee and
   full-Council minutes, which should be on Commonwealth Calendar in the same series as S‑A.
2. **The numbered JLC 2026 initiative list.** Search results report six items numbered
   JLC 2026‑01 through 2026‑06, with VMSDEP as 2026‑01. **I could not retrieve this from any
   primary source.** RD986 p.27 — the authoritative document MOO‑261 used and I verified —
   lists **five** 2025–2026 priority proposals and does **not** include VMSDEP among them,
   though p.26 confirms VMSDEP as the Board of Veterans Services' advocacy priority. I cannot
   reconcile the two lists and am not asserting either count. The S‑22 observation about the
   $40,000-cap item depends on this and is flagged there as an observation.
3. **MOO-261's LIS retrievals — I did not independently re-verify any of them.** The LIS API
   host (`lisva.azurewebsites.net`) is unreachable from this environment; the legacy LIS
   endpoint returns "document does not exist" for 2026-session bills. Specifically **not**
   re-verified: the 107-bill sweep, HB 1890 / c. 508 and its vote tallies, the six failed
   military-purchase bills, the HB 1867 subcommittee vote, SB 419's $258M figure and its
   2027 status, the 2026 c. 563 identification, and the Simonds bill patronage underlying
   S‑08. I found nothing contradicting any of them and the internal scan documents its method;
   they are relied on, not confirmed.
4. **Positions of Council member organisations on VRS or pension matters.** None found, for any
   of the 27. MOO‑261 reported the same. Every position attributed to a VSO in §4 above is
   inferred from constituency and labelled low or medium accordingly. **Resolved by:** nothing
   in the public record — only the Council's own minutes once the item is actually presented.
5. **Virginia's military retiree count.** Search results report Virginia as third in the nation
   for military retirement pay and retiree numbers, with $5.99B in DoD retiree pay in FFY23,
   attributed to the DoD Office of the Actuary. **I could not confirm this in a primary
   source** — it is not in RD986, and I did not retrieve the state table from the Statistical
   Report on the Military Retirement System. The S‑17 wording says "among the leading states,"
   which is the most I can support. **Resolved by:** the DoD Office of the Actuary state table.
6. **MOAA's membership composition.** MOAA's eligibility — "active duty, former, retired, and
   National Guard and Reserve commissioned and warrant officers" — was obtained as a search
   snippet of MOAA's own membership page, not by direct retrieval; the Virginia Council of
   Chapters site returned a connection reset. The *share* of MOAA's Virginia membership drawing
   retired pay is not published anywhere I found. S‑04 rests on the eligibility definition and
   on MOAA's documented presence at the April 2025 meeting, both of which hold without it.
7. **The current composition of the JLC Legislative Committee.** My roster is the attendance
   list of the **April 23, 2025** meeting (S‑A); the full JLC membership roster is as of
   **December 1, 2025** (S‑B p.74). **They do not fully agree** — the Fleet Reserve
   Association holds a Legislative Committee seat in the April 2025 minutes but does not
   appear in the December 2025 JLC roster. Committee seats evidently turn over. Every seat
   count in §4 is therefore as of April 2025 and must be re-checked before anyone plans
   around it. **Resolved by:** the 2026 Legislative Committee minutes.
8. **Whether the 2026 JLC cycle followed the 2025 calendar.** S‑01 — the BLOCKER — infers the
   April/June gates for the 2027 package from the single cycle documented in S‑A, corroborated
   by RD986's description of the annual rhythm. Confidence **medium**, and the finding's
   severity depends on it. **Resolved by:** the 2026 Legislative Committee minutes. This is the
   first thing to check.
9. **Texas, Kentucky and FERS comparatives (MOO‑261 §5).** Outside my remit; not re-verified.
10. **Tested and rejected — do not use.** I checked whether Virginia's own veterans' preference
   statute excludes senior military retirees, which would have been a useful in-Virginia
   precedent for the retired-pay bar. **It does not.** § 2.2‑2903 defines "veteran" by
   honourable discharge plus 180 consecutive days of active duty or a service-connected
   disability rating, and contains no rank-based or retired-pay-based exclusion. The "major,
   lieutenant commander or above" rule is **federal** (5 U.S.C. § 2108), not Virginia. No
   package document should cite a Virginia analogue here.
11. **Session-length arithmetic for 2027.** Va. Const. art. IV, § 6 limits an odd-year regular
    session to 30 days, extendable by two-thirds of each house by up to 30 more; the customary
    odd-year total is 46 days. I relied on secondary summaries of the Constitution rather than
    retrieving art. IV, § 6 directly, and I did not retrieve the 2027 procedural resolution or
    its filing deadlines. The timing conclusions in §6 that depend on exact dates are labelled
    accordingly.

**Nothing in this review invents a Code section, a committee action, a bill number or a
Council position.** Where a claim could not be sourced it is in this section.

---

## 6. The seven questions, answered directly

**1. JLCVSO package fit.** MOO‑261's conclusion — that a VRS pension item does not fit the
Council's agenda — survives and is now documented rather than inferred: the adoption test is
alignment with the DVS strategic plan, and this item has no DVS hook (S‑05). It displaces
something: the Committee advances 9 of ~17 in April and the Council adopts 5 or 6 in June
(S‑01), so a pension bill with an agency appropriation competes against items the Council
wants more and against § 2.2‑2682 C (S‑06). Not served inside the coalition: career retirees,
every post-2014 hire, the disability and survivor organisations, and the student-veteran
organisation — four of the eight Legislative Committee seats, on my reading.

**2. Closed and shrinking, both ways.** Correct, and the briefs currently use it in only one
direction. The excluded constituency is the entire post-January-1-2014 cohort and it grows
annually. Nobody has been given words for a 2026-hire veteran; S‑09 supplies them.

**3. The retired-pay bar.** Sustainable in front of this Council — and the evidence is the
Council's own minutes, where the Legislative Committee advanced a $1,500 veterans tax credit
that "would exclude retired Virginia veterans" (S‑22). What is **not** currently handled is
that the Council's and the Board's own leadership are substantially the excluded class
(S‑04). Change the register, not the policy.

**4. The subsidy framing.** Candour is the right play and I would not change it. But its stated
premise is wrong: § 30‑19.1:7 obliges the Board to prepare and submit on the session's
scheduling resolution, and contains no bar on committee consideration and no precondition to
introduction (S‑18). The strategy is justified by certainty, not by compulsion, and the briefs
should say so.

**5. VRS Board and agency posture.** MOO‑261 §2 is sound and I found nothing to weaken it. On
where the objection lands first: separate accounting. A credit that must be tracked in its own
bucket, counted in two eligibility tests and excluded from everything else is nearer SB 419's
$374,500 build than HB 1867's $78,000 one, and it confers eligibility without accrual — so VRS
staff have no accrual to price the approximate normal cost against. **The first institutional
objection will be that the bill prices the credit with an instrument calibrated to a benefit
the credit does not provide**, which is MOO‑261 open item 2 and the Texas divergence in its
§5.1. That is the provision the whole case rests on (§4, The real fight).

**6. The explorer.** Yes, a reader can reach a screen that makes the bill look better than
free, in **two moves** on controls that are both visible without opening the Advanced panel,
and the sign flips past the governing assumption's own documented high bound with nothing
marking the boundary — **MOO‑265 F-9 owns that**, and fixes the break-even at φ ≈ 0.838. What
is mine is the consequence for the brief: `04` §4's flat "No sensitivity makes this a saving"
is falsifiable in two clicks on the brief's own companion tool (S‑02). One click of
"Conservative" cuts the headline 87% (S‑11).
φ is labelled unusually well on screen and in the handout, and poorly in the CSV (S‑12). One
badge overstates — "Estimated veterans," which is published for one plan of three and assumed
for the two that carry three quarters of the payroll (S‑16) — and no badge reaches any output
figure at all (S‑15). The exports are **better** than the mandate feared: neither 0.19 nor
$341,065 appears in them and both carry the full qualifier (S‑20); the bare uses are in the
registry panel instead, where they are worse, because that panel's job is provenance (S‑03).
*No Workforce Savings* does its job (S‑21).

**7. Patron and timing.** Patron: prefer a member of the Compensation and Retirement
Subcommittee; the record points at Simonds (S‑08). Committee: House Appropriations →
Compensation and Retirement Subcommittee; Senate Finance and Appropriations (S‑07). Calendar:
**the 2027 Council slot closed in June 2026** (S‑01), so a Council-sponsored bill is a 2028
item. On the premise the Director offered — *if nothing can be introduced until the Board
statement exists, say so in those words* — **that is not the constraint, and I will not say
it.** The Board statement is not a precondition to introduction (S‑18). The binding
constraints are the Council's own June gate, and, if the 2027 session is attempted on a
patron's own initiative without Council sponsorship, a 30-day odd-year session (extendable to
about 46 days) immediately preceding the November 2, 2027 election of all 100 House and all 40
Senate seats — the worst available session in which to ask seven subcommittee members to
record support for an openly-labelled subsidy.

One favourable timing fact the package does not use: a July 1, 2028 effective date puts the
first cost in FY2029, in a biennium budgeted in the 2028 session. A 2027 or 2028 enactment
carries **no cost in the current biennium**, which is a real argument to a money committee and
is nowhere in the briefs.

---

## 7. Routed elsewhere, not decided here

**To MOO-264 (Red Team / Counsel Reviewer):**

- **S-19.** Whether a Blended Retirement System TSP balance is "a balance in a defined
  contribution account that serves as a primary retirement account related to such service"
  under subdivision H 5. Unaddressed anywhere in the package.
- The § 12736 question in S-10 is already open as COUNSEL 3; my addition is that it should be
  answered **before** the Council vote, not before introduction, because a Legislative
  Committee member's own constituency depends on it.

**To MOO-265 (explorer review), landed as commit `9efaab3` while this review was in
progress.** Everything computational is theirs. Handed over as framing findings with a code
component:

- **S-14** — Panel D item 1's static sign assertion ("−$859,000 … a cost to the plan").
- **S-12, S-13** — `buildCsv` additions. Note MOO‑265 **C-5** already flags a different CSV
  Sensitivity-block defect; these are additive, not the same row.
- **S-15, S-16** — badge coverage, and the Panel G step 3 provenance class.
- **S-02's** control fix is MOO‑265 **F-9** and is theirs, not mine; I keep only the brief-text
  consequence. **S-03** depends on MOO‑265 **F-3** being fixed first.

**On scope, stated plainly so the two reviews are not read as disagreeing.** I tested the
explorer as a document driven in front of people who cannot audit it. Within that scope I hit
**no console error** across the full drive (six presets, five hand-driven slider stops, two
export captures, a 21-point φ sweep), and every figure I checked reconciled to the engine.
That is **not** a clean bill of computational health, and should not be read as one: I did not
audit the engine, did not test the print stylesheet, and did not re-derive any figure by hand.
MOO‑265 did all three and found four blockers I would not have found, including a $23.7M
payroll figure displayed above a statement that it is zero, and a printed dashboard that
carries no disclaimer at all. **Where the two reviews touch the same control, MOO‑265 is the
authority.**

**To the Policy Director, as decisions not findings:**

- Whether to seek the 2028 Council cycle or a 2027 patron-only introduction (S-01).
- Whether to commission the hybrid-equivalent analysis S-09 would otherwise promise.
- Whether to take the Chairman's-letter route in S-23 as the primary path rather than the
  fallback. On the evidence I have, it is the strongest available play: it converts the
  package's three open items into an agency request inside one Council cycle, costs no
  legislative slot, and arrives at April 2027 with a record instead of an ask.

---

## 8. Source table

| ID | Source | URL | Retrieved |
|---|---|---|---|
| S-A | Joint Leadership Council of Veterans Service Organizations, **DRAFT Meeting Minutes, April 23, 2025** (Legislative Committee) — attendance, 17→9 initiative funnel, DVS strategic-plan criterion, Commissioner's remarks, nine advanced initiatives, six Chairman's letters | https://commonwealthcalendar.virginia.gov/File/Index/76109 | 2026-10-20 |
| S-B | Virginia Department of Veterans Services, **Commissioner's 2025 Annual Report (RD986)** — p.26 (Board of Veterans Services, VMSDEP), p.27 (JLC, five 2025–2026 priorities, Day on the Hill January 15, 2026), p.72 (BVS membership as of 12/1/2025), p.73 (Appendix J, § 2.2-2682 in full), p.74 (JLC membership as of 12/1/2025) | https://rga.lis.virginia.gov/Published/2025/RD986/PDF | 2026-10-20 |
| S-C | Virginia House Appropriations Committee, **Compensation and Retirement Subcommittee** — jurisdiction, chair, membership, 2026 meeting dates and VRS bills | https://hac.virginia.gov/committee-information/compensation-and-retirement-subcommittee/ | 2026-10-20 |
| S-D | Virginia House of Delegates, member page — Shelly A. Simonds, 70th District | https://house.vga.virginia.gov/members/H0323 | 2026-10-20 |
| S-E | Code of Virginia **§ 30-19.1:7**, operative text quoted in full in S-18 | https://law.lis.virginia.gov/vacode/title30/chapter1/section30-19.1:7/ | 2026-10-20 |
| S-F | MOAA membership eligibility (search-snippet retrieval of MOAA's own membership information; see §5 item 6) | https://www.moaa.org/uploadedfiles/2020-membership-information.pdf | 2026-10-20 |
| S-G | Code of Virginia **§ 2.2-2903** — veterans' preference; no rank or retired-pay exclusion (§5 item 10) | https://law.lis.virginia.gov/vacode/title2.2/chapter29/section2.2-2903/ | 2026-10-20 |
| S-H | Virginia State Senate elections, 2027 — all 40 seats, November 2, 2027 | https://ballotpedia.org/Virginia_State_Senate_elections,_2027 | 2026-10-20 |
| S-I | 2027 Virginia House of Delegates election — all 100 seats, November 2, 2027 | https://en.wikipedia.org/wiki/2027_Virginia_House_of_Delegates_election | 2026-10-20 |
| S-J | Constitution of Virginia, art. IV, § 6 — odd-year session length (secondary summary; see §5 item 11) | https://publications.virginiageneralassembly.gov/download_publication/86 | 2026-10-20 |
| S-K | **Own hostile-driving log** of `explorer/dist/explorer-standalone.html` — six presets, five hand-driven stops, handout and CSV captures, badge enumeration, registry dump, 21-point φ sweep. Probes committed at `explorer/test/hostile-drive.js` and `explorer/test/phi-sweep.js` | `explorer/test/hostile-drive-log.txt` | 2026-10-20 |
| S-L | DVS JLCVSO program page — **inaccessible**, HTTP 403 to automated retrieval including with full browser headers (Akamai reference #18.9deda17.1792488673.eae1db7) | https://www.dvs.virginia.gov/about-us/boards-foundations/joint-leadership-council-of-veterans-service-organizations | 2026-10-20 (403) |
| S-M | LIS public web service — **unreachable** from this environment (`lisva.azurewebsites.net`, connection failure); legacy LIS returns no document for 2026-session bills. MOO-261's LIS findings are relied on, not re-verified | https://lis.virginia.gov/ | 2026-10-20 (unreachable) |

---

## 9. Reviewer's note on the mandate

The Director wrote that a clean review would be read as a mandate that was too deferential. It
is not clean. The two blockers are that the package's stated session is unreachable by the
route the package is built for, and that the tool shipped alongside it can be driven to refute
the package's own central sentence. Both are mechanical, both are fixable, and neither touches
a settled policy decision.

The finding the Director most expected — that excluding career military retirees is
unsustainable — is the one I came back on least. The Council has already done the same thing
on the record, in the same room, within eighteen months. What the package is missing there is
not an exception to the bar; it is one honest sentence acknowledging who is being asked to
carry a bill they cannot use.

**Prepared by Policy Development Team using legal, policy, and financial analysis tools,
pending review by veterans' legal counsel.**
