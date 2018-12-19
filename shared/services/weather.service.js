import API from './api';

function handleCityData(cityData) {
  cityData.data.forEach(datum => {
    datum.date = new Date(datum.date);
  });

  return cityData;
}

export default {
  /**
   * @param {string} query
   * @returns {Promise<[City]>}
   */
  findCitiesByQuery(query) {
    return API.get('weather/search', { query })
      .then(cities => cities.map(handleCityData));
  },

  /**
   * @param {string} name
   * @returns {Promise<City>}
   */
  getCityByName(name) {
    return API.get(`weather/city`, { name })
      .then(handleCityData);
  }
};
