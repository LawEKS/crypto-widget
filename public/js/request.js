function getSuggestions(subString, renderer) {
  console.log('user entered ' + subString)
  console.log('fetching suggestions')

  var resObj = {
    asset_name: {
      ticker: 'tic',
      rank: 0
    } // fake asset
  } // fake response
  
  renderer(resObj)
}
function getOverview(idString, renderer) {
  console.log('user selected ' + idString)
  console.log('fetching ' + idString + ' overview')

  var resObj = {
    icon: {
      src: 'https://cdn3.iconfinder.com/data/icons/currency-and-cryptocurrency-signs-1/64/cryptocurrency_blockchain_Bitcoin_BTC-256.png'
    }
  } // fake response

  renderer(resObj)
}