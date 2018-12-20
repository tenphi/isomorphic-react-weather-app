import React from 'react';
import PageComponent from '../page';
import WeatherService from '../../services/weather.service';
import BEM from '../../utils/bemnames';
import MapStore from '../../stores/map.store';
import { NavLink } from 'react-router-dom';

const { block, elem } = BEM();
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function getDateMarkup(date) {
  return <div>{MONTHS[date.getMonth()]} {date.getDate()}th</div>;
}

class CityPage extends PageComponent {
  /**
   * @type {Object}
   * @property {City} city
   */
  state

  defaultState = {
    date: 0
  }

  static async loadData({ name }){
    const cityData = await WeatherService.getCityByName(name);

    MapStore.set({ cities: [cityData] });

    return { city: cityData };
  }

  componentDidMount() {
    const { city } = this.state;

    if (city) {
      MapStore.set({ cities: [city] });
    }

    this.setState({ date: MapStore.state.date });
  }

  render() {
    const { city, date } = this.state;
    const dataIndex = WeatherService.getDataIndexFromDate(date);

    return (
      <div {...block('city-page')}>
        { city ? (<div>
          <NavLink {...elem('nav-back')} to="/" ></NavLink>
          <div {...elem('city')}><div {...elem('city-name')}>{city.name}</div> <div {...elem('city-label')}>city</div></div>
          <table {...elem('weather-table')}>
            <thead>
              <tr {...elem('weather-header')}>
                <td {...elem('weather-header-item', 'date')}><div {...elem('icon', 'date')}></div></td>
                <td {...elem('weather-header-item', 'temperature')}>
                  <div {...elem('weather-header-label')}>MAX</div>
                  <div {...elem('icon', 'temperature')}></div>
                </td>
                <td {...elem('weather-header-item', 'temperature')}>
                  <div {...elem('weather-header-label')}>MIN</div>
                  <div {...elem('icon', 'temperature')}></div>
                </td>
                <td {...elem('weather-header-item', 'rain')}><div {...elem('icon', 'rain')}></div></td>
                <td {...elem('weather-header-item', 'precipitation')}><div {...elem('icon', 'precipitation')}></div></td>
              </tr>
            </thead>
            <tbody>
              { city.data.map((datum, index) =>
                <tr {...elem('weather-item', { active: dataIndex === index })} key={datum.date.toString()}>
                  <td {...elem('weather-data', 'date')}>{getDateMarkup(datum.date)}</td>
                  <td {...elem('weather-data', 'temperature')}>
                    {datum.temperatureMax}°
                  </td>
                  <td {...elem('weather-data', 'temperature')}>
                    {datum.temperatureMin}°
                  </td>
                  <td {...elem('weather-data', 'rain')}>
                    {datum.precipitationProbability}%
                  </td>
                  <td {...elem('weather-data', 'precipitation')}>
                    {datum.precipitation}mm
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>) : null }
      </div>
    )
  }
}

export default CityPage;
