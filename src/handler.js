const fs = require('fs')
const qs = require('querystring')

const { log } = console

const handleHome = (req, res) => {
  log('-handle- home')
}
const handleStatic = (req, res) => {
  log('-handle- static')
}
const handleSuggestions = (req, res) => {
  log('-handle- suggestions')
}
const handlePageNotFound = res => {
  log('-handle- page not found')
}

module.exports = {
  handleHome,
  handleStatic,
  handleSuggestions,
  handlePageNotFound
}