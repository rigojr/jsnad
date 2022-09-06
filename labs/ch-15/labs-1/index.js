'use strict'

const { spawnSync, fork } = require('child_process');

function exercise (myEnvVar) {
  // const child = spawnSync(process.execPath, ['child.js'], {
  //   'env': {
  //     'MY_ENV_VAR': myEnvVar
  //   }
  // });

  const child = fork(__filename, ['child.js'] ,{
    'env': {
      'MY_ENV_VAR': myEnvVar
    }
  });

  return child;
  // TODO return a child process with
  // a single environment variable set 
  // named MY_ENV_VAR. The MY_ENV_VAR 
  // environment variable's value should 
  // be the value of the myEnvVar parameter 
  // passed to this exercise function
  // return require('child_process').spawnSync(process.argv[0], ['child.js'])
}

module.exports = exercise
