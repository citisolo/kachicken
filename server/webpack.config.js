var path = require('path');
var webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


const browserConfig = {
   devtool: 'cheap-module-eval-source-map',
   entry: [
     'webpack-hot-middleware/client',
     './src/client/main'
   ],
  devtool: 'inline-source-map',
  output: {
    path: path.join(__dirname, 'public', 'js'),
    filename: 'bundle.js',
    publicPath: '/js'
  },
  module: {
    loaders: [
      {
        test:/\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader']
        })
      },
      {
        test:/\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {loader: 'css-loader', options: {sourceMap: true}},
            {loader: 'postcss-loader', options: {sourceMap: true}},
            {loader: 'sass-loader', options: {sourceMap: true}},
          ]
        })
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        loader: 'babel-loader',
        query: {
          plugins: [
            ['react-transform', {
              transforms: [
                {
                  transform: 'react-transform-hmr',
                  imports: ['react'],
                  locals: ['module']
                },
                {
                  transform: 'react-transform-catch-errors',
                  imports: ['react', 'redbox-react']
                }
              ]
            }]
          ]
        }
      },

    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
};

const serverConfig = {
  entry: './src/server/server.js',
  target: 'node',
  externals: /^[a-z][a-z\.\-0-9]*$/,
  resolve: {
    extensions: [ '.js', '.jsx', '.css', '.local']
  },
 devtool: 'inline-source-map',
  output: {
    path: __dirname,
    filename: 'server.js',
    libraryTarget: 'commonjs2'
  },

  node: {
    __filename: false,
    __dirname: false,
    // console: true
  },

  module: {
    loaders: [
      { test: /\.jsx?$/, exclude: /node_modules/, loader: 'babel-loader', query: { presets: ["react"] } },
      // { test: /\.local$/, exclude: /node_modules/, loader: 'css-loader/locals?module!less-loader' },
      { test: /\.css$/, exclude: /node_modules/, loader: 'css-loader/locals' },
      {
        test: [/\.svg$/, /\.gif$/, /\.jpe?g$/, /\.png$/], loader: "file-loader",
        options: {
          name: "public/media/[name].[ext]",
          publicPath: url => url.replace(/public/, ""),
          emit: false
        }
      },

    ]
  }
}

if (process.env.NODE_ENV === 'production') {
  browserConfig.plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    })
  );
}

module.exports = [browserConfig, serverConfig];
