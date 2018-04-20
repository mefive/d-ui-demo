import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import isEqual from 'lodash/isEqual';

import './style/index.scss';

import Trigger from '../Trigger';
import Popover from '../Popover/index';
import Clickable from '../Clickable';

const propTypes = {
  className: PropTypes.string,
  options: PropTypes.arrayOf(PropTypes.shape({
    value: PropTypes.any,
    title: PropTypes.string.isRequired,
  })),
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.array,
    PropTypes.bool,
  ]),
  width: PropTypes.number,
  optionsHeight: PropTypes.number,
  getPopoverContainer: PropTypes.func,
  placement: PropTypes.shape({
    vertical: PropTypes.string,
    horizontal: PropTypes.string,
  }),
  title: PropTypes.string,
  defaultTitle: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  popoverClassName: PropTypes.string,
  renderTitle: PropTypes.func,
  renderOption: PropTypes.func,
  multiple: PropTypes.bool,
  max: PropTypes.number,
};

const defaultProps = {
  width: null,
  className: null,
  optionsHeight: 200,
  defaultTitle: '请选择',
  onChange: () => null,
  placement: {
    // vertical: Popover.PLACEMENT_BOTTOM,
    vertical: Popover.PLACEMENT_TOP,
    horizontal: Popover.PLACEMENT_CENTER,
  },
  getPopoverContainer: null,
  value: null,
  options: [],
  disabled: false,
  title: null,
  popoverClassName: null,
  renderTitle: null,
  renderOption: null,
  multiple: false,
  max: null,
};

class Select extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      triggerWidth: 0,
      multipleSelection: [],
      placement: this.props.placement,
    };

    this.confirmSelection = this.confirmSelection.bind(this);
    this.setActive = this.setActive.bind(this);
  }

  componentDidMount() {
    this.setTriggerWidth();
  }

  componentDidUpdate(prevProps, { active }) {
    if (this.state.active !== active && !this.props.multiple) {
      if (this.selectedElement) {
        this.optionsWrapper.scrollTop = this.selectedElement.offsetTop;
      }
    }
  }

  setActive(active) {
    const old = this.state.active;

    this.setState({ active }, () => {
      if (active && !old) {
        if (this.props.multiple) {
          this.setState({ multipleSelection: this.props.value || [] });
        }

        this.setTriggerWidth();
      }
    });
  }

  setTriggerWidth() {
    this.setState({
      triggerWidth:
        this.trigger.offsetWidth,
    });
  }

  getTitle() {
    if (this.props.renderTitle) {
      return this.props.renderTitle();
    }

    const {
      value, options, multiple, defaultTitle,
    } = this.props;

    let option;
    let title;

    if (multiple && value) {
      option = options.filter(i => value.indexOf(i.value) !== -1);

      title = option.map(i => i.title).join(',');
    } else {
      option = options.find(i => i.value === value);
      title = option ? option.title : '';
    }

    return title || defaultTitle;
  }

  select(value) {
    const { value: old, onChange, multiple } = this.props;

    if (!multiple) {
      if (value !== old) {
        onChange(value);
      }

      this.setActive(false);
    } else {
      const multipleSelection = [...this.state.multipleSelection];
      const index = multipleSelection.indexOf(value);

      if (index === -1) {
        const { max } = this.props;
        if (max == null || multipleSelection.length < max) {
          multipleSelection.push(value);
        }
      } else {
        multipleSelection.splice(index, 1);
      }

      this.setState({ multipleSelection });
    }
  }

  confirmSelection() {
    const { multipleSelection } = this.state;

    if (!isEqual(multipleSelection, this.props.value)) {
      this.props.onChange([...multipleSelection]);
    }

    this.setState({ multipleSelection: [] });
    this.setActive(false);
  }

  render() {
    return (
      <Trigger
        active={this.state.active}
        disabled={this.props.disabled}
        getPopoverContainer={this.props.getPopoverContainer}
        enterClassName={this.state.placement.vertical === Popover.PLACEMENT_BOTTOM
          ? 'slide-down-in' : 'slide-up-in'}
        leaveClassName={this.state.placement.vertical === Popover.PLACEMENT_BOTTOM
          ? 'slide-down-out' : 'slide-up-out'}
        popover={
          <Popover
            placement={this.state.placement}
            onPlacementChange={placement => this.setState({ placement })}
            offset={5}
            className={classNames(
              'select-popup text-sm',
              this.props.popoverClassName,
            )}
          >
            <div
              style={{
                height: this.props.multiple ? this.props.optionsHeight : null,
                maxHeight: this.props.multiple ? null : this.props.optionsHeight,
                width: this.state.triggerWidth,
              }}
            >
              <div
                className="wrapper"
                style={{
                  height: this.props.multiple ? this.props.optionsHeight - 32 : null,
                  maxHeight: this.props.multiple ? null : this.props.optionsHeight,
                }}
                ref={(el) => { this.optionsWrapper = el; }}
              >
                <ul>
                  {this.props.options != null && this.props.options.map(i => (
                    <Clickable
                      onClick={(e) => {
                        e.stopPropagation();
                        this.select(i.value);
                      }}
                      key={i.value}
                    >
                      <li
                        className={classNames({
                          active: this.props.multiple
                            ? this.state.multipleSelection.indexOf(i.value) !== -1
                            : i.value === this.props.value,
                        })}
                        ref={(el) => {
                          if (i.value === this.props.value) {
                            this.selectedElement = el;
                          }
                        }}
                      >
                        {this.props.multiple && i.value === this.props.value && (
                          <i className="icon icon-check" />
                        )}

                        {this.props.renderOption
                          ? this.props.renderOption(i.value)
                          : i.title
                        }
                      </li>
                    </Clickable>
                  ))}
                </ul>
              </div>

              {this.props.multiple && (
                <div className="actions">
                  <Clickable
                    onClick={this.confirmSelection}
                  >
                    <div
                      className="btn btn-sm btn-primary"
                    >
                      确定
                    </div>
                  </Clickable>
                </div>
              )}
            </div>
          </Popover>
        }
        onActiveChange={this.setActive}
      >
        <div
          className={classNames(
            'select',
            { [this.props.className]: this.props.className != null },
            { disabled: this.props.disabled },
          )}
          style={{ width: this.props.width || null }}
        >
          <div
            className={classNames(
              'select-trigger',
              { active: this.state.active },
            )}
            ref={(el) => { this.trigger = el; }}
          >
            {this.props.title || this.getTitle()}

            <div className="trigger-icon">
              <i className="icon icon-caret-down" />
            </div>
          </div>
        </div>
      </Trigger>
    );
  }
}

Select.propTypes = propTypes;
Select.defaultProps = defaultProps;

export default Select;
