# file system

Input/output
Watching

8%

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
- `fs.readdir()` takes the pathname as first argument and callback as its second, the callback received a list of filename strings.
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
