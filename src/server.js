const http = require('http');
const path = require('path');
const fs = require('fs');
const { formatApiData, coinbinRequest } = require('./toolkit');
const router = require('./router');

const { log, error } = console;

const host = process.env.HOST || 'localhost';
const port = process.env.PORT || 3003;

const server = http.createServer(router);

coinbinRequest('/coins', (err, res, body) => {
  if (err) {
    log(err);
  } else {
    const formattedData = JSON.stringify(formatApiData(JSON.parse(body)), null, 2);
    const filePath = path.join(__dirname, 'data.json');
    fs.writeFile(filePath, formattedData, (fileErr) => {
      if (fileErr) error('Something went wrong ', fileErr);
    });
  }
});

server.listen(port, (err) => {
  if (err) error('Something went wrong ', err);
  log(`Server is running at http://${host}:${port}`);
});
