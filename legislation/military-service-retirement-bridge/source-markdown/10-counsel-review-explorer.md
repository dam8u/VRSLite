# Independent Review — Legislative Scenario Explorer

**Issue:** MOO-265 (independent adversarial review of the Legislative Scenario Explorer) · reviewed against commit `5963f90`, bill version 1.2, package version 1.3
**Prepared by Policy Development Team using legal, policy, and financial analysis tools, pending review by veterans' legal counsel.**
**Date:** October 20, 2026
**Materials reviewed:** `explorer/js/engine.js`, `js/ui.js`, `js/registry.js`, `data/baseline.js`, `data/cells.js`, `methodology.html`, `index.html`, `css/explorer.css`, `build_standalone.py`, `dist/explorer-standalone.html`, `dist/methodology-standalone.html`, `test/reconcile.js`, `test/standalone.js`, `test/chrome.js`, and `fiscal-model/` (`population.py`, `calibrate_explorer.py`, `out/T1`–`T10`, `out/explorer-baseline.json`)
**Method:** the engine was loaded under Node and driven directly with my own probe harness; the **shipped** `dist/explorer-standalone.html` was then rendered **alone in an empty directory** in headless Chrome and driven through the controls as a staffer would. The published formulas in `methodology.html` were re-derived by hand, on paper, and only then compared to the running code. Statutory and rate citations were read in the official text at `law.lis.virginia.gov` and at `varetire.org` on October 20, 2026. Nothing in the explorer or the fiscal model was modified; the committed test suites were not re-run as a finding.

> **This is internal risk analysis, not legal advice, and no counsel has cleared this tool.** I am not counsel of record and this review is not a legal opinion the organisation can rely on. Every finding is about text, numbers and evidence.

---

## Verdict

**Twenty-six findings: four blockers, eleven material, eleven minor.** Twenty-one of the twenty-six are framing or labelling defects, which is the ratio the mandate predicted and the ratio that matters for a tool driven live.

The engine is in better shape than the interface. The three hand re-derivations the mandate asked for all **closed exactly** — the formulas published on `methodology.html` are the formulas being run, to the fourth decimal place, and I could not find a single disagreement between the published arithmetic and the code. The pension guardrails hold: no workforce control moves any pension figure by a single bit, across every setting I tried. The funnel cannot widen: I swept 648 combinations of the four population screens and three veteran shares and the worst step-to-step movement was 4 × 10⁻¹² — floating point, not a leak.

**What fails is everything that sits between a correct number and a reader.** The single most serious finding is not an arithmetic error at all. A presenter who sets the replacement slider to **100%** — the setting that looks maximally conservative, that triggers the words *"zero by construction"* on screen, and that the methodology holds out as making a zero reading "impossible to miss" — and who then sets the vacancy slider to **12 months**, gets a **Modeled payroll effect of $23,748,292** and a **Combined scenario effect of $16,596,521**, printed two inches above a sentence that reads *"at 100% the payroll effect is zero."* That screen is a savings claim built out of the tool's own conservatism language, it exports to the handout and the CSV in exactly that form, and it is three slider drags from the opening state.

Second: the required § 30-19.1:7 disclaimer is inside `.masthead`, and the print stylesheet sets `.masthead { display: none }`. **Printed, this dashboard carries no disclaimer at all** — no "illustrative policy-analysis model", no "not the VRS Board impact statement", no attribution line. The printed page is the artefact that ends up in a committee folder.

Third: **$341,065 is not the maximum.** The model's own cell grid produces a per-member frozen-service net above the purchase price of **$418,729**, and exceeds $341,065 in **every** one of the ten projection years, beginning at $355,281 in FY2029. The word "maximum" is unsupportable, and it is in Panel E, in `methodology.html` § 9.6 and in the package `README.md`.

Fourth: the replacement ladder — the one table the methodology says exists to make the 100% reading unmissable — is **wrong in five of its six rows** whenever the vacancy slider is off zero. Clicking the *Workforce Turnover Scenario* preset is sufficient to reproduce it.

None of this is caught by the committed harnesses, and the reason is instructive. `reconcile.js` proves the engine equals the Python model. `standalone.js` proves the interface displays what the engine returns. **Neither can detect a sentence that contradicts the number beside it**, and the two assertions that look like they cover the worst finding do not: the ρ = 100% guardrail is asserted only with the non-replacement and vacancy sliders simultaneously pinned to zero, and the ladder is asserted only at the one rung that is marked *selected*.

---

## 1 · The strongest case against, in the opposition's voice

*The following is the brief I would write if I were staff to a money committee member who had decided to kill this bill. It is stated as its best advocate would state it.*

> This is an advocacy instrument wearing the costume of a model, and the costume is very good — which is the problem. The sponsors will hand you a screen showing a cost of nineteen *hundredths* of one basis point and tell you that is too small to argue about. Ask them one question: what does that number do when you move the one slider on the left-hand side that no published data anywhere in Virginia or the United States can fix? It goes to **negative nine hundredths**. The sign of their headline figure is decided by a parameter they concede is unknowable, that they have set at exactly the midpoint of a range they chose themselves, and whose own documentation admits runs the other way — because the members who buy an earlier retirement date are, obviously and by definition, the members who were already planning to leave. They have written that down. They call it self-selection, they say it runs toward the subsidised end, and then they set the dial to 0.50 anyway and put the result on the first screen. Their central case is not the centre of anything. It is the optimistic end of a range they decline to draw.
>
> Now look at the population. The whole funnel rests on **one** published number — six percent of the *classified state* workforce self-identified as veterans in a DHRM slide deck. Everything after that is an assumption: the teacher share, the political-subdivision share, who has 180 qualifying days, who is barred by retired pay, who already bought in. Four invented filters on one real number, and their own sensitivity panel says that funnel alone swings the answer from 0.07 to 0.44. They will tell you that is honest disclosure. It is, and it is also fatal: when the two biggest drivers on your own tornado are *take-up* and *who the veterans are*, and when those two multiply rather than add — move both and the answer runs from 0.018 to 1.107, which is two and a half times the widest bar they drew — you have not built a fiscal estimate. You have built a range four orders of magnitude wide and taken a photograph of the middle of it.
>
> Then there is the workforce panel, and here I would stop being polite. They say — repeatedly, in bold — that this is not a savings calculator and that a refilled position never produces a saving. Good. Now watch me break it. I set replacement to one hundred percent, which their own interface congratulates me for by printing "zero by construction," and I set the vacancy slider to twelve months. Their tool now reports a payroll effect of **twenty-three point seven million dollars** and a combined effect of **sixteen point six million** — on a screen that still says the payroll effect is zero, and in a handout that exports both figures with no sign that anything unusual happened. Fifty-two cents of every dollar of departing salary has become a "saving" on a position they have told me is fully refilled. I do not need to allege bad faith. I only need to put that screen on the overhead and ask the patron to explain it. And when they reach for the methodology page to defend themselves, the methodology page says the same false thing their interface does.
>
> Finally, the price. They are candid that approximate normal cost buys a year of *accrual* and this bill sells an earlier *date*, and that the two have nothing to do with each other. Their own number for an actuarially equivalent price is **112.8% of salary per year**, against the **12.50%** the bill charges. By their arithmetic the member pays eleven cents on the dollar. Everything else in this package — the carve-outs, the conforming amendments, the exclusion architecture — is engineering around that one fact. The bill's defenders describe a nine-to-one subsidy and then ask you to focus on the fact that the aggregate is small because few people will take it. That is an argument that the giveaway is cheap, not that it is sound. And it is a precedent: once eligibility credit is purchasable at accrual cost for one sympathetic class, every subsequent class will cite it, and the thing the Commonwealth will have conceded is not four years of military service — it is the principle that a retirement *date* has a published price.
>
> They have been honest about more than most. Their printed handout does not even carry the statutory disclaimer, because they hid it in a header their own print stylesheet deletes. I would hold that up too.

I can make that case seriously, and that is the test the mandate set. Note where it lands: **every damaging exhibit in it is drawn from the tool's own screens and the tool's own documents.** Nothing in it requires data the Lab does not have. That is the correct way to read the findings below — not as bugs, but as the exhibits in that brief, which can still be removed.

---

## 2 · Findings — computational defects

| # | Severity | Where | Defect |
|---|---|---|---|
| **C-1** | **BLOCKER** | `js/engine.js:806–822`, `js/ui.js:403–404, 432–433` | The replacement ladder is wrong at every rung except the selected one whenever the vacancy slider is off zero |
| **C-2** | **MATERIAL** | `js/engine.js:828–839`, `methodology.html` § 13.1, `js/registry.js:141` | The health insurance credit estimate applies the § 51.1-1400 **state** rate to teachers and political subdivisions, which have different and lower statutory rates |
| **C-3** | **MINOR** | `js/ui.js:302–318` | The two benefit-structure rate contributions do not sum to the displayed combined figure at the precision shown, under a caption that says they do |
| **C-4** | **MINOR** | `js/engine.js:408–410` | Hybrid cases price contributions-forgone at Plan 1 rates |
| **C-5** | **MINOR** | `js/ui.js:1096–1101` | The CSV's Sensitivity block can be a scenario behind its own Inputs and Outputs |

