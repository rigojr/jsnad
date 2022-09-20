/**
 * TODO:
 */

const http = require('http');

const url = process.argv[2];

let data = '';

http.get(url, (response) => {
  response.setEncoding('utf-8');

  response.on('data', (chunk) => {
    data = data + chunk;
  });

  response.on('end', () => {
    console.log(data.length);
    console.log(data);
  });
});