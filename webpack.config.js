const path = require("path");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;

module.exports = {
  entry: path.resolve(__dirname, "src/openmrs-esm-devtools.tsx"),
  output: {
    libraryTarget: "system",
    filename: "openmrs-esm-devtools.js",
    path: __dirname + "/dist"
  },
  module: {
    rules: [
      {
        test: /\.(m?js|ts|tsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  externals: ["react", "react-dom"],
  devtool: "sourcemap",
  devServer: {
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    disableHostCheck: true
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"]
  },
  plugins: [new ForkTsCheckerWebpackPlugin(), new CleanWebpackPlugin()]
};
