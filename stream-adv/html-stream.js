/**
 * TODO:
 */

const { Transform } = require('stream');
const tr = require('trumpet')();

const transformUpperCase = new Transform({
  'transform': function(buff, enc, cb) {
    const content = buff.toString().toUpperCase();

    cb(null, content);
  }
});

const stream = tr.select('.loud').createStream();

stream
  .pipe(transformUpperCase);

process.stdin
  .pipe(tr)
  .pipe(process.stdout);
