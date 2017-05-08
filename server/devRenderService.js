/* eslint-disable strict,global-require,no-console,import/no-dynamic-require */

'use strict';

const path = require('path');
const express = require('express');
const http = require('http');
const argv = require('minimist')(process.argv.slice(2));
const appPort = argv.port || process.env.PORT || '3000';
const port = exports.port = parseInt(appPort, 10) + 1;
const chalk = require('chalk');

const debug = console.log.bind(console, chalk.cyan('[ssr service]'));

function ensureAllGeneratedFilesExist() {
  const modules = [
    path.join(__dirname, 'generated', 'assets.json'),
    path.join(__dirname, 'generated', 'server'),
  ];

  let modulePath;
  try {
    for (modulePath of modules) { // eslint-disable-line no-restricted-syntax
      require(modulePath);
    }
  } catch (e) {
    if (e.code === 'MODULE_NOT_FOUND') {
      debug(chalk.gray(`...waiting for '${modulePath}'`));
      process.exit(1);
    } else {
      throw e;
    }
  }
}

if (require.main === module) {
  ensureAllGeneratedFilesExist();

  const handleSSR = require('./middlewares/handleSSR');

  const app = express();
  app.use(handleSSR);

  http.createServer(app).listen(port, (err) => {
    if (err) {
      console.error(err);
    } else {
      debug(chalk.gray(`ready @ http://localhost:${port}`));
    }
  });
}
