/**
 * TODO:
 */

'use strict'

const fs = require('fs')
const assert = require('assert')

function read (file, cb) {
  // try {
  //   const content = await fs.promises.readFile(file)

  //   return content
  // } catch (error) {
  //   throw new Error('failed to read');
  // }

  // return new Promise((resolves, rejects) => {
  //   fs.promises.readFile(file)
  //     .then((content) => {
  //       resolves(content);
  //     })
  //     .catch(() => {
  //       rejects(new Error('failed to read'));
  //     })
  // });

  fs.readFile(file, (err, content) => {
    if (err !== null) {
      return cb(new Error('failed to read'));
    }

    cb(null, content);
  })
}

// async function check () {
//   await assert.rejects(
//     read('not-a-valid-filepath'),
//     new Error('failed to read')
//   )

//   assert.deepEqual(
//     await read(__filename),
//     fs.readFileSync(__filename)
//   )

//   console.log('passed!')
// }

function check () {
  read('not-a-valid-filepath', (err, content) => {
    assert.strictEqual(err instanceof Error, true);
    assert.strictEqual(err.message, 'failed to read');
    assert.strictEqual(content, undefined);

    console.log('passed! 1')
  });

  read(__filename, (err, content) => {
    assert.strictEqual(err, null);
    assert.deepEqual(content, fs.readFileSync(__filename));

    console.log('passed! 2');
  });
}

check()