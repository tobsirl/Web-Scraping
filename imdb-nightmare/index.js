const request = require('request-promise');
const cheerio = require('cheerio');

async function scrapeTitlesRankAndRatings() {
  const result = await request.get(
    'https://www.imdb.com/chart/top?ref_=nv_mv_250'
  );
  const $ = await cheerio.load(result);

  const movies = $('td.titleColumn > a')
    .map((i, element) => {
      return $(element).text();
    })
    .get();
  console.log(movies);
}

scrapeTitlesRankAndRatings();
