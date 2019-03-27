import { StackView as NativeStackView,StackViewLayout } from 'react-navigation-stack';
import React from 'react';
export default class StackView extends NativeStackView {
  _render = (transitionProps:any, lastTransitionProps:any) => {
    const { screenProps, navigationConfig } = this.props;
    //把transitionProps 放到screenProps里面传递出去
    // function buildTransitionProps(props, state) {
    //   const { navigation, options } = props;
    
    //   const { layout, position, scenes } = state;
    
    //   const scene = scenes.find(isSceneActive);
    
    
    //   return {
    //     layout,
    //     navigation,
    //     position,
    //     scenes,
    //     scene,
    //     options,
    //     index: scene.index
    //   };
    // }
    const newScreenProps = Object.assign({},screenProps,{$$scene:transitionProps&&transitionProps.scene || {}})
    return <StackViewLayout {...navigationConfig} shadowEnabled={this._getShadowEnabled()} cardOverlayEnabled={this._getCardOverlayEnabled()} onGestureBegin={this.props.onGestureBegin} onGestureCanceled={this.props.onGestureCanceled} onGestureEnd={this.props.onGestureEnd} screenProps={newScreenProps} descriptors={this.props.descriptors} transitionProps={transitionProps} lastTransitionProps={lastTransitionProps} />;
  };
}