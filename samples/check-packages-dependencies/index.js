'use strinct'

if (require.main === module) {
  const pino = require('pino');
  const logger = pino();

  const format = import('./format.mjs')
    .then((format) => {
      logger.info(format.upper('started'));
      process.stdin.resume();
    })
    .catch((error) => {
      console.log(error);
      process.exit(1);
    });

} else {

  const reverseAndUpper = async (str) => {
    let format = undefined;

    format = format || await import ('./format.mjs');

    if (format === undefined) {
      console.log('error, format module could not be imported.');

      return null;
    }

    return format.upper(str)
      .split('')
      .reverse()
      .join('')
    }

  module.exports = reverseAndUpper;
}
