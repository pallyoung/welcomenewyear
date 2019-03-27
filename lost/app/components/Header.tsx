import React, { Component, ReactElement } from 'react';
import { View } from 'react-native';
import { createStyle } from './../themes'

interface ButtonProps {
  type: string,
  child: ReactElement
}
class Button extends Component<ButtonProps> {
  render() {
    const {
      type,
      child
    } = this.props
    if (child) {
      return React.cloneElement(child, { style: [child.props.style, styles[type]] })
    } else {
      return null;
    }
  }
}

interface TitleProps {
  child: ReactElement
}
class Title extends Component<TitleProps> {
  render() {
    const child = this.props.child;
    if (child) {
      return React.cloneElement(child, { style: [child.props.style, styles.title] })
    }
    return null
  }
}

export interface HeaderProps {
  leftButton: ReactElement,
  rightButton: ReactElement,
  title: ReactElement,
  style: any
}
export default class Header extends Component<HeaderProps> {
  _renderLeftButton() {
    if (typeof this.props.leftButton === 'object') {
      return <Button
        type='leftButton'
        child={this.props.leftButton} />;
    }
    return <View style={styles.emptyLeftButton} />
  }
  _renderRightButton() {
    if (typeof this.props.rightButton === 'object') {
      return <Button
        type='rightButton'
        child={this.props.rightButton} />;
    } else {
      return null;
    }
  }
  _renderTitle() {
    return <Title child={this.props.title} />
  }
  render() {
    return <View
      style={[
        styles.header,
        this.props.style
      ]}>
      {this._renderLeftButton()}
      {this._renderTitle()}
      {this._renderRightButton()}
    </View>
  }
}


const styles = createStyle(function (theme) {
  return {
    header: {
      backgroundColor: theme.navigationHeaderBackgroundColor,
      flexDirection: 'row',
      height: theme.navigationHeaderHeight,
      paddingTop: theme.navigationHeaderPaddingTop
    },
    title: {
      flex: 1,
      overflow: 'hidden',
      flexDirection: 'row',
      alignItems: 'center',
    },
    emptyLeftButton: {
      marginRight: theme.navigationHeaderLeftButtonMargin,
    },
    leftButton: {
      flexDirection: 'row',
      paddingLeft: theme.navigationHeaderLeftButtonMargin,
      justifyContent: 'flex-start',
      alignItems: 'center',
      marginRight: theme.navigationHeaderLeftButtonMargin,
    },
    rightButton: {
      flexDirection: 'row',
      paddingRight: theme.navigationHeaderLeftButtonMargin,
      justifyContent: 'flex-end',
      alignItems: 'center',
      marginLeft: theme.navigationHeaderLeftButtonMargin,
    }
  }
});