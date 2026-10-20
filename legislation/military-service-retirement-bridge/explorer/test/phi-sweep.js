'use strict';
const path = require('path');
const { launch } = require('./chrome.js');
const DOC = 'file://' + path.resolve(__dirname, '..', 'dist', 'explorer-standalone.html');
(async () => {
  const page = await launch(DOC);
  await page.ready('document.getElementById("panel-b") && document.getElementById("panel-b").innerText.indexOf("bp")>-1', 30000);
  const rows = await page.evaluate(`
    const E = window.VRSEngine, d = E.defaults(), out = [];
    for (let i = 0; i <= 100; i += 5) {
      const r = E.run(Object.assign({}, d, { phi: i / 100 }));
      out.push({ phi: i / 100, bp: r.panelB.combined.bp,
                 net: r.panelB.combined.netLiability,
                 recover: r.panelB.combined.price / r.panelB.combined.valueBlended });
    }
    return out;
  `);
  console.log('phi    combined_bp      net_liability   price/value');
  for (const r of rows) {
    console.log(r.phi.toFixed(2).padStart(4) + '   ' + r.bp.toFixed(4).padStart(9) +
      '   ' + Math.round(r.net).toLocaleString('en-US').padStart(14) +
      '   ' + (r.recover * 100).toFixed(0) + '%');
  }
  /* also: what does one click of "Conservative" render on screen? */
  await page.evaluate(`document.querySelector('[data-preset="conservative"]').click(); return true;`);
  await page.sleep(300);
  const txt = await page.evaluate(`
    const el = document.getElementById('panel-b');
    return el.innerText.split('\\n').slice(0, 14).join(' | ');
  `);
  console.log('\nONE CLICK on "Conservative / Low Participation", Panel B top:\n  ' + txt);
  await page.close();
})().catch(e => { console.error(e); process.exit(1); });
