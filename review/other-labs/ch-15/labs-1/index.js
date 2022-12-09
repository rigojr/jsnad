'use strict'

const { spawnSync, spawn } = require('child_process');

function exercise (myEnvVar) {
  return spawn(process.execPath, [ './child.js' ], {
    'env': { 'MY_ENV_VAR': 'is set' }
  });

  return spawnSync(process.execPath, ['./child.js'], {
    'env': { 'MY_ENV_VAR': 'is set' }
  });
}

module.exports = exercise
