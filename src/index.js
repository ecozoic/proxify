import { proxifyObject, proxifyFunction, proxifyArray } from './components/factories';

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
