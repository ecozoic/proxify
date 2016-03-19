import { ArrayTrapHandler } from '../handlers';

/**
 * Array proxy factory function.
 * @param {Array} arr - The target array.
 * @param {Object} settings - The settings for the proxy
 * @returns {Proxy} - The proxified array.
 * @memberof factories
 */
export function proxifyArray (arr, settings) {
  return new Proxy(arr, new ArrayTrapHandler());
}
