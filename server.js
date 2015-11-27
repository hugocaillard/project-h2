'use strict';

const http = require('http');
const colors = require('colors');

const staticServe = require('./lib/helpers/static.js');

let app = http.createServer(function (req, res) {
  console.log(req.url)
  staticServe(req, res, './public');
});

app.listen(3000, function () {
  console.log('Server running at localhost:3000/'.underline);
});
