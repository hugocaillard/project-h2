import path from 'path';

const func = (method, url) => router.listeners[method][norm(url)];
const norm = (url) => path.resolve(url);

const router = {
  prefix: '',
  allowed: ['GET', 'POST'],
  listeners: {
    GET: {},
    POST: {},
  },

  get(url, cb) {
    return this.listeners.GET[norm(this.prefix + url)] = cb;
  },
  post(url, cb) {
    return this.listeners.POST[norm(this.prefix + url)] = cb;
  },

  ensure(req, res) {
    if (this.allowed.indexOf(req.method) === -1)
      return res.error(405);

    let fn = func(req.method, req.url)
    if (!fn)
      return res.error(404);
    return fn;
  },

  on(req, res) {
    if (!req.url.startsWith(this.prefix))
      return;

    let fn = this.ensure(req, res);
    if (res.finished)
      return;

    fn(req, res);
  }
}

export default router;
