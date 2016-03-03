/**
 * Created by Mark.Mosby on 2/21/2016.
 */
  //Modules for each proxy factory type
  //Modules for traps specific to a proxy type
  //Module for traps used by all proxy types + helper functions
  //Module for global proxy settings object that contains state info for each proxy instance - used for lookups when traps are executing
  //Symbols on objects - how to proxy

import { proxifyObject, proxifyFunction, proxifyArray } from './components/factories';

export function proxify(obj, settings = {}) {
	if (typeof obj === "object") {
    //proxify this as an [object object]
    return proxifyObject(obj, settings);
  } else if (typeof obj === "function") {
    //proxify this as an [object function]
		return proxifyFunction(obj, settings);
  } else if (Array.isArray(obj)) {
    //proxify this as an [object array]
		return proxifyArray(obj, settings);
  }

	//no proxification, return obj.
  return obj;
}
