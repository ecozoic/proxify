import { FunctionTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';

/**
 * Function proxy factory function.
 * @param {function} fn - The target function.
 * @param {Object} config - The settings for proxifing the function
 * @returns {Proxy} - The proxified function.
 * @memberOf factories
 */
export function proxifyFunction(fn, config) {
  var trapHandler = new FunctionTrapHandler();
  config = normalizeConfig(config, Object.getOwnPropertyNames(fn), Object.getOwnPropertyNames(trapHandler.prototype));
  return new Proxy(fn, trapHandler);
}