### C-1 — BLOCKER. The replacement ladder is wrong in five of its six rows whenever the vacancy slider is off zero.

**Reproduction.** Open `dist/explorer-standalone.html`. Click the preset **Workforce Turnover Scenario** (take-up 20%, replacement 85%, 5% not replaced, 3-month vacancy). Read Panel C's chart and the table beneath it, *Required reading of the payroll effect at each replacement percentage.*

**What is wrong.** `engine.js:814` computes a per-rung vacancy `vac` and then discards it. `engine.js:820` builds each rung's total from `wfTot.vacancyPayroll` — the vacancy at the **selected** replacement percentage — so every non-selected rung is given the wrong vacancy. `ui.js:433` compounds it by printing `R.panelC.combined.vacancyPayroll` in the *Vacancy effect* column of all six rows, so the table displays one figure six times.

**Wrong output and correct output**, at the Workforce Turnover preset:

| Replacement | Ladder shows | Correct | Error | *Vacancy effect* column shows | Correct |
|---|---|---|---|---|---|
| 75% | $17,831,900 | $17,324,980 | **+$506,920** | $4,308,823 | $3,801,903 |
| 80% | $15,696,960 | $15,443,500 | **+$253,460** | $4,308,823 | $4,055,363 |
| 85% *(selected)* | $13,562,019 | $13,562,019 | — | $4,308,823 | $4,308,823 |
| 90% | $11,427,079 | $11,680,539 | **−$253,460** | $4,308,823 | $4,562,283 |
| 95% | $9,292,138 | $9,799,059 | **−$506,920** | $4,308,823 | $4,815,743 |
| 100% | $7,157,198 | $7,917,579 | **−$760,381 (−9.6%)** | $4,308,823 | $5,069,203 |

"Correct" is the figure the tool itself returns when the replacement slider is actually moved to that percentage — so the ladder contradicts the panel it sits in.

**Why no test caught it.** `test/standalone.js:515–528` checks only that *the selected rung equals the headline payroll figure*, and only after `btn-reset`, which sets the vacancy to zero. The five rows that can be wrong are never read, and the one condition under which they are wrong is never exercised.

**Direction of error.** The 100% rung — the one the methodology says the ladder exists to make unmissable — is **understated**, so the defect also makes the conservative reading look better than the model's own answer.

**Suggested fix.** Keep the per-rung `vac` already computed at `engine.js:814`, sum it into a per-rung `vacancyPayroll`, use that in the rung total, and have `ui.js:403` and `ui.js:433` read the rung's own value rather than `combined`. Then extend the harness to assert, for each of the six rungs and at vacancy months ∈ {0, 3, 12}, that the rung total equals the headline total obtained by actually setting the slider to that rung.

### C-2 — MATERIAL. The health insurance credit estimate applies the state rate to teachers and political subdivisions.

**Reproduction.** Open the file; read the **HIC & COLA** panel. At the opening state it reports *Health insurance credit — earlier commencement: $561,000*. The same figure exports to the CSV as `$560,771`.

**What is wrong.** `engine.js:828` sets `hicRate = 4.25` and `engine.js:830–839` applies it across the benefit structures with no employer split, so every modeled participant is priced at the **state employee** credit. The three statutory credits are not the same:

| Employer plan | Authority | Credit | Mandatory? | Modeled participants |
|---|---|---|---|---|
| VRS State Employees | § 51.1-1400 | **$4.25**/month per year of service (effective July 1, 2024) | Yes | 59.6 |
| VRS Teachers | § 51.1-1401 | **$4.00**/month per year of service | Yes (≥ 15 years) | 74.8 |
| Political subdivisions | § 51.1-1402 | **$1.50**/month per year of service, capped at $45/month | **No — the employer must elect to participate** | 87.5 |

**Wrong output and correct output.** As shipped, **$560,771**. Re-computed with each employer plan's own statutory rate, holding every other input identical: **$400,316** — a **40% overstatement of $160,455**. And $400,316 still assumes that *every* participating political subdivision has elected the § 51.1-1402 credit, which many have not; the true figure is lower again, and the tool has no basis for knowing how much lower.

**Note on direction.** This error runs *against* the proposal — it overstates a cost — so it is not self-serving. It is still a finding, because a VRS reviewer who checks Chapter 14 will find it in one reading, and an overstatement found by the other side costs the same credibility as an understatement.

**Suggested fix.** Move the HIC loop to the employer plans, carry the three statutory rates, apply the § 51.1-1402 cap, and add a visible line that the political-subdivision credit is **elective** so the figure is an upper bound for that cohort. The glossary entry at `registry.js:141` already says "for a state retiree"; the arithmetic needs to say it too.

### C-3 — MINOR. The benefit-structure rate contributions do not sum at the precision displayed.

Panel B's benefit-structure table carries the caption *"so they sum to the combined figure."* Exactly, they do: Plan 1 `0.203929` + Plan 2 `−0.015154` = `0.188775` = combined. **Displayed** at two decimals, the column reads `0.20 bp` + `−0.02 bp` against a combined of `0.19 bp`, which does not add up. A VRS reviewer with a calculator will check exactly this, because the caption invites it. **Fix:** show three decimals in that column, or add "(rounded; the unrounded figures sum exactly)".

### C-4 — MINOR. Hybrid cases price contributions-forgone at Plan 1 rates.

`engine.js:408` resolves the plan data for a hybrid case to `B.plans.P1`, so `pvTotalNormalCostForgone`, `pvMemberContribForgone` and `pvEmployerDbContribForgone` for a hybrid member use Plan 1's total normal cost and member contribution rate. The hybrid DB component's normal cost is materially lower, so the hybrid variant overstates contributions forgone. It bites only in the *Hybrid Variant (not the bill)* scenario, which is labelled as not the bill and produces almost nothing before FY2038 — hence **minor**. **Fix:** either export hybrid plan data from `calibrate_explorer.py` or state on the scenario that hybrid contributions are priced at Plan 1 rates.

### C-5 — MINOR. The CSV's Sensitivity block can be a scenario behind its own Inputs and Outputs.

`ui.js:1096` writes the Sensitivity rows from `lastTornado`, which `ui.js:874` refreshes on a 220 ms debounce behind the main render. A user who moves a slider and clicks **CSV** inside that window exports Inputs and Outputs for the current scenario and Sensitivity rows for the previous one, with nothing in the file to distinguish them. **Fix:** compute the tornado synchronously inside `buildCsv`, or stamp the Sensitivity rows with the scenario they were computed for.

---

## 3 · Findings — framing and labelling defects

| # | Severity | Where | Defect |
|---|---|---|---|
| **F-1** | **BLOCKER** | `js/ui.js:367, 422–425, 456`; `methodology.html` § 12.1, § 12.2 | Three separate statements that the payroll effect is zero at 100% replacement are false whenever the vacancy or non-replacement sliders are off zero — and the tool displays $23.7M while saying so |
| **F-2** | **BLOCKER** | `css/explorer.css` `@media print`; `index.html:33–43` | The required § 30-19.1:7 disclaimer is inside `.masthead`, which the print stylesheet deletes. The printed dashboard carries no disclaimer |
| **F-3** | **BLOCKER** | `js/ui.js:554–558`; `methodology.html` § 9.6; `README.md` | "$341,065 — the **maximum** modeled net value" is not the maximum. The model's own cells exceed it in every projection year |
| **F-4** | **MATERIAL** | `js/ui.js:472–473` | Panel D calls the modeled pension impact "a cost to the plan" in hardcoded text that survives the figure going negative |
| **F-5** | **MATERIAL** | `js/ui.js:634` | Panel F's note renders literal `</strong>` and `<strong>` on screen, in the opening state of the shipped file |
| **F-6** | **MATERIAL** | `js/engine.js:965–975`; `js/ui.js:502` | Panel E ignores the bridge-amount control, so Panels A and E can display contradictory scenarios simultaneously |
| **F-7** | **MATERIAL** | `js/ui.js:549–558` | Panel E's "$341,065" note is static while the figure it names moves with the sliders — the table can read $473,361 under a note calling $341,065 "the figure" |
| **F-8** | **MATERIAL** | `js/ui.js:671–674` | Panel G hardcodes "0.07 to 0.44 basis points" and "the single largest uncertainty"; both are false away from the default scenario, and the second contradicts Panel F |
| **F-9** | **MATERIAL** | `js/engine.js:1005–1007`, `1038–1055`; `methodology.html` § 15 | The tornado tests φ ∈ [0.25, 0.75] while the control permits [0, 1]; the aggregate changes sign at φ ≈ 0.838 and no panel shows it. Interactions are not disclosed, and the two largest drivers are exactly multiplicative |
| **F-10** | **MATERIAL** | Panel B, throughout | The tool never states that the central-case result is entirely a Plan 1 phenomenon and that Plan 2 purchasers overpay in aggregate |
| **F-11** | **MATERIAL** | `js/ui.js:37–40` | `usdM` has no billions branch, so covered payroll renders as "$26048.74M" |
| **F-12** | **MINOR** | `js/engine.js:952–955` | Funnel step 7 is identically equal to step 6 at every setting: a step labelled "able and willing to purchase" that excludes nobody |
| **F-13** | **MINOR** | `js/engine.js:956–958` | In direct-entry mode step 8 is still labelled "at the selected take-up rate" |
| **F-14** | **MINOR** | `js/registry.js:156–163` | The glossary gives a modeled mean deficit of "about 2.2 years" while the control notes on the same screen print 3.14 and 3.55 — two populations, neither stated |
| **F-15** | **MINOR** | `js/registry.js:58–70` | The glossary applies the **combined** 0.19 bp to the **state** plan's published rate |
| **F-16** | **MINOR** | `js/registry.js:88–95` | The glossary's "$35,000 a year … roughly $639,000" pairs profile A's present value with a rounded-down allowance |
| **F-17** | **MINOR** | `methodology.html` § 12.1, § 13.2 | Two references to "harness group 5" point at assertions that live in group 9 |
| **F-18** | **MINOR** | `build_standalone.py` `RENAME` | The two single-file builds cross-link by relative filename, so a staffer emailed only the explorer has a dead **Methodology** button |
| **F-19** | **MINOR** | `js/ui.js:532–534` | Panel E can display a negative "Present value of acceleration" with no explanation that the label can go negative |
| **F-20** | **MINOR** | `js/ui.js:47` vs `:34` | `bp()` uses an ASCII hyphen for negatives while `usd()` uses a typographic minus, so one tile reads "−$3.43M … -0.09 bp" |
| **F-21** | **MINOR** | `methodology.html` § 20 | The package list omits `07-precedent-and-stakeholder-scan.docx` |

