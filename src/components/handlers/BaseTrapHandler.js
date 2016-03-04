/**
 * Created by Mark.Mosby on 3/1/2016.
 */
 import logger from '../logger';

 export class BaseTrapHandler {
  get(target, key, context) {
    if (context._internalKeys.includes(key) || context._delegatable) {
      logger.log(`${key} accessed on ${target}`);
    }

    return Reflect.get(target, key, context);
  }

  set(target, key, val, context) {
    if (context._internalKeys.includes(key)) {
      if (Reflect.isExtensible(target)) {
        logger.log(`${key} set on ${target} with value of ${val}`);
      } else {
        logger.log(`Attempt to set ${key} on ${target} with value of ${val} but target is not extensible`);
      }
    }
    return Reflect.set(target, key, val, context);
  }

  deleteProperty(target, key, context) {
    if (context._internalKeys.includes(key)) {
      logger.log(`${key} removed from ${target}`);
    }
    return Reflect.deleteProperty(target, key);
  }

  getOwnPropertyDescriptor(target, key) {
    logger.log(`getOwnPropertyDescriptor called for ${target}, key: ${key}`);
  }

  defineProperty(target, key, val, context) {
    logger.log(`New property definition through Object.defineProperty(ies) on ${target}, key: ${key}, value: ${val}, context: ${context}`);
    return Reflect.defineProperty(target, key, val);
  }

  getPrototypeOf(target, key, context) {
    // TODO
    logger.log(`getPrototypeOf called with ${target}, key: ${key}, context: ${context}`);
  }

  setPrototypeOf(target, key, context) {
    // TODO
    logger.log(`setPrototypeOf called with ${target}, key: ${key}, context: ${context}`);
  }

  preventExtensions(target, key, context) {
    // TODO
    logger.log(`preventExtensions called with ${target}, key: ${key}, context: ${context}`);
  }

  isExtensible(target, key, context) {
    // TODO
    logger.log(`isExtensible called with ${target}, key: ${key}, context: ${context}`);
  }

  ownKeys(target, key, context) {
    // TODO
    logger.log(`ownKeys called with ${target}, key: ${key}, context: ${context}`);
  }

  enumerate(target, key, context) {
    // TODO
    logger.log(`enumerate called with ${target}, key: ${key}, context: ${context}`);
  }

  hasTarget(target, key, context) {
    // TODO
    logger.log(`hasTarget called with ${target}, key: ${key}, context: ${context}`);
  }
 }
