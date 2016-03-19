/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/public/assets/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!******************!*\
  !*** multi main ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	module.exports = __webpack_require__(/*! ./index */1);


/***/ },
/* 1 */
/*!******************!*\
  !*** ./index.js ***!
  \******************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.proxify = proxify;
	
	var _factories = __webpack_require__(/*! ./components/factories */ 2);
	
	/** Main entry point for proxify.
	 * Takes in an array, function, or object and returns its proxified version.
	 * For all other types, does nothing and just returns what was passed in.
	 * @param {Array|Object|function} target - The object to be proxified.
	 * @param {Object} settings - The settings for the proxy
	 * @returns {Proxy} The proxified target.
	 */
	function proxify(target) {
	  var settings = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];
	
	  // delegate to appropriate factory
	  if (Array.isArray(target)) {
	    return (0, _factories.proxifyArray)(target, settings);
	  } else if (typeof target === 'function') {
	    return (0, _factories.proxifyFunction)(target, settings);
	  } else if (target !== null && (typeof target === 'undefined' ? 'undefined' : _typeof(target)) === 'object') {
	    return (0, _factories.proxifyObject)(target, settings);
	  }
	
	  // no proxification, return target
	  return target;
	}

/***/ },
/* 2 */
/*!***************************************!*\
  !*** ./components/factories/index.js ***!
  \***************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _proxifyArray = __webpack_require__(/*! ./proxifyArray */ 3);
	
	Object.defineProperty(exports, 'proxifyArray', {
	  enumerable: true,
	  get: function get() {
	    return _proxifyArray.proxifyArray;
	  }
	});
	
	var _proxifyFunction = __webpack_require__(/*! ./proxifyFunction */ 10);
	
	Object.defineProperty(exports, 'proxifyFunction', {
	  enumerable: true,
	  get: function get() {
	    return _proxifyFunction.proxifyFunction;
	  }
	});
	
	var _proxifyObject = __webpack_require__(/*! ./proxifyObject */ 11);
	
	Object.defineProperty(exports, 'proxifyObject', {
	  enumerable: true,
	  get: function get() {
	    return _proxifyObject.proxifyObject;
	  }
	});

/***/ },
/* 3 */
/*!**********************************************!*\
  !*** ./components/factories/proxifyArray.js ***!
  \**********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.proxifyArray = proxifyArray;
	
	var _handlers = __webpack_require__(/*! ../handlers */ 4);
	
	/**
	 * Array proxy factory function.
	 * @param {Array} arr - The target array.
	 * @param {Object} settings - The settings for the proxy
	 * @returns {Proxy} - The proxified array.
	 * @memberof factories
	 */
	function proxifyArray(arr) {
	  return new Proxy(arr, new _handlers.ArrayTrapHandler());
	}

/***/ },
/* 4 */
/*!**************************************!*\
  !*** ./components/handlers/index.js ***!
  \**************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _ArrayTrapHandler = __webpack_require__(/*! ./ArrayTrapHandler */ 5);
	
	Object.defineProperty(exports, 'ArrayTrapHandler', {
	  enumerable: true,
	  get: function get() {
	    return _ArrayTrapHandler.ArrayTrapHandler;
	  }
	});
	
	var _FunctionTrapHandler = __webpack_require__(/*! ./FunctionTrapHandler */ 8);
	
	Object.defineProperty(exports, 'FunctionTrapHandler', {
	  enumerable: true,
	  get: function get() {
	    return _FunctionTrapHandler.FunctionTrapHandler;
	  }
	});
	
	var _ObjectTrapHandler = __webpack_require__(/*! ./ObjectTrapHandler */ 9);
	
	Object.defineProperty(exports, 'ObjectTrapHandler', {
	  enumerable: true,
	  get: function get() {
	    return _ObjectTrapHandler.ObjectTrapHandler;
	  }
	});

