import React from 'react';
import { FullScreenModal } from 'd-ui';

class ShowcaseFullScreenModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <div>
        <div>
          <div
            aria-hidden
            className="btn btn-primary"
            onClick={() => this.setState({ show: true })}
          >
            Show
          </div>
        </div>

        <FullScreenModal
          visible={this.state.show}
          onClose={() => this.setState({ show: false })}
        />
      </div>
    );
  }
}

export default ShowcaseFullScreenModal;
