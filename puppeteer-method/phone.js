const puppeteer = require('puppeteer');
const iPhone = puppeteer.devices['iPhone 6'];

(async () => {
  /* 3. Emulate a phone */

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(iPhone);

  await page.goto('https://learnscraping.com/');

  // await browser.close();
})();
