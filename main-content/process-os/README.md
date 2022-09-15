# Process/Operating System

Controlling the process
Getting system data
6%

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
