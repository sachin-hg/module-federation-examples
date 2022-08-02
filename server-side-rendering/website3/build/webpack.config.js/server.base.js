const path = require("path");
const {merge} = require("webpack-merge");
const fs = require("fs");
const webpack = require("webpack");
const ModuleFederationPlugin = require("webpack").container
  .ModuleFederationPlugin;
const common = require("./common.base");
const { server: serverLoaders } = require("./loaders");
const plugins = require("./plugins");
const config = require("../config");
const deps = require('../../package.json').dependencies
const { serverPath } = config[process.env.NODE_ENV || "development"];
const nodeExternals = require('webpack-node-externals');

module.exports = merge(common, {
  name: "server",
  target: "async-node",
  entry: [path.resolve(__dirname, "../../server/index.js")],
  output: {
    path: serverPath,
    filename: "[name].js",
    libraryTarget: "commonjs2",
  },
  externals: [nodeExternals(), "enhanced-resolve"],
  module: {
    rules: serverLoaders,
  },
  optimization: {
    minimize: false,
  },
  plugins: [
    ...plugins.server,
    // new webpack.HotModuleReplacementPlugin(),
    new ModuleFederationPlugin({
      name: "website2",
      library: { type: "commonjs2" },
      filename: "container.js",
      exposes: {
        "./SomeComponent": "./src/components/SomeComponent",
        "./x": "./src/components/x"
      },
                  shared: [{"react":deps.react, "react-dom":deps["react-dom"]}],
    }),
  ],
  devtool: 'source-map',
  stats: {
    colors: true,
    errorDetails: true
  },
});