### F-1 — BLOCKER. The tool displays a $23.7M payroll effect above a sentence saying the payroll effect is zero.

**Reproduction.** Open `dist/explorer-standalone.html`. Click **Reset to Baseline**. Drag *Replacement salary percentage* to **100%**. Drag *Average vacancy before refill* to **12 months**. Read Panel C, then Panel D, then download the scenario summary.

**What is on screen.**

- Tile: *Payroll difference from lower-paid replacements* **$0** — "**zero by construction at 100% replacement**"
- Tile: *Temporary vacancy effect* **$21.34M**
- Tile: *Employer retirement contribution difference* **$2.40M**
- Tile: *Modeled payroll effect — total* **$23.75M**
- Panel C note, immediately below: "At 90% replacement only the 10% differential and the related employer-cost differential count; **at 100% the payroll effect is zero.**"
- Ladder caption: "**At 100% the lower-paid differential and the employer contribution difference are both zero**" — directly above a table whose 100% row shows an employer contribution difference of **$2.40M**
- Panel D: *Modeled pension impact* $7.15M; *Modeled payroll effect* **$23.75M**; *Combined scenario effect* **$16.60M**
- Handout and CSV: *Replacement salary percentage 100%*, *Modeled payroll effect — total $23,748,292*, *Combined scenario effect $16,596,521*

**Why the claim is false.** The methodology's own formula, three lines above the guardrail that asserts it, gives the answer:

```
payroll / workforce effect = lower-paid diff + not replaced + vacancy + employer DB differential
```

At ρ = 100%: `lower-paid diff = 0`, but `not replaced = departing × ν`, `vacancy > 0` whenever months > 0, and `employer DB differential = (departing × ν + vacancy) × rate`. So the effect is `(departing × ν + vacancy) × (1 + rate)` — **zero only when ν = 0 and months = 0.** Measured:

| ρ | ν | Vacancy months | Modeled payroll effect |
|---|---|---|---|
| 100% | 0 | 0 | **$0** ✔ |
| 100% | 0 | 3 | $5,937,073 |
| 100% | 0 | 6 | $11,874,146 |
| 100% | 0 | **12** | **$23,748,292** |
| 100% | 5% | 0 | $2,277,359 |
| 100% | 5% | 12 | $24,838,237 |

`methodology.html` § 12.1 states the guardrail unconditionally — *"At ρ = 100% the payroll effect is **exactly zero** — by construction, not by rounding. Harness group 5 asserts it"* — and § 12.2 goes further: the ladder exists so that *"a 100%-replacement reading — zero effect — [is] impossible to miss."* **The harness asserts the conditional version only.** `test/standalone.js:490–492` sets `i-repl` to 100 **and** `i-notrepl` to 0 **and** `i-vac` to 0 in the same action before asserting zero. This is precisely the failure mode the mandate named: the assertion tests the wrong thing.

**This is the gaming path.** A well-prepared advocate reads this interface looking for the cheapest route to a favourable total and finds it immediately: 100% replacement *reads* as the maximally conservative setting, the interface congratulates it in bold, and the vacancy slider then manufactures an effect worth **52% of the entire departing payroll present value** on positions the same screen says are fully refilled. The arithmetic is defensible in isolation — an unfilled post genuinely does not draw pay — but the labelling makes it indefensible, and the figure travels into the handout with the "100% replacement" input intact and no flag.

**A second, smaller problem in the same mechanism.** The vacancy is bounded only by `min(vacancy, replacement)`. At the modeled mean acceleration window of **1.92 years**, a 12-month vacancy means the average accelerated position sits empty for more than half the window, and for Plan 2 (mean window 1.19 years) a 12-month vacancy consumes 84% of it. Nothing on screen flags that.

**Suggested fix, in three parts.** (i) Make every zero claim conditional and sign-aware: "at 100% replacement with nothing eliminated and no vacancy, the payroll effect is exactly zero." (ii) When ρ = 100% **and** the reported total is non-zero, replace the tile subtitle with a statement of what the total actually consists of — "100% replacement; the entire effect below is the *n*-month vacancy and the contributions avoided during it." (iii) Carry the same conditional into `methodology.html` § 12.1 and § 12.2, into the ladder caption, and into the handout and CSV when ρ = 100% and the total is non-zero. Then re-cut the harness assertion into a 3 × 3 grid over ν and vacancy months, asserting zero only in the one cell where zero is the right answer and asserting the closed-form `(departing × ν + vacancy)(1 + rate)` in the other eight.

### F-2 — BLOCKER. The printed dashboard carries no disclaimer.

**Reproduction.** Open `dist/explorer-standalone.html` and print it, or print to PDF.

`index.html:33` places the `.disclaimer` block — the one carrying *"This tool is an illustrative policy-analysis model. It is not an actuarial certification, the VRS Board impact statement required under § 30-19.1:7, or a General Assembly fiscal impact statement"*, plus the provenance key and the attribution line — **inside** `<header class="masthead">`. `css/explorer.css` then does this:

```css
@media print {
  .masthead, .controls, .tabstrip, .masthead-actions { display: none !important; }
```

I forced those rules into the screen media of the shipped file and read the rendered body text back. Result:

```
{ "has_30_19_1_7": false, "has_illustrative": false, "has_attribution": false }
```

The printed document retains Panel B's basis-point qualifier and Panel D's "not an actuarial certification or VRS fiscal impact statement" warning, so it is not naked — but it loses the top-level statement, loses the § 30-19.1:7 citation, loses the "illustrative policy-analysis model" framing and loses the "Prepared by … pending review by veterans' legal counsel" line. `methodology.html` § 18.1 states affirmatively that "the print stylesheet drops the controls and the tab strip and keeps the panels … which also means the whole dashboard prints usefully." It drops the disclaimer too.

**On screen the disclaimer is genuinely unmissable, and I checked that specifically** — `.masthead` is `position: sticky; top: 0`, and after jumping to Panel D via the tab strip the disclaimer was still on screen at 73–149 px from the viewport top. The defect is confined to print, which is where it matters most: the printed panel is the thing that gets photocopied, left in a folder and quoted a month later with no screen attached.

**Suggested fix.** Move `.disclaimer` out of `.masthead` in `index.html` so the print rule cannot reach it, and add an explicit `@media print { .disclaimer { display: block !important; break-after: avoid } }` with the attribution line. Add a harness assertion that reads the document's text content with the print rules applied and requires `30-19.1:7`, `illustrative policy-analysis model` and the attribution line to all be present.

### F-3 — BLOCKER. $341,065 is not the maximum modeled net value.

**Reproduction.** Panel E, the note below the two member tables: *"The Plan 1 profile is the source of the **$341,065** figure — the **maximum modeled net value above the member purchase price under the frozen-service/subsidy scenario**, i.e. the single most favorable modeled profile."* The same sentence appears at `methodology.html` § 9.6 and in the package `README.md`.

**What is wrong.** $341,065 is the maximum across the **seven hand-built representative profiles** (A $341,065; B $101,480; C $65,368; D $21,787; E $19,574; F $8,923; G −$10,357 — I checked all seven, and A is indeed the highest of them). It is **not** the maximum the model produces. The aggregate arithmetic runs over **1,025 exposure cells**, and when I evaluate the frozen-service net for every one of them at the default parameters:

| Fiscal year | Highest per-member net above price (frozen-service) | Cell |
|---|---|---|
| FY2029 | **$355,281** | State, Plan 1, age 49.5, 26.5 yrs, salary $95,634 |
| FY2032 | $379,484 | State, Plan 1, age 49.5, 26.5 yrs |
| FY2035 | $412,511 | State, Plan 1, age 50.5, 26.5 yrs |
| **FY2037** | **$418,729** | State, Plan 1, age 49.5, 26.5 yrs, salary $111,836 |

