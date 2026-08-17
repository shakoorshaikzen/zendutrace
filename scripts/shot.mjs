import { chromium } from 'playwright-core';

const [, , url = 'http://localhost:5173', out = '/tmp/shot.png', w = '1440', h = '900', fullPage = 'false', waitMs = '2500'] = process.argv;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: Number(h) } });
const errors = [];
page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
page.on('pageerror', (e) => errors.push(String(e)));
await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 }).catch((e) => errors.push('goto: ' + e.message));
await page.waitForTimeout(Number(waitMs));
if (fullPage === 'true') {
  // trigger scroll-reveal animations before capturing
  await page.evaluate(async () => {
    const step = window.innerHeight * 0.7;
    for (let y = 0; y <= document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 180));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForTimeout(1200);
}
await page.screenshot({ path: out, fullPage: fullPage === 'true' });
if (errors.length) console.log('CONSOLE ERRORS:\n' + errors.join('\n'));
else console.log('no console errors');
await browser.close();