/***/ },
/* 5 */
/*!*************************************************!*\
  !*** ./components/handlers/ArrayTrapHandler.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ArrayTrapHandler = undefined;
	
	var _BaseTrapHandler2 = __webpack_require__(/*! ./BaseTrapHandler */ 6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Class representing the traps used to proxy arrays.
	 * Extends {@link handlers.BaseTrapHandler}.
	 * @memberOf handlers
	 */
	
	var ArrayTrapHandler = function (_BaseTrapHandler) {
	  _inherits(ArrayTrapHandler, _BaseTrapHandler);
	
	  function ArrayTrapHandler() {
	    _classCallCheck(this, ArrayTrapHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ArrayTrapHandler).apply(this, arguments));
	  }
	
	  return ArrayTrapHandler;
	}(_BaseTrapHandler2.BaseTrapHandler);
	
	exports.ArrayTrapHandler = ArrayTrapHandler;

/***/ },
/* 6 */
/*!************************************************!*\
  !*** ./components/handlers/BaseTrapHandler.js ***!
  \************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.BaseTrapHandler = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _logger = __webpack_require__(/*! ../utils/logger */ 7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/** Class representing the traps used across all proxify-able types.
	 * @memberOf handlers
	 */
	
	var BaseTrapHandler = function () {
	  function BaseTrapHandler() {
	    _classCallCheck(this, BaseTrapHandler);
	  }
	
	  _createClass(BaseTrapHandler, [{
	    key: 'defineProperty',
	
	    /**
	     * Trap for Object.defineProperty().
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/defineProperty}
	     * @param {Object} target - The target object.
	     * @param {string} property - The name of the property being defined or modified.
	     * @param {Object} descriptor - The descriptor for the property being defined or modified.
	     * @returns {Boolean} Boolean indicating whether or not property definition was successful.
	     */
	    value: function defineProperty(target, property, descriptor) {
	      _logger.logger.log('Property definition on ' + target + ', property: ' + property + ', descriptor: ' + descriptor);
	      return Reflect.defineProperty(target, property, descriptor);
	    }
	
	    /**
	     * Trap for the delete operator.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/deleteProperty}
	     * @param {Object} target - The target object.
	     * @param {string} property - The name of the property to delete.
	     * @returns {Boolean} Boolean indicating whether or not property deletion was successful.
	     */
	
	  }, {
	    key: 'deleteProperty',
	    value: function deleteProperty(target, property) {
	      _logger.logger.log('Property deletion on ' + target + ', property: ' + property);
	      return Reflect.deleteProperty(target, property);
	    }
	
	    /**
	     * Trap for getting a property value.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get}
	     * @param {Object} target - The target object.
	     * @param {string} property - The name of the property to get.
	     * @param {Object} receiver - Either the proxy or an object that inherits from the proxy.
	     * @returns {*} Value of the property.
	     */
	
	  }, {
	    key: 'get',
	    value: function get(target, property, receiver) {
	      _logger.logger.log('Property access on ' + target + ', property: ' + property);
	      return Reflect.get(target, property, receiver);
	    }
	
	    /**
	     * Trap for Object.getOwnPropertyDescriptor().
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor}
	     * @param {Object} target - The target object.
	     * @param {string} property - The name of the property whose description should be retrieved.
	     * @returns {Object|undefined} The descriptor object or undefined if property is undefined.
	     */
	
	  }, {
	    key: 'getOwnPropertyDescriptor',
	    value: function getOwnPropertyDescriptor(target, property) {
	      _logger.logger.log('Property descriptor access on ' + target + ', property: ' + property);
	      return Reflect.getOwnPropertyDescriptor(target, property);
	    }
	
	    /**
	     * Trap for [[GetPrototypeOf]] internal method.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getPrototypeOf}
	     * @param {Object} target - The target object.
	     * @returns {Object|null} The prototype object or null if object has no prototype.
	     */
	
	  }, {
	    key: 'getPrototypeOf',
	    value: function getPrototypeOf(target) {
	      _logger.logger.log('[[GetPrototypeOf]] on ' + target);
	      return Reflect.getPrototypeOf(target);
	    }
	
	    /**
	     * Trap for the in operator.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/has}
	     * @param {Object} target - The target object.
	     * @param {property} - The name of the property to check for existence.
	     * @returns {Boolean} Boolean indicating whether or not property exists.
	     */
	
	  }, {
	    key: 'has',
	    value: function has(target, property) {
	      _logger.logger.log('Property query on ' + target + ', property: ' + property);
	      return Reflect.has(target, property);
	    }
	
	    /**
	     * Trap for Object.isExtensible().
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/isExtensible}
	     * @param {Object} target - The target object.
	     * @returns {Boolean} Boolean indicating whether or not target is extensible.
	     */
	
	  }, {
	    key: 'isExtensible',
	    value: function isExtensible(target) {
	      _logger.logger.log('Extensibility check on ' + target);
	      return Reflect.isExtensible(target);
	    }
	
	    /**
	     * Trap for Object.getOwnPropertyNames().
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/ownKeys}
	     * @param {Object} target - The target object.
	     * @returns {string[]|Symbol[]} Enumerable representing the object's own keys.
	     */
	
	  }, {
	    key: 'ownKeys',
	    value: function ownKeys(target) {
	      _logger.logger.log('Own key enumeration on ' + target);
	      return Reflect.ownKeys(target);
	    }
	
	    /**
	     * Trap for Object.preventExtensions().
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/preventExtensions}
	     * @param {Object} target - The target object.
	     * @returns {Boolean} Boolean indicating whether or not target is extensible.
	     */
	
	  }, {
	    key: 'preventExtensions',
	    value: function preventExtensions(target) {
	      _logger.logger.log('Prevent extensions call on ' + target);
	      return Reflect.preventExtensions(target);
	    }
	
	    /**
	     * Trap for setting a property value.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/set}
	     * @param {Object} target - The target object.
	     * @param {string} property - The name of the property to set.
	     * @param {*} value - The new value of the property to set.
	     * @param {Object} receiver - The object to which the assignment was originally directed.
	     * @returns {Boolean} Boolean indicating whether assignment was successful.
	     */
	
	  }, {
	    key: 'set',
	    value: function set(target, property, value, receiver) {
	      _logger.logger.log('Property write on ' + target + ', property: ' + property + ', value: ' + value);
	      return Reflect.set(target, property, value, receiver);
	    }
	
	    /**
	     * Trap for Object.setPrototypeOf().
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/setPrototypeOf}
	     * @param {Object} target - The target object.
	     * @param {Object|null} - The object's new prototype or null.
	     * @returns {Boolean} Boolean indicating whether prototype was successfully set.
	     */
	
	  }, {
	    key: 'setPrototypeOf',
	    value: function setPrototypeOf(target, prototype) {
	      _logger.logger.log('setPrototypeOf called on ' + target + ', prototype: ' + prototype);
	      return Reflect.setPrototypeOf(target, prototype);
	    }
	  }]);
	
	  return BaseTrapHandler;
	}();
	
	exports.BaseTrapHandler = BaseTrapHandler;

