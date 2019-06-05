const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/devtools.js'),
  output: {
    libraryTarget: 'system',
    filename: 'devtools.js',
    path: __dirname + '/dist',
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },
  externals: [
    'react',
    'react-dom',
  ],
  devtool: 'sourcemap',
  devServer: {
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    disableHostCheck: true,
  },
}