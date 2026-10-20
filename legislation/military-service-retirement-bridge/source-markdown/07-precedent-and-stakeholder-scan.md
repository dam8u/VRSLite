# Precedent and Stakeholder Scan — Military Service Retirement Bridge

**Task:** MOO-261 (dependency of MOO-257)
**Prepared by Policy Development Team using legal, policy, and financial analysis tools, pending review by veterans' legal counsel.**
**All sources retrieved October 19, 2026.** · **Package version:** 1.4 — Independent-Review Integration (October 20, 2026)

## Method and retrieval note

The three unverified claims in the MOO-257 briefs were tested against the Legislative
Information System rather than against secondary summaries. LIS renders its Code and
bill pages client-side, so the underlying public LIS web service was queried directly
(`AdvancedLegislationSearch`, `LegislationEvent`) using the LIS web application's own
public client key, and bill/chapter text and impact statements were retrieved as PDFs
from the LIS document store and the legacy LIS endpoint.

**Coverage:** all 59 LIS sessions from 1994 through the open 2027 session were swept.
Empty results were confirmed to be HTTP 204 (no matching legislation) rather than query
failures, so the negative findings below are genuine negatives over the full LIS era,
not search artifacts. § 51.1-142.2 was enacted in 2001, so the 1994–2000 sessions have
no possible hits.

**Correction to the MOO-257 source appendix.** The two documents cited in the appendix
as the "VRS 2025 / 2026 General Assembly Session summaries"
(`lis.blob.core.windows.net/files/1020775.PDF` and `.../1098992.PDF`) are **not** session
summaries. Each is a single-bill VRS fiscal impact statement under § 30-19.1:7 —
1020775 is **SB 1396 (2025)** (animal control officers) and 1098992 is **SB 419 (2026)**
(SPORS/VaLORS weighted service). The appendix should be corrected before anything goes
to a legislator. Both documents are, however, highly useful for VRS posture (§ 2 below).

---

## 1. Precedent check

### 1.1 Every bill citing § 51.1-142.2, 1994–2027

107 bills across 25 sessions cite § 51.1-142.2. Of those, the military-service-related
bills are:

| Session | Bill | Patron | Disposition | Substance |
|---|---|---|---|---|
| 2001 | HB 2293 | Cox | **Ch. 697** | Created the purchase-window structure; allowed military purchase even when creditable to another system where federal law requires; 3-year window at 5% of compensation |
| 2001 | SB 1077 | K.G. Miller | **Ch. 686** | Companion to HB 2293 |
| 2003 | HB 1717 | Cox | **Ch. 7** | Conformed free armed-forces credit to federal law (reenlistments) |
| 2004 | HB 111 | Van Landingham | **Failed** — tabled in House Appropriations 25-Y 0-N | Purchase for prior service as a DoDEA substitute teacher |
| 2004 | SB 476 | Ticer | **Failed** — no action taken by Senate Finance | Companion to HB 111 |
| 2005 | HB 1920 | Cox | **Ch. 292** | Pricing mechanics for 5%-of-compensation purchases |
| 2006 | HB 103 | Lewis | **Failed** — left in House Appropriations | Add National Guard; remove the active-duty requirement |
| 2007 | HB 1870 | Lewis | **Failed** — left in House Appropriations | Refiling of HB 103 |
| 2008 | HB 738 | Caputo | **Failed** — left in House Appropriations | Purchase up to 4 years for a *spouse's* active duty service |
| 2009 | HB 2128 | Cox | **Ch. 362** | HEART Act conformity for members disabled or killed in action |
| 2015 | HB 1890 | Jones | **Ch. 508** | **Created the current 24-month approximate-normal-cost window** (see 1.2) |
| 2023 | HB 1867 | P.A. Scott | **Failed** — subcommittee recommended laying on the table 8-Y 0-N; left in Appropriations | Grant teachers up to 4 years of prior active duty military service **at no cost** |
| 2024 | HB 70 | Bulova | **Ch. 267** | Broadened qualifying service to any federally established branch |
| 2024 | SB 458 | Marsden | **Ch. 353** | Companion to HB 70 |
| 2026 | HB 139 | Simonds | **Ch. 563** | Employee-association unpaid educational leave; purchase of service credit — **not military** |

