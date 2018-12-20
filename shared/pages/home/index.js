import React from 'react';
import PageComponent from '../page';
import DatePickerComponent from '../../components/date-picker';
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
    date: 8,
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

    this.setState({ date: MapStore.state.date });
  }

  onQueryChange = async (event) => {
    const query = event.target.value;

    this.setState({ query });

    const state = await this.constructor.loadData({ query });

    this.setState(state);
  }

  onDateChange = (date) => {
    this.setState({ date });

    MapStore.set({ date });
  }

  render() {
    const { query, cities, date } = this.state;
    const dataIndex = WeatherService.getDataIndexFromDate(date);

    return (
      <div {...block('home-page')} style={{ height: `calc(${(7 + Math.max(cities.length, 1) * 4)}em + 2px)` }}>
        <div {...elem('content')}>
          <DatePickerComponent date={date} onChange={this.onDateChange} />
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
                <NavLink {...elem('item-link')} to={`/city/${encodeURIComponent(city.slug)}`}>{city.name}
                  <div {...elem('params')}>
                    <div {...elem('params-block')}>
                      <span {...elem('icon', 'temperature')} />
                      &nbsp;{city.data[dataIndex].temperatureMax}°/{city.data[dataIndex].temperatureMin}°
                    </div>
                    <div {...elem('params-block')}>
                      <span {...elem('icon', 'rain')} />
                      &nbsp;{city.data[dataIndex].precipitationProbability}%
                    </div>
                    <div {...elem('params-block')}>
                      <span {...elem('icon', 'precipitation')} />
                      &nbsp;{city.data[dataIndex].precipitation}mm
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
