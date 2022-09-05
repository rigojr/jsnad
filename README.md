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

# Using buffers
- essential capability.
- `Buffer` object is an instance of `Buffer` and `Unit8Array`.
- `Buffer slice` method return an instance that references the binary data in the original buffer that `slice` was called.
- Using `Unit8Array` directly for `slice` creates a copy.
- `new` for Buffer is deprecated. The correct way to instantiate `Buffers` is with `alloc` method, providing the amount of bytes to be used. `Buffer.alloc(10)`
- With `allocUnsafe` can be allocate a buffer as unsafe.
- `Buffer` can be created from `string` using `from` method.
- `StringDecoder` should be used when bytes are being truncated causing encoding errors. Multiple buffers might split characters across a byte boundary.
  - `write` will output a character only when all of the bytes representing the character have been written to the decoder.
- `Buffer` has `toJSON` method.
  - `object` with a `type` property set in `Buffer`.
  - To be passed to an `object` representation in javascript is mandatory to use `JSON.parse` and the `data` property need to be passed to `Buffer.from` before complete the `deserializing`.
- When `array` numbers is being passed to a `Buffer.from` they are converted to the corresponding byte values.

# Working with Streams
- Streams facilitate high volume data processing without requiring exorbitant compute resources. As an abstraction, streams also provide an ergonomic benefit, supporting the decoupling of application logic around real time data using a functional programming paradigm.
- `Node` have 6 constructors for creating streams: `Stream`, `Readable`, `Writable`, `Duplex`, `Transform` and `PassThrough`.
- Node core APIs like `process`, `net`, `http`, `fs` and `child_process` expose streams created with these constructors.
- The main events emitted by various `Stream` are: `data`, `end`, `finish`, `close` and `error`.
  - `finish` is emitted by `Writable` when there si nothing left to write.
  - `close` and `error` events are common to all streams.
- There are tow `Stream` modes: `Binary` and `Object` streams.
  - Its mode is determinate by its `objectMode` option when the stream is instantiated. The default mode is `false` meaning is binary.
  - Binary mode streams only read or write `Buffer` instances.
  - Object mode streams can read or write JS Objects and all primitives except `null`.

## Readable Streams
- It could be used to read a file, data from incoming HTTP request or user input from a command prompt.
- It inherits from the `Stream` which inherits from the `EventEmitter`. For that reason, readable stream are event emitters.
- As soon data became available, readable stream emits `data` event.
- `Readable.from` utility sets `objectMode` to true by default.

## Writable Streams
- It could be used to write a file, write data to an HTTP response or write to the terminal.
- Writable streams are event emitters.
- `decodeStrings` option can be set to `false` to avoid convert `string` to `buffer` before it becomes `chunk` to be written.
  - This will only allow `string` or `buffer` to be written to the stream, any other javascript value will result in an error.
- If `string` and any other javascript value want to be supported, `objectMode` set to `true` can do it.

## Readable-Writable Streams
- There are three constructors that have both `readable` and `writable` interfaces.
  - `Duplex`, `Transform` and `PassThrough`.
  - The most common is `Transform`
- The `Duplex` stream constructor's prototype inherits from the `Readable` but it also mixes functionality from the `Writable`.
  - `read` and `write` methods are implemented but does not have to be a casual relationship.
  - Is something is written it does not necessary mean that it will result in any change to what can be read from the stream. Sometimes it is.
  - `TCP` network is a good example of `Duplex`.
- `Transform` inherits from the `Duplex`.
  - The enforce a casual relationship between read and write interfaces.
  - Compression is a good example.
  - The relationship is create instead of supplying read and write options, a `transform` option is passed to the `Transform` constructor.
- The `PassThrough` constructor inherits from the `Transform` constructor.
  - It's essentially a transform stream where no transform is applied.

## Determining End-of-Stream
- There are at least four ways for a stream to potentially become inoperative:
  - close event
  - error event
  - finish event
  - end event
- We need to know when a stream has closed so that resources can be deallocated, otherwise memory leaks become likely.
- Instead of listening to all four events, the `stream.finished` utility function provides a simplified way to do this.

