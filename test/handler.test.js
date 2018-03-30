const test = require('tape')
const supertest = require('supertest')
const { handleStatic } = require('../src/handler')

test('Test handleStatic', t => {
  supertest(handleStatic)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      // console.log(res)
      t.error(err, 'GET to \'/\' responds with index.html')
      t.end()
    })
})