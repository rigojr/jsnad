/**
 * TODO:
 */

const fs = require('fs');

const pathToFile = process.argv[2];

if (pathToFile === undefined) {
  process.exit(1);
}

fs.readFile(pathToFile, 'utf-8', (err, data) => {
  if (err !== null) {
    console.log(err);

    process.exit(2);
  }

  if (typeof pathToFile !== 'string') {
    process.exit(2);
  }

  console.log(data.split('\n').length - 1);
});

