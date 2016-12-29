import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';
import config from './webpack.config';
import chalk from 'chalk';
import open from 'open';

const host = 'localhost';
const port = 9002;

console.log(chalk.blue('Starting WebpackDevServer debug'));

try {

  const compiler = webpack(config({isDev: true}));

  const server = new WebpackDevServer(compiler,{
    contentBase: './dist',
    historyApiFallback: true,
    hot: true,
    inline: true,
    stats: { colors: true, assets: false },
  });

  server.listen(port, host, () => {
    console.log(chalk.green(`Listening on port ${host}:${port}`));
    open(`http://${host}:${port}`);
  });

} catch (ex) {
  console.log(chalk.red(`The following error has ocurred: ${ex}`));
}
