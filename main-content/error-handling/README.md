# error handling

Common patterns
Handling errors in various scenarios

8%

# Handling errors
- Exist two types of errors, `operational errors` and `developer errors`.
- It is possible to throw any value, no only `Errors`.
- `Error` object handle / create the stack trace.
- subclassing (extends) and using a code property are ways to create custom errors.
  - with code property `Error(...).code = 'CUSTOM_CODE_ERROR'`.
- duck typing, looking for certain qualities to determine what an object is.
- `try catch` cannot catch errors that are thrown in a callback function that is called in the future.
- `exceptions` occurs sync and `rejections` async.
