// webpack.config.js
const path = require("path");

module.exports = {
  target: "node",
  entry: "./bin/cmd",
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build/cache"),
  },
  mode: "production",
};
