import http from 'http';
import colors from 'colors';

let app = http.createServer(function (req, res) {});

app.listen(3000, () => {
  console.log('Server running at localhost:3000/'.underline);
});
