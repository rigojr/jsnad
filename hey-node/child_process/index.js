/**
 * TODO:
 */

const { spawn } = require('child_process');

// const child = spawn('find . -type f | wc -l', {
//   'stdio': 'inherit',
//   'shell': true
// });

// const child2 = spawn('echo $ANSWER', {
//   'stdio': 'inherit',
//   'shell': true,
//   'env': { 'ANSWER': 42 }
// })

// const { IS_CHILD } = process.env;

// if (IS_CHILD) {
//   console.log(`The child cwd ${process.cwd()}`);
// } else {
//   const { parse } = require('path');
//   const { root } = parse(process.cwd());

//   const child = spawn(process.execPath, [__filename], {
//     'cwd': root,
//     'env': { 'IS_CHILD': 1 }
//   });

//   child.stdout.pipe(process.stdout);
// }


// const child = spawn('pwd');
// const child = spawn('find', ['~', '-type', 'f']);
// const child = spawn('wc');

// const wc = spawn('wc', ['-l']);
// const find = spawn('find', ['.', '-type', 'f']);

// // process.stdin.pipe(child.stdin);

// find.stdout.pipe(wc.stdin);

// wc.stdout.on('data', (data) => {
//   console.log(`Number of lines: ${data}`);
// });

// child.on('exit', (code, signal) => {
//   console.log(`Child process exist with code ${code} and signal ${signal}`);
// });

// child.stdout.on('data', (data) => {
//   console.log(`child stdout: ${data}`);
// });

// child.stderr.on('data', (err) => {
//   console.log(`child stderr: ${err}`)
// });


// pipe stderr to main process

const child = spawn(
  process.execPath,
  ['-e', 'console.error("child error"); process.stdin.pipe(process.stdout)'],
  {
    'stdio': ['pipe', 'inherit', 'inherit']
  }
);

// child.stdout.pipe(process.stdout);


child.stdin.write('hola mundo');
child.stdin.end();

// child.stderr.pipe(process.stdout);