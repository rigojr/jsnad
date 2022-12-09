/**
 * TODO:
 */

const http = require('http');

const async = require('async');

const firstURL = process.argv[2];
const secondURL = process.argv[3];

if (firstURL === undefined && secondURL === undefined) {
  console.error('arguments not defined');
  process.exit(1);
}

function genericGet(url, cb) {
  let body = '';

  http.get(url, (res) => {
    res.on('data', (chunk) => {
      body = body + chunk.toString();
    });

    res.on('end', () => {
      cb(null, body);
    });

    res.on('error', () => {
      cb(error);
    });
  });
}

async.series({
  'requestOne': (cb) => genericGet(firstURL, cb),
  'requestTwo': (cb) => genericGet(secondURL, cb)
}, (err, results) => {
  console.log(results);
})

