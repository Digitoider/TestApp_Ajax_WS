var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: {
    edit: './src/edit.js',
    profile: './src/profile.js'
  },
  output:{
    path: path.resolve(__dirname, './dist'),
    filename: '[name].bundle.js'
  },
  module:{
    rules:[
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use:[
          {
            loader: 'babel-loader',
            options:{
              presets: ['es2015']
            },
          }
        ]
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff&name=fonts/[name].[ext]'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader&name=fonts/[name].[ext]'
      },
      {
         test: require.resolve('jquery'), loader: 'expose-loader?jQuery!expose-loader?$'
      }
    ]
  },
  plugins:[
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'commons',
    //   filename: 'commons.js',
    //   minChunks: 2,
    // }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "Hammer": "hammerjs/hammer"
    }),
  ]
};
