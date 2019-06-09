const request = require('request-promise');
const cheerio = require('cheerio');
const Nightmare = require('nightmare');
const nightmare = Nightmare({ show: true });

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

      const descriptionUrl =
        'https://www.imdb.com' +
        $(element)
          .find('td.titleColumn > a')
          .attr('href');

      const imdbRating = Number(
        $(element)
          .find('td.ratingColumn.imdbRating')
          .text()
          .trim()
      );
      return { title, imdbRating, rank: i, descriptionUrl };
    })
    .get();

  return movies;
}

async function scrapePosterUrl(movies) {
  const moviesWithPosterUrls = await Promise.all(
    movies.map(async movie => {
      try {
        const html = await request.get(movie.descriptionUrl);
        const $ = await cheerio.load(html);
        movie.posterUrl =
          'https://www.imdb.com' + $('div.poster > a').attr('href');
        return movie;
      } catch (error) {
        // console.error(error);
      }
    })
  );
  return moviesWithPosterUrls;
}

async function getPosterImageUrl(movies) {
  for (let i = 0; i < movies.length; i++) {
    try {
      const posterImageUrl = await nightmare
        .goto(movies[i].posterUrl)
        .evaluate(() =>
          $(
            '#photo-container > div > div:nth-child(2) > div > div.pswp__scroll-wrap > div.pswp__container > div:nth-child(2) > div > img:nth-child(2)'
          ).attr('src')
        );
      movies[i].posterImageUrl = posterImageUrl;
      console.log(movies[i]);
    } catch (error) {
      console.error(error);
    }
  }
  return movies;
}

async function main() {
  let movies = await scrapeTitlesRankAndRatings();
  movies = await scrapePosterUrl(movies);
  movies = await getPosterImageUrl(movies);
  console.log(movies);
}

main();
