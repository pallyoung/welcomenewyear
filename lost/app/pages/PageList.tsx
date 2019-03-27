import React from 'react'
import { Component } from 'react'
import { Text, TouchableOpacity, FlatList } from 'react-native'
import { NavigationConsumer } from './../components/Navigation'
import { ThemeConsumer } from './../themes'
import pages from './index';
const PAGE_NAMES = Object.keys(pages);
interface Props { };
export default class PageList extends Component<Props> {
  static getNavigationOptions(props: any, state: any) {
    return {
      title: 'PageList'
    }
  }
  constructor(props: Props) {
    super(props);

  }
  renderItem({ item }: { item: string }) {
    return (

      <NavigationConsumer>
        {
          ({ navigation }) => (
            <ThemeConsumer>
              {
                (theme) => (
                  <TouchableOpacity
                    style={{
                      height: 60,
                      paddingLeft: 20,
                      borderBottomWidth: theme.px,
                      borderBottomColor: '#fefefe',
                      justifyContent: 'center',
                    }}
                    key={item}
                    onPress={() => {
                      navigation.navigate(item)
                    }}><Text>{item}</Text></TouchableOpacity>
                )
              }
            </ThemeConsumer>
          )
        }
      </NavigationConsumer>
    )

  }
  render() {
    return (
      <FlatList
        keyExtractor={(item) => item}
        data={PAGE_NAMES}
        renderItem={(item) => this.renderItem(item)} />
    )
  }
}