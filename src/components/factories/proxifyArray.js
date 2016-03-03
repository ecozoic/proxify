/**
 * Created by Mark.Mosby on 2/23/2016.
 */
import { arrayTrapHandler } from '../handlers/arrayTrapHandlers';
import { arrayTraps } from '../traps/arrayTraps';

export function proxifyArray (arr, settings) {
  let keys = [];

  if (settings.keys) {
    keys = settings.keys;
  } else if (settings.delegatable) {
    let curr = arr;
    while (curr) {
      keys.push(Object.keys(curr));
      // make sure we get all properties; enumerable or not
      curr = Object.getPrototypeOf(curr);
    }
  } else {
    keys = Reflect.ownKeys(fn);
  }

  let traps = settings.traps || arrayTraps;

  let handler = {};
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
          this._internalKeys = this._internalKeys.filter(key => !remKeys.includes(key));
        },
        writable: false,
        configurable: false
      },
      "objectType": {
        value: "array",
        writable: false,
        configurable: false,
        enumerable: false
      }
    }
  );

  traps.forEach((trap) => {
    if (arrayTraps.includes(trap)) {
      handler[trap] = arrayTrapHandler[trap];
    }
  });

  return new Proxy(arr, handler);
}
