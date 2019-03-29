import React, { Component, ReactElement, PureComponent } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Header from './Header'
import { NavigationConsumer } from './Navigation'
import { createStyle } from './../themes'
import FontIcon from 'components/FontIcon'
export interface NavigationHeaderProps {
  title?: string | ReactElement,
  leftButton?: ReactElement | null,
  rightButton?: ReactElement | null,
  header?: boolean | ReactElement
}
export interface NavigationHeaderState {
  title?: string | ReactElement,
  leftButton?: ReactElement | null,
  rightButton?: ReactElement | null,
  header?: boolean | ReactElement,
  routeState?: any,
  style?: any,
  canGoBack?: boolean,
  props: NavigationHeaderProps
}
class NavigationHeader extends PureComponent<NavigationHeaderProps, NavigationHeaderState> {
  // constructor(props: NavigationHeaderProps) {
  //   super(props);
  //   this.state = {
  //     // title: props.title,
  //     // canGoBack: false,
  //     // header: props.header === null ? false : true,
  //     // leftButton: props.leftButton,
  //     // rightButton: props.rightButton,
  //   }
  // }
  // static getDerivedStateFromProps(nextProps: NavigationHeaderProps, prevState: any) {
  //   let props = prevState.props;
  //   let nextState: any = {}
  //   if (nextProps.title !== props.title) {
  //     nextState.title = nextProps.title;
  //   }
  //   if (nextProps.leftButton !== props.leftButton) {
  //     nextState.leftButton = nextProps.leftButton;
  //   }
  //   if (nextProps.rightButton !== props.rightButton) {
  //     nextState.rightButton = nextProps.rightButton;
  //   }
  //   nextState.props = nextProps;
  //   return nextState;
  // }
  // update(info: NavigationHeaderState) {
  //   this.setState(info);
  // }
  _renderLeftButton(scene: any, navigation: any): ReactElement | null {
    if (typeof this.props.leftButton === 'object') {
      return this.props.leftButton
    } else if (scene && scene.index !== 0) {
      return this._renderBackButton(navigation);
    }
    return null;
  }
  _renderBackButton(navigation: any): ReactElement {
    return (
      <TouchableOpacity
        onPress={() => navigation.goBack()}>
        <FontIcon style={styles.backArrow} icon='&#xe6e7;' />
      </TouchableOpacity>
    )

  }

  _renderTitle(header: any) {
    let child;
    const { title } = this.props;
    if (typeof title === 'object') {
      child = title;
    } else {
      child = <Text style={[styles.titleText]}>{title}</Text>
    }
    return <View>{child}</View>
  }
  render() {
    let { header, rightButton } = this.props;
    if (header === null) {
      return null;
    }
    return (
      <NavigationConsumer>
        {
          ({ scene, navigation }) => (
            <Header
              title={this._renderTitle(header)}
              rightButton={rightButton}
              leftButton={this._renderLeftButton(scene, navigation)} />
          )
        }
      </NavigationConsumer>
    )
  }
}


const styles = createStyle(function (theme) {
  return {
    titleText: {
      fontSize: theme.navigationHeaderFontSize,
      color: theme.navigationHeaderColor,
      textAlign: 'center',
      fontWeight: 'bold'
    },
    backArrow: {
      color: theme.navigationHeaderColor,
      fontFamily: 'iconfont'
    },
  }
});

export default NavigationHeader;
