# JSNAD - notes

## About how to install and not Node.js
- Do not install Node with OS package managers.
  - It tends to lag the fast Node.js release cycle.
  - Binary and config files could not be standardized causing compatibility issues.
  - Installing global modules required `sudo`, this is not ideal since it grants root privileges to third party libraries.
- The recommend way to install Node is using a version package management, on our case `nvm`.

## Checking syntax could be helpful
- It is possible to parse javascript files or [translation unit](https://stackoverflow.com/questions/1106149/what-is-a-translation-unit-in-c), if could be say, to check its syntax.
- It is useful when running a full application requires setup/teardown cost. Or when it is generate.
- `node --check foo.js` `node -c foo.js`
  - no output is shown when success, if there are a syntax error, it will be printed in the console.

## Dynamic Evaluation, evaluating javascript code from the command line
- It is possible to evaluate code from the command line.
- It provides quickly checking for a code snippet.
- It can be use to create a cross-platform commands that use javascript and Node core API's.

- `node -p EXPRESSION` `node --print EXPRESSION`

`print` evaluates and print the result.

- `node -e EXPRESSION` `node --eval EXPRESSION`

`eval` evaluates without printing the result.

- All Node modules like `FileSystem` can be evaluated by its namespace `fs`.

`node -p "fs.readdirSync('.').filter((f) => /.js$/.test(f))"`

## Preloading CommonJS Modules
- It is possible to preload a CommonJS module before anything else.
- It is useful when it is mandatory to consume modules that configures instruments that will be used in the process.
- Only works for CommonJS, there are `--loader` as an experimental flag that could do something similar to `--require`, but not the same.

- `node -r ./foo-before.js ./foo-after.js`
- `node --require ./foo-before.js ./foo-after.js`

## Stack trace limit
- The Stack trace is generated when an error occurs.
- By default it only contains ten stack frames at the point where the trace occurred.
- Its limit can be modified with `--stack-trace-limit`.
  - This flag is part of `-v8-options`.
- It should be kept in the default limit (10) in production environment, since could overhead the process.
- Useful for debug process in development environment.

- `node --stack-trace-limit=N foo.js`

## Inspect mode
- It can be started using `--inspect` or `--inspect-brk`, the last one add a breakpoint at the very beginning of the program.
- The remote debugging protocol use WebSockets.
- There are an option to pause on exceptions.
- It is possible to add an statement `debugger` directly in the code in order to pause the execution.
  - It is useful when the line is buried deep in the dependency tree.
  - It is not a good practice leave `debugger` in the code, it should be used only on debugging process.

# Javascript, key concepts

## Data types
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

## Functions

- `Functions` are first class citizens in Javascript.
  - Can be pass as arguments, can be return from another function, can be assigned to an object.
  - Javascript treats `functions` as values, that is why `functions` are first class citizen.
- `this` refers to the object in which the function was called, not the object in which the function was assigned to.
  - `call` method can be used to set the `this` context. This method is used to set `this` context dynamically.
- `lambda function` functions do not have `this` context, when `this` is referenced in side a lambda function, it will refers to the nearest parent `non-lambda function`.
  - `lambda function` do not have `prototype`.

```javascript
// Function's call method example.
function foo() { console.log(this.id); }

const objA = { id: 999 };
const objB = { id: 1 };

foo.call(objA); // 999
foo.call(objB); // 1
```

```javascript
// Lambda function and this reference

function foo() {
  return (id) => console.log(this.id + id);
}

const obj = { id: 999 };

foo.call(obj)(1) // 1000
// or
const bar = foo.call(obj);
bar(1) // 1000
```

## Prototypal inheritance (Functional)
- Functional approach is to use `Object.create`.
- The `Object.create` first argument is the prototype, and the second is an optional `Properties Descriptor`
- The `Properties Descriptor` is an object that describes the characteristics of the properties on another object.
  - The `Object.getOwnPropertyDescriptor` can be used to get a `Property Descriptor` on any object.
  - The `value` describes a normal property, `set` o `get` can be used to create `getter/setter` of the value. The rest of the property are associated `meta-data` property.
    - `writable` determines whether the property can be reassigned.
    - `enumerable` determines whether the property will be enumerated.
    - `configurable` sets whether the property can be altered.
    - All of these `meta-data` default to `false`.

```javascript
// Functional approach to create prototype chain.

const wolf = {
  'howl': function() { console.log(this.name + ': awo') }
};

const dog = Object.create(wolf, {
  'woof': { 'value': function() { console.log(this.name + ': woof') } }
});

const rufus = Object.create(dog, {
  'name': { 'value': 'Rufus' }
});

rufus.woof(); // Rufus: woof
rufus.howl(); // Rufus awo

// w/ function paradigm

const wolf = {
  'howl': function() { console.log('owo') }
}

const dog = Object.create(wolf, {
  'woof': { 'value': function() { console.log('woof') }}
}

function createDog(name) {
  return Object.create(dog, {
    'name': { 'value': name }
  });
}

const rufus = createDog('rufus');

rufus.woof(); // Rufus: woof
rufus.howl(); // Rufus awo
```

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

## Closure scope
- key words: `invisible object` `naming collision`
- When naming collision occurs, the reference to the nearest closure scope overrides the outer one.
- Closure scopes apply in the same way to fat/flat arrow (lambda) functions.
- Closure scopes provide encapsulation.
- It provides a way to prototypal inheritance.
  - Actually will be better to explain this as a way to compose objects.
  - Remove the complexity related to prototypes, `new` and `this`.


```javascript
function outerFn() {
  const foo = true;
  function print(foo) {  console.log(foo) }
  print(1) //prints 1
  foo = false
  print(2) //prints 2
}

outerFn();
```

# Packages & dependencies
- A package could be for Node, for frontend(web browser) or both.
- Semver range version.
- `package-lock=false` in `.npmrc` will turn off the automatic generation for the `package-locl.json`.
- The `package.json` should be the source of truth.
- Only top level development denpendencies are installed. The development dependencies of sub-dependencies will not be installed.
- `--production` flag can be used with `npm install` in order to ignore development dependencies.
- About Semver range
  - Major is the left number and indicates a change of behavior breakes an API.
  - Minor is the middle number, indicates that a package has been extended, and it is fully backwards compatible.
  - Patch is the right-most number and indicates that a bug has been fixed.
  - Semver allows a flexible version strategy.
  - Using `^` caret character the same as using x in the Minor and Patch position.
- There are a `"bin"` field in the `package.json` that allows to define the associate namespace with a Node program script of the package.
  - There are a folder inside `node_modules`, `.bin` with all commands that could be execute as a Nde program.
- `npm test` and `npm start` are dedicates npm namespaces.

# Node's module systems
- `require` function looks for the packages into `node_modules`, once found returns the exportated value from the main file expressed in the `package.json`.
- There are `package module` and `local module`.
- It is possible to set a module to behave as a program and as a module.
- CommonJS is the regular javascript, it is the specification used by node.
- ESM or EcmaScript Modules is an specification, its main goal is to allow browsers to pre-parse imports. The objective is to be statically analyzable.
- CJS loads every module synchronously, ESM loads every module asynchronousy.
- Faux-ESM is ESM-like syntax that would be transpiled with babel to CJS.
  - In Node compiles to CommonJS.
  - In browser compiles to using a bundled synchronous loader.
  - It loads modules synchronously.
- ESM can load CJS modules, CJS cannot load ESM modules since broke the synchronous constraint.
  - with `dynamic import` it is possible to asynchronously load an ESM module into a CJS module.
  - Adding `"type": "module",` will load ESM by default.
- Since ESM was primarily designed by browser, modules are loaded via HTML allowing to have multiple script tags. To infer what module is the first to be executed, we can compare `process.argv[1]` with `import.meta.url`.
  - There is no concept of a file system or namespace in ESM in the original specification. The original specification deals only with URLs, `import.meta.url` will hold a `file://` pointing to the file path of the curren module.
  - `import maps` can be used to map namespaces and file paths to URLs.
- Static import will assign the default export to a defined name `import url from 'url'`, in dynamic imports returns a promise that resolves to an object, to do the same is mandatory to rename the `default` property as follow `const { default: pino } = await import('pino')`.
- ESM do not support loading modules without the full extension.
- `require.resolve` can be used to determinate the absolute path of any required module.
- `require` is a CJS API.

# Asynchronous control flow
- Node.js is a server-side javascript platform.
- Javascript ins an event-driven language.
- Always having an error as the first parameter is convention in Node, this practice is known as `ErrBack`.
- A Callback is a function that will be executed in some point in the future.
- A Promise is an object that represents an asynchronous operation.
- with `promisify` a callback function based can be transform to a promise based method.
- `async` and `await` are an approach that looks stylistically similar to synchronous code.
- `AbortController` can be use to cancel asynchronous operations.

# Node's Event system
- `EventEmitter` constructor is the functional backbone of many Node core API's.
- `HTTP` and `TCP` servers are an event emitter.
- `EventEmitter` is in the module `events`.
- Typical patter of usage with `EventEmitter` is through inherit. `class MyEmitter extends EventEmitter`.
- How to emit an event:
``` javascript
const { EventEmitter } = require('evemts');
const myEmitter = new EventEmitter();
myEmitter.emit('an-event', some, args);
```
- How to listen an event:
``` javascript
const { EventEmitter } = require('evemts');
const myEmitter = new EventEmitter();

myEmitter.on('close', () => console.log('something'));
```
- The order is very important, we should subscribe the listener before the emits take place.
- `prependListener` method can be used to inject listeners in the top, meaning that listener will trigger first, without matter the position where the statement is placed.
- An event can be emitter more thant once.
- `once` method can be used for those use case where one trigger is required, after that, the method remove the listener.
- `removeListener` can be used to remove a previously registered listener. It takes two arguments, the event name and the listener function.
- `removeAllListeners` can be used to remove all listeners without a reference to their function, it can take an event name in order to remove those listeners subscribe to it.
- Emitting an `error` event will cause to throw an exception if no event `error` has been subscribed.
- `AbortController` can be used for canceling promisified event listeners, like `events.once`.

# Handling errors
- Exist two types of errors, `operational errors` and `developer errors`.
- It is possible to throw any value, no only `Errors`.
- `Error` object handle / create the stack trace.
- subclassing (extends) and using a code property are ways to create custom errors.
  - with code property `Error(...).code = 'CUSTOM_CODE_ERROR'`.
- duck typing, looking for certain qualities to determine what an object is.
- `try catch` cannot catch errors that are thrown in a callback function that is called in the future.
- `exceptions` occurs sync and `rejections` async.


## Commands
- `node -v` `node --version`
- `npm - v` `npm --version`
- `node --help`
- `node --v8-options` shows javascript V8 runtime engine options.
- `node --check foo.js` `node -c foo.js`
- `node -p EXPRESSION` `node --print EXPRESSION`
- `node -e EXPRESSION` `node --eval EXPRESSION`
- `node -r ./foo-before.js ./foo-after.js`
- `node --require ./foo-before.js ./foo-after.js`
- `node --stack-trace-limit=N foo.js`
- `node --inspect foo.js`
- `node --inspect-brk foo.js`
- `npm help`
- `npm [COMMAND] -h`
- `npm init`
- `npm init -y`
- `npm ls`
- `npm ls --depth=[lvl]`
- `npm install --save-dev [PACKAGE]`