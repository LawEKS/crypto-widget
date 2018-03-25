function listenUserSearchInput() {
  console.log('listening for user input')
  var userInput = 'asset'
  getSuggestions(userInput)
}

function listenUserSelectItem () {
  console.log('listening for user selecting an item')
  var item = 'asset'
  getOverview(item)
}