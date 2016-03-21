/**
 * Created by Mark.Mosby on 3/21/2016.
 */

/** Takes the settings object and extrapolates it to its
 * most specific form: 1 logLevel per trap per key.
 * @param {Object} settings - The settings object received from the proxify function
 * @param {Array} objKeys - The target object's keys
 * @returns {undefined}
 */
export function normalizeSettings(settings, objKeys) {
  //TODO: If proxy should delegate, should we add delegated keys here, or check them at run time?
  //TODO: If no traps are defined at the top level, figure out a way to get a reference to the appropriate object type traps
  var keys = settings.keys || [],
    traps = settings.traps || [],
    normalizedKeys = [],
    logLevel = settings.logLevel || 1,
    delegatable = settings.delegatable || false,
    trapNewProps = settings.trapNewProperties || false,
    name = settings.name || '';

  delete settings.keys;
  delete settings.traps;
  delete settings.logLevel;
  delete settings.delegatable;
  delete settings.trapNewProperties;
  delete settings.name;

  //If a settings object with no keys was passed, default to the keys on the target object
  if (!keys.length && !Object.getOwnPropertyNames(settings).length)
    keys = objKeys;

  //Iterate the object keys that were specified in the settings object
  for (let key in settings) {
    if (settings.hasOwnProperty(key)) {
      normalizedKeys.push(key);
      if (Array.isArray(settings[key].traps)) {
        turnSettingsTrapDefinitionsIntoObjects(settings[key], logLevel);
      }
      //We only want to inherit down if this key was included at the top level.
      if (keys.includes(key)) {
        //Iterate each trap defined at the top level of the settings object
        //and add it to each key in settings if it wasn't already
        //specified at that lower level.
        traps.forEach(function trapIterationCallback(trap) {
          if (!this[trap]) {
            this[trap] = logLevel;
          }
        },settings[key].traps);
      }
    }
  }

  keys.forEach(function keysIterationCallback(key) {
    if (!normalizedKeys.includes(key)) {
      this[key] = {
        traps: {}
      };
      traps.forEach(function trapIterationCallback(trap) {
        this[trap] = logLevel;
      }, this[key].traps);
    }
  }, settings);

  //Add these back to the settings object after key normalization
  settings.delegatable = delegatable;
  settings.trapNewProperties = trapNewProps;

  if (name !== '')
    settings.name = name;
}

/**
 * Replaces an array of trap names with their object counterparts
 * @param {Object} keyDef - reference to a specific key in the settings object
 * @param {number} logLevel - the default logLevel of the proxy
 * @returns {undefined}
 */
function turnSettingsTrapDefinitionsIntoObjects(keyDef, logLevel) {
  var keyLogLevel = keyDef.logLevel || logLevel,
    keyTraps = keyDef.traps;
  //Remove the key's logLevel and reset traps to be an object
  delete keyDef.logLevel;
  keyDef.traps = {};

  //Add each key to the new traps object and set its logLevel to
  //the pre-specified level.
  keyTraps.forEach(function keyTrapsIterationCallback(trap) {
    this[trap] = keyLogLevel;
  }, keyDef.traps);
}
