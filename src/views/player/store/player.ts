import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { getSongDetail, getSongLyric } from '../service/player'
import { ILyric, parseLyric } from '@/utils/parse-lyric'

export const fetchCurrentSongAction = createAsyncThunk(
  'currentSong',
  (id: number, { dispatch }) => {
    // 1.获取歌曲信息
    getSongDetail(id).then((res) => {
      if (!res.songs.length) return
      const song = res.songs[0]
      console.log(song)

      dispatch(changeCurrentSongAction(song))
    })

    // 2.获取歌词数据
    getSongLyric(id).then((res) => {
      // 1.获取歌词的字符串
      const lyricString = res.lrc.lyric

      // 2.对歌词进行解析(一个个对象)
      const lyrics = parseLyric(lyricString)
      // 3.将歌词放到state中
      dispatch(changeLyricsAction(lyrics))
    })
  }
)
interface IplayerState {
  currentSong: any
  lyrics: ILyric[]
  lyricIndex: number
}

const initialState: IplayerState = {
  currentSong: {
    name: '罗生门（Follow）',
    mainTitle: '罗生门',
    additionalTitle: '（Follow）',
    id: 1456890009,
    pst: 0,
    t: 0,
    ar: [
      { id: 33259235, name: '梨冻紧', tns: [], alias: [] },
      { id: 13112601, name: 'Wiz_H张子豪', tns: [], alias: [] }
    ],
    alia: [],
    pop: 100,
    st: 0,
    rt: '',
    fee: 8,
    v: 73,
    crbt: null,
    cf: '',
    al: {
      id: 91237927,
      name: '罗生门（Follow）',
      picUrl:
        'https://p2.music.126.net/yN1ke1xYMJ718FiHaDWtYQ==/109951165076380471.jpg',
      tns: [],
      pic_str: '109951165076380471',
      pic: 109951165076380460
    },
    dt: 243754,
    h: { br: 320000, fid: 0, size: 9752735, vd: -48129, sr: 48000 },
    m: { br: 192000, fid: 0, size: 5851679, vd: -45527, sr: 48000 },
    l: { br: 128000, fid: 0, size: 3901151, vd: -43878, sr: 48000 },
    sq: { br: 922449, fid: 0, size: 28106454, vd: -48126, sr: 48000 },
    hr: { br: 1692069, fid: 0, size: 51556278, vd: -48120, sr: 48000 },
    a: null,
    cd: '01',
    no: 1,
    rtUrl: null,
    ftype: 0,
    rtUrls: [],
    djId: 0,
    copyright: 0,
    s_id: 0,
    mark: 17716748352,
    originCoverType: 1,
    originSongSimpleData: null,
    tagPicList: null,
    resourceState: true,
    version: 39,
    songJumpInfo: null,
    entertainmentTags: null,
    awardTags: null,
    displayTags: null,
    single: 0,
    noCopyrightRcmd: null,
    mst: 9,
    cp: 0,
    mv: 0,
    rtype: 0,
    rurl: null,
    publishTime: 0
  },
  lyrics: [],
  lyricIndex: -1
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricsAction(state, { payload }) {
      state.lyrics = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    }
  }
})

export const {
  changeCurrentSongAction,
  changeLyricsAction,
  changeLyricIndexAction
} = playerSlice.actions
export default playerSlice.reducer
