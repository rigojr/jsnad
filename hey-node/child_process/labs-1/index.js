'use strict'

const { spawn } = require('child_process');

function exercise (myEnvVar) {
  return spawn(process.execPath, ['child.js'], {
    'env': { 'MY_ENV_VAR': myEnvVar }
  });
}

module.exports = exercise
