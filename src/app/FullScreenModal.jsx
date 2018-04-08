import React from 'react';
import { FullScreenModal } from 'd-ui';
import ShowcaseContainer from './ShowcaseContainer/ShowcaseContainer';

class ShowcaseFullScreenModal extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    };
  }

  render() {
    return (
      <ShowcaseContainer title="Full Screen Modal">
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
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseFullScreenModal;
