import React, { Component } from 'react';
import BEM from '../../utils/bemnames';
import WeatherService from '../../services/weather.service';

const { block, elem } = BEM('map-pointer');

class MapPointerComponent extends Component {
  onClick = () => {
    const { data: { slug }, history } = this.props;

    history.push(`/city/${slug}`);
  }

  render() {
    const { data: city, type, date } = this.props;
    const dataIndex = WeatherService.getDataIndexFromDate(date);

    let data;

    switch(type || 'temperature') {
      case 'temperature':
        data = <div {...elem('data')}>
          <span {...elem('icon', 'temperature')} aria-label="Temperature" />
          &nbsp;{city.data[dataIndex].temperatureMax}°
        </div>
        break;
      case 'rain':
        data = <div {...elem('data')} aria-label="Precipitation Probability">
          <span {...elem('icon', 'rain')} />
          &nbsp;{city.data[dataIndex].precipitationProbability}%
        </div>
        break;
      case 'precipitation':
        data = <div {...elem('data')} aria-label="Precipitation (mm)">
          <span {...elem('icon', 'precipitation')} />
          &nbsp;{city.data[dataIndex].precipitation}mm
        </div>
        break;
    }

    return (
      <div {...block('map-pointer')} onClick={this.onClick}>
        { data ? <div {...elem('container', 'data')}>{data}</div> : null }
        <div {...elem('container', 'city')}>{city.name}</div>
        <div {...elem('point')}></div>
      </div>
    );
  }
}

export default MapPointerComponent;
