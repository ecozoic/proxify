# proxyify

**proxify** provides ES6 proxies of objects, arrays, and functions with embedded logging functionality to assist in diagnostics or profiling.

```javascript
import { proxify } from 'path/to/proxify';

const target = new MyObject();
const proxy = proxify(target);
```

**Notes**
* Proxies are only available in the latest browsers. Check the [ES6 Compatibility table][https://kangax.github.io/compat-table/es6/].
* Check out the awesome [MDN][https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler] documentation on proxies to learn more about the various traps and the operations they intercept.

## Development ##

To start the [Webpack dev server][https://github.com/webpack/webpack-dev-server]:


```javascript
npm start
```

To run [Karma][https://github.com/karma-runner/karma] unit tests and generate [Istanbul][https://github.com/gotwarlost/istanbul] coverage reports:

```javascript
npm test
```

To build [Webpack][https://github.com/webpack/webpack] bundles:

```javascript
npm run build:dev
npm run build:prod
```

To generate [jsdoc][https://github.com/jsdoc3/jsdoc] documentation:

```javascript
npm run doc
```
