import { ArrayTrapHandler } from '../handlers';
import { normalizeConfig } from '../utils';

/**
 * Array proxy factory function.
 * @param {Array} arr - The target array.
 * @param {Object} config - The settings for proxifing the array
 * @returns {Proxy} - The proxified array.
 * @memberof factories
 */
export function proxifyArray (arr, config) {
  config = normalizeConfig(config, Object.getOwnPropertyNames(arr), Object.getOwnPropertyNames(ArrayTrapHandler));
  return new Proxy(arr, new ArrayTrapHandler());
}
