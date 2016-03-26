import { baseTrapHandler } from './trapHandler';
import { logger } from '../utils/logger';

/**
 * Object that defines the traps used to proxy functions.
 * Extends {@link handlers.BaseTrapHandler}.
 * @memberOf handlers
 */
var fnTrapHandler = Object.create(baseTrapHandler, {
  /**
   * Trap for a function call.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply}
   * @param {Function} target - The target object.
   * @param {*} context - The this context for a function call.
   * @param {Array} argumentsList - The list of arguments for the call.
   * @returns {*} The return value of the function.
   */
  apply: {
    value: function _apply(target, context, argumentsList) {
      logger.log(`Function call on ${target}, this: ${context}, args: ${argumentsList}`);
      return Reflect.apply(target, context, argumentsList);
    },
    writable: false,
    configurable: false,
    enumerable: true
  },
  /**
   * Trap for the new operator.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct}
   * @param {Function} target - The target object.
   * @param {Array} argumentsList - The list of arguments for the call.
   * @returns {Object} The new object.
   */
  construct: {
    value: function _construct(target, argumentsList) {
      logger.log(`Constructor call on ${target}, args: ${argumentsList}`);
      return Reflect.construct(target, argumentsList);
    },
    writable: false,
    configurable: false,
    enumerable: true
  }
});

export { fnTrapHandler };
