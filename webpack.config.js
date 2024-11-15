//@ts-check

'use strict';

const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin'); // Import the plugin

/** @typedef {import('webpack').Configuration} WebpackConfig **/

/** @type WebpackConfig */
const extensionConfig = {
  target: 'node', // VS Code extensions run in a Node.js-context
  mode: 'none', // Leave the source code as close as possible to the original

  entry: './src/extension.ts', // The entry point of this extension
  output: {
    path: path.resolve(__dirname, 'dist'), // Output directory
    filename: 'extension.js',
    libraryTarget: 'commonjs2'
  },
  externals: {
    vscode: 'commonjs vscode' // Exclude the vscode module from bundling
  },
  resolve: {
    extensions: ['.ts', '.js'] // Resolve TypeScript and JavaScript files
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      }
    ]
  },
  devtool: 'nosources-source-map',
  infrastructureLogging: {
    level: 'log' // Enable logging for problem matchers
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/snippets', to: 'snippets' } // Copy the snippets folder to dist
      ]
    })
  ]
};

module.exports = [extensionConfig];
