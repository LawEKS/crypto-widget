const test = require('tape')
const nock = require('nock')
const { coinbinRequest, filterSuggestions, formatApiData } = require('../src/toolkit')
const data = require('./dummy-data/formated-coins-data')
const apiData = require('./dummy-data/coinbin-coins-success')

test('Test coinbinRequest', t => {
  nock('https://coinbin.org')
    .get('/btc/forecast')
    .replyWithFile(
      200,
      __dirname + '/dummy-data/coinbin-forecast-success.json',
      { 'Content-Type': 'application/json' }
    )
  coinbinRequest('/btc/forecast', (err, res, body) => {
    t.error(err, 'GET request to coinbin for /btc/forecast')
    t.equal(res.statusCode, 200, 'Status Code: 200')
    t.equal(res.headers['content-type'], 'application/json', 'Content-Type: application/json')
  })


  nock('https://coinbin.org/')
    .get('/abc/forecast')
    .replyWithFile(
      500,
      __dirname + '/dummy-data/coinbin-500.html',
      { 'Content-Type': 'text/html' }
    )

  coinbinRequest('/abc/forecast', (err, res, body) => {
    t.ok(err, 'GET request to coinbin for /abc/forecast should fail')
    t.equal(res.statusCode, 500, 'Status Code: 500')
    t.equal(res.headers['content-type'], 'text/html', 'Content-Type: text/html')
    t.end()
  })

})

test('Testing filterSuggestions', t => {
  t.plan(3)

  t.same(
    filterSuggestions(data, ''),
    {},
    'Search with empty string returns an empty object'
  )

  const results = Object.keys(filterSuggestions(data, 'bitcoin '))
  const ifNamesIncludes = results.every(name => {
    return name.toLowerCase().includes('bitcoin ')
  })

  t.ok(ifNamesIncludes, 'The search word included in results')

  t.same(
    filterSuggestions(data, 'ethereum c*'),
    {},
    'Search words with special characters returns an empty object'
  )

})

test('Testing formatApiData', t => {
  t.plan(2)
  const result = formatApiData(apiData)
  t.equal(typeof result, 'object', 'Result is an object')
  const keys = Object.keys(result)
  const sumNumOfKeys = keys.reduce((sum, key) => {
    const innerObj = result[key]
    const numOfKeys = Object.keys(innerObj).length
    return sum + numOfKeys
  }, 0)

  const avgNumOfKeys = Math.ceil(sumNumOfKeys / keys.length)
  t.ok(avgNumOfKeys === 2, 'Each key of result has an object with 2 keys')

})