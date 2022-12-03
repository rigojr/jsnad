/**
 * TODO:
 */

const fs = require('fs');

const pathToFile = process.argv[2];

if (pathToFile === undefined) {
  process.exit(1);
}

const data = fs.readFileSync(pathToFile).toString();

if (typeof pathToFile !== 'string') {
  process.exit(2);
}

console.log(data.split('\n').length - 1);
