import React, { PureComponent } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native-ui'
import { createStyle } from 'themes';
import { MusicEngineType } from 'providers/MusicProvider';
import { vw } from 'utils/resize';
import FontIcon from 'components/FontIcon'
import { Song, Singer } from 'providers/MusicProvider/MusicEngine';
import { MusicManager } from 'native';
function ItemButton({ text, icon, onPress }: { text: string, icon: string, onPress: () => void }) {
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={onPress}
      style={styles.itemButton}>
      <FontIcon
        style={styles.itemButtonIcon}
        icon={icon}
        color='#222'
        size={26} />
      <Text
        style={styles.itemButtonText}>
        {text}
      </Text>
    </TouchableOpacity>
  )
}

interface Props {
  song: Song,
  onCancel: () => void
}

export default class SongMenu extends PureComponent<Props> {
  state = {

  }
  private _dispatchButtonMethods = (method: string) => {
    let {
      song,
      onCancel
    } = this.props;
    console.log(song)
    MusicManager.download(song)
    onCancel();
  }
  render() {
    let {
      song,
      onCancel
    } = this.props;
    return (
      <View
        style={styles.wrapper}>
        <View
          style={styles.menuHeader}>
          <Text
            style={styles.song}>
            {song.name}
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Text
              style={styles.singer}>
              {
                song.singer.map((item: Singer) => {
                  return item.name
                }).join(' ')
              }
            </Text>
          </Text>
        </View>
        <View
          style={styles.menu}>
          <ItemButton
            icon="&#xe6ea;"
            text="下一首播放"
            onPress={() => { this._dispatchButtonMethods('next') }} />
          <ItemButton
            icon="&#xe6c1;"
            text="加入歌单"
            onPress={() => { this._dispatchButtonMethods('addToList') }} />
          <ItemButton
            icon="&#xe6ae;"
            text="下载"
            onPress={() => { this._dispatchButtonMethods('download') }} />
        </View>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onCancel}
          style={styles.menuFooter}>
          <Text
            style={styles.menuFooterText}>
            取消
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = createStyle(theme => {
  return {
    wrapper: {
      position: 'absolute',
      bottom: 0,
      width: vw(100),
      backgroundColor: theme.backgroundColor
    },
    menuHeader: {
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderBottomColor: theme.borderColor,
      borderBottomWidth: theme.px,
    },
    song: {
      color: theme.color,
      fontSize: theme.f2,
    },
    singer: {
      color: '#666'
    },
    menu: {
      flexDirection: 'row',
      borderBottomColor: theme.borderColor,
      borderBottomWidth: theme.px
    },
    menuFooter: {
      justifyContent: 'center',
      alignItems: 'center',
      height: 32
    },
    menuFooterText: {
      color: theme.color,
      fontSize: theme.f3
    },
    itemButton: {
      paddingHorizontal: 10,
      paddingVertical: 8,
      justifyContent: 'center',
      alignItems: 'center'
    },
    itemButtonText: {
      color: '#666',
      fontSize: theme.f1,
    },
    itemButtonIcon: {
      borderRadius: 8,
      height: 32,
      width: 32,
      textAlign: 'center',
      lineHeight: 32,
      backgroundColor: '#fff',
      marginBottom: 4
    }
  }
})