$341,065 is exceeded in **all ten** projection years. The grid's richest cell is **23% higher**. The later figures are in nominal dollars of their fiscal year, but FY2029's $355,281 is not — it exceeds $341,065 in first-year dollars.

**Why it matters more than the 4% to 23%.** The claim is not "about $341,065"; it is the word **maximum**, and a maximum is a claim a reviewer can falsify with a single query against the committed data. The direction of the error is that the package *understates* its own most favourable case, which is politically harmless and evidentially fatal: an opponent who shows that the sponsors' own grid reaches $419,000 against a published "maximum" of $341,065 has not found a rounding difference, they have found a figure the sponsors did not check. And this is the package's single most-quoted number.

**Suggested fix, and it is a wording fix, not an arithmetic one.** Say what is true: *"$341,065 is the modeled net value above the purchase price for illustrative profile A — a Plan 1 state employee four years short of thirty at the minimum § 51.1-153 B 2 age, the most favourable of the seven published profiles. It is not a cost per veteran and must not be multiplied by a participant count. The model's underlying cell grid reaches approximately $419,000 in the most favourable single cell."* Carry the same correction into `methodology.html` § 9.6 and into `README.md`. **Marked for the Editor: this one has to change in the memo's risk section and in every document that repeats the figure.**

### F-4 — MATERIAL. Panel D calls a negative pension impact "a cost to the plan."

**Reproduction.** Reset. Drag the **φ** slider to its right-hand end, **100%** — one drag, and a position the methodology itself invites a reader to visit ("a reader who wants one number should take the range across φ").

**What is on screen.**

- Panel B: *Employer contribution-rate impact* **-0.09 bp**; *Modeled pension impact (net liability change)* **−$3.43M**; *Member ANC payments received $7.29M — recovers **189%** of the value conferred*
- Panel D tile 1: *1. Modeled pension impact* **−$3.43M** — "-0.09 bp on employer contribution rates — **a cost to the plan**"
- Panel D tile 3: *3. Combined scenario effect* **$7.99M** — up from **−$2.60M** at the default, purely because the pension figure changed sign

`ui.js:473` hardcodes "a cost to the plan". The modeled pension impact turns negative at **φ ≈ 0.838** and the slider runs to 1.00 in steps of 5%, so six reachable positions produce a negative impact labelled as a cost. Panel B's note does disclose the per-member mechanism ("at φ = 1 … purchasers overpay") and Panel E's verdict line correctly flips to **Overpays** — so the tool is not uniformly wrong, which makes the one hardcoded clause worse, not better.

The second-order effect is the one to worry about. Panel D presents a cost and a saving as two positive dollar figures and then subtracts, so a reader at φ = 1 sees a *larger* combined effect than at φ = 0.5 and no explanation other than a tile that says "cost".

**Suggested fix.** Derive the subtitle from the sign: positive → "a cost to the plan"; negative → "**a gain to the plan — at this φ purchasers pay more than the value received**"; near zero → "approximately neutral at this φ". Add one sentence to Panel B's note stating that the *aggregate* changes sign at approximately φ = 0.84, not just the per-member result.

### F-5 — MATERIAL. Panel F renders raw HTML tags on screen.

**Reproduction.** Open `dist/explorer-standalone.html` and read the note under Panel F's chart. In the **opening state**, verbatim from the rendered page:

> Only assumptions about people matter. At these settings the two largest drivers are Participant count (take-up)**`</strong>`** and **`<strong>`**Veteran / purchasability funnel (ASM-15–18). Every classical actuarial lever …

`ui.js:634` joins the driver labels with `'</strong> and <strong>'` and then passes the joined string through `esc()`, which escapes the markup it just inserted. I confirmed two literal tags in `document.body.innerText` of the shipped file at default settings; the defect fires at every setting, because there are always at least two non-neutral drivers.

It is cosmetic, and it is in the panel whose entire job is to tell a legislator which assumption matters. Anyone who notices it stops trusting the arithmetic beside it. **Fix:** `esc()` each label, then join with the markup — `topTwo.map(r => esc(r.label)).join('</strong> and <strong>')`.

### F-6 — MATERIAL. Panel E ignores the bridge-amount control.

**Reproduction.** Reset. Under *Bridge amount*, click **Fixed average**. Set *Plan 1* to **1.0** and *Plan 2* to **1.0**. Now read Panel A and Panel E on the same screen.

| Panel A | Panel E (profile A) |
|---|---|
| *Average bridge credit purchased* **0.98** | *Bridge years purchased* **4.00** |
| *Total years / points purchased* **218** | *Years of acceleration* **4.00** |
| *Estimated member ANC payments* **$2.61M** | *ANC paid by the member* **$42,500 (12.50% × 4.00 × $85,000)** |
| | *net* **$341,065** |

`engine.memberExample` (`engine.js:965–975`) hardcodes `qualifyingAvailable: 4.0` and never reads `bridgeYearsMode`, `p1BridgeYears` or `p2BridgeYears`. It does correctly read `rule`, `phi`, `discount`, `salaryGrowth` and `improvement`, which makes the omission look like an oversight rather than a choice — and means a reader has no way to know which controls Panel E honours. Two panels, one screen, mutually inconsistent scenarios, no note.

**Fix:** pass `qualifyingAvailable` from the bridge-amount control when the mode is `fixed`; or, if the profiles are deliberately fixed illustrations, say so in Panel E — "the member examples are fixed illustrations at four years of available qualifying service and do not respond to the bridge-amount control."

### F-7 — MATERIAL. Panel E's "$341,065" note is static while the figure it names moves.

