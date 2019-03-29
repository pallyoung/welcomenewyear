import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui'
import TextInput from 'components/TextInput'
import FontIcon from 'components/FontIcon'
import Header from 'components/Header'
import { NavigationConsumer } from 'components/Navigation'
import { createStyle } from 'themes';
export default class Search extends PureComponent {
  static getNavigationOptions() {
    return {
      title: '搜索',
      header: null
    }
  }
  private _search=()=>{
    
  }
  render() {
    return (
      <NavigationConsumer>
        {
          ({ navigation }) => {
            return (
              < View >
                <Header
                  leftButton={
                    <TouchableOpacity
                      onPress={() => navigation.goBack()}>
                      <FontIcon
                        icon='&#xe6e7;'
                        style={styles.backArrow} />
                    </TouchableOpacity>
                  }
                  title={
                    <View>
                      <TextInput
                        style={styles.input}
                        placeholder="搜索音乐" 
                        placeholderTextColor="#ffffff88"
                        returnKeyType="search"
                        onSubmitEditing={this._search}/>
                    </View>
                  } />
                <Text>
                  search
              </Text>
              </View>
            )
          }
        }
      </NavigationConsumer>

    )
  }
}

const styles = createStyle(theme => {
  return {
    backArrow: {
      color: theme.navigationHeaderColor
    },
    input: {
      backgroundColor: 'transparent',
      borderRadius: 0,
      height: 30
    }
  }
})