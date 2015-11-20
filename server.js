import http from 'http';
import colors from 'colors';

import resSugar from './lib/helpers/resSugar.js'

let app = http.createServer(function (req, res) {
  resSugar(res);
});

app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
