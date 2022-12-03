/**
 * TODO:
 */

const assert = require('assert')

class MyCustomerError extends Error {
  constructor (name, code) {
    super(name + ' My Customer Error ');
    this.code = code;
  }

  getCode() {
    return this.code;
  }
}

function parseUrl (str) {
  try {
    const parsed = new URL(str)

    return parsed
  } catch {
    throw new URIError('error');
    // throw new MyCustomerError('Parser', 'MY_CUSTOM_ERR_CODE');
  }
}

// assert.doesNotThrow(() => { parseUrl('invalid-url') })
// assert.equal(parseUrl('invalid-url'), null)
// assert.deepEqual(parseUrl('http://example.com'),new URL('http://example.com'))
// console.log('passed!')

parseUrl(-1);