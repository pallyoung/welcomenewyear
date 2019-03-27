'use strict'
import React, { Component, ComponentClass } from 'react';
import Page from './Page';
import { StyleSheet, View } from 'react-native'
import {
  createAppContainer,
  StackView,
  createNavigator,
  StackRouter,
  NavigationStackRouterConfig,
  createStackNavigator as createNativeStackNavigator,
  NavigationRouteConfigMap,
  StackNavigatorConfig,
  NavigationRouter,
  NavigationState,
  NavigationRoute,
  NavigationContainer,
  NavigationContext
} from 'react-navigation';

function createPage(page: ComponentClass) {
  return Page(page);
}
// let currentRoute: any;

// function getActiveRoute(navigationState?: NavigationState | NavigationRoute): NavigationRoute | null {
//   if (!navigationState) {
//     return null;
//   }
//   const route: NavigationRoute = navigationState.routes[navigationState.index];
//   // dive into nested navigators
//   if (route.routes) {
//     return getActiveRoute(route);
//   }
//   return route;
// }

// function createRouter(routeConfigMap: NavigationRouteConfigMap, stackRouterConfig: any) {
//   const router: NavigationRouter = StackRouter(routeConfigMap, stackRouterConfig);
//   let getStateForAction = router.getStateForAction;
//   /**
//    * @description 给navigationState添加index，用来在NavigationHeader中判断是否显示后退按钮
//    */
//   //todos: 嵌套路由的情况下可能有问题
//   router.getStateForAction = function (action, state) {
//     let navigationState = getStateForAction(action, state);
//     if (navigationState) {
//       navigationState.routes.forEach((route, index) => {
//         route.index = index;
//       });
//       // currentRoute = getActiveRoute(navigationState);
//     }
//     return navigationState;
//   }
//   return router;
// }
// function createMyNavigator(routeConfigMap: any, stackRouterConfig: StackNavigatorConfig) {
//   const router: NavigationRouter = createRouter(routeConfigMap, stackRouterConfig);
//   const Navigator = createNavigator(StackView, router, stackRouterConfig);
//   return Navigator;
// }


export interface StackNavigatorPages {
  [idx: string]: ComponentClass
}
function createStackNavigator(pages: StackNavigatorPages, stackRouterConfig: NavigationStackRouterConfig) {
  let routeConfigMap: {
    [idx: string]: any
  } = {}
  for (let pageName in pages) {
    routeConfigMap[pageName] = createPage(pages[pageName]);
  }

  const stackNavigator:NavigationContainer = createNativeStackNavigator(routeConfigMap, stackRouterConfig);
  const appNavigator:NavigationContainer = createAppContainer(stackNavigator);
  return appNavigator
  // return function StackNavigatior(props: any) {
  //   return <AppNavigator
  //     {...props}
  //     onNavigationStateChange={(prevState, currentState) => {
  //       currentRoute = getActiveRoute(currentState);
  //       props.onNavigationStateChange && props.onNavigationStateChange(prevState, currentState);
  //     }} />
  // }
}


// function getCurrentPage() {
//   if (currentRoute) {
//     return Page.getPage(currentRoute.key);
//   } else {
//     return Page.getPage();
//   };
// }
// function getPageWidthName(name: string) {

// }
// function navigate(...args: any[]) {
//   let navigation = getCurrentNavigation();
//   navigation && navigation.navigate(...args);
// }
// function goBack(...args: any[]) {
//   let navigation = getCurrentNavigation();
//   navigation && navigation.goBack(...args);
// }
// function addListener(...args: any[]) {
//   let navigation = getCurrentNavigation();
//   navigation && navigation.addListener(...args);
// }

// function setParams(...args: any[]) {
//   let navigation = getCurrentNavigation();
//   navigation && navigation.setParams(...args);
// }
// function getParam() {
//   let navigation = getCurrentNavigation();
//   navigation && navigation.getParam();
// }
// function dispatch(...args: any[]) {
//   let navigation = getCurrentNavigation();
//   navigation && navigation.dispatch(...args);
// }

// function getCurrentNavigation() {
//   let page: any = getCurrentPage();
//   if (page) {
//     return page.getNavigation();
//   }
//   return null;
// }

export interface NavigationProps {
  pages: StackNavigatorPages,
  routerConfig: NavigationStackRouterConfig 
}

export default class Navigation extends Component<NavigationProps> {
  private Navigator:any;
  // static navigate = navigate;
  // static goBack = goBack;
  // static addListener = addListener;
  // static dispatch = dispatch;
  // static getCurrentNavigation = getCurrentNavigation;
  // static getCurrentPage = getCurrentPage;
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

// export default {
//     navigate,
//     goBack,
//     addListener,
//     setParams,
//     getParam,
//     dispatch,
//     getCurrentNavigation,
//     createStackNavigator,
//     getCurrentPage
// }
