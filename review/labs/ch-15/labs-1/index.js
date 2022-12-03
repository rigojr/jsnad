'use strict'

const { spawnSync } = require('child_process');

function exercise (myEnvVar) {
  return spawnSync(process.execPath, ['./child.js'], {
    'env': { 'MY_ENV_VAR': myEnvVar }
  });
}

module.exports = exercise
