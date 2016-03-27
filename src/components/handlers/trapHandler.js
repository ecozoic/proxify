import { logger } from '../utils/logger';

/** Object that defines the traps used across all proxify-able types.
 * @memberOf handlers
 */
var baseTrapHandler = {
  /**
   * Trap for Object.defineProperty().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property being defined or modified.
   * @param {Object} descriptor - The descriptor for the property being defined or modified.
   * @returns {Boolean} Boolean indicating whether or not property definition was successful.
   */
  defineProperty: function _defineProperty(target, property, descriptor) {
    logger.log(`Property definition on ${target}, property: ${property}, descriptor: ${descriptor}`);
    return Reflect.defineProperty(target, property, descriptor);
  },
  /**
   * Trap for the delete operator.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to delete.
   * @returns {Boolean} Boolean indicating whether or not property deletion was successful.
   */
  deleteProperty: function _deleteProperty(target, property) {
    logger.log(`Property deletion on ${target}, property: ${property}`);
    return Reflect.deleteProperty(target, property);
  },
  /**
   * Trap for getting a property value.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to get.
   * @param {Object} receiver - Either the proxy or an object that inherits from the proxy.
   * @returns {*} Value of the property.
   */
  get: function _get(target, property, receiver) {
    logger.log(`Property access on ${target}, property: ${property}`);
    return Reflect.get(target, property, receiver);
  },
  /**
   * Trap for Object.getOwnPropertyDescriptor().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property whose description should be retrieved.
   * @returns {Object|undefined} The descriptor object or undefined if property is undefined.
   */
  getOwnPropertyDescriptor: function _getOwnPropertyDescriptor(target, property) {
    logger.log(`Property descriptor access on ${target}, property: ${property}`);
    return Reflect.getOwnPropertyDescriptor(target, property);
  },
  /**
   * Trap for [[GetPrototypeOf]] internal method.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf}
   * @param {Object} target - The target object.
   * @returns {Object|null} The prototype object or null if object has no prototype.
   */
  getPrototypeOf: function _getPrototypeOf(target) {
    logger.log(`[[GetPrototypeOf]] on ${target}`);
    return Reflect.getPrototypeOf(target);
  },
  /**
   * Trap for the in operator.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has}
   * @param {Object} target - The target object.
   * @param {String} property - The name of the property to check for existence.
   * @returns {Boolean} Boolean indicating whether or not property exists.
   */
  has: function _has(target, property) {
    logger.log(`Property query on ${target}, property: ${property}`);
    return Reflect.has(target, property);
  },
  /**
   * Trap for Object.isExtensible().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible}
   * @param {Object} target - The target object.
   * @returns {Boolean} Boolean indicating whether or not target is extensible.
   */
  isExtensible: function _isExtensible(target) {
    logger.log(`Extensibility check on ${target}`);
    return Reflect.isExtensible(target);
  },
  /**
   * Trap for Object.getOwnPropertyNames().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys}
   * @param {Object} target - The target object.
   * @returns {string[]|Symbol[]} Enumerable representing the object's own keys.
   */
  ownKeys: function _ownKeys(target) {
    logger.log(`Own key enumeration on ${target}`);
    return Reflect.ownKeys(target);
  },
  /**
   * Trap for Object.preventExtensions().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions}
   * @param {Object} target - The target object.
   * @returns {Boolean} Boolean indicating whether or not target is extensible.
   */
  preventExtensions: function _preventExtensions(target) {
    logger.log(`Prevent extensions call on ${target}`);
    return Reflect.preventExtensions(target);
  },
  /**
   * Trap for setting a property value.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set}
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to set.
   * @param {*} value - The new value of the property to set.
   * @param {Object} receiver - The object to which the assignment was originally directed.
   * @returns {Boolean} Boolean indicating whether assignment was successful.
   */
  set: function _set(target, property, value, receiver) {
    logger.log(`Property write on ${target}, property: ${property}, value: ${value}`);
    return Reflect.set(target, property, value, receiver);
  },
  /**
   * Trap for Object.setPrototypeOf().
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf}
   * @param {Object} target - The target object.
   * @param {Object|null} prototype - The object's new prototype or null.
   * @returns {Boolean} Boolean indicating whether prototype was successfully set.
   */
  setPrototypeOf: function _setPrototypeOf(target, prototype) {
    logger.log(`setPrototypeOf called on ${target}, prototype: ${prototype}`);
    return Reflect.setPrototypeOf(target, prototype);
  },
  [Symbol.iterator]() {
    var index = 0;
    var data  = [];
    for (var key in this) {
      data.push(key);
    }

    return {
      next: function _next() {
        return index < data.length ?
        { value: data[index++], done: false } :
        { done: true};
      }
    };
  }
};

export { baseTrapHandler };
