import React from 'react';
import classNames from 'classnames';
import Trigger from 'ddy-ui/lib/Trigger';
import Popover from 'ddy-ui/lib/Popover';

import ShowcaseContainer from '../ShowcaseContainer';

import style from './style/index.scss';

class ShowcaseTrigger extends React.PureComponent {
  constructor(props) {
    super(props);

    this.popoverElements = {};
  }

  render() {
    return (
      <ShowcaseContainer title="Trigger">
        <div ref={(el) => { this.wrapper = el; }}>
          {(new Array(1)).fill(0).map((i, index) => (
            <div key={`${index + 1}`} className="mt-1">
              <Trigger
                action="click"
                enterClassName="move-right-in"
                leaveClassName="move-right-out"
                popover={(
                  <Popover
                    className={classNames(
                      'p-3',
                      style.popover,
                    )}
                    ref={(el) => { this.popoverElements[index] = el; }}
                  >
                    Popover Content
                  </Popover>
                )}
              >
                <div
                  className="btn btn-primary"
                  aria-hidden
                >
                  Show Popover
                </div>
              </Trigger>
            </div>
          ))}
        </div>
      </ShowcaseContainer>
    );
  }
}

export default ShowcaseTrigger;
