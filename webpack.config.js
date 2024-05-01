const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd

const jsLoaders = () => {
  const loaders = [
    {
    loader: "babel-loader",
    options: {
          presets: ['@babel/preset-env']
    }}
  ]
  if (isDev) {
    loaders.push('eslint-loader')
  }
  return loaders
}

console.log("is prod", isProd);
console.log("is dev", isDev);

const filename = ext => isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`

module.exports = {
context: path.resolve(__dirname, 'src'),
mode: 'development',
entry: './index.js',
output:{
filename: filename('js'),
path: path.resolve(__dirname, 'dist')
},
resolve: {
    extensions: ['.js'],
    alias: {
        "@": path.resolve(__dirname, 'src'),
        "@core": path.resolve(__dirname, 'src/core')
    }
},
devtool: isDev ? 'source-map' : false,
devServer: {
port: 3000,
hot: isDev

},
plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
        template: 'index.html'

    }),
    new CopyPlugin({
        patterns: [
          { 
            from: path.resolve(__dirname, 'src/favicon.svg'), 
            to: path.resolve(__dirname, 'dist') },
        ],
    }),

    new MiniCssExtractPlugin({
        filename: filename('css')
    })

    
],
module: {
    rules: [
        {
          test: /\.s[ac]ss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            "sass-loader",
          ],
        },
        {
            test: /\.m?js$/,
            exclude: /node_modules/,
            use: jsLoaders()
          }
      ],
}
}