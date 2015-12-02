import fs from 'fs';
import path from 'path';

const mimeTypes = {
  '.htm': 'text/html',
  '.html': 'text/html',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.png': 'image/png',
  '.ico': 'image/x-icon',
  '.gif': 'image/gif',
  '.js': 'text/javascript',
  '.css': 'text/css'
};

export default function(req, res, publicDir) {
  if (res.finished || res.headersSent)
    return;

  let filePath = path.join(publicDir, req.url);
  if (filePath == path.join(publicDir, '/'))
    filePath = path.join(publicDir, 'index.html');

  let contentType = mimeTypes[path.extname(filePath)];

  fs.readFile(filePath, function(err, content) {
    if (err) {
      res.writeHead(404);
      res.write('404 not found\n');
      return res.end();
    }
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(content, 'utf-8');
  });
};