## Piping Streams
- The concept of pipe is the same from `Bash`.
- `process.stdout` is a writable stream.
- The pipe method exists on Readable streams, and is passed a Writable stream.
- Socket is a `Duplex` stream instance and that Duplex inherits from `Readable`.
- Since pipe returns the stream passed to it, it is possible to chain pipe calls together.
  - This is a commonly observed practice, but it's also bad practice to create pipelines this way. If a stream in the middle fails or closes for any reason, the other streams in the pipeline will not automatically close.
  - This can create severe memory leaks and other bugs.
  - The correct way to pipe multiple streams is to use the stream.pipeline utility function.
- The pipeline command will call pipe on every stream passed to it

# INTERACTING WITH THE FILE SYSTEM

## File Paths
- The `path` module is important for path manipulation and normalization across platforms and the `fs` module provides APIs to deal with the business of reading, writing, file system meta-data and file system watching.
- Before locating a relative file path, we often need to know where the particular file being executed is located. For this there are two variables that are always present in every module: `__filename` and `__dirname`.
  - The `__filename` variable holds the absolute path to the currently executing file, and the `__dirname` variable holds the absolute path to the directory that the currently executing file is in.
- The most commonly used method of the path module is the `join` method.
  - Apart from `path.isAbsolute` which as the name suggests will return true if a given path is absolute, the available path methods **can be broadly divided into path builders and path deconstructors**.
  - `path.relative`: Given two absolute paths, calculates the relative path between them.
  - The `path.resolve` function returns a string of the path that would result from navigating to each of the directories in order using the command line cd command.
  - Resolves `..` and `.` dot in paths and strips extra slashes, for instance `path.normalize('/foo/../bar//baz')` would return `'/bar/baz'`.
  - `path.format`: Builds a string from an object. The object shape that `path.format` accepts, corresponds to the object returned from `path.parse`.
  - The path deconstructors are `path.parse`, `path.extname`, `path.dirname` and `path.basename`.

## Reading and Writing
- The fs module has lower level and higher level APIs.
- The lower level API's closely mirror POSIX system calls.
- The higher level methods for reading and writing are provided in four abstraction types:
  - Synchronous
  - Callback based
  - Promise based
  - Stream based
- All the names of synchronous methods in the fs module end with Sync.
  - For instance, `fs.readFileSync`. Synchronous methods will block anything else from happening in the process until they have resolved.
  - These are convenient for loading data when a program starts, but should mostly be avoided after that.
  - The encoding can be set in an options object to cause the `fs.readFileSync`.
  - The `fs.writeFileSync` function takes a path and a string or buffer and blocks the process until the file has been completely written.
    - An options object can be added, with a flag option set to 'a' to open a file in append mode.
  - In the `readFileSync` case execution is paused until the file has been read, whereas in this example execution is free to continue while the read operation is performed. Once the read operation is completed, then the callback function that we passed as the third argument to readFile is called with the result. This allows for the process to perform other tasks (accepting an HTTP request for instance).
- The `fs.promises` API provides most of the same asynchronous methods that are available on `fs`, but the methods return promises instead of accepting callbacks.
 - `const { readFile, writeFile } = require('fs').promises`

## File Streams
- `fs.createReadStream` and `fs.createWriteStream`.
- Excellent if dealing with a large file because the memory usage will stay constant as the file is read in small chunks and written in small chunks.

## Reading Directories
- Directories are a special type of file, which hold a catalog of files. Similar to files the `fs` module provides multiple ways to read a directory:
  - Synchronous
  - Callback-based
  - Promise-based
  - An async iterable that inherits from `fs.Dir`
- For extremely large directories they can also be read as a stream using `fs.opendir`, `fs.opendirSync` or `fs.promises.opendir` method which provides a stream-like interface that we can pass to `Readable.from` to turn it into a stream.

## File Metadata
- Metadata about files can be obtained with the following methods:
  - `fs.stat`, `fs.statSync`, `fs.promises.stat`
  - `fs.lstat`, `fs.lstatSync`, `fs.promises.lstat`
  - `stat` follows symbolic links, and `lstat` will get meta data for symbolic links instead of following them.
  - These methods return an `fs.Stat` instance which has a variety of properties and methods for looking up metadata about a file
- There are four stats available for files:
  - Access time
  - Change time
  - Modified time
  - Birth time
- The difference between change time and modified time, is modified time only applies to writes 


## Watching TODO: add more information here about stats.
- The `fs.watch` method is provided by Node core to tap into file system events. It is however, fairly low level and not the most friendly of APIs.

