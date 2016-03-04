// https://github.com/webpack/karma-webpack#alternative-usage

// require all tests
const testsContext = require.context('./components/', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all src components
const componentsContext = require.context('../src/components/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
