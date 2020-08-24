const puppeteer = require('puppeteer');

(async () => {
  /* 2. Getting the URL or the Title of the current page */
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://learnscraping.com/');

  let title = await page.title();
  console.log(`Title of the page is ${title}`);

  let url = await page.url();
  console.log(`URL of the page is ${url}`);

  await browser.close();
})();
