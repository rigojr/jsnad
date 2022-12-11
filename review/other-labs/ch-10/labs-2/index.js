'use strict'
const fs = require('fs')
const assert = require('assert')

async function read (file) {
  // try {
  //   const content = await fs.promises.readFile(file)

  //   return content
  // } catch (error) {
  //   throw new Error('failed to read');
  // }

  // return new Promise((resolve, reject) => {
  //   fs.promises.readFile(file)
  //     .then(content => resolve(content))
  //     .catch(() => reject(new Error('failed to read')))
  // });

  return new Promise( async (resolve, reject) => {
    try {
      const content = await fs.promises.readFile(file)

      resolve(content)
    } catch (error) {
      reject(new Error('failed to read'));
    }
  });
}


async function check () {
  await assert.rejects(
    read('not-a-valid-filepath'), 
    new Error('failed to read')
  )
  assert.deepEqual(
    await read(__filename),
    fs.readFileSync(__filename)
  )
  console.log('passed!')
}

check()
