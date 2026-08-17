import { chromium } from 'playwright-core';
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 600 }, deviceScaleFactor: 2 });
await page.goto('file:///tmp/label-edit.html');
await page.waitForTimeout(800);
await page.locator('#stage').screenshot({ path: process.argv[2] || '/tmp/label-out.png' });
await browser.close();
console.log('ok');
