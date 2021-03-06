var path = require("path");
var Html = require('html-webpack-plugin');
var MiniCSS = require("mini-css-extract-plugin");

module.exports = (env) => {
    var isDev = env.dev ? true : false;

    return {
      entry: "./js/app.js",
      output: {
          filename: "js/out.js",
          path: (path.resolve(__dirname, "build"))
      },
      devServer: {
        watchContentBase: true},
      plugins: [
          new Html({
              filename: 'index.html',
              template: './index.html'
          }),
          new MiniCSS({
              filename: "./style.css",
          })
      ],
      module: {
          rules: [
              {
                  test: /\.js$/,
                  exclude: /node_modules/,
                  use: {
                      loader: 'babel-loader',
                      options: {
                        presets: [
                            "@babel/preset-env"
                          ],
                          plugins: [
                              ["@babel/plugin-transform-runtime"],
                              ["@babel/plugin-proposal-class-properties"]
                          ]
                      }
                  }
              },
              {
                  test: /\.css$/,
                  use: ['style-loader', 'css-loader']
              },
              {
                  test: /\.scss$/,
                  use: [
                      isDev ? 'style-loader' : MiniCSS.loader,
                      'css-loader',
                      {
                          loader: 'postcss-loader',
                          options: {
                              plugins: () => [
                                  require('autoprefixer')
                              ],
                              publicPath: '../',
                            useRelativePaths: true
                          }
                      },
                      'sass-loader']
              },
              {
                  test: /\.(jpg|jpeg|gif|png|csv)$/,
                  use: {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          publicPath: 'images',
                          outputPath: 'images'
                      }
                  }
              },
              {
                test: /\.(mp3|wav)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        publicPath: 'sounds',
                        outputPath: 'sounds'
                    }
                }
            },
              {
                  test: /\.(eot|ttf|woff|woff2)$/,
                  use: {
                      loader: 'file-loader',
                      options: {
                          name: '[name].[ext]',
                          publicPath: 'fonts',
                          outputPath: 'fonts'
                      }
                  }
              }
          ]
      }
  }}