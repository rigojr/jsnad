## Inheritance

# Prototypal inheritance (Functional)
- Functional approach is to use `Object.create`.
- The `Object.create` first argument is the prototype, and the second is an optional `Properties Descriptor`
- The `Properties Descriptor` is an object that describes the characteristics of the properties on another object.
  - The `Object.getOwnPropertyDescriptor` can be used to get a `Property Descriptor` on any object.
  - The `value` describes a normal property, `set` o `get` can be used to create `getter/setter` of the value. The rest of the property are associated `meta-data` property.
    - `writable` determines whether the property can be reassigned.
    - `enumerable` determines whether the property will be enumerated.
    - `configurable` sets whether the property can be altered.
    - All of these `meta-data` default to `false`.

## Prototypal inheritance (Constructor functions)
- key words: `new keyword` `legacy code bases` `prototype` `EcmaScript 5+` `util.inherits` `ES6`.
- Often used in legacy code bases.
- The empty constructor function is created in order to instance an object that actually have `prototype` to complete the inheritance.
  - This could be replace with `Dog.prototype = Object.create(Wolf.prototype)`
- The are an utility function `util.inherits`
  - `util.inheritance(Dog, Wolf)`
  - Under the hood, it used `Object.setPrototypeOf(Dog.prototype, Wolf.prototype)`.
- Check sample on `constructor-functions.js`

## Prototypal inheritance (Class syntax constructors)
- key words: `class` `OOP` `syntactic sugar` `ES6`
- It use a `class` keyword as a syntactic sugar.
  - It should not be confused with the `class` keyword used in OOP languages.
- The idea is to reduce boilerplate when creating a prototype chain.
