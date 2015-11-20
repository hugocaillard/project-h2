import http from 'http';
import colors from 'colors';

import staticServe from './lib/helpers/static.js';

function handler(req, res) {
  console.log(req.method);
  console.log(req.url);

  if (req.url === '/api') {
    res.write('Hello world');
  } else if (req.url === '/api/home') {
    res.write('Welcome home');
  }

  staticServe(req, res, './public');
}

var app = http.createServer(handler);

app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
