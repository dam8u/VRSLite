/* =====================================================================
   Minimal Chrome DevTools Protocol driver.

   The explorer has to be tested as a document a legislator actually opens,
   not as a module imported under Node: a control can be wired to the wrong
   state key, a panel can render a stale number, and neither shows up in a
   test that calls the engine directly. There is no jsdom, Puppeteer or
   Playwright in this environment and none is added — this talks to the
   Chrome already installed on the machine over the DevTools protocol using
   Node's built-in WebSocket and fetch.

   Usage:
     const { launch } = require('./chrome.js');
     const page = await launch('file:///.../explorer-standalone.html');
     await page.evaluate('return document.title');
     await page.close();

   Prepared by Policy Development Team using legal, policy, and financial
   analysis tools, pending review by veterans' legal counsel.
   ===================================================================== */
'use strict';
const { spawn } = require('child_process');
const fs = require('fs');
const os = require('os');
const path = require('path');

const CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'
];

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }
  for (const c of CANDIDATES) if (fs.existsSync(c)) return c;
  return null;
}

async function launch(fileUrl) {
  const bin = findChrome();
  if (!bin) throw new Error('no Chrome or Chromium found; set CHROME_PATH');
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'vrs-explorer-test-'));
  const proc = spawn(bin, [
    '--headless=new', '--remote-debugging-port=0', '--user-data-dir=' + dir,
    '--no-first-run', '--no-default-browser-check', '--disable-gpu',
    '--allow-file-access-from-files', '--window-size=1500,2400',
    '--disable-extensions', '--disable-sync', '--mute-audio',
    /* timer throttling in a backgrounded headless tab would silently break
       the 40 ms input debounce and the 220 ms tornado debounce */
    '--disable-background-timer-throttling', '--disable-renderer-backgrounding',
    fileUrl
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  let stderr = '';
  proc.stderr.on('data', (d) => { stderr += d.toString(); });

  let port = null;
  for (let i = 0; i < 300; i++) {
    const f = path.join(dir, 'DevToolsActivePort');
    if (fs.existsSync(f)) {
      const first = fs.readFileSync(f, 'utf8').split('\n')[0];
      if (first && first.trim()) { port = +first.trim(); break; }
    }
    await sleep(50);
  }
  if (!port) {
    proc.kill('SIGKILL');
    throw new Error('Chrome never reported a debugging port.\n' + stderr.slice(-800));
  }

  let target = null;
  for (let i = 0; i < 300; i++) {
    const list = await fetch(`http://127.0.0.1:${port}/json/list`)
      .then((r) => r.json()).catch(() => null);
    if (list) {
      target = list.find((t) => t.type === 'page' && t.webSocketDebuggerUrl);
      if (target) break;
    }
    await sleep(50);
  }
  if (!target) { proc.kill('SIGKILL'); throw new Error('no page target appeared'); }

  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = () => rej(new Error('devtools websocket failed'));
  });

  let seq = 0;
  const pending = new Map();
  const consoleErrors = [];
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const resolve = pending.get(m.id);
      pending.delete(m.id);
      resolve(m);
      return;
    }
    /* An uncaught exception during a render would otherwise leave a panel
       holding its previous numbers with no visible sign of failure. */
    if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      consoleErrors.push((d.exception && d.exception.description) || d.text);
    }
    if (m.method === 'Log.entryAdded' && m.params.entry.level === 'error') {
      consoleErrors.push(m.params.entry.text);
    }
  };
  const send = (method, params) => new Promise((res) => {
    const id = ++seq;
    pending.set(id, res);
    ws.send(JSON.stringify({ id, method, params: params || {} }));
  });

  await send('Runtime.enable');
  await send('Log.enable');

  async function evaluate(body) {
    const r = await send('Runtime.evaluate', {
      expression: '(function(){' + body + '})()',
      returnByValue: true, awaitPromise: true
    });
    if (r.error) throw new Error('CDP transport error: ' + JSON.stringify(r.error));
    if (r.result.exceptionDetails) {
      const d = r.result.exceptionDetails;
      throw new Error('page exception: ' +
        ((d.exception && d.exception.description) || d.text));
    }
    return r.result.result.value;
  }

  async function ready(expr, timeoutMs) {
    const until = Date.now() + (timeoutMs || 20000);
    while (Date.now() < until) {
      if (await evaluate('return !!(' + expr + ')')) return true;
      await sleep(60);
    }
    throw new Error('timed out waiting for: ' + expr);
  }

  return {
    evaluate, ready, sleep, send,
    errors: () => consoleErrors.slice(),
    close: async () => {
      try { ws.close(); } catch (e) { /* already gone */ }
      proc.kill('SIGKILL');
      try { fs.rmSync(dir, { recursive: true, force: true }); } catch (e) { /* ok */ }
    }
  };
}

module.exports = { launch, sleep, findChrome };
