/**
 * TODO:
 */

const http = require('http');
const { Transform } = require('stream');

const port = process.argv[2];

if (port === undefined) {
  process.exit(1);
}

const server = http.createServer();

server.on('request', (req, res) => {
  if (req.method !== 'GET') {
    res.end();
    return;
  }

  res.writeHead(200, { 'Content-Type': 'application/json' });

  const url = new URL(req.url, `http://${req.host}`); // Not sure about this
  const date = new Date(url.searchParams.get('iso'));

  if (req.url.includes('/api/parsetime')) {
    const data = JSON.stringify({
      'hour': date.getHours(),
      'minute': date.getMinutes(),
      'second': date.getSeconds()
    });

    res.write(data);
  } else if (req.url.includes('/api/unixtime')) {
    const data = JSON.stringify({
      'unixtime': date.getTime()
    });

    res.write(data);
  }

  res.end();
});

server.listen(port);
