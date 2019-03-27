import React, { Component, ComponentClass } from 'react';
import Page from './../Page';
import {
  createAppContainer,
  createNavigator as createNativeNavigator,
  StackRouter,
  NavigationStackRouterConfig,
  NavigationRouter,
  NavigationContainer,
} from 'react-navigation';
import StackView from './StackView'
import NavigationContext from './NavigationContext'
import NavigationConsumer from './NavigationConsumer'
import NavigationProvider from './NavigationProvider'


function createPage(page: ComponentClass) {
  return Page(page);
}
export interface StackNavigatorPages {
  [idx: string]: ComponentClass
}
function createNavigator(routeConfigMap: any, stackRouterConfig:any) {
  const router: NavigationRouter = StackRouter(routeConfigMap, stackRouterConfig);
  const navigator = createNativeNavigator(StackView, router, stackRouterConfig);
  return navigator;
}
function createStackNavigator(pages: StackNavigatorPages, stackRouterConfig: NavigationStackRouterConfig) {
  let routeConfigMap: {
    [idx: string]: any
  } = {}
  for (let pageName in pages) {
    routeConfigMap[pageName] = createPage(pages[pageName]);
  }

  const stackNavigator:NavigationContainer = createNavigator(routeConfigMap, stackRouterConfig);
  const appNavigator:NavigationContainer = createAppContainer(stackNavigator);
  return appNavigator
}

export interface NavigationProps {
  pages: StackNavigatorPages,
  routerConfig: NavigationStackRouterConfig 
}

class Navigation extends Component<NavigationProps> {
  private Navigator:any;
  constructor(props: NavigationProps) {
    super(props);
    if(props.pages) {
      this.Navigator = createStackNavigator(props.pages,props.routerConfig);
    }
  }
  render() {
    let Navigator = this.Navigator;
    if(Navigator) {
      return <Navigator style={{flex:1}} {...this.props}></Navigator>
    }
    return null;
  }
}

export {
  Navigation as default,
  NavigationConsumer,
  NavigationContext,
  NavigationProvider
}