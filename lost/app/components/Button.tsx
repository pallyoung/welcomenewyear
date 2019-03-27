import { TouchableHighlight, Text } from 'react-native-ui'
import React, { Component, ReactComponentElement } from 'react';
import { createStyle, ThemeConsumer } from 'themes'
import { TouchableHighlightProps, TextStyle } from 'react-native';
import { vw } from 'utils/resize';

export interface Props extends TouchableHighlightProps {
  titleStyle: TextStyle,
  backgroundColor: string,
  title: string,
  disabled: boolean,
  child: ReactComponentElement<any, any>
}
class Button extends Component<Props> {
  static defaultProps = {
    disabled: false,
    activeOpacity: 1
  }
  render() {
    let {
      child,
      style,
      titleStyle,
      title,
      disabled,
      backgroundColor,
      onPress,
      ...props
    } = this.props;
    return (
      <ThemeConsumer>
        {
          theme => {
            return (
              <TouchableHighlight
                onPress={!disabled ? onPress: undefined}
                style={[styles.button, style, backgroundColor && { backgroundColor }, { backgroundColor: disabled ? theme.disabledColor : theme.themeColor }]}
                underlayColor={disabled ? theme.disabledColor : '#bb0707'}
                {...props}>
                {
                  child ? child : <Text
                    style={[styles.wrapper, titleStyle]}>
                    {title}
                  </Text>}
              </TouchableHighlight>
            )
          }
        }
      </ThemeConsumer>
    );
  }
}

const styles = createStyle(theme => ({
  button: {
    flexDirection: 'row',
    backgroundColor: theme.themeColor,
    width: theme.defaultWidth,
    height: theme.defaultHeight,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
    alignItems: 'center'
  },
  wrapper: {
    backgroundColor: 'transparent',
    textAlign: 'center',
    fontSize: theme.f3,
    color: '#fff'
  }
}));

export default Button;