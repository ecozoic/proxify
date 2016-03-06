import { ObjectTrapHandler } from '../handlers';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @returns {Proxy} The proxified object.
 */
export function proxifyObject(obj) {
  return new Proxy(obj, new ObjectTrapHandler());
}
