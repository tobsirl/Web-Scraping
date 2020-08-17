const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  let initialRequest = await request({
    uri: 'http://quotes.toscrape.com/login',
    method: 'GET',
  });

  let $ = cheerio.load(initialRequest)

  let csrfToken = $('input')

  debugger;
})();
