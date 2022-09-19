/**
 * TODO:
 */
const { promisify } = require('util');

const foo = require('./mymodule');
const promisifyFoo = promisify(foo);

const [_0, _1, directory, extension] = process.argv;

const doSomething = (list) => {
  list.forEach(file => {
    console.log(file);
  });
}

if (directory !== undefined && extension !== undefined) {
  // foo(directory, extension, (err, list) => {
  //   if (err === null) {
  //     doSomething(list);
  //   } else {
  //     console.error('error ocurred');
  //   }
  // });

  promisifyFoo(directory, extension)
    .then((list) => doSomething(list))
    .catch((_err) => console.error('error ocurred'));
}