/***/ },
/* 7 */
/*!************************************!*\
  !*** ./components/utils/logger.js ***!
  \************************************/
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	/**
	 * Logging utility class.
	 * Exported as singleton so all modules share same instance.
	 * @memberOf utils
	 */
	
	var Logger = function () {
	  function Logger() {
	    _classCallCheck(this, Logger);
	  }
	
	  _createClass(Logger, [{
	    key: "log",
	
	    /**
	     * Logs a message to the console.
	     * @param {string} msg - Message to log.
	     */
	    value: function log(msg) {
	      console.log(msg);
	    }
	
	    /**
	     * Logs an error message to the console.
	     * @param {string} msg - Error message to log.
	     */
	
	  }, {
	    key: "logError",
	    value: function logError(msg) {
	      console.error(msg);
	    }
	
	    /**
	     * Logs an info message to the console.
	     * @param {string} msg - Info message to log.
	     */
	
	  }, {
	    key: "logInfo",
	    value: function logInfo(msg) {
	      console.info(msg);
	    }
	
	    /**
	     * Logs a warning message to the console.
	     * @param {string} msg - Warning message to log.
	     */
	
	  }, {
	    key: "logWarn",
	    value: function logWarn(msg) {
	      console.warn(msg);
	    }
	  }]);
	
	  return Logger;
	}();
	
	// singleton
	
	
	var logger = new Logger();
	exports.logger = logger;

