import React, { PureComponent } from 'react'
import { View, Text, TouchableOpacity } from 'react-native-ui'
import TextInput from 'components/TextInput'
import FontIcon from 'components/FontIcon'
import Header from 'components/Header'
import { NavigationConsumer } from 'components/Navigation'
import { createStyle } from 'themes';
import { dispatch } from 'febrest'
import MusicList from './MusicList';
import EngineBar from './EngineBar'
export default class Search extends PureComponent {
  static getNavigationOptions() {
    return {
      title: '搜索',
      header: null
    }
  }
  state = {
    keyword: '',
    curPage: 1,
    songs: [],
    platform: 'qq'
  }
  private _search = () => {
    const {
      keyword,
      curPage,
      platform
    } = this.state;
    dispatch('music.search', { keyword, curPage, platform }).then(({ list, total }:any) => {
      this.setState({songs:list})
    })
  }
  private _changePlatform=(platform:string)=>{
    this.state.platform = platform;
    this._search()
  }
  render() {
    return (
      <NavigationConsumer>
        {
          ({ navigation }) => {
            return (
              <View 
                style={styles.wrapper}>
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
                        onChangeText={v => this.state.keyword = v}
                        onSubmitEditing={this._search} />
                    </View>
                  } />
                  <EngineBar 
                    onChange={this._changePlatform}/>
                  <MusicList
                    data={this.state.songs} />
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
    wrapper: {
      flex: 1
    },
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