
import { Engine, EngineSearchParam, Song } from './MusicEngine'

import { fetch as _fetch } from 'utils/fetch'
import encryptedRequest from './netease.core'
function isPlayable(song: any): boolean {
  return (song.fee !== 4) && (song.fee !== 1);
}
class NetEase extends Engine {
  search({ keyword, curPage }: EngineSearchParam): Promise<{ list: Song[], total: number, curPage: number }> {
    const target_url = 'https://music.163.com/weapi/cloudsearch/get/web';
    const data = encryptedRequest(
      {
        s: keyword,
        offset: 20 * (curPage - 1),
        limit: 20,
        type: 1,
      }
    );
    return _fetch(target_url, data, 'post').then((response: any) => {
      const { result: { songs, songCount } } = response;
      const list = songs.map((song_info: any) => ({
        id: song_info.id,
        name: song_info.name,
        singer: song_info.ar.map((singer:any)=>{
          return {
            name:singer.name,
            id:singer.id
          }
        }),
        album: song_info.al.name,
        albumid: song_info.al.id,
        source: 'netease',
        source_url: `http://music.163.com/#/song?id=${song_info.id}`,
        canPlay: !isPlayable(song_info),
      }));
      return {
        list,
        total: songCount,
        curPage
      }
    })
  }
  lyric() {

  }
}
export default new NetEase();
