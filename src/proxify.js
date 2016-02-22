/**
 * Created by Mark.Mosby on 2/21/2016.
 */

export default function proxify(obj, settings) {
	if (typeof obj == "object")
		return proxifyObject(obj, settings);			//proxify this as an [object object]
	else if (typeof obj == "function")
		return proxifyFunction(obj, settings);		//proxify this as an [object function]
	else if (obj instanceof Array)
		return proxifyArray(obj, settings);			//proxify this as an [object array]
	return obj;								//no proxification, return obj.
}

function proxifyObject(obj, settings) {
	var keys = [],
      traps = [];
	if (settings.keys) keys = settings.keys;
	else if (settings.delegatable) {
		for (var key in obj)
			keys.push(key);
	}
	else {
		keys = Reflect.ownKeys(obj);
	}

  if (settings.traps) traps = settings.traps;
  else traps = ["get", "set", "deleteProperty", "getOwnPropertyDescriptor", "defineProperty", "getPrototypeOf", "preventExtensions", "isExtensible", "ownKeys", "enumerate", "hasTarget"];

  var handler = {};

	var handler = {
		get(target, key, context) {
			if (~keys.indexOf(key)) {
				console.log(key + " accessed on " + target);
			}
			return Reflect.get(target, key, context);
	},
	set(target, key, val, context) {
    if (~keys.indexOf(key)) {
      console.log(key + "set on " + target + " with value of " + val);
    }
		Reflect.set(target, key, val, context);
	},
	deleteProperty(target, key, context) {
    if (~keys.indexOf(key)) {
      console.log(key + " removed from " + target);
    }
		Reflect.deleteProperty(target, key);
	},
	getOwnPropertyDescriptor(target, key) {
		console.log("getOwnPropertyDescriptor called for " + target);
	},
	defineProperty(target, key, val, context) {
		console.log("New property definition through Object.defineProperty(ies) on " + target, "key: " + key, "value: " + val);
		Reflect.defineProperty(target, key, val);
	},
	getPrototypeOf(target, key, context) {

	},
	setPrototypeOf(target, key, context) {

	},
	preventExtensions(target, key, context) {

	},
	isExtensible(target, key, context) {

	},
	ownKeys(target, key, context) {

	},
	enumerate(target, key, context) {

	},
	hastarget, key, context) {

	}
};
return new Proxy(obj, handler);
}

function proxifyFunction(fn) {
	var handler = {
		get(target, key, context) {
		console.log(key + " accessed on " + target);
		return Reflect.get(target, key, context);
	},
	set(target, key, val, context) {
		console.log(key + "set on " + target + " with value of " + val);
		Reflect.set(target, key, val, context);
	},
	deleteProperty(target, key, context) {
		console.log(key + " removed from " + target);
		Reflect.deleteProperty(target, key);
	},
	getOwnPropertyDescriptor(target, key, context) {

	},
	defineProperty(target, key, context) {

	},
	getPrototypeOf(target, key, context) {

	},
	setPrototypeOf(target, key, context) {

	},
	preventExtensions(target, key, context) {

	},
	isExtensible(target, key, context) {

	},
	ownKeys(target, key, context) {

	},
	enumerate(target, key, context) {

	},
	has(target, key, context) {

	},
	apply(target, key, context) {

	},
	construct(target, key, context) {

	}
};
return new Proxy(fn, handler);
}

function proxifyArray (arr) {
	var handler = {
		get(target, key, context) {
		console.log(key + " accessed on " + target);
		return Reflect.get(target, key, context);
	},
	set(target, key, val, context) {
		console.log(key + "set on " + target + " with value of " + val);
		Reflect.set(target, key, val, context);
	},
	deleteProperty(target, key, context) {
		console.log(key + " removed from " + target);
		Reflect.deleteProperty(target, key);
	},
	getOwnPropertyDescriptor() {

	},
	defineProperty(target, key, context) {

	},
	getPrototypeOf(target, key, context) {

	},
	setPrototypeOf(target, key, context) {

	},
	preventExtensions(target, key, context) {

	},
	isExtensible(target, key, context) {

	},
	ownKeys(target, key, context) {

	},
	enumerate(target, key, context) {

	},
	has(target, key, context) {

	}
};
return new Proxy(arr, handler);
}
