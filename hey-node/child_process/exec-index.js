/**
 * TODO:
 */

const { exec } = require('child_process');

exec('find . -type f | wc -l', (err, stdout, stderr) => {
  if (err !== null) {
    console.error(`exec error: ${err}`);
    return;
  }

  console.log(`lines: ${stdout}`);
});