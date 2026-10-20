#!/usr/bin/env node
/* Verification probe for the MOO-271 remediation. Every number introduced into
   the walk-through by that remediation is re-derived here from the committed
   engine and the committed fiscal-model tables, rather than taken from the
   review on trust. Run: node explorer/test/probe-moo271.js */
'use strict';
const fs = require('fs'), path = require('path');
const here = __dirname, dataDir = path.join(here, '..', 'data');
const sandbox = { window: {} };
for (const f of ['baseline.js', 'cells.js'])
  new Function('window', fs.readFileSync(path.join(dataDir, f), 'utf8'))(sandbox.window);
const E = require(path.join(here, '..', 'js', 'engine.js'));
E.init(sandbox.window.VRS_BASELINE, sandbox.window.VRS_CELLS);

const d = E.defaults(), R = E.run(d);

console.log('=== 1. per-employer basis points (m-08: is the state plan 0.22 bp?) ===');
const B = R.panelB;
console.log('panelB keys:', Object.keys(B).join(', '));
console.log("byEmployer:", JSON.stringify(B.byEmployer, null, 1));
console.log("combined:", JSON.stringify(B.combined, null, 1));
const g = (r) => r.panelB.combined.bp;

console.log('\n=== 2. φ swing restricted to ASM-22 0.25–0.75 (S-05) ===');
const lo = E.run(Object.assign({}, d, { phi: 0.25 }));
const hi = E.run(Object.assign({}, d, { phi: 0.75 }));
console.log('φ=0.25 bp:', g(lo), ' φ=0.75 bp:', g(hi),
            ' swing:', Math.abs(g(lo) - g(hi)).toFixed(4));
const T = E.tornado(d);
console.log('tornado rows (label | swing bp):');
T.rows.forEach(r => console.log('  ', r.label, '|',
  Math.abs(r.highBp - r.lowBp).toFixed(4), '| lo', r.lowLabel, '| hi', r.highLabel));

console.log('\n=== 3. profile table (B-03: 2nd highest, mean, grid max) ===');
const csv = fs.readFileSync(path.join(here, '..', '..', 'fiscal-model', 'out',
  'T1-price-vs-value.csv'), 'utf8').trim().split('\n');
console.log(csv.slice(0, 1).join('\n'));
csv.slice(1).forEach(l => console.log('  ', l));
