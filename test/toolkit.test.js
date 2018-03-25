const test = require('tape')
const { formatApiData, filterSuggestions } = require('../src/toolkit')
const { fakeApiResObj } = require('./test-helper')

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

  // const actual
  // const expected
})