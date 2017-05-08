/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');
/* eslint-enable import/no-extraneous-dependencies */
if (typeof window === 'undefined') {
  global.window = {};
}

const outputPath = path.join(process.cwd(), 'server', 'generated');

module.exports = {
  name: 'server',
  target: 'web',
  externals: [
    nodeExternals(),
  ],
  entry: [
    path.join(process.cwd(), 'app/server.js'),
  ],
  output: {
    path: outputPath,
    filename: 'server.js',
    publicPath: '/',
    libraryTarget: 'commonjs2',
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: {
        plugins: [
          'dynamic-import-node',
        ],
      },
    }, {
      test: /\.(eot|otf|ttf|woff|woff2)$/,
      loader: [
        {
          loader: 'file-loader',
          query: {
            emitFile: false,
          },
        },
      ],
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(svg|jpg|png|gif)$/,
      loaders: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          query: {
            progressive: true,
            optimizationLevel: 7,
            interlaced: false,
            pngquant: {
              quality: '65-90',
              speed: 4,
            },
          },
        },
      ],
    }],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(true),

    new webpack.optimize.LimitChunkCountPlugin({ maxChunks: 1 }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
      '__CLIENT__': false,
      '__SERVER__': true,
    }),
  ],
  resolve: {
    alias: {
      'env-config': path.join(process.cwd(), 'app', 'environment', `${process.env.NODE_ENV}.js`),
    },
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
  },
};
