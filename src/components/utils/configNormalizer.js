/**
 * Created by Mark.Mosby on 3/21/2016.
 */

var trapDefs = {
  defineProperty: 'object',
  deleteProperty: 'key',
  get: 'key',
  getOwnPropertyDescriptor: 'key',
  getPrototypeOf: 'object',
  has: 'object',
  isExtensible: 'object',
  ownKeys: 'object',
  preventExtensions: 'object',
  set: 'key',
  setPrototypeOf: 'object',
  apply: 'function',
  construct: 'function'
};

/** Takes the settings object and extrapolates it to its
 * most specific form: 1 logLevel per trap per key.
 * @param {Object} config - The settings object received from the proxify function
 * @param {Array} objKeys - The target object's keys
 * @param {Array} availableTraps - The available traps for this object type
 * @returns {undefined}
 */
export function normalizeConfig(config, objKeys, availableTraps) {
  //TODO: If proxy should delegate, should we add delegated keys here, or check them at run time?
  //TODO: pass in trap handlers from factories to get list of default traps when none are specified in settings
  //TODO: also used trap handlers to compare specified traps before adding due to existence alone
  //TODO: Turn the lower level arrays into sets
  var keys = config.hasOwnProperty('keys') && config.keys || [],
    traps = config.hasOwnProperty('traps') && config.traps || [],
    normalizedKeys = [],
    logLevel = config.hasOwnProperty('logLevel') && config.logLevel && isInteger(config.logLevel) || 1,
    delegatable = config.hasOwnProperty('delegatable') && config.delegatable || false,
    trapNewProps = config.hasOwnProperty('trapNewProperties') && config.trapNewProperties || false,
    name = config.name || '';

  try {
    delete config.keys;
    delete config.traps;
    delete config.logLevel;
    delete config.delegatable;
    delete config.trapNewProperties;
    delete config.name;
  }
  catch(e) {
    //TODO: figure out how to stop proxification if unable to delete settings properties
    return;
  }

  //If a settings object with no keys was passed, default to the keys on the target object
  if (!keys.length && !Object.getOwnPropertyNames(config).length)
    keys = objKeys;

  if (!traps.length)
    traps = Object.getOwnPropertyNames(availableTraps);

  //Iterate the object keys that were specified in the settings object
  for (let key in config) {
    if (config.hasOwnProperty(key)) {
      normalizedKeys.push(key);
      if (Array.isArray(config[key].traps)) {
        turnSettingsTrapDefinitionsIntoObjects(config[key], logLevel);
      }
      //We only want to inherit down if this key was included at the top level.
      if (keys.includes(key)) {
        inheritTopLevelTraps(config[key], traps, availableTraps, logLevel);
        //Iterate each trap defined at the top level of the settings object
        //and add it to each key in settings if it wasn't already
        //specified at that lower level.
        /*traps.forEach(function trapIterationCallback(trap) {
         if (!this[trap]) {
         this[trap] = logLevel;
         }
         },settings[key].traps);*/
      }
    }
  }
  //TODO: update this based on 'keyDefs' and 'availableTraps'
  keys.forEach(function keysIterationCallback(key) {
    if (!normalizedKeys.includes(key)) {
      this[key] = {
        traps: {}
      };
      traps.forEach(function trapIterationCallback(trap) {
        this[trap] = logLevel;
      }, this[key].traps);
    }
  }, config);

  setObjectLevelTraps(config, traps, availableTraps, logLevel);

  //Add these back to the settings object after key normalization
  config.delegatable = delegatable;
  config.trapNewProperties = trapNewProps;

  if (name !== '')
    config.name = name;
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

/**
 * Set the key specific traps defined at the top level of the options object so they inherit
 * the traps defined above unless specifically overridden. Will not place object specific traps
 * on the keys.
 * @param {Object} configKeyDef - The object for 1 key in the options object.
 * @param {Object|Array} traps - The list of traps specified for this proxy at the top level.
 * @param {Array} availableTraps - The list of available traps for this type of object
 * @param {number} logLevel - The given logLevel
 * @returns {undefined}
 */
function inheritTopLevelTraps(configKeyDef, traps, availableTraps, logLevel) {
  if (Array.isArray(traps)) {
    traps.forEach(function trapIterationCallback(trap) {
      if (!this[trap] && availableTraps.includes(trap) && trapDefs[trap] === 'key') {
        this[trap] = logLevel;
      }
    },configKeyDef.traps);
  }
  else if (typeof traps === 'object') {
    for (var trap in traps) {
      if (traps.hasOwnProperty(trap) && isInteger(trap) && !configKeyDef.traps[trap]
        && availableTraps.includes(trap) && trapDefs[trap] === 'key') {
        configKeyDef.traps[trap] = Number(traps[trap]);
      }
    }
  }
}

/**
 * Sets the object level traps on the options object.
 * @param {Object} config - The options object
 * @param {Object|Array} traps - The given traps for the options object
 * @param {Array} availableTraps - The list of available traps for this type of object
 * @param {number} logLevel - The base logLevel for the options object
 */
function setObjectLevelTraps(config, traps, availableTraps, logLevel) {
  config.objectTraps = {};
  if (Array.isArray(traps)) {
    traps.forEach(function trapIterationCallback(trap) {
      if (availableTraps.includes(trap) && (trapDefs[trap] === 'object' || trapDefs[trap] === 'function')) {
        this[trap] = logLevel;
      }
    }, config.objectTraps);
  }
  else if (typeof traps === 'object') {
    for (var trap in traps) {
      if (traps.hasOwnProperty(trap) && isInteger(trap) && availableTraps.includes(trap) &&
        (trapDefs[trap] === 'object' || trapDefs[trap] === 'function')) {
        config.objectTraps[trap] = Number(traps[trap]);
      }
    }
  }
}

/**
 * Determines if the value is or can be coerced to an integer
 * @param {*} value - Any value
 * @returns {boolean} Return true is the value either is an integer or can be coerced to one,
 * any other value will coerce to NaN and thus return false
 */
function isInteger(value) {
  return (typeof parseInt(Number(value.toString()).toString()) === 'number' &&
  parseInt(Number(value.toString()).toString()) === parseInt(Number(value.toString()).toString()));
}
