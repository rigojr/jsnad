/**
 * TODO:
 */

const { Transform } = require('stream');
const http = require('http');

const port = process.argv[2];

if (port === undefined) {
  process.exit(1);
}

const server = http.createServer((req, res) => {
  if (req.method !== 'POST') {
    res.end();
    return;
  }

  req.pipe(new Transform({
    'transform': (chunk, encoding, cb) => {
      cb(null, chunk.toString().toUpperCase());
    }
  })).pipe(res);
});

server.listen(port);

