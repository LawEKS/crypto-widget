const fs = require('fs')
const { error } = console

const formatApiData = resObj => {
  return {}
}

const filterSuggestions = (dataObj, subString) => {
  return {}
}

const resServerError = res => {
  error('Something went wrong')
}

const resResourceError = res => {
  error('Something went wrong')
}

module.exports = {
  formatApiData,
  filterSuggestions,
  resServerError,
  resResourceError
}