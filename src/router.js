const { log } = console
const {
  handleHome,
  handleIndex,
  handleStatic,
  handleSuggestions,
  handleForecast,
  handlePageNotFound
} =  require('./handler')

const router = (req, res) => {
  log()
  if (req.method === 'GET') {
    const url = req.url
    // log(`-GET- ${url}`)

    if (url === '/') {
      handleHome(req, res)
    } else if(url === '/index.html') {
      handleIndex(req, res)
    } else if (url.indexOf('/public') !== -1) {
      handleStatic(req, res)
    } else if (url.indexOf('/suggestions') !== -1) {
      handleSuggestions(req, res)
    } else if (url.indexOf('/forecast') !== -1) {
      handleForecast(req, res)
    } else {
      handlePageNotFound(res)
    }
  } // GET Routes
} // Router

module.exports = router