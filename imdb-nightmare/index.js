const request = require('request-promise');
const cheerio = require('cheerio');

async function scrapeTitlesRankAndRatings() {
  const result = await request.get(
    'https://www.imdb.com/chart/top?ref_=nv_mv_250'
  );
  const $ = await cheerio.load(result);

  const movies = $('tr')
    .map((i, element) => {
      const title = $(element)
        .find('td.titleColumn > a')
        .text();
      const imdbRating = Number($(element)
        .find('td.ratingColumn.imdbRating')
        .text()
        .trim());
      return { title, imdbRating, rank: i };
    })
    .get();

  console.log(movies);
}

scrapeTitlesRankAndRatings();
