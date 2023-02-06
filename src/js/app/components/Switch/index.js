import React from 'react';
import styled, { css } from 'styled-components';

const StyledSwitch = styled.span`
  display: inline-block;
  vertical-align: middle;
  height: 15px;
  position: absolute;
  right: 12px;
`;
const Checkbox = styled.input`
  width: 0;
  opacity: 0;
  position: absolute;
`;
const Toggle = styled.span`
  display: inline-block;
  width: 28px;
  height: 15px;
  border-radius: 21px;
  background: ${(props) =>
    props.on ? (props.bgColor ? props.bgColor : '#006ce6') : '#444445'};
  cursor: pointer;
  position: relative;
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 2px;
    left: 2px;
    height: 11px;
    width: 11px;
    border-radius: 24px;
    background: #fff;
    transition: transform 0.25s ease, width 0.25s, left 0.5s;
    transform: translateX(${(props) => (props.on ? '13px' : 0)});
  }
  ${({ readOnly }) =>
    readOnly
      ? css`
          opacity: 0.4;
          cursor: not-allowed;
        `
      : css`
          &:active {
            &:before {
              width: 30px;
              left: ${(props) => (props.on ? '0' : '4px')};
            }
          }
        `};
`;

const Label = styled.label`
  vertical-align: top;
  line-height: 15px;
  font-size: 13px;
  letter-spacing: 1px;
  text-transform: uppercase;
  color: #757575;
  padding-left: 16px;
`;

class Switch extends React.Component {
  constructor(props) {
    super(props);
    this.state = { on: props.on };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.on !== this.state.on) this.setState({ on: newProps.on });
  }

  onToggle() {
    if (this.props.readOnly) return;
    this.setState((currentState) => {
      if (this.props.onToggle) this.props.onToggle(!currentState.on);
      return { on: !currentState.on };
    });
  }

  render() {
    const [onLabel, offLabel] = this.props.accessibleLabels;
    /*
      The checkbox is controlled by the component state
      and is itself a readOnly component
    */
    return (
      <StyledSwitch onClick={this.onToggle.bind(this)}>
        <Checkbox
          type="checkbox"
          checked={this.state.on}
          readOnly
          id={this.props.id}
        />
        <Toggle
          bgColor={this.props.bgColor}
          on={this.state.on}
          readOnly={this.props.readOnly}
        />
        {this.props.showLabel && (
          <Label>{this.state.on ? onLabel : offLabel}</Label>
        )}
      </StyledSwitch>
    );
  }
}

Switch.defaultProps = {
  onToggle: null,
  on: false,
  accessibleLabels: ['Enabled', 'Disabled'],
  readOnly: false,
};

export default Switch;
export { StyledSwitch };
