/**
 * 
 */

const fs = require('fs');
const http = require('http');

const port = process.argv[2];
const path = process.argv[3];

if (port === undefined) {
  process.exit(1);
}

if (path === undefined) {
  process.exit(2);
}

const server = http.createServer((request, response) => {
  fs
    .createReadStream(path)
    .pipe(response);
});
server.listen(port);
