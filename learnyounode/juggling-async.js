/**
 * TODO:
 */

const http = require('http');

const [_0, _1, ...urls] = process.argv;

// function foo(urlIndex) {
//   const url = urls[urlIndex];

//   let data = '';

//   http.get(url, (response) => {
//     response.setEncoding('utf-8');

//     response.on('data', (chunk) => {
//       data = data + chunk;
//     });

//     response.on('end', () => {
//       const nextIndex = urlIndex + 1;
//       const nextUrl = urls[nextIndex];
//       console.log(data);

//       if (nextUrl !== undefined) {
//         foo(nextIndex);
//       };
//     });

//     response.on('error', () => { });
//   })
//   .on('error', () => { });
// };

// foo(0);

// With promise

async function foo(url) {
  return new Promise((resolve, reject) => {
    let data = '';

    http.get(url, (response) => {
      response.setEncoding('utf-8');

      response.on('data', (chunk) => {
          data = data + chunk;
      });

      response.on('end', () => resolve(data));
      response.on('error', (error) => reject(error));
    })
    .on('error', (error) => reject(error));
  });
};

const urlsGet = urls.map((url) => foo(url));

Promise.all(urlsGet)
  .then((responses) => responses.forEach((response) => console.log(response)))
  .catch((error) => console.error(error));
