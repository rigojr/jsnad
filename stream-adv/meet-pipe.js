/**
 * TODO:
 */

const fs = require('fs');

const path = process.argv[2];

if (path === undefined) {
  process.exit(1);
}

fs.createReadStream(path).pipe(process.stdout);
