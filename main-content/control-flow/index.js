const { promisify } = require('util');

const foo = (value, interval) => (callback) => {
    setTimeout(() => {
        callback(null, value)
    }, interval);
}

const foo1 = foo('foo1', 100);
const foo2 = foo('foo2', 300);
const foo3 = foo('foo3', 500);

const printCallback = (_, value) => console.log(value);

const foo1Promise = promisify(foo1);
const foo2Promise = promisify(foo2);
const foo3Promise = promisify(foo3);

// sequential with callbacks

foo1((_, value) => {
    printCallback(_, value);

    foo2((_, value2) => {
        printCallback(_, value2);

        foo3((_, value3) => {
            printCallback(_, value3);
        })
    })
})

// sequential promise with then and catch

foo1Promise()
.then((data) => printCallback(null, data))
.then(() => foo2Promise())
.then((data) => printCallback(null, data))
.then(() => foo3Promise())
.then((data) => printCallback(null, data))
.catch(console.log);

// sequential with async await

async function fooWithAsync() {
  const results = [];

  results.push(await foo1Promise());
  results.push(await foo2Promise());
  results.push(await foo3Promise());

  if (results.some((result) => result instanceof Error)) {
    throw new Error('message error');
  }

  console.log('printing foo with async await');

  results.forEach((result) => {
    printCallback(null, result);
  });
}

fooWithAsync()
  .catch((error) => console.log(error));

// sequential dynamic promises

[
    foo1Promise,
    foo2Promise,
    foo3Promise
]
.reduce((acc, curr) => {
  acc = acc.then(() => curr())
  .then((data) => printCallback(null, data));

  return acc;

}, Promise.resolve())
.catch(console.log);

// parallel

foo1(printCallback)
foo2(printCallback)
foo3(printCallback)

// parallel promise

const promises = [
    foo1Promise().then((data) => printCallback(null, data)),
    foo2Promise().then((data) => printCallback(null, data)),
    foo3Promise().then((data) => printCallback(null, data))
];

Promise.all(promises)
.catch(console.log)