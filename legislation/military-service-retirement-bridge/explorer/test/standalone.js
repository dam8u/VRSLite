#!/usr/bin/env node
/* =====================================================================
   Output-accuracy test for dist/explorer-standalone.html.

   explorer/test/reconcile.js proves the CALCULATION ENGINE reproduces the
   committed Python fiscal model. It imports js/engine.js directly, so it
   says nothing about the file a legislator is actually sent: the single-file
   build, driven through its own controls, rendering its own panels. A
   control can be wired to the wrong state key, show one value and send
   another, or leave a panel holding a stale number, and reconcile.js would
   pass throughout.

   This harness tests the shipped document. For every slider, every numeric
   entry, every checkbox, select, segmented mode and preset it:

     1. drives the real control and lets the real debounce run;
     2. reads back what the control DISPLAYS and checks the display matches
        the control's value;
     3. reconstructs the engine parameters from the visible controls alone,
        runs the model on them, and checks every panel shows those numbers;
     4. asserts the fiscal guardrails and dimensional sanity checks that
        must hold whatever the engine says.

       node explorer/test/standalone.js            # full sweep
       node explorer/test/standalone.js --quick    # fewer settings per slider

   Requires a local Chrome or Chromium (set CHROME_PATH to override). No npm
   dependency is added.

   Prepared by Policy Development Team using legal, policy, and financial
   analysis tools, pending review by veterans' legal counsel.
   ===================================================================== */
'use strict';
const fs = require('fs');
const path = require('path');
const { launch, sleep, findChrome } = require('./chrome.js');

const HERE = __dirname;
const ROOT = path.join(HERE, '..');
const DIST = path.join(ROOT, 'dist', 'explorer-standalone.html');
const QUICK = process.argv.includes('--quick');

/* ------------------------------------------------------------ reporting */
let pass = 0;
const failures = [];
let group = '';

function startGroup(name) { group = name; console.log('\n=== ' + name + ' ==='); }
function ok(label) { pass++; if (process.env.VERBOSE) console.log('  PASS  ' + label); }
function bad(label, detail) {
  failures.push({ group, label, detail });
  console.log('  FAIL  ' + label + (detail ? '\n          ' + detail : ''));
}
function check(label, cond, detail) { if (cond) ok(label); else bad(label, detail); }
function near(label, actual, expected, tol) {
  const d = Math.abs(actual - expected);
  check(label, d <= tol,
    `got ${fmtN(actual)}  want ${fmtN(expected)}  diff ${fmtN(d)}  tol ${tol}`);
}
function fmtN(x) {
  if (!isFinite(x)) return String(x);
  return Math.abs(x) >= 1000 ? x.toLocaleString('en-US', { maximumFractionDigits: 0 })
    : x.toPrecision(6).replace(/0+$/, '').replace(/\.$/, '');
}

/* Display formatters, written here from the output rules. */
const usd = (x, dp) => {
  const n = Math.abs(x) < 0.5 ? 0 : x, d = dp || 0;
  return (n < 0 ? '−$' : '$') + Math.abs(n).toLocaleString('en-US',
    { minimumFractionDigits: d, maximumFractionDigits: d });
};
const num = (x, dp) => x.toLocaleString('en-US',
  { minimumFractionDigits: dp === undefined ? 0 : dp,
    maximumFractionDigits: dp === undefined ? 0 : dp });
const pct = (x, dp) => (x * 100).toFixed(dp === undefined ? 1 : dp) + '%';

/* ============================================================ GROUP 1 */
/* The shipped file must be the current application, inlined byte for byte.
   A stale dist/ is the failure mode that makes every other test in this
   file a test of the wrong document. */