# Process & Operating System
- We can control and gather information about a process using the global `process` object.
- We can find out information about the Operating System of a running process using the core `os` module.

## STDIO
- The `process` object exposes three streams:
  - `process.stdin` A Readable stream for process input.
  - `process.stdout` A Writable stream for process output.
  - `process.stderr` A Writable stream for process error output.
- In order to interface with `process.stdin` some input is needed.
-  connect `process.stdin` to `process.stdout`
  - `process.stdin.pipe(process.stdout)`
  - `process.stdin.pipe(uppercase).pipe(process.stdout)`
- The `process.stdin`, `process.stdout` and `process.stderr` streams are unique they never finish, error or close.
- The `process.stdin.isTTY` property can be checked to determine whether our process is being piped to on the command line or whether input is directly connected to the terminal.
- `console.log` function prints to `STDOUT` and `STDERR` is a separate output device which also prints to the terminal.
- We can also use `console.error` to write to `STDERR`.

## Exiting
- When a process has nothing left to do, it exits by itself.
- Some API's have active handles. An active handle is a reference that keeps the process open.
- To force a process to exit at any point we can call `process.exit`.
- When exiting a process an exit status code can already be set. Status codes are a large subject, and can mean different things on different platforms. The only exit code that has a uniform meaning across platforms is 0. An exit code of 0 means the process executed successfully. On Linux and macOS (or more specifically, Bash, Zsh, Sh, and other *nix shells) we can verify this with the command `echo $?` which prints a special variable called `$?`.
- Any non-zero code indicates failure.
- The exit code can also be set independently be assigning `process.exitCode`.
- The `'exit'` event can also used to detect when a process is closing and perform any final actions, however **no asynchronous** work can be done in the event handler function because the process is exiting

## Process Info
- The `process` object also contains information about the process.
  - The current working directory of the process
  - The platform on which the process is running
  - The Process ID
  - The environment variables that apply to the process.
- To get the environment variables we can use `process.env`
- Environment variables are key value pairs, when `process.env` is accessed, the host environment is dynamically queried and **an object is built out of the key value pairs**. This means `process.env` works more like a function.

## Process Stats
- The `process` object has methods which allow us to query resource usage. We're going to look at the `process.uptime()`, `process.cpuUsage` and `process.memoryUsage` functions.
  - Process uptime is the amount of seconds (with 9 decimal places) that the process has been executing for.
  - The `process.cpuUsage` function returns an object with two properties: `user` and `system`. The `user` property represents time that the Node process spent using the CPU. The `system` property represents time that the kernel spent using the CPU due to activity triggered by the process.

# System Info
- The `os` module can be used to get information about the Operating System.
- There are two ways to identify the `Operating System` with the `os` module:
  - The `os.platform` function which returns the same as `process.platform` property.
  - The `os.type` function which on non-Windows systems uses the `uname` command and on Windows it uses the `ver` command, and to get the Operating System identifier.
- The `os.uptime` function returns the amount of time the system has been running in seconds.
- The `os.freemem` and `os.totalmem` functions return available system memory and total system memory in bytes.

# Creating Child Processes
- The Node.js core `child_process` module allows the creation of new processes with the current process as the parent. A child process can be any executable written in any language, it doesn't have to be a Node.js process.
- The `child_process` module has the following methods, all of which spawn a process some way or another:
  - exec & execSync
  - spawn & spawnSync
  - execFile & execFileSync
  - fork

## execFile & execFileSync Methods
- The `execFile` and `execFileSync` methods are variations of the `exec` and `execSync` methods.
- Rather than defaulting to executing a provided command in a shell, it attempts to execute the provided path to a binary executable directly.

## fork Method
- The `fork` method is a specialization of the `spawn` method. By default, it will spawn a new Node process of the currently executing JavaScript file (although a different JavaScript file to execute can be supplied). It also sets up Interprocess Communication (IPC) with the subprocess by default.

## exec & execSync Methods
- The `child_process.execSync` method is the simplest way to execute a command.
- The `execSync` method returns a buffer containing the output (from STDOUT) of the command.
- If we were to use `console.error` instead of `console.log`, the child process would write to `STDERR`. By default the `execSync` method redirects its `STDERR` to the parent `STDERR`, so a message would print but the output buffer would be empty.
- if we do want to execute the node binary as a child process, it's best to refer to the full path of the node binary of the currently executing Node process. This can be found with `process.execPath`.


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