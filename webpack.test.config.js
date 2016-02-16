var path = require('path');

module.exports = {
  entry: ['mocha!./test/index'],
  output: {
    path: path.resolve('build/'),
    publicPath: '/test/assets/',
    filename: 'bundle.test.js'
  },

  devServer: {
    contentBase: 'test',
    host: 'localhost',
    port: 8081
  },

  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      }
    ],
    loaders: [
      // transpile all files except testing sources with babel as usual
      {
        test: /\.js$/,
        exclude: [
          path.resolve('node_modules/'),
          path.resolve('src/components/')
        ],
        loader: 'babel-loader'
      },
      // transpile and instrument only testing sources with babel-istanbul
      {
        test: /\.js$/,
        include: path.resolve('src/components'),
        loader: 'babel-istanbul-loader'
      }
    ]
  },

  resolve: {
    extensions: ['', '.js']
  }
};
