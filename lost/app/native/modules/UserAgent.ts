import {
  NativeModules
} from 'react-native'
export interface IUserAgent {
  ENV: string,
  VERSION_NAME:string,
  DEVICES: string,
  SYS_VERSION: string,
  DEVICE_NAME: string,
  SYS_NAME: string,
  PLATFORM: string,
  hideMask: ()=>void,
  showMask: ()=>void
}

const UserAgent:IUserAgent = NativeModules.UserAgent;
export default UserAgent || {};