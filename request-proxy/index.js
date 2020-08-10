// 'http://user:password@ip:port' proxy an ip address for scraping
const request = require('request-promise').defaults({
  proxy: 'http://user:password@ip:port',
})


(async () => {
  let response = await request('https://httpbin.org/ip');

  debugger;
})();
