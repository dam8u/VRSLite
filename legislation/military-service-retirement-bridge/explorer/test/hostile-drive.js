/* =====================================================================
   MOO-266 stakeholder review — hostile-driving probe.

   Not a code review (MOO-265 owns that). This drives the SHIPPED
   standalone document the way a legislative staffer with a point to make
   would, and records what the screen and the exports say at each stop:

     1. every preset, in order, with the headline numbers it produces;
     2. the cheapest screen reachable, and how many controls it took;
     3. whether the combined fiscal view can be driven to zero or negative;
     4. the literal handout and CSV text, for qualifier checking;
     5. which provenance badge sits on each number a VRS reviewer
        would challenge.

   Read-only: it does not modify the explorer.
   ===================================================================== */
'use strict';
const path = require('path');
const fs = require('fs');
const { launch } = require('./chrome.js');

const DOC = 'file://' + path.resolve(__dirname, '..', 'dist', 'explorer-standalone.html');
const OUT = process.env.OUT_DIR || path.resolve(__dirname);

const log = [];
function say(s) { log.push(s); console.log(s); }

/* Headline figures as the page itself renders them, read out of the DOM
   rather than recomputed, because what the reader believes is what the
   DOM says. */
const READ = `
  const t = (id) => { const e = document.getElementById(id); return e ? e.textContent.trim() : null; };
  const R = window.__capture || null;
  return {
    chip: t('scenario-chip'),
    panelB: (document.getElementById('panel-b')||{}).innerText || '',
    panelD: (document.getElementById('panel-d')||{}).innerText || '',
    panelE: (document.getElementById('panel-e')||{}).innerText || '',
    bp: R ? R.panelB.combined.bp : null,
    net: R ? R.panelB.combined.netLiability : null,
    valueSub: R ? R.panelB.combined.valueSub : null,
    valueWte: R ? R.panelB.combined.valueWte : null,
    valueBlended: R ? R.panelB.combined.valueBlended : null,
    price: R ? R.panelB.combined.price : null,
    participants: R ? R.panelB.combined.participants : null,
    payroll: R ? R.panelC.combined.total : null,
    combined: R ? R.panelD.combinedScenarioEffect : null
  };
`;

