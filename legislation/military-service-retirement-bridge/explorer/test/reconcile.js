#!/usr/bin/env node
/* =====================================================================
   Regression test: does the browser calculation engine reproduce the
   committed Python fiscal model?

   The explorer is only defensible if it returns the same numbers as the
   model the memorandum, the briefs and the bill drafting notes all cite. Any
   drift here means the tool contradicts the package, so this runs as a hard
   pass/fail against the committed CSV tables rather than against a snapshot
   of itself.

       node explorer/test/reconcile.js

   Targets are taken from:
     fiscal-model/out/T1-price-vs-value.csv   per-member price and value
     fiscal-model/out/T4-rate-impact.csv      aggregate and per-plan bp
     fiscal-model/out/T5-sensitivity.csv      central case and swings
     fiscal-model/out/T8-workforce.csv        payroll effect
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');

const here = __dirname;
const dataDir = path.join(here, '..', 'data');

/* load the generated data files, which are plain window assignments */
const sandbox = { window: {} };
for (const f of ['baseline.js', 'cells.js']) {
  const src = fs.readFileSync(path.join(dataDir, f), 'utf8');
  new Function('window', src)(sandbox.window);
}
const Engine = require(path.join(here, '..', 'js', 'engine.js'));
Engine.init(sandbox.window.VRS_BASELINE, sandbox.window.VRS_CELLS);

let pass = 0, fail = 0;
const failures = [];

function check(label, actual, expected, tol, unit) {
  const d = Math.abs(actual - expected);
  const ok = d <= tol;
  if (ok) pass++; else { fail++; failures.push(label); }
  const fmt = (x) => (unit === '$' ? '$' + x.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : unit === 'bp' ? x.toFixed(4)
    : x.toLocaleString('en-US', { maximumFractionDigits: 3 }));
  console.log(`  ${ok ? 'PASS' : 'FAIL'}  ${label.padEnd(52)} ` +
    `got ${fmt(actual).padStart(14)}   want ${fmt(expected).padStart(14)}` +
    (ok ? '' : `   DIFF ${fmt(d)}`));
}

console.log('\n=== 1. Per-member price and value (T1-price-vs-value.csv) ===');
/* Profile A — the memo's own example and the source of the $341,065 figure */
const A = Engine.memberExample('A', {});
check('A: price paid', A.pricePaid, 42500, 1, '$');
check('A: PV allowance under the bill', A.propPv, 639274, 2, '$');
check('A: PV baseline allowance (SUB)', A.subPv, 255710, 2, '$');
check('A: value of acceleration (SUB)', A.valueSub, 383565, 2, '$');
check('A: net per-member subsidy (SUB)', A.netSub, 341065, 2, '$');
check('A: value of acceleration (WTE)', A.valueWte, 21000, 2, '$');
check('A: net per-member (WTE, overpays)', A.netWte, -21500, 2, '$');
check('A: cost recovery %', A.recoverySub, 11.1, 0.05, 'n');
check('A: breakeven rate (% of salary/yr)', A.breakevenRateSub * 100, 112.8, 0.05, 'n');
check('A: SUB reduction factor (50/10)', A.subFactor, 0.400, 0.0005, 'n');
check('A: years of acceleration', A.accelerationYears, 4.00, 1e-9, 'n');

/* Profile D — Plan 2, where four points buy only two years */
const D = Engine.memberExample('D', {});
check('D: price paid', D.pricePaid, 38664, 1, '$');
check('D: value of acceleration (SUB)', D.valueSub, 60451, 2, '$');
check('D: net per-member subsidy (SUB)', D.netSub, 21787, 2, '$');
check('D: years of acceleration (2, not 4)', D.accelerationYears, 2.00, 1e-9, 'n');
check('D: annual allowance under the bill', D.propAnnual, 34211, 1, '$');

/* Profile B, C, E, F, G — the rest of T1 */
const T1 = {
  B: { price: 20000, sub: 121480, wte: 13994, accel: 2.00 },
  C: { price: 27000, sub: 92368, wte: 21273, accel: 3.00 },
  E: { price: 25132, sub: 44706, wte: 10583, accel: 1.50 },
  F: { price: 32650, sub: 41572, wte: 9821, accel: 2.00 },
  G: { price: 22712, sub: 12355, wte: 2035, accel: 1.00 }
};
for (const id of Object.keys(T1)) {
  const c = Engine.memberExample(id, {});
  check(`${id}: price paid`, c.pricePaid, T1[id].price, 1, '$');
  check(`${id}: value (SUB)`, c.valueSub, T1[id].sub, 2, '$');
  check(`${id}: value (WTE)`, c.valueWte, T1[id].wte, 2, '$');
  check(`${id}: acceleration years`, c.accelerationYears, T1[id].accel, 1e-9, 'n');
}

