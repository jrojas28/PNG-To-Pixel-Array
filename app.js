import 'babel-polyfill';

import Logger from './util/logger';
import ErrorMiddleware from './util/errors';
import ApiRouter from './routes/api.router';

const express = require('express');
const config = require('config');
const bodyParser = require('body-parser');


const app = express();

const appPort = config.get('port');
const logger = Logger('App.js');

app.use(bodyParser.json());
app.use('/api', ApiRouter);
app.use(ErrorMiddleware);

app.listen(appPort, () => logger.info('Logging port information...', {
  port: appPort,
}));

export default app;
