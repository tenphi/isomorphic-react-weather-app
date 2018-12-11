/**
 * @typedef WeatherRawItem
 * @property station_id
 * @property place_name
 * @property latitude
 * @property longitude
 * @property datetime
 * @property temperature_max
 * @property temperature_min
 * @property precipitation_probability
 * @property precipitation_mm
 */

/**
 * WeatherDataItem
 * @property {number} temperatureMin
 * @property {number} temperatureMax
 * @property {number} precipitationProbability
 * @property {number} precipitation
 */

/**
 * @typedef City
 * @property {number} id
 * @property {string} name
 * @property {number} latitude
 * @property {number} longitude
 * @property {[WeatherDataItem]} data
 */

import axios from 'axios';
import compareStrings from 'fast-levenshtein';

/**
 * @type [WeatherRawItem]
 */
import data from '../../shared/data/weather';

const cities = {};

data.forEach(item => {
  const slug = item.place_name.toLowerCase();

  if (!cities[slug]) {
    cities[slug] = {
      id: item.station_id,
      name: item.place_name,
      latitude: item.latitude,
      longitude: item.longitude,
      data: [],
      slug,
    };
  }

  const dataItem = {
    temperatureMax: item.temperature_max,
    temperatureMin: item.temperature_min,
    precipitationProbability: item.precipitation_probability,
    precipitation: item.precipitation_mm
  };

  cities[slug].data.push(dataItem);
});

const citiesCollection = Object
  .values(cities)
  .sort((a, b) => {
    if (a.name > b.name) {
      return 1;
    } else if (a.name < b.name) {
      return -1;
    } else {
      return 0;
    }
  });

export default {
  /**
   * @param {string} query
   * @returns {[City]}
   */
  getCollectionByQuery(query) {
    const perfectMatch = [];
    const prefixMatch = [];
    const containMatch = [];
    const levenshteinMatch = [];
    const q = query.trim().toLowerCase();

    citiesCollection
      .filter(city => {
        if (city.name.toLowerCase() === q) {
          perfectMatch.push(city);

          return false;
        }

        return true;
      })
      .filter(city => {
        if (city.name.toLowerCase().startsWith(q) || q.startsWith(city.name.toLowerCase())) {
          prefixMatch.push(city);

          return false;
        }

        return true;
      })
      .filter(city => {
        if (q.length < 3) return true;

        if (~city.name.toLowerCase().indexOf(q) || ~q.indexOf(city.name.toLowerCase())) {
          containMatch.push(city);

          return false;
        }

        return true;
      })
      .filter(city => {
        if (q.length < 4) return true;

        const name = city.name.toLowerCase();
        const distance =  compareStrings.get(name, q);

        if (q.length > 3
        && distance < 5 + Math.min(Math.abs(name.length - q.length)), 3) {
          levenshteinMatch.push(city);

          return false;
        }

        return true;
      });

    return [
      ...perfectMatch,
      ...prefixMatch,
      ...containMatch,
      ...levenshteinMatch
        .sort((a, b) => {
          const d1 =  compareStrings.get(a.name.toLowerCase(), q);
          const d2 =  compareStrings.get(b.name.toLowerCase(), q);

          return d1 - d2;
        }),
    ];
  },

  /**
   * @param {string} slug
   * @returns {City}
   */
  getCityByName(slug) {
    slug = slug.toLowerCase();

    return cities[slug];
  }
}
