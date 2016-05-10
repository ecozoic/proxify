import { FunctionTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';
import { AsyncEventEmitter, logger } from '../utils';
import { trapDefinitions } from '../utils';

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
  config = normalizeConfig(config, Object.getOwnPropertyNames(fn), trapDefinitions.keys('functionAll'));
  return new Proxy(fn, new FunctionTrapHandler(emitter, config));
}
