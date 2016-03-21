import { FunctionTrapHandler } from '../handlers';

/**
 * Function proxy factory function.
 * @param {function} fn - The target function.
 * @returns {Proxy} - The proxified function.
 * @memberOf factories
 */
export function proxifyFunction(fn) {
  return new Proxy(fn, new FunctionTrapHandler());
}
