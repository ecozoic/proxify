import { ArrayTrapHandler } from '../handlers';
import { AsyncEventEmitter, logger } from '../utils';

/**
 * Array proxy factory function.
 * @param {Array} arr - The target array.
 * @param {Object} settings - The settings for the proxy
 * @returns {Proxy} - The proxified array.
 * @memberof factories
 */
export function proxifyArray (arr) {
  const emitter = new AsyncEventEmitter();
  emitter.on('trap', logger.logTrap.bind(logger));

  return new Proxy(arr, new ArrayTrapHandler(emitter));
}
