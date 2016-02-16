var webpack = require('webpack');
var path = require('path');

module.exports = function(config) {
  config.set({
    browsers: ['Chrome'],
    singleRun: true,
    frameworks: ['mocha'],
    files: [
      'test/index.js'
    ],
    plugins: [
      'karma-chrome-launcher',
      'karma-mocha',
      'karma-sourcemap-loader',
      'karma-webpack',
      'karma-coverage',
      'karma-mocha-reporter'
    ],
    preprocessors: {
      'test/index.js': [ 'webpack', 'sourcemap']
    },
    reporters: ['mocha', 'coverage'],
    webpack: {
      devtool: 'inline-source-map',
      module: {
        preLoaders: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'eslint-loader'
          }
        ],
        loaders: [
          {
            test: /\.js$/,
            exclude: [
              path.resolve('node_modules/'),
              path.resolve('src/components/')
            ],
            loader: 'babel-loader'
          },
          {
            test: /\.js$/,
            include: path.resolve('src/components/'),
            loader: 'babel-istanbul-loader'
          }
        ]
      },
      resolve: {
        extensions: ['', '.js']
      }
    },
    webpackServer: {
      noInfo: true
    },
    coverageReporter: {
      type: 'html',
      dir: 'coverage/'
    }
  });
};
