/**
 * Created by Mark.Mosby on 2/23/2016.
 */
import { functionTrapHandler } from '../handlers/functionTrapHandler';
import { functionTraps } from '../traps/functionTraps';

export function proxifyFunction(fn, settings) {
  let keys = [];

  if (settings.keys) {
    keys = settings.keys;
  } else if (settings.delegatable) {
    let curr = fn;
    while (curr) {
      keys.push(Object.keys(curr));
      // make sure we get all properties; enumerable or not
      curr = Object.getPrototypeOf(curr);
    }
  } else {
    keys = Reflect.ownKeys(fn);
  }

  let traps = settings.traps || fnTraps;

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
        value: "function",
        writable: false,
        configurable: false,
        enumerable: false
      }
    }
  );

  traps.forEach((trap) => {
    if (functionTraps.includes(trap)) {
      handler[trap] = functionTrapHandler[trap];
    }
  });

  return new Proxy(fn, handler);
}