console.log('\n=== 2. Aggregate central case (T4 / T5, phi=0.50, 20% take-up) ===');
const t0 = Date.now();
const R = Engine.run({});
const elapsed = Date.now() - t0;
const C = R.panelB.combined;
check('purchasable pool (10-yr cohort)', C.participants / 0.20, 1109.7, 0.5, 'n');
check('participants at 20% take-up', C.participants, 222.0, 0.6, 'n');
check('member ANC payments received', C.price, 7289178, 60, '$');
check('value of acceleration (SUB)', C.valueSub, 25026853, 250, '$');
check('value of acceleration (WTE)', C.valueWte, 3855044, 120, '$');
check('value blended (phi=0.50)', C.valueBlended, 14440949, 200, '$');
check('net increase in unfunded liability', C.netLiability, 7151771, 200, '$');
check('aggregate rate impact', C.bp, 0.1888, 0.0005, 'bp');

console.log('\n  per employer plan (T4, M-D4a):');
const T4 = { ST: { price: 2.13e6, netl: 2.05e6, bp: 0.22 },
             TC: { price: 2.35e6, netl: 3.48e6, bp: 0.20 },
             PS: { price: 2.80e6, netl: 1.62e6, bp: 0.14 } };
for (const e of ['ST', 'TC', 'PS']) {
  const a = R.panelB.byEmployer[e];
  check(`${e}: member payments`, a.price, T4[e].price, 6000, '$');
  check(`${e}: net liability increase`, a.netLiability, T4[e].netl, 6000, '$');
  check(`${e}: rate impact (bp)`, a.bp, T4[e].bp, 0.005, 'bp');
}

console.log('\n  benefit-structure contributions must sum to the combined bp:');
const sumBp = R.panelB.byPlan.P1.bpContribution + R.panelB.byPlan.P2.bpContribution;
check('P1 bp + P2 bp == combined bp', sumBp, C.bp, 1e-9, 'bp');

console.log('\n=== 3. Sensitivity swings (T5-sensitivity.csv) ===');
const T5 = [
  ['phi=0.25', { phi: 0.25 }, 12.44e6, 0.33],
  ['phi=0.75', { phi: 0.75 }, 1.86e6, 0.05],
  ['take-up 10%', { takeUp: 0.10 }, 3.58e6, 0.09],
  ['take-up 30%', { takeUp: 0.30 }, 10.73e6, 0.28],
  ['rule D4b', { rule: 'D4b' }, 4.91e6, 0.13],
  ['discount 5.75%', { discount: 0.0575 }, 8.10e6, 0.21],
  ['discount 7.75%', { discount: 0.0775 }, 6.37e6, 0.17],
  ['salary growth 2.50%', { salaryGrowth: 0.025 }, 8.03e6, 0.21],
  ['salary growth 4.50%', { salaryGrowth: 0.045 }, 6.09e6, 0.16],
  ['mortality improvement 0.00%', { improvement: 0.0 }, 6.89e6, 0.18],
  ['mortality improvement 1.25%', { improvement: 0.0125 }, 7.33e6, 0.19],
  ['hybrid included', { includeHybrid: true }, 7.06e6, 0.19]
];
for (const [label, params, liab, bp] of T5) {
  const r = Engine.run(params);
  check(`${label}: net liability`, r.panelB.combined.netLiability, liab, 6000, '$');
  check(`${label}: aggregate bp`, r.panelB.combined.bp, bp, 0.005, 'bp');
}

/* the population funnel low/high cases */
const fa = sandbox.window.VRS_BASELINE.funnel_assumptions;
for (const [label, c, liab, bp] of [
  ['funnel low', 'low', 2.70e6, 0.07], ['funnel high', 'high', 16.78e6, 0.44]]) {
  const band = { low: 0.60, high: 1.60 }[c];
  const r = Engine.run({
    veteranShare: { ST: 0.060 * band, TC: 0.025 * band, PS: 0.070 * band },
    qualifyingShare: fa.qualifying_share[c],
    retiredPayBar: fa.retired_pay_bar[c],
    notAlreadyBought: fa.not_already_bought[c]
  });
  check(`${label}: net liability`, r.panelB.combined.netLiability, liab, 8000, '$');
  check(`${label}: aggregate bp`, r.panelB.combined.bp, bp, 0.005, 'bp');
}

console.log('\n=== 4. Workforce / payroll effect (T8-workforce.csv) ===');
/* T8 is per member on profile A; the engine computes it per cell, so the
   per-member mechanics are checked directly through evaluateCase. */
