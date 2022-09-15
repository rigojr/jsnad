# node.js CLI

Node executable command line flags

4%

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