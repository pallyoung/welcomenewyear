import React, { Component, ReactElement, RefObject, ReactNode, PureComponent } from 'react'
import { View } from 'react-native-ui'
import Item, { ValidateResult } from './FormItem';
import { createStyle } from 'themes';
import { ViewStyle } from 'react-native';

export interface Props {
  style?: ViewStyle
}
export interface State {

}
interface Refs { [key: string]: RefObject<Item> }
export default class Form extends PureComponent<Props, State>{
  static Item = Item;
  private _refs: Refs = {};
  private _renderItems(children: any): ReactElement[] {
    const refs: Refs = {};
    this._refs = refs;
    return React.Children.map(children, (child, index) => {
      if (child.type && child.type.displayName === 'FormItem') {
        let ref: RefObject<Item> = React.createRef();
        refs['_' + index] = ref;
        return React.cloneElement(child, {
          ref
        });
      } else {
        return child;
      }
    })
  }
  validate() {
    const refs = this._refs;
    let result: ValidateResult = { ok: true, message: '' };
    for (let item in refs) {
      const current = refs[item].current;
      if (current) {
        result = current.validate();
        if (!result.ok) {
          return result;
        }
      }
    }
    result.message = '';
    return result;
  }
  render() {
    let {
      children,
      style
    } = this.props;
    return (
      <View
        style={[style, styles.column]}>
        {this._renderItems(children)}
      </View>
    );
  }
}
const styles = createStyle(theme => {
  return {
    column: {
      flexDirection: 'column'
    }
  }
})