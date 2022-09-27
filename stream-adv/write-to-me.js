/**
 * TODO:
 */

const { Writable } = require('stream');

// const myWritable = new Writable({
//   'write': (chunk, enc, cb) => {
//     console.log('writing: ' + chunk);

//     cb(null);
//   }
// });

// as a Class

class MyWritable extends Writable {
  _write(chunk, encoding, cb) {
    console.log('writing: ' + chunk);

    cb(null);
  }
}

const myWritable = new MyWritable();

process.stdin.pipe(myWritable);