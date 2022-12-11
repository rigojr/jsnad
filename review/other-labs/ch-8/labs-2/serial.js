'use strict'
const { promisify } = require('util')

const print = (err, contents) => { 
  if (err) console.error(err)
  else console.log(contents) 
}

const opA = (cb) => {
  setTimeout(() => {
    console.log('A ends');
    cb(null, 'A')
  }, Math.floor(Math.random() * 1000))
}

const proOpA = promisify(opA);

const opB = (cb) => {
  setTimeout(() => {
    console.log('B ends');
    cb(null, 'B')
  }, Math.floor(Math.random() * 1000))
}

const proOpB = promisify(opB);

const opC = (cb) => {
  setTimeout(() => {
    console.log('C ends');
    cb(null, 'C')
  }, Math.floor(Math.random() * 1000))
}

const proOpC = promisify(opC);

async function doSerial() {
  const contentA = await proOpA();
  const contentB = await proOpB();
  const contentC = await proOpC();

  // console.log(contentA, contentB, contentC);
}

doSerial()
  .then(() => {
    Promise.all([proOpA(), proOpB(), proOpC()])
      .then((collection) => {
        // collection.forEach((value) => console.log(value));
      })
      .catch((_) => { /** do nothing */ })
  })
  .catch((_) => { /** do not thing */ })

