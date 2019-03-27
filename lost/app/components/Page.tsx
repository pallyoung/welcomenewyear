'use strict'
import React, { Component, ComponentClass } from 'react';
import { View } from 'react-native';
import { NavigationProvider } from './Navigation'
import NavigationHeader from './NavigationHeader';
const HEADER_REF = 'HEADER_REF';

// let PAGE_ID = 1;

const PAGE_INSTS: Array<Component> = [];
function emptyNavigationOptions() {
  return { header: null }
}
function Page(component: ComponentClass) {
  const getNavigationOptions = component.getNavigationOptions || emptyNavigationOptions;
  class $Page extends component {
    static navigationOptions = {
      header: null
    }
    // getNavigation() {
    //   return this.props.navigation;
    // }
    // updateHeader(props) {
    //     this.refs[HEADER_REF] && this.refs[HEADER_REF].update(props);
    // }
    render() {
      const { navigation, screenProps } = this.props;
      const navigationOptions = getNavigationOptions(this.props,this.state);
      const scene = screenProps.$$scene;
      return <View
        collapsable={true}
        style={[{ flex: 1, flexDirection: 'column' }]}>
        <NavigationProvider
          value={{
            navigation,
            scene
          }}>
          <NavigationHeader
          ref={HEADER_REF}
          {...navigationOptions} />
          <View
            collapsable={true}
            style={{ flex: 1, flexDirection: 'column' }}
            children={super.render()} />
        </NavigationProvider>

      </View>
    }
  }
  return $Page;
}

function getPage(key?: number): Component | null {
  return key ? PAGE_INSTS[key] : null;
}
Page.getPage = getPage;

export default Page;


