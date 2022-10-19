/**
 * TODO:
 */

const { Transform } = require('stream');
const http = require('http');

const port = process.argv[2];

if (port === undefined) {
  process.exit(1);
}

const myTransform = new Transform({
  'transform': function(chunk, encoding, cb) {
    const content = chunk.toString().toUpperCase();

    cb(null, content);
  }
});

const server = http.createServer(function(req, res) {
  if (req.method === 'POST') {
    req
      .pipe(myTransform)
      .pipe(res);
  }
});

server.listen(port);
