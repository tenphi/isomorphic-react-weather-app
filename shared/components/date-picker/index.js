import React, { Component } from 'react';
import BEM from '../../utils/bemnames';

const { block, elem } = BEM();

const dates = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
const presentDates = new Set([8,9,10,11,12]);

function getDateEnding(date) {
  if (date === 11 || date === 12) {
    return 'th'
  }

  if (date % 10 === 1) {
    return 'st';
  }

  if (date % 10 === 2) {
    return 'nd';
  }

  return 'th';
}

function getTransformationStyles(currentDate) {
  const position = dates.indexOf(currentDate);

  return {
    transform: `translate(-${position * 2 - 8.4}em, 0)`
  };
}

class DatePickerComponent extends Component {
  onClick = (date) => {
    if (!presentDates.has(date)) return;

    this.props.onChange(date);
  }

  render() {
    const { date: currentDate } = this.props;

    return (
      <div {...block('date-picker')}>
        <div {...elem('month')}>
          August, 2014
        </div>
        <div {...elem('dates')}
          style={ getTransformationStyles(currentDate) }>
          { dates.map(date => (
            <div {...elem('date', {
              present: presentDates.has(date),
              active: date === currentDate
            })}
              key={date}
              onClick={() => this.onClick(date)}>
              <div {...elem('date-number')}>{date}<div {...elem('date-number-ending')}>{getDateEnding(date)}</div></div>
            </div>
          )) }
        </div>
        <div {...elem('icon')}></div>
      </div>
    );
  }
}

export default DatePickerComponent;
