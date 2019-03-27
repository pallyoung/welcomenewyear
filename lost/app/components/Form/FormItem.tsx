import React, { Component, ReactElement, RefObject, forwardRef, PureComponent } from 'react'
import { View, Text } from 'react-native-ui'
import { ViewStyle } from 'react-native';
import PropTypes from 'prop-types'
import validate from 'utils/validate'

export interface Validator {
  rule: string | ((v: any) => boolean),
  message: string
}
export interface ValidateResult {
  message?: string,
  ok: boolean
}
export interface Props {
  style?: ViewStyle,
  getValue?: () => any,
  validator?: Validator | Validator[]
}
export interface State {

}

export default class FormItem extends PureComponent<Props, State>{
  static propTypes = {
    style: PropTypes.oneOfType([PropTypes.object, PropTypes.array, PropTypes.number])
  }
  validate(): ValidateResult {
    const {
      validator,
      getValue
    } = this.props;
    let result: ValidateResult = {
      message: '',
      ok: true
    }
    if (!getValue || !validator) {
      return result;
    }
    const value: any = getValue();

    const validateMethod: ((validator: Validator) => ValidateResult) = (validator: Validator) => {
      const {
        rule,
        message
      } = validator;
      if (typeof rule === 'string') {
        return { message, ok: validate(rule, value) };
      } else {
        return { message, ok: rule(value) };
      }
    }
    if (Array.isArray(validator)) {
      validator.every((validator: Validator, i) => {
        result = validateMethod(validator);
        return result.ok;
      });
    } else {
      result = validateMethod(validator)
    }
    return result;
  }
  render() {
    let {
      children,
      style
    } = this.props;
    return (
      <View
        style={style}>
        {this._renderChildren(children)}
      </View>
    );
  }
  private _renderChildren(children: any) {
    if (React.Children.count(children) > 1) {
      throw new Error('FormItem can only have one child');
    }
    return React.cloneElement(children, {
      style: [children.props.style]
    })
  }
}

// export default forwardRef((props: Props, ref:any) => {
//   return <FormItem {...props} ref={ref} />
// })