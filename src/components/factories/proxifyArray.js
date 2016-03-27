import { ArrayTrapHandler } from '../handlers';
import { AsyncEventEmitter, logger } from '../utils';

/**
 * Array proxy factory function.
 * @param {Array} arr - The target array.
 * @param {Object} config - The settings for proxifing the array
 * @returns {Proxy} - The proxified array.
 * @memberof factories
 */
export function proxifyArray (arr, config) {
  const emitter = new AsyncEventEmitter();
  emitter.on('trap', logger.logTrap.bind(logger));
  var trapHandler = new ArrayTrapHandler(emitter);
  config = normalizeConfig(config, Object.getOwnPropertyNames(arr), Object.getOwnPropertyNames(trapHandler.prototype));
  
  return new Proxy(arr, trapHandler);
}
