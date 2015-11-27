'use strict';

const resFormatter = {
  json(data, code = 200) {
    this.writeHead(code, {'Content-Type': 'application/json'});
    this.write(JSON.stringify(data));
    this.end();
  },

  error(code = 400, errors = null) {
    this.json({
      status: 'Failed',
      errors
    }, code);
  },

  format(res) {
    res.json = this.json;
    res.error = this.error;
  }
};

module.exports = resFormatter;
