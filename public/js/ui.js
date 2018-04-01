/* eslint-disable */
function listenUserSearchInput() {
  console.log('listening for user input');

  var input = document.querySelector('.search');
  input.addEventListener('keyup', function(e) {
    var userInput = e.target.value.trim();
    getSuggestions(userInput, renderSuggestion);
  });
}

function listenUserSelectItem() {
  var listContainer = document.querySelector('.list-container');
  listContainer.addEventListener('click', function(e) {
    var text = e.target.textContent;
    var input = document.querySelector('.search');
    input.value = text;
    var item = e.target;
    if (item.nodeName === 'UL' || item.nodeName === 'SECTION') return;
    var ticker = item.dataset.ticker;
    console.log(ticker);
    getOverview(ticker);
  });
}

listenUserSearchInput();
listenUserSelectItem();
