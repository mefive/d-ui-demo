import React from 'react';
import random from 'lodash/random';
import { Select } from 'd-ui';

class SelectShowcase extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      value: null,
      options: Array(20).fill(0).map((i, index) => ({
        value: index,
        title: `${random(100, 200)}`,
      })),
    };
  }

  render() {
    return (
      <div>
        <div className="bold">Select</div>
        <div className="mt-1">
          <div style={{ width: 200 }}>
            <Select
              options={this.state.options}
              value={this.state.value}
              onChange={value => this.setState({ value })}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default SelectShowcase;
