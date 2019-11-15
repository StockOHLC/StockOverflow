const path = require("path");
module.exports = {
  entry: ["./client/index.js"],
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  mode: process.env.NODE_ENV,
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"],
            plugins: ["emotion"]
          }
        }
      },
      {
        test: /.(css|scss)$/,
        exclude: /node_modules/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" }
        ]
      },
      {
        test: /\.(jpg|png|gif|svg|pdf|ico)$/,
        exclude: /assets/,
        use: [
          { loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]'
            },
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  devServer: {
    publicPath: "/build",
    port: 8080,
    proxy:{
      '/':{
        target: 'http://localhost:3000',
        secure: false,
      },
      '/assets/**': {
        target: 'http://locahost:3000'
      }
    }
  }
};
