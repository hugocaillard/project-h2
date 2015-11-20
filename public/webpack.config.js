var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/js/app.js',
  output: {
    path: './dist',
    filename: 'app.js'
  },
  module: {
    loaders: [
      {
        loader: 'babel',
        exclude: /(node_modules|bower_components)/,
        query: {
          presets: ['es2015']
        },
      }
    ]
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new LiveReloadPlugin()
  ],
  stats: {
    colors: true
  },
  devtool: 'source-map',
};
