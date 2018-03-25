const fs = require('fs')
const qs = require('querystring')
const path = require('path')
const { resServerError, resResourceError, resFile200 } = require('./toolkit')

const { log } = console

const handleHome = (req, res) => {
  log('-handle- home')
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resServerError(res)
    } else {
      resFile200(res, file)
    }
  })
}

const handleIndex = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resServerError(res)
    } else {
      resFile200(res, file)
    }
  })
}

const handleStatic = (req, res) => {
  log('-handle- static')

  const ext = req.url.split('.')[1]
  const contentType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
    ico: 'image/x-icon'
  }[ext]
  log('-content type- ' + contentType)

  const filePath = path.join(__dirname, '..', req.url)
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resServerError(res)
    } else {
      resFile200(res, file, contentType)
    }
  })
}

const handleSuggestions = (req, res) => {
  log('-handle- suggestions')
}

const handlePageNotFound = res => {
  log('-handle- page not found')
  resResourceError(res)
}

module.exports = {
  handleHome,
  handleIndex,
  handleStatic,
  handleSuggestions,
  handlePageNotFound
}