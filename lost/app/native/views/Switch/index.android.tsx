/**
 * @description - Android仿ios Switch
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {
  requireNativeComponent,
  ViewPropTypes,
  ViewProps,
  NativeSyntheticEvent
} from 'react-native';

export interface Props extends ViewProps {
  value?: boolean,
  disabled?: boolean,
  onValueChange?: (event: any) => void,
  onChange?: (event: NativeSyntheticEvent<any>) => void,
  tintColor?: string,
  onTintColor?: string,
  thumbTintColor?: string
}
export interface State {

}
export default class SwitchAndroid extends Component<Props, State> {
  static propTypes = {
    ...ViewPropTypes,
    value: PropTypes.bool,
    disabled: PropTypes.bool,
    onValueChange: PropTypes.func,
    tintColor: PropTypes.string,
    onTintColor: PropTypes.string,
    thumbTintColor: PropTypes.string,

  }
  static defaultProps = {
    disabled: false,
    tintColor: '#FFFFFF',
    onTintColor: '#329DFF'
  }
  private _rctSwitch: any
  state: State = {

  }
  _onChange(event: NativeSyntheticEvent<any>) {
    this._rctSwitch.setNativeProps({ value: this.props.value });
    let {
      onChange,
      onValueChange
    } = this.props
    onChange && onChange(event);
    onValueChange && onValueChange(event.nativeEvent.value);
  }
  render() {
    var props = { ...this.props };
    props.onStartShouldSetResponder = () => true;
    props.onResponderTerminationRequest = () => false;
    return (
      <RCTSwitch
        {...props}
        style={[{ height: 31, width: 51 }, props.style]}
        ref={(ref: any) => { this._rctSwitch = ref; }}
        onChange={(e: NativeSyntheticEvent<any>) => this._onChange(e)}
      />
    );
  }
}

const RCTSwitch = requireNativeComponent(
  'RCTSwitchAndroid',
  SwitchAndroid,
  {
    nativeOnly: { onChange: true }
  }
);