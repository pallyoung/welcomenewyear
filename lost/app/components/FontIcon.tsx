import { Text } from 'react-native-ui'
import React from 'react';


export interface Props {
  icon: string,
  style?: any,
  color?: string,
  size?: number,
  [key: string]: any
}
function FontIcon({ icon, style, color, size, ...props }: Props) {
  if (!icon) {
    return null;
  }
  if (icon[0] === '&') {
    icon = String.fromCharCode(parseInt('0' + icon.slice(2, -1), 16))
  }
  return (
    <Text
      style={[style, { fontFamily: 'iconfont' }, color ? { color } : null, size ? { fontSize: size } : null]}
      children={icon}
      {...props}
    />
  );
}

export default FontIcon;