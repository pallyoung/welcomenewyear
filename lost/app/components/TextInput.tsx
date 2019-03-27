import { TextInput, View, TouchableOpacity } from 'react-native-ui'
import React, { Component, ReactComponentElement, PureComponent } from 'react';
import { createStyle, ThemeConsumer } from 'themes';
import { TextInputProps, TextInputFocusEventData, NativeSyntheticEvent, TextInputChangeEventData } from 'react-native';
import FontIcon from './FontIcon'
import { vw } from 'utils/resize';
export interface Props extends TextInputProps {
  leftChild?: ReactComponentElement<any, any>,
  rightChild?: ReactComponentElement<any, any>,
  forwardedRef?: any,
  showClearButton?: boolean
}
export interface State {
  focus: boolean,
  secureTextVisible: boolean,
  value: string
}
class Input extends PureComponent<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if (nextProps.value !== undefined) {
      return {
        value: nextProps.value
      }
    }
    return null
  }

  state: State = {
    focus: false,
    secureTextVisible: false,
    value: ''
  }
  private _input: any;
  private _onChange = (event: NativeSyntheticEvent<TextInputChangeEventData>) => {
    let value = event.nativeEvent.text
    let {
      onChangeText,
      onChange,
      value: propsValue
    } = this.props;
    onChangeText && onChangeText(value);
    onChange && onChange(event)
    if (propsValue === undefined) {
      this.setState({ value });
    }
  }
  private _toggleSecureTextVisible = () => {
    this.setState({
      secureTextVisible: !this.state.secureTextVisible
    })
  }
  private _onFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    let {
      onFocus
    } = this.props;
    this.setState({
      focus: true
    }, () => {
      onFocus && onFocus(e);
    })
  }
  private _onBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    let {
      onBlur
    } = this.props;
    this.setState({
      focus: false
    }, () => {
      onBlur && onBlur(e);
    })
  }
  private _clear() {
    this._input.current && this._input.current.clear();
    /** 
     * android调用input的clear方法不触发change事件
     * ios下未测试
     * 如果后续rn修复该bug可以移除下面这段避免重复触发
    */
    this._onChange({ nativeEvent: { text: '', target: this._input } })
  }
  render() {
    const {
      leftChild,
      rightChild,
      style
    } = this.props;
    const {
      focus
    } = this.state;
    return (
      <ThemeConsumer>
        {theme => {
          return (
            <View
              style={[styles.wrapper, style, { borderColor: focus ? theme.themeColor : 'transparent' }]}>
              {leftChild || null}
              {this._renderInput()}
              {rightChild || null}
            </View>
          )
        }}
      </ThemeConsumer>

    );
  }
  private _renderInput(): ReactComponentElement<any, any> {
    let {
      clearButtonMode,
      secureTextEntry,
      forwardedRef,
      showClearButton,
      ...props
    } = this.props;
    let ref = this._input = forwardedRef;
    if (!forwardedRef) {
      ref = React.createRef();
      this._input = ref;
    }
    if (typeof forwardedRef === 'function') {
      ref = (v: any) => {
        forwardedRef(v);
        this._input = {
          current: v
        }
      }
    }
    let {
      focus,
      value,
      secureTextVisible,
    } = this.state
    return (
      <View
        style={styles.inputWrapper}>
        <TextInput
          ref={ref}
          {...props}
          multiline={false}
          secureTextEntry={secureTextVisible ? false : secureTextEntry}
          underlineColorAndroid="transparent"
          clearButtonMode='never'
          onFocus={this._onFocus}
          onBlur={this._onBlur}
          onChangeText={undefined}
          onChange={this._onChange}
          style={styles.input}
          value={value} />
        {
          secureTextEntry ? (
            <TouchableOpacity
              activeOpacity={1}
              onPress={this._toggleSecureTextVisible}
              style={styles.secureTextVisibleEye}>
              <FontIcon
                icon={secureTextVisible ? '&#xe603;' : '&#xe604;'}
                color="#dbdbdb"
                size={26} />
            </TouchableOpacity>
          ) : (
              <TouchableOpacity
                activeOpacity={1}
                onPress={() => { (!secureTextEntry && value) && this._clear() }}
                style={styles.secureTextVisibleEye}>
                {
                  showClearButton ? (
                    <FontIcon
                      icon='&#xe607;'
                      size={22}
                      color={(secureTextEntry || !value) ? 'transparent' : '#dbdbdb'} />) : null
                }

              </TouchableOpacity>
            )
        }
      </View>
    )
  }
}

const styles = createStyle(theme => ({
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    height: theme.defaultHeight,
    paddingLeft: 12,
    paddingRight: 6,
    borderRadius: theme.borderRadius,
    width: theme.defaultWidth,
    backgroundColor: '#fff',
    borderColor: theme.borderColor,
    borderWidth: theme.px,
  },
  inputWrapper: {
    flexDirection: 'row',
    flex: 1,
    backgroundColor: 'transparent'
  },
  input: {
    lineHeight: theme.defaultHeight,
    height: theme.defaultHeight,
    flex: 1,
    padding: 0,
    fontSize: theme.f3,
    color: '#333'
  },
  secureTextVisibleEye: {
    justifyContent: 'center',
    alignContent: 'center',
  }
}))
export default React.forwardRef((props: Props, ref) => {
  return <Input {...props} forwardedRef={ref} />
})