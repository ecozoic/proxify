// https://github.com/deepsweet/babel-istanbul-loader

/*global require*/

// require all tests
const testsContext = require.context('./components/', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all src components
const componentsContext = require.context('../src/components/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
