import React from 'react';
import PageComponent from '../page';
import TodayComponent from '../../components/today';
import { NavLink } from 'react-router-dom';
import WeatherService from '../../services/weather.service';
import BEM from '../../utils/bemnames';
import MapStore from '../../stores/map.store';

const { block, elem } = BEM();

class HomePage extends PageComponent {
  static defaultParams = {
    query: ''
  }

  /**
   * @type {Object}
   * @property {string} query
   * @property {[City]} cities
   */
  state

  static defaultState = {
    query: '',
    cities: [],
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.constructor.defaultState,
      ...this.state,
    };
  }

  static async loadData({ query }) {
    const cities = await WeatherService.findCitiesByQuery(query);

    MapStore.set({ cities });

    return { cities, query };
  }

  componentDidMount() {
    const { cities } = this.state;

    MapStore.set({ cities });
  }

  onQueryChange = async (event) => {
    const query = event.target.value;

    this.setState({ query });

    const state = await this.constructor.loadData({ query });

    this.setState(state);
  }

  render() {
    const { query, cities } = this.state;

    return (
      <div {...block('home-page')} style={{ height: `calc(${(7 + Math.max(cities.length, 1) * 4)}em + 2px)` }}>
        <div {...elem('content')}>
          <TodayComponent/>
          <div {...elem('search-box')}>
            <input {...elem('search-box-input')}
                   type="text"
                   value={query}
                   placeholder="Search..."
                   onChange={this.onQueryChange} />
          </div>
          <div {...elem('items')}>
            {cities.map((city, i) => {
              return <div {...elem('item', { odd: i % 2 })} key={city.slug}>
                <NavLink to={`/city/${encodeURIComponent(city.slug)}`}>{city.name}
                  <div {...elem('params')}>
                    <div {...elem('params-block')}>
                      <span {...elem('icon', 'temperature')} />
                      &nbsp;{city.data[0].temperatureMin}°-{city.data[0].temperatureMax}°
                    </div>
                    <div {...elem('params-block')}>
                      <span {...elem('icon', 'rain')} />
                      &nbsp;{city.data[0].precipitationProbability}%
                    </div>
                    <div {...elem('params-block')}>
                      <span {...elem('icon', 'precipitation')} />
                      &nbsp;{city.data[0].precipitation}mm
                    </div>
                  </div>
                </NavLink>
              </div>;
            })}
            {!cities.length
              ? <div {...elem('item', 'not-found')}>No cities found</div>
              : ''}
          </div>
        </div>
      </div>
    )
  }
}

export default HomePage;
