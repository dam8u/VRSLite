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

Bill version **1.2** operative text · package version **1.3**. The fiscal model is
**complete for bill version 1.1; a version 1.2 refresh is required before external use.**

## Open it

Two ways, both with no server, no build step and no dependencies.

| | |
|---|---|
| **Working copy** | open `index.html` in any browser |
| **Email it to someone** | send `dist/explorer-standalone.html` — one self-contained file, nothing else needed |

`dist/methodology-standalone.html` is the matching single-file methodology page. Both
standalone files are generated; edit the sources, not `dist/`.

## What is where

| Path | Role |
|---|---|
| `index.html` | The dashboard — Panels A–G, HIC & COLA, and the source registry |
| `methodology.html` | **Every formula**, with its statutory or published source |
| `js/engine.js` | The calculation engine. No DOM reference; loadable under Node |
| `js/ui.js` | Presentation only. Contains no formula |
| `js/registry.js` | Plain-language glossary and the outstanding-confirmation list |
| `css/explorer.css` | Light and dark, each defined explicitly |
| `data/baseline.js` | Published inputs, actuarial tables, profiles. **Generated** |
| `data/cells.js` | The age × service × fiscal-year exposure grid. **Generated** |
| `test/reconcile.js` | 98-check regression harness against the Python model |
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
node test/reconcile.js             # 98 checks in 8 groups

# 3. Rebuild the single-file copies
python3 build_standalone.py        # writes dist/
```

The two generated data files carry a "do not edit by hand" header for a reason: the only
way to change a number in this tool is to change the Python model and regenerate. That is
what keeps the dashboard and the committed fiscal model from drifting apart.

## Guardrails, enforced by test rather than by convention

Group 5 of `test/reconcile.js` asserts each of these, so they cannot be lost in a later
edit:

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
- **Plan 1 and Plan 2 stay separate** until the final aggregation.
- **Nothing is ever labelled "Savings."** The permitted labels are *Modeled pension
  impact*, *Modeled payroll effect*, *Modeled workforce effect* and *Combined scenario
  effect*.

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
