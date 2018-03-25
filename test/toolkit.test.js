const test = require('tape')
const { formatApiData, filterSuggestions } = require('../src/toolkit')
const { fakeApiResObj } = require('./test-helper')

test('Tape is working', assert => {
  assert.pass('Tape is working')
  assert.end()
})

test('Testing formatApiData', assert => {
  // test returns and object
  assert.equal(
    typeof formatApiData(fakeApiResObj),
    'object',
    'formatApiData should return an object')
  assert.end()
})