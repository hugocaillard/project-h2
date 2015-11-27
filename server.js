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
});


app.listen(3000, function () {
  console.log('Server running at localhost:3000/'.underline);
});
