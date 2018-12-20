import React, { Component } from 'react';
import BEM from '../../utils/bemnames';

const { block, elem } = BEM();

class CopyrightComponent extends Component {
  render() {
    return (
      <div {...block('copyright')}>
        Demo by <a {...elem('link')} href="https://github.com/tenphi" target="_blank">@tenphi</a>
        &nbsp;|&nbsp;<a {...elem('link')} href="https://github.com/tenphi/isomorphic-react-weather-app" target="_blank">Source code</a>
      </div>
    );
  }
}

export default CopyrightComponent;
