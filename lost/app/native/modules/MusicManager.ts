import {
  NativeModules
} from 'react-native'
import { Song } from 'providers/MusicProvider/MusicEngine';
interface INativeMusicManager {
  download: (url: string, name: string) => void,
  cache: (url: string) => string,
  play: (url: string) => string
}

const NativeMusicManager: INativeMusicManager = NativeModules.MusicManager;

const MusicManager = {
  download: function (song: Song) {
    NativeMusicManager.download(song.sourceurl, song.singer[0].name + '_' + song.name + '_' + song.id);
  }
}
export default MusicManager;