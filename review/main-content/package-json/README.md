# Package.json
Package configuration
Dependency management

6%

## Packages & dependencies
- A package could be for Node, for frontend(web browser) or both.
- Semver range version.
- `package-lock=false` in `.npmrc` will turn off the automatic generation for the `package-lock.json`.
- The `package.json` should be the source of truth.
- Only top level development denpendencies are installed. The development dependencies of sub-dependencies will not be installed.
- `--production` flag can be used with `npm install` in order to ignore development dependencies.
- About Semver range
  - Major is the left number and indicates a change of behavior breaks an API.
  - Minor is the middle number, indicates that a package has been extended, and it is fully backwards compatible.
  - Patch is the right-most number and indicates that a bug has been fixed.
  - Semver allows a flexible version strategy.
  - Using `^` caret character the same as using x in the Minor and Patch position.
- There are a `"bin"` field in the `package.json` that allows to define the associate namespace with a Node program script of the package.
  - There are a folder inside `node_modules`, `.bin` with all commands that could be execute as a Node program.
- `npm test` and `npm start` are dedicates npm namespaces.
- with `--save-exact` install the specific version, it's mandatory add `--save` or `--save-dev` before. -> `npm install jest@27 --save --save-exact`