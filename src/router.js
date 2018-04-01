const { handleStatic, handleSuggestions, handleForecast } =  require('./handler')

const router = (req, res) => {
    const url = req.url
    if (url.indexOf('/suggestions') !== -1) {
      handleSuggestions(req, res)
    } else if (url.indexOf('/forecast') !== -1) {
      handleForecast(req, res)
    } else {
      handleStatic(req, res)
    }
} // Router

module.exports = router