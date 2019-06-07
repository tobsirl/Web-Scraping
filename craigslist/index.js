const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof';

(async function scrapeCraigsList() {
  const htmlResult = request.get(url);
})();
