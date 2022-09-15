# Diagnostics

Debugging Node.js
Basic performance analysis

6%

## Inspect mode
- It can be started using `--inspect` or `--inspect-brk`, the last one add a breakpoint at the very beginning of the program.
- The remote debugging protocol use WebSockets.
- There are an option to pause on exceptions.
- It is possible to add an statement `debugger` directly in the code in order to pause the execution.
  - It is useful when the line is buried deep in the dependency tree.
  - It is not a good practice leave `debugger` in the code, it should be used only on debugging process.