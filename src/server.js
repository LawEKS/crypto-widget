const http = require('http')
const { get } = require('https')
const { log, error } = console

const router = require('./router')
const port = process.env.PORT || 3003

const server = http.createServer(router)

// TODO: make GET request to populate data.json

server.listen(port, err => {
  if (err) return error('Something went wrong ', err)
  log(`Server is listening on port ${port}`)
})