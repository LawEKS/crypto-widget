const test = require('tape')
const supertest = require('supertest')
const nock = require('nock')
const router = require('../src/router')

test('Test bad url', t => {
  supertest(router)
    .get('/_')
    .expect(404)
    .end((err, res) => {
      t.error(err, 'Incorrect endpoint responds with 404 page not found')
      t.end()
    })
})

test('Test routes to static file handler', t => {
  t.plan(7)
  supertest(router)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err, `GET to \'/\' responds with index.html`)
    })

  const files = {
    'index.html': { route: '/index.html', contentType: 'text/html' },
    'style.css': { route: '/public/css/style.css', contentType: 'text/css' },
    'render.js': { route: '/public/js/render.js', contentType: 'application/javascript' },
    'request.js': { route: '/public/js/request.js', contentType: 'application/javascript' },
    'ui.js': { route: '/public/js/ui.js', contentType: 'application/javascript' }
  }

  Object.keys(files).forEach(file => {
    supertest(router)
      .get(`${files[file].route}`)
      .expect(200)
      .expect('content-type', `${files[file].contentType}`)
      .end((err, res) => {
        t.error(err, `Requesting ${file} is successful`)
      })
  });

  supertest(router)
    .get('/public/dom.js')
    .expect(404)
    .end((err, res) => {
      t.error(err, 'Request for static files the do not exits responds with 404 page not found')
    })
})

test('Test \'/suggestions\' route', t => {
  t.plan(4)
  supertest(router)
    .get('/suggestions&search=eth')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      t.error(err, 'A valid search responds with json')
    })

  supertest(router)
    .get('/suggestions&search=[bit')
    .expect(200)
    .expect('content-type', /json/)
    .end((err, res) => {
      t.error(err, 'A valid search with no results responds with json')
      t.same(res.body, {}, 'A search with no results responds with an empty json')
    })

  supertest(router)
    .get('/suggestions&sarch=eth')
    .expect(500)
    .expect('content-type', /plain/)
    .end((err, res) => {
      t.error(err, 'A bad query responds with a message')
    })
})


test('Test \'/forecast\' route', t => {
  nock('https://coinbin.org/')
    .get('/btc/forecast')
    .replyWithFile(
      200,
      __dirname + '/dummy-data/coinbin-forecast-success.json',
      { 'Content-Type': 'application/json' }
    )

  supertest(router)
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

  supertest(router)
    .get('/forecast&ticker=abc')
    .expect(500)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err, 'GET to /forecast with bad ticker responds with 500')
      t.end()
    })
})