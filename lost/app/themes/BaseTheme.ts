
import { resize, px2dp } from 'utils/resize';
import { Platform, Dimensions } from 'react-native';

const IOS = Platform.OS === 'ios';
const clientWidth = Dimensions.get('window').width;

export interface ITheme {

  f1?: number,
  f2?: number,
  f3?: number,
  f14?: number,
  f4?: number,
  f5?: number,
  f6?: number,
  color?: string,
  themeColor?: string,
  px?: number,
  clientWidth?: number,

  backgroundColor?: string,
  borderColor?: string,
  borderRadius?: number,
  itemHeightM?: number,
  itemHeightL?: number,
  itemHeightH?: number,
  defaultWidth?: number,
  defaultHeight?: number,
  paddingHorizontal?: number,
  placeholderColor?: string,
  disabledColor?: string,

  /**
   * navigationHeader style
   */
  navigationHeaderHeight?: number,
  navigationHeaderPaddingTop?: number,
  navigationHeaderBackgroundColor?: string,
  navigationHeaderColor?: string,
  navigationHeaderFontSize?: number,
  navigationHeaderLeftButtonMargin?: number,
  navigationHeaderRightButtonMargin?: number,
  /**
  * navigationHeader style end
  */

  pageWrapper?: any,
  boxShadow?: any,
  /**
   * toast style
   */
  toastWrapper?: any,
  toastText?: any
  /**
   * toast style end
   */
}
const BaseTheme: ITheme = {
  f1: 10,
  f2: 12,
  f3: 13,
  f14: 14,
  f4: 16,
  f5: 18,
  f6: 20,
  color: '#333',
  clientWidth,
  themeColor: '#e10000',
  px: px2dp(1),
  backgroundColor: '#EFEFF3',
  borderColor: '#D8D8D8',
  borderRadius: 17,
  itemHeightM: 48,
  itemHeightL: 36,
  itemHeightH: 60,
  defaultWidth: 240,
  defaultHeight: 34,
  paddingHorizontal: 16,
  placeholderColor: '#D1D1D6',
  disabledColor: '#ccc',

  navigationHeaderHeight: 64,
  navigationHeaderPaddingTop: 20,
  navigationHeaderBackgroundColor: '#e10000',
  navigationHeaderColor: '#fff',
  navigationHeaderFontSize: 14,
  navigationHeaderLeftButtonMargin: 20,
  navigationHeaderRightButtonMargin: 20,

  pageWrapper: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EFEFF3',
    paddingTop: 35
  },
  boxShadow: {
    shadowColor: '#ccc',
    shadowRadius: 3,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 1
    },
    shadowOpacity: 0.45
  },

  toastWrapper: {
    backgroundColor: '#333333AA',
    height: 36,
    borderRadius: 18,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 100,
    width: resize(275),
    left: resize(50)
  },
  toastText: {
    color: '#fff',
    fontSize: 13,
    textAlign: 'center'
  }
}

export default BaseTheme;