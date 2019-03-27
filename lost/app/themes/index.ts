import ThemeConsumer from './ThemeConsumer'
import ThemeContext from './ThemeContext'
import ThemeProvider from './ThemeProvider'
import StyleSheet from 'react-native-theme-stylesheet';
import BaseTheme, { ITheme } from './BaseTheme'


function createStyle<T>(styleCreator: (theme: ITheme) => T): T {
  return StyleSheet.create(styleCreator)
}

export {
  ThemeConsumer,
  ThemeContext,
  ThemeProvider,
  createStyle,
  BaseTheme
}