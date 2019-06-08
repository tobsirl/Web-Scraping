const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://ie.indeed.com/jobs?q=junior+react+developer&l=Ireland';

const scrapeResult = {
  title: ''
};

const scrapeResults = [];

async function scrapeCraigsList() {
  try {
    const htmlResult = await request.get(url);
    const $ = await cheerio.load(htmlResult);

    $('.jobsearch-SerpJobCard').each((index, element) => {
      const title = $(element)
        .children('.title')
        .text()
        .trim();

      const company = $(element)
        .children('.sjcl')
        .children()
        .children('.company')
        .text()
        .trim();

      const summary = $(element)
        .children('.summary')
        .text()
        .trim();

      const location = $(element)
        .children('.sjcl')
        .children('.location')
        .text()
        .trim();

      const datePosted = $(element)
        .children('.jobsearch-SerpJobCard-footer')
        .children('.jobsearch-SerpJobCard-footerActions')
        .children('.result-link-bar-container')
        .children('.result-link-bar')
        .children('.date')
        .text();

      const scrapeResult = { title, company, summary, location, datePosted };
      scrapeResults.push(scrapeResult);
    });

    console.log(scrapeResults);
  } catch (err) {
    console.log(err);
  }
}
scrapeCraigsList();
