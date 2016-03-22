import { ObjectTrapHandler } from '../handlers';
import { normalizeSettings } from '../utils';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @param {Object} settings - The settings for proxifing the object
 * @returns {Proxy} The proxified object.
 * @memberOf factories
 */
export function proxifyObject(obj, settings) {
  normalizeSettings(settings, Object.getOwnPropertyNames(obj));
  return new Proxy(obj, new ObjectTrapHandler());
}
