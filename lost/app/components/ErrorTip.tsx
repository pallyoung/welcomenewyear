import React, { Component } from 'react'
import { createStyle } from 'themes'
import { View, Text } from 'react-native'
import Icon from 'components/FontIcon'

interface Props {
  errorMsg: string,
  style?: any
}

interface State {
  errorMsg: string
}
export default class Tips extends Component<Props, State> {
  static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    if ( nextProps.errorMsg !== prevState.errorMsg ) {
      return {
        errorMsg: nextProps.errorMsg
      }
    }

    return null
  }

  state: State = {
    errorMsg: ''
  }

  render() {
    const { style } = this.props
    const { errorMsg } = this.state
    return (
      <View>
        {
          errorMsg ? (
            <View style={[styles.errorTip, style]}>
              <Icon icon="&#xe605;" size={12} color="#e60012" />
              <Text style={styles.errorTxt}>{ errorMsg }</Text>
            </View>
          ) : null
        }
      </View>

    )
  }
}


const styles = createStyle(theme => {
  return {
    errorTip: {
      flexDirection: 'row',
      justifyContent: 'center',
    },
    errorTxt: {
      paddingLeft: 3,
      fontSize: theme.f1,
      color: '#E60012'
    }
  }
})