import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import BEM from '../../utils/bemnames';

const { block, elem } = BEM();

class TodayComponent extends Component {
  render() {
    const { backButton } = this.props;

    return (
      <div {...block('today')}>
        { backButton ? <NavLink to="/" ></NavLink> : null }
        <div {...elem('today-header')}>
          TODAY
        </div>
        <div {...elem('today-date')}>
          <div {...elem('today-date-number')}>8th</div> August, 2014
        </div>
      </div>
    );
  }
}

export default TodayComponent;