**The 2026 amendment flagged in the MOO-257 appendix is resolved.** 2026 c. 563 is
HB 139 (Simonds), which concerns school-board employee-association officers on unpaid
educational leave. It is unrelated to military service and does not disturb the
subdivision B 2 / B 3 structure the draft bill builds on. Its 2025 predecessor,
HB 1830 (Simonds), passed and was **vetoed by the Governor**.

### 1.2 The 24-month window has been narrowed once, never extended

Only **three bills in LIS history** contain the phrase "approximate normal cost":
HB 1890 (2015), HB 1830 (2025), and HB 139 (2026). The latter two are the
employee-association leave bills.

**2015 HB 1890 (Jones), Chapter 508** is therefore the single governing precedent. Its
chaptered text shows it struck the pre-2015 regime — a one-year window for some members
and a **three-year** window for others, priced at 5% of creditable or average final
compensation — and replaced it with the uniform rule now in subdivision B 3: approximate
normal cost if purchased or contracted within "the first 24 months of the member's active
service following his first date of hire," actuarial equivalent cost thereafter, with
inactive periods excluded. Effective date was delayed to January 1, 2017.

The stated legislative purpose is adverse to the MOO-257 proposal. The LIS summary reads:

> "Makes numerous changes to the purchase of service credit program to simplify it and
> make it **more cost-neutral to the Retirement System fund** and more in line with other
> states' programs."

HB 1890 passed House Appropriations 22-Y 0-N, Senate Finance 14-Y 0-N, and both
conference reports unanimously (House 96-Y, Senate 37-Y).

**Consequence for the draft:** reopening approximate-normal-cost pricing after the
24-month window partially reverses a 2015 reform that the General Assembly adopted
unanimously for the express purpose of cost-neutrality. The brief must anticipate that
framing. No bill has ever proposed extending or reopening the window.

### 1.3 No Virginia bill has ever proposed an eligibility-only service credit

Two independent tests:

- **293 bills** cite § 51.1-153 (the unreduced-retirement eligibility section) across 35
  sessions. Exactly **one** touches military anything — HB 262 (1998), a health insurance
  credit and SPORS supplement bill — and it does not create a military eligibility credit.
  **No bill in the LIS era has ever proposed that military service count toward the
  § 51.1-153 B 2 or B 3 tests.**
- Sweeps for eligibility-only drafting formulas returned nothing: "solely for purposes of
  determining eligibility" — 0 bills; "for purposes of determining eligibility for
  retirement" — 0 bills. The one bill matching "shall not be considered creditable
  service," HB 2251 (2017), is an optional defined contribution plan bill and is not a
  limited-purpose credit.

**The novelty claim in the briefs is supported and can now be stated with a basis.**
Recommended phrasing: *no bill introduced in the Virginia General Assembly from 1994
through the 2027 prefiling period has proposed a limited-purpose or eligibility-only
service credit under Title 51.1, and none has proposed extending the approximate-normal-cost
window in § 51.1-142.2 B 3.* The only in-Code analogue remains § 51.1-303 B (already
captured as S-35).

### 1.4 Nothing comparable is pending for 2027

As of October 19, 2026, the open 2027 session contains **no** prefiled bill citing
§ 51.1-142.2. The field is clear for introduction.

---

## 2. VRS Board and staff posture

VRS does not editorialize in § 30-19.1:7 statements, but its fiscal language is
consistent and quotable. Expect an adverse statement.

### 2.1 On benefit enhancements that create unfunded liability

From the **SB 419 (2026)** impact statement (the SPORS/VaLORS weighted-service bill):

> "Due to the relatively low funded status of these plans, it would be **prudent from a
> fiduciary standpoint to only enhance benefits if they can be funded upfront to avoid
> creating additional unfunded liabilities**."

> "**Enhancing member benefits without an immediate cash infusion to offset the increase
> in liability is not an actuarially sound method of funding benefit plans.**"

VRS also flagged behavioral gaming — that recent retirees might return to work briefly
and re-retire to capture the new credit, which "would add additional unfunded liabilities."

### 2.2 On member-purchase expansions — the closest analogue

The **HB 1867 (2023)** impact statement is the most directly relevant document found. It
addressed granting teachers up to four years of prior active duty military service.
VRS stated:

> "Benefit(s) impacted: **Eligibility for retirement.**"

