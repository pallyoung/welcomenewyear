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
import { Song } from 'providers/MusicProvider/MusicEngine';
import Modal from 'react-native-modalui'
import { Easing } from 'react-native';
import SongMenu from './SongMenu'
interface State {
  keyword: string,
  curPage: number,
  songs: { [key: string]: { curPage: number, list: Song[], totalCount: number } },
  platform: string | undefined,
  showMenu: boolean,
  selectSong: Song | null
}
export default class Search extends PureComponent {
  static getNavigationOptions() {
    return {
      title: '搜索',
      header: null
    }
  }
  state: State = {
    keyword: '',
    curPage: 1,
    songs: {

    },
    selectSong: null,
    showMenu: false,
    platform: undefined
  }
  private _search = () => {
    const {
      keyword,
      platform = 'qq',
      songs
    } = this.state;
    const songsForPlatform = songs[platform] || {};
    let { curPage = 0, totalCount = 0, list } = songsForPlatform;
    if (!list || totalCount > list.length) {
      curPage++;
    } else {
      return;
    }
    dispatch('music.search', { keyword, curPage, platform }).then(({ list, total }: any) => {
      if (list && list.length > 0) {
        this._mergeSongs(platform, { list, total, curPage })
      }
    })
  }
  private _nextPage() {
    this._search();
  }
  private _changePlatform = (platform: string) => {
    let { songs } = this.state;
    let data = songs[platform] || {};
    if (data.totalCount === undefined) {
      this.state.platform = platform;
      this._search();
    } else {
      this.setState({ platform })
    }
  }
  private _mergeSongs(platform: string, data: { list: Song[], total: number, curPage: number }) {
    const { songs } = this.state;
    const songsForPlatform = songs[platform] || {};
    songsForPlatform.list = data.list.concat(songsForPlatform.list || []);
    songsForPlatform.curPage = data.curPage;
    songsForPlatform.totalCount = data.total;
    songs[platform] = songsForPlatform;
    this.setState({ songs, platform });
  }
  private _songsForPlatform(platform: string): Song[] {
    let { songs } = this.state;
    let data = songs[platform] || {};
    return data.list || []
  }
  private _showSongMenu = (song: Song) => {
    this.setState({ showMenu: true, selectSong: song })
  }
  private _hideSongMenu = ()=>{
    this.setState({ showMenu: false })
  }
  private _onModalBackPress = () => {
    let {
      showMenu
    } = this.state;
    if (showMenu) {
      this.setState({ showMenu: false });
      return true;
    }
    return false;

  }
  private _onModalBackdropPress = () => {
    this.setState({ showMenu: false });
  }
  render() {
    let { platform, showMenu, selectSong } = this.state;
    let songs = platform ? this._songsForPlatform(platform) : [];
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
                {
                  platform ? [
                    <EngineBar
                      key="EngineBar"
                      onChange={this._changePlatform} />,
                    <MusicList
                      key="MusicList"
                      data={songs}
                      onItemMenuPress={this._showSongMenu} />

                  ] : null
                }
                <Modal
                  duration={200}
                  easing={Easing.linear}
                  animationType={'slideUp'}
                  onBackPress={this._onModalBackPress}
                  onBackdropPress={this._onModalBackdropPress}
                  isVisible={showMenu}>
                  <SongMenu song={selectSong} onCancel={this._hideSongMenu} />
                </Modal>
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