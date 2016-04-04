var trapDefinitions = {
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

Object.defineProperty(
  trapDefinitions,
  'keys', {
    /**
     * Returns an array of traps on the trapDefinitions object by type
     * @param {string} types - The types of traps desired (property, object, function, objectAll, functionAll, all)
     * @returns {Array} - An array of the requested traps of the specified type
     */
    value: function _getKeys(types) {
      switch (types) {
      case 'property':
        return getTrapKeys('key');
        break;
      case 'object':
        return getTrapKeys('object');
        break;
      case 'function':
        return getTrapKeys('function');
        break;
      case 'objectAll':
        return getTrapKeys('key', 'object');
        break;
      case 'functionAll':
        return getTrapKeys('key', 'function');
        break;
      case 'all':
        return getTrapKeys('key', 'object', 'function');
        break;
      default:
        return [];
        break;
      }
    },
    writable: false,
    enumerable: false,
    configurable: false
  }
);

/**
 * Iterates the various traps in the trapDefinitions object and determines
 * which values should be returned.
 * @param {Array} types - An array of requested object trap types
 * @returns {Array} - Array of traps available for the requested type
 */
function getTrapKeys(...types) {
  const retArr = [];
  Array.from(Object.keys(trapDefinitions)).forEach(function trapIterationCallback(trap) {
    if (this.includes(trapDefinitions[trap]))
      retArr.push(trap);
  }, types);
  return retArr;
}

export { trapDefinitions };