> "each person who purchases up to 48 months of active military service would create an
> unfunded liability that **ranges from $10,000 – $60,000** depending on the age and
> service and compensation of the member."

> "if 1,500 members (1% of the Teacher population) had this type of service, and the
> average cost was $35,000, the **total cost to the fund could be $50 million**. The
> current unfunded liability of the Teacher Plan is $11.8 billion."

> "Granting of service in a pooled plan will effectively **spread the cost of each period
> of granted service over all of the employers** in the Teacher plan."

**Two cautions on using the $10,000–$60,000 figure.** First, it measures the liability of
a **no-cost grant** — HB 1867 charged the member nothing. The MOO-257 proposal charges
approximate normal cost, so the relevant exposure is the *shortfall between approximate
normal cost and actuarial equivalent cost*, which is smaller and not derivable from this
statement. Second, it is a 2023 figure on the Teacher plan. It is a useful published
anchor and a reasonable upper bound per member, and it should be cited as such and
nothing more. It does **not** close memo item ACTUARY 1.

VRS also confirmed in that statement that ordinary purchased prior service flows through
to the collateral benefits the MOO-257 draft tries to wall off:

> "Prior service credit counts toward **vesting, eligibility for retirement and
> eligibility for the health insurance credit**, if offered by the employer."

This is affirmative support for the draft's carve-out design — VRS's own description
confirms that absent an express limitation, purchased service would reach the HIC
threshold in § 51.1-1400 et seq. It also means VRS will read any new purchase right
against that default.

### 2.3 On prospective versus retroactive application

From **SB 1396 (2025)**:

> "**Prospective application of the provisions will avoid adding unfunded liabilities**,
> but the average normal cost rate ... associated with hazardous duty members is
> approximately 15% of covered payroll higher than general employees."

And on the funding-policy gate for local plans:

> "The VRS funding policy requires political subdivision employer plans to be at least
> **75% funded** in order to elect benefit enhancements or the political subdivisions must
> make a lump sum contribution to bring the funded status to at least 75% funded."

The MOO-257 draft is prospective in effect but prices access to *past* military service,
so expect VRS to treat it as liability-creating rather than prospective.

### 2.4 On tracking service separately from creditable service

No VRS Board statement was located that addresses separate accounting as a policy matter.
The available evidence is implementation cost, and it is material: VRS priced SB 419's
system changes at **approximately $374,500 in FY 2027**, attributing them to changes
"that would need to be made to accurately reflect the inclusion of the additional service
provided for in the bill," and priced HB 1867's much simpler change at **$78,000**.

A credit that must be tracked in a separate bucket, counted in two eligibility tests and
excluded from every other calculation is closer to SB 419 than to HB 1867 in complexity.
**Treat a six-figure VRS implementation appropriation as the expected ask**, and expect
VRS to say the July 1, 2028 effective date is the binding constraint. This remains an
open question for VRS staff (memo item on administrative lead time is not resolved).

---

## 3. Money committee history

The pattern is sharp and consistent, and it is the single most important finding for
sponsor strategy.

**Every military-service-purchase expansion that would add cost has died in committee
without a floor vote:**

- HB 103 (2006) — left in House Appropriations
- HB 1870 (2007) — left in House Appropriations
- HB 738 (2008) — left in House Appropriations
- HB 111 (2004) — tabled in House Appropriations, 25-Y 0-N
- SB 476 (2004) — no action taken by Senate Finance
- HB 1867 (2023) — subcommittee recommended laying on the table, 8-Y 0-N; left in Appropriations

**Every § 51.1-142.2 military bill that passed was cost-neutral or cost-reducing, and
passed overwhelmingly:**

- HB 1890 (2015), the cost-neutralizing reform — App. 22-Y 0-N, Finance 14-Y 0-N
- HB 70 / SB 458 (2024), broadening qualifying branches — App. 22-Y 0-N, SFA 15-Y 0-N
- HB 1717 (2003), HB 2128 (2009), federal-conformity — enacted

**On unfunded liability specifically:** SB 419 (2026), carrying a VRS statement of
roughly **$258 million** in added liability and about **$30.4 million per year** in
employer contributions, was **continued to 2027 by Senate Finance and Appropriations,
14-Y 0-N** — parked rather than killed, but not advanced. It is **live again in the 2027
session as SB 419 (Craig), currently in committee.**

