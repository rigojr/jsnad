const fs = require('fs');
const { promisify } = require('util');

const file = process.argv[2];

const cb = (err, buf) => {
  if (err === null) {
    console.log(buf.toString().split('\n').length - 1);
  } else {
    // TODO:
  }
}

const promisifyRedFile = promisify(fs.readFile);

// if (file !== undefined) {
//   // fs.readFile(file, cb);
//   promisifyRedFile(file)
//     .then((buf) => {
//       console.log(buf.toString().split('\n').length - 1);
//     })
//     .catch(() => {
//       // TODO:
//     })
// } else {
//   // TODO:
// }

async function foo() {
  if (file !== undefined) {
    const buf = await promisifyRedFile(file);

    console.log(buf.toString().split('\n').length - 1);
  } else {
    // TODO:
  }
}

foo()
  .catch(error => {
    // TODO:
  })