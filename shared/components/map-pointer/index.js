import React, { Component } from 'react';
import BEM from '../../utils/bemnames';

const { block, elem } = BEM('map-pointer');

class MapPointerComponent extends Component {
  render() {
    const city = this.props.data;
    const type = this.props.type || 'temperature';

    let data;

    switch(type) {
      case 'temperature':
        data = <div {...elem('data')}>
          <span {...elem('icon', 'temperature')} aria-label="Temperature" />
          &nbsp;{city.data[0].temperatureMax}°
        </div>
        break;
      case 'rain':
        data = <div {...elem('data')} aria-label="Precipitation Probability">
          <span {...elem('icon', 'rain')} />
          &nbsp;{city.data[0].precipitationProbability}%
        </div>
        break;
      case 'precipitation':
        data = <div {...elem('data')} aria-label="Precipitation (mm)">
          <span {...elem('icon', 'precipitation')} />
          &nbsp;{city.data[0].precipitation}mm
        </div>
        break;
    }

    return (
      <div {...block('map-pointer')}>
        <div {...elem('container', 'data')}>{data}</div>
        <div {...elem('container', 'city')}>{city.name}</div>
        <div {...elem('point')}></div>
      </div>
    );
  }
}

export default MapPointerComponent;
