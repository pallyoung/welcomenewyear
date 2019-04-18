import Alert, { AlertConfig } from 'components/Alert';
import { BaseTheme, ThemeProvider, createStyle } from 'themes'
import { View } from 'react-native-ui';
import { UserAgent } from 'native'
import React, { Component, ReactElement } from 'react';
import { ITheme } from 'themes/BaseTheme';
import Navigation from 'components/Navigation'
import Toast from 'components/Toast'
import config from 'config'
import router from 'router';
import providers from 'providers'
import actions from 'actions'
import { provider, action, subscribe, unsubscribe } from 'febrest'
import Modal from 'react-native-modalui'
import { EasingFunction } from 'react-native';
provider(providers);
actions.forEach(({ namespace, controller }) => {
  action(namespace, controller)
})

const INTIAL_ROUTE_NAME = config.env === 'dev' ? 'PageList' : 'Main'

export interface State {
  theme: ITheme,
  modalConfig: PopupConfig
}
export interface Props {

}
export interface PopupConfig {
  view?: ReactElement,
  duration?: number,
  easing?: EasingFunction,
  animationType?: string,
  onPopupShow?: () => void,
  onPopupClose?: () => void,
  onBackdropPress?: () => void,
  onBackPress?: () => void
}
class App extends Component<Props, State> {
  state: State = {
    theme: BaseTheme,
    modalConfig: {}
  }
  private _toastView: Toast | undefined;
  private _alertView: Alert | undefined
  componentDidMount() {
    UserAgent.hideMask();
    subscribe(this._ui)
  }
  setTheme(theme: ITheme) {
    this.setState({ theme })
  }
  toast(message: string, duration?: number, callback?: () => void) {
    this._toastView && this._toastView.toast(message, duration, callback)
  }
  alert(alertConfig: AlertConfig) {
    this._alertView && this._alertView.alert(alertConfig);
  }
  popup(config: PopupConfig) {
    this.setState({ modalConfig: config })
  }
  closePopup() {
    this.setState({ modalConfig: {} })
  }
  _ui = ({ cmd, data }: { cmd: string, data: any }) => {
    switch (cmd) {
      case 'sys.toast':
        return this.toast(data.message, data.duration, data.callback);
      case 'sys.alert':
        return this.alert(data);
      case 'sys.popup':
        return this.popup(data);
      case 'sys.popup.close':
        return this.closePopup();
      default:
        return;
    }
  }
  render() {
    let {
      modalConfig
    } = this.state
    return (
      <ThemeProvider
        theme={BaseTheme}>
        <View
          style={styles.wrapper}>
          <Navigation
            pages={router}
            routerConfig={{ initialRouteName: INTIAL_ROUTE_NAME }}
            style={styles.wrapper} />
          <Toast
            ref={(v: Toast) => this._toastView = v} />
          <Alert
            ref={(v: Alert) => this._alertView = v} />
          <Modal
            duration={modalConfig.duration || 500}
            easing={modalConfig.easing}
            animationType={modalConfig.animationType}
            onModalShow={modalConfig.onPopupShow}
            onModalHide={modalConfig.onPopupClose}
            onBackPress={modalConfig.onBackPress}
            onBackdropPress={modalConfig.onBackdropPress}
            children={this.props.children}
            isVisible={modalConfig.view ? true : false}
          />
        </View>
      </ThemeProvider>

    );
  }
}

const styles = createStyle(theme => {
  return {
    wrapper: {
      flex: 1,
      flexDirection: 'column'
    },
    main: {
      flex: 1,
      flexDirection: 'column'
    },
    hello: {
      color: "white",
      fontSize: 20,
      textAlign: "center",
      margin: 20
    }
  }
});


export default App;