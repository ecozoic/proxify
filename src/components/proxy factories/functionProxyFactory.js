/**
 * Created by Mark.Mosby on 2/23/2016.
 */
import logger from '../logger';
import funcTraps from '../trap handlers/functionTrapHandlers';
import {fnTraps} from '../proxyHelper';
import proxyState from '../proxyState';

export default function proxifyFunction(fn, settings) {
  var keys = [];

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    let curr = fn;
    while (curr) {
      keys.push(Object.keys(curr));
      curr = Object.getPrototypeOf(curr);  //make sure we get all properties; enumerable or not
    }
  }
  else keys = Reflect.ownKeys(fn);

  var traps = settings.traps || fnTraps;

  var handler = {};
  Object.defineProperties(
    handler, {
      "addKeys": {
        value: function _addKeys(newKeys) {
          this._internalKeys = this._internalKeys.concat(newKeys);
        },
        writable: false,
        configurable: false
      },
      "removeKeys": {
        value: function _removeKeys(remKeys) {
          var tmpKeys = [];
          for (let i = 0; i < this._internalKeys.length; i++) {
            if (remKeys.includes(this._internalKeys[i]))
              tmpKeys.push(this._internalKeys[i]);
          }
          this._internalKeys = tmpKeys;
        },
        writable: false,
        configurable: false
      },
      "objectType": {
        value: "function",
        writable: false,
        configurable: false,
        enumerable: false
      }
    }
  );

  for (let i = 0; i < traps.length; i++) {
    if (Reflect.has(fnTraps, traps[i]))
      handler[traps[i]] = funcTraps[traps[i]];
  }

  return new Proxy(fn, handler);
}
