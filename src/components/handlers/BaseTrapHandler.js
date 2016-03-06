import { logger } from '../logger';

/** Class representing the traps used across all proxify-able types. */
class BaseTrapHandler {
  /**
   * Trap for Object.defineProperty().
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property being defined or modified.
   * @param {Object} descriptor - The descriptor for the property being defined or modified.
   * @returns {Boolean} Boolean indicating whether or not property definition was successful.
   */
  defineProperty(target, property, descriptor) {
    logger.log(`Property definition on ${target}, property: ${property}, descriptor: ${descriptor}`);
    return Reflect.defineProperty(target, property, descriptor);
  }

  /**
   * Trap for the delete operator.
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to delete.
   * @returns {Boolean} Boolean indicating whether or not property deletion was successful.
   */
  deleteProperty(target, property) {
    logger.log(`Property deletion on ${target}, property: ${property}`);
    return Reflect.deleteProperty(target, property);
  }

  /**
   * Trap for getting a property value.
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to get.
   * @param {Object} receiver - Either the proxy or an object that inherits from the proxy.
   * @returns {*} Value of the property.
   */
  get(target, property, receiver) {
    logger.log(`Property access on ${target}, property: ${property}`);
    return Reflect.get(target, property, receiver);
  }

  /**
   * Trap for Object.getOwnPropertyDescriptor().
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property whose description should be retrieved.
   * @returns {Object|undefined} The descriptor object or undefined if property is undefined.
   */
  getOwnPropertyDescriptor(target, property) {
    logger.log(`Property descriptor access on ${target}, property: ${property}`);
    return Reflect.getOwnPropertyDescriptor(target, property);
  }

  /**
   * Trap for [[GetPrototypeOf]] internal method.
   * @param {Object} target - The target object.
   * @returns {Object|null} The prototype object or null if object has no prototype.
   */
  getPrototypeOf(target) {
    logger.log(`[[GetPrototypeOf]] on ${target}`);
    return Reflect.getPrototypeOf(target);
  }

  /**
   * Trap for the in operator.
   * @param {Object} target - The target object.
   * @param {property} - The name of the property to check for existence.
   * @returns {Boolean} Boolean indicating whether or not property exists.
   */
  has(target, property) {
    logger.log(`Property query on ${target}, property: ${property}`);
    return Reflect.has(target, property);
  }

  /**
   * Trap for Object.isExtensible().
   * @param {Object} target - The target object.
   * @returns {Boolean} Boolean indicating whether or not target is extensible.
   */
  isExtensible(target) {
    logger.log(`Extensibility check on ${target}`);
    return Reflect.isExtensible(target);
  }

  /**
   * Trap for Object.getOwnPropertyNames().
   * @param {Object} target - The target object.
   * @returns {string[]|Symbol[]} Enumerable representing the object's own keys.
   */
  ownKeys(target) {
    logger.log(`Own key enumeration on ${target}`);
    return Reflect.ownKeys(target);
  }

  /**
   * Trap for Object.preventExtensions().
   * @param {Object} target - The target object.
   * @returns {Boolean} Boolean indicating whether or not target is extensible.
   */
  preventExtensions(target) {
    logger.log(`Prevent extensions call on ${target}`);
    return Reflect.preventExtensions(target);
  }

  /**
   * Trap for setting a property value.
   * @param {Object} target - The target object.
   * @param {string} property - The name of the property to set.
   * @param {*} value - The new value of the property to set.
   * @param {Object} receiver - The object to which the assignment was originally directed.
   * @returns {Boolean} Boolean indicating whether assignment was successful.
   */
  set(target, property, value, receiver) {
    logger.log(`Property write on ${target}, property: ${property}, value: ${value}`);
    return Reflect.set(target, property, value, receiver);
  }

  /**
   * Trap for Object.setPrototypeOf().
   * @param {Object} target - The target object.
   * @param {Object|null} - The object's new prototype or null.
   */
  setPrototypeOf(target, prototype) {
    logger.log(`setPrototypeOf called on ${target}, prototype: ${prototype}`);
    Reflect.setPrototypeOf(target, prototype);
  }
}

export { BaseTrapHandler };
