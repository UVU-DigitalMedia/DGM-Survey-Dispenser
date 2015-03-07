'use strict';

var webpack = require('webpack');

module.exports = {
  context: __dirname,
  entry: './entry.jsx',
  output: {
    path: __dirname,
    filename: 'app.min.js'
  },
  module: {
    loaders: [
      {test: /\.jsx$/, loader: 'jsx-loader'}
    ]
  },
  plugins: [
    // new webpack.optimize.UglifyJsPlugin({
    //   compress: {warnings: false}
    // }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ]
};
