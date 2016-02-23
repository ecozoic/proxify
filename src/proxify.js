/**
 * Created by Mark.Mosby on 2/21/2016.
 */
  var trapFns = require("trapFuncs.js"),
      objTraps = ["get", "set", "deleteProperty", "getOwnPropertyDescriptor", "defineProperty", "getPrototypeOf", "setPrototypeOf", "preventExtensions", "isExtensible", "ownKeys", "enumerate", "hasTarget"],
      fnTraps = ["get", "set", "deleteProperty", "getOwnPropertyDescriptor", "defineProperty", "getPrototypeOf", "setPrototypeOf", "preventExtensions", "isExtensible",
        "ownKeys", "enumerate", "hasTarget", "has", "apply", "construct"],
      arrTraps = ["get", "set", "deleteProperty", "getOwnPropertyDescriptor", "defineProperty", "getPrototypeOf", "setPrototypeOf", "preventExtensions", "isExtensible", "enumerate", "has"];

export default function proxify(obj, settings) {
	if (typeof obj === "object")
		return proxifyObject(obj, settings);			//proxify this as an [object object]
	else if (typeof obj === "function")
		return proxifyFunction(obj, settings);		//proxify this as an [object function]
	else if (Array.isArray(obj))
		return proxifyArray(obj, settings);			//proxify this as an [object array]
	return obj;								//no proxification, return obj.
}

function proxifyObject(obj, settings) {
	var keys = [],
      settings = settings && typeof settings === "object" ? settings : {};

	if (settings.keys) keys = settings.keys;
	else if (settings.delegatable) {
    var curr = obj;
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
      "_internalKeys": {
        value: keys,
        writable: false,
        configurable: false,
        enumerable: false
      },
      "delegatable": {
        value: settings.delegatable || false,
        writable: false,
        configurable: false,
        enumerable: false
      },
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

  return new Proxy(obj, handler);
}

function proxifyFunction(fn, settings) {
  var keys = [],
      settings = settings && typeof settings == "object" ? settings : {};

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    for (var key in fn) {
      keys.push(key);
    }
  }
  else keys = Reflect.ownKeys(fn);

  traps = settings.traps || fnTraps;

  var handler = {};
  Object.defineProperties(
    handler, {
      "_internalKeys": {
        value: keys,
        writable: false,
        configurable: false,
        enumerable: false
      },
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

function proxifyArray (arr, settings) {
  var keys = [],
      settings = settings && typeof settings == "object" ? settings : {};

  if (settings.keys) keys = settings.keys;
  else if (settings.delegatable) {
    for (var key in arr) {
      keys.push(key);
    }
  }
  else keys = Reflect.ownKeys(fn);

  traps = settings.traps || arrTraps;

	var handler = {};
  Object.defineProperty(
    handler,
    "_internalKeys",
    {
      value: keys,
      writable: false,
      configurable: false,
      enumerable: false
    }
  );

  for (let i = 0; i < traps.length; i++) {
    if (Reflect.has(trapFns, traps[i]))
      handler[traps[i]] = trapFns[traps[i]];
  }

  return new Proxy(arr, handler);
}
