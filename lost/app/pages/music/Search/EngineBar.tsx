import React, { PureComponent } from 'react'
import { View, Text, FlatList, TouchableOpacity } from 'react-native-ui'
import { createStyle } from 'themes';
import { MusicEngineType } from 'providers/MusicProvider';
import { vw } from 'utils/resize';

interface Props {
  onChange: (value: string) => void
}
export default class EngineBar extends PureComponent<Props>{
  state = {
    value: MusicEngineType[0].typeName
  }
  private _select(item: any) {
    let value = item.typeName
    this.setState({ value });
    this.props.onChange && this.props.onChange(value);
  }
  private _renderItem=({ item }: { item: any })=> {
    let {
      value
    } = this.state;
    let {
      name,
      typeName
    } = item;
    return (
      <TouchableOpacity
        style={[styles.item, value === typeName && styles.itemSelected]}
        activeOpacity={1}
        onPress={() => this._select(item)}>
        <Text
          style={[styles.content, value === typeName && styles.contentSelected]}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }
  render() {
    return (
      <View>
        <FlatList
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={item=>item.typeName}
          data={MusicEngineType}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={styles.flatlist} />
      </View>
    )
  }
}

const styles = createStyle(theme => {
  return {
    flatlist: {
      borderBottomWidth: theme.px,
      borderBottomColor: theme.borderColor,
      height: 32,
      flex: undefined
    },
    item: {
      height: 32,
      width: vw(100 / MusicEngineType.length),
      justifyContent: 'center',
      alignItems: 'center',
    },
    itemSelected: {
      borderBottomWidth: 2,
      borderBottomColor: theme.themeColor,
    },
    content: {
      color: '#666',
      fontSize: theme.f2,
      fontWeight: '200'
    },
    contentSelected: {
      color: theme.themeColor
    }
  }
})