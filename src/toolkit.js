const fs = require('fs')
const { error } = console

const formatApiData = resObj => {
  return {}
}

const filterSuggestions = (dataObj, subString) => {
  return {}
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

const resFile200 = (res, file, contentType = 'text/html') => {
  res.writeHead(200, {'Content-Type': `${contentType}`})
  res.end(file)
}

module.exports = {
  formatApiData,
  filterSuggestions,
  resServerError,
  resResourceError,
  resFile200
}