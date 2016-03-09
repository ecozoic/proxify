/*
 * Created by Mark.Mosby on 2/22/2016.
 */
  //NOTE: This file is not to be used in any part of the actual program.
  //Used for a visual reference to the settings object. Update this object reference as the
  //settings object changes.


  //ATTRIBUTES:
  //- delegatable: Should we log against delegated properties, or only on the obj's own keys? If not specified, we don't trap delegation
  //- trapNewProperties: Should the proxy trap the properties that are added to an object (and potentially objects that it delegates to)?
  //- keys: The keys to trap, if not specified, we trap all keys
  //- traps: The list of traps to be set on the proxy. If not specified, we place all traps for the object type (object, function, array)
  //- logLevel: The log level of the proxy
  //- key1: A more explicit and exact definition of how the proxifier should handle this specifiec obj key
  //- updateable: when 'true' allows the proxy to follow newly added properties to the object

  //BEHAVIOR:
  //When only the top-level settings attributes are defined, the proxifier will log at the specified log level for all specified trap
  //against all specified keys. However, when a specific key on the object passed to the proxifier is defined in the settings object
  //the proxifer will override any of the general settings with those specified in the key's definition. All higher-level definitions
  //are inherited down, so you can set a general policy at the top level, and then override it for certain keys/traps at the lower levels.
  //The specified keys will inherit any logging capabilities defined at the top level that have not been overridden at the lower levels.

const settings = {
  delegatable: false,
  trapNewProperties: true,
  keys: ['key1', 'key2', 'key3', 'key4', 'key5'],
  traps: ['get', 'set'],
  logLevel: 1,
  'key1': {
    logLevel: 2,
    traps: []
  },
  'key3': {
    traps: {
      'get': {
        logLevel: 4
      }
    }
  }
};

export { settings };
