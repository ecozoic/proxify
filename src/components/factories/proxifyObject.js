import { ObjectTrapHandler } from '../handlers';

/**
 * Object proxy factory function.
 * @param {Object} obj - The target object.
 * @param {Object} settings - The settings for the proxy
 * @returns {Proxy} The proxified object.
 * @memberOf factories
 */
export function proxifyObject(obj, settings) {
  if (!settings.updateable)
    return new Proxy(obj, new ObjectTrapHandler());
  else
    return { proxy: pObj, revoke: token } = Proxy(obj, new ObjectTrapHandler())
}
