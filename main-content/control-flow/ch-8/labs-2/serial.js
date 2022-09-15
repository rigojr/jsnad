'use strict'
const { promisify } = require('util')

const print = (err, contents) => {
  if (err) console.error(err)
  else console.log(contents)
}

const promisePrint = promisify(print);

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
const ops = [ opA, opB, opC ];
const promisifyOps = [ promisify(opA), promisify(opB), promisify(opC) ];

async function run(index) {
  if (index === ops.length) {
    return;
  }

  // ops[index]((err, content) => {
  //   print(err, content);
  //   run(index + 1);
  // });

  const result = await promisifyOps[index]();
  print(null, result);
  run(index + 1);

}

run(0)
  .catch(console.error);