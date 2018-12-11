import React from 'react';
import PageComponent from './page';
import WeatherService from '../services/weather.service';
import { NavLink } from 'react-router-dom';

class CityPage extends PageComponent {
  /**
   * @type {Object}
   * @property {City} city
   */
  state

  static async loadData({ name }){
    const cityData = await WeatherService.getCityByName(name);

    return { city: cityData };
  }

  render() {
    const { city } = this.state;

    return (
      <div className="city">
        <div>
          <NavLink to="/">Back Home</NavLink>
        </div>
        {city && city.name}
      </div>
    )
  }
}

export default CityPage;
