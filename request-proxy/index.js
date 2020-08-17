const request = require('request-promise');
const cheerio = require('cheerio');

(async () => {
  console.log(`Initial request to get the csrf_token value...`);

  let initialRequest = await request('http://quotes.toscrape.com/login');

  let $ = cheerio.load(initialRequest);

  let csrfToken = $('input[name="csrf_token"]').val();

  console.log(`POST Request to login on the form`);

  let loginRequest = await request({
    uri: 'http://quotes.toscrape.com/login',
    method: 'POST',
    gzip: true,
    headers: {
      'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
      'Accept-Encoding': 'gzip, deflate',
      'Accept-Language': 'en-IE,en-US;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      'Connection': 'keep-alive',
      'Content-Type': 'application/x-www-form-urlencoded',
      'Host': 'quotes.toscrape.com',
      'Origin': 'http://quotes.toscrape.com',
      'Pragma': 'no-cache',
      'Referer': 'http://quotes.toscrape.com/login',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',
    },
    form: {
      'crsf_token': csrfToken,
      'username': 'admin',
      'password': 'admin',
    },
    resolveWithFullResponse: true,
  });

  debugger;
})();
