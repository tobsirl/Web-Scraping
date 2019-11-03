const requestPromise = require('request-promise');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const { Parser } = require('json2csv');

const URLS = [
  {
    url: 'https://www.imdb.com/title/tt9335498/?ref_=nv_sr_1?ref_=nv_sr_1',
    id: 'Demon_Slayer_Kimetsu_No_Yaiba'
  }
  // {
  //   url: ' https://www.imdb.com/title/tt8788458/?ref_=tt_sims_tt',
  //   id: 'The_Promised_Neverland'
  // }
];

(async () => {
  const movieData = [];
  for (let movie of URLS) {
    const response = await requestPromise({
      uri: movie.url,
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

    // const releaseDate = $('a[title="See more release dates"]').text();

    const genres = [];
    $('div[class="title_wrapper"] a[href^="/search/title?genres"]').each(
      (i, el) => {
        let genre = $(el).text();
        genres.push(genre);
      }
    );

    // console.log({ title, rating, poster, totalRatings });
    // console.log(`Genres: ${genres}`);

    movieData.push({
      title,
      rating,
      poster,
      totalRatings,
      genres
    });

    const file = fs.createWriteStream(`${movie.id}.jpg`);

    await new Promise((resolve, reject) => {
      const stream = request({
        uri: poster,
        headers: {
          Accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'en-IE,en-US;q=0.9,en;q=0.8',
          'Cache-Control': 'no-cache',
          Connection: 'keep-alive',
          'Upgrade-Insecure-Requests': '1',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
        },
        gzip: true
      })
        .pipe(file)
        .on('finish', () => {
          console.log(`${movie.id} finished downloading the image`);
          resolve();
        })
        .on('error', error => {
          reject(error);
        });
    }).catch(err => {
      console.log(`Error message: ${err}`);
    });

    //* Output to a CSV file
    // const json2csvParser = new Parser();
    // const csv = json2csvParser.parse(movieData);

    // console.log(csv);

    //* Output to a JSON file
    // let data = JSON.stringify(movieData, null, 2);
    // fs.writeFile('output.csv', csv, err => {
    //   if (err) throw err;
    //   console.log('Data written to file');
    // });
  }
})();
