# Functions

- `Functions` are first class citizens in Javascript.
  - Can be pass as arguments, can be return from another function, can be assigned to an object.
  - Javascript treats `functions` as values, that is why `functions` are first class citizen.
- `this` refers to the object in which the function was called, not the object in which the function was assigned to.
  - `call` method can be used to set the `this` context. This method is used to set `this` context dynamically.
- `lambda function` functions do not have `this` context, when `this` is referenced in side a lambda function, it will refers to the nearest parent `non-lambda function`.
  - `lambda function` do not have `prototype`.