const pr = sandbox.window.VRS_BASELINE.profiles.A;
const wc = Engine.internals.evaluateCase({
  employer: 'ST', plan: 'P1', path: 'B2', age: pr.age, service: pr.service,
  svcPre2013: pr.svc_pre2013, salary: pr.salary, birthYear: null, sex: 'B',
  rule: 'D4a', qualifyingAvailable: 4.0, valuationYear: 2029.0
});
check('A: PV of departing member payroll', wc.pvPayrollForgone, 324786, 2, '$');
check('A: PV employer DB contributions', wc.pvEmployerDbContribForgone, 35954, 2, '$');
const r90Gross = wc.pvPayrollForgone * 0.10;
const r90Er = wc.pvEmployerDbContribForgone * 0.10;
check('A: gross payroll diff at 90% replacement', r90Gross, 32479, 2, '$');
check('A: net employer comp diff at 90%', r90Gross + r90Er, 36074, 3, '$');

console.log('\n=== 5. Guardrails the tool must enforce ===');
const g100 = Engine.run({ replacementPct: 1.00, notReplacedPct: 0.00, vacancyMonths: 0 });
check('100% replacement ⇒ zero payroll effect', g100.panelC.combined.total, 0, 1e-6, '$');
check('100% replacement ⇒ pension impact unchanged',
  g100.panelB.combined.netLiability, C.netLiability, 1e-6, '$');
const g75 = Engine.run({ replacementPct: 0.75 });
check('75% replacement ⇒ pension impact STILL unchanged',
  g75.panelB.combined.netLiability, C.netLiability, 1e-6, '$');
const gElim = Engine.run({ notReplacedPct: 0.10 });
check('10% not replaced ⇒ pension impact STILL unchanged',
  gElim.panelB.combined.netLiability, C.netLiability, 1e-6, '$');
check('hybrid excluded by default ⇒ no HY participants',
  R.panelA.byPlan.HY === undefined ? 0 : 1, 0, 0, 'n');
check('COLA exposure is never quantified', R.ancillary.colaQuantified ? 1 : 0, 0, 0, 'n');

console.log('\n=== 6. Direct participant entry preserves the modeled mix ===');
const dir = Engine.run({ participantMode: 'direct', p1Participants: 400, p2Participants: 0 });
check('400 Plan 1 participants requested', dir.panelA.byPlan.P1.participants, 400, 1e-6, 'n');
check('0 Plan 2 participants requested', dir.panelA.byPlan.P2.participants, 0, 1e-6, 'n');
const perP1 = R.panelB.byPlan.P1.price / R.panelB.byPlan.P1.participants;
check('price per participant is mix-preserved',
  dir.panelB.byPlan.P1.price / 400, perP1, 0.01, '$');

console.log('\n=== 7. Salary override is exactly linear ===');
const sBase = Engine.run({});
const meanP1 = sBase.panelB.byPlan.P1.modelMeanSalary;
const sDouble = Engine.run({ salaryMode: 'scaled', p1Salary: meanP1 * 2, p2Salary: null });
check('doubling Plan 1 salary doubles Plan 1 price',
  sDouble.panelB.byPlan.P1.price, sBase.panelB.byPlan.P1.price * 2, 0.5, '$');
check('doubling Plan 1 salary doubles Plan 1 SUB value',
  sDouble.panelB.byPlan.P1.valueSub, sBase.panelB.byPlan.P1.valueSub * 2, 2, '$');
check('Plan 2 untouched by a Plan 1 override',
  sDouble.panelB.byPlan.P2.price, sBase.panelB.byPlan.P2.price, 1e-6, '$');

console.log('\n=== 8. Performance ===');
Engine.clearCaches();
const tc0 = Date.now(); Engine.run({}); const cold = Date.now() - tc0;
const tw0 = Date.now(); Engine.run({ phi: 0.3 }); const warm = Date.now() - tw0;
const tt0 = Date.now(); Engine.tornado({}); const torn = Date.now() - tt0;
console.log(`  cold run ${cold} ms | warm run (post-hoc only) ${warm} ms | ` +
            `tornado (16 recomputes) ${torn} ms`);
if (cold > 4000) { fail++; failures.push('cold run too slow for live interaction'); }
if (warm > 150) { fail++; failures.push('warm run too slow for live interaction'); }

console.log(`\n${'='.repeat(74)}`);
console.log(`  ${pass} passed, ${fail} failed`);
if (fail) {
  console.log('  FAILURES:');
  failures.forEach((f) => console.log('    - ' + f));
}
console.log(`${'='.repeat(74)}\n`);
process.exit(fail ? 1 : 0);
