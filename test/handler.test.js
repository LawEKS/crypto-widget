const test = require('tape')
const supertest = require('supertest')
const nock = require('nock')
const { handleStatic, handleForecast, handleSuggestions } = require('../src/handler')

test('Test handleStatic', t => {
  t.plan(7)
  supertest(handleStatic)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      // console.log(res.type)
      t.error(err, 'GET to \'/\' should respond with index.html')
    })

  const files = {
    'index.html': { resource: '/index.html', contentType: 'text/html' },
    'style.css': { resource: '/public/css/style.css', contentType: 'text/css' },
    'render.js': { resource: '/public/js/render.js', contentType: 'application/javascript' },
    'request.js': { resource: '/public/js/request.js', contentType: 'application/javascript' },
    'ui.js': { resource: '/public/js/ui.js', contentType: 'application/javascript' }
  }
  Object.keys(files).forEach(file => {
    supertest(handleStatic)
      .get(`${files[file].resource}`)
      .expect(200)
      .expect('content-type', `${files[file].contentType}`)
      .end((err, res) => {
        t.error(err, `GET to ${files[file].resource} should respond with ${file}`)
      })
  })

  supertest(handleStatic)
    .get('/_')
    .expect(404)
    .end((err, res) => {
      t.error(err, 'GET to resource that does not exits responds with 404')
    })
})

test('Test handleForecast', t => {
  nock('https://coinbin.org/')
    .get('/btc/forecast')
    .replyWithFile(
      200,
      __dirname + '/dummy-data/coinbin-forecast-success.json',
      { 'Content-Type': 'application/json' }
    )

  supertest(handleForecast)
    .get('/forecast&ticker=btc')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      t.error(err, 'GET to /forecast&ticker=btc responds with api data')
    })

  nock('https://coinbin.org/')
    .get('/abc/forecast')
    .replyWithFile(
      500,
      __dirname + '/dummy-data/coinbin-500.html',
      { 'Content-Type': 'text/html' }
    )

  supertest(handleForecast)
    .get('/forecast&ticker=abc')
    .expect(500)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err, 'GET to /forecast with bad ticker responds with 500')
      t.end()
    })
})

test('Test handleSuggestions', t => {
  t.plan(6)
  supertest(handleSuggestions)
    .get('/suggestions&search=')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      t.error(err, 'GET to /suggestions is successful')
      t.same(res.body, {}, 'Search for empty string returns an empty object')
    })

  supertest(handleSuggestions)
    .get('/suggestions&search=bit')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      t.error(err, 'GET to /suggestions for \'bit\' is successful')
      t.ok(Object.keys(res.body).length > 0, 'Search response for \'bit\' is populated with results')
    })

  supertest(handleSuggestions)
    .get('/suggestions&searc=bit')
    .expect(500)
    .expect('content-type', /plain/)
    .end((err, res) => {
      t.error(err, 'GET to /suggestions with bad query responds fails')
      t.ok(res.text, 'Server responds with a message when a bad query is used')
    })

})