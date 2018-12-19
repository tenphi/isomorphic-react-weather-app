import React from 'react';
import PageComponent from '../page';
import TodayComponent from '../../components/today';
import WeatherService from '../../services/weather.service';
import BEM from '../../utils/bemnames';
import MapStore from '../../stores/map.store';

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
  }

  render() {
    const { city } = this.state;

    return (
      <div {...block('city-page')}>
        <TodayComponent backButton />
        { city ? (<div>
          <div {...elem('city')}>{city.name} <div {...elem('city-label')}>city</div></div>
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
              { city.data.map(datum =>
                <tr {...elem('weather-item')} key={datum.date.toString()}>
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
