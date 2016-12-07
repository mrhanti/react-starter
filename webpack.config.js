import webpack from 'webpack';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default ({isDev}) => {
  const uglifyPlugin = isDev ? [] : [
    new webpack.optimize.UglifyJsPlugin({
      mangle: true,
      warnings: false,
      'screw_ie8': true,
      conditionals: true,
      unused: true,
      comparisons: true,
      sourceMap: true,
      sequences: true,
      'dead_code': true,
      evaluate: true,
      'if_return': true,
      'join_vars': true,
      output: {
        comments: false
      }
    })
  ];

  return {
    devtool: isDev ? 'inline-source-map' : 'source-map',
    target: 'web',
    context: path.join(__dirname, './src'),
    entry: {
      vendor: './appLibs',
      main: './appLoader'
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      publicPath: '/',
      filename: '[name].[chunkhash].js'
    },
    plugins: [
      new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify(isDev ? 'development' : 'production') } }),
      new webpack.ProvidePlugin({$:'jquery', jQuery: 'jquery', 'window.jQuery': 'jquery', 'window.Tether': 'tether' }),
      new webpack.LoaderOptionsPlugin({debug: isDev, minimize: !isDev }),
      new WebpackMd5Hash(),
      new ExtractTextPlugin({filename: '[name].[contenthash].css'}),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      ...uglifyPlugin,
      new HTMLWebpackPlugin({template: 'index.html', inject: true, minify: { removeComments: !isDev, collapseWhitespace: !isDev, keepClosingSlash:!isDev } })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname,'./src') ],
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          include: [path.resolve(__dirname,'./src'), path.resolve(__dirname, './node_modules/bootstrap/scss'), path.resolve(__dirname, './node_modules/font-awesome/scss')],
          loader: ExtractTextPlugin.extract({loader: 'css-loader?sourceMap!sass-loader?sourceMap'})
        },
        {
          test: /\.(png|jpg|wav|mp3)$/,
          include: [path.resolve(__dirname, './assets')],
          loader: 'url-loader?limit=4096'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=10000&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    }
  };
};