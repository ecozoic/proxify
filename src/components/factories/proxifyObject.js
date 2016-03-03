/**
 * Created by Mark.Mosby on 2/23/2016.
 */
import { objectTrapHandler } from '../handlers/objectTrapHandlers';
import { objectTraps } from '../traps/objectTraps';

export function proxifyObject(obj, settings) {
  let keys = [];
  let disAllowedKeys = [];

  if (settings.keys) {
    keys = settings.keys;
  } else if (settings.delegatable) {
    let curr = obj;
    while (curr) {
      keys.push(Object.keys(curr));
      // make sure we get all properties; enumerable or not
      curr = Object.getPrototypeOf(curr);
    }
  } else {
    keys = Reflect.ownKeys(obj);
  }

  for (let i = 0; i <  keys.length; i++) {
    var currProp = Reflect.getOwnPropertyDescriptor(obj, keys[i]);
    if (!currProp && settings.delegatable) {
      var parent = Object.getPrototypeOf(obj);
      while (parent && !currProp) {
        currProp = Reflect.getOwnPropertyDescriptor(parent, keys[i]);
        if (!currProp)
          parent = Object.getPrototypeOf(parent);
      }
    }
    else if ((currProp.get && typeof currProp.get === "function") || (currProp.set && typeof currProp.set === "function")) {
      keys.splice(i, 1);  //remove
    }
    else {
      keys.splice(i, 1);
    }
  }

  var traps = settings.traps || objTraps;

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
        value: "object",
        writable: false,
        configurable: false,
        enumerable: false
      }
    }
  );

  for (let i = 0; i < traps.length; i++) {
    if (Reflect.has(objTraps, traps[i]))
      handler[traps[i]] = baseTraps[traps[i]];
  }

  return new Proxy(obj, handler);
}
