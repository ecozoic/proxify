import { FunctionTrapHandler } from '../handlers';
import { AsyncEventEmitter, logger } from '../utils';

/**
 * Function proxy factory function.
 * @param {function} fn - The target function.
 * @param {Object} config - The settings for proxifing the function
 * @returns {Proxy} - The proxified function.
 * @memberOf factories
 */
export function proxifyFunction(fn, config) {
  const emitter = new AsyncEventEmitter();
  emitter.on('trap', logger.logTrap.bind(logger));
  var trapHandler = new FunctionTrapHandler(emitter);
  config = normalizeConfig(config, Object.getOwnPropertyNames(fn), Object.getOwnPropertyNames(trapHandler.prototype));
  return new Proxy(fn, trapHandler);
}
