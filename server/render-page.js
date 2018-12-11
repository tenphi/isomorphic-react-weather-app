import serialize from 'serialize-javascript';

export default function renderPage(html, preloadedState) {
  return `<!doctype html>
<html>
<head>
  <title>Demo of the React Weather App</title>
</head>
<body>
<div id="root">${html}</div>
<script>
  window.__ROUTE_DATA__ = ${serialize(preloadedState)}
</script>
<script src="/bundle.js"></script>
</body>
</html>`;
}
