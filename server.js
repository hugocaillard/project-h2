import http from 'http';
import colors from 'colors';

import socketio from 'socket.io';

import staticServe from './lib/helpers/static.js';
import messages from './lib/messages.js';

function handler(req, res) {
  if (req.url === '/api') {
    res.write('Hello world');
  } else if (req.url === '/api/home') {
    res.write('Welcome home');
  }

  staticServe(req, res, './public');
}

var app = http.createServer(handler);

var io = socketio(app);
io.on('connection', function(socket) {
  socket.emit('connected', {messages: messages.all.slice(-10)});

  socket.on('messageClient', function(data) {
    messages.create(data, function(err, data) {
      console.log(data);
      socket.broadcast.emit('messageServer', data);
    });
  });
});

app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
