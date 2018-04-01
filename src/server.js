const http = require('http');
const { get } = require('https');
const path = require('path');
const fs = require('fs');
const { formatApiData } = require('./toolkit');
const router = require('./router');

const { log, error } = console;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3003;

const server = http.createServer(router);

const url = 'https://coinbin.org/coins';

get(url, (res) => {
  let body = '';
  res.on('data', (chunk) => {
    body += chunk;
  });

  res.on('end', () => {
    const formattedData = JSON.stringify(formatApiData(JSON.parse(body)), null, 2);
    const filePath = path.join(__dirname, 'data.json');
    fs.writeFile(filePath, formattedData, (err) => {
      if (err) error('Something went wrong ', err);
    });
  });
});


server.listen(port, (err) => {
  if (err) error('Something went wrong ', err);
  log(`Server is running at http://${host}:${port}`);
});