function groupBuildFidelity() {
  startGroup('1. The shipped single file IS the current application');
  const dist = fs.readFileSync(DIST, 'utf8');
  const guard = (t) => t.replace(/<\/script/g, '<\\/script').replace(/<\/style/g, '<\\/style');

  check('dist/explorer-standalone.html exists and is non-trivial',
    dist.length > 100000, `${dist.length} bytes`);

  /* build_standalone.py rewrites cross-page links AFTER inlining, so a source
     file that contains one — js/ui.js emits the walk-through drawer's
     "open as its own page" link — is legitimately not byte-identical in the
     build. Apply the same rewrite here so the staleness check still means
     what it says rather than being loosened to a substring. */
  const xlink = (t) => t
    .replace(/href="index\.html"/g, 'href="#" data-xpage="index.html"')
    .replace(/href="methodology\.html"/g, 'href="#" data-xpage="methodology.html"')
    .replace(/href="walkthrough\.html"/g, 'href="#" data-xpage="walkthrough.html"');

  for (const src of ['css/explorer.css', 'data/baseline.js', 'data/cells.js',
    'js/engine.js', 'js/registry.js', 'js/walkthrough.js', 'js/ui.js']) {
    const want = xlink(guard(fs.readFileSync(path.join(ROOT, src), 'utf8')));
    check(`inlined payload matches ${src}`, dist.includes(want),
      'the standalone build is stale — re-run build_standalone.py');
  }

  const leftover = [...dist.matchAll(/(?:src|href)="([^"#]+)"/g)]
    .map((m) => m[1])
    .filter((u) => !/^(https?:|mailto:|data:|blob:)/.test(u))
  check('no local file references survive inlining', leftover.length === 0,
    'would be broken for a file opened on its own: ' + leftover.join(', '));

  /* The required disclaimers are a condition of circulating this at all.
     Compared on collapsed whitespace, because the sources wrap these lines
     and a wrap is not a missing disclaimer. */
  const flat = dist.replace(/&rsquo;|&#8217;|&apos;/g, "'")
    .replace(/&amp;/g, '&').replace(/\s+/g, ' ').replace(/[’‘]/g, "'");
  const required = [
    'not an actuarial certification',
    '30-19.1:7',
    'Prepared by Policy Development Team using legal, policy, and financial ' +
      "analysis tools, pending review by veterans' legal counsel"
  ];
  for (const r of required) {
    check('required text present: "' + r.slice(0, 48) + '"', flat.includes(r));
  }
  check('print-required disclaimer sits outside the hidden masthead',
    /<\/header>\s*<div class="disclaimer print-required">/.test(dist));

  /* Cross-page navigation in a single file. Each sibling page is carried once
     as a base64 payload and resolved to a Blob URL at click time; browsers
     block top-level navigation to a data: URL, so a substituted data: href
     would have been a link that silently did nothing. */
  for (const key of ['methodology.html', 'walkthrough.html']) {
    check(`the standalone ${key} link is an embedded payload, not a dead link`,
      dist.includes(`data-xpage="${key}"`) &&
      new RegExp('"' + key.replace('.', '\\.') + '":\\{b64:"').test(dist));
  }
  check('no top-level data: href survives (browsers block navigating to one)',
    !/href="data:text\/html/.test(dist));
  /* Each payload appears exactly once, however many links point at it. */
  for (const key of ['methodology.html', 'walkthrough.html']) {
    const n = (dist.match(new RegExp('"' + key.replace('.', '\\.') + '":\\{b64:"', 'g')) || []).length;
    check(`${key} payload is carried once, not once per link`, n === 1, `found ${n}`);
  }
  check('the guided walk-through drawer ships in the dashboard',
    dist.includes('id="wt-drawer"') && dist.includes('id="btn-walkthrough"'));
}

/* ============================================================ GROUP 2 */
/* Run the engine EXTRACTED FROM THE SHIPPED FILE, not from js/engine.js,
   against the committed Python tables. */
function groupEngineInShippedFile() {
  startGroup('2. The engine inside the shipped file reproduces the Python model');
  const dist = fs.readFileSync(DIST, 'utf8');
  const scripts = [...dist.matchAll(/<script>\n([\s\S]*?)\n<\/script>/g)].map((m) => m[1]);
  check('inline script payloads found in the shipped file', scripts.length >= 4,
    `found ${scripts.length}`);

  const w = {};
  const sandbox = { window: w, self: w, module: undefined, document: undefined };
  let Engine = null;
  for (const s of scripts) {
    const unguard = s.replace(/<\\\/script/g, '</script').replace(/<\\\/style/g, '</style');
    if (/VRS_BASELINE\s*=/.test(unguard) || /VRS_CELLS\s*=/.test(unguard)
        || /VRS_REGISTRY\s*=/.test(unguard) || /VRSEngine\s*=\s*factory/.test(unguard)) {
      try { new Function('window', 'self', unguard)(w, w); } catch (e) {
        bad('inline payload evaluates under Node', e.message);
      }
    }
  }
  Engine = w.VRSEngine;
  check('engine exported by the shipped file', !!Engine);
  if (!Engine) return null;
  Engine.init(w.VRS_BASELINE, w.VRS_CELLS);

  /* the figures the memorandum, the briefs and the drafting notes all cite */
  const A = Engine.memberExample('A', {});
  near('profile A price paid (T1)', A.pricePaid, 42500, 1);
  near('profile A value, frozen-service (T1)', A.valueSub, 383565, 2);
  near('profile A net subsidy = the $341,065 figure', A.netSub, 341065, 2);
  near('profile A net, work-to-eligibility (overpays)', A.netWte, -21500, 2);
  near('profile A years of acceleration', A.accelerationYears, 4.0, 1e-9);
  const D = Engine.memberExample('D', {});
  near('profile D price paid (T1)', D.pricePaid, 38664, 1);
  near('profile D acceleration: 4 points buy 2 years', D.accelerationYears, 2.0, 1e-9);

  const R = Engine.run({});
  near('central participants at 20% take-up (T4)', R.panelB.combined.participants, 222.0, 0.6);
  near('central member ANC payments (T4)', R.panelB.combined.price, 7289178, 60);
  near('central net liability (T4)', R.panelB.combined.netLiability, 7151771, 200);
  near('central aggregate rate impact = the 0.19 bp figure',
    R.panelB.combined.bp, 0.1888, 0.0005);
  near('P1 bp + P2 bp sums to the combined bp',
    R.panelB.byPlan.P1.bpContribution + R.panelB.byPlan.P2.bpContribution,
    R.panelB.combined.bp, 1e-9);
  check('COLA exposure is never quantified', R.ancillary.colaQuantified === false);
  check('hybrid excluded from the primary model',
    R.panelA.byPlan.HY === undefined);
  return { Engine, baseline: w.VRS_BASELINE };
}

/* ============================================================== driving */
const LABEL_RULE = {
  'i-takeup': ['v-takeup', (v) => pct(v / 100, 0)],
  'i-p1y': ['v-p1y', (v) => v.toFixed(1)],
  'i-p2y': ['v-p2y', (v) => v.toFixed(1)],
  'i-phi': ['v-phi', (v) => pct(v / 100, 0)],
  'i-repl': ['v-repl', (v) => pct(v / 100, 0)],
  'i-notrepl': ['v-notrepl', (v) => pct(v / 100, 1)],
  'i-vac': ['v-vac', (v) => v.toFixed(0)],
  'i-growth': ['v-growth', (v) => pct(v / 100, 2)],
  'i-disc': ['v-disc', (v) => pct(v / 100, 2)],
  'i-impr': ['v-impr', (v) => pct(v / 100, 2)],
  'i-vst': ['v-vst', (v) => pct(v / 100, 1)],
  'i-vtc': ['v-vtc', (v) => pct(v / 100, 1)],
  'i-vps': ['v-vps', (v) => pct(v / 100, 1)],
  'i-qual': ['v-qual', (v) => pct(v / 100, 0)],
  'i-bar': ['v-bar', (v) => pct(v / 100, 0)],
  'i-notbought': ['v-notbought', (v) => pct(v / 100, 0)]
};

/* Sliders carry the model parameter the engine reads; a control that
   displays one number and feeds another is the defect this maps. */
const PARAM_OF = {
  'i-takeup': ['takeUp', 100], 'i-p1y': ['p1BridgeYears', 1],
  'i-p2y': ['p2BridgeYears', 1], 'i-phi': ['phi', 100],
  'i-repl': ['replacementPct', 100], 'i-notrepl': ['notReplacedPct', 100],
  'i-vac': ['vacancyMonths', 1], 'i-growth': ['salaryGrowth', 100],
  'i-disc': ['discount', 100], 'i-impr': ['improvement', 100],
  'i-qual': ['qualifyingShare', 100], 'i-bar': ['retiredPayBar', 100],
  'i-notbought': ['notAlreadyBought', 100]
};

async function settle(page, withTornado) {
  /* 40 ms input debounce, 220 ms tornado debounce, plus recompute time */
  await sleep(withTornado ? 900 : 260);
  await page.evaluate('return 1');
}

/* Apply a list of control actions, let the interface settle, and return the
   full probe reading. */
async function drive(page, actions, opts) {
  for (const a of actions) {
    const [kind, id, v] = a;
    const args = [JSON.stringify(id)];
    if (v !== undefined) args.push(JSON.stringify(v));
    await page.evaluate(`window.__T.${kind}(${args.join(',')}); return 1;`);
  }
  await settle(page, opts && opts.tornado);
  return page.evaluate('return window.__T.rendered()');
}

/* Assert a probe reading is internally consistent: labels match control
   values, and every panel shows the model's numbers for those controls. */
function assertReading(tag, reading) {
  const raw = reading.raw;
  for (const [id, rule] of Object.entries(LABEL_RULE)) {
    const v = parseFloat(raw.ranges[id].value);
    const want = rule[1](v);
    const got = raw.labels[rule[0]];
    check(`${tag}: ${id} displays its own value (${rule[0]})`, got === want,
      `slider=${raw.ranges[id].value} label shows "${got}" want "${want}"`);
  }
  const phi = parseFloat(raw.ranges['i-phi'].value) / 100;
  check(`${tag}: behavioural split labels agree with φ`,
    raw.labels['phi-wte'] === pct(phi, 0) && raw.labels['phi-sub'] === pct(1 - phi, 0),
    `wte="${raw.labels['phi-wte']}" sub="${raw.labels['phi-sub']}" φ=${phi}`);

  const miss = reading.checks.filter((c) => !c.ok);
  check(`${tag}: all ${reading.checks.length} panel figures match the model`,
    miss.length === 0,
    miss.slice(0, 6).map((c) => `panel ${c.panel}: ${c.label} — "${c.want}" not shown`)
      .join('\n          ') + (miss.length > 6 ? `\n          (+${miss.length - 6} more)` : ''));
  return reading;
}

/* ============================================================ GROUP 3-9 */
async function main() {
  if (!findChrome()) {
    console.log('\nNo Chrome or Chromium found. Set CHROME_PATH.\n');
    process.exit(2);
  }
  if (!fs.existsSync(DIST)) {
    console.log('\nMissing ' + DIST + ' — run build_standalone.py.\n');
    process.exit(2);
  }

  groupBuildFidelity();
  const nodeSide = groupEngineInShippedFile();

  const page = await launch('file://' + DIST);
  try {
    await page.ready("window.VRSEngine && document.getElementById('b-hero').children.length");
    const probeSrc = fs.readFileSync(path.join(HERE, 'inpage.js'), 'utf8');
    await page.evaluate('return eval(' + JSON.stringify(probeSrc) + ')');
    await page.evaluate('return typeof window.__T');

    /* ---------------------------------------------------------------- */
    startGroup('3. Opening state reproduces the central case');
    const base = assertReading('open', await drive(page, [], { tornado: true }));
    check('scenario chip reads the Central case',
      base.raw.chip === 'Central case', `got "${base.raw.chip}"`);
    near('opening combined bp is the published 0.19 figure',
      base.model.combined.bp, 0.1888, 0.0005);
    if (nodeSide) {
      near('browser agrees with the Node-side engine on net liability',
        base.model.combined.netLiability,
        nodeSide.Engine.run({}).panelB.combined.netLiability, 1e-6);
    }
    check('no page exception during startup render',
      page.errors().length === 0, page.errors().join(' | '));
    check('covered payroll uses a billions branch',
      base.text.b.includes('$26.05bn') && !base.text.b.includes('$26048.74M'));
    check('benefit-structure contributions display enough precision to reconcile',
      base.text.b.includes('0.204 bp') && base.text.b.includes('−0.015 bp')
      && base.text.b.includes('0.189 bp'));
    const bNote = await page.evaluate("return document.getElementById('b-note').textContent");
    check('central-case Plan 1 / Plan 2 sign split is stated',
      bNote.includes('entirely a Plan 1 result')
      && bNote.includes('Plan 2 purchasers in aggregate pay'));
    const badgeAudit = await page.evaluate(
      "return {b:document.querySelectorAll('#b-hero .prov').length," +
      "c:document.querySelectorAll('#c-tiles .prov').length," +
      "d:document.querySelectorAll('#d-hero .prov').length}");
    check('headline output figures carry provenance badges',
      badgeAudit.b >= 2 && badgeAudit.c >= 1 && badgeAudit.d >= 3,
      JSON.stringify(badgeAudit));
    check('estimated-veterans funnel step is tagged Scenario Assumption',
      base.model.funnel[2].provenance === 'Scenario Assumption',
      base.model.funnel[2].provenance);
    check('identity funnel step is described as purchase amount, not willingness',
      base.text.g.includes('does not narrow headcount in the current grid')
      && !base.text.g.includes('Able and willing to purchase'));

    /* ---------------------------------------------------------------- */
    startGroup('4. Every slider: display, wiring and rendered output');
    const SWEEP = {
      'i-takeup': QUICK ? [5, 50] : [5, 10, 20, 30, 37, 50],
      'i-phi': QUICK ? [0, 100] : [0, 25, 50, 75, 100],
      'i-repl': QUICK ? [75, 100] : [75, 80, 85, 90, 95, 100],
      'i-notrepl': QUICK ? [0, 10] : [0, 2.5, 5, 7.5, 10],
      'i-vac': QUICK ? [0, 12] : [0, 1, 3, 6, 12],
      'i-growth': QUICK ? [1.5, 5.5] : [1.5, 2.5, 3.5, 4.5, 5.5],
      'i-disc': QUICK ? [4.75, 8.75] : [4.75, 5.75, 6.75, 7.75, 8.75],
      'i-impr': QUICK ? [0, 1.5] : [0, 0.75, 1.5],
      'i-vst': QUICK ? [1, 16] : [1, 6, 16],
      'i-vtc': QUICK ? [0.5, 12] : [0.5, 2.5, 12],
      'i-vps': QUICK ? [1, 18] : [1, 7, 18],
      'i-qual': QUICK ? [50, 100] : [50, 80, 100],
      'i-bar': QUICK ? [0, 50] : [0, 18, 50],
      'i-notbought': QUICK ? [30, 100] : [30, 70, 100]
    };
    const sweepResults = {};
    for (const [id, values] of Object.entries(SWEEP)) {
      await page.evaluate("window.__T.click('btn-reset'); return 1");
      await settle(page);
      sweepResults[id] = [];
      for (const v of values) {
        const r = assertReading(`${id}=${v}`, await drive(page, [['setRange', id, v]]));
        const [key, scale] = PARAM_OF[id] || [];
        if (key) {
          near(`${id}=${v} reaches the model as ${key}`,
            r.model.params[key], v / scale, 1e-12);
        }
        sweepResults[id].push({ v, m: r.model });
      }
      /* the control must actually be live: min and max cannot agree on
         everything, or the slider is decorative */
      const lo = sweepResults[id][0].m, hi = sweepResults[id][sweepResults[id].length - 1].m;
      const moved = Math.abs(lo.combined.netLiability - hi.combined.netLiability) > 1e-6
        || Math.abs(lo.workforce.total - hi.workforce.total) > 1e-6
        || Math.abs(lo.panelA.totalParticipants - hi.panelA.totalParticipants) > 1e-9;
      check(`${id} changes some modeled output between its extremes`, moved,
        'the control is inert across its whole range');
    }
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);

    /* ---------------------------------------------------------------- */
    startGroup('5. Bridge-amount sliders in fixed mode (Plan 1 and Plan 2 separate)');
    for (const v of (QUICK ? [1, 4] : [1, 2, 3.1, 4])) {
      const r = assertReading(`fixed bridge=${v}`, await drive(page, [
        ['clickSeg', 'seg-bridge-mode', 'fixed'],
        ['setRange', 'i-p1y', v], ['setRange', 'i-p2y', v]
      ]));
      near(`p1BridgeYears reaches the model at ${v}`, r.model.params.p1BridgeYears, v, 1e-12);
      near(`p2BridgeYears reaches the model at ${v}`, r.model.params.p2BridgeYears, v, 1e-12);
      /* purchases are still capped at each member's own deficit */
      check(`fixed ${v}: mean Plan 1 purchase never exceeds the setting`,
        r.model.byPlan.P1.meanYears <= v + 1e-9,
        `mean ${r.model.byPlan.P1.meanYears} > ${v}`);
      check(`fixed ${v}: mean Plan 2 purchase never exceeds the setting`,
        r.model.byPlan.P2.meanYears <= v + 1e-9,
        `mean ${r.model.byPlan.P2.meanYears} > ${v}`);
    }
    /* Plan 1 and Plan 2 are kept separate: moving one must not move the other */
    const onlyP1 = await drive(page, [
      ['clickSeg', 'seg-bridge-mode', 'fixed'],
      ['setRange', 'i-p1y', 1], ['setRange', 'i-p2y', 4]]);
    const onlyP2 = await drive(page, [['setRange', 'i-p1y', 4], ['setRange', 'i-p2y', 4]]);
    check('moving the Plan 1 bridge slider leaves Plan 2 untouched',
      Math.abs(onlyP1.model.byPlan.P2.price - onlyP2.model.byPlan.P2.price) < 1e-6,
      `${onlyP1.model.byPlan.P2.price} vs ${onlyP2.model.byPlan.P2.price}`);
    check('a Plan 1 point of credit buys more acceleration than a Plan 2 point',
      onlyP2.model.byPlan.P1.meanAcceleration > onlyP2.model.byPlan.P2.meanAcceleration,
      'Rule-of-90 acceleration should be half-rate');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);

    /* ---------------------------------------------------------------- */
    startGroup('6. Participant modes: rate-driven and direct entry');
    for (const n of [0, 1, 400, 1234, 20000]) {
      const r = assertReading(`direct p1=${n}`, await drive(page, [
        ['clickSeg', 'seg-participant-mode', 'direct'],
        ['setNum', 'i-p1n', n], ['setNum', 'i-p2n', 0]]));
      near(`direct entry of ${n} Plan 1 participants is honoured exactly`,
        r.model.byPlan.P1.participants, n, 1e-9);
      near(`direct entry of 0 Plan 2 participants is honoured exactly`,
        r.model.byPlan.P2.participants, 0, 1e-9);
      check(`direct entry of ${n} is reported as direct in the funnel`,
        r.model.funnelDirect === true);
      check(`direct entry of ${n} is labelled as a user entry`,
        r.text.g.includes('Participant count entered directly')
        && r.text.g.includes('User entry'));
      if (n > 0) {
        const perHead = r.model.byPlan.P1.price / n;
        check(`direct entry of ${n} preserves the modeled mix (price per head stable)`,
          Math.abs(perHead - base.model.byPlan.P1.price / base.model.byPlan.P1.participants)
            < 0.02 * perHead,
          `${perHead} vs ${base.model.byPlan.P1.price / base.model.byPlan.P1.participants}`);
      }
    }
    /* a blank box must fall back to the model, not to zero */
    const blankP2 = await drive(page, [
      ['clickSeg', 'seg-participant-mode', 'direct'],
      ['setNum', 'i-p1n', 400], ['setNum', 'i-p2n', null]]);
    assertReading('direct p1=400, p2 blank', blankP2);
    near('a blank Plan 2 box falls back to the modeled count, not zero',
      blankP2.model.byPlan.P2.participants, base.model.byPlan.P2.participants, 1e-6);
    /* participation-rate mode must be exactly linear in take-up */
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const tk10 = sweepResults['i-takeup'].find((x) => x.v === 10)
      || (await drive(page, [['setRange', 'i-takeup', 10]])).model;
    const tk30 = sweepResults['i-takeup'].find((x) => x.v === 30);
    if (tk10 && tk30) {
      const m10 = tk10.m || tk10, m30 = tk30.m;
      near('participants are exactly linear in the take-up rate',
        m30.panelA.totalParticipants, m10.panelA.totalParticipants * 3, 1e-6);
      near('member ANC payments are exactly linear in take-up',
        m30.combined.price, m10.combined.price * 3, 1);
    }

    /* ---------------------------------------------------------------- */
    startGroup('7. Salary mode: override is an exact rescaling');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const modelSal = base.model.byPlan.P1.modelMeanSalary;
    const dbl = assertReading('salary override 2x', await drive(page, [
      ['clickSeg', 'seg-salary-mode', 'scaled'],
      ['setNum', 'i-p1sal', Math.round(modelSal * 2)]]));
    const k = Math.round(modelSal * 2) / modelSal;
    near('doubling the Plan 1 salary scales Plan 1 member payments exactly',
      dbl.model.byPlan.P1.price, base.model.byPlan.P1.price * k, 1);
    near('doubling the Plan 1 salary scales Plan 1 frozen-service value exactly',
      dbl.model.byPlan.P1.valueSub, base.model.byPlan.P1.valueSub * k, 2);
    near('a Plan 1 salary override leaves Plan 2 untouched',
      dbl.model.byPlan.P2.price, base.model.byPlan.P2.price, 1e-6);
    near('a salary override does not change participant counts',
      dbl.model.panelA.totalParticipants, base.model.panelA.totalParticipants, 1e-9);

    /* ---------------------------------------------------------------- */
    startGroup('8. Selects, checkboxes and the purchase rule');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const d4b = assertReading('rule D4b', await drive(page, [['setSelect', 'i-rule', 'D4b']]));
    check('rule D4b reaches the model', d4b.model.params.rule === 'D4b');
    check('D4b (completion only) admits fewer purchasers than D4a',
      d4b.model.panelA.totalParticipants < base.model.panelA.totalParticipants,
      `${d4b.model.panelA.totalParticipants} vs ${base.model.panelA.totalParticipants}`);
    await drive(page, [['setSelect', 'i-rule', 'D4a']]);

    const hy = assertReading('hybrid on', await drive(page, [['setCheck', 'i-hybrid', true]]));
    check('the hybrid checkbox reaches the model', hy.model.params.includeHybrid === true);
    check('hybrid participants appear only when deliberately activated',
      hy.model.panelA.planKeys.includes('HY')
        && !base.model.panelA.planKeys.includes('HY'));
    /* The hybrid variant lowers the aggregate rather than raising it: a
       hybrid purchaser pays approximate normal cost against a 1.0%
       multiplier, so the price exceeds the value conferred and the structure
       carries a NEGATIVE net liability. Either direction is defensible; what
       the preset promises is that the consequence is immaterial. */
    check('including hybrid moves the modeled pension impact', 
      Math.abs(hy.model.combined.netLiability - base.model.combined.netLiability) > 1);
    check('the hybrid variant is immaterial, as its description claims',
      Math.abs(hy.model.combined.netLiability - base.model.combined.netLiability)
        < 0.05 * Math.abs(base.model.combined.netLiability),
      `moved by ${fmtN(hy.model.combined.netLiability - base.model.combined.netLiability)}`);
    check('hybrid purchasers overpay, so the hybrid structure is a net credit',
      hy.model.byPlan.HY.netLiability < 0,
      `HY net liability ${fmtN(hy.model.byPlan.HY.netLiability)}`);
    const hyOff = await drive(page, [['setCheck', 'i-hybrid', false]]);
    near('unchecking hybrid returns to the primary model exactly',
      hyOff.model.combined.netLiability, base.model.combined.netLiability, 1e-6);

    const amort = assertReading('amortize at scenario discount',
      await drive(page, [['setRange', 'i-disc', 5.75], ['setCheck', 'i-amort', true]]));
    const amortOff = await drive(page, [['setCheck', 'i-amort', false]]);
    check('the amortization-basis checkbox changes the basis-point result',
      Math.abs(amort.model.combined.bp - amortOff.model.combined.bp) > 1e-6,
      'checkbox has no effect');
    near('the amortization basis does not change the liability itself',
      amort.model.combined.netLiability, amortOff.model.combined.netLiability, 1e-6);

    /* "Official VRS data mode" presents itself as a mode. Either it changes
       a number or it changes what is shown; a control that does neither is
       a control that misrepresents the tool. */
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const offBefore = await page.evaluate(
      "return {spec: document.getElementById('official-spec').textContent.length," +
      " visible: document.getElementById('official-spec').offsetParent !== null," +
      " chip: document.getElementById('scenario-chip').textContent.trim()}");
    const offOn = await drive(page, [['setCheck', 'i-official', true]]);
    const offAfter = await page.evaluate(
      "return {spec: document.getElementById('official-spec').textContent.length," +
      " visible: document.getElementById('official-spec').offsetParent !== null," +
      " chip: document.getElementById('scenario-chip').textContent.trim()}");
    const numbersMoved = Math.abs(offOn.model.combined.netLiability
      - base.model.combined.netLiability) > 1e-9;
    const viewMoved = offBefore.spec !== offAfter.spec
      || offBefore.visible !== offAfter.visible;
    check('"Official VRS data mode" either changes a number or changes the view',
      numbersMoved || viewMoved,
      'the checkbox is inert: it alters no output and does not reveal or hide the ' +
      'data contract it offers to show, yet it does flip the scenario chip to ' +
      `"${offAfter.chip}" — so it reads as a mode that took effect`);
    await drive(page, [['setCheck', 'i-official', false]]);

    /* ---------------------------------------------------------------- */
    startGroup('9. Fiscal guardrails, asserted through the interface');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const r100 = await drive(page, [['setRange', 'i-repl', 100],
      ['setRange', 'i-notrepl', 0], ['setRange', 'i-vac', 0]]);
    near('100% replacement, nothing eliminated, no vacancy ⇒ payroll effect is zero',
      r100.model.workforce.total, 0, 1e-6);
    near('100% replacement ⇒ lower-paid differential is zero by construction',
      r100.model.workforce.lowerPaidDiff, 0, 1e-9);
    check('at 100% replacement the panel states the zero conditions',
      r100.text.c.includes('zero with no vacancy or eliminated positions'));

    for (const nu of [0, 5, 10]) {
      for (const vac of [0, 3, 12]) {
        const r = await drive(page, [['setRange', 'i-repl', 100],
          ['setRange', 'i-notrepl', nu], ['setRange', 'i-vac', vac]]);
        const shouldBeZero = nu === 0 && vac === 0;
        check(`100% replacement, ${nu}% eliminated, ${vac}m vacancy: zero claim is conditional`,
          (Math.abs(r.model.workforce.total) < 0.01) === shouldBeZero,
          fmtN(r.model.workforce.total));
        if (!shouldBeZero) {
          check(`100% replacement, ${nu}% eliminated, ${vac}m: prose names remaining effects`,
            /nonzero total below|separately identified non-replacement/.test(r.text.c));
        }
      }
    }

    /* no workforce control may move any pension figure */
    const pensionOf = (m) => [m.combined.netLiability, m.combined.bp, m.combined.price,
      m.combined.valueBlended, m.byPlan.P1.netLiability, m.byPlan.P2.netLiability];
    const refPension = pensionOf(r100.model);
    for (const [label, acts] of [
      ['replacement 75%', [['setRange', 'i-repl', 75]]],
      ['replacement 85%', [['setRange', 'i-repl', 85]]],
      ['10% of positions eliminated', [['setRange', 'i-notrepl', 10]]],
      ['12-month vacancy', [['setRange', 'i-vac', 12]]]
    ]) {
      const r = await drive(page, acts);
      const got = pensionOf(r.model);
      const same = got.every((x, i) => Math.abs(x - refPension[i]) < 1e-9);
      check(`${label} leaves every pension figure bit-identical`, same,
        got.map((x, i) => `${fmtN(x)} vs ${fmtN(refPension[i])}`).join(' | '));
    }

    /* every ladder rung must equal the headline obtained by selecting it */
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    for (const vac of [0, 3, 12]) {
      const ladder = await drive(page, [['setRange', 'i-repl', 85],
        ['setRange', 'i-notrepl', 5], ['setRange', 'i-vac', vac]]);
      for (const rung of ladder.model.ladder) {
        const direct = nodeSide.Engine.run({ replacementPct: rung.pct,
          notReplacedPct: 0.05, vacancyMonths: vac });
        near(`ladder ${rung.pct * 100}% at ${vac}m: total matches direct scenario`,
          rung.total, direct.panelC.combined.total, 0.01);
        near(`ladder ${rung.pct * 100}% at ${vac}m: vacancy matches direct scenario`,
          rung.vacancyPayroll, direct.panelC.combined.vacancyPayroll, 0.01);
      }
    }

    /* HIC and COLA stay outside every rate figure */
    const anc = await drive(page, [['setRange', 'i-repl', 90]]);
    check('COLA is never given a number', anc.model.ancillary.colaQuantified === false
      && anc.text.hc.includes('Not quantified'));
    check('HIC and COLA are stated to sit outside the rate figures',
      anc.text.hc.includes('No'));
    const hcNote = await page.evaluate("return document.getElementById('hc-note').textContent");
    check('HIC uses employer-specific rates and discloses elective PS coverage',
      anc.model.ancillary.hicPvEstimate < 410000
      && hcNote.includes('employer-elective'));
    check('the required basis-point qualifier is on Panel B',
      (await page.evaluate("return document.getElementById('b-note').textContent"))
        .includes('excludes the separately funded health insurance credit and COLA'));

    /* Panel D keeps the three totals separate and arithmetically honest */
    for (const acts of [[['setRange', 'i-repl', 80], ['setRange', 'i-notrepl', 5]],
      [['setRange', 'i-repl', 100], ['setRange', 'i-notrepl', 0]]]) {
      const r = await drive(page, acts);
      near('Panel D pension total equals the Panel B net liability',
        r.model.panelD.pensionImpact, r.model.combined.netLiability, 1e-9);
      near('Panel D payroll total equals the Panel C total',
        r.model.panelD.payrollWorkforceEffect, r.model.workforce.total, 1e-9);
      near('Panel D combined is payroll less pension, nothing else',
        r.model.panelD.combinedScenarioEffect,
        r.model.workforce.total - r.model.combined.netLiability, 1e-9);
    }
    check('the Panel D warning is present verbatim',
      (await page.evaluate("return document.getElementById('d-note').textContent"))
        .includes('Combined fiscal effect is a scenario result, not an actuarial ' +
          'certification or VRS fiscal impact statement.'));

    /* ---------------------------------------------------------------- */
    startGroup('10. Dimensional sanity of the workforce panel');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    for (const months of [0, 1, 3, 6, 12]) {
      const r = await drive(page, [['setRange', 'i-vac', months],
        ['setRange', 'i-repl', 90], ['setRange', 'i-notrepl', 0]]);
      const w = r.model.workforce;
      const meanAccel = r.model.combined.meanAcceleration;
      /* A vacancy of N months is N/12 of ONE YEAR of the replacement's pay.
         The departing-payroll figure is a present value over the whole
         acceleration window, which averages more than a year, so the two
         readings differ by roughly the mean acceleration. */
      const annualised = w.departingPayroll / Math.max(meanAccel, 1e-9);
      check(`vacancy ${months} months: valued as ${months} months of pay`,
        w.vacancyPayroll <= annualised * (months / 12) * 1.05 + 1,
        `vacancy ${fmtN(w.vacancyPayroll)}; ${months} months at the modeled ` +
        `annual rate of ${fmtN(annualised)} is ${fmtN(annualised * months / 12)} ` +
        `(mean acceleration ${meanAccel.toFixed(2)} years) — months/12 is being ` +
        `applied as a fraction of the whole acceleration window instead of a ` +
        `fraction of a year`);
      /* The position IS refilled in this scenario, so some replacement pay
         must remain whenever the vacancy is shorter than the window. */
      if (months > 0 && months / 12 < meanAccel) {
        check(`vacancy ${months} months: the refilled position still draws pay`,
          w.replacementPayroll > 1,
          `replacement payroll ${fmtN(w.replacementPayroll)} with a ` +
          `${months}-month vacancy against a ${meanAccel.toFixed(2)}-year window — ` +
          `the model has the post unfilled for the entire window`);
      }
      check(`vacancy ${months} months: replacement payroll stays non-negative`,
        w.replacementPayroll >= -1e-9);
    }

    /* ---------------------------------------------------------------- */
    startGroup('11. The population funnel narrows at every step');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const FUNNEL_CASES = [
      ['central', []],
      ['high take-up', [['setRange', 'i-takeup', 50]]],
      ['teacher-weighted veteran shares',
        [['setRange', 'i-vst', 1], ['setRange', 'i-vtc', 12], ['setRange', 'i-vps', 1]]],
      ['state-weighted veteran shares',
        [['setRange', 'i-vst', 16], ['setRange', 'i-vtc', 0.5], ['setRange', 'i-vps', 1]]],
      ['subdivision-weighted veteran shares',
        [['setRange', 'i-vst', 1], ['setRange', 'i-vtc', 0.5], ['setRange', 'i-vps', 18]]],
      ['all filters wide open', [['setRange', 'i-qual', 100], ['setRange', 'i-bar', 0],
        ['setRange', 'i-notbought', 100]]]
    ];
    for (const [label, acts] of FUNNEL_CASES) {
      await page.evaluate("window.__T.click('btn-reset'); return 1");
      await settle(page);
      const r = await drive(page, acts);
      const steps = r.model.funnel.map((s) => s.value);
      const up = [];
      for (let i = 1; i < steps.length; i++) {
        if (steps[i] > steps[i - 1] + 1e-6) up.push(`${i} → ${i + 1}`);
      }
      check(`funnel (${label}) never widens from one step to the next`,
        up.length === 0,
        `steps ${steps.map((x) => x.toFixed(1)).join(' | ')} — widens at ${up.join(', ')}` +
        ' (steps 3–6 average the veteran share by total active headcount, while ' +
        'step 7 applies it per employer to the near-threshold population)');
      for (const s of r.model.funnel) {
        check(`funnel (${label}) step provenance is one of the three labels`,
          ['Published Fact', 'Derived Estimate', 'Scenario Assumption']
            .includes(s.provenance), s.provenance);
      }
      check(`funnel (${label}) has all eight steps`, r.model.funnel.length === 8);
    }

    /* ---------------------------------------------------------------- */
    startGroup('12. Monotonic responses a legislator would expect');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const mono = [
      ['take-up', 'i-takeup', [5, 10, 20, 30, 50], (m) => m.panelA.totalParticipants, 'up'],
      ['take-up → liability', 'i-takeup', [5, 20, 50], (m) => m.combined.netLiability, 'up'],
      ['φ → liability falls', 'i-phi', [0, 25, 50, 75, 100],
        (m) => m.combined.netLiability, 'down'],
      ['replacement % → payroll effect falls', 'i-repl', [75, 85, 95, 100],
        (m) => m.workforce.total, 'down'],
      ['positions eliminated → payroll effect rises', 'i-notrepl', [0, 2.5, 5, 10],
        (m) => m.workforce.total, 'up'],
      ['qualifying share → participants rise', 'i-qual', [50, 80, 100],
        (m) => m.panelA.totalParticipants, 'up'],
      ['retired-pay bar → participants fall', 'i-bar', [0, 18, 50],
        (m) => m.panelA.totalParticipants, 'down'],
      ['not-already-bought → participants rise', 'i-notbought', [30, 70, 100],
        (m) => m.panelA.totalParticipants, 'up']
    ];
    for (const [label, id, values, pick, dir] of mono) {
      await page.evaluate("window.__T.click('btn-reset'); return 1");
      await settle(page);
      const seq = [];
      for (const v of values) {
        const r = await drive(page, [['setRange', id, v]]);
        seq.push(pick(r.model));
      }
      let okMono = true;
      for (let i = 1; i < seq.length; i++) {
        if (dir === 'up' && seq[i] < seq[i - 1] - 1e-6) okMono = false;
        if (dir === 'down' && seq[i] > seq[i - 1] + 1e-6) okMono = false;
      }
      check(`${label} is monotone ${dir} across ${values.join(', ')}`, okMono,
        seq.map(fmtN).join(' → '));
    }

    /* ---------------------------------------------------------------- */
    startGroup('13. Member examples track the behavioural assumption');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page);
    const phi0 = await drive(page, [['setRange', 'i-phi', 0]]);
    const phi100 = await drive(page, [['setRange', 'i-phi', 100]]);
    assertReading('φ = 0', phi0);
    assertReading('φ = 1', phi100);
    check('at φ = 0 the Plan 1 example is subsidised (gains)',
      phi0.model.memberA.gainsOnBlend === true
        && phi0.text.e.includes('Gains'));
    check('at φ = 1 the Plan 1 example overpays',
      phi100.model.memberA.gainsOnBlend === false
        && phi100.text.e.includes('Overpays'));
    near('at φ = 0 the member net equals the frozen-service net',
      phi0.model.memberA.netBlended, phi0.model.memberA.netSub, 1e-6);
    near('at φ = 1 the member net equals the work-to-eligibility net',
      phi100.model.memberA.netBlended, phi100.model.memberA.netWte, 1e-6);
    check('the $341,065 figure is limited to profile A and not called a model-wide maximum',
      phi0.text.e.includes('341,065')
        && phi0.text.e.includes('most favorable of the seven published profiles')
        && phi0.text.e.includes('not a model-wide maximum')
        && phi0.text.e.includes('419,000'));
    check('negative pension impact is labelled as a gain, not a cost',
      phi100.model.panelD.pensionImpact < 0
        && phi100.text.d.includes('a gain to the plan')
        && !phi100.text.d.includes('a cost to the plan'));
    check('negative basis points use the typographic minus sign',
      phi100.text.b.includes('−0.09 bp') && !phi100.text.b.includes('-0.09 bp'));
    check('the Plan 2 example shows two years of acceleration, not four',
      Math.abs(phi0.model.memberD.accelerationYears - 2) < 1e-9,
      String(phi0.model.memberD.accelerationYears));

    /* ---------------------------------------------------------------- */
    startGroup('14. Preset scenarios');
    const presetKeys = await page.evaluate(
      "return Array.prototype.map.call(document.querySelectorAll('#presets [data-preset]')," +
      " function(b){return b.getAttribute('data-preset');})");
    check('all six presets are offered', presetKeys.length === 6, presetKeys.join(', '));
    check('the low-cost preset is not labelled conservative',
      (await page.evaluate("return document.getElementById('presets').textContent"))
        .includes('Low Participation (low-cost case)')
      && !(await page.evaluate("return document.getElementById('presets').textContent"))
        .includes('Conservative'));
    const expectPreset = {
      conservative: { takeUp: 0.10, replacementPct: 1.00, notReplacedPct: 0, vacancyMonths: 0, phi: 0.75 },
      central: { takeUp: 0.20, replacementPct: 0.90, notReplacedPct: 0, vacancyMonths: 0, phi: 0.50 },
      high: { takeUp: 0.30, replacementPct: 0.90, notReplacedPct: 0,
        qualifyingShare: 0.90, retiredPayBar: 0.12, notAlreadyBought: 0.85 },
      turnover: { takeUp: 0.20, replacementPct: 0.85, notReplacedPct: 0.05, vacancyMonths: 3 },
      noWorkforce: { replacementPct: 1.00, notReplacedPct: 0, vacancyMonths: 0 },
      hybrid: { includeHybrid: true }
    };
    for (const key of presetKeys) {
      await page.evaluate(
        `document.querySelector('#presets [data-preset="${key}"]').click(); return 1`);
      await settle(page, true);
      const r = assertReading(`preset ${key}`,
        await page.evaluate('return window.__T.rendered()'));
      const want = expectPreset[key] || {};
      for (const [pk, pv] of Object.entries(want)) {
        const got = r.model.params[pk];
        check(`preset ${key} sets ${pk} = ${pv}`,
          typeof pv === 'boolean' ? got === pv : Math.abs(got - pv) < 1e-9,
          `got ${got}`);
      }
      const hl = await page.evaluate(
        "return Array.prototype.filter.call(" +
        "document.querySelectorAll('#presets [data-preset]')," +
        " function(b){return b.classList.contains('btn-primary');})" +
        ".map(function(b){return b.getAttribute('data-preset');})");
      check(`preset ${key} is the one highlighted in the preset list`,
        hl.length === 1 && hl[0] === key,
        `highlighted: ${hl.join(', ') || 'none'}`);
      check(`preset ${key} labels itself in the scenario chip`,
        r.raw.chip.length > 0 && r.raw.chip !== 'Custom scenario',
        `chip reads "${r.raw.chip}"`);
      /* A preset whose settings are off the control grid shows one number
         and models another, and silently changes the moment any other
         control is touched. */
      for (const [id, rule] of Object.entries(LABEL_RULE)) {
        const rng = r.raw.ranges[id];
        const v = parseFloat(rng.value);
        const steps = (v - parseFloat(rng.min)) / parseFloat(rng.step);
        check(`preset ${key}: ${id} sits exactly on its own step grid`,
          Math.abs(steps - Math.round(steps)) < 1e-6,
          `value ${rng.value} is not reachable from min ${rng.min} in steps of ${rng.step}`);
      }
      if (key === 'high') {
        near('preset high keeps the 1.6x state veteran share exactly',
          r.model.params.veteranShare.ST, 0.096, 1e-9);
        near('preset high keeps the 1.6x subdivision veteran share exactly',
          r.model.params.veteranShare.PS, 0.112, 1e-9);
      }
    }
    /* the scenario that matters most: pension impact with no workforce offset */
    await page.evaluate(
      "document.querySelector('#presets [data-preset=\"noWorkforce\"]').click(); return 1");
    await settle(page, true);
    const nw = await page.evaluate('return window.__T.rendered()');
    near('No Workforce Savings preset ⇒ payroll effect exactly zero',
      nw.model.workforce.total, 0, 1e-6);
    near('No Workforce Savings preset ⇒ pension impact unchanged from central',
      nw.model.combined.netLiability, base.model.combined.netLiability, 1e-6);
    near('No Workforce Savings preset ⇒ combined effect is the pension cost alone',
      nw.model.panelD.combinedScenarioEffect, -nw.model.combined.netLiability, 1e-6);

    /* ---------------------------------------------------------------- */
    startGroup('15. Reset to Baseline');
    await drive(page, [['clickSeg', 'seg-participant-mode', 'direct'],
      ['setNum', 'i-p1n', 999], ['setRange', 'i-takeup', 47],
      ['setRange', 'i-phi', 15], ['setRange', 'i-disc', 8.75],
      ['setCheck', 'i-hybrid', true], ['setSelect', 'i-rule', 'D4b']]);
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page, true);
    const resetR = assertReading('after reset', await page.evaluate('return window.__T.rendered()'));
    near('reset returns the central net liability',
      resetR.model.combined.netLiability, base.model.combined.netLiability, 1e-6);
    near('reset returns the central bp', resetR.model.combined.bp, base.model.combined.bp, 1e-9);
    check('reset clears the direct participant entry',
      resetR.raw.nums['i-p1n'] === '' && resetR.raw.nums['i-p2n'] === '');
    check('reset clears the salary overrides',
      resetR.raw.nums['i-p1sal'] === '' && resetR.raw.nums['i-p2sal'] === '');
    check('reset restores every mode segment',
      resetR.raw.segs['seg-participant-mode'] === 'model'
      && resetR.raw.segs['seg-bridge-mode'] === 'dist'
      && resetR.raw.segs['seg-salary-mode'] === 'model',
      JSON.stringify(resetR.raw.segs));
    check('reset restores the purchase rule and the hybrid exclusion',
      resetR.raw.selects['i-rule'] === 'D4a' && resetR.raw.checks['i-hybrid'] === false);
    check('reset puts the scenario chip back to Central',
      resetR.raw.chip === 'Central case', resetR.raw.chip);

    /* ---------------------------------------------------------------- */
    startGroup('16. Downloadable scenario summary and CSV');
    await drive(page, [['setRange', 'i-takeup', 30], ['setRange', 'i-repl', 85],
      ['setRange', 'i-notrepl', 5]], { tornado: true });
    const live = await page.evaluate('return window.__T.rendered()');
    const csv = await page.evaluate("return window.__T.capture('csv')");
    check('CSV downloads with a sensible filename',
      !!csv.name && csv.name.endsWith('.csv'), String(csv.name));
    check('CSV is not empty', !!csv.text && csv.text.length > 500,
      csv.text ? `${csv.text.length} bytes` : 'no payload');
    if (csv.text) {
      check('CSV carries the scenario the dashboard is showing (take-up 30%)',
        csv.text.includes('30%'));
      check('CSV carries the combined rate impact shown on Panel B',
        csv.text.includes(live.model.combined.bp.toFixed(2)),
        `looking for ${live.model.combined.bp.toFixed(2)}`);
      check('CSV carries the required qualifier on the 0.19 bp style figure',
        /excludes.*health insurance credit and COLA/i.test(csv.text));
      check('CSV labels funnel steps with their provenance',
        csv.text.includes('Published Fact') && csv.text.includes('Scenario Assumption'));
      check('CSV never uses the word Savings as an output label',
        !/,\s*"?Savings/i.test(csv.text));
      check('CSV carries the phi warning and purchaser-count limitation',
        /no published data bears on it/i.test(csv.text)
        && /not re-estimated/i.test(csv.text));
      check('CSV marks the combined scenario result READ LAST',
        csv.text.includes('READ LAST'));
      /* The walk-through tells the reader that BOTH exports carry the
         attribution line. The handout did and the CSV did not.
         MOO-271 finding M-07. */
      check('CSV carries the attribution line, as the walk-through says it does',
        /Policy Development Team/.test(csv.text) &&
        /pending review by veterans/i.test(csv.text),
        'an export travels without the page around it, so it has to carry its ' +
        'own attribution');
    }
    const hand = await page.evaluate("return window.__T.capture('handout')");
    check('scenario summary downloads with a sensible filename',
      !!hand.name && /\.html?$/.test(hand.name), String(hand.name));
    check('scenario summary is not empty', !!hand.text && hand.text.length > 1000,
      hand.text ? `${hand.text.length} bytes` : 'no payload');
    if (hand.text) {
      check('scenario summary carries the mandatory disclaimer',
        /not an actuarial certification/i.test(hand.text)
        && hand.text.includes('30-19.1:7'));
      check('scenario summary carries the three separate totals',
        /pension/i.test(hand.text) && /payroll/i.test(hand.text)
        && /combined/i.test(hand.text));
      check('scenario summary reports the scenario actually on screen',
        hand.text.includes(live.model.combined.bp.toFixed(2)),
        `looking for ${live.model.combined.bp.toFixed(2)} bp`);
      check('scenario summary carries the preparation attribution',
        /Policy Development Team/.test(hand.text));
      /* The qualifier must survive export, because an exported file travels
         without the page around it. Pinned to the substance rather than to a
         version number so a later version bump does not look like a passing
         test of a missing qualifier. */
      check('scenario summary carries the complete basis-point qualifier',
        /complete for bill version 1\.1/i.test(hand.text)
        && /refresh against the bill as introduced/i.test(hand.text)
        && /unquantified COLA exposure/i.test(hand.text)
        && /modeled retirement-plan employer contribution impact/i.test(hand.text));
      check('scenario summary states the current bill and package version',
        /bill version 1\.4/i.test(hand.text) && /package version 1\.6/i.test(hand.text));
    }
    await page.evaluate("window.__T.setRange('i-phi',90); return 1");
    await sleep(90); /* main render done; the 220ms chart debounce is intentionally pending */
    const immediateReading = await page.evaluate('return window.__T.rendered()');
    const immediateCsv = await page.evaluate("return window.__T.capture('csv')");
    const expectedFunnel = nodeSide.Engine.tornado(immediateReading.model.params).rows
      .find((r) => r.key === 'funnel');
    check('CSV sensitivity is computed synchronously for the exported scenario',
      immediateCsv.text.includes(expectedFunnel.lowBp.toFixed(3) + ' bp')
      && immediateCsv.text.includes(expectedFunnel.highBp.toFixed(3) + ' bp'),
      (immediateCsv.text.match(/"Sensitivity","Veteran[^\r\n]*/) ||
        ['expected the phi=90 funnel sensitivity, not the preceding scenario'])[0]);
    await drive(page, [['setRange', 'i-repl', 100], ['setRange', 'i-notrepl', 0],
      ['setRange', 'i-vac', 12]], { tornado: true });
    const guardCsv = await page.evaluate("return window.__T.capture('csv')");
    const guardHand = await page.evaluate("return window.__T.capture('handout')");
    check('100%/12-month CSV explains its nonzero payroll effect',
      guardCsv.text.includes('100% replacement: any nonzero amount consists of vacancy'));
    check('100%/12-month handout explains its nonzero payroll effect',
      guardHand.text.includes('100% replacement: any nonzero amount consists of vacancy'));

    /* ---------------------------------------------------------------- */
    startGroup('17. Sensitivity panel (Panel F)');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page, true);
    const f = await page.evaluate(
      "return {text: document.getElementById('f-table').textContent," +
      " rows: document.querySelectorAll('#f-table tbody tr').length}");
    check('the tornado lists all required drivers', f.rows >= 7, `${f.rows} rows`);
    for (const driver of ['Participant count', 'Behavioural assumption',
      'Average bridge amount', 'Replacement salary percentage', 'Positions not replaced',
      'Salary growth', 'Actuarial discount rate']) {
      check(`tornado tests ${driver}`, f.text.includes(driver));
    }
    check('the two workforce drivers are reported as having no pension effect',
      (f.text.match(/none/g) || []).length >= 2, f.text.slice(0, 200));
    check('phi sensitivity reaches both control endpoints',
      f.text.includes('φ = 1.00') && f.text.includes('φ = 0.00'));
    const fNote = await page.evaluate("return document.getElementById('f-note').textContent");
    check('sensitivity note renders no raw strong tags',
      !fNote.includes('<strong>') && !fNote.includes('</strong>'));
    check('sensitivity note discloses sign crossing and fixed purchaser counts',
      fNote.includes('φ = 0.84') && fNote.includes('not re-estimated'));
    await drive(page, [['setRange', 'i-phi', 90]], { tornado: true });
    const gNote = await page.evaluate("return document.getElementById('g-note').textContent");
    check('Panel G range follows the current scenario and avoids a false superlative',
      gNote.includes('−0.01 bp') && gNote.includes('−0.08 bp')
      && !gNote.includes('single largest uncertainty'));

    /* ---------------------------------------------------------------- */
    startGroup('18. Glossary tooltips for the required terms');
    /* A glossary ENTRY is not a tooltip. The term counts as explained on
       hover only where some element actually carries that entry as its
       title, at the place the term is used. */
    const REQUIRED_TERMS = ['approximate normal cost', 'actuarial equivalent cost',
      'unreduced retirement', 'rule of 90', 'employer contribution-rate basis points',
      'pension liability', 'payroll effect', 'present value'];
    const tipAudit = await page.evaluate(
      'var want = ' + JSON.stringify(REQUIRED_TERMS) + ';' +
      "var titles = Array.prototype.map.call(document.querySelectorAll('[title]')," +
      ' function (e) { return e.title; });' +
      'var gl = window.VRS_REGISTRY.glossary;' +
      'return want.map(function (t) {' +
      '  var e = gl[t];' +
      '  var body = e ? (e.short + " " + e.long) : null;' +
      '  return { term: t, inGlossary: !!e,' +
      '    tipped: !!body && titles.some(function (x) { return x.indexOf(body) >= 0; }) };' +
      '});');
    for (const row of tipAudit) {
      check(`glossary defines "${row.term}"`, row.inGlossary);
      check(`tooltip attached where "${row.term}" is used`, row.tipped,
        'the glossary entry exists but no element on the dashboard carries it as a ' +
        'hover tooltip, so the term is only explained in the registry table at the ' +
        'bottom of the page');
    }
    /* The output-naming rule, checked where it matters: on screen. */
    const bodyText = await page.evaluate('return document.body.innerText');
    check('no output on the dashboard is labelled "Savings"',
      !/\bSavings\b/.test(bodyText.replace(/No Workforce Savings/g, '')),
      (bodyText.match(/.{0,40}\bSavings\b.{0,40}/g) || []).join(' ~ '));
    for (const label of ['Modeled pension impact', 'Modeled payroll effect',
      'Combined scenario effect']) {
      check(`required output label in use: "${label}"`, bodyText.includes(label));
    }
    const seen = bodyText.replace(/\s+/g, ' ').replace(/[’‘]/g, "'");
    check('the preparation attribution is visible on the rendered page',
      seen.includes('Prepared by Policy Development Team using legal, policy, and ' +
        "financial analysis tools, pending review by veterans' legal counsel"));
    check('the illustrative-model disclaimer is visible on the rendered page',
      /not an actuarial certification/i.test(seen) && seen.includes('30-19.1:7'));

    /* ---------------------------------------------------------------- */
    /* The walk-through is the document a stakeholder is actually handed, so
       its claims are tested the same way every other output is: drive the
       settings it tells the reader to choose, then require the figure it
       quotes to be ON SCREEN. Prose is read from js/walkthrough.js and the
       screen is read from the panels only — never from the drawer — so the
       check cannot pass by finding the sentence that makes the claim. */
    startGroup('19. The guided walk-through, and every figure it quotes');
    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page, true);

    const wt = await page.evaluate('return JSON.stringify({' +
      'steps: window.VRS_WALKTHROUGH.steps.length,' +
      'checks: window.VRS_WALKTHROUGH.checks.length,' +
      'hidden: document.getElementById("wt-drawer").getAttribute("aria-hidden"),' +
      'open: document.body.classList.contains("wt-open")})')
      .then(JSON.parse);
    check('walk-through content module ships ten steps', wt.steps === 10, String(wt.steps));
    check('the drawer starts closed', wt.hidden === 'true' && wt.open === false);

    /* The content module's own internal consistency. A step that tells the
       reader to click a named preset must carry that preset's parameters, or
       the instruction and the figures disagree. */
    const wtShape = await page.evaluate(
      'var W = window.VRS_WALKTHROUGH, E = window.VRSEngine, pr = E.presets();' +
      'var out = { incomplete: [], presetMismatch: [], rawTags: [] };' +
      'W.steps.forEach(function (s, i) {' +
      '  ["id","title","panel","params","choose","look","seeing","why","significance"]' +
      '    .forEach(function (k) { if (!s[k]) out.incomplete.push(s.id + ":" + k); });' +
      '  if (s.preset) {' +
      '    var want = pr[s.preset] ? pr[s.preset].params : null;' +
      '    if (!want) out.presetMismatch.push(s.id + ": no preset " + s.preset);' +
      '    else {' +
      '      var a = Object.assign({}, E.defaults(), want);' +
      '      var b = Object.assign({}, E.defaults(), s.params);' +
      '      Object.keys(a).forEach(function (k) {' +
      '        if (JSON.stringify(a[k]) !== JSON.stringify(b[k]))' +
      '          out.presetMismatch.push(s.id + ":" + k);' +
      '      });' +
      '    }' +
      '  }' +
      '  ["seeing","why","significance"].forEach(function (k) {' +
      '    if (/&lt;strong|&amp;lt;/.test(s[k])) out.rawTags.push(s.id + ":" + k);' +
      '  });' +
      '});' +
      'return JSON.stringify(out);').then(JSON.parse);
    check('every step carries all of its required fields',
      wtShape.incomplete.length === 0, wtShape.incomplete.join(', '));
    check('a step that names a preset carries that preset’s parameters',
      wtShape.presetMismatch.length === 0, wtShape.presetMismatch.join(', '));
    check('no step has double-escaped markup', wtShape.rawTags.length === 0,
      wtShape.rawTags.join(', '));

    /* Drawer behaviour: open, step, apply, close. */
    await page.evaluate("window.__T.click('btn-walkthrough'); return 1");
    await settle(page, false);
    const wtOpen = await page.evaluate('return JSON.stringify({' +
      'open: document.body.classList.contains("wt-open"),' +
      'hidden: document.getElementById("wt-drawer").getAttribute("aria-hidden"),' +
      'dots: document.querySelectorAll("#wt-progress button").length,' +
      'count: document.getElementById("wt-count").textContent,' +
      'heading: (document.querySelector("#wt-body h3")||{}).textContent || ""})')
      .then(JSON.parse);
    check('the walk-through button opens the drawer beside the dashboard',
      wtOpen.open === true && wtOpen.hidden === 'false');
    check('the drawer offers an introduction, ten steps and a summary',
      wtOpen.dots === 12, String(wtOpen.dots));
    check('the drawer opens on the introduction',
      wtOpen.count === 'Introduction' && wtOpen.heading.length > 10,
      `${wtOpen.count} / ${wtOpen.heading}`);

    await page.evaluate("window.__T.click('wt-next'); return 1");
    await settle(page, false);
    const wtStep1 = await page.evaluate('return JSON.stringify({' +
      'count: document.getElementById("wt-count").textContent,' +
      'apply: !!document.querySelector("#wt-body [data-wt-apply]"),' +
      'set: document.querySelectorAll("#wt-body .wt-set dt").length})')
      .then(JSON.parse);
    check('Next reaches step 1 of 10', wtStep1.count === 'Step 1 / 10', wtStep1.count);
    check('a step names the settings to choose and offers to apply them',
      wtStep1.apply === true && wtStep1.set >= 2, JSON.stringify(wtStep1));

    /* Applying a step drives the dashboard, which is the whole point of
       putting the walk-through beside the panels rather than in a second
       window. Step 1 is the No Workforce Savings corner. */
    await page.evaluate(
      "document.querySelector('#wt-body [data-wt-apply]').click(); return 1");
    await settle(page, true);
    const applied = await page.evaluate('return JSON.stringify({' +
      'chip: document.getElementById("scenario-chip").textContent,' +
      'repl: document.getElementById("i-repl").value,' +
      'notrepl: document.getElementById("i-notrepl").value,' +
      'vac: document.getElementById("i-vac").value})').then(JSON.parse);
    check('applying step 1 sets the dashboard to No Workforce Savings',
      applied.chip === 'No Workforce Savings case', applied.chip);
    check('applying a step moves the real controls, not just the model',
      applied.repl === '100' && applied.notrepl === '0' && applied.vac === '0',
      JSON.stringify(applied));

    await page.evaluate("window.__T.click('wt-close'); return 1");
    await settle(page, false);
    check('the drawer closes and releases the dashboard layout',
      (await page.evaluate(
        'return document.body.classList.contains("wt-open") ? "open" : "closed"')) === 'closed');

    /* Every quoted figure, against the panels. */
    const SLIDER_OF = {
      replacementPct: ['i-repl', 100], notReplacedPct: ['i-notrepl', 100],
      vacancyMonths: ['i-vac', 1], phi: ['i-phi', 100], takeUp: ['i-takeup', 100],
      qualifyingShare: ['i-qual', 100], retiredPayBar: ['i-bar', 100],
      notAlreadyBought: ['i-notbought', 100], salaryGrowth: ['i-growth', 100],
      discount: ['i-disc', 100], improvement: ['i-impr', 100],
      p1BridgeYears: ['i-p1y', 1], p2BridgeYears: ['i-p2y', 1]
    };
    const VET_OF = { ST: 'i-vst', TC: 'i-vtc', PS: 'i-vps' };

    function actionsFor(params) {
      const acts = [];
      for (const [k, v] of Object.entries(params)) {
        if (SLIDER_OF[k]) { acts.push(['setRange', SLIDER_OF[k][0], v * SLIDER_OF[k][1]]); }
        else if (k === 'veteranShare') {
          for (const [e, share] of Object.entries(v)) {
            acts.push(['setRange', VET_OF[e], +(share * 100).toFixed(4)]);
          }
        } else if (k === 'participantMode') { acts.push(['clickSeg', 'seg-participant-mode', v]); }
        else if (k === 'p1Participants') { acts.push(['setNum', 'i-p1n', v]); }
        else if (k === 'p2Participants') { acts.push(['setNum', 'i-p2n', v]); }
        else if (k === 'bridgeYearsMode') { acts.push(['clickSeg', 'seg-bridge-mode', v]); }
        else { throw new Error('group 19 cannot drive parameter: ' + k); }
      }
      return acts;
    }

    const wtChecks = await page.evaluate(
      'return JSON.stringify(window.VRS_WALKTHROUGH.checks)').then(JSON.parse);
    for (const c of wtChecks) {
      await page.evaluate("window.__T.click('btn-reset'); return 1");
      await settle(page, false);
      await drive(page, actionsFor(c.params), { tornado: true });
      /* Panels only. Reading document.body would include the drawer, and the
         drawer contains the sentence making the claim. */
      const shown = await page.evaluate(
        "return document.querySelector('.panels').innerText");
      for (const t of c.tokens) {
        check(`${c.step} (${c.note}): "${t}" is shown on the panels`,
          shown.includes(t),
          'the walk-through quotes this figure at these settings but the ' +
          'dashboard does not display it — the narration has drifted from the model');
      }
    }

    await page.evaluate("window.__T.click('btn-reset'); return 1");
    await settle(page, true);

    /* ----------------------------------------------------------------
       Group 18 proves every quoted figure is one the model actually
       produces. It cannot prove a figure is quoted WITH the qualifier the
       package requires, because that is a property of the prose and not of
       the panels — and a qualifier dropped from the narration is this
       document's characteristic failure. MOO-271 found three instances of
       it, including $341,065 travelling bare on page 4 with every component
       of a ten-fold error available.

       So this group reads the content module as text, section by section,
       and asserts the rules the package states for itself. The section is
       the unit because a section is what the drawer shows at once and what
       prints as a block: a qualifier two sections away does not travel with
       a screenshot. Recommended by the MOO-271 review, section 6 item 9. */
    startGroup('20. Qualifier-bound figures carry their qualifiers');

    const sections = await page.evaluate(
      'var W = window.VRS_WALKTHROUGH, out = [];' +
      'function strip(h) { var d = document.createElement("div");' +
      '  d.innerHTML = h; return d.innerText || d.textContent || ""; }' +
      'out.push({ name: "introduction", text: strip(W.intro.join(" ")) });' +
      'out.push({ name: "orientation", text: strip(' +
      '  W.orientation.items.map(function (i) { return i[0] + " " + i[1]; })' +
      '    .join(" ") + " " + (W.orientation.shortPath || "")) });' +
      'W.steps.forEach(function (s, i) {' +
      '  out.push({ name: "step " + (i + 1),' +
      '    text: strip([s.title, s.seeing, s.why, s.significance, s.caution || ""]' +
      '      .join(" ")) });' +
      '});' +
      'W.closing.items.forEach(function (it, i) {' +
      '  out.push({ name: "closing point " + (i + 1), text: strip(it) });' +
      '});' +
      'out.push({ name: "closing footer", text: strip(W.closing.footer) });' +
      'return JSON.stringify(out);').then(JSON.parse);

    check('the content module exposes every section as readable prose',
      sections.length === 1 + 1 + 10 + 5 + 1, `${sections.length} sections`);

    /* A basis-point figure must never appear without the exclusion. */
    const BP = /\d+\.\d+\s*(?:bp\b|basis point)/i;
    for (const s of sections.filter((x) => BP.test(x.text))) {
      const t = s.text.toLowerCase();
      check(`${s.name}: its basis-point figures state what they exclude`,
        /exclud/.test(t) && t.includes('health insurance credit') &&
        t.includes('cola'),
        'this section quotes a basis-point figure but does not say it is the ' +
        'modeled retirement-plan impact excluding the separately funded HIC ' +
        'and COLA effects — the package rule requires that on every public use');
    }

    /* $341,065 must never appear without the whole qualifier. It is the one
       figure in the package that produces a ten-fold error when multiplied. */
    for (const s of sections.filter((x) => x.text.includes('341,065'))) {
      const t = s.text.toLowerCase();
      check(`${s.name}: $341,065 is not presented as a cost per veteran`,
        t.includes('not a cost per veteran'),
        'the figure is the net value in the single most favourable published ' +
        'profile; multiplying it by a participant count overstates the ' +
        'model’s own aggregate roughly tenfold');
      check(`${s.name}: $341,065 is identified as the most favourable profile`,
        /most favourable|most favorable/.test(t) && /seven|profile/.test(t),
        'without this the figure reads as typical rather than extreme');
      check(`${s.name}: $341,065 is not called a maximum`,
        !/maximum/.test(t) || /not a (model-wide )?maximum|not a maximum/.test(t),
        'the cell grid reaches about $419,000, so "maximum" is falsifiable ' +
        'against the committed data');
    }

    /* The no-rate-change conclusion is true single-driver and false on the
       published compound-adverse case. It must not be stated unrestricted. */
    for (const s of sections.filter((x) => /nearest basis point/i.test(x.text))) {
      const t = s.text.toLowerCase();
      check(`${s.name}: the no-rate-change claim is restricted to where it holds`,
        /single-driver|central case|compound/.test(t),
        'the fiscal model states that at 1.16 bp a plan’s rate does change ' +
        'to the nearest basis point, so an unrestricted claim contradicts the ' +
        'package’s own model');
    }

    /* Labels and readings the package formally withdrew must not reappear.

       Two scopes, because one of these is a term of art rather than an error.
       "frozen-service baseline" is the fiscal model's own name for the SUB
       baseline and the dashboard DEFINES it — registry.js carries a glossary
       entry stating it is the same-date, same-service, reduced-allowance
       counterfactual, which is exactly right. What package version 1.4
       withdrew was that label applied to the $341,065 FIGURE in a document
       with no glossary, which is the circulated walk-through. So the phrase is
       barred from the prose and permitted on the panels. The other three are
       simply wrong wherever they appear. */
    const WITHDRAWN_PROSE = [
      ['frozen-service', 'withdrawn as a label for the $341,065 figure, and ' +
        'undefined in a document with no glossary; it is a same-date, ' +
        'same-service reduced-allowance counterfactual']
    ];
    const WITHDRAWN_EVERYWHERE = [
      ['closed and shrinking', 'withdrawn in package version 1.4 in favour of ' +
        '"substantially closing, with named exceptions under review"'],
      ['51.1-142.2 b 3', 'the 24-month period is in an unnumbered concluding ' +
        'paragraph of subsection B, not in subdivision B 3'],
      ['state or federal', 'the inserted words are not in 10 U.S.C. § 12736']
    ];
    for (const [phrase, why] of WITHDRAWN_PROSE.concat(WITHDRAWN_EVERYWHERE)) {
      const hits = sections.filter((x) => x.text.toLowerCase().includes(phrase));
      check(`no section reintroduces "${phrase}"`, hits.length === 0,
        `${hits.map((h) => h.name).join(', ')} — ${why}`);
    }

    /* Panel labels and registry rows get quoted exactly as prose does, and the
       § 51.1-142.2 B 3 pinpoint survived in three of them after being
       corrected in the narration — including a Panel G funnel step a VRS
       reviewer reads directly. So the rule reaches the rendered dashboard too. */
    const pageText = await page.evaluate(
      'return (document.querySelector(".panels").innerText || "") + " " + ' +
      '(document.querySelector(".disclaimer").innerText || "")');
    for (const [phrase, why] of WITHDRAWN_EVERYWHERE) {
      check(`no panel or registry label reintroduces "${phrase}"`,
        !pageText.toLowerCase().includes(phrase), why);
    }

    /* The version stamp has to survive printing, which means it cannot live
       only in the masthead. MOO-271 finding S-01. */
    const footer = sections.find((s) => s.name === 'closing footer');
    check('the closing footer carries the bill and package version',
      !!footer && /version 1\.4/.test(footer.text) &&
      /package version 1\.6/.test(footer.text),
      'the masthead is display:none in print, so the footer is the only place ' +
      'a printed copy can be matched to the bill it narrates');

    /* ---------------------------------------------------------------- */
    startGroup('21. No page errors across the whole sweep');
    const errs = page.errors();
    check('no uncaught page exception during any state tested',
      errs.length === 0, errs.slice(0, 4).join('\n          '));
  } finally {
    await page.close();
  }
}

main().then(() => {
  console.log('\n' + '='.repeat(78));
  console.log(`  ${pass} passed, ${failures.length} failed`);
  if (failures.length) {
    console.log('\n  FAILURES, grouped:');
    let last = null;
    for (const f of failures) {
      if (f.group !== last) { console.log('\n  ' + f.group); last = f.group; }
      console.log('    - ' + f.label);
      if (f.detail) console.log('        ' + f.detail.split('\n').join('\n        '));
    }
  }
  console.log('='.repeat(78) + '\n');
  process.exit(failures.length ? 1 : 0);
}).catch((e) => {
  console.error('\nHARNESS ERROR: ' + e.stack + '\n');
  process.exit(3);
});
