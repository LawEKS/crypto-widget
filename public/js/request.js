function getSuggestions(subString, renderer) {
  var url = '/suggestions&search=' + subString
  var xhr = new XMLHttpRequest()
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      var resObj = JSON.parse(this.responseText)
      renderer(resObj)
    }
  }
  xhr.open('GET', url, true)
  xhr.send()
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
