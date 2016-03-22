import { ArrayTrapHandler } from '../handlers';
import { normalizeSettings } from '../utils';

/**
 * Array proxy factory function.
 * @param {Array} arr - The target array.
 * @param {Object} settings - The settings for proxifing the array
 * @returns {Proxy} - The proxified array.
 * @memberof factories
 */
export function proxifyArray (arr, settings) {
  normalizeSettings(settings, Object.getOwnPropertyNames(arr));
  return new Proxy(arr, new ArrayTrapHandler());
}
