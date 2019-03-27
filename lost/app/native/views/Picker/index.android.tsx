/**
 * @description - android picker
 */
'use strict'
import React, { Component, ReactElement } from 'react'
import PropTypes, { any } from 'prop-types'
import {
  View,
  Picker,
  requireNativeComponent,
  ViewPropTypes,
  ViewProps
} from 'react-native';

export interface Props extends ViewProps {
  children: ReactElement[],
  selectedValue: any,
  onChange: (event:any)=>void,
  onValueChange:(event:any)=>void
}

export interface State {
  selectedIndex: number,
  items: any[],
  keys: string[]
}
function stateFromProps(props: Props): State {
  let selectedIndex: number = 0;
  let keys: string[] = [];
  let items = React.Children.map(props.children, (child, index) => {
    if (child.props.value == props.selectedValue) {
      selectedIndex = index;
    }
    keys.push(child.props.value);
    return child.props.label;
  });
  return { selectedIndex, items, keys };
}
export default class IPickerAndroid extends Component<Props, State> {
  static propTypes = {
    ...ViewPropTypes,
    items: PropTypes.array,
    selectedIndex: PropTypes.number,
    selectedValue: PropTypes.string,
    onValueChange: PropTypes.func,
    onChange: PropTypes.func
  }
  static Item = Picker.Item;
  static getDerivedStateFromProps(nextProps: Props, prevState: State): State {
    return stateFromProps(nextProps);
  }
  state: State
  private _rctPicker: any;
  private _lastNativePosition: number = 0;
  constructor(props: Props) {
    super(props);
    this._lastNativePosition = 0;
    this.state = stateFromProps(this.props);
  }

  componentDidUpdate() {
    // The picker is a controlled component. This means we expect the
    // on*Change handlers to be in charge of updating our
    // `selectedValue` prop. That way they can also
    // disallow/undo/mutate the selection of certain values. In other
    // words, the embedder of this component should be the source of
    // truth, not the native component.
    // if (this._rctPicker && this.state.selectedIndex !== this._lastNativePosition) {
    //     this._rctPicker.setNativeProps({ selectedIndex: this.state.selectedIndex });
    //     this._lastNativePosition = this.state.selectedIndex;
    // }
  }
  // Translate prop and children into stuff that the native picker understands.
  private _onChange(event: any) {
    event.nativeEvent.value = this.state.keys[event.nativeEvent.index];
    const {
      onChange,
      onValueChange
    } = this.props;
    //this._rctPicker.setNativeProps({ selectedIndex: this.state.selectedIndex });
    onChange && onChange(event);
    onValueChange && onValueChange(event.nativeEvent.value);
  }
  render() {
    var nativeProps = {
      items: this.state.items,
      onChange: (event:any) => this._onChange(event),
      selectedIndex: this.state.selectedIndex,
      style: [{ height: 300, flex: 1 }, this.props.style],
    };
    return (
      <RCTIPicker
        {...nativeProps}
        ref={(v:any) => { this._rctPicker = v; }}
      />
    );
  }

}
const RCTIPicker = requireNativeComponent(
  'RCTIPickerAndroid',
  IPickerAndroid,
  {
    nativeOnly: {
      onChange: true,
      items: true
    }
  }
);
