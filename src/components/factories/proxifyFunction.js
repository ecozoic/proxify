import { FunctionTrapHandler } from '../handlers';

/**
 * Function proxy factory function.
 * @param {function} fn - The target function.
 * @param {Object} settings - The settings for the proxy
 * @returns {Proxy} - The proxified function.
 * @memberOf factories
 */
export function proxifyFunction(fn, settings) {
  return new Proxy(fn, new FunctionTrapHandler());
}
