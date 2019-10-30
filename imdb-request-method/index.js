const request = require('request-promise');
const cheerio = require('cheerio');

const URL = 'https://www.imdb.com/title/tt9335498/?ref_=nv_sr_1?ref_=nv_sr_1';

(async () => {
  const response = await request({
    uri: URL,
    headers: {
      Accept:
        'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
      'Accept-Encoding': 'gzip, deflate, br',
      'Accept-Language': 'en-IE,en-US;q=0.9,en;q=0.8',
      'Cache-Control': 'no-cache',
      Connection: 'keep-alive',
      Host: 'www.imdb.com',
      'Upgrade-Insecure-Requests': '1',
      'User-Agent':
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
    },
    gzip: true
  });

  const $ = cheerio.load(response);

  const title = $('div[class="title_wrapper"] > h1')
    .text()
    .trim();

  const rating = $('span[itemprop="ratingValue"]').text();

  const poster = $('div[class="poster"] > a > img').attr('src');

  const totalRatings = $('div[class="imdbRating"] > a').text();

  console.log({ title, rating, poster, totalRatings });
})();
