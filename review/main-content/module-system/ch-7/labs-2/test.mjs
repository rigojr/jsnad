'use strict'
// const labs1Path = require.resolve('../labs-1')
// const assert = require('assert')

// import { createRequire } from 'module';
import labs1Path from '../labs-1/index.js';
import assert from 'assert';

// const require = createRequire(import.meta.url);

let logged = false
const { log } = console
console.log = (out) => {
  logged = true
  assert(+out === 42, 'correct value logged')
}

// await import(require.resolve('.'))
import.meta.
assert(labs1Path in require.cache, 'module from labs-1 was correctly loaded')
assert(logged, 'value was sent to console.log')
log('passed!')