/**
 * TODO:
 */

const fs = require('fs');
const { get } = require('http');

const async = require('async');

const pathToFile = process.argv[2];

if (pathToFile === undefined) {
  process.exit(1);
}

async.waterfall(
  [
    function(cb) {
      let url = '';

      fs.createReadStream(pathToFile)
        .on('data', (chunk) => {
          url = url + chunk.toString();
        })
        .on('end', () => cb(null, url))
        .on('error', (err) => cb(err));
    },
    function(url, cb) {
      let body = '';

      get(url, (res) => {
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
    },
    function(body, cb) {
      console.log(body);
      cb(null);
    }
  ]
)