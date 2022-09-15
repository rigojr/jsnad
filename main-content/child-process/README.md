# child process

Spawning or Executing child processes
Child process configuration

8%

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
- The `exec` method takes a shell command as a string and executes it the same way as `execSync`. Unlike `execSync` the asynchronous exec function splits the `STDOUT` and `STDERR` output by passing them as separate arguments to the callback function.

## spawn & spawnSync Methods
- `spawn` takes the executable path as the first argument and then an array of flags that should be passed to the command as second argument.
- The `spawnSync` function returns an object containing information about the process that was spawned.
- Unlike `execSync`, the `spawnSync` method does not need to be wrapped in a `try/catch`. If a `spawnSync` process exits with a non-zero exit code, it does not throw.
- While `exec` accepts a callback, `spawn` does not. Both `exec` and `spawn` return a `ChildProcess` instance however, which has `stdin`, `stdout` and `stderr` streams and inherits from `EventEmitter` allowing for exit code to be obtained after a close event is emitted.
- The `exec` command doesn't have to take a callback, and it also returns a `ChildProcess` instance.
- The `spawn` method and the `exec` method both returning a `ChildProcess` instance can be misleading. There is one highly important differentiator between `spawn` and the other three methods we've been exploring (namely `exec`, `execSync` and `spawnSync`): the `spawn` method is the only method of the four that doesn't buffer child process output. Even though the `exec` method has `stdout` and `stderr` streams, they will stop streaming once the subprocess output has reached 1 mebibyte (or 1024 * 1024 bytes). This can be configured with a `maxBuffer` option, but no matter what, the other three methods have an upper limit on the amount of output a child process can generate before it is truncated. Since the `spawn` method does not buffer at all, it will continue to stream output for the entire lifetime of the subprocess, no matter how much output it generates. Therefore, for long running child processes it's recommended to use the `spawn` method.

## Process Configuration
- An options object can be passed as a third argument in the case of `spawn` and `spawnSync` or the second argument in the case of `exec` and `execSync`.
- By default, the child process inherits the environment variables of the parent process.
  - If we pass an options object with an `env` property the parent environment variables will be overwritten.

## Child STDIO
- So far we've covered that the asynchronous child creation methods (`exec` and `spawn`) return a `ChildProcess` instance which has `stdin`, `stdout` and `stderr` streams representing the I/O of the subprocess. This is the default behavior, but it can be altered.
- The `stdio` option applies the same way to the `child_process.exec` function.
