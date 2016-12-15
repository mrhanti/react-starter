import webpack from 'webpack';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default ({isDev}) => {
  const ifDev = then => (isDev ? then : null);
  const ifProd = then => (!isDev ? then : null);

  return {
    devtool: isDev ? 'inline-source-map' : 'source-map',
    target: 'web',
    context: path.resolve(__dirname, '../src'),
    entry: {
      vendor: [ifDev('react-hot-loader/patch'),ifDev('webpack-dev-server/client'),ifDev('webpack/hot/only-dev-server'), 'react-hot-loader','./appLibs'].filter(id => id),
      main: './appLoader',
    },
    output: {
      path: path.resolve(__dirname,'../dist'),
      publicPath: '/',
      filename: isDev ? '[name].js' : '[name].[chunkhash].js'
    },
    performance: {
      hints: !isDev
    },
    plugins: [
      new webpack.DefinePlugin({'process.env': { NODE_ENV: JSON.stringify(isDev ? 'development' : 'production') } }),
      new webpack.LoaderOptionsPlugin({debug: isDev, minimize: !isDev }),
      ifDev(new webpack.HotModuleReplacementPlugin()),
      ifDev(new webpack.NamedModulesPlugin()),
      ifProd(new WebpackMd5Hash()),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      ifProd(new ExtractTextPlugin({filename: '[name].[contenthash].css'})),
      ifProd(new webpack.optimize.UglifyJsPlugin({ mangle: true, warnings: false, 'screw_ie8': true, conditionals: true, unused: true, comparisons: true, sourceMap: true, sequences: true, 'dead_code': true, evaluate: true, 'if_return': true, 'join_vars': true, output: { comments: false }})),
      new HTMLWebpackPlugin({template: 'index.html', inject: true, minify: { removeComments: !isDev, collapseWhitespace: !isDev, keepClosingSlash:!isDev } })
    ].filter(id => id),
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname,'../src') ],
          loader: 'babel-loader'
        },
        {
          test: /\.(css|scss)$/,
          include: [path.resolve(__dirname,'../src')],
          loader: isDev ? 'style-loader!css-loader?sourceMap!sass-loader?sourceMap' : ExtractTextPlugin.extract({loader: 'css-loader?sourceMap!sass-loader?sourceMap'})
        },
        {
          test: /\.(png|jpg|wav|mp3)$/,
          include: [path.resolve(__dirname, '../assets')],
          loader: 'url-loader?limit=4096'
        },
        {
          test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'url-loader?limit=4096&mimetype=application/font-woff'
        },
        {
          test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
          loader: 'file-loader'
        }
      ]
    }
  };
};