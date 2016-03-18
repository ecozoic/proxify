import { ObjectTrapHandler } from '../handlers';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @param {Object} settings - The settings for the proxy
 * @returns {Proxy} The proxified object.
 * @memberOf factories
 */
export function proxifyObject(obj) {
  return new Proxy(obj, new ObjectTrapHandler());
}
