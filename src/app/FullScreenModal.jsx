import React from 'react';
import Clickable from 'ddy-ui/lib/Clickable';
import FullScreenModal from 'ddy-ui/lib/FullScreenModal';
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
          <Clickable
            onClick={() => this.setState({ show: true })}
          >
            <div
              className="btn btn-primary"
            >
              Show
            </div>
          </Clickable>
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
