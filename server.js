import http from 'http';
import colors from 'colors';

import staticServe from './lib/helpers/static.js';

let app = http.createServer(function (req, res) {
  staticServe(req, res, './public');
});

app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
