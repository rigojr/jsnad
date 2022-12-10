/**
 * Creating a readable stream;
 */

const fs = require('fs');
const { Readable, Writable } = require('stream');

function createReadableStream () {
  const readableStream = new Readable();

  readableStream._read = () => { /* Nothing to do */ };

  readableStream.push('I am an ');
  readableStream.push('readable ');
  readableStream.push('stream \n');
  readableStream.push(null);

  readableStream.pipe(process.stdout); // Push are being buffered data waiting for consumer to ask for.
}

// Push chunk on demand

function pushChunkOnDemand() {
  const readableStream2 = new Readable();

  let counter = 97;

  readableStream2._read = function () {
    console.log('occurs when consumer ask');
    this.push(String.fromCharCode(counter++));

    if (counter > 'z'.charCodeAt(0)) {
      this.push(null);
    }
  }

  readableStream2.pipe(process.stdout);
}

/**
 * If you want to create a readable stream that pushes arbitrary values instead of
 * just strings and buffers, make sure to create your readable stream with
 * `Readable({ objectMode: true })`
 */

function consumeReadableStream() {
  process.stdin.on('data', (chunk) => {
    const buf = chunk;
    console.dir(buf);
  });

  process.stdin.on('end', () => { console.log('end') })

  //(echo abc; sleep 1; echo def; sleep 1; echo ghi) | node consume0.js
}

function createWritableStream () {
  const writableStream = new Writable({
    'write': function(chunk, enc, next) {
      console.dir(chunk);
      next();
    }
  });

  writableStream.on('finish', () => console.log('close'));
  process.stdin.pipe(writableStream);
  // $ (echo beep; sleep 1; echo boop) | node write0.js 
}

/**
 * { ObjectMode: true } when data came as objects and not bugger/strings.
 */

function writeInWritable() {
  process.stdout.write('start writing in message.txt\n');

  const writableFsStream = fs.createWriteStream('./message.txt')

  writableFsStream.on('drain', () => console.log('buffer empty'));

  process.stdout.write('writing\n');
  writableFsStream.write('boop\n');

  setTimeout(() => {
    process.stdout.write('finishing writing\n');
    writableFsStream.end('beep\n');
    process.stdout.end('writing ends\n');
  }, 5000);
}

// createReadableStream();
// pushChunkOnDemand();
// consumeReadableStream();
// createWritableStream();
writeInWritable();