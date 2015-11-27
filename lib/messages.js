const messages = {
  all: [],

  create: function(data, cb) {
    data.name = data.name.replace(/<|>/g, '');
    data.content = data.content.replace(/<|>/g, '');

    this.all.push(data);
    if (cb) cb(null, data);
  }
};

export default messages;
