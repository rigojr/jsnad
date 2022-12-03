'use strict'
const { promisify } = require('util')

const print = (err, contents) => { 
  if (err) console.error(err)
  else console.log(contents) 
}

const opA = (cb) => {
  setTimeout(() => {
    cb(null, 'A')
  }, 500)
}

const opB = (cb) => {
  setTimeout(() => {
    cb(null, 'B')
  }, 250)
}

const opC = (cb) => {
  setTimeout(() => {
    cb(null, 'C')
  }, 125)
}

async function main() {
  const contentA = await promisify(opA)();
  const contentB = await promisify(opB)();
  const contentC = await promisify(opC)();

  print(null, contentA);
  print(null, contentB);
  print(null, contentC);
}

main()
  .catch((error) => { console.error(error) });
