const test = require('tape')
const supertest = require('supertest')
const router = require('../src/router')

test('Test \'/\' route', t => {
  supertest(router)
    .get('/')
    .expect(200)
    .expect('content-type', /html/)
    .end((err, res) => {
      t.error(err, 'Status Code: 200, Content-Type: text/css')
      t.end()
    })
})

test('Test bad url', t => {
  supertest(router)
    .get('/_')
    .expect(404)
    .end((err, res) => {
      t.error(err, 'Incorrect endpoint responds with 404 page not found')
      t.end()
    })
})

test('Test \'/public\' routes', t => {
  t.plan(5)
  supertest(router)
    .get('/public/css/style.css')
    .expect(200)
    .expect('content-type', /css/)
    .end((err, res) => {
      t.error(err, 'Status Code: 200, Content-Type: text/css')
    })

  supertest(router)
    .get('/public/dom.js')
    .expect(404)
    .end((err, res) => {
      t.error(err, 'Request for incorrect public file responds with 404 page not found')
    })

    const files = ['render.js', 'request.js', 'ui.js']
    files.forEach(file => {
      supertest(router)
      .get(`/public/js/${file}`)
      .expect(200)
      .expect('content-type', /javascript/)
      .end((err, res) => {
        t.error(err, 'Status Code: 200, Content-Type: application/javascript')
      })
    });
    
})