import { ObjectTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';
import { AsyncEventEmitter, logger } from '../utils';

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
  var trapHandler = new ObjectTrapHandler(emitter);
  config = normalizeConfig(config, Object.getOwnPropertyNames(obj), Object.getOwnPropertyNames(trapHandler.prototype));
  return new Proxy(obj, trapHandler);
}
