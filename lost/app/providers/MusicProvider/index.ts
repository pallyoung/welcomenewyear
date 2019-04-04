import {
  Provider
} from 'febrest'
import MusicEngine from './MusicEngine'
import qq from './qq'
import netease from './netease'

const musicEngine = new MusicEngine();
musicEngine.setEngine('qq', qq);
musicEngine.setEngine('netease', netease);

export const MusicEngineType = [
  {
    name: 'QQ',
    typeName: 'qq'
  },
  {
    name: '网易',
    typeName: 'netease'
  },
  {
    name: '虾米',
    typeName: 'xiami'
  },
  {
    name: '酷狗',
    typeName: 'kugou'
  },
  {
    name: '酷我',
    typeName: 'kuwo'
  },
  {
    name: '哔哩',
    typeName: 'bilibili'
  }
]

export default class MusicProvider extends Provider {
  query(state: any, method: any, payload: any) {
    switch (method) {
      case 'search':
        return musicEngine.search(payload.platform, { keyword: payload.keyword, curPage: payload.curPage })
    }
    return {}
  }
  update(state: any, method: any, payload: any) {
    return payload;
  }
}
