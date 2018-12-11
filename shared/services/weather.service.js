import API from './api';

export default {
  /**
   * @param {string} query
   * @returns {Promise<[City]>}
   */
  findCitiesByQuery(query) {
    return API.get('weather/search', { query });
  },

  /**
   * @param {string} name
   * @returns {Promise<City>}
   */
  getCityByName(name) {
    return API.get(`weather/city`, { name });
  }
};
