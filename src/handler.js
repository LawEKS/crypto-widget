const fs = require('fs')
const qs = require('querystring')
const path = require('path')
const data = require('./data.json')
const { filterSuggestions } = require('./toolkit')

const { log } = console

const handleHome = (req, res) => {
  log('-handle- home')
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resServerError(res)
    } else {
      res200(res, file)
    }
  })
}

const handleIndex = (req, res) => {
  const filePath = path.join(__dirname, '..', 'public', 'index.html')
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resServerError(res)
    } else {
      res200(res, file)
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
      res200(res, file, contentType)
    }
  })
}

const handleSuggestions = (req, res) => {
  log('-handle- suggestions')
  const search = qs.parse(req.url)['search']
  const suggestions = filterSuggestions(data, search)
  res200(res, JSON.stringify(suggestions), 'application/json')
}

const handlePageNotFound = res => {
  log('-handle- page not found')
  resResourceError(res)
}

const resServerError = res => {
  error('500 something went wrong')
  res.writeHead(500, {'Content-Type':'text/html'})
  res.end('<h1>500 Sorry Server Error<h1>')
}

const resResourceError = res => {
  error('404 something went wrong')
  res.writeHead(404, {'Content-Type':'text/html'})
  res.end('<h1>404 Sorry Page Not Found<h1>')
}

const res200 = (res, file, contentType = 'text/html') => {
  res.writeHead(200, {'Content-Type': `${contentType}`})
  res.end(file)
}

module.exports = {
  handleHome,
  handleIndex,
  handleStatic,
  handleSuggestions,
  handlePageNotFound
}