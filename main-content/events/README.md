# events

The event system
Building event emitters
Consuming event emitters

11%

# Node's Event system
- `EventEmitter` constructor is the functional backbone of many Node core API's.
- `HTTP` and `TCP` servers are an event emitter.
- `EventEmitter` is in the module `events`.
- Typical patter of usage with `EventEmitter` is through inherit. `class MyEmitter extends EventEmitter`.
- How to emit an event:
``` javascript
const { EventEmitter } = require('evemts');
const myEmitter = new EventEmitter();
myEmitter.emit('an-event', some, args);
```
- How to listen an event:
``` javascript
const { EventEmitter } = require('evemts');
const myEmitter = new EventEmitter();

myEmitter.on('close', () => console.log('something'));
```
- The order is very important, we should subscribe the listener before the emits take place.
- `prependListener` method can be used to inject listeners in the top, meaning that listener will trigger first, without matter the position where the statement is placed.
- An event can be emitter more thant once.
- `once` method can be used for those use case where one trigger is required, after that, the method remove the listener.
- `removeListener` can be used to remove a previously registered listener. It takes two arguments, the event name and the listener function.
- `removeAllListeners` can be used to remove all listeners without a reference to their function, it can take an event name in order to remove those listeners subscribe to it.
- Emitting an `error` event will cause to throw an exception if no event `error` has been subscribed.
- `AbortController` can be used for canceling promisified event listeners, like `events.once`.