import React from 'react';
import { Clickable, Alert, Confirm } from 'ddy-ui';

import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';

class ShowcaseDialog extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      alert: false,
      confirm: false,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Dialog">
        <div className="mt-2">
          <div className="bold">Alert</div>
          <div className="mt-1">
            <Clickable
              onClick={() => this.setState({ alert: true })}
            >
              <div className="btn btn-primary">
                Show Alert
              </div>
            </Clickable>
          </div>
        </div>

        <div className="mt-2">
          <div className="bold">Confirm</div>
          <div className="mt-1">
            <Clickable
              onClick={() => this.setState({ confirm: true })}
            >
              <div className="btn btn-primary">
                Show Confirm
              </div>
            </Clickable>
          </div>
        </div>

        <Alert
          visible={this.state.alert}
          onClose={() => this.setState({ alert: false })}
        >
          Hello !
        </Alert>

        <Confirm
          visible={this.state.confirm}
          onClose={() => this.setState({ confirm: false })}
          onConfirm={() => this.setState({ confirm: false })}
        >
          Hey, are you sure ?
        </Confirm>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseDialog;
