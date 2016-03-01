/**
 * Created by Mark.Mosby on 2/23/2016.
 */
import logger from '../logger';
import baseTraps from '../trap handlers/baseTrapHandlers';
import {objTraps} from '../proxyHelper';
import proxyState from '../proxyState';

export default function proxifyObject(obj, settings) {
  var keys = [];

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    let curr = obj;
    while (curr) {
      keys.push(Object.keys(curr));
      curr = Object.getPrototypeOf(curr);  //make sure we get all properties; enumerable or not
    }
  }
  else keys = Reflect.ownKeys(obj);

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
            if (~remKeys.indexOf(this._internalKeys[i]))
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
