/**
 * Created by Mark.Mosby on 3/25/2016.
 */
var proxyState = {};

Object.defineProperties(
  proxyState, {
    /**
     * Adds a new config object to the proxyState
     * @param {Object} config - The config object to be added to the proxyState.
     * @param {Symbol} symbol - The symbol used as the key for the config object.
     * @returns {undefined}
     */
    'add': {
      value: function _add(config, symbol) {
        this[symbol] = config;
      },
      writable: false,
      configurable: false,
      enumerable: true
    },
    /**
     * Returns a config object from the proxyState by its symbol
     * @param {Symbol} symbol - A symbol used as the key to retrieve the config object.
     * @returns {Object} config - The config object.
     */
    'get': {
      value: function _get(symbol) {
        return this[symbol];
      },
      writable: false,
      configurable: false,
      enumerable: true
    },
    /**
     * Remove a config object from the proxyState.
     * @param {Symbol} symbol - A symbol used as the key to remove the config object.
     * @returns {undefined}
     */
    'delete': {
      value: function _delete(symbol) {
        delete this[symbol];
      },
      writable: false,
      configurable: false,
      enumerable: true
    }
  }
);

export { proxyState }