(async () => {
  const page = await launch(DOC);
  await page.ready('document.getElementById("panel-b") && ' +
    'document.getElementById("panel-b").innerText.indexOf("bp") > -1', 30000);

  /* Expose the live result object so we can read exact numbers rather than
     parse formatted strings. ui.js keeps `lastResult` in a closure; the
     engine is global, so re-run it with the same params the page used. */
  /* ui.js holds the same API object that window.VRSEngine is, so wrapping
     run() here captures exactly the result the page just rendered from. */
  await page.evaluate(`
    const E = window.VRSEngine;
    window.__eng = E;
    if (!E.__wrapped) {
      const real = E.run;
      E.run = function (p) { const r = real.apply(this, arguments); window.__capture = r; return r; };
      E.__wrapped = true;
    }
    return true;
  `);
  /* Force one render so __capture is populated before the first read. */
  await page.evaluate(`
    const el = document.getElementById('i-takeup');
    el.dispatchEvent(new Event('input', { bubbles: true }));
    return true;
  `);
  await page.sleep(250);

  /* ---------------------------------------------------- 1. every preset */
  const presets = await page.evaluate(`
    const E = window.__eng, pr = E.presets();
    return Object.keys(pr).map(k => ({ key: k, name: pr[k].name, desc: pr[k].description }));
  `);

  say('# MOO-266 hostile-driving log — ' + new Date().toISOString());
  say('# Document: ' + DOC);
  say('');
  say('## 1. Every preset, as the page renders it');
  say('');
  const presetRows = [];
  for (const p of presets) {
    await page.evaluate(
      `document.querySelector('[data-preset="${p.key}"]').click(); return true;`);
    await page.sleep(220);
    const r = await page.evaluate(READ);
    const row = {
      key: p.key, name: p.name, chip: r.chip,
      bp: r.bp, net: r.net, price: r.price, participants: r.participants,
      valueSub: r.valueSub, valueWte: r.valueWte, valueBlended: r.valueBlended,
      payroll: r.payroll, combined: r.combined
    };
    presetRows.push(row);
    say(`### ${p.name}  [${p.key}]`);
    say('    description : ' + p.desc);
    say('    chip        : ' + r.chip);
    say('    combined bp : ' + (r.bp === null ? 'n/a' : r.bp.toFixed(4)));
    say('    net liab    : ' + fmt(r.net));
    say('    purchasers  : ' + (r.participants === null ? 'n/a' : Math.round(r.participants)));
    say('    ANC paid in : ' + fmt(r.price));
    say('    value (sub) : ' + fmt(r.valueSub));
    say('    value (wte) : ' + fmt(r.valueWte));
    say('    value (phi) : ' + fmt(r.valueBlended));
    say('    payroll eff : ' + fmt(r.payroll));
    say('    COMBINED    : ' + fmt(r.combined));
    say('');
  }

  /* -------------------------------- 2. cheapest reachable screen, by hand */
  say('## 2. Driving it cheap — can a reader reach "free"?');
  say('');

  async function reset() {
    await page.evaluate(`document.getElementById('btn-reset').click(); return true;`);
    await page.sleep(220);
  }
  async function setSlider(id, value) {
    await page.evaluate(`
      const el = document.getElementById('${id}');
      el.value = ${JSON.stringify(String(value))};
      el.dispatchEvent(new Event('input', { bubbles: true }));
      return el.value;
    `);
    await page.sleep(90);
  }
  async function openAdvanced() {
    await page.evaluate(`document.getElementById('adv-panel').open = true; return true;`);
    await page.sleep(80);
  }

  /* Walk the sliders that move the number down, counting the moves. */
  const cheapSteps = [];
  await reset();
  let base = await page.evaluate(READ);
  say('baseline (Reset to Baseline): combined bp = ' + base.bp.toFixed(4) +
      ', combined fiscal = ' + fmt(base.combined));
  say('');

  const DOWN = [
    ['i-takeup', '1',  'Take-up rate to its floor'],
    ['i-phi',    '100','Behavioural assumption phi to 100% (everyone would have worked on)'],
    ['i-repl',   '70', 'Replacement salary to its floor'],
    ['i-notrepl','20', 'Positions not replaced to its ceiling'],
    ['i-vac',    '12', 'Vacancy months to its ceiling']
  ];
  await openAdvanced();
  for (const [id, v, label] of DOWN) {
    const got = await page.evaluate(`
      const el = document.getElementById('${id}');
      if (!el) return null;
      return { min: el.min, max: el.max, step: el.step, value: el.value };
    `);
    if (!got) { say('  (no control ' + id + ')'); continue; }
    await setSlider(id, v);
    await page.sleep(220);
    const r = await page.evaluate(READ);
    cheapSteps.push({ id, label, range: got, bp: r.bp, combined: r.combined, chip: r.chip });
    say(`  move ${cheapSteps.length}: ${label}  [${id} range ${got.min}..${got.max}]`);
    say(`           -> combined bp = ${r.bp.toFixed(4)}   combined fiscal = ${fmt(r.combined)}   chip = ${r.chip}`);
  }
  const cheapest = await page.evaluate(READ);
  say('');
  say('cheapest hand-driven screen: combined bp = ' + cheapest.bp.toFixed(4) +
      ' | combined fiscal = ' + fmt(cheapest.combined) +
      ' | purchasers = ' + Math.round(cheapest.participants));
  say('');
  say('--- Panel B as it reads on that screen ---');
  say(cheapest.panelB);
  say('');
  say('--- Panel D as it reads on that screen ---');
  say(cheapest.panelD);
  say('');

  /* ------------------------------- 3. exports from the cheapest screen */
  say('## 3. Exports taken from that same cheapest screen');
  say('');
  const exported = await page.evaluate(`
    /* Intercept the download instead of writing a file. */
    const grabbed = {};
    const realCreate = URL.createObjectURL;
    const blobs = [];
    URL.createObjectURL = function (b) { blobs.push(b); return 'blob:stub'; };
    const realClick = HTMLAnchorElement.prototype.click;
    HTMLAnchorElement.prototype.click = function () { grabbed.name = this.download; };
    document.getElementById('btn-handout').click();
    document.getElementById('btn-csv').click();
    HTMLAnchorElement.prototype.click = realClick;
    URL.createObjectURL = realCreate;
    return Promise.all(blobs.map(b => b.text())).then(texts => ({ texts: texts }));
  `);
  const handout = exported.texts[0] || '';
  const csv = exported.texts[1] || '';
  fs.writeFileSync(path.join(OUT, 'hostile-handout.html'), handout);
  fs.writeFileSync(path.join(OUT, 'hostile-scenario.csv'), csv);

  const handoutText = handout.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ');
  say('handout bytes: ' + handout.length + ' | csv bytes: ' + csv.length);
  for (const probe of ['0.19', '341,065', 'basis-point', 'basis point',
                       '30-19.1:7', 'Sec. 30-19.1:7', 'not an actuarial certification',
                       'health insurance credit', 'COLA', 'version 1.1',
                       'behavioural', 'φ', 'phi', 'Published Fact', 'Derived Estimate',
                       'Scenario Assumption']) {
    say(`  handout contains ${JSON.stringify(probe)}: ` +
        (handoutText.indexOf(probe) > -1 || handout.indexOf(probe) > -1));
    say(`      csv contains ${JSON.stringify(probe)}: ` + (csv.indexOf(probe) > -1));
  }
  say('');
  say('--- handout, text only ---');
  say(handoutText);
  say('');
  say('--- csv ---');
  say(csv);
  say('');

  /* ------------------------------------------- 4. provenance badge audit */
  say('## 4. Provenance badges, every one on the page');
  say('');
  const badges = await page.evaluate(`
    const out = [];
    document.querySelectorAll('[class*="prov"],[data-prov],.badge').forEach(function (el) {
      const txt = (el.textContent || '').trim();
      if (!txt) return;
      /* what the badge is attached to: nearest labelled row or heading */
      let ctx = el.closest('tr,li,.kpi,.row,.card');
      let label = ctx ? (ctx.innerText || '').trim().replace(/\\s+/g, ' ').slice(0, 220) : '';
      out.push({ badge: txt.slice(0, 60), cls: el.className, label: label });
    });
    return out;
  `);
  const seen = new Set();
  for (const b of badges) {
    const k = b.badge + '|' + b.label;
    if (seen.has(k)) continue;
    seen.add(k);
    say('  [' + b.badge + '] ' + b.label);
  }
  say('');
  say('badge count: ' + badges.length + ' | distinct: ' + seen.size);

  /* --------------------------------------- 5. registry provenance tallies */
  say('');
  say('## 5. Registry rows by provenance class');
  say('');
  const reg = await page.evaluate(`
    const el = document.getElementById('panel-registry');
    return el ? el.innerText : '';
  `);
  say(reg);

  say('');
  say('## 6. Console errors during the whole drive');
  const errs = page.errors();
  say(errs.length ? errs.join('\\n') : '  none');

  await page.close();
  fs.writeFileSync(path.join(OUT, 'hostile-drive-log.txt'), log.join('\n'));
  console.error('\nwrote ' + path.join(OUT, 'hostile-drive-log.txt'));
})().catch((e) => { console.error('FAILED: ' + (e && e.stack || e)); process.exit(1); });

function fmt(v) {
  if (v === null || v === undefined || isNaN(v)) return 'n/a';
  const s = Math.abs(v) >= 1e6 ? '$' + (v / 1e6).toFixed(3) + 'M'
          : '$' + Math.round(v).toLocaleString('en-US');
  return (v < 0 ? '(' + s.replace('$-', '$').replace('-', '') + ')' : s);
}
