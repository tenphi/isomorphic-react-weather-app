import Controller from './controller';
import WeatherService from '../services/weather.service';

export default class WeatherController extends Controller {
  search({ query, offset = 0, limit = 10 }) {
    const cities = WeatherService.getCollectionByQuery(String(query));

    return cities.splice(offset, limit);
  }

  getCity({ name }) {
    return WeatherService.getCityByName(name);
  }
}
