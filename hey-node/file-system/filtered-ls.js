/**
 * TODO:
 */

const fs = require('fs');

const pathToDirectory = process.argv[2];
const extension = process.argv[3];

if ( pathToDirectory === undefined && extension === undefined) {
  process.exit(1);
}

fs.readdir(pathToDirectory, { 'encoding': 'utf-8' }, (err, files) => {
  if (err !== null) {
    process.exit(2);
  }

  files.forEach((file) => {
    if (file.includes(`.${extension}`)) {
      console.log(file);
      // Other way to do the same => process.stdout.write(`${file}\n`);
    }
  });
});