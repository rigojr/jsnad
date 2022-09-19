/**
 * TODO:
 */

const args = process.argv.slice(2);

if (args.length > 0) {
  const total = args.reduce((acc, curr) => {
    return acc + Number(curr);
  }, 0)

  console.log(total);
} else {
  // TODO:
}
