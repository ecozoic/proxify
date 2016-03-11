import { BaseTrapHandler } from './BaseTrapHandler';
import { logger } from '../utils/logger';

/**
 * Class representing the traps used to proxy functions.
 * Extends {@link handlers.BaseTrapHandler}.
 * @memberOf handlers
 */
class FunctionTrapHandler extends BaseTrapHandler {
  /**
   * Trap for a function call.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply}
   * @param {Object} target - The target object.
   * @param {Object} thisArg - The this argument for a function call.
   * @param {Array} argumentsList - The list of arguments for the call.
   * @returns {*} The return value of the function.
   */
  apply(target, thisArg, argumentsList) {
    logger.log(`Function call on ${target}, this: ${thisArg}, args: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }

  /**
   * Trap for the new operator.
   * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct}
   * @param {Object} target - The target object.
   * @param {Array} argumentsList - The list of arguments for the call.
   * @returns {Object} The new object.
   */
  construct(target, argumentsList) {
    logger.log(`Constructor call on ${target}, args: ${argumentsList}`);
    return Reflect.construct(target, argumentsList);
  }
}

export { FunctionTrapHandler };
