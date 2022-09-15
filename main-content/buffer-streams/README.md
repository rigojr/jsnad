# buffers and streams

Node.js Buffer API’s
Incremental Processing
Transforming Data
Connecting Streams

11%

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
