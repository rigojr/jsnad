/**
 * TODO:
 */

const fs = require('fs');

function foo(directory, extension, cb) {
  fs.readdir(directory, (err, files) => {
    if (err !== null) {
      return cb(err);
    }

    const filteredList = files
      .filter((file) => file.includes(`.${extension}`));

    cb(null, filteredList);
  });
};

module.exports = foo;