import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';

const propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  title: PropTypes.string,
};

const defaultProps = {
  className: null,
  children: null,
  title: null,
};

class ShowcaseContainer extends React.PureComponent {
  render() {
    const { className } = this.props;

    return (
      <div className={classNames(
        'showcase',
        { [className]: !!className },
      )}
      >
        <h1>{this.props.title}</h1>
        <div className="items">
          {this.props.children}
        </div>
      </div>
    );
  }
}

ShowcaseContainer.propTypes = propTypes;
ShowcaseContainer.defaultProps = defaultProps;

export default ShowcaseContainer;
