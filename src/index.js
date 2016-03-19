import { proxifyObject, proxifyFunction, proxifyArray } from './components/factories';

/** Main entry point for proxify.
 * Takes in an array, function, or object and returns its proxified version.
 * For all other types, does nothing and just returns what was passed in.
 * @param {Array|Object|function} target - The object to be proxified.
 * @param {Object} settings - The settings for the proxy
 * @returns {Proxy} The proxified target.
 */
export function proxify(target, settings = {}) {
  // delegate to appropriate factory
  if (Array.isArray(target)) {
    return proxifyArray(target, settings);
  } else if (typeof target === 'function') {
    return proxifyFunction(target, settings);
  } else if (target !== null && typeof target === 'object') {
    return proxifyObject(target, settings);
  }

	// no proxification, return target
  return target;
}

/** Takes the settings object and extrapolates it to its
 * most specific form: 1 logLevel per trap per key.
 * @param {Object} settings - The settings object received from the proxify function
 * @returns {undefined}
 */
function normalizeSettings(settings) {
  var keys = settings.keys || [],
      traps = settings.traps || [],
      logLevel = settings.logLevel || 1,
      normalizedKeys = [];

  delete settings.keys;
  delete settings.traps;
  delete settings.logLevel;

  //This needs to be used outside this for-in block so key is a var, not let
  for (let key in settings) {
    if (settings.hasOwnProperty(key)) {
      normalizedKeys.push(key);
      if (Array.isArray(settings[key].traps)) {
        turnSettingsTrapDefinitionsIntoObjects(settings[key], settings[key].traps, logLevel);
      }
      //We only want to inherit down if this key was included at the top level.
      if (keys.includes(key)) {
        //Iterate each trap defined at the top level of the settings object
        //and add it to each key in settings if it wasn't already
        //specified at that lower level.
        traps.forEach(function trapIterationCallback(trap) {
          if (!settings[key].traps[trap]) {
            settings[key].traps[trap] = logLevel;
          }
        });
      }
    }
  }

  /*TODO: The inner foreach is the same as is used above. Can't be declared out of scope because it
    TODO: know the key - but this should be able to be refactored
  */
  keys.forEach(function keysIterationCallback(key) {
    if (!normalizedKeys.includes(key)) {
      settings[key] = {};
      traps.forEach(function trapIterationCallback(trap) {
        if (!settings[key].traps[trap]) {
          settings[key].traps[trap] = logLevel;
        }
      });
    }
  });
}

/**
 * Replaces an array of trap names with their object counterparts
 * @param {Object} keyDef - reference to a specific key in the settings object
 * @param {Object} keyTraps - an array of traps for the key
 * @param {number} logLevel - the default logLevel of the proxy
 * @returns {undefined}
 */
function turnSettingsTrapDefinitionsIntoObjects(keyDef, keyTraps, logLevel) {
  var keyLogLevel = keyDef.logLevel || logLevel;
  //Remove the key's logLevel and reset traps to be an object
  delete keyDef.logLevel;
  keyDef.traps = {};

  //Add each key to the new traps object and set its logLevel to
  //the pre-specified level.
  keyTraps.forEach(function keyTrapsIterationCallback(trap) {
    keyDef.traps[trap] = keyLogLevel;
  });
}
