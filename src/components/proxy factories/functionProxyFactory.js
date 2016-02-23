/**
 * Created by Mark.Mosby on 2/23/2016.
 */
var proxyState =  require('proxyState.js'),
    functionTraps = require('functionTrapHandlers.js'),
    proxyHelper = require('proxyHelper.js'),
    logger =      require('logger.js');

function proxifyFunction(fn, settings) {
  var keys = [];

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    let curr = obj;
    while (curr) {
      keys.push(Object.keys(curr));
      curr = Object.getPrototypeOf(curr);  //make sure we get all properties; enumerable or not
    }
  }
  else keys = Reflect.ownKeys(fn);

  traps = settings.traps || proxyHelper.fnTraps;

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
      }
    }
  );

  for (let i = 0; i < traps.length; i++) {
    if (Reflect.has(trapFns, traps[i]))
      handler[traps[i]] = trapFns[traps[i]];
  }

  return new Proxy(fn, handler);
}

export proxifyFunction as default;
