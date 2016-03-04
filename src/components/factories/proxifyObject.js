/**
 * Created by Mark.Mosby on 2/23/2016.
 */
import { ObjectTrapHandler } from '../handlers/ObjectTrapHandler';
import { objectTraps } from '../traps/objectTraps';

export function proxifyObject(obj, settings) {
  let keys = [];

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

  keys.forEach((key, index) => {
    let currProp = Reflect.getOwnPropertyDescriptor(obj, key);
    if (!currProp && settings.delegatable) {
      let parent = Object.getPrototypeOf(obj);

      while (parent && !currProp) {
        currProp = Reflect.getOwnPropertyDescriptor(parent, key);
        if (!currProp) {
          parent = Object.getPrototypeOf(parent);
        }
      }
    } else if ((currProp.get && typeof currProp.get === 'function') || (currProp.set && typeof currProp.set === 'function')) {
      keys.splice(index, 1);  //remove
    } else {
      keys.splice(index, 1);
    }
  });

  let traps = settings.traps || objectTraps;

  let handler = {};
  Object.defineProperties(
    handler, {
      'addKeys': {
        value: function _addKeys(newKeys) {
          this._internalKeys = this._internalKeys.concat(newKeys);
        },
        writable: false,
        configurable: false
      },
      'removeKeys': {
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
      'objectType': {
        value: 'object',
        writable: false,
        configurable: false,
        enumerable: false
      }
    }
  );

  let objectTrapHandler = new ObjectTrapHandler();
  traps.forEach((trap) => {
    if (objectTraps.includes(trap)) {
      handler[trap] = objectTrapHandler[trap];
    }
  });

  return new Proxy(obj, handler);
}
