import { proxifyObject, proxifyFunction, proxifyArray } from './components/factories';

/** Main entry point for proxify.
 * Takes in an array, function, or object and returns its proxified version.
 * For all other types, does nothing and just returns what was passed in.
 * @param {Array|Object|function} target - The object to be proxified.
 * @returns {Proxy} The proxified target.
 */
export function proxify(target) {
  // delegate to appropriate factory
  if (Array.isArray(target)) {
    return proxifyArray(target);
  } else if (typeof target === 'function') {
    return proxifyFunction(target);
  } else if (target !== null && typeof target === 'object') {
    return proxifyObject(target);
  }

	// no proxification, return target
  return target;
}
