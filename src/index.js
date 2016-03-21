import { proxifyObject, proxifyFunction, proxifyArray } from './components/factories';
import { normalizeSettings } from './utils/settingsNormalizer';

/** Main entry point for proxify.
 * Takes in an array, function, or object and returns its proxified version.
 * For all other types, does nothing and just returns what was passed in.
 * @param {Array|Object|function} target - The object to be proxified.
 * @param {Object} [settings = {}] - The settings for the proxy
 * @returns {Proxy|*} The proxified target.
 */
export function proxify(target, settings = {}) {
  var targetType = typeof target;
  if (!target || (targetType !== 'function' && targetType !== 'object'))
    return target;
  normalizeSettings(settings, Object.getOwnPropertyNames(target));
  // delegate to appropriate factory
  if (Array.isArray(target)) {
    return proxifyArray(target);
  } else if (typeof target === 'function') {
    return proxifyFunction(target);
  } else if (target !== null && typeof target === 'object') {
    return proxifyObject(target);
  }
}
