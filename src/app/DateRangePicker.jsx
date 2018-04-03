import React from 'react';
import { DateRangePicker } from 'd-ui';
// import random from 'lodash/random';
import moment from 'moment';
import ShowcaseContainer from './ShowcaseContainer';

class ShowcaseDateRangePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      start: moment().subtract().format('YYYY-MM-DD'),
      end: moment().format('YYYY-MM-DD'),
    };
  }

  render() {
    return (
      <ShowcaseContainer title="DatePicker">
        <DateRangePicker
          start={this.state.start}
          end={this.state.end}
          onChange={({ start, end }) =>
            this.setState({ start, end })}
        />
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseDateRangePicker;
