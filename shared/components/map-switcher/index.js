import React, { Component } from 'react';
import BEM from '../../utils/bemnames';

const { block, elem } = BEM();

class MapSwitcherComponent extends Component {
  constructor(props) {
    super(props);
  }

  onChange(type) {
    this.props.onChange(type);
  }

  render() {
    const { type } = this.props;

    return (
      <div {...block('map-switcher')}>
        <div {...elem('button', { name: true, active: type === 'name' })}
             onClick={() => this.onChange('name')}></div>
        <div {...elem('button', { temperature: true, active: type === 'temperature' })}
             onClick={() => this.onChange('temperature')}></div>
        <div {...elem('button', { rain: true, active: type === 'rain' })}
             onClick={() => this.onChange('rain')}></div>
        <div {...elem('button', { precipitation: true, active: type === 'precipitation' })}
             onClick={() => this.onChange('precipitation')}></div>
      </div>
    );
  }
}

export default MapSwitcherComponent;
