/**
 * Streamlined version of Node's EventEmitter that
 * notifies listeners asynchronously.
 * {@link https://nodejs.org/api/events.html#events_class_eventemitter}
 * @memberOf utils
 */
class AsyncEventEmitter {
  constructor() {
    this.events = new Map();
  }

  /**
   * Alias for {@link utils.AsyncEventEmitter#on}.
   */
  addListener(event, listener) {
    return this.on(event, listener);
  }

  /**
   * Asynchronously call the listeners registered for the
   * specified event, passing supplied arguments to each.
   * @param {string} event - The name of the event.
   * @param {...*} args - The arguments to pass to the listeners.
   * @returns {Boolean} - Boolean indicating whether or not event had any listeners.
   */
  emit(event, ...args) {
    const handlers = this.events.get(event);

    if (!handlers || (Array.isArray(handlers) && handlers.length === 0)) {
      return false;
    }

    if (typeof handlers === 'function') {
      setTimeout(() => {
        handlers.apply(this, args);
      }, 0);
    } else if (Array.isArray(handlers)) {
      setTimeout(() => {
        handlers.forEach(handler => handler.apply(this, args));
      }, 0);
    }

    return true;
  }

  /**
   * Returns the number of listeners for the specified event.
   * @param {string} event - The name of the event.
   * @returns {number} Number of listeners for the event.
   */
  listenerCount(event) {
    const handlers = this.events.get(event);

    if (handlers) {
      if (typeof handlers === 'function') {
        return 1;
      } else if (Array.isArray(handlers)) {
        return handlers.length;
      }
    }

    return 0;
  }

  /**
   * Adds listener function to end of listeners array for the
   * specified event. Returns a reference to the event emitter
   * to support chaining.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The listener to be notified.
   * @returns {utils.AsyncEventEmitter} - Event emitter reference.
   */
  on(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    const handlers = this.events.get(event);

    if (handlers) {
      if (typeof handlers === 'function') {
        // convert to array and put back into map
        const ara = Array.of(handlers, listener);
        this.events.set(event, ara);
      } else if (Array.isArray(handlers)) {
        handlers.push(listener);
      }
    } else {
      this.events.set(event, listener);
    }

    return this;
  }

  /**
   * Adds a one-time listener for the event. Returns a reference to
   * the event emitter to support chaining.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The one-time listener to be notified.
   * @returns {utils.AsyncEventEmitter} - Event emitter reference.
   */
  once(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    let fired = false;
    // needs to be a fn and not an arrow fn
    // so we properly capture arguments
    const g = function() {
      this.removeListener(event, g);

      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    };

    this.on(event, g);

    return this;
  }

  /**
   * Removes all listeners or those of the specified event. Returns a reference
   * to the event emitter to support chaining.
   * @param {string=} event - The name of the event. If unspecified, all listeners will be removed.
   * @returns {utils.AsyncEventEmitter} - Event emitter reference.
   */
  removeAllListeners(event) {
    if (event === undefined) {
      this.events.clear();
    } else {
      this.events.delete(event);
    }

    return this;
  }

  /**
   * Removes the specified listener from the listener array for the specified event. Returns
   * a reference to the event emitter to support chaining.
   * @param {string} event - The name of the event.
   * @param {Function} listener - The listener to remove.
   * @returns {utils.AsyncEventEmitter} - Event emitter reference.
   */
  removeListener(event, listener) {
    if (typeof listener !== 'function') {
      throw new TypeError('listener must be a function');
    }

    const handlers = this.events.get(event);

    if (handlers) {
      if (typeof handlers === 'function' && handlers === listener) {
        this.events.delete(event);
      } else if (Array.isArray(handlers)) {
        const idx = handlers.indexOf(listener);

        if (idx > -1) {
          handlers.splice(idx, 1);
        }
      }
    }

    return this;
  }
}

export { AsyncEventEmitter };
