/**
 * TODO:
 */

const { spawn } = require('child_process');
const duplexer = require('duplexer2');

function foo(cmd, args) {
  const sp1 = spawn(cmd, args);

  return duplexer({}, sp1.stdin, sp1.stdout);
}

module.exports = foo;