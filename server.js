'use strict';

const http = require('http');
const colors = require('colors');
const socketio = require('socket.io');

const staticServe = require('./lib/helpers/static.js');

let app = http.createServer(function (req, res) {
  staticServe(req, res, './public');
});

var io = socketio(app);

io.on('connection', function(socket) {
  console.log('USER CONNECTED')
  socket.emit('connected', {status: 'Success'});

  socket.on('newMessage', function(data) {
    data.content = data.content.replace(/<|>/gi, '');
    data.name = data.name.replace(/<|>/gi, '');
    if (data.name.length > 2 && data.name.length < 10 &&
       data.content.length > 2 && data.content.length < 100) {
      socket.broadcast.emit('message', data);
    }
  });

  socket.on('typing', function(data) {
    socket.broadcast.emit('someoneIsTyping');
  });
});


app.listen(3000, function () {
  console.log('Server running at localhost:3000/'.underline);
});
