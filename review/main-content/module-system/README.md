# Module system

CommonJS Module System only

7%

## Preloading CommonJS Modules
- It is possible to preload a CommonJS module before anything else.
- It is useful when it is mandatory to consume modules that configures instruments that will be used in the process.
- Only works for CommonJS, there are `--loader` as an experimental flag that could do something similar to `--require`, but not the same.

- `node -r ./foo-before.js ./foo-after.js`
- `node --require ./foo-before.js ./foo-after.js`

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
