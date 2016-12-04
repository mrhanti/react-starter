import webpack from 'webpack';
import path from 'path';
import HTMLWebpackPlugin from 'html-webpack-plugin';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import WebpackMd5Hash from 'webpack-md5-hash';

export default options => {

  const prodPlugins = options.dev ? [] : [
    new webpack.optimize.DedupePlugin(),
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
    devtool: options.dev ? 'eval-source-map' : 'source-map',
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
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify(options.dev ? 'development' : 'production') }
      }),
      new webpack.LoaderOptionsPlugin({
        debug: options.dev,
        minimize: !options.dev
      }),
      new ExtractTextPlugin({filename: 'styles.[contenthash].css'}),
      new WebpackMd5Hash(),
      new webpack.optimize.CommonsChunkPlugin({name: 'vendor'}),
      ...prodPlugins,
      new HTMLWebpackPlugin({
        template: 'index.html',
        inject: true,
        minify: { removeComments: !options.dev, collapseWhitespace: !options.dev, keepClosingSlash:!options.dev }
      })
    ],
    module: {
      rules: [
        {
          test: /\.js$/,
          include: [path.resolve(__dirname,'./src') ],
          loader: 'babel-loader'
        },
        {
          test: /\.css$/,
          include: [path.resolve(__dirname,'./src')],
          loader: ExtractTextPlugin.extract({loader: 'css-loader?sourceMap&modules&localIdentName=[local]--[hash:base64:5]'})
        },
        {
          test: /\.(png|jpg|ttf|eot|wav|mp3)$/,
          include: [path.resolve(__dirname, './assets')],
          loader: 'url-loader?limit=4096'
        }
      ]
    }
  };
};