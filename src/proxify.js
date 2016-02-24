/**
 * Created by Mark.Mosby on 2/21/2016.
 */
  //Modules for each proxy factory type
  //Modules for traps specific to a proxy type
  //Module for traps used by all proxy types + helper functions
  //Module for global proxy settings object that contains state info for each proxy instance - used for lookups when traps are executing
  //Symbols on objects - how to proxy

import objectProxy from 'components/proxy factories/objectProxyFactory';
import functionProxy from 'components/proxy factories/functionProxyFactory';
import arrayProxy from 'components/proxy factories/arrayProxyFactory';

export default function proxify(obj, settings = {}) {
	if (typeof obj === "object")
		return objectProxy.proxifyObject(obj, settings);			//proxify this as an [object object]
	else if (typeof obj === "function")
		return functionProxy.proxifyFunction(obj, settings);		//proxify this as an [object function]
	else if (Array.isArray(obj))
		return arrayProxy.proxifyArray(obj, settings);			//proxify this as an [object array]
	return obj;								//no proxification, return obj.
}
