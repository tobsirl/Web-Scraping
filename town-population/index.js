const fetch = require('node-fetch');
const cheerio = require('cheerio');

const url = `https://www.citypopulation.de/en/ireland/towns/`;

(async () => {
  const response = await fetch(url);
  const body = await response.text();

  console.log(body);
})();
