import 'babel-polyfill';

import express from 'express';
import config from 'config';
import bodyParser from 'body-parser';

import Logger from './util/logger';
import ErrorMiddleware from './util/errors';
import ApiRouter from './routes/api.router';

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
