/** Class representing the traps used across all proxify-able types.
 * @memberOf handlers
 */
class BaseTrapHandler {
  constructor(emitter) {
    this.emitter = emitter;
  }

  /**
   * Trap for Object.defineProperty().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property being defined or modified.
   * @param {Object} descriptor - The descriptor for the property being defined or modified.
   * @returns {Boolean} Boolean indicating whether or not property definition was successful.
   */
  defineProperty(target, property, descriptor) {
    this.onTrap('defineProperty', target, property, descriptor);
    return Reflect.defineProperty(target, property, descriptor);
  }

  /**
   * Trap for the delete operator.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to delete.
   * @returns {Boolean} Boolean indicating whether or not property deletion was successful.
   */
  deleteProperty(target, property) {
    this.onTrap('deleteProperty', target, property);
    return Reflect.deleteProperty(target, property);
  }

  /**
   * Trap for getting a property value.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to get.
   * @param {Object} receiver - Either the proxy or an object that inherits from the proxy.
   * @returns {*} Value of the property.
   */
  get(target, property, receiver) {
    this.onTrap('get', target, property, receiver);
    return Reflect.get(target, property, receiver);
  }

  /**
   * Trap for Object.getOwnPropertyDescriptor().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property whose description should be retrieved.
   * @returns {Object|undefined} The descriptor object or undefined if property is undefined.
   */
  getOwnPropertyDescriptor(target, property) {
    this.onTrap('getOwnPropertyDescriptor', target, property);
    return Reflect.getOwnPropertyDescriptor(target, property);
  }

  /**
   * Trap for [[GetPrototypeOf]] internal method.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf}
   * @param {Object} target - The target object.
   * @returns {Object|null} The prototype object or null if object has no prototype.
   */
  getPrototypeOf(target) {
    this.onTrap('getPrototypeOf', target);
    return Reflect.getPrototypeOf(target);
  }

  /**
   * Trap for the in operator.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has}
   * @param {Object} target - The target object.
   * @param {String} property - The name of the property to check for existence.
   * @returns {Boolean} Boolean indicating whether or not property exists.
   */
  has(target, property) {
    this.onTrap('has', target, property);
    return Reflect.has(target, property);
  }

  /**
   * Trap for Object.isExtensible().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible}
   * @param {Object} target - The target object.
   * @returns {Boolean} Boolean indicating whether or not target is extensible.
   */
  isExtensible(target) {
    this.onTrap('isExtensible', target);
    return Reflect.isExtensible(target);
  }

  /**
   * Trap for Object.getOwnPropertyNames().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys}
   * @param {Object} target - The target object.
   * @returns {string[]|Symbol[]} Enumerable representing the object's own keys.
   */
  ownKeys(target) {
    this.onTrap('ownKeys', target);
    return Reflect.ownKeys(target);
  }

  /**
   * Trap for Object.preventExtensions().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions}
   * @param {Object} target - The target object.
   * @returns {Boolean} Boolean indicating whether or not target is extensible.
   */
  preventExtensions(target) {
    this.onTrap('preventExtensions', target);
    return Reflect.preventExtensions(target);
  }

  /**
   * Trap for setting a property value.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to set.
   * @param {*} value - The new value of the property to set.
   * @param {Object} receiver - The object to which the assignment was originally directed.
   * @returns {Boolean} Boolean indicating whether assignment was successful.
   */
  set(target, property, value, receiver) {
    this.onTrap('set', target, property, value, receiver);
    return Reflect.set(target, property, value, receiver);
  }

  /**
   * Trap for Object.setPrototypeOf().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf}
   * @param {Object} target - The target object.
   * @param {Object|null} prototype - The object's new prototype or null.
   * @returns {Boolean} Boolean indicating whether prototype was successfully set.
   */
  setPrototypeOf(target, prototype) {
    this.onTrap('setPrototypeOf', target);
    return Reflect.setPrototypeOf(target, prototype);
  }

  /**
   * Helper method to trigger behavior whenever a trap is handled.
   * @param {string} trap - The name of the trap that triggered event.
   * @param {...*} trapArgs - The arguments describing the context of the trap.
   */
  onTrap(trap, ...trapArgs) {
    this.emitter.emit('trap', trap, ...trapArgs);
  }
}

export { BaseTrapHandler };
