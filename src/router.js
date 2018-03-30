const { log } = console
const {
  handleStatic,
  handleSuggestions,
  handleForecast,
  handlePageNotFound
} =  require('./handler')

const router = (req, res) => {
  if (req.method === 'GET') {
    const url = req.url
    if (url === '/') {
      handleStatic(req, res)
    } else if(url === '/index.html') {
      handleStatic(req, res)
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