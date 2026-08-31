// Screenshot a section in the viewport, offset so the fixed nav does not cover it.
import { chromium } from 'playwright-core';
const [, , sel = '#compare', out = '/tmp/v.png', w = '1440', h = '1300'] = process.argv;
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: +w, height: +h } });
const errs = [];
p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
await p.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
await p.evaluate((s) => {
  const el = document.querySelector(s);
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 110, behavior: 'instant' });
}, sel);
await p.waitForTimeout(1600);
await p.screenshot({ path: out });
await b.close();
console.log(errs.length ? 'console errors: ' + errs.join(' | ') : 'ok');
