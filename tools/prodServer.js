import express from 'express';
import path from 'path';
import chalk from 'chalk';
import open from 'open';
import compression from 'compression';

const host = 'localhost';
const port = 9002;

console.log(chalk.blue('Testing release build'));

const app = express();

app.use(compression());
app.use(express.static(path.resolve(__dirname, '../dist')));
app.get('*', function(req, res) {
  res.sendFile(path.resolve(__dirname, '../dist/index.html'));
});


app.listen(port, err => {
  if (err)
    console.log(chalk.red(err));
  else
    open(`http://${host}:${port}`);
});
