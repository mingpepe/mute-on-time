const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
   mode: "production",
   entry: {
      background: path.resolve(__dirname, "..", "src", "background.ts"),
      'popup/popup': path.resolve(__dirname, "..", "popup", "popup.ts"),
   },
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [
             {from: ".", to: ".", context: "public"},
             {from: ".", to: "popup", context: "popup", filter: (name) => {
                 if (name.endsWith(".ts")) {
                     return false;
                 }
                 return true;
             }},
             {from: ".", to: "icons", context: "icons"},
        ]
      }),
   ],
};