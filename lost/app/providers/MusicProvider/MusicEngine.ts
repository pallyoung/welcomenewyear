
export interface EngineSearchParam {
  keyword: string,
  curPage: number
}
export interface Singer {
  name: string,
  id: string,
  mid: string
}
export interface Song {
  id: any,
  name: any,
  singer: Singer[],
  album: any,
  albumid: any,
  source: any,
  sourceurl: any,
  canPlay: boolean
}
export abstract class Engine {
  abstract search(param: EngineSearchParam): Promise<{ list: Song[], total: number, curPage: number }>
  abstract lyric(): any
}


export default class MusicEngine {
  engines: Map<string, Engine> = new Map();
  private _getEngine(name: string): Engine | undefined {
    return this.engines.get(name);
  }
  setEngine(name: string, engine: Engine) {
    this.engines.set(name, engine)
  }
  search(type: string, param: EngineSearchParam): Promise<{ list: Song[], total: number, curPage: number }> {
    const engine = this._getEngine(type);
    if (engine) {
      return engine.search(param);
    } else {
      throw new Error('no such engine '+ type);
    }
  }
  lyric() {

  }
}