**Offsetting appropriation.** No instance was found of a money committee advancing a VRS
benefit enhancement with unfunded liability *and* requiring a stated offsetting
appropriation as the price of passage; in the sample examined the committees simply
declined to advance such bills. VRS's own position (§ 2.1) is that enhancements should be
funded upfront. The practical implication is the same either way: **a sponsor should
expect to need either a funding offset or a demonstration that the proposal creates no
new unfunded liability.** Confirming whether any offset precedent exists would require a
budget-bill item review that was outside this task's scope — flagged below.

**Strategic reading.** The draft's best available posture is not "this is a modest
enhancement" but "this is priced." The entire argument has to be that approximate normal
cost for an eligibility-only credit is the actuarially correct price. That claim is
currently unsupported and depends on memo item ACTUARY 1. Until VRS or an actuary
confirms it, the bill will read to House Appropriations exactly like the six bills above.

**Competing-bill risk.** SB 419 is pending in the same committee that would hear this
bill, is sponsored by a sitting senator, and already carries a $258M adverse statement.
A second VRS benefit-enhancement bill in the 2027 session invites comparison on cost.

---

## 4. JLCVSO fit

**Statutory basis and composition.** The Council operates under Va. Code § 2.2-2681
et seq.; its powers and duties are in § 2.2-2682. It comprises 27 gubernatorial
appointees representing veterans service organizations, and it prepares an annual list
of legislative proposals distributed to all General Assembly members.

**§ 2.2-2682 C — the fit objection in the statute, quoted (added October 20, 2026;
stakeholder review finding S-06).** This scan originally cited § 2.2-2682 for the
Council's powers and duties without quoting subsection C, which is where the objection
lives. Reproduced in RD986 Appendix J (p.73):

> "C. The Council may apply for funds from the Veterans Services Foundation to enable it
> to better carry out its objectives. **The Council shall not impose unreasonable burdens
> or costs in connection with requests of agencies.**"

Read against §2.4 of this scan — which expects a **six-figure VRS implementation
appropriation**, on the analogue of SB 419's $374,500 FY2027 system-change estimate —
an opponent on the eight-member Legislative Committee has a clean statutory line: the
Council is directed by statute not to impose unreasonable costs on agencies, and this
item asks the Council to impose a six-figure build on VRS for a credit VRS gains nothing
from administering. **Subsection A does not soften it.** It authorises advice on "methods
of providing support for ongoing veterans services and programs," recommendations on
issues that "may potentially impact veterans," and promotion of "new efficient and
effective **administrative** initiatives that enhance existing veterans' services and
programs." A defined-benefit pension amendment is a poor fit for every one of those
verbs. **This is the strongest available version of the fit objection in §4, and it is in
the statute this scan already cited.** The answer to give, and the Chairman's-letter
fallback if the Council will not carry an agency-cost item, are at
`13-council-engagement-answers.docx` §3.

**The Council's current adopted agenda contains no retirement or pension item.** Per the
DVS Commissioner's 2025 Annual Report (RD986), the JLC's priority proposals for the
2025–2026 legislative session are:

1. Prohibit nonaccredited companies from exploiting veterans seeking to obtain or modify benefit claims
2. Ensure access to Vital Record death certificates for the DVS Suicide Prevention Program
3. Allocate funds for a book stipend for veterans attending Virginia colleges and universities
4. Exempt VSOs from use-of-gaming-proceeds requirements
5. Include USPHS and NOAA Commissioned Corps in state income tax subtraction provisions

The 2025 session priorities were in the same families — Women Veterans Day, veteran
verification in jails and prisons, National Guard State Tuition Assistance upfront
payment, and Suffolk State Veterans Cemetery funding. Searching the entire RD986 report
for "retirement" returns three hits, none of which concerns a pension benefit.

**Answer to the question posed: a VRS retirement-eligibility item does not fit the
Council's established agenda.** The JLC's demonstrated legislative profile is benefits
access, education, consumer protection, recognition, tax subtraction, and cemetery and
facility funding. Every adopted item is low-cost, administrative, or modest-appropriation.
None asks the General Assembly to change a defined benefit pension plan, and none has
required a § 30-19.1:7 impact statement.

