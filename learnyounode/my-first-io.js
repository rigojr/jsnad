const fs = require('fs');

const file = process.argv[2];

if (file !== undefined) {
  const data = fs.readFileSync(file).toString();

  console.log(data.split('\n').length - 1);
} else {
  // TODO:
}
