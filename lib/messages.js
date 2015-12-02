var model = {
  name: {
    required: true,
    min: 2,
    max: 10
  },
  content: {
    required: true,
    min: 1,
    max: 100
  }
};

const messages = {
  all: [],


  create: function(data, cb) {
    var errors = [];
    Object.keys(model).forEach(function(key) {
      if (model[key].required && !data[key]) {
        errors.push(key + ' is required');
      } else if (model[key].min && data[key].length < model[key].min) {
        errors.push(key + ' is too short');
      } else if (model[key].max && data[key].length > model[key].max) {
        errors.push(key + ' is too long');
      }
    });

    if (errors.length) {
      return cb(errors);
    }
    
    data.name = data.name.replace(/<|>/g, '');
    data.content = data.content.replace(/<|>/g, '');

    this.all.push(data);
    if (cb) cb(null, data);
  },

  get: function(n = 10) {
    return {
      messages: this.all.slice(-n)
    };
  }
};

export default messages;