This is not a reason to abandon the proposal, but it changes the sequencing. The item
would be **new territory for the Council**, which means it needs an internal champion
before it needs a patron.

**Likely champions.** Among the member organizations listed as of December 1, 2025, the
ones whose constituencies are concentrated in career public employees with prior enlisted
or officer active duty service are the natural sponsors: the **Military Officers
Association of America** (John Down), the **Association of the U.S. Army** (Glenn
Yarborough), the **Marine Corps League** (Timothy Taylor), the **Air Force Sergeants
Association** (Richard Mansfield), and the **American Legion** (William Aramony, who is
also JLC Chair and sits ex officio on the Board of Veterans Services). AFSA and MCL
membership skews toward enlisted retirees and separatees who are most likely to be
mid-career Virginia public employees with four years of purchasable service.

**Likely resistance.** No member organization has a recorded position on VRS matters, so
this is inference and is labeled as such. The predictable internal objection is
**agenda crowding**: the Council advances roughly five or six items a year, and a bill
carrying a VRS impact statement and a probable appropriation would consume
disproportionate political capital against VMSDEP, which the Board of Veterans Services
has repeatedly identified as its sustainability priority. Organizations focused on
service-connected disability and survivor populations — Disabled American Veterans,
Military Order of the Purple Heart — would see little member benefit, since the proposal
reaches only vested VRS members in covered employment.

**Caveat.** The JLC's adopted **2027** package was not publicly available at the
retrieval date. The 2026 initiative list was corroborated in search results but the DVS
page hosting it returns HTTP 403 to automated retrieval (Akamai bot block), so the
authoritative source used here is RD986. The 2027 package should be confirmed directly
with DVS or the Council before the brief asserts anything about fit.

---

## 4A. Venue and patron — the follow-up this scan did not do

*Added October 20, 2026. Stakeholder review findings **S-07** and **S-08** established that
this scan assembled the right table in §1.1 and §1.2 and never crossed it against current
committee membership. That is done here. The full shortlist with qualifications, and the
disciplines that go with it, are at `13-council-engagement-answers.docx` §4.*

**The decision point is a subcommittee, and this scan's own closest analogue died in one.**
In the House the bill goes to the **Committee on Appropriations** and from there to its
**Compensation and Retirement Subcommittee**, whose stated remit is "State Employee
Compensation Retirement Worker's Compensation State Health Insurance Plan" and which
"advise[s] the Committee on matters related to public employee compensation, benefits and
retirement." As of the 2026 session: chair **Alex Askew (95th)**; members Askew, C. E. Cliff
Hayes (91st), Rodney Willett (58th), Kathy Tran (18th), Shelly Simonds (70th), M. Keith
Hodges (68th), Scott Wyatt (60th). It met four times in the 2026 session and handled HB 204,
HB 205, HB 987 and HB 1107, all VRS bills. **HB 1867 (2023)** — the closest analogue in §3 of
this scan — was recommended for the table there **8-Y 0-N** without a recorded floor vote. In
the Senate the bill goes to **Finance and Appropriations**, which continued SB 419 to 2027 by
14-Y 0-N and will hear SB 419 again.

**Crossing §1.1 and §1.2 against that roster produces one name.** Only three bills in LIS
history contain the phrase "approximate normal cost" (§1.2), the pricing mechanism this bill
reopens. Two of the three — **HB 1830 (2025)**, which passed and was vetoed, and **HB 139
(2026)**, Chapter 563 — were patroned by **Delegate Shelly Simonds (70th, Newport News)**, who
**sits on the Compensation and Retirement Subcommittee**. Her district covers Newport News,
with Newport News Shipbuilding, and Fort Eustis and Langley nearby. She is, on the record this
scan itself assembled, the only sitting legislator with both the pricing-mechanism history and
a seat at the decision point.

**Three qualifications, none of them optional.** (i) A patron whose prior
approximate-normal-cost bill was **vetoed** is not an unalloyed asset, and HB 139's subject
(employee-association educational leave) is unrelated to veterans — the relevance is to the
mechanism and the venue, not the policy. (ii) The patronage facts rest on **this scan's own
direct LIS retrieval**, which the independent stakeholder reviewer could not re-verify;
confirm both bills in LIS before the name is used in a conversation. (iii) The roster above is
the **2026 session**, and the bill is drafted for 2028 — **re-confirm committee assignments
before anyone is approached.** No one has been contacted, and the approach is the Policy
Director's to make or decline.

