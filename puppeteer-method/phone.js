const puppeteer = require('puppeteer');

(async =() => {
  /* 3. Emulate a phone */
  const devices = require('puppeteer/DeviceDescriptors');

  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.emulate(devices['iPhone X']);

  await page.goto('https://learnscraping.com/');

  await browser.close();
})()