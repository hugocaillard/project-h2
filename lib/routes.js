import router from './helpers/router';
import messages from './messages.js';

router.get('/', (req, res) => {
  res.json({
    status: 'Success',
    data: 'Hello world'
  });
});

router.post('/messages', function(req, res) {
  let body = '';
  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    body = (JSON.parse(body));
    messages.save(body, function(err = null, body = {}){
      if (err)
        return res.error(400, err);

      res.json({status: 'Success', body});
    });
  });
});

router.get('/messages', function(req, res) {
  res.json(messages.get());
});
