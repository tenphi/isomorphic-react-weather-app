import path from 'path';
import express from 'express';
import logger from 'morgan';

import renderRoute from './render-route';
import routes from '../shared/app.routes';
import API from './api';

const app = express();

app.use(logger('short'));

const assets = express.static(path.join(__dirname, '../build'));

app.use(assets);

API(app);

routes.forEach(route => {
  app.get(route.path, renderRoute);
});

// app.use('*', renderRoute);

export default app;
