import { chromium } from 'playwright-core';

// Usage: node scripts/xt-capture-test.mjs [labels|demo] [url]
// WARNING: sends a REAL submission to the live capture endpoint (one lead email per run).
const intent = process.argv[2] || 'labels';
const url = process.argv[3] || 'http://localhost:5173';
const browser = await chromium.launch({ channel: 'chrome' });
const page = await browser.newPage();

let captureRequest = null;
let captureResponse = null;
page.on('request', (req) => {
  if (req.url().includes('formsubmit.co')) captureRequest = req.postData();
});
page.on('response', async (res) => {
  if (res.url().includes('formsubmit.co')) {
    captureResponse = { status: res.status(), body: await res.text().catch(() => '<unreadable>') };
  }
});

await page.goto(url, { waitUntil: 'networkidle' });
await page.locator('#book').scrollIntoViewIfNeeded();
if (intent === 'demo') {
  await page.locator('.cta-intent', { hasText: '20-minute demo' }).click();
}
const honeypotVisible = await page.locator('input[name="_honey"]').isVisible().catch(() => 'not-found');
await page.fill('#cta-email', 'shakoorshaik@zenduit.com');
await page.locator('.cta-submit').click();
await page.waitForTimeout(4000);

const failed = await page.locator('#cta-email-failed').textContent().catch(() => null);
const success = await page.locator('.cta-success').textContent().catch(() => null);

console.log(JSON.stringify({ intent, honeypotVisible, captureRequest, captureResponse, ui: { failed, success } }, null, 2));
await browser.close();
