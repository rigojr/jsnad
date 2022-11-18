# Writing Unit Tests

Using assertions
Testing synchronous code
Testing asynchronous code

6%

## Assertions
- An assertion checks a value for a given condition and throws if that condition is not met.
- Assertions are the fundamental building block of unit and integration testing.
- The core `assert` module exports a function that will throw an `AssertionError` when the value passed to it is falsy.
- The core `assert` module has the following assertion methods:
  - `assert.ok(val)` – the same as assert(val)
  - `assert.equal(val1, val2)` – coercive equal, val1 == val2
  - `assert.notEqual(val1, val2)` – coercive unequal, val1 != val2
  - `assert.strictEqual(val1, val2)` – strict equal, val1 === val2
  - `assert.notStrictEqual(val1, val2)` – strict unequal, val1 !== val2
  - `assert.deepEqual(obj1, obj2)` – coercive equal for all values in an object
  - `assert.notDeepEqual(obj1, obj2)` – coercive unequal for all values in an object
  - `assert.deepStrictEqual(obj1, obj2)` – strict equal for all values in an object
  - `assert.notDeepStrictEqual(obj1, obj2)` – strict unequal for all values in an object
  - `assert.throws(function)` – assert that a function throws
  - `assert.doesNotThrow(function)` – assert that a function doesn't throw
  - `assert.rejects(promise|async function)` – assert promise or returned promise rejects
  - `assert.doesNotReject(promise|async function)` – assert promise or returned promise resolves
  - `assert.ifError(err)` – check that an error object is falsy
  - `assert.match(string, regex)` – test a string against a regular expression
  - `assert.doesNotMatch(string, regex)` – test that a string fails a regular expression
  - `assert.fail()` – force an AssertionError to be thrown
- The Node core `assert` module does not output anything for success cases there is no assert.pass method as it would be behaviorally the same as doing nothing.
- We can group the assertions into the following categories:
  - Truthiness (`assert` and `assert.ok`)
  - Equality (strict and loose) and Pattern Matching (match)
  - Deep equality (strict and loose)
  - Errors (ifError plus throws, rejects and their antitheses)
  - Unreachability (fail)
- In fact, the more esoteric the assertion the less useful it is long term.

## Test Harnesses
- if one of the asserted values fails to meet a condition an `AssertionError` is thrown, which causes the process to crash.
- we could group assertions together so that if one in a group fails, the failure is output to the terminal but the remaining groups of assertions still run. This is what test harnesses do.
- Code coverage represents which logic paths were executed by tests.
- it's also important to balance this with the understanding that code coverage is not the same as case coverage.
