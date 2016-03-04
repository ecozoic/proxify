import { BaseTrapHandler } from './BaseTrapHandler';
import logger from '../logger';

/**
 * Class representing the traps used to proxy functions.
 * Extends {@link BaseTrapHandler}
 */
class FunctionTrapHandler extends BaseTrapHandler {
  /**
   * Trap for a function call.
   * @param {Object} target - The target object.
   * @param {Object} thisArg - The this argument for a function call.
   * @param {Object[]} argumentsList - The list of arguments for the call.
   * @returns {*} The return value of the function.
   */
  apply(target, thisArg, argumentsList) {
    logger.log(`Function call on ${target}, this: ${thisArg}, args: ${argumentsList}`);
    return Reflect.apply(target, thisArg, argumentsList);
  }

  /**
   * Trap for the new operator.
   * @param {Object} target - The target object.
   * @param {Object[]} argumentsList - The list of arguments for the call.
   * @returns {Object} The new object.
   */
  construct(target, argumentsList) {
    logger.log(`Constructor call on ${target}, args: ${argumentsList}`);
    return Reflect.construct(target, argumentsList);
  }
}

export { FunctionTrapHandler };
