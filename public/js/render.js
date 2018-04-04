/* eslint-disable */
function renderSuggestion(obj) {
  var container = document.querySelector('.list-container');
  var oldList = document.querySelector('.list');
  var newList = document.createElement('ul');
  newList.setAttribute('class', 'list');

  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      var item = document.createElement('li');
      var text = document.createTextNode(key);
      var ticker = obj[key].ticker;
      var rank = obj[key].rank;
      item.setAttribute('data-ticker', ticker);
      item.setAttribute('data-rank', rank);
      item.appendChild(text);
      newList.appendChild(item);
    }
  }

  container.replaceChild(newList, oldList);
  var search = document.querySelector('.search');
}

function renderOverview(obj) {
  console.log(obj)
  var overviewContainer = 'overview';
  console.log('rendering response');
}

