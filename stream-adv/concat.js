/**
 * TODO:
 */

// With concat-stream

// const concat = require('concat-stream');

// const concatStream = concat(
//   { 'encoding': 'string' },
//   foo
// );

// function foo(data) {
//   process.stdout.write(data.split('').reverse().join(''));

// }

// process.stdin
//   .pipe(concatStream);

// With Transform

const { Transform } = require('stream');

const myTransform = new Transform({
  'transform': (chunk, enc, cb) => {
    const data =
      chunk.toString()
        .split('')
        .reverse()
        .join('');

    cb(null, data);
  }
});

let things = [];

process.stdin.on('data', (chunk) => {
  const data =
    chunk.toString()
      .split('')
      .reverse()
      .join('');

  things.push(data);
});

process.stdin.on('end', () => {
  process.stdout.write(things.reverse().join(''));
});