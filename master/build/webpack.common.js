const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const os = require('os');
const HappyPack = require('happypack');
const packageName = require('../package.json').name;
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

const srcDir = path.join(__dirname, '../src');
const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
  entry: {
    main: path.join(__dirname, '../main.js'),
  },
  output: {
    publicPath: devMode ? './' : '/',
    path: path.join(__dirname, '../dist'),
    filename: '[name].[hash:8].js',
    chunkFilename: 'chunk/[name].[hash:8].js',
  },
  module: {
    rules: [{
        test: /\.js[x]?$/,
        include: [srcDir],
        exclude: /(node_modules|bower_components)/,
        use: ['happypack/loader?id=happybabel'],
      },
      {
        test: /\.less$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIndentName: '[local][name]-[hash:base64:4]'
              }
            }
          },
          {
            loader: 'less-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ],
      },
      {
        test: /\.css$/,
        use: [
          devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              modules: {
                localIndentName: '[local][name]-[hash:base64:4]'
              }
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [require('autoprefixer')]
            }
          }
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback:{
              loader: 'file-loader',
              options: {
                esModule:false,
                name: 'img/[name].[hash:8].[ext]'
              }
            }
          }
        },
        include: [srcDir],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback:{
              loader: 'file-loader',
              options: {
                esModule:false,
                name: 'media/[name].[hash:8].[ext]'
              }
            }
          }
        },
        include: [srcDir],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 1024,
            fallback:{
              loader: 'file-loader',
              options: {
                esModule:false,
                name: 'fonts/[name].[hash:8].[ext]'
              }
            }
          }
        },
        include: [srcDir],
      },
    ],
  },
  plugins: [
    // 开启 happypack 的线程池
    new HappyPack({
      id: 'happybabel',
      loaders: ['babel-loader?cacheDirectory=true'],
      threadPool: happyThreadPool,
      cache: true,
      verbose: true,
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: `${srcDir}/index.html`,
    }),
  ],
  resolve: {
    alias: {
      '@': srcDir,
      '@pages': `${srcDir}/pages`,
    },
  },
};
