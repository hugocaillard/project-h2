let data = [];
const model = {
  name: {
    required: true,
    minLength: 1
  },
  content: {
    required: true,
    minLength: 2
  },
  createdAt: {
    required: true
  }
};

const validate = function(body = {}) {
  body.createdAt = Date.now();
  body.content = body.content.replace(/<\/?[^>]+(>|$)/g, '');

  let errors = [];
  Object.keys(model).map(function(k) {
    if (model[k].required && !body[k])
      errors.push(`${k} is required`);
    if (model[k].minLength && body[k].length < model[k].minLength)
      errors.push(`${k} is too short`);
  });

  return errors.length ? errors : false;
};

const messages = {
  save(body, cb) {
    let err = validate(body);
    if (err) return cb(err);

    data.push(body);
    cb(null, body);
  },

  get: () => data.length > 10 ? data.slice(-10) : data
};

export default messages;