---

## 5. Comparative scan

### 5.1 Texas — an exact precedent

**Texas County and District Retirement System (TCDRS)** grants military service credit
for retirement eligibility only. This is a direct, current, citable match to the MOO-257
concept.

**34 Tex. Admin. Code § 105.3(a)(1)** (amended effective January 8, 2026, 51 TexReg 158):

> "The term 'credited service' means membership service **for determining retirement
> eligibility only**. Member contributions and monetary credits are **not required or
> permitted** with respect to credited service for qualified military service."

The enabling statute, **Tex. Gov't Code § 843.502(c)**, gates it the same way the MOO-257
draft does:

> "A member eligible to establish credited service under this subsection is one who is
> **vested**, based on credited service only in this system and **without regard to
> service that may be established under this subsection**, in a service retirement
> annuity that may begin at the age of 60."

The cap is 60 months (§ 105.3(b)); MOO-257 proposes 48. The structural parallels are
close: a vested-member gate, the purchased service expressly excluded from the test that
qualifies the member to use it, a months-for-months ratio, and a hard cap.

**One divergence matters a great deal.** Texas makes the credit **free** and affirmatively
forbids contributions for it — because the credit does not increase the annuity, Texas
concluded there is nothing to pay for. The MOO-257 draft charges approximate normal cost,
a rate calibrated to benefit accrual, for a credit that by design produces no accrual.
**That tension should be resolved before introduction.** It cuts both ways: a reviewer
may argue approximate normal cost overcharges the member for a narrower benefit, or that
it is the wrong instrument entirely and the real price is the actuarial value of earlier
commencement. Either way the pricing rationale needs to be stated in the bill's
supporting materials, not assumed. This is a genuine drafting question for MOO-257 and
is the most useful single finding in this section.

Texas also supplies **express eligibility-only drafting language** that Virginia could
adapt. **Tex. Gov't Code § 843.505**:

> "... on application by a member and **for the sole purpose of determining eligibility
> for retirement from this system**, to recognize service performed under another system
> participating under Chapter 803 ..."

### 5.2 Kentucky — related but not a match

**KRS 61.552(6)** restricts purchased non-qualified service ("airtime"):

> "The service purchased under this paragraph **shall not be used in determining a
> retirement allowance until the member has accrued at least two hundred forty (240)
> months of service, excluding service purchased under this subsection**."

This is the **mirror image** of the MOO-257 proposal, and should not be cited as support.
Kentucky permits the purchase but withholds its benefit effect until a service threshold
is met by other service, and excludes the purchased service from that threshold. It is
evidence that limited-purpose service credit is a drafting pattern legislatures do use,
and it is **not** military-specific — KRS 61.552(2)(d) handles military purchases
separately, without this restriction.

### 5.3 Federal — structural analogue

Under **FERS**, a member who took a refund of retirement deductions receives credit for
that service in determining **eligibility** to retire but not in **computing** the
benefit (OPM, Creditable Service / FERS Information). This confirms that the
eligibility/accrual split is administrable in a large defined benefit system, though the
occasion is refunded civilian service rather than military service.

### 5.4 Scope limit

Texas is the only affirmative match identified. This scan was targeted rather than a
fifty-state survey, so the honest statement for the brief is that **a comparable
eligibility-only military service credit exists in at least one other state system
(TCDRS)**, not that Texas is unique in having one. A full survey would be the NASRA
service-purchase compendium plus fifty statutory checks.

---

## 6. Open questions for VRS actuaries or legislative counsel

Carried forward or newly raised by this scan:

1. **ACTUARY 1 remains open.** The HB 1867 figure ($10,000–$60,000 per member for 48
   months, no-cost grant) is an upper-bound anchor only. The proposal's actual exposure
   is the approximate-normal-cost-to-actuarial-equivalent-cost shortfall plus the value
   of accelerated commencement. Only VRS can model it.
2. **Pricing instrument.** Is approximate normal cost the correct price for a credit that
   produces no accrual? Texas charges nothing for the equivalent credit. This needs an
   actuarial answer and a stated rationale. *(New — raised by § 5.1.)*
