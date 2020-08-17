const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  let initialRequest = await request('http://quotes.toscrape.com/login');

  let $ = cheerio.load(initialRequest);

  let csrfToken = $('input[name="csrf_token"]').val();

  debugger;
})();
