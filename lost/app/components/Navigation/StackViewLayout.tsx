import { StackViewLayout as NativeStackViewLayout } from 'react-navigation-stack';
import React from 'react';
import { StyleSheet, View } from 'react-native'
import {
  NavigationContext
} from 'react-navigation'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
    overflow: 'hidden'
  },
  scenes: {
    flex: 1
  }
});
export default class StackViewLayout extends NativeStackViewLayout {
  _renderInnerScene(scene:any) {
    const { navigation, getComponent } = scene.descriptor;
    const SceneComponent:any = getComponent();

    const { screenProps } = this.props;
    return <View style={styles.container}>
      <View style={styles.scenes}>
        <NavigationContext.Provider value={navigation}>
          <SceneComponent scene={scene} screenProps={screenProps} navigation={navigation} />
        </NavigationContext.Provider>
      </View>
    </View>;
  }
  render() {
    const { transitionProps } = this.props;
    const {
      navigation: {
        state: { index }
      },
      scenes
    } = transitionProps;
    return super.render()
  }
}