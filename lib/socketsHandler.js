import messages from './messages.js';

const handler = {
  io: null,
  init(io) {
    this.io = io;

    io.on('connection', function(socket) {
      socket.emit('connected', 'Connected to websockets');

      socket.on('message', function(data) {
        messages.save(data, function(err = null, body = {}){
          if (err)
            return socket.emit('message-error', err);

          socket.broadcast.emit('message', body);
        });
      });
    });
  }
};

export default handler;
