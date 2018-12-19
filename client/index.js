import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './global.less';
import '../shared/pages/city/index.less';
import '../shared/pages/home/index.less';
import '../shared/components/map/index.less';
import '../shared/components/map-switcher/index.less';
import '../shared/components/map-pointer/index.less';
import '../shared/components/today/index.less';
import '../shared/components/copyright/index.less';

import App from '../shared/app.component';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
