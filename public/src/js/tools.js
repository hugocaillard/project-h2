const $ = {
  req(method, url, data, cb) {
    let req = new XMLHttpRequest();
    req.open(method, url, true);

    req.onload = () => {
      if (req.status >= 200 && req.status < 400 && cb)
        cb(req.status, JSON.parse(req.responseText));
      else
        console.error(req.status, JSON.parse(req.responseText));
    };
    req.onerror = (err) => console.error('Error', err);

    if (data)
      req.setRequestHeader('Content-Type', 'application/json');

    req.send(data);
  },

  get: (url, cb) => $.req('GET', url, null, cb),
  post: (url, data, cb) => $.req('POST', url, JSON.stringify(data), cb),
  put: (url, data, cb) => $.req('PUT', url, JSON.stringify(data), cb),

  sel: sel => document.querySelector(sel),
  selAll: sel => document.querySelectorAll(sel),
};

export default $;
