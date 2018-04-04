const test = require('tape');
const nock = require('nock');
const {
  coinbinRequest, filterSuggestions, formatApiData, formatForecastData,
} = require('../src/toolkit');
const data = require('./dummy-data/formated-coins-data');
const apiData = require('./dummy-data/coinbin-coins-success');
const forecastApiData = require('./dummy-data/coinbin-forecast-success');

test('Test coinbinRequest', (t) => {
  nock('https://coinbin.org')
    .get('/btc/forecast')
    .replyWithFile(
      200,
      `${__dirname}/dummy-data/coinbin-forecast-success.json`,
      { 'Content-Type': 'application/json' },
    );
  coinbinRequest('/btc/forecast', (err, res) => {
    t.error(err, 'GET request to coinbin for /btc/forecast');
    t.equal(res.statusCode, 200, 'Status Code: 200');
    t.equal(res.headers['content-type'], 'application/json', 'Content-Type: application/json');
  });


  nock('https://coinbin.org/')
    .get('/abc/forecast')
    .replyWithFile(
      500,
      `${__dirname}/dummy-data/coinbin-500.html`,
      { 'Content-Type': 'text/html' },
    );

  coinbinRequest('/abc/forecast', (err, res) => {
    t.ok(err, 'GET request to coinbin for /abc/forecast should fail');
    t.equal(res.statusCode, 500, 'Status Code: 500');
    t.equal(res.headers['content-type'], 'text/html', 'Content-Type: text/html');
    t.end();
  });
});

test('Testing filterSuggestions', (t) => {
  t.plan(3);

  t.same(
    filterSuggestions(data, ''),
    {},
    'Search with empty string returns an empty object',
  );

  const results = Object.keys(filterSuggestions(data, 'bitcoin '));
  const ifNamesIncludes = results.every(name => name.toLowerCase().includes('bitcoin '));

  t.ok(ifNamesIncludes, 'The search word included in results');

  t.same(
    filterSuggestions(data, 'ethereum c*'),
    {},
    'Search words with special characters returns an empty object',
  );
});

test('Testing formatApiData', (t) => {
  t.plan(2);
  const result = formatApiData(apiData);
  t.equal(typeof result, 'object', 'Result is an object');
  const keys = Object.keys(result);
  const sumNumOfKeys = keys.reduce((sum, key) => {
    const innerObj = result[key];
    const numOfKeys = Object.keys(innerObj).length;
    return sum + numOfKeys;
  }, 0);

  const avgNumOfKeys = Math.ceil(sumNumOfKeys / keys.length);
  t.ok(avgNumOfKeys === 2, 'Each key of result has an object with 2 keys');
});

test('Testing formatForecastData', (t) => {
  t.plan(6);
  const forecastData = formatForecastData(forecastApiData);
  t.ok(Array.isArray(forecastData), 'formatForecastData returns an array');
  t.ok(forecastData.length === 30, 'The array has 30 items');

  const arrayItemsAreObjects = forecastData.every(item => typeof item === 'object');
  t.ok(arrayItemsAreObjects, 'Each item in the array is an object');
  // a set of all the keys of each object in the array.
  // a set can only contain unique values
  const objectKeysSet = new Set();
  forecastData.forEach((item) => {
    const itemKeys = Object.keys(item);
    itemKeys.forEach(key => objectKeysSet.add(key));
  });

  t.ok(objectKeysSet.size === 2, 'Each object has 2 keys, timestamp and usd');
  t.ok(objectKeysSet.has('timestamp'), 'Each object has key: timestamp');
  t.ok(objectKeysSet.has('usd'), 'Each object has key: usd');

//   const { timestamp, usd } = forecastData[0];
//   t.ok(typeof timestamp === 'string', 'timestamp is a string');
//   t.ok(typeof usd === 'number', 'usd is a number');
});
