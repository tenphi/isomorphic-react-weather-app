import queryString from 'query-string';

/**
 * @param {string} url
 * @param {Object} params
 * @returns {Object}
 */
export default function getUrlParams(url, params = {}) {
  let queryIndex = url.lastIndexOf('?');

  if (~queryIndex) {
    params = Object.assign(queryString.parse(url.slice(queryIndex + 1)), params);
  }

  Object.keys(params)
    .forEach(key => {
      const num = Number(params[key]);

      if (num === params[key]) {
        params[key] = num;
      } else {
        params[key] = decodeURIComponent(params[key]);
      }
    });

  return params;
}
