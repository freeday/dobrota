const path = require("path");
const { VueLoaderPlugin } = require("vue-loader");
module.exports = {
  devServer: { historyApiFallback: true },
  entry: {
    app: "./src/index.js"
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "./dist"),
    publicPath: "/dist"
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: "babel-loader" },
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          css: "vue-style-loader!css-loader"
        }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    alias: {
      vue$: "vue/dist/vue.js"
    },
    extensions: [".js", ".vue"]
  },

  plugins: [new VueLoaderPlugin()]
};
