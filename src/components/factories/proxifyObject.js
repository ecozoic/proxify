import { ObjectTrapHandler } from '../handlers';
import { AsyncEventEmitter, logger } from '../utils';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @param {Object} config - The settings for proxifing the object
 * @returns {Proxy} The proxified object.
 * @memberOf factories
 */
export function proxifyObject(obj) {
  const emitter = new AsyncEventEmitter();
  emitter.on('trap', logger.logTrap.bind(logger));

  return new Proxy(obj, new ObjectTrapHandler(emitter));
}
