const axios = require("axios");
const cheerio = require("cheerio");


async function isCheckSite(url) {
  let postDescWrapper
  return axios
    .get(url)
    .then((response) => {
      const $ = cheerio.load(response.data);
      const text = $('#footer-places-privacy').text()

      if (text === 'Политика конфиденциальности') {
        return true;
      } else {
        return false;
      }
    })
    .catch((err) => console.log("Fetch error " + err));
}

module.exports = isCheckSite;