3. **Cost-neutrality framing against 2015 c. 508.** The patron will be asked why the
   General Assembly should partially reverse a reform it adopted unanimously for
   cost-neutrality. A prepared answer is required. *(New — raised by § 1.2.)*
4. **Administrative lead time and appropriation.** Expect a six-figure VRS
   implementation ask. **Version 1.4 of the bill moves the effective date from July 1, 2028
   to July 1, 2029** (DECISION 14, resolving the § 51.1-155 sunset collision), which as a
   by-product converts a nominal four-month lead time on a 2028-session bill into a full
   year. That date should still be validated against VRS's separate-accounting build
   estimate. The six-figure ask is also what makes **§ 2.2-2682 C** available as an
   objection inside the Council — see §4 above.
5. **JLCVSO 2027 package.** Confirm contents and whether the Council will carry a pension
   item at all, directly with DVS or the Council.
6. **Offsetting-appropriation precedent.** Whether any money committee has advanced a VRS
   enhancement with unfunded liability conditioned on an offset requires a budget-bill
   item review not performed here.
7. **Competing-bill deconfliction.** SB 419 (2027) is pending in Senate Finance and
   Appropriations with a $258M adverse statement. Sequencing should be discussed with the
   patron.
8. **IRC § 415(n)** treatment of an eligibility-only purchase remains unresolved
   (memo COUNSEL 3) — and § 5.1's pricing question sharpens it, because what the member
   is buying is harder to characterize when it produces no accrual.

---

## 7. Source table

| ID | Source | URL | Retrieved |
|---|---|---|---|
| P-01 | LIS, 2015 Acts of Assembly c. 508 (HB 1890) chaptered text | https://legacylis.virginia.gov/cgi-bin/legp604.exe?151+ful+CHAP0508 | 2026-10-19 |
| P-02 | LIS bill records and event histories, sessions 19941–20271 | https://lis.virginia.gov/ (AdvancedLegislationSearch, LegislationEvent) | 2026-10-19 |
| P-03 | VRS 2023 Fiscal Impact Statement, HB 1867 (HB1867F158.PDF) | https://legacylis.virginia.gov/cgi-bin/legp604.exe?231+oth+HB1867F158+PDF | 2026-10-19 |
| P-04 | VRS 2026 Fiscal Impact Statement, SB 419 | https://lis.blob.core.windows.net/files/1098992.PDF | 2026-10-19 |
| P-05 | VRS 2025 State Fiscal Impact Statement, SB 1396 | https://lis.blob.core.windows.net/files/1020775.PDF | 2026-10-19 |
| P-06 | DVS Commissioner's 2025 Annual Report (RD986), incl. JLC appendix and § 2.2-2682 | https://rga.lis.virginia.gov/Published/2025/RD986/PDF | 2026-10-19 |
| P-07 | Code of Virginia, Art. 28, Ch. 26, Title 2.2 (JLCVSO) | https://law.lis.virginia.gov/vacodefull/title2.2/chapter26/article28/ | 2026-10-19 |
| P-08 | TCDRS Act 2025 (Tex. Gov't Code §§ 843.502, 843.505) | https://www.tcdrs.org/globalassets/policy-documents/tcdrs-act-2025.pdf | 2026-10-19 |
| P-09 | TCDRS Administrative Code 2026 (34 Tex. Admin. Code § 105.3) | https://www.tcdrs.org/globalassets/policy-documents/tcdrs-administrative-code-2026.pdf | 2026-10-19 |
| P-10 | KRS 61.552 | https://apps.legislature.ky.gov/law/statutes/statute.aspx?id=54852 | 2026-10-19 |
| P-11 | OPM, FERS Creditable Service | https://www.opm.gov/retirement-center/fers-information/creditable-service/ | 2026-10-19 |
| P-12 | Code of Virginia, 2026 updates, Title 51.1 | https://law.lis.virginia.gov/vacodeupdates/title51.1/ | 2026-10-19 |

**Inaccessible source:** the DVS JLCVSO program page
(`dvs.virginia.gov/about-us/boards-foundations/joint-leadership-council-of-veterans-service-organizations`)
returns HTTP 403 to automated retrieval. JLCVSO composition, duties, membership roster
and current agenda were taken from RD986 (P-06) and § 2.2-2682 (P-07) instead.
