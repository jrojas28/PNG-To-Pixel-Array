const path = require('path');
const nodeExternals = require('webpack-node-externals');
const config = require('config');

const env = config.get('env');

module.exports = {
  mode: env === 'prod' ? 'production' : 'development',
  entry: './app.js',
  target: 'node',
  output: {
    filename: `${env}.bundle.js`,
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  optimization: {
    minimize: true,
  },
  externals: [nodeExternals()],
};
