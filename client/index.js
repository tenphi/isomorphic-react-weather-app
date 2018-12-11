import 'babel-polyfill';
import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import App from '../shared/app.component';

hydrate(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById('root'),
);
