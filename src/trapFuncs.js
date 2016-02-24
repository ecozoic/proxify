/**
 * Created by Mark.Mosby on 2/22/2016.
 */
var traps = {
  get: function _get(target, key, context) {
    if (~context._internalKeys.indexOf(key) || context._delegatable) {  //log the get operation if we find the key in the keys array
      console.log(key + " accessed on " + target);                      //or delegation is allowed
    }
    return Reflect.get(target, key, context);
  },
  set: function _set(target, key, val, context) {
    if (~context._internalKeys.indexOf(key)) {
      if (Reflect.isExtensible(target)) {
        console.log(key + " set on " + target + " with value of " + val + ".");
      }
      else {
        console.log ("Attempt to set " + key  + " on " +  target + " with value of " + val + " but target object is not extensible.");
      }
    }
    Reflect.set(target, key, val, context);
  },
  deleteProperty: function _deleteProperty(target, key, context) {
    if (~context._internalKeys.indexOf(key)) {
      console.log(key + " removed from " + target);
    }
    Reflect.deleteProperty(target, key);
  },
  getOwnPropertyDescriptor: function _getOwnPropertyDescriptor(target, key) {
    console.log("getOwnPropertyDescriptor called for " + target);
  },
  defineProperty: function _defineProperty(target, key, val, context) {
    console.log("New property definition through Object.defineProperty(ies) on " + target, "key: " + key, "value: " + val);
    Reflect.defineProperty(target, key, val);
  },
  getPrototypeOf: function _getPrototypeOf(target, key, context) {

  },
  setPrototypeOf: function _setPrototypeOf(target, key, context) {

  },
  preventExtensions: function _preventExtensions(target, key, context) {

  },
  isExtensible: function _isExtensible(target, key, context) {

  },
  ownKeys: function _ownKeys(target, key, context) {

  },
  enumerate: function _enumerate(target, key, context) {

  },
  hasTarget: function _hastarget (target, key, context) {

  }
};

export default traps;
