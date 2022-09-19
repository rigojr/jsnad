/**
 * TODO:
 */

const fs = require('fs');
const { promisify } = require('util');

const readdirPromisify = promisify(fs.readdir);

const path = process.argv[2];
const extension = process.argv[3];

if (path !== undefined && extension !== undefined) {
  // fs.readdir(path, (err, files) => {
  //   if (err === null) {
  //     files.forEach((file) => {
  //       if (file.includes(`.${extension}`)) {
  //         console.log(file);
  //       }
  //     })
  //   } else {
  //     // TODO:
  //   }
  // });

  readdirPromisify(path)
    .then((files) => {
      files.forEach((file) => {
        if (file.includes(`.${extension}`)) {
          console.log(file);
        }
      });
    })
    .catch((err) => {
      // TODO:
    })
} else {
  // TODO:
}