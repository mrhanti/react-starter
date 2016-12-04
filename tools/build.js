import webpack from 'webpack';
import webpackConfig from '../webpack.config';
import chalk from 'chalk';

const pipe = (fn,...fns) => (...params) =>
  fns.length === 0
    ? fn(...params)
    : pipe(...fns)(fn(...params));

process.env.NODE_ENV = 'production';

pipe(chalk.blue,console.log)('Generating minified bundle for production. Thiw will take a moment...');

webpack(webpackConfig({isDev: false})).run((err,stats) => {
  if (err) {
    console.log(chalk.red(err));
    return 1;
  }

  const jsonStats = stats.toJson();

  if (jsonStats.hasErrors)
    return jsonStats.errors.map(pipe(chalk.red,console.log));

  if (jsonStats.hasWarning)
    jsonStats.warnings.map(pipe(chalk.yellow,console.log));

  console.log(chalk.bold(`Webpack stats: ${stats}`));
  console.log(chalk.green('Your app has been build for production and written to /dist!'));

  return 0;
});