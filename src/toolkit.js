const fs = require('fs')
const { log, error } = console

const formatApiData = resObj => {
  const coins = Object.keys(resObj.coins)
  const result = coins.reduce((obj, coin) => {
    const name = resObj.coins[coin].name
    const rank = resObj.coins[coin].rank
    const ticker = resObj.coins[coin].ticker
    obj[name] = { rank, ticker }
    return obj
  }, {})
  return result
}

const filterSuggestions = (dataObj, subString) => {
  return {}
}

module.exports = {
  formatApiData,
  filterSuggestions
}