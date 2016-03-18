// https://github.com/webpack/karma-webpack#alternative-usage

// require all tests
const testsContext = require.context('./', true, /\.spec\.js$/);
testsContext.keys().forEach(testsContext);

// require all src
const srcContext = require.context('../src/', true, /\.js$/);
srcContext.keys().forEach(srcContext);
