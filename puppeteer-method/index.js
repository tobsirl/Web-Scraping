const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto('https://google.com');
  await page.type('.gLFyf', 'udemy tutorials', { delay: 100 });

  await page.keyboard.press('Enter');

  await page.waitForNavigation();

  await page.screenshot({ path: 'example.png' });

  await browser.close();
})();
