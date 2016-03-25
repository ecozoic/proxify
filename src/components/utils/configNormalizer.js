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
 * @returns {Object} - Returns a new config object
 */
export function normalizeConfig(config, objKeys, availableTraps) {
  if (~availableTraps.indexOf('constructor')) {
    availableTraps.splice(availableTraps.indexOf('constructor', 1));
  }

  var newConf = {
    delegatable: config.hasOwnProperty('delegatable') && config.delegatable || false,
    trapNewProperties: config.hasOwnProperty('trapNewProperties') && config.trapNewProperties || true,
    name: config.name || undefined
  };
  //TODO: If proxy should delegate, should we add delegated keys here, or check them at run time?
  //TODO: pass in trap handlers from factories to get list of default traps when none are specified in settings
  //TODO: also used trap handlers to compare specified traps before adding due to existence alone
  //TODO: Turn the lower level arrays into sets
  var keys = config.hasOwnProperty('keys') && config.keys || [],
    traps = config.hasOwnProperty('traps') && config.traps || [],
    normalizedKeys = [],
    logLevel;

  if (config.logLevel && !Number.isInteger(config.logLevel))
    throw 'logLevel value for config object is not an integer';
  else
    logLevel = config.hasOwnProperty('logLevel') && config.logLevel  || 1;

  try {
    delete config.keys;
    delete config.traps;
    delete config.logLevel;
    delete config.delegatable;
    delete config.trapNewProperties;
    delete config.name;
  }
  catch(e) {
    throw 'Unable to delete properties from provided config object.';
  }

  //If a settings object with no keys was passed, default to the keys on the target object
  if (!keys.length && !Object.getOwnPropertyNames(config).length)
    keys = objKeys;

  if (!traps.length)
    traps = availableTraps;

  //Iterate the object keys that were specified in the settings object
  for (let key in config) {
    if (config.hasOwnProperty(key)) {
      normalizedKeys.push(key);
      if (Array.isArray(config[key].traps)) {
        newConf[key] = {};
        turnSettingsTrapDefinitionsIntoObjects(newConf[key], config[key], logLevel);
      }
      //We only want to inherit down if this key was included at the top level.
      if (keys.includes(key)) {
        inheritTopLevelTraps(newConf[key], traps, availableTraps, logLevel);
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

  keys.forEach(function keysIterationCallback(key) {
    if (!normalizedKeys.includes(key)) {
      this[key] = {
        traps: {}
      };
      traps.forEach(function trapIterationCallback(trap) {
        if (~availableTraps.indexOf(trap) && trapDefs[trap] === 'key')
          this[trap] = logLevel;
      }, this[key].traps);
    }
  }, newConf);

  setObjectLevelTraps(newConf, traps, availableTraps, logLevel);
  return newConf;
}

/**
 * Replaces an array of trap names with their object counterparts
 * @param {Object} newConfKey - The key definition for the new config object being created
 * @param {Object} keyDef - reference to a specific key in the settings object
 * @param {number} logLevel - the default logLevel of the proxy
 * @returns {undefined}
 */
function turnSettingsTrapDefinitionsIntoObjects(newConfKey, keyDef, logLevel) {
  var keyLogLevel = keyDef.logLevel || logLevel,
    keyTraps = keyDef.traps;
  //Remove the key's logLevel and reset traps to be an object
  delete keyDef.logLevel;
  newConfKey.traps = {};

  //Add each key to the new traps object and set its logLevel to
  //the pre-specified level.
  keyTraps.forEach(function keyTrapsIterationCallback(trap) {
    this[trap] = keyLogLevel;
  }, newConfKey.traps);
}

/**
 * Set the key specific traps defined at the top level of the options object so they inherit
 * the traps defined above unless specifically overridden. Will not place object specific traps
 * on the keys.
 * @param {Object} newConfKeyDef - The key definition for the new config object.
 * @param {Object|Array} traps - The list of traps specified for this proxy at the top level.
 * @param {Array} availableTraps - The list of available traps for this type of object
 * @param {number} logLevel - The given logLevel
 * @returns {undefined}
 */
function inheritTopLevelTraps(newConfKeyDef, traps, availableTraps, logLevel) {
  if (Array.isArray(traps)) {
    traps.forEach(function trapIterationCallback(trap) {
      if (!this[trap] && ~availableTraps.indexOf(trap) && trapDefs[trap] === 'key') {
        this[trap] = logLevel;
      }
    },newConfKeyDef.traps);
  }
  else if (typeof traps === 'object') {
    for (var trap in traps) {
      if (traps.hasOwnProperty(trap) && !newConfKeyDef.traps[trap] && ~availableTraps.indexOf(trap) && trapDefs[trap] === 'key') {
        if (!Number.isInteger(trap))
          throw 'logLevel value for ' + trap + ' is not an integer';
        newConfKeyDef.traps[trap] = Number(traps[trap]);
      }
    }
  }
}

/**
 * Sets the object level traps on the options object.
 * @param {Object} newConf - The new config object
 * @param {Object|Array} traps - The given traps for the options object
 * @param {Array} availableTraps - The list of available traps for this type of object
 * @param {number} logLevel - The base logLevel for the options object
 */
function setObjectLevelTraps(newConf, traps, availableTraps, logLevel) {
  newConf.objectTraps = {};
  if (Array.isArray(traps)) {
    traps.forEach(function trapIterationCallback(trap) {
      if (~availableTraps.indexOf(trap) && (trapDefs[trap] === 'object' || trapDefs[trap] === 'function')) {
        this[trap] = logLevel;
      }
    }, newConf.objectTraps);
  }
  else if (typeof traps === 'object') {
    for (var trap in traps) {
      if (traps.hasOwnProperty(trap) && ~availableTraps.indexOf(trap) && (trapDefs[trap] === 'object' || trapDefs[trap] === 'function')) {
        if (!Number.isInteger(trap))
          throw 'logLevel value for ' + trap + ' is not an integer';
        newConf.objectTraps[trap] = Number(traps[trap]);
      }
    }
  }
}
