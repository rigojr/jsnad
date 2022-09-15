# Control flow

Managing asynchronous operations
Control flow abstractions

12%

## Asynchronous control flow
- Node.js is a server-side javascript platform.
- Javascript is an event-driven language.
- Always having an error as the first parameter is convention in Node, this practice is known as `ErrBack`.
- A Callback is a function that will be executed in some point in the future.
- A Promise is an object that represents an asynchronous operation.
- with `promisify` a callback function based can be transform to a promise based method.
- `async` and `await` are an approach that looks stylistically similar to synchronous code.
- `AbortController` can be use to cancel asynchronous operations.