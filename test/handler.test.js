const test = require('tape')
const supertest = require('supertest')
const { handleStatic } = require('../src/handler')

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
      'index.html': { resource: '/index.html', contentType: 'text/html'},
      'style.css': { resource: '/public/css/style.css', contentType: 'text/css'},
      'render.js': { resource: '/public/js/render.js', contentType: 'application/javascript'},
      'request.js': { resource: '/public/js/request.js', contentType: 'application/javascript'},
      'ui.js': { resource: '/public/js/ui.js', contentType: 'application/javascript'}
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