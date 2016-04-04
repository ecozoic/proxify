
import { trapDefinitions } from './trapDefinitions';

/** Takes the settings object and extrapolates it to its
 * most specific form: 1 logLevel per trap per key.
 * @param {Object} config - The settings object received from the proxify function
 * @param {Array} objKeys - The target object's keys
 * @param {Array} availableTraps - The available traps for this object type
 * @returns {Object} - Returns a new config object
 */
export function normalizeConfig(config, objKeys, availableTraps) {
  {
    let logLevel;
    const _objKeys = objKeys,
      _availableTraps = availableTraps,
      _config = config,
      keys = _config.hasOwnProperty('keys') ? _config.keys : Object.getOwnPropertyNames(config).length ? Object.getOwnPropertyNames(config) : _objKeys,
      traps = _config.hasOwnProperty('traps') ? _config.traps : _availableTraps,
      normalizedKeys = [],
      newConf = {
        delegatable: _config.hasOwnProperty('delegatable') ? _config.delegatable : false,
        trapNewProperties: _config.hasOwnProperty('trapNewProperties') ? _config.trapNewProperties : true,
        name: _config.hasOwnProperty('name') ? _config.name : undefined
      };

    if (_config.logLevel && !Number.isInteger(_config.logLevel))
      throw 'logLevel value for config object is not an integer';
    else
      logLevel = _config.hasOwnProperty('logLevel') ? _config.logLevel : 1;
    const _logLevel = logLevel;

    try {
      delete _config.keys;
      delete _config.traps;
      delete _config.logLevel;
      delete _config.delegatable;
      delete _config.trapNewProperties;
      delete _config.name;
    }
    catch (e) {
      throw 'Unable to delete properties from provided config object.';
    }

    //Iterate the object keys that were specified in the settings object
    for (let key in _config) {
      if (_config.hasOwnProperty(key)) {
        normalizedKeys.push(key);
        if (typeof _config[key].traps === 'object' && !Array.isArray(_config[key].traps)) {
          newConf[key] = {traps: {}};
          setConfigKeySpecifiedTraps(newConf[key], _config[key], _availableTraps);
        }
        else if (Array.isArray(_config[key].traps)) {
          newConf[key] = {traps: {}};
          turnSettingsTrapDefinitionsIntoObjects(newConf[key], _config[key], _availableTraps, _logLevel);
        }
        //We only want to inherit down if this key was included at the top level.
        if (keys.includes(key)) {
          if (!newConf[key])
            newConf[key] = {traps: {}};
          inheritTopLevelTraps(newConf[key], traps, _availableTraps, _logLevel);
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
          if (_availableTraps.includes(trap) && trapDefinitions[trap] === 'key')
            this[trap] = _logLevel;
        }, this[key].traps);
      }
    }, newConf);

    setObjectLevelTraps(newConf, traps, _availableTraps, _logLevel);
    return newConf;
  }
}

/**
 * Replaces an array of trap names with their object counterparts.
 * @param {Object} keyDef - Reference to a specific key in the settings object.
 * @param {Object} newConfKey - The key definition for the new config object being created.
 * @param {Array} availableTraps - An array of available traps.
 * @param {number} logLevel - The default logLevel of the proxy.
 * @returns {undefined}
 */
function turnSettingsTrapDefinitionsIntoObjects(newConfKey, keyDef, availableTraps, logLevel) {
  {
    const _availableTraps = availableTraps,
      _logLevel = logLevel,
      keyLogLevel = keyDef.logLevel || _logLevel,
      keyTraps = keyDef.traps;
    if (!Number.isInteger(keyLogLevel))
      throw 'Cannot set non-integer value for traps';

    //Add each key to the new traps object and set its logLevel to
    //the pre-specified level.
    keyTraps.forEach(function keyTrapsIterationCallback(trap) {
      if (_availableTraps.includes(trap))
        this[trap] = keyLogLevel;
    }, newConfKey.traps);
  }
}

/**
 * Sets the most specific level of trap definitions on the new config object.
 * @param {Object} newConfKeyDef - The new config object's key's definition.
 * @param {Object} confKeyDef - The config object's key's definition.
 * @param {Array} availableTraps - An array of available traps.
 * @returns {undefined}
 */
function setConfigKeySpecifiedTraps(newConfKeyDef, confKeyDef, availableTraps) {
  {
    const _confKeyDef = confKeyDef,
      _availableTraps = availableTraps;
    for (let trap in _confKeyDef.traps) {
      if (!Number.isInteger(_confKeyDef.traps[trap]))
        throw 'logLevel for trap is not an integer';
      if (_confKeyDef.traps.hasOwnProperty(trap) && _availableTraps.includes(trap) && trapDefinitions[trap] === 'key') {
        newConfKeyDef.traps[trap] = _confKeyDef.traps[trap];
      }
    }
  }
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
  {
    const _traps = traps,
      _availableTraps = availableTraps,
      _logLevel = logLevel;
    if (!newConfKeyDef.traps)
      newConfKeyDef.traps = {};
    _traps.forEach(function trapIterationCallback(trap) {
      if (!this[trap] && _availableTraps.includes(trap) && trapDefinitions[trap] === 'key') {
        this[trap] = _logLevel;
      }
    }, newConfKeyDef.traps);
  }
}

/**
 * Sets the object level traps on the options object.
 * @param {Object} newConf - The new config object
 * @param {Object|Array} traps - The given traps for the options object
 * @param {Array} availableTraps - The list of available traps for this type of object
 * @param {number} logLevel - The base logLevel for the options object
 * @returns {undefined}
 */
function setObjectLevelTraps(newConf, traps, availableTraps, logLevel) {
  {
    const _traps = traps,
      _availableTraps = availableTraps,
      _logLevel = logLevel;
    newConf.objectTraps = {};
    if (Array.isArray(_traps)) {
      _traps.forEach(function trapIterationCallback(trap) {
        if (_availableTraps.includes(trap) && (trapDefinitions[trap] === 'object' || trapDefinitions[trap] === 'function')) {
          this[trap] = _logLevel;
        }
      }, newConf.objectTraps);
    }
    else if (typeof _traps === 'object') {
      for (let trap in _traps) {
        if (_traps.hasOwnProperty(trap) && _availableTraps.includes(trap) && (trapDefinitions[trap] === 'object' || trapDefinitions[trap] === 'function')) {
          if (!Number.isInteger(trap))
            throw 'logLevel value for ' + trap + ' is not an integer';
          newConf.objectTraps[trap] = Number(_traps[trap]);
        }
      }
    }
  }
}
