import React from 'react';
import { renderToString } from 'react-dom/server';
import { matchPath, StaticRouter} from 'react-router-dom';
import routes from '../shared/app.routes';
import App from '../shared/app.component';
import renderPage from './render-page';
import getUrlParams from '../shared/utils/get-url-params';

async function renderRoute(req, res) {
  const currentRoute =
    routes.find(route => {
      return matchPath(req.url, route);
    }) || {};

  let params = Object.assign(
    currentRoute.component.defaultParams || {},
    getUrlParams(req.url, req.params)
  );
  let data = currentRoute.component.loadData
    ? (await currentRoute.component.loadData(params))
    : null;

  const context = data || {};

  const app = (
    <StaticRouter location={req.url} context={context}>
      <App />
    </StaticRouter>
  );

  const appHTML = renderToString(app);

  const html = renderPage(appHTML, context);

  if (context.status === 404) {
    res.status(404);
  }

  return res.send(html);
}

export default renderRoute;

