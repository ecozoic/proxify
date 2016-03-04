import { proxifyObject, proxifyFunction, proxifyArray } from './components/factories';

export function proxify(obj, settings = {}) {
  // delegate to appropriate factory
  if (Array.isArray(obj)) {
    return proxifyArray(obj, settings);
  } else if (typeof obj === 'function') {
    return proxifyFunction(obj, settings);
  } else if (obj !== null && typeof obj === 'object') {
    return proxifyObject(obj, settings);
  }

	// no proxification, return obj.
  return obj;
}
