const test = require('tape')
const nock = require('nock')
const { formatApiData, filterSuggestions, getApiData } = require('../src/toolkit')
const { 
  fakeApiResObj,
  dataFragment,
  getFragmentSubString
} = require('./test-helper')

const mockResObj = {
  "coins": {
    "$$$": {
      "btc": 2.6E-7, 
      "name": "Money", 
      "rank": 613, 
      "ticker": "$$$", 
      "usd": 0.00187
    }, 
    "$pac": {
      "btc": 7.3E-7, 
      "name": "PACcoin", 
      "rank": 758, 
      "ticker": "$pac", 
      "usd": 0.005294
    }
  }
}

test('Tape is working', t => {
  t.pass('Tape is working')
  t.end()
})

test('Testing formatApiData', t => {
  // test returns and object
  const formattedDataObj = formatApiData(fakeApiResObj)
  t.equal(
    typeof formattedDataObj,
    'object',
    'formatApiData should return an object')

  // test each key has an object
  if (Object.keys(formattedDataObj).length > 0) {
    t.pass('formatted data is populated')
  } else {
    t.fail('formatted data is not populated')
  }

  // test each object has two keys
  const coins = Object.keys(formattedDataObj)
  const sumOfProps = coins.reduce((sum, coin) => {
    return sum + Object.keys(formattedDataObj[coin]).length
  }, 0)
  const avgNumOfProps = Math.ceil(sumOfProps / coins.length)
  t.equals(avgNumOfProps, 2, 'each inner object should have two properties')
  t.end()

})

test('Testing filterSuggestions', t => {
  // test returns and object
  const filteredSuggestions = filterSuggestions(dataFragment, getFragmentSubString())
  t.equals(
    typeof filteredSuggestions,
    'object',
    'filterSuggestions should return an object')

    if (Object.keys(filteredSuggestions).length > 0) {
      t.pass('returns suggestions that match the search')
    } else {
      t.fail('does not return with suggestions')
    }

    t.equals(
      Object.keys(filterSuggestions(dataFragment, '')).length,
      Object.keys({}).length,
      'returns and empty object if an empty string is supplied')
      
      t.equals(
        Object.keys(filterSuggestions(dataFragment, 'kk')).length,
        Object.keys({}).length,
        'returns and empty object if no match is found')
    

    t.end()
})

test.only('Testing getApiData', t => {
  nock('https://coinbin.org')
    .get('/coins')
    .reply(200, mockResObj)

    getApiData((err, data) => {
      if (err) {
        t.error(err, 'There is a problem with the request')
      } else {
        t.deepEqual(data, JSON.stringify(mockResObj), 'Nock intercepts request')
      }
    })
  t.end()
})