function listenUserSearchInput() {
  console.log('listening for user input')

  var input = document.querySelector('.search')
  input.addEventListener('keyup', function(e) {
    var userInput = e.target.value.trim()
    // getSuggestions(userInput)
  })
}

function listenUserSelectItem () {
  console.log('listening for user selecting an item')
  var item = 'asset'
  getOverview(item)
}

console.log('ui.js is running')

listenUserSearchInput()