/**
 * TODO:
 */

// With through2 module

// const through2 = require('through2');
// const stream = through2({}, function(chunk, enc, cb) {
//     this.push(chunk.toString().toUpperCase());
//     cb(null);
//   });

// process.stdin
//   .pipe(stream)
//   .pipe(process.stdout);

// With regular transform

const { Transform } = require('stream');

const myTransform = new Transform({
  'transform': function(chunk, encoding, cb) {
    const content = chunk.toString().toUpperCase();

    // this.push(content);
    // cb(null);

    cb(null, content);
  }
});

process.stdin
  .pipe(myTransform)
  .pipe(process.stdout);
