import { ArrayTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';
import { AsyncEventEmitter, logger } from '../utils';
import { trapDefinitions } from '../utils';

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
  config = normalizeConfig(config, Object.getOwnPropertyNames(arr), trapDefinitions.keys('objectAll'));

  return new Proxy(arr, new ArrayTrapHandler(emitter));
}
