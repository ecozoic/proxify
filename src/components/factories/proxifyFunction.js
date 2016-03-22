import { FunctionTrapHandler } from '../handlers';
import { normalizeSettings } from '../utils';

/**
 * Function proxy factory function.
 * @param {function} fn - The target function.
 * @param {Object} settings - The settings for proxifing the function
 * @returns {Proxy} - The proxified function.
 * @memberOf factories
 */
export function proxifyFunction(fn, settings) {
  normalizeSettings(settings, Object.getOwnPropertyNames(fn));
  return new Proxy(fn, new FunctionTrapHandler());
}
