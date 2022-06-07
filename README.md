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
