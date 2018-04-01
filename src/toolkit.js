const { get } = require('https')

const coinbinRequest = (endpoint, cb)=> {
  get(`https://coinbin.org${endpoint}`, res => {
    const { statusCode } = res
    const contentType = res.headers['content-type']

    let error
    if (statusCode !== 200) {
      error = new Error(`Request failed - Status Code: ${statusCode}`)
    }

    if (error) {
      cb(error, res)
      res.resume()
      return
    }

    res.setEncoding('utf-8')
    let body = ''
    res.on('data', chunk => {
      body += chunk
    })
    res.on('end', () => {
      cb(null, res, body)
    })
  }).on('error', (e) => { // ENOTFOUND? - How do to test for this
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

const filterSuggestions = (dataObj, search) => {
  // if search is empty or includes and special characters
  if (search === '' || /[^\s\w]/gi.test(search)) {
   return {}
  }
  const names = Object.keys(dataObj)
  const result = names.reduce((obj, name) => {
    if (name.toLowerCase().includes(search.toLowerCase())) {
      obj[name] = dataObj[name] 
    }
    return obj
  }, {})
  return result

}

module.exports = {
  formatApiData,
  filterSuggestions,
  coinbinRequest
}