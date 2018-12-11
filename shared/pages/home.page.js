import React from 'react';
import PageComponent from './page';
import { NavLink } from 'react-router-dom';
import { browserHistory } from 'react-router';
import WeatherService from '../services/weather.service';

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

    return { cities, query };
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
      <div className="home">
        Search: <input type="text" value={query} onChange={this.onQueryChange} />
        <div>
          {cities.map(city => {
            return <div key={city.slug}>
              <NavLink to={`/city/${encodeURIComponent(city.slug)}`}>{city.name}</NavLink>
            </div>;
          })}
        </div>
      </div>
    )
  }
}

export default HomePage;
