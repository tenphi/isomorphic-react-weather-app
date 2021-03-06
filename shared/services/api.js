import QueryString from 'query-string';
import request from 'axios';

const isProd = process.env.NODE_ENV === 'production';
const API_PATH = isProd
  ? `http://weather.tenphi.me/api/`
  : `http://localhost:${process.env.PORT || 8080}/api/`;

export default {
  get(path, query) {
    const queryString = query ? `?${QueryString.stringify(query)}` : '';
    const url = `${API_PATH}${path}${queryString}`;

    return request.get(url)
      .then(response => response.data.data)
      .catch(({ error }) => 'unable to complete request');
  }

}
