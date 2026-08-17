import { chromium } from 'playwright-core';

const [, , selector = '#video', out = '/tmp/section.png', w = '1440'] = process.argv;

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: Number(w), height: 1000 } });
await page.goto('http://localhost:5173', { waitUntil: 'networkidle', timeout: 30000 });
await page.locator(selector).scrollIntoViewIfNeeded();
await page.waitForTimeout(1800);
await page.locator(selector).screenshot({ path: out });
await browser.close();
console.log('ok');
