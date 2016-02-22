/**
 * Created by Mark.Mosby on 2/22/2016.
 */
var settings = {
  delegatable: false,   //Should we log against delegated properties, or only on the obj's own keys? If not specified, we don't trap delegation
  keys: ["key1", "key2", "key3", "key4", "key5"],   //The keys to trap, if not specified, we trap all keys
  traps: ["get", "set"],    //The list of traps to be set on the proxy. If not specified, we place all traps for the object type (object, function, array)
  logLevel: 1     //The log level of the proxy
};
