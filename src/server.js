const http = require('http')
const { get } = require('https')
const path = require('path')
const fs = require('fs')
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
    const formattedData = JSON.stringify(formatApiData(JSON.parse(json)), null, 2)
    const filePath = path.join(__dirname, 'data.json')
    fs.writeFile(filePath, formattedData, err => {
      if (err) return error(err)
    })
  })
})


server.listen(port, err => {
  if (err) return error('Something went wrong ', err)
  log(`Server is listening on port ${port}`)
})