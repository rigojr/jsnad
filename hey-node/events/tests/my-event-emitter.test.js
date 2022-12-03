/**
 * TODO:
 */

const MyEventEmitter = require('../my-event-emitter');

describe('my-event-emitter', () => {
  test('should adds listener', () => {
    const myEmitter = new MyEventEmitter();
    const fn = jest.fn();
    const event = 'test-event';

    myEmitter.on(event, fn);

    expect(myEmitter.getListenersCount(event)).toStrictEqual(1);
    expect(myEmitter.getListeners(event)).toContain(fn);
  });

  test('should adds listener once', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'test-event';
    const fn = jest.fn();

    myEmitter.once(event, fn);

    const listenersBeforeEmit = [ ...myEmitter.getListeners(event) ];
    myEmitter.emit(event);
    const listenersAfterEmit = myEmitter.getListeners(event);

    expect(listenersBeforeEmit.length).toStrictEqual(1);
    expect(listenersAfterEmit).not.toContain(fn);
  });

  test('should removes listener', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'test-event';
    const fn = () => null;
    const otherFn = () => null;

    myEmitter.on(event, fn);
    myEmitter.on(event, otherFn);
    const listenersBeforeOff = [ ...myEmitter.getListeners(event) ];

    myEmitter.off(event, fn);
    const listenersAfterOff = myEmitter.getListeners(event);

    expect(listenersBeforeOff).toContain(fn);
    expect(listenersAfterOff).toContain(otherFn);
    expect(listenersAfterOff).not.toContain(fn);
  });

  test('should gets the listeners count', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'test-event';

    myEmitter.on(event, jest.fn());
    myEmitter.on(event, jest.fn());
    myEmitter.on(event, jest.fn());

    expect(myEmitter.getListenersCount(event)).toStrictEqual(3);
  });

  test('should gets the listeners', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'test-event';
    const expectedFnReturns = [ 'a', 1, false ];

    myEmitter.on(event, jest.fn().mockReturnValue(expectedFnReturns[0]));
    myEmitter.on(event, jest.fn().mockReturnValue(expectedFnReturns[1]));
    myEmitter.on(event, jest.fn().mockReturnValue(expectedFnReturns[2]));

    const listeners = myEmitter.getListeners(event);

    expect(listeners.length).toStrictEqual(3);
    expect(listeners[0]()).toStrictEqual(expectedFnReturns[0]);
    expect(listeners[1]()).toStrictEqual(expectedFnReturns[1]);
    expect(listeners[2]()).toStrictEqual(expectedFnReturns[2]);
  });

  test('should execute listener', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'test-event';
    const fn = jest.fn();

    myEmitter.on(event, fn);
    myEmitter.emit(event);

    expect(fn).toHaveBeenCalledTimes(1);
  });

  test('should execute listener several times', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'test-event';
    const fn = jest.fn();

    myEmitter.on(event, fn);
    myEmitter.emit(event);
    myEmitter.emit(event);
    myEmitter.emit(event);

    expect(fn).toHaveBeenCalledTimes(3);
  });

  test('should remove all listeners', () => {
    const myEmitter = new MyEventEmitter();
    const event = 'event-test';
    const fn = jest.fn();
    const otherFn = jest.fn();

    myEmitter.on(event, fn);
    myEmitter.on(event, otherFn);
    const listenersBeforeRemoveAll = myEmitter.getListenersCount(event);

    myEmitter.removeAllListeners(event);

    expect(listenersBeforeRemoveAll).toStrictEqual(2);
    expect(myEmitter.getListenersCount(event)).toStrictEqual(0);
  });
});