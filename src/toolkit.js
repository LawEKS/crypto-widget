const { get } = require('https');

const coinbinRequest = (endpoint, cb) => {
  get(`https://coinbin.org${endpoint}`, (res) => {
    const { statusCode } = res;

    let error;
    if (statusCode !== 200) {
      error = new Error(`Request failed - Status Code: ${statusCode}`);
    }

    if (error) {
      cb(error, res);
      res.resume();
      return;
    }

    res.setEncoding('utf-8');
    let body = '';
    res.on('data', (chunk) => {
      body += chunk;
    });
    res.on('end', () => {
      cb(null, res, body);
    });
  }).on('error', (e) => { // ENOTFOUND? - How to test for this
    cb(e);
  });
};

const formatApiData = (resObj) => {
  const coins = Object.keys(resObj.coins);
  const result = coins.reduce((obj, coin) => {
    const { name } = resObj.coins[coin];
    const { rank } = resObj.coins[coin];
    const { ticker } = resObj.coins[coin];
    const newPair = { [`${name}`]: { rank, ticker } };
    return Object.assign(newPair, obj);
  }, {});
  return result;
};

const filterSuggestions = (dataObj, search) => {
  // if search is empty or includes and special characters
  if (search === '' || /[^\s\w]/gi.test(search)) {
    return {};
  }
  const names = Object.keys(dataObj);
  const result = names.reduce((obj, name) => {
    let objCopy = obj;
    if (name.toLowerCase().includes(search.toLowerCase())) {
      const newPair = { [`${name}`]: dataObj[name] };
      objCopy = Object.assign(newPair, obj);
    }
    return objCopy;
  }, {});
  return result;
};

const formatForecastData = (resObj) => {
  const { forecast } = resObj;
  const result = forecast.map((obj) => {
    const { timestamp, usd } = obj;
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const formatedDateString = new Date(timestamp).toLocaleDateString('en-UK', options);
    return { timestamp: formatedDateString, usd };
  });
  return result;
};
module.exports = {
  formatApiData,
  filterSuggestions,
  coinbinRequest,
  formatForecastData,
};
