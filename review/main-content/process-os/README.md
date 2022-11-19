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
