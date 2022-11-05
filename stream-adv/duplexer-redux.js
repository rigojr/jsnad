https://www.freecodecamp.org/news/node-js-streams-everything-you-need-to-know-c9141306be93/

/**
 * TODO:
 */

const { Readable, Writable } = require('stream');

const duplexer = require('duplexer2');

/**
 *TODO:
 * @param {Readable} counter
 */
function foo(counter) {
  const occurrences = new Map();

  const myWritable = new Writable({
    'objectMode': true,
    'write': function(chunk, encoding, cb) {
      const country = chunk.country;

      if (country === undefined) {
        cb('Country is undefined');
      }

      const count = occurrences.has(country) ? occurrences.get(country) : 0;

      occurrences.set(country, count + 1);
      cb(null);
    },
    'final': function(cb) {
      const inputCounter = Array.from(occurrences.entries())
        .reduce((acc, curr) => {
          return acc = {
            ...acc,
            [curr[0]]: curr[1]
          }
        }, {});

      counter.setCounts(inputCounter)
      cb(null);
    }
  });


  return duplexer({ 'objectMode': true }, myWritable, counter);
}

module.exports = foo;