/***/ },
/* 8 */
/*!****************************************************!*\
  !*** ./components/handlers/FunctionTrapHandler.js ***!
  \****************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.FunctionTrapHandler = undefined;
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _BaseTrapHandler2 = __webpack_require__(/*! ./BaseTrapHandler */ 6);
	
	var _logger = __webpack_require__(/*! ../utils/logger */ 7);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Class representing the traps used to proxy functions.
	 * Extends {@link handlers.BaseTrapHandler}.
	 * @memberOf handlers
	 */
	
	var FunctionTrapHandler = function (_BaseTrapHandler) {
	  _inherits(FunctionTrapHandler, _BaseTrapHandler);
	
	  function FunctionTrapHandler() {
	    _classCallCheck(this, FunctionTrapHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(FunctionTrapHandler).apply(this, arguments));
	  }
	
	  _createClass(FunctionTrapHandler, [{
	    key: 'apply',
	
	    /**
	     * Trap for a function call.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply}
	     * @param {Object} target - The target object.
	     * @param {Object} thisArg - The this argument for a function call.
	     * @param {Array} argumentsList - The list of arguments for the call.
	     * @returns {*} The return value of the function.
	     */
	    value: function apply(target, thisArg, argumentsList) {
	      _logger.logger.log('Function call on ' + target + ', this: ' + thisArg + ', args: ' + argumentsList);
	      return Reflect.apply(target, thisArg, argumentsList);
	    }
	
	    /**
	     * Trap for the new operator.
	     * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/construct}
	     * @param {Object} target - The target object.
	     * @param {Array} argumentsList - The list of arguments for the call.
	     * @returns {Object} The new object.
	     */
	
	  }, {
	    key: 'construct',
	    value: function construct(target, argumentsList) {
	      _logger.logger.log('Constructor call on ' + target + ', args: ' + argumentsList);
	      return Reflect.construct(target, argumentsList);
	    }
	  }]);
	
	  return FunctionTrapHandler;
	}(_BaseTrapHandler2.BaseTrapHandler);
	
	exports.FunctionTrapHandler = FunctionTrapHandler;

/***/ },
/* 9 */
/*!**************************************************!*\
  !*** ./components/handlers/ObjectTrapHandler.js ***!
  \**************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.ObjectTrapHandler = undefined;
	
	var _BaseTrapHandler2 = __webpack_require__(/*! ./BaseTrapHandler */ 6);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	/**
	 * Class representing the traps used to proxy objects.
	 * Extends {@link handlers.BaseTrapHandler}.
	 * @memberOf handlers
	 */
	
	var ObjectTrapHandler = function (_BaseTrapHandler) {
	  _inherits(ObjectTrapHandler, _BaseTrapHandler);
	
	  function ObjectTrapHandler() {
	    _classCallCheck(this, ObjectTrapHandler);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(ObjectTrapHandler).apply(this, arguments));
	  }
	
	  return ObjectTrapHandler;
	}(_BaseTrapHandler2.BaseTrapHandler);
	
	exports.ObjectTrapHandler = ObjectTrapHandler;

/***/ },
/* 10 */
/*!*************************************************!*\
  !*** ./components/factories/proxifyFunction.js ***!
  \*************************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.proxifyFunction = proxifyFunction;
	
	var _handlers = __webpack_require__(/*! ../handlers */ 4);
	
	/**
	 * Function proxy factory function.
	 * @param {function} fn - The target function.
	 * @param {Object} settings - The settings for the proxy
	 * @returns {Proxy} - The proxified function.
	 * @memberOf factories
	 */
	function proxifyFunction(fn) {
	  return new Proxy(fn, new _handlers.FunctionTrapHandler());
	}

/***/ },
/* 11 */
/*!***********************************************!*\
  !*** ./components/factories/proxifyObject.js ***!
  \***********************************************/
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.proxifyObject = proxifyObject;
	
	var _handlers = __webpack_require__(/*! ../handlers */ 4);
	
	/**
	 * Object proxy factory function.
	 * @param {Object} obj - The target object.
	 * @param {Object} settings - The settings for the proxy
	 * @returns {Proxy} The proxified object.
	 * @memberOf factories
	 */
	function proxifyObject(obj) {
	  return new Proxy(obj, new _handlers.ObjectTrapHandler());
	}

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map