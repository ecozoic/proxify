import { ArrayTrapHandler } from '../handlers';

/**
 * Array proxy factory function.
 * @param {Array} arr - The target array.
 * @returns {Proxy} - The proxified array.
 * @memberof factories
 */
export function proxifyArray (arr) {
  return new Proxy(arr, new ArrayTrapHandler());
}
