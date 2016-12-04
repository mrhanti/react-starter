import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from '../webpack.config';
import chalk from 'chalk';
import open from 'open';

console.log(chalk.grey('Starting WebpackDevServer'));

try {

  const compiler = webpack(config({dev: true}));

  const server = new WebpackDevServer(compiler,{
    contentBase: './dist',
    historyApiFallback: true,
    stats: { colors: true }
  });

  server.listen(80,'localhost', err => {
    if (err){
      console.log(chalk.red(`err is ${err}`));
      return;
    }
    console.log(chalk.yellow('Listening on port 80'));
    open('http://localhost');
  });

} catch (ex) {
  console.log(chalk.red(`The following error has ocurred: ${ex}`));
}