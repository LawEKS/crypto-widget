const http = require('http')
const { get } = require('https')
const { formatApiData } = require('./toolkit')
const { log, error } = console

const router = require('./router')
const port = process.env.PORT || 3003

const server = http.createServer(router)

// TODO: make GET request to populate data.json
const url = 'https://coinbin.org/coins'

get(url, res => {
  let json = ''
  res.on('data', chunk => {
    json += chunk
  })

  res.on('end', () => {
    const formattedData = JSON.stringify(formatApiData(JSON.parse(json)))
    log(formattedData)
  })
})

server.listen(port, err => {
  if (err) return error('Something went wrong ', err)
  log(`Server is listening on port ${port}`)
})