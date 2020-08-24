const puppeteer = require('puppeteer');

(async () => {
  /* 1. Creating a PDF from the website */
  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.goto('https://learnscraping.com/');
  await page.pdf({
    path: './page.pdf',
    format: 'A4',
  });
  await browser.close();
})();
