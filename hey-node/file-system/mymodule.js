/**
 * TODO:
 */

const fs = require('fs');

/**
 * @param {string} pathToDirectory
 * @param {string} extension
 * @param {Function} callBack
 */
function myModule(pathToDirectory, extension, callBack) {
  if ( pathToDirectory === undefined && extension === undefined) {
    callBack('arguments undefined!');
  }

  fs.readdir(pathToDirectory, { 'encoding': 'utf-8' }, (err, files) => {
    if (err !== null) {
      return callBack(err);
    }

    callBack(null, files.filter((files) => files.includes(`.${extension}`)));
  });
}

module.exports = myModule;