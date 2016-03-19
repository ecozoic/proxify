# proxify

[![Build Status](https://travis-ci.org/ecozoic/proxify.svg?branch=master)](https://travis-ci.org/ecozoic/proxify) [![Dependency Status](https://david-dm.org/ecozoic/proxify.svg)](https://david-dm.org/ecozoic/proxify) [![devDependency Status](https://david-dm.org/ecozoic/proxify/dev-status.png)](https://david-dm.org/ecozoic/proxify#info=devDependencies) [![NPM Version](https://img.shields.io/npm/v/proxify-js.svg)](https://www.npmjs.com/package/proxify-js) [![Download Total](https://img.shields.io/npm/dt/proxify-js.svg)](https://www.npmjs.com/package/proxify-js) [![Code Climate](https://codeclimate.com/github/ecozoic/proxify/badges/gpa.svg)](https://codeclimate.com/github/ecozoic/proxify) [![Test Coverage](https://codeclimate.com/github/ecozoic/proxify/badges/coverage.svg)](https://codeclimate.com/github/ecozoic/proxify/coverage) [![License](https://img.shields.io/npm/l/proxify-js.svg)](https://opensource.org/licenses/MIT)

**proxify** provides ES6 proxies of objects, arrays, and functions with embedded logging functionality to assist in diagnostics or profiling.

## Installation

```
npm install --save proxify-js
```

## Features

```javascript
import { proxify } from 'proxify-js';

var target = new MyObject();
    target = proxify(target);
```

Note: If you want to keep a reference to the proxified object, then you should 
assign the proxy to a different variable:
```javascript
const proxy = proxify(target);
```

Doing so however will mean all usages of the target object will need to be replaced 
with the proxy reference in order to make use of proxify's logging capabilities.

Once an object has been proxified, you can send it on its merry way through the rest of your application and see logging statements indicating how your application is consuming your object.

```javascript
function doSomething(obj) {
  const price = obj.price;
  const quantity = obj.quantity;

  obj.total = price * quantity;
}

// send in the proxy instead of the original object
doSomething(proxy);
```

You'll seen an output in the console similar to this:

```
Property access on [object Object], property: price
Property access on [object Object], property: quantity
Property write on [object Object], property: total, value: price * quantity
Property descriptor access on [object Object], property: total
Property definition on [object Object], property: total, descriptor { ... }
``` 

**Notes**
* It's useful to override Object#toString() to get a more helpful description of your object in the logs
* Proxies are only available in the latest browsers. Check the [ES6 Compatibility table](https://kangax.github.io/compat-table/es6/).
* Check out the awesome [MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler) documentation on proxies to learn more about the various traps and the operations they intercept.
* Also check the [ES6 Reflection](http://www.ecma-international.org/ecma-262/6.0/#sec-reflection) and [ES6 Proxy](http://www.ecma-international.org/ecma-262/6.0/#sec-proxy-object-internal-methods-and-internal-slots) specifications.

## Development

To start the [Webpack dev server](https://github.com/webpack/webpack-dev-server):


```javascript
npm start
```

To run [Mocha](https://github.com/mochajs/mocha) unit tests in [Karma](https://github.com/karma-runner/karma) and generate [Istanbul](https://github.com/gotwarlost/istanbul) coverage reports:

```javascript
npm test
```

To build [Webpack](https://github.com/webpack/webpack) bundles:

```javascript
npm run build:dev
npm run build:prod
```

To generate [jsdoc](https://github.com/jsdoc3/jsdoc) documentation:

```javascript
npm run doc
```

## Roadmap
* Configuration layer (customize which keys and traps trigger logging)
* Support multiple/custom reporters
* Deep (recursive) proxification
* Add more useful metadata to logs (stack traces, timestamps, etc)