**Reproduction.** Reset. Drag *Actuarial discount rate* to **4.75%** (the slider's left-hand end). Read Panel E.

- Table row: *Present value of acceleration — frozen-service* **$515,861 (net $473,361)**
- Note, two inches below: *"the source of the **$341,065** figure"*

Across the discount slider alone, profile A's frozen-service net runs **$257,099 (8.75%) → $341,065 (6.75%) → $473,361 (4.75%)**. The salary-growth and mortality-improvement sliders move it too. The note names one value as "the figure" at every setting. **Fix:** print the live figure and name $341,065 as the published central-case value — "at the published Board assumptions this is **$341,065**, which is the figure quoted in the package."

### F-8 — MATERIAL. Panel G's note hardcodes a range and a ranking, and contradicts Panel F.

`ui.js:671–674` is fixed text at every scenario: *"**This funnel is the single largest uncertainty in the model.** Across its low and high cases it alone moves the aggregate from **0.07 to 0.44** basis points."*

Both halves fail.

**The range is scenario-specific.** At the default it is right — Panel F's funnel arms are 0.0712 and 0.4428. At **φ = 0.90** the true arms are **−0.013 and −0.082 bp**, and the note still reads "0.07 to 0.44".

**The ranking contradicts Panel F.** At the default scenario Panel F ranks *Participant count (take-up)* first with a swing of **0.4247 bp** and the funnel second at **0.3716 bp**, and Panel F's own note names take-up first. At φ = 1 the funnel drops to **third**, behind φ and take-up, while Panel G still calls it "the single largest uncertainty". Two panels of one tool, each asserting a different answer to the same question.

**Fix:** compute both the range and the superlative from the live tornado, or restate as "at the published central case" and make the ranking relative — "one of the two largest sources of uncertainty, alongside take-up".

### F-9 — MATERIAL. The tornado under-tests φ by construction, hides the sign change, and does not disclose that its drivers interact.

Three defects in one panel, all about what the chart is silent on.

**(a) The φ arms do not reach the sign change.** `engine.js:1006` tests φ ∈ {0.75, 0.25} — ±0.25 around central. The control (`index.html:140`) runs 0 to 100 in steps of 5. Measured across the full control range:

| φ | Modeled pension impact | bp |
|---|---|---|
| 0.00 | $17,737,676 | 0.4682 |
| 0.25 *(tornado high arm)* | $12,444,723 | 0.3285 |
| **0.50 *(central)*** | **$7,151,771** | **0.1888** |
| 0.75 *(tornado low arm)* | $1,858,819 | 0.0491 |
| **≈ 0.838** | **$0** | **0.0000** |
| 1.00 | **−$3,434,133** | **−0.0906** |

The tornado's φ bar spans 0.049–0.329 bp. The control's actual range is **−0.091 to 0.468** — 2.0× wider, and it crosses zero. The panel that exists to answer "which assumption matters most" understates the one assumption the methodology calls "the one-sentence warning that matters most", and never shows that it changes the sign of the answer.

**(b) Interactions are not disclosed, and the two largest drivers are exactly multiplicative.** The caption says *"Each driver moved one at a time from the current scenario"* and § 15 says rows are ordered by |Δbp|. Neither says that the swings cannot be combined. They cannot:

- Longest single bar (take-up): **0.047 – 0.472 bp**
- Take-up **and** the funnel moved together: **0.018 – 1.107 bp** — 2.5× wider than the longest bar
- Take-up, the funnel **and** φ together: up to **1.926 bp**, ten times the headline
- Sum of the six non-neutral swings: **1.308 bp** — a number with no meaning, which the table nonetheless invites a reader to total

Take-up and the funnel are perfectly multiplicative, because the whole aggregate is linear in participants and in the population share. A one-at-a-time tornado is a defensible instrument, but only with that stated.

**(c) The actuarial sliders are likewise under-tested.** The discount control spans 4.75%–8.75% while the tornado tests 5.75%–7.75%. Less consequential, same shape of problem.

**Suggested fix.** Widen the φ arms to the control's own endpoints (0 and 1) so the sign change appears on the chart; add a marked zero-crossing annotation; add one sentence to the caption — "**Drivers are not independent and these swings cannot be added. Moving take-up and the population funnel together spans 0.02 to 1.11 basis points, far outside any single bar.**"; and either widen the discount arms to the control range or state that they are the published sensitivity endpoints.

### F-10 — MATERIAL. The central-case result is entirely a Plan 1 phenomenon, and the tool never says so.

Panel B displays this and leaves a reader to work it out:

| Benefit structure | Modeled pension impact | Rate contribution |
|---|---|---|
| Plan 1 | **+$7,725,894** | +0.2039 bp |
| Plan 2 | **−$574,123** | **−0.0152 bp** |
| Combined | $7,151,771 | 0.1888 bp |

At the central φ = 0.50, **Plan 2 purchasers overpay in aggregate**: $34,621 of price per participant against $24,648 of blended value. Plan 2 crosses to overpayment at **φ ≈ 0.19**, so it is already well past that line at the central case, and the entire headline cost is Plan 1. The CSV exports the row — *"Modeled pension impact — Plan 2 rate contribution, -0.02 bp"* — with no note.

This is the strongest *favourable* analytical fact in the tool, and it is also the one most likely to be misread the other way (a negative figure in a cost table). Either reading is worse than stating it. **Fix:** one sentence in Panel B's note: "At the central behavioural assumption the modeled impact is entirely a Plan 1 result; Plan 2 purchasers in aggregate pay approximately $0.57M **more** than the value they receive, because one purchased Rule-of-90 point buys only half a year of acceleration."

### F-11 — MATERIAL. Covered payroll renders as "$26048.74M".

**Reproduction.** Panel B hero tile, Panel B note, and every row of the employer-plan table.

| On screen | Should read |
|---|---|
| "basis points on **$26048.74M** of covered payroll" | $26.05bn |
| VRS State Employees — **$6275.60M** | $6.28bn |
| VRS Teachers — **$11732.11M** | $11.73bn |
| Political Subdivisions — **$8041.03M** | $8.04bn |

`ui.js:37–40`: `usdM` divides by 10⁶ and `toFixed(2)`, with no billions branch and no thousands separator. `methodology.html` § 2 writes the same published figure correctly as "$26.05bn". This is the same *class* of defect as the one the self-test caught — a magnitude rendered in the wrong unit on the panel carrying the headline figure — and it sits on the one denominator a VRS reviewer will check first. **Fix:** add a billions branch to `usdM` and a harness assertion that no rendered currency string exceeds four digits before the decimal point.

### F-12 — MINOR. Funnel step 7 excludes nobody, at every setting.

Step 6 (*Did not already purchase in the 24-month window*) and step 7 (*Able and willing to purchase, probability-weighted over available qualifying service, ASM-25*) are **identically equal** — 1,109.7 and 1,109.7 at the default, and equal to within 4 × 10⁻¹² across all 648 parameter combinations I swept. This is structural, not coincidental: the ASM-25 distribution is {1 yr: 10%, 2: 15%, 3: 20%, 4: 55%}, the purchase amount is `min(deficit, 4, qualifying)`, and every cell in the grid has a positive deficit — so `pBuy ≡ 1.0` and the step can never narrow.

Panel G therefore presents an eight-step funnel with seven filters, one of which is badged **Scenario Assumption** and cites ASM-25 for a filter it does not perform. ASM-25 governs the *amount* purchased, not the *headcount*, and the willingness filter a reader will assume step 7 performs is actually step 8. **Fix:** relabel step 7 to what it is — "Purchasable population, with the modeled distribution of available qualifying service applied to the amount each member can buy (ASM-25)" — and note that it narrows the headcount only where a cell's deficit is zero, which never occurs in the current grid. Or merge steps 6 and 7.

### F-13 — MINOR. Step 8 is mislabelled in direct-entry mode.

With *Enter counts* selected, step 8 still reads *"Expected participants at the selected take-up rate"* and cites ASM-19, when the value is the user's own entry and no take-up rate is applied. Panel G's note does disclose it in prose; the step label does not. The funnel can also widen at step 8 in this mode if the entered count exceeds the purchasable pool — which is correct behaviour and disclosed, but the label makes it look like a modelled result. **Fix:** switch the step label to "Participant count entered directly" and the badge source to "user entry".

### F-14 — MINOR. Two different modeled mean deficits on one screen.

The glossary tooltip on *eligibility deficit* says *"The modeled mean deficit in the affected population is about **2.2 years** — not four."* The control note for the bridge-amount selector, on the same screen, prints *"The modeled mean deficit is Plan 1 **3.14**, Plan 2 **3.55**."*

Both are real model outputs over different populations: **2.23** is `T3-population-by-fy.csv`'s FY2029 mean over the whole in-band exposed population (deficits censored at the four-year band), and 3.14 / 3.55 are the explorer's own purchaser-weighted means. Neither label says which population. The tooltip's figure is the one that *understates* the bridge, and it is the one a legislator hovers. **Fix:** state the population in both — "about 2.2 years across the whole near-threshold population, and 3.1 (Plan 1) / 3.6 (Plan 2) among modeled purchasers, who are selected for having a deficit to close."

### F-15 — MINOR. The glossary applies the combined basis-point figure to the state plan's rate.

*"The state employer rate is 11.07%; an impact of 0.19 basis points would take it to 11.0719%."* 0.19 bp is the **combined** figure over all three employer plans' payroll. The **state plan's own** modeled impact is **0.2245 bp**, which takes 11.07% to 11.0722%. Panel B's employer table has it right; the tooltip crosses the two views the methodology § 11.1 is at pains to keep apart. **Fix:** use 0.22 bp in the state-rate illustration, or switch the illustration to the combined payroll base.

### F-16 — MINOR. The glossary's present-value illustration does not reconcile.

*"A pension of $35,000 a year for life from age 50 has a present value of roughly $639,000."* The $639,274 is profile A's modelled present value, on an allowance of **$35,696**. The implied annuity factor is 17.9031, so $35,000 gives **≈ $626,600**. It says "roughly", so this is minor — but it is a number a reader can divide, and it does not divide. **Fix:** "$35,700 a year … roughly $639,000", or "$35,000 a year … roughly $627,000".

### F-17 — MINOR. Stale harness cross-references in the methodology.

`methodology.html` § 12.1 ("Harness group 5 asserts it") and § 13.2 ("harness group 5 asserts the tool never reports a COLA number") both point at **group 9, *Fiscal guardrails, asserted through the interface***. Group 5 is *Bridge-amount sliders in fixed mode*. The § 12.1 ("group 10"), § 4 ("group 11"), § 10.3 ("Group 6") and § 10.4 ("group 7") references are correct. A reviewer told to check group 5 will not find the assertion, which is a verifiability defect in a document whose purpose is to be checkable. **Fix:** correct both to group 9.

### F-18 — MINOR. The single-file build has a dead link when it is actually emailed alone.

`build_standalone.py` exists because, in its own words, "a legislator or committee staffer who is emailed `index.html` on its own gets a blank page." It then rewrites the cross-links to relative filenames, so a staffer emailed **only** `explorer-standalone.html` — the issue's own description of the file that travels — gets a working dashboard with a dead **Methodology** button, and the methodology page is where every formula and every qualifier lives. I verified both files render correctly alone in an empty directory and that the only remaining local references are the two cross-links to each other.

**Fix:** either inline the methodology page into the explorer behind a disclosure element, or detect a failed navigation and show "the methodology document is distributed as a separate file, `methodology-standalone.html`". At minimum, have the build print a one-line reminder that the two files must travel together.

### F-19 — MINOR. Panel E can show a negative "Present value of acceleration".

At a 4.75% discount rate, profile A's row reads *Present value of acceleration — work-to-eligibility* **−$18,763 (net −$61,263)**. The arithmetic is right: at a low discount rate the larger deferred allowance outweighs the earlier smaller one, so the acceleration destroys value for that member before any price is paid. But a row labelled "present value of acceleration" going negative is not self-explanatory. **Fix:** a conditional note — "a negative value means that on this baseline the earlier retirement is worth **less** than working on, before the purchase price."

### F-20 — MINOR. Inconsistent minus signs.

`ui.js:34` renders negative dollars with a typographic minus (−$3.43M); `ui.js:47` renders negative basis points with an ASCII hyphen (-0.09 bp). The same tile shows both. **Fix:** route `bp()` through the same sign formatting.

### F-21 — MINOR. The methodology's package list is incomplete.

`methodology.html` § 20's *Where this sits in the package* table lists 01, 02, 03/04, 05, 06, 08 and `explorer/`, omitting **`07-precedent-and-stakeholder-scan.docx`**, which exists and is listed in `README.md`. This review will add a 10. **Fix:** add 07, and 10 when it lands.

---

## 4 · The methodology page versus the code — three hand re-derivations

The mandate's first attack surface was the one real possibility that neither committed harness can exclude: *the published formulas may not be the formulas being run.* I re-derived three figures by hand from `methodology.html` alone, with the code closed, and only then compared.

**All three closed. I found no disagreement between the published formulas and the running code.** This is the most important sound result in the review.

### 4.1 The central aggregate — 0.1888 bp and $7,151,771

From § 9.4, with the Python model's own reconciliation inputs in `data/baseline.js` and φ = 0.50:

```
value = 0.50 × $3,855,044.30  +  0.50 × $25,026,853.20  =  $14,440,948.75
net   = $14,440,948.75 − $7,289,177.62                  =  $7,151,771.13
```

From § 11, with d = 6.75%, j = 3.00%, N = 20, payroll = $26,048,743,000:

```
net rate = 1.0675 / 1.03 − 1 = 0.0364077670
v        = 1 / 1.0364077670  = 0.96487119
v^20                          = 0.48908779
F(20)    = (1 − 0.48908779) / 0.0364077670 × 1.0364077670 = 14.543968
bp       = 10,000 × ($7,151,771.13 / 14.543968) / $26,048,743,000 = 0.1887748
```

Engine: `netLiability 7,151,771.12`, `bp 0.1887748`, `levelPercentAmortizationFactor(20, 0.0675, 0.03) = 14.543968`. **Identical to seven significant figures.**

### 4.2 A Panel E member example — profile A, Plan 1

Hand-derived from §§ 5.1, 5.2, 5.3, 5.5, 6, 7.1, 7.2, 7.3, 9.1, 9.2, 9.3:

| Quantity | Formula and hand result | On screen |
|---|---|---|
| Eligibility deficit | § 5.1 `max(0, 30 − 26)` = **4.0 yrs** | 4.0 years ✔ |
| Purchase | § 5.2 `min(4, 4 − 0, 4)` = **4.00** | 4.00 ✔ |
| AFC now | § 7.1 `(1/36) Σ 85,000 × 1.035^−(mo+0.5)/12` = **$80,760.6** | implied $80,760.6 ✔ |
| Price | § 6 `0.1250 × 4 × max(85,000, 80,760.6)` = **$42,500** | $42,500 ✔ |
| Age, no credit (a₀) | § 5.3 `min(max(50 + 4, 50), 65)` = **54.00** | 54.00 ✔ |
| Age, with credit (a₁) | § 5.3 `min(max(50 + 0, 50), 65)` = **50.00** | 50.00 ✔ |
| Acceleration | § 5.3 `54 − 50` = **4.00** | 4.00 ✔ |
| Annual allowance | § 7.3 `0.0170 × 26 × 80,760.6` = **$35,696.2** | $35,696 ✔ |
| Reduction factor | § 5.5 `1 − (0.005×48 + 0.006×60)` = **0.400**, rule 50/10 | 0.400, 50/10 ✔ |
| Reduced allowance | `35,696.2 × 0.400` = **$14,278.5** | $14,279 ✔ |
| Value (frozen-service) | § 9.2 `639,274 − 255,710` = **$383,564** | $383,565 ✔ |
| Net (frozen-service) | `383,565 − 42,500` = **$341,065** | $341,065 ✔ |
| Net (work-to-eligibility) | § 9.3 `21,000 − 42,500` = **−$21,500** | −$21,500 ✔ |

The COLA delay is correctly **zero** here: § 8.5 applies the § 51.1-166 D 4 delay only below 20 years of creditable service, and profile A retires with 26.

### 4.3 A Panel F sensitivity row — the φ low arm

From § 15 the low arm is φ = 0.75; from § 9.4 and § 11, holding F(20) and payroll fixed per § 11.2:

```
value = 0.75 × $3,855,044.30 + 0.25 × $25,026,853.20 = $9,147,996.52
net   = $9,147,996.52 − $7,289,177.62                 = $1,858,818.90
bp    = 10,000 × ($1,858,818.90 / 14.543968) / $26,048,743,000 = 0.049065
```

Engine tornado, φ row, low arm: **0.0491 bp**, net **$1,858,819**. **Match.**

**What I could not close by hand, and what that leaves exposed.** The two annuity factors themselves — 17.9031 at age 50 and 13.0813 deferred to 54 — require the full Pub-2010-based `q_x` tables, the log-linear interpolation of § 8.1, the improvement scale of § 8.2, the 50/50 blend of § 8.3 and the survival recursion. I verified that the published formulas in §§ 8.1–8.6 are the formulas the code executes, and that every quantity downstream of the factors is exactly proportional to them. **I did not verify that the mortality table transcribed into `data/baseline.js` matches the VAL2025 exhibit.** That is the one place where a transcription error would pass every check in the package, because `reconcile.js` compares the engine against the Python model and both read the same table. **It should be verified against the published exhibit by someone, once.**

---

## 5 · Fiscal assumption challenge — the load-bearing assumption

**The load-bearing assumption is φ.** Not the discount rate, not mortality, not the funnel: φ, because it alone determines the **sign** of the answer, and because the model is a 50/50 average of two baselines whose per-member results point in opposite directions.

**The test.** Move φ across the range the control permits, holding everything else at the published central case.

| φ | Modeled pension impact | bp | Reading |
|---|---|---|---|
| 0.00 | $17,737,676 | 0.4682 | every purchaser leaving anyway; fully subsidised |
| 0.25 | $12,444,723 | 0.3285 | model's own low case |
| **0.50** | **$7,151,771** | **0.1888** | **the headline** |
| 0.75 | $1,858,819 | 0.0491 | model's own high case — **26% of the headline** |
| **0.838** | **$0** | **0.0000** | **break-even** |
| 1.00 | **−$3,434,133** | **−0.0906** | purchasers overpay; **the plan is $3.43M better off** |

**The result.** If φ is wrong in the direction the model's own documentation says it is wrong, the answer is not "somewhat smaller". **Above φ ≈ 0.84 the bill stops costing the pension system money and starts making it money** — and the tool's headline figure becomes a statement with the wrong sign. At φ = 0.75, the *high* case the model itself tests, the figure is $1.86M, not $7.15M.

**Why I think the central case is the optimistic end, which is what makes this a challenge rather than an observation.** The model concedes the point and then does not act on it. `methodology.html` § 9.4: *"φ is not even exogenous: a member decides whether to buy **after** knowing which type they are, and self-selection runs toward the subsidised end. Self-selection is not modeled."* That is exactly right, and it means the *distribution* of defensible φ values is not symmetric around 0.50 — it is skewed **low**, toward more subsidy and a *larger* cost. Setting φ = 0.50 and calling it central is choosing the midpoint of an interval the model has already argued is not centred there. A reviewer will put it more bluntly: an optional purchase will be bought disproportionately by the people it is worth buying for, which is the people who were leaving.

**So the challenge has two parts, pointing opposite ways, and both belong in the memo.** The *downside* exposure is φ below 0.50, where $7.15M grows toward $17.7M at the limit. The *credibility* exposure is φ above 0.84, where the sign flips and anyone who has quoted "0.19 basis points" as a cost has quoted a number whose sign depends on a dial. The first is a fiscal risk the package should own; the second is a framing risk, and it is why F-4 and F-9 are rated material.

**Secondary challenge — take-up × funnel, which are not independent.** The two largest bars on the tornado multiply rather than add, because the aggregate is linear in both. Moved together they span **0.018 to 1.107 bp**, and with φ as well, up to **1.926 bp** — ten times the headline. No panel shows that, and the tornado's one-at-a-time construction actively conceals it.

**Recommendation to the Fiscal & Impact Modeler.** Report the φ range as the primary result and the central case as one point inside it; state the break-even φ (≈ 0.84) explicitly; and add a two-way take-up × funnel grid, because the one-at-a-time tornado cannot represent a multiplicative pair.

---

## 6 · Citation verification

I re-opened the load-bearing citations rather than reading the registry's summaries of them.

| Claim | Citation | Verified against | Result |
|---|---|---|---|
| ANC 12.50% Plan 1 / 10.74% Plan 2, effective July 1, 2025, for **ordinary non-hazardous** members | SRC-08 | VRS purchase-of-prior-service rate materials and Board B&A materials, June 2025 | **HOLDS.** The published language is "for regular VRS members", which also confirms that separate rates exist for other categories — so the tool's explicit B 4 public-safety caveat is correct and necessary, not defensive padding |
| § 51.1-166 D 4 delays the post-retirement supplement for a retiree with fewer than 20 years of creditable service, measured from the date of unreduced eligibility | § 51.1-166 D 4 | Official text: *"Any other person who has less than 20 years of creditable service must receive that allowance for one full calendar year after the date he would otherwise have been eligible for an unreduced allowance…"* | **HOLDS, and the implementation is right.** The ordinary rule is one year after retirement; D 4 is one year after the unreduced-eligibility date; so the incremental delay is exactly the acceleration, which is what `engine.js:350` applies. The methodology's "almost no purchaser has fewer than 20 years" also holds — 18 cells, 1,264 of 57,018 exposed headcount, 2.2% |
| State health insurance credit is $4.25/month per year of creditable service | § 51.1-1400 | Official text: $4.00, increased to **$4.25 effective July 1, 2024** | **HOLDS for state employees** |
| The same figure is applied to teachers and political subdivisions | § 51.1-1400 only | § 51.1-1401 (**$4.00**, mandatory) and § 51.1-1402 (**$1.50** max, **employer-elective**) | **DOES NOT HOLD** — see **C-2**. The citation is right for the population it names and is being used for two populations it does not cover |
| The VRS Board impact statement is required under § 30-19.1:7 | § 30-19.1:7 | Official text: the Board of Trustees prepares a statement on financial impact and policy implications, transmitted to the Clerks, the Commission on Local Government, House Appropriations and Senate Finance | **HOLDS.** The disclaimer's characterisation is accurate, and the statement is genuinely mandatory for this bill — which is what makes **F-2** a blocker rather than a style note |
| 112.8% of salary per year would be an actuarially equivalent price in the maximum Plan 1 case | internal | `valueSub / (k × priceBase)` = 383,565 / (4 × 85,000) = **1.1281** | **HOLDS** — and it is the most quotable number in the package |
| $341,065 is the **maximum** modeled net value above the purchase price under the frozen-service scenario | internal | All 7 published profiles **and** all 1,025 exposure cells | **DOES NOT HOLD** — see **F-3**. True across the seven profiles; false across the model's own grid, which reaches $418,729 and exceeds $341,065 in every projection year |
| The modeled mean eligibility deficit is "about 2.2 years" | internal | `T3-population-by-fy.csv` (2.23, whole in-band population) vs the explorer's purchaser-weighted 3.14 / 3.55 | **HOLDS for the population it is computed over, which is not stated** — see **F-14** |
| The funnel moves the aggregate from 0.07 to 0.44 bp | internal | Tornado funnel arms: 0.0712 / 0.4428 at default; **−0.013 / −0.082 at φ = 0.90** | **HOLDS at the default scenario only**, and the text is static — see **F-8** |
| The registry "cannot drift from the model that produced the numbers" | internal | `calibrate_explorer.py` writes `baseline.js`; `dist/` is byte-identical to a fresh rebuild | **HOLDS** |

**Not re-verified, and I am naming them rather than implying coverage:** the employer DB rates (11.07% / 12.20% / 10.59%), the covered payrolls ($6.28bn / $11.73bn / $8.04bn), the 366,289 active members, the 6.75% discount rate, the 3.00% payroll growth, the 20-year amortisation period, the published age × service grid (SRC-18), the Pub-2010 mortality tables (SRC-20/21), the reduction-factor construction (SRC-12), and the DHRM slide-8 6% veteran share. These are VAL2025 / ACFR2025 / DHRM2025 figures; I confirmed they are internally consistent and that the explorer uses them as the registry describes, but I did not re-read the source exhibits. **Statutory Researcher should close SRC-15, SRC-18, SRC-20, SRC-21 and SRC-24 against the published documents.**

---

## 7 · Provenance audit — Panel G badges

The mandate's sharpest question: *is anything badged **Published Fact** actually derived?*

| Step | Value | Badge | Verdict |
|---|---|---|---|
| 1 Active members, three VRS plans | 366,289 | Published Fact | **Defensible, with a labelling caveat.** 366,289 is the sum of three published counts (ST 81,274 + TC 160,949 + PS 124,066). Summing published figures is still published, but **"three VRS plans" is ambiguous in this tool's own vocabulary** — the explorer uses "plan" for both the benefit structures (Plan 1 / Plan 2 / Hybrid) and the employer plans (State / Teachers / Political Subdivisions), and this is the latter. A reader who reconciles against `active_by_plan` (110,474 + 67,333 + 200,253 = 378,060, the whole system) will get a different number. **Suggest: "Active members, three VRS employer plans — State, Teachers and Political Subdivisions (June 30, 2025)."** Minor |
| 2 Exposed to a purchase opportunity | 57,018 | Derived Estimate | **Correct badge, and correctly computed.** I checked the arithmetic I most expected to be wrong: whether the ten fiscal-year cells double-count the same member. They do not. `calibrate_explorer.py:86` counts each cell only in the **first** year it enters the band (`exposed = n if (first_year or not was_in_band) else 0.0`), so 57,018 is **distinct members**, not member-years, and is a true subset of step 1. **This is the finding I expected and did not get.** One presentational note: FY2029 contributes 14,238 (the standing stock) against roughly 4,000 a year thereafter, and nothing on the panel explains the step |
| 3 Estimated veterans | 2,416.6 | Derived Estimate | **Correct, and well sourced.** The badge is Derived rather than Published, and the source line says outright that only the 6% state share is published while teacher and political-subdivision shares "are ASSUMED (ASM-15) — no published figure exists." This is the most honest step in the funnel |
| 4 Qualifying active duty service | 1,933.3 | Scenario Assumption | **Correct** |
| 5 Not barred by military retired pay | 1,585.3 | Scenario Assumption | **Correct**, and the § 12736 caveat is carried |
| 6 Did not already purchase | 1,109.7 | Scenario Assumption | **Correct** |
| 7 Able and willing to purchase | 1,109.7 | Scenario Assumption | **Badge correct; the step is not a step** — see **F-12** |
| 8 Expected participants | 221.9 | Scenario Assumption | **Correct in model mode; mislabelled in direct-entry mode** — see **F-13** |

**No number badged "Published Fact" is derived.** The one Published Fact badge in the funnel is a sum of three published counts, which I accept, subject to the labelling caveat at step 1. **The most damaging single defect this tool could ship is not present.**

**Monotonicity confirmed independently.** I swept 648 combinations — three settings of each veteran share, two of the qualifying share, two of the retired-pay bar, two of the prior-purchase share, two take-up rates — and the worst step-to-step widening across all of them was **4 × 10⁻¹²**, i.e. floating-point noise at the step-6/step-7 identity. The funnel cannot widen. The fix described in `engine.js:898–907` and `methodology.html` § 4 holds, and it holds for the reason stated: weighting the blended veteran share by exposed near-threshold headcount makes step 3 identically `Σ_emp exposed × share`.

---

## 8 · What I checked and found sound

Stated explicitly, because a findings list without this section is not a review.

1. **The published formulas are the formulas being run.** Three independent hand re-derivations from `methodology.html` alone — the central aggregate, a Panel E member example and a Panel F sensitivity row — all closed, to seven significant figures on the aggregate. I looked for a divergence between the documented and executed arithmetic and did not find one. This was the mandate's first priority and it is clean.
2. **No workforce or payroll control moves any pension figure.** Not approximately — **exactly.** I measured the change in combined net liability, combined bp, price, blended value, and both benefit-structure net liabilities at replacement 75%, replacement 100%, 10% of positions eliminated and a 12-month vacancy. Every delta was `0.000e+0`, in double precision, not within a tolerance. A legislator can verify this live, as the methodology claims.
3. **At 100% replacement with nothing eliminated and no vacancy, the payroll effect is exactly zero** — `0`, by construction, not by rounding. The guardrail is real; **F-1** is that it is stated without its conditions, not that it is absent.
4. **A refilled position never produces a full-salary saving.** Only the compensation differential and the related employer-contribution differential enter the permanent effect, and the non-replacement and vacancy components are reported on separate lines in the tiles, the table and both exports. The mechanism is right.
5. **HIC and COLA sit outside every basis-point figure.** `ancillary` is a separate branch of the result object; no path from it reaches `liabilityToBasisPoints`. COLA carries an explicit `colaQuantified: false` and is never given a number anywhere, including in both exports. **C-2** is about the HIC *rate*, not about leakage into the rate figures.
6. **Plan 1 and Plan 2 stay separate until the final aggregation.** Accumulators are per benefit structure and per benefit structure × employer plan; the salary override is applied as a per-structure multiplier; participant scaling is per structure. I confirmed the benefit-structure rate contributions sum **exactly** to the combined figure (0.203929 + −0.015154 = 0.188775).
7. **Hybrid members are excluded unless the Hybrid variant is deliberately activated.** `plansWanted` is `['P1','P2']` unless `includeHybrid`, and the scenario, the preset and every hybrid tile are labelled "not the bill".
8. **Nothing is labelled "Savings."** I searched the rendered text of the shipped file. The only labels in use are *Modeled pension impact*, *Modeled payroll effect*, *Modeled workforce effect* and *Combined scenario effect*, from a single source at `registry.js:169–174`. The naming discipline holds.
9. **The funnel cannot widen** — 648 combinations, worst case 4 × 10⁻¹². See § 7.
10. **Funnel step 2 does not double-count members across fiscal years.** This was the error I most expected to find in the population arithmetic and it is not there.
11. **The required 0.19 bp qualifier travels with the figure.** It is on Panel B's note, in the `employer contribution-rate basis points` glossary entry, in the `QUALIFIER` constant used by **both** exports, and in `methodology.html` § 11.3. I read the handout and the CSV end to end: **both carry the full qualifier and the full § 30-19.1:7 disclaimer.** I found no bare use of 0.19 bp. The mandate asked me to find the next one after the tooltip; **there is not one.**
12. **The $341,065 figure does not appear in the handout or the CSV**, so it cannot be quoted from an export without the Panel E context. The defect at **F-3** is the word "maximum", not an unqualified export.
13. **The on-screen disclaimer is genuinely unmissable.** `.masthead` is sticky, and the disclaimer was still in the viewport after jumping to Panel D. **F-2** is confined to print.
14. **`dist/` is not stale.** I rebuilt both files from the current sources into a scratch directory and compared byte for byte with the committed `dist/`: **identical**. The inlined payloads match the current `css/`, `data/` and `js/`.
15. **Both single-file builds render correctly alone in an empty directory.** I copied only the two files into an empty scratch directory, opened the explorer from there in headless Chrome, and drove it through presets, every slider, both segmented controls and both exports. All seven panels rendered, every figure computed, and **zero page errors** across the sweep. The only remaining local references are the two cross-links to each other — see **F-18**.
16. **The amortisation basis is handled as documented.** Moving the discount rate does not move the amortisation rate unless the user ticks the box, exactly as `methodology.html` § 11.2 states, which is what lets the tool reproduce the published sensitivity table. The level-percent-of-payroll factor reproduces by hand to six decimals.
17. **The ANC rate qualification is correct and complete.** "Ordinary non-hazardous" appears in the glossary, in `methodology.html` § 6, in § 19's known-limitations list and in the Official VRS Data contract, and the pre-2014 § 51.1-153 B 4 public-safety rate is flagged as **requiring VRS confirmation** and as "an open item, not a modelling choice" in all four places. I verified against the published rate materials that "regular VRS members" is the right qualifier.
18. **The salary override is exactly what the methodology claims** — a post-hoc multiplier justified by degree-one homogeneity. I confirmed the claim holds structurally: the purchase amount, every age and every reduction factor are independent of pay.
19. **Panel E handles the sign correctly.** The verdict line flips to **Overpays** at high φ, and both pure baselines are reported alongside the blend. **F-4** is Panel D's hardcoded clause, not Panel E's logic.
20. **Negative acceleration windows do not occur.** I was concerned that the § 5.3 B 2 formula caps the unreduced age at 65 without regard to attained age, which would give a member above 65 a retirement age in the past. I evaluated every cell: **zero cells** produce a modelled retirement age below the member's current age. The grid tops out at age 66.5 and the cap never bites below attained age.
21. **The one-at-a-time tornado is correctly constructed as far as it goes**: it swings around the *selected* scenario rather than the central case, it orders by |Δbp|, and it sorts the two pension-neutral drivers to the bottom and flags them rather than drawing them as unexplained zero bars. **F-9** is about range and disclosure, not construction.
22. **The committed harnesses are real tests, not assertions of success.** `reconcile.js` compares against committed CSV tables rather than a snapshot of itself, and `standalone.js` drives the shipped document in a real browser rather than importing the module. The architecture of the verification is right. What it cannot do is read a sentence next to a number, which is where every blocker in this review lives.

---

## 9 · What I could not verify

Stated plainly, as the mandate requires.

1. **The mortality tables themselves.** I verified that §§ 8.1–8.6's published formulas are the formulas the code runs, and that every downstream quantity is proportional to the resulting factors. I did **not** verify that the `q_x` values transcribed into `data/baseline.js` match the VAL2025 published exhibits. **A transcription error there would pass every check in this package**, because `reconcile.js` compares the engine against the Python model and both read the same transcription. This is the largest unclosed verification gap in the tool, and it needs one person to read the exhibit once.
2. **The exposure grid against its published source.** I verified that `cells.js` is internally consistent, that it does not double-count members across fiscal years, and that it reconciles to `T3-population-by-fy.csv`. I did not verify that the SRC-18 published age × service distribution was transcribed correctly, nor the ASM-12 political-subdivision construction.
3. **The published rates, payrolls, headcounts and amortisation periods** — SRC-15 and the FY2027–FY2028 certified employer rates. Used as the registry describes; source exhibits not re-read.
4. **The DHRM slide-8 6% veteran share**, which is the single published anchor the entire population funnel rests on. I did not open the slide deck.
5. **Whether a hazardous-duty ANC rate exists for pre-2014 § 51.1-153 B 4 members, and what it is.** The tool correctly flags this as requiring VRS confirmation. I confirmed the published rates are for "regular VRS members"; I could not establish what the alternative rate would be, so I cannot say which way the B 4 population moves the answer.
6. **Browser coverage.** All interface testing was in headless Chrome 1500 × 2400. I did not test Safari, Edge, Firefox, a real print driver, or the handout opening in Word — and the handout is explicitly advertised as opening in Word.
7. **Whether the φ = 0.50 central value has any empirical support anywhere.** I looked for a basis and found none, which is consistent with the tool's own statement. I cannot certify a negative, only report that I did not find one.
8. **The constitutional and drafting questions about the bill itself.** This review is scoped to the explorer. The federal tax questions (IRC § 415(n)(3)(A) / § 415(c), 10 U.S.C. § 12736), the approved-leave / long-term-disability question under subdivision E 3, and the § 30-19.1:7 statement all remain open on the package and are correctly listed in `methodology.html` § 19.

---

## 10 · Recommended disposition

Policy Director's call, not mine. My recommendation, in priority order:

**Before the tool is driven in front of anyone outside the Lab — the four blockers.**

1. **F-1** — make every "zero at 100%" claim conditional and sign-aware, in the interface, in the methodology, in the ladder caption and in both exports; then re-cut the harness assertion into a ν × months grid. *This is the one that produces a savings claim on screen.*
2. **F-2** — move `.disclaimer` out of `.masthead` and give it an explicit print rule. *One line of HTML and one of CSS.*
3. **F-3** — correct the "$341,065 maximum" wording in Panel E, `methodology.html` § 9.6 and `README.md`. **Editor: this must appear in the memo's risk section.** *Wording only; no number changes.*
4. **C-1** — fix the per-rung vacancy in the replacement ladder and the vacancy column in its table.

**Before external use — the material findings.** C-2 (HIC rates), F-4 (sign-aware Panel D), F-5 (the literal tags), F-6 (Panel E and the bridge control), F-7 (the static $341,065 note), F-8 (Panel G's hardcoded range and ranking), F-9 (φ arms, the sign crossing, and an interactions disclosure), F-10 (one sentence that Plan 2 overpays), F-11 (the billions branch).

**At convenience.** C-3, C-4, C-5, F-12 through F-21.

**Handoffs.**
- **Drafting Specialist / the tool's author** — all 26 findings are specified to file and line with a reproduction path. None requires asking me what I meant.
- **Fiscal & Impact Modeler** — § 5. Report the φ range as the primary result with the break-even at φ ≈ 0.84 stated, and add a two-way take-up × funnel grid, because a one-at-a-time tornado cannot represent a multiplicative pair.
- **Statutory Researcher** — close SRC-15, SRC-18, SRC-20, SRC-21 and SRC-24 against the published exhibits. § 9 items 1–4 are the priority, and item 1 is the one that no test in this package can catch.
- **Editor** — **F-3**, **F-1** and **F-9** must appear in the memo's risk section. F-3 because the figure is quoted package-wide; F-1 because it is the screen an opponent will photograph; F-9 because "0.19 basis points" is a number whose sign depends on a dial, and the memo should say so before a committee does.
- **Stakeholder Analyst** — two parties bear a real cost and appear nowhere in the stakeholder map, both surfaced by **C-2**: **participating political subdivisions that have *not* elected the § 51.1-1402 health insurance credit**, whose retirees get no credit at all while the model prices them at the state rate; and **local school boards**, who fund the § 51.1-1401 teacher credit at $4.00 and are the largest participant cohort in the model (74.8 of 221.9).

---

## 11 · One closing observation, offered as the author asked for it

The mandate said: *self-review catches mechanical errors and misses framing ones.* That is exactly what happened, and the shape of it is worth recording.

Twenty-one of twenty-six findings are framing. Four of the four blockers are framing or a framing-driven arithmetic slip. The engine survived a hand re-derivation of its central figure to seven significant figures. The guardrails hold bit-exactly. The funnel cannot widen across 648 parameter combinations. **The model is right and the sentences are wrong**, and the sentences are wrong in a consistent direction: each one states a guardrail *unconditionally* which the code implements *conditionally*. "At ρ = 100% the payroll effect is exactly zero." "The maximum modeled net value." "The single largest uncertainty." "A cost to the plan." Every one of those is true in the central case and false somewhere the sliders reach, and in each case the code is more careful than the prose written to defend it.

That is a specific, fixable failure mode, and it has a specific cause: the committed harnesses can compare a number to a number but cannot compare a number to the claim printed beside it. The two tests that look like they cover the worst finding — the ρ = 100% guardrail and the replacement ladder — both pin the confounding sliders to zero before asserting. They are not bad tests. They are tests written by someone who knew the right answer, which is the one thing a test cannot be written by.

**The structural recommendation, beyond the 26 findings:** for each unconditional claim in the interface and the methodology, add a harness assertion that tries to **falsify** it across the full range of every control the claim depends on — and let the assertion fail where the claim is conditional, so the prose has to be weakened rather than the test narrowed. That is the check that would have found F-1, C-1 and F-8 without a reviewer. It is also, in the end, the only kind of check that can.

---

**Prepared by Policy Development Team using legal, policy, and financial analysis tools, pending review by veterans' legal counsel.**

*Internal risk analysis. Not legal advice. No counsel has reviewed or cleared this tool. Pre-decisional and internal.*
