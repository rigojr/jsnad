/**
 * TODO:
 */

function isString(value) {
  return typeof value === 'string';
}

class MyEventEmitter {
  listeners = {};

  /**
   * @param {string} event
   * @param {Function} fn
   */
  on(event, fn) {
    if (this.listeners[event] === undefined) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(fn);

    return this;
  };

  /**
   * @param {string} event
   * @param {Function} fn
   */
  off(event, fnToRemove) {
    const eventListeners = this.listeners[event];

    if (eventListeners === undefined) {
      return this;
    }

    const finder = (fn) => fn === fnToRemove;
    const index = eventListeners.findIndex(finder);

    if (index === -1) {
      return this;
    }

    this.listeners[event].splice(index, 1);

    return this;
  };

  /**
   * @param {string} event
   * @param {Function} fn
   */
  once(event, fn) {
    const onceWrapper = () => {
      fn();
      this.off(event, onceWrapper);
    }

    this.on(event, onceWrapper);

    return this;
  };

  /**
   * @param {string} event
   * @param {*[]} args
   */
  emit(event, ...args) {
    const listeners = this.listeners[event];

    if (listeners === undefined) {
      return this;
    }

    listeners.forEach(listener => {
      listener(...args);
    });

    return this;
  };

  /**
   * @param {string} event
   */
  getListenersCount(event) {
    if (!isString(event)) {
      throw new Error('Event is not properly defined');
    }

    if (this.listeners[event] === undefined) {
      return 0;
    }

    return this.listeners[event].length;
  };

  /**
   * @param {string} event
   */
  getListeners(event) {
    if (!isString(event)) {
      throw new Error('Event is not properly defined');
    }

    if (this.listeners[event] === undefined) {
      return 0;
    }

    return this.listeners[event];
  };

  /**
   *
   * @param {string} event
   */
  removeAllListeners(event) {
    this.listeners[event] = [];
  }
}

module.exports = MyEventEmitter;
