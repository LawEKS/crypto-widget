const test = require('tape')
const { formatApiData, filterSuggestions } = require('../src/toolkit')
const { 
  fakeApiResObj,
  dataFragment,
  getFragmentSubString
} = require('./test-helper')

test('Tape is working', assert => {
  assert.pass('Tape is working')
  assert.end()
})

test('Testing formatApiData', assert => {
  // test returns and object
  const formattedDataObj = formatApiData(fakeApiResObj)
  assert.equal(
    typeof formattedDataObj,
    'object',
    'formatApiData should return an object')

  // test each key has an object
  if (Object.keys(formattedDataObj).length > 0) {
    assert.pass('formatted data is populated')
  } else {
    assert.fail('formatted data is not populated')
  }

  // test each object has two keys
  const coins = Object.keys(formattedDataObj)
  const sumOfProps = coins.reduce((sum, coin) => {
    return sum + Object.keys(formattedDataObj[coin]).length
  }, 0)
  const avgNumOfProps = Math.ceil(sumOfProps / coins.length)
  assert.equals(avgNumOfProps, 2, 'each inner object should have two properties')
  assert.end()

})

test('Testing filterSuggestions', assert => {
  // test returns and object
  const filteredSuggestions = filterSuggestions(dataFragment, getFragmentSubString())
  assert.equals(
    typeof filteredSuggestions,
    'object',
    'filterSuggestions should return an object')

    if (Object.keys(filteredSuggestions).length > 0) {
      assert.pass('returns suggestions that match the search')
    } else {
      assert.fail('does not return with suggestions')
    }

    assert.equals(
      Object.keys(filterSuggestions(dataFragment, '')).length,
      Object.keys({}).length,
      'returns and empty object if an empty string is supplied')
      
      assert.equals(
        Object.keys(filterSuggestions(dataFragment, 'kk')).length,
        Object.keys({}).length,
        'returns and empty object if no match is found')
    

    assert.end()
})