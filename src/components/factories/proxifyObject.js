import { ObjectTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @param {Object} config - The settings for proxifing the object
 * @returns {Proxy} The proxified object.
 * @memberOf factories
 */
export function proxifyObject(obj, config) {
  config = normalizeConfig(config, Object.getOwnPropertyNames(obj), Object.getOwnPropertyNames(ObjectTrapHandler.prototype));
  return new Proxy(obj, new ObjectTrapHandler());
}
