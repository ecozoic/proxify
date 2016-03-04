// https://github.com/webpack/karma-webpack#alternative-usage

// require all tests
const testsContext = require.context('./', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all src
const componentsContext = require.context('../src/', true, /\.js$/);
componentsContext.keys().forEach(componentsContext);
