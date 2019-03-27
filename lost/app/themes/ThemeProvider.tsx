import ThemeContext from './ThemeContext'
import StyleSheet from 'react-native-theme-stylesheet';
import { ITheme } from './BaseTheme'
import React from 'react';
const { Provider } = ThemeContext;

export interface ThemeProviderProps {
  children: any,
  theme: any
}

let THEME: ITheme = {};

function addTheme(theme: ITheme) {
  THEME = Object.assign({}, THEME, theme);
  StyleSheet.addTheme(THEME);
}
function ThemeProvider(props: ThemeProviderProps) {
  const { children, theme } = props;
  addTheme(theme);
  return (
    <Provider value={THEME}>
      {children}
    </Provider>
  );
}

export default ThemeProvider