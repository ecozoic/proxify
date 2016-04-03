
//TODO: Add a collection of available traps or find a way to reuse trapDefs for both
const trapDefs = {
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
 * @returns {Object} - Returns a new config object
 */
export function normalizeConfig() {
  let config = arguments[0];
  const objKeys = arguments[1];
  const availableTraps = arguments[2];
  if (~availableTraps.indexOf('constructor')) {
    availableTraps.splice(availableTraps.indexOf('constructor', 1));
  }

  let newConf = {
    delegatable: config.hasOwnProperty('delegatable') ? config.delegatable : false,
    trapNewProperties: config.hasOwnProperty('trapNewProperties') ? config.trapNewProperties : true,
    name: config.hasOwnProperty('name') ? config.name : undefined
  };

  let keys = config.hasOwnProperty('keys') ? config.keys : [],
    traps = config.hasOwnProperty('traps') ? config.traps : availableTraps,
    normalizedKeys = [],
    logLevel;

  if (config.logLevel && !Number.isInteger(config.logLevel))
    throw 'logLevel value for config object is not an integer';
  else
    logLevel = config.hasOwnProperty('logLevel') ? config.logLevel : 1;

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

  //Iterate the object keys that were specified in the settings object
  for (let key in config) {
    if (config.hasOwnProperty(key)) {
      normalizedKeys.push(key);
      if (typeof config[key].traps === 'object' && !Array.isArray(config[key].traps)) {
        newConf[key] = { traps: {} };
        setConfigKeySpecifiedTraps(newConf[key], config[key], availableTraps);
      }
      else if (Array.isArray(config[key].traps)) {
        newConf[key] = { traps: {} };
        turnSettingsTrapDefinitionsIntoObjects(newConf[key], config[key], availableTraps, logLevel);
      }
      //We only want to inherit down if this key was included at the top level.
      if (keys.includes(key)) {
        if (!newConf[key])
          newConf[key] = { traps: {} };
        inheritTopLevelTraps(newConf[key], traps, availableTraps, logLevel);
      }
    }
  }

  //Get any remaining top-level keys that weren't inherited
  keys.forEach(function keysIterationCallback(key) {
    //If the current key iteration has already been normalizes, continue
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
 * Replaces an array of trap names with their object counterparts.
 * @returns {undefined}
 */
function turnSettingsTrapDefinitionsIntoObjects() {
  let newConfKey = arguments[0];
  const keyDef = arguments[1],
    availableTraps = arguments[2],
    logLevel = arguments[3],
    keyLogLevel = keyDef.logLevel || logLevel,
    keyTraps = keyDef.traps;
  if (!Number.isInteger(keyLogLevel))
    throw 'Cannot set non-integer value for traps';

  //Add each key to the new traps object and set its logLevel to
  //the pre-specified level.
  keyTraps.forEach(function keyTrapsIterationCallback(trap) {
    if (availableTraps.includes(trap))
      this[trap] = keyLogLevel;
  }, newConfKey.traps);
}

/**
 * Sets the most specific level of trap definitions on the new config object.
 * @returns {undefined}
 */
function setConfigKeySpecifiedTraps() {
  let newConfKeyDef = arguments[0];
  const confKeyDef = arguments[1],
    availableTraps = arguments[2];
  for (var trap in confKeyDef.traps) {
    if (!Number.isInteger(confKeyDef.traps[trap]))
      throw 'logLevel for trap is not an integer';
    if (confKeyDef.traps.hasOwnProperty(trap) && ~availableTraps.indexOf(trap) && trapDefs[trap] === 'key') {
      newConfKeyDef.traps[trap] = confKeyDef.traps[trap];
    }
  }
}

/**
 * Set the key specific traps defined at the top level of the options object so they inherit
 * the traps defined above unless specifically overridden. Will not place object specific traps
 * on the keys.
 * @returns {undefined}
 */
function inheritTopLevelTraps() {
  let newConfKeyDef = arguments[0];
  const traps = arguments[1],
    availableTraps = arguments[2],
    logLevel = arguments[3];
  if (!newConfKeyDef.traps)
    newConfKeyDef.traps = {};
  traps.forEach(function trapIterationCallback(trap) {
    if (!this[trap] && ~availableTraps.indexOf(trap) && trapDefs[trap] === 'key') {
      this[trap] = logLevel;
    }
  }, newConfKeyDef.traps);
}

/**
 * Sets the object level traps on the options object.
 * @returns {undefined}
 */
function setObjectLevelTraps() {
  let newConf = arguments[0];
  const traps = arguments[1],
    availableTraps = arguments[2],
    logLevel = arguments[3];
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
