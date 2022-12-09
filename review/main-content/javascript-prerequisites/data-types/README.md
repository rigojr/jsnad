# Data types
- loosely typed.
- dynamic language
- seven primitive types, everything else is an object
  - `null` `undefined` `number` `string` `boolean` `bigInt` `Symbol`
- A function without `return` statement will return `undefined`.
- `number` is double-precision point format.
  - It allows integers and decimals.
  - It has a range of -2^53 - 1 hasta 2^53 - 1
- `bigInt` has not upper or lower limit.
- `Symbols` can be used as unique identifier keys in objects.
- The inheritance works in Javascript throughout `prototypes`
- `new` keyword cannot be use to create explicit `Symbol` wrapper object.
- `Symbols` are often used to add unique property keys to an object that won't collide with keys any other code might add to the object, and which are hidden from any mechanisms other code will typically use to access the object. That enables a form of weak encapsulation, or a weak form of information hiding.