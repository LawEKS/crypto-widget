function renderSuggestion(obj) {
  var container = document.querySelector('.list-container')
  var oldList = document.querySelector('.list')
  var newList = document.createElement('ul')
  newList.setAttribute('class', 'list')

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var item = document.createElement('li')
      var text = document.createTextNode(key)
      var ticker = obj[key].ticker
      var rank = obj[key].rank
      item.setAttribute('data-ticker', ticker)
      item.setAttribute('data-rank', rank)
      item.appendChild(text)
      newList.appendChild(item)
    }
  }

  container.replaceChild(newList, oldList)
  var search = document.querySelector('.search')
  search.style.setProperty('box-shadow', 'none');
  search.style.setProperty('border-radius', '.2rem .2rem 0 0');
  console.log('rendering response')
}

function renderOverview(obj) {
  var overviewContainer = 'overview'
  console.log('rendering response')
}

console.log('render.js is running')