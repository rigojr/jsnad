'use strict'

const { spawn } = require('child_process')

const { pip } = require ('stream');

function exercise (command, args) {
  return spawn(command, args, {
    'stdio': ['ignore', 'inherit', 'pipe']
  })
}

module.exports = exercise