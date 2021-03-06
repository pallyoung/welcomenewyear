import React, { PureComponent } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native-ui'
import { createStyle } from 'themes';
import { Singer, Song } from 'providers/MusicProvider/MusicEngine';
import FontIcon from 'components/FontIcon'

interface Props {
  data: Song[],
  onItemMenuPress: (song:Song)=>void
}
interface State {

}
export default class MusicList extends PureComponent<Props, State> {

  private _renderItem=({ item }: { item: Song, index: number })=> {
    return (
      <TouchableOpacity
        style={styles.item}>
        <View
          style={styles.itemContent}>
          <Text
            style={styles.title}>
            {item.name}
          </Text>
          <Text
            style={styles.singer}>
            {item.singer.map((item: Singer) => {
              return item.name
            }).join(' ')}
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Text
              style={styles.album}>
              {item.album}
            </Text>
          </Text>
        </View>
        <TouchableOpacity
          style={styles.iconMoreButton}
          onPress={()=>this.props.onItemMenuPress(item)}>
          <FontIcon 
            icon="&#xe630;"
            size={26}/>
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }
  render() {

    const {
      data
    } = this.props;
    return (
      <FlatList
        data={data}
        renderItem={this._renderItem}
        keyExtractor={(item) => 'key_' + item.id}
        style={styles.wrapper} />
    );
  }
}

const styles = createStyle(theme => {
  return {
    wrapper: {
      flex: 1
    },
    item: {
      height: 48,
      paddingLeft: 8
    },
    itemContent: {
      flex: 1,
      borderBottomColor: theme.borderColor,
      borderBottomWidth: theme.px,
    },
    iconMoreButton:{
      position:'absolute',
      height: 48,
      right: 0,
      paddingHorizontal: 8,
      justifyContent: 'center'
    },
    title: {
      color: '#333',
      fontSize: theme.f3,
      fontWeight: '400',
      marginBottom: 8,
    },
    singer: {
      color: '#333',
      fontSize: theme.f2,
      fontWeight: '400',
    },
    album: {
      color: '#666',
      marginLeft: 8
    }
  }
})