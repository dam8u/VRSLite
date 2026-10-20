# Military Service Retirement Bridge — Legislative Scenario Explorer

Interactive policy-analysis model for the proposed **Military Service Retirement Bridge**
(new Va. Code **§ 51.1-142.4**). Built for Virginia legislators, JLCVSO members, VRS
reviewers and policy staff.

> **This tool is an illustrative policy-analysis model. It is not an actuarial
> certification, the VRS Board impact statement required under § 30-19.1:7, or a General
> Assembly fiscal impact statement.** It is not a savings calculator and does not advocate
> a result.
>
> Prepared by Policy Development Team using legal, policy, and financial analysis tools,
> pending review by veterans' legal counsel.

Bill version **1.4** operative text · package version **1.5**. The fiscal model is
**complete for bill version 1.1; a refresh against the bill as introduced is required
before external use.**

## Open it

No server, no build step, no dependencies.

| | |
|---|---|
| **Start here if you are new to it** | open `walkthrough.html` — ten steps naming what to choose and what each screen means |
| **The dashboard** | open `index.html`, then press **Guided walk-through** for the same ten steps in a panel beside the controls |
| **Email it to someone** | send any one of the three files in `dist/` — each is self-contained, and each carries the other two inside it |

The three single-file builds are `dist/explorer-standalone.html`,
`dist/walkthrough-standalone.html` and `dist/methodology-standalone.html`. They are
generated; edit the sources, not `dist/`.

## What is where

| Path | Role |
|---|---|
| `index.html` | The dashboard — Panels A–G, HIC & COLA, the source registry, and the walk-through drawer |
| `walkthrough.html` | The **guided walk-through**: what to choose, in order, and why each screen matters |
| `methodology.html` | **Every formula**, with its statutory or published source |
| `js/engine.js` | The calculation engine. No DOM reference; loadable under Node |
| `js/ui.js` | Presentation only. Contains no formula |
| `js/registry.js` | Plain-language glossary and the outstanding-confirmation list |
| `js/walkthrough.js` | The walk-through's ten steps and the checkable list of every figure they quote. **One source** for both the page and the drawer |
| `css/explorer.css` | Light and dark, each defined explicitly |
| `data/baseline.js` | Published inputs, actuarial tables, profiles. **Generated** |
| `data/cells.js` | The age × service × fiscal-year exposure grid. **Generated** |
| `test/reconcile.js` | 156-check regression harness: the **engine** against the Python model |
| `test/standalone.js` | 2,064-check output-accuracy harness: the **shipped single file**, driven through every control in a real browser |
| `test/chrome.js`, `test/inpage.js` | DevTools-protocol driver and the probe it injects. No npm dependency |
| `build_standalone.py` | Packaging only — inlines everything into `dist/` |

The engine is a port of the committed Python fiscal model (`../fiscal-model/actuarial.py`,
`price_vs_value.py`, `aggregate.py`, `population.py`). It is **reconciled** against that
model's published tables rather than asserted to agree with them.

## Rebuild and verify

```sh
# 1. Re-run the committed Python model and regenerate the browser inputs
cd ../fiscal-model
python3 calibrate_explorer.py      # writes out/explorer-baseline.json,
                                   # ../explorer/data/baseline.js, data/cells.js

# 2. Reconcile the browser engine against the Python model
cd ../explorer
node test/reconcile.js             # 156 checks in 8 groups

# 3. Rebuild the single-file copies
python3 build_standalone.py        # writes dist/

# 4. Test the file that actually ships (needs a local Chrome; CHROME_PATH to override)
node test/standalone.js            # 2,064 checks in 20 groups
node test/standalone.js --quick    # fewer settings per slider
```

The two generated data files carry a "do not edit by hand" header for a reason: the only
way to change a number in this tool is to change the Python model and regenerate. That is
what keeps the dashboard and the committed fiscal model from drifting apart.

## Two harnesses, because they answer different questions

`test/reconcile.js` proves the **engine** reproduces the committed Python fiscal model. It
imports `js/engine.js` directly, so it says nothing about the file a legislator is
actually sent. A control can be wired to the wrong parameter, display one value and feed
the model another, or leave a panel holding a stale number, and that harness would pass
throughout.

`test/standalone.js` tests `dist/explorer-standalone.html` **as a document**. It opens the
shipped file in a real headless browser and, for every slider, numeric entry, checkbox,
select, mode segment and preset, checks that

1. the control's **displayed value matches the value it holds**;
2. **every figure on every panel** is the one the model returns for the parameters the
   *visible controls* describe — reconstructed independently of the interface's own
   internal state;
3. the fiscal guardrails and dimensional sanity checks hold, whatever the engine says.

It also asserts the inlined payloads are byte-identical to the current sources, so a stale
`dist/` fails loudly instead of being tested in place of the real application.

**Group 20 tests the walk-through against the model it narrates.** Prose keeps its old
numbers after a model changes, so every figure the walk-through quotes is recorded in
`js/walkthrough.js` next to the settings that produce it; group 20 drives the shipped
document to those settings and requires the figure to be rendered **on the panels**. The
screen is read from the panels only, never from the drawer, so the check cannot pass by
finding the sentence that makes the claim.

## Guardrails, enforced by test rather than by convention

Group 5 of `test/reconcile.js` and groups 9–11 of `test/standalone.js` assert each of
these, so they cannot be lost in a later edit:

- **A refilled position never produces a full-salary saving.** Only the compensation
  differential counts. At 100% replacement the payroll effect is **zero by
  construction**.
- **No workforce or payroll control moves any pension figure.** Checked at 100% and 75%
  replacement and at 10% of positions eliminated. A legislator can verify it live by
  dragging the replacement slider and watching Panel B not move.
- **Hybrid participants are excluded** from the primary model (decision resolved
  October 19, 2026), and are included only when a user deliberately activates the
  separate Hybrid scenario.
- **The COLA exposure is never quantified**, because no figure in this package quantifies
  it.
- **Health insurance credit and COLA sit outside every basis-point figure**, on separately
  funded trusts. HIC and COLA follow the retirement date, so preventing earlier
  commencement would require separate statutory changes outside the bridge; the proposal
  deliberately accepts and discloses the earlier commencement.
- **Plan 1 and Plan 2 stay separate** until the final aggregation, and moving one plan's
  bridge-amount slider leaves the other untouched.
- **A vacancy of *n* months costs *n* months of pay**, not *n*/12 of the whole
  acceleration window — the window averages about 1.9 years, so the two differ by roughly
  a factor of two.
- **The population funnel never widens.** Each step is a true subset of the one above it
  at any setting of the three veteran-share sliders.
- **Nothing is ever labelled "Savings."** The permitted labels are *Modeled pension
  impact*, *Modeled payroll effect*, *Modeled workforce effect* and *Combined scenario
  effect*.
- **Every figure the walk-through quotes is on screen at the settings it names.** Group 20
  drives each claim and fails if the dashboard does not display it.

## The two things to read first

1. **The *No Workforce Savings* preset.** It shows the pension impact standing alone, with
   no workforce offset at all.
2. **The behavioural assumption φ.** It decides the *sign* of the per-member result, and no
   published data bears on it. Take the range across φ, not the central case.

Every basis-point figure in this tool is the **modeled retirement-plan employer
contribution impact** and **excludes the separately funded health insurance credit and
COLA effects, including unquantified COLA exposure.**

See `methodology.html` § 19 for the full list of known limitations, and § 17 for the
**Official VRS data mode** contract — the estimated inputs are designed to be replaced by
VRS member-level aggregates without rewriting the model.
