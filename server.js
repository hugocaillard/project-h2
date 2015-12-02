import http from 'http';
import socketio from 'socket.io';
import colors from 'colors';

import router from './lib/helpers/router';
import staticServe from './lib/helpers/static';
import resFormatter from './lib/helpers/resFormatter.js';

router.prefix = '/api';
require('./lib/routes.js');

const handler = (req, res) => {
  resFormatter.format(res);
  router.on(req, res);
  if (!req.url.startsWith(router.prefix))
    staticServe(req, res, './public');
};

let app = http.createServer(handler);

import sh from './lib/socketsHandler.js';
sh.init(socketio(app));

app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
