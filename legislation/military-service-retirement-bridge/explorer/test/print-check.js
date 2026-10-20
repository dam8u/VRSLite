#!/usr/bin/env node
/* =====================================================================
   Does the disclaimer survive printing?

   MOO-271 finding S-01: walkthrough.html nested the .disclaimer block inside
   <header class="masthead">, which @media print sets to display:none. A
   `display: block !important` on a descendant of a display:none ancestor
   restores nothing, so every printed and PDF-exported copy of the
   walk-through silently lost the version stamp, the provenance legend and the
   attribution line. index.html had already been fixed for this in MOO-265.

   A stylesheet cannot be eyeballed for this. So the page is loaded, print
   media is emulated over the DevTools protocol, and the rendered box is
   measured — a zero-area rect or a null offsetParent is a failure however
   the computed style reads.

       node explorer/test/print-check.js

   Prepared by Policy Development Team using legal, policy, and financial
   analysis tools, pending review by veterans' legal counsel.
   ===================================================================== */
'use strict';
const path = require('path');
const { launch } = require('./chrome.js');

const here = __dirname;
const PAGES = [
  ['walkthrough.html', 'the guided walk-through'],
  ['index.html', 'the dashboard'],
  ['dist/walkthrough-standalone.html', 'the shipped walk-through'],
  ['dist/explorer-standalone.html', 'the shipped dashboard'],
  ['methodology.html', 'the methodology page'],
  ['dist/methodology-standalone.html', 'the shipped methodology page']
];
/* Must be legible in a committee folder. */
const MUST_PRINT = [
  ['illustrative policy-analysis model', 'the model disclaimer'],
  ['30-19.1:7', 'the VRS Board impact statement disclaimer'],
  ['Policy Development Team', 'the attribution line']
];

let pass = 0; const failures = [];
function check(label, ok, detail) {
  if (ok) { pass++; console.log('  ok    ' + label); }
  else { failures.push({ label, detail }); console.log('  FAIL  ' + label +
    (detail ? '\n          ' + detail : '')); }
}

async function main() {
  for (const [rel, what] of PAGES) {
    console.log('\n=== ' + rel + ' — ' + what + ' ===');
    const page = await launch('file://' + path.join(here, '..', rel));
    try {
      await page.ready('document.querySelector(".disclaimer")');
      /* Emulate print at a US Letter page box. */
      await page.send('Emulation.setEmulatedMedia', { media: 'print' });
      await page.sleep(220);

      const m = await page.evaluate(
        'var el = document.querySelector(".print-required");' +
        'if (!el) return JSON.stringify({ missing: true });' +
        'var r = el.getBoundingClientRect();' +
        'var cs = getComputedStyle(el);' +
        'return JSON.stringify({' +
        '  display: cs.display, visibility: cs.visibility,' +
        '  w: Math.round(r.width), h: Math.round(r.height),' +
        '  hasOffsetParent: !!el.offsetParent,' +
        '  insideMasthead: !!el.closest(".masthead"),' +
        '  text: (document.body.innerText || "")' +
        '});').then(JSON.parse);

      check('a print-required disclaimer exists', !m.missing);
      if (m.missing) continue;

      check('it is not nested inside the print-hidden masthead',
        m.insideMasthead === false,
        'display:block on a descendant of a display:none ancestor restores no ' +
        'layout — move it outside </header>');
      check('it renders a real box under print media',
        m.w > 0 && m.h > 0 && m.hasOffsetParent === true,
        `computed ${m.display}/${m.visibility} but measured ${m.w}x${m.h}, ` +
        `offsetParent ${m.hasOffsetParent}`);

      for (const [needle, what2] of MUST_PRINT) {
        check(`${what2} is visible in the printed document`,
          m.text.toLowerCase().includes(needle.toLowerCase()),
          'zero visible occurrences under print media');
      }
      /* The version stamp is what S-01 actually lost. */
      check('the bill and package version are visible in print',
        /version 1\.4/.test(m.text) && /version 1\.6/.test(m.text),
        'a printed walk-through that cannot be matched to a bill version is ' +
        'the defect that makes a stale figure unfixable after the fact');
    } finally { await page.close(); }
  }
}

main().then(() => {
  console.log('\n' + '='.repeat(74));
  console.log(`  ${pass} passed, ${failures.length} failed`);
  for (const f of failures) console.log('    - ' + f.label);
  console.log('='.repeat(74) + '\n');
  process.exit(failures.length ? 1 : 0);
}).catch((e) => { console.error('\nHARNESS ERROR: ' + e.stack + '\n'); process.exit(3); });
