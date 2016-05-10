import { ObjectTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';
import { AsyncEventEmitter, logger } from '../utils';
import { trapDefinitions } from '../utils';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @param {Object} config - The settings for proxifing the object
 * @returns {Proxy} The proxified object.
 * @memberOf factories
 */
export function proxifyObject(obj, config) {
  const emitter = new AsyncEventEmitter();
  emitter.on('trap', logger.logTrap.bind(logger));
  config = normalizeConfig(config, Object.getOwnPropertyNames(obj), trapDefinitions.keys('objectAll'));
  return new Proxy(obj, new ObjectTrapHandler(emitter, config));
}
