const request = require('request-promise');
const cheerio = require('cheerio');

const url = 'https://ie.indeed.com/jobs?q=junior+react+developer&l=Ireland';

const craig = 'https://sfbay.craigslist.org/d/software-qa-dba-etc/search/sof';

const scrapeResult = {
  title: ''
};

const scrapeResults = [];

async function scrapeCraigsList() {
  try {
    const htmlResult = await request.get(url);
    const $ = await cheerio.load(htmlResult);

    $('.jobsearch-SerpJobCard').each((index, element) => {
      const jobTitle = $(element)
        .children('.title')
        .text();

      const scrapeResult = { title: jobTitle };
      scrapeResults.push(scrapeResult);
    });
  } catch (err) {
    console.log(err);
  }
}
scrapeCraigsList();
