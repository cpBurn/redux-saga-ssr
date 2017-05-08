/**
 * COMMON WEBPACK CONFIGURATION
 */

/* eslint-disable import/no-extraneous-dependencies */
/* eslint no-console: 0 */
const path = require('path');
const webpack = require('webpack');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const WebpackAppversionPlugin = require('webpack-appversion-plugin');
const SpritesmithPlugin = require('webpack-spritesmith');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const AssetsPlugin = require('assets-webpack-plugin');
const assetsPluginInstance = new AssetsPlugin({
  path: path.join(process.cwd(), 'server', 'generated'),
  filename: 'assets.json',
});
/* eslint-enable import/no-extraneous-dependencies */


const chalk = require('chalk');

const debug = console.log.bind(console, chalk.cyan('[base service]'));
debug(chalk.gray(JSON.stringify(assetsPluginInstance)));

const extractVendorCSSPlugin = new ExtractTextPlugin('vendor.[contenthash].css');

const isBuildingDll = Boolean(process.env.BUILDING_DLL);
const vendorCSSLoaders = extractVendorCSSPlugin.extract({
  fallback: 'style-loader',
  use: 'css-loader',
});

const buildSpritePlugin = (name) => new SpritesmithPlugin({
  retina: '-2x',
  src: {
    cwd: path.join(process.cwd(), `app/images/sprites/${name}`),
    glob: '*.png',
  },
  target: {
    image: path.join(process.cwd(), `app/images/generated/${name}-sprite.png`),
    css: path.join(process.cwd(), `app/styles/generated/${name}-sprites.scss`),
  },
  apiOptions: {
    cssImageRef: `images/generated/${name}-sprite.png`,
  },
  spritesmithOptions: {
    padding: 2,
  },
});

module.exports = (options) => {
  const webpackConfig = {
    entry: options.entry,
    output: Object.assign({
      path: path.resolve(process.cwd(), 'dist'),
      publicPath: '/',
    }, options.output),
    module: {
      loaders: [{
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: options.babelQuery,
      }, {
        // Do not transform vendor's CSS with CSS-modules
        // The point is that they remain in global scope.
        // Since we require these CSS files in our JS or CSS files,
        // they will be a part of our compilation either way.
        // So, no need for ExtractTextPlugin here.
        test: /\.css$/,
        include: /node_modules/,
        use: vendorCSSLoaders,
      }, {
        test: /\.scss$/,
        use: [{
          loader: 'style-loader',
        }, {
          loader: 'css-loader',
        }, {
          loader: 'sass-loader',
        }],
      }, {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
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
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        },
      }],
    },
    plugins: options.plugins.concat([
      new CopyWebpackPlugin([{
        from: path.join(process.cwd(), 'app', 'fixtures'),
        to: 'fixtures',
      }]),
      extractVendorCSSPlugin,
      new FaviconsWebpackPlugin(path.join(process.cwd(), 'app', 'images', 'favicon.png')),
      buildSpritePlugin('mobile'),
      buildSpritePlugin('desktop'),
      new webpack.ProvidePlugin({
        // make fetch available
        fetch: 'exports-loader?self.fetch!whatwg-fetch',
      }),

      // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
      // inside your code for any environment checks; UglifyJS will automatically
      // drop any unreachable code.
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        },
        '__SERVER__': false,
        '__CLIENT__': true,
      }),
      new webpack.NamedModulesPlugin(),
    ]).concat(isBuildingDll ? [] : [assetsPluginInstance]),
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
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },
    devtool: options.devtool,
    target: 'web',
    performance: options.performance || {},
  };

  if (process.env.SHOW_VERSION) {
    webpackConfig.plugins.push(
      new WebpackAppversionPlugin({
        entries: ['main'],
        version: '1.0.0',
        isOpen: true,
      })
    );
  }

  return webpackConfig;
};

