import FontIcon from 'components/FontIcon';
import React, { PureComponent } from 'react'

import { createStyle } from 'themes';
import { vh } from 'utils/resize';
import { NavigationConsumer } from 'components/Navigation'

interface State {
  isPlay: boolean,
  rotate: number
}
interface Props {

}
export default class MusicButton extends PureComponent<Props, State>{
  state: State = {
    isPlay: false,
    rotate: 0
  }
  startTime: number = 0;
  animation: any;
  navigateTinker: any
  private _togglePlay = () => {
    let {
      isPlay,
    } = this.state;
    if (isPlay) {
      this._stop();
    } else {
      this._play()
    }
  }
  private _play = () => {
    if (this.startTime == 0) {
      this.startTime = Date.now();
    } else {
      const {
        startTime
      } = this;
      const duration = 1500;
      const rotate = (Date.now() - startTime) / duration * 360 % 360;
      this.setState({ rotate, isPlay: true })
    }
    this.animation = requestAnimationFrame(this._play)
  }
  private _stop = () => {
    cancelAnimationFrame(this.animation)
    this.setState({ rotate: 0, isPlay: false })
  }
  private _waitForNavigate(navigation: any) {
    this._stopNavigate();
    this.navigateTinker = setTimeout(() => navigation.navigate('MusicSearch'), 2000)

  }
  private _stopNavigate() {
    if (this.navigateTinker) {
      clearTimeout(this.navigateTinker)
    }
    this.navigateTinker = undefined;
  }
  componentWillUnmount() {
    this._stop();
  }
  render() {
    const {
      isPlay,
      rotate
    } = this.state;
    return (
      <NavigationConsumer>
        {
          ({ navigation }) => {
            return <FontIcon
              onPress={this._togglePlay}
              onTouchStart={() => this._waitForNavigate(navigation)}
              onTouchEnd={() => this._stopNavigate()}
              icon={isPlay ? "&#xe6b3;" : "&#xe6d7;"}
              color="#888"
              size={35}
              style={[styles.wrapper, {
                transform: [{
                  rotate: rotate + 'deg'
                }]
              }]} />
          }
        }
      </NavigationConsumer>
    );
  }
}

const styles = createStyle(themes => {
  return {
    wrapper: {
      position: 'absolute',
      right: 20,
      top: 30
    }
  }
})