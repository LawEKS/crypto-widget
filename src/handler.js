const fs = require('fs');
const qs = require('querystring');
const path = require('path');
const data = require('./data.json');
const { filterSuggestions, coinbinRequest } = require('./toolkit');

const resResourceError = (res) => {
  res.writeHead(404, { 'Content-Type': 'text/html' });
  res.end('<h1>404 Sorry Page Not Found<h1>');
};

const res200 = (res, file, contentType) => {
  res.writeHead(200, { 'Content-Type': `${contentType}` });
  res.end(file);
};

const handleStatic = (req, res) => {
  const { url } = req;

  let basePath = path.resolve('./');
  let resource = url.replace(/^(\.+[/\\])+/, ''); // removes all ./ and ../

  if (url === '/' || url === '/index.html') {
    basePath = path.resolve('./public');
    resource = '/index.html';
  }

  const ext = resource.split('.')[1];
  const contentType = {
    html: 'text/html',
    css: 'text/css',
    js: 'application/javascript',
  }[ext];

  const filePath = path.join(basePath, resource);
  fs.readFile(filePath, (err, file) => {
    if (err) {
      resResourceError(res);
    } else {
      res200(res, file, contentType);
    }
  });
};

const handleSuggestions = (req, res) => {
  const { search } = qs.parse(req.url);
  if (search === undefined) {
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('suggestions must use the search query');
  } else {
    const suggestions = filterSuggestions(data, search);
    res200(res, JSON.stringify(suggestions), 'application/json');
  }
};

const handleForecast = (req, res) => {
  const { ticker } = qs.parse(req.url);
  const endpoint = `/${ticker}/forecast`;
  coinbinRequest(endpoint, (err, apiRes, body) => {
    if (err) {
      res.writeHead(apiRes.statusCode, { 'Content-Type': `${apiRes.headers['content-type']}` });
      res.end('Something went wrong');
    } else {
      res200(res, body, apiRes.headers['content-type']);
    }
  });
};


module.exports = {
  handleStatic,
  handleSuggestions,
  handleForecast,
};
