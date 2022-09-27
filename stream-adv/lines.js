/**
 * TODO:
 */

const { Transform } = require('stream');

let count = 1;

const myTransform = new Transform({
  'transform': function(chunk, enc, cb) {
    let content = chunk.toString().toLowerCase();

    if (count % 2 === 0) {
      content = content.toUpperCase();
    }

    count += 1;

    cb(null, content);
  }
});

process.stdin
  .pipe(myTransform)
  .pipe(process.stdout);