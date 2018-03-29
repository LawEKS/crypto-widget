const fs = require('fs')
const { get } = require('https')
const { log, error } = console

const getApiData = cb => {
  get('https://coinbin.org/coins', res => {
    const { statusCode } = res.statusCode
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error(`Request failed - Status Code: ${statusCode}`)
    } else if (!/^application\/json/.test(contentType)) {
      error = new Error(`Expected application/json but got ${contentType}`)
    }

    if (error) {
      cb(error)
      res.resume()
      return
    }

    res.setEncoding('utf-8')
    let body = ''
    res.on('data', chunk => {
      body += chunk
    })
    res.on('end', () => {
      cb(null, body)
    })
  }).on('error', (e) => {
    cb(e)
  })
}

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
  if (subString === '') {
   return {}
  }
  const names = Object.keys(dataObj)
  const result = names.reduce((obj, name) => {
    if (name.toLowerCase().includes(subString.toLowerCase())) {
      obj[name] = dataObj[name] 
    }
    return obj
  }, {})
  return result

}

module.exports = {
  formatApiData,
  filterSuggestions
}