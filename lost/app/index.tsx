import Alert, { AlertConfig } from 'components/Alert';
import { BaseTheme, ThemeProvider, createStyle } from 'themes'
import { View } from 'react-native-ui';
import {UserAgent} from 'native'
import React,{ Component } from 'react';
import { ITheme } from 'themes/BaseTheme';
import Navigation from 'components/Navigation'
import Toast from 'components/Toast'
import config from 'config'
import router from 'router';

const INTIAL_ROUTE_NAME = config.env === 'dev' ? 'PageList' : 'Main'

export interface State {
  theme:ITheme
}
export interface Props {

}
class App extends Component<Props, State> {
  state: State = {
    theme: BaseTheme
  }
  private _toastView: Toast | undefined;
  private _alertView: Alert | undefined
  componentDidMount() {
    UserAgent.hideMask();
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
  render() {
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