/**
 * TODO:
 */

const myModule = require('./mymodule');

const pathToDirectory = process.argv[2];
const extension = process.argv[3];

function callBack(err, files) {
  if (err !== null) {
    console.error(err);
  }

  files.forEach(file => {
    console.log(file);
  });
}

myModule(pathToDirectory, extension, callBack);
