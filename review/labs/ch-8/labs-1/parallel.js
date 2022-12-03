const { promisify } = require('util');

const print = (err, contents) => {
  if (err) console.error(err)
  else console.log(contents)
}

const opA = (cb) => {
  setTimeout(() => {
    cb(null, 'A')
  }, 500)
}

const opAPromisify = promisify(opA);

const opB = (cb) => {
  setTimeout(() => {
    cb(null, 'B')
  }, 250)
}

const opBPromisify = promisify(opB);

const opC = (cb) => {
  setTimeout(() => {
    cb(null, 'C')
  }, 125)
}

const opCPromisify = promisify(opC);

async function main() {
  try {
    print(null, await opCPromisify());
    print(null, await opBPromisify());
    print(null, await opAPromisify());
  } catch (error) {
    print(error);
    throw new Error(error);
  }
}

opA((errA, contentA) => {
  opB((errB, contentB) => {
    opC((errC, contentC) => {
      console.log('with Callbacks');
      print(errC, contentC);
      print(errB, contentB);
      print(errA, contentA);
      console.log('With Promises');
      main()
        .catch(() => {
          // Do nothing;
        });
    });
  });
});