/**
 * TODO:
 */

const { Readable } = require('stream');

const content = process.argv[2];

if (content === undefined) {
  process.exit(1);
}

class CustomReadableStream extends Readable {
  _read() { /* console.log('read'); */ }

  addContent(content) {
    this.push(content);
  }
}

const myThing = new CustomReadableStream();

myThing.addContent(content);
myThing.pipe(process.stdout);