# Military Service Retirement Bridge — Legislative Package

**Issue:** MOO-257 · **Owner:** VRS2 — Virginia Public Pension Benefits Attorney · **Version 1.1, October 19, 2026**

> **Read this first.** The bill is **not yet ready for a patron.** Four JLCVSO policy decisions were settled on October 19, 2026 and are implemented. An independent adversarial review then returned twelve findings, of which **three blockers remain open** and require JLCVSO decisions: deferred-member acceleration, health insurance credit and COLA commencement, and § 51.1-153 B 4 public-safety scope. Two claims in the version 1.0 briefs were wrong and are corrected in version 1.1 — the health insurance credit and COLA are **not** protected, and hazardous-duty members are **not** uniformly excluded. The cost model is now complete and integrated: **the bill is not cost neutral**, carrying a subsidy of up to $341,065 per member, at a combined employer contribution rate impact of **0.19 basis points**.
**Target:** 2027 Virginia General Assembly · **Client:** Joint Leadership Council of Veterans Service Organizations (JLCVSO)

**Format:** every document is provided as an editable Microsoft Word file (`.docx`) at the root of this folder. The Markdown sources used to generate them are kept in `source-markdown/` for version history and diffing; edit the `.docx` files.

| File | Component | Audience | Status |
|---|---|---|---|
| `01-bill-draft.docx` | Draft bill text: new § 51.1-142.4 plus conforming amendments to **§ 2.2-3204** and §§ 51.1-124.3, 51.1-142.2, 51.1-153, 51.1-155, 51.1-162, 51.1-165.01, 51.1-166 | Patron, Division of Legislative Services | **Version 1.1 — three blockers open; not ready for DLS** |
| `02-legal-analysis-memo.docx` | Current-law baseline, terminology discipline, statutory conflicts and conforming amendments, unintended-effects review, risks, open questions (DECISION / ACTUARY / COUNSEL items) | Counsel, VRS, JLCVSO leadership | Complete |
| `03-jlc-one-page-brief.docx` | One-page brief: the proposal and the gap it fills | JLCVSO members, legislators | Complete |
| `04-jlc-two-page-brief.docx` | Two-page brief: fuller explanation, examples, the decisions JLCVSO has made, the three open blockers, and what a member gives up by retiring earlier | JLCVSO members, legislators | Complete |
| `05-source-appendix.docx` | Claim/evidence table, pinpoint citations, source links, amendment histories, a corrections log for the fourteen citation defects found on re-verification, and what is deliberately unsourced | All | Complete |
| `06-red-team-review.docx` | Independent adversarial review: twelve findings ranked, five blockers, citation verification results, over-reach analysis, political and messaging exposure, member-detriment disclosures | Counsel, JLCVSO leadership | Complete (MOO-260) |
| `07-precedent-and-stakeholder-scan.docx` | Prior Virginia bills, VRS Board posture, money-committee history, JLCVSO package fit, comparative state scan | JLCVSO leadership, patron | Complete (MOO-261) |
| `08-fiscal-model-memo.docx` | Cost model: per-member price versus value, affected population FY2029–FY2038, employer contribution rate impact, sensitivities, hybrid-inclusion variant, workforce effects, data VRS must supply. Reproducible code and tables in `fiscal-model/` | Money committees, VRS, JLCVSO leadership, patron | Complete (MOO-259) — **illustrative, not the Board's § 30-19.1:7 statement** |

In the bill draft, **bold** marks language proposed to be added and ~~strikethrough~~ marks language proposed to be struck. DLS will convert to the underscore/strikethrough convention used in introduced bills.

## Core policy principle

The bridge is an **eligibility benefit, not a pension-accrual benefit**. It lets a vested VRS Plan 1 or Plan 2 member use up to four years of prior active duty military service, at approximate normal cost after the existing 24-month window has closed, **solely** to reach the threshold for an unreduced retirement allowance — with no increase in the retirement allowance and no effect on any other VRS benefit.

## The three moves that make it work

1. **New § 51.1-142.4**, not an amendment inside § 51.1-142.2 — because "creditable service" is defined as "prior service as set forth in § 51.1-142.2 plus membership service," so anything added there becomes creditable service automatically.
2. **Express carve-out from the "creditable service" definition** in § 51.1-124.3, which protects the benefit formula, AFC, the health insurance credit, group life thresholds, disability allowances, and the five-year vesting analogue in one stroke.
3. **Five conforming amendments** — to §§ 51.1-162, 51.1-165.01 and 51.1-166, which key off the *date of unreduced-retirement eligibility* rather than off creditable service, and (added in version 1.1) to **§ 2.2-3204 in Title 2.2**, under which Workforce Transition Act severance years convert from *age* into *creditable service* once an employee is eligible for unreduced retirement. Without these, the credit leaks into PLOP, the death-in-service benefit, and an employer-funded increase in the allowance itself, even though it is not creditable service.

**What the three moves do not reach.** They control what the credit *is*. They do not control what an **earlier retirement date** does. The health insurance credit and ordinary COLA both commence at retirement, so both start up to four years earlier and neither is reachable by exclusion drafting. That is open blocker 2.

## Open items that change the bill

See `02-legal-analysis-memo.docx`, Part 6.

**Settled October 19, 2026:** hybrid plan participants excluded (Plan 1 / Plan 2 only); the military retired pay bar inherited without exception; the PLOP eligibility date frozen, with the trade-off disclosed in both briefs; partial purchase capped at the shortfall permitted.

**Open blockers:** DECISION 8 (deferred-member acceleration — a member can buy at normal cost, resign, defer, and take an unreduced allowance at 50, roughly 15 years of acceleration rather than four); DECISION 9 (health insurance credit and COLA commencement); DECISION 10 (§ 51.1-153 B 4 public-safety scope). All three are JLCVSO policy decisions; none can be closed from the statute.

## What it costs

ACTUARY 1 and ACTUARY 2 are **answered** (MOO-259). Two numbers, and the package must always carry both:

- **Per member, the price does not cover the value.** Approximate normal cost recovers **11% to 78%** of the value of the acceleration. The maximum-acceleration Plan 1 case pays **$42,500** for **$383,565** — a **$341,065 subsidy at 11.1% recovery**. The bill is **not cost neutral and must not be presented as cost neutral.**
- **In aggregate it is very small.** Employer contribution rate impact over FY2029–FY2038: **0.22 bp** state, **0.20 bp** teacher, **0.14 bp** political subdivisions, **0.19 bp** combined — about **222 purchasers** against **$26.05 billion** of covered payroll. To the nearest basis point, no plan's rate changes. Across every sensitivity tested the aggregate stays between **0.05 and 0.44 bp**.

Three things that follow. The § 51.1-124.3 carve-out is worth a **5.7×** difference in the liability increase and is the single most important provision in the bill. A member who would have worked on to unreduced eligibility **overpays** in every profile modeled, so the subsidy exists only for members who were leaving anyway. And hybrid inclusion would change the ten-year number by **less than one hundredth of a basis point**, so DECISION 2 stands on equity and precedent, not on near-term cost.

**Three limits on that model, stated plainly.** It is an illustrative public-finance model, **not** an actuarial certification and **not** the VRS Board's mandatory statement under § 30-19.1:7, which has not been requested. Its weakest input is the veteran-population funnel — one published anchor and four assumed filters — which alone moves the aggregate from 0.07 to 0.44 bp. And it **does not price DECISION 8**: if the deferred-member path stays open, every aggregate above is an understatement.

## Verification note

All statutory text was read in the official Code of Virginia at law.lis.virginia.gov on October 19, 2026, including the 2026 amendments to § 51.1-142.2. § 51.1-142.4 was confirmed unoccupied. No Code section was inferred. "Plan 1," "Plan 2," "vesting," "earned service," and "benefit-calculation service" are not operative terms in Title 51.1 and are not used in the bill.
