import http from 'http';
import colors from 'colors';

import socketio from 'socket.io';

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

var io = socketio(app);
io.on('connection', function(socket) {
  console.log('user connected');
  socket.emit('connected', {status: 'Welcome!!!!'});

  socket.on('messageClient', function(data) {
    console.log(data)
    if (data.name && data.name.length > 1 && data.content && data.content.length < 100) {
    socket.broadcast.emit('messageServer', data);
    }
  });
});


app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
