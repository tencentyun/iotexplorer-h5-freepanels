import React, { useEffect, useReducer, useState } from 'react';
import { entryWrap } from '@src/entryWrap';
import './style.less';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { MusicPlayer } from '@src/panels/KugouMusic/panel-default/MusicPlayer/MusicPlayer';
import { CurPlayListKey, CurSongIdKey } from '@src/panels/KugouMusic/panel-default/constants';
import { PlaylistsPage } from '@src/panels/KugouMusic/panel-default/PlaylistsPage/PlaylistsPage';
import { KugouHome } from '@src/panels/KugouMusic/panel-default/KugouHome/KugouHome';
import {
  checkLoginAuth,
  getNewSongs,
  getRecommendPlayList,
  getRecommendSong,
  getSingerAlbums,
  getSongData,
  getSongsByAlbum,
  getSongsByPlaylist, getSongsInfo, login,
} from '@src/models/kugou';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { NewSongsPage } from '@src/panels/KugouMusic/panel-default/SongsPage/NewSongsPage';
import { PlaylistSongsPage } from '@src/panels/KugouMusic/panel-default/SongsPage/PlaylistSongsPage';

declare type Reducer = (state: KugouState, action: ReducerAction<KugouStateAction>) => KugouState;

export const enum KugouStateAction {
  UpdateCurrentPlayQueue = 'UpdateCurrentPlayQueue',
  UpdateCurrentPlaySong = 'UpdateCurrentPlaySong',
  UpdateRecommendSongs = 'UpdateRecommendSongs',
  UpdateRecommendPlaylists = 'UpdateRecommendPlaylists',
  UpdateAlbums = 'UpdateAlbums',
  UpdateNewSongs = 'UpdateNewSongs',
  UpdateDeviceData = 'UpdateDeviceData'
}

// window.location.hash = '/musicList2';

function kugouInitState(sdk): KugouState {
  return {
    recommendSongs: [],
    recommendPlaylists: [],
    albums: [],
    newSongs: [],
    showPlaylistModel: false,
    currentPlayQueue: { songs: [], queueId: '', total: 0 },
    currentPlaySong: null,
    deviceData: Object.assign({}, sdk.deviceData),
  };
}

export function reducer(state: KugouState, action: ReducerAction<KugouStateAction>): KugouState {
  const { type, payload } = action;
  console.log('action => ', type, payload);
  console.log('prev state => ', state);
  const nextState = (() => {
    switch (type) {
      case KugouStateAction.UpdateRecommendSongs:
        return { ...state, recommendSongs: payload };
      case KugouStateAction.UpdateRecommendPlaylists:
        return { ...state, recommendPlaylists: payload };
      case KugouStateAction.UpdateAlbums:
        return { ...state, albums: payload };
      case KugouStateAction.UpdateCurrentPlaySong:
        return { ...state, currentPlaySong: payload };
      case KugouStateAction.UpdateDeviceData: {
        const updateDeviceData = {} as KugouDeviceData;
        for (const key in payload) {
          updateDeviceData[key] = payload[key].Value;
        }
        return {
          ...state,
          deviceData: Object.assign({}, state.deviceData, updateDeviceData),
        };
      }
      case KugouStateAction.UpdateCurrentPlayQueue: {
        return {
          ...state,
          currentPlayQueue: {
            songs: payload.songs,
            queueId: payload.queueId,
            total: payload.total,
          },
        };
      }
      case KugouStateAction.UpdateNewSongs:
        return { ...state, newSongs: payload };
    }
    return state;
  })();
  console.log('next state => ', nextState);
  return nextState;
}

export const KugouContext = React.createContext({} as KugouContext);

function App() {
  useDocumentTitle('酷狗音乐');
  const sdk = window.h5PanelSdk;
  const [kugouState, dispatch] = useReducer<Reducer, any>(reducer, sdk, kugouInitState);
  const [isLogin, setIsLogin] = useState(true);

  /**
   * 初始化：wsReport
   */
  const initHandleWsReport = () => {
    console.log('初始化wsReport回调');
    const handleWsReport = (res) => {
      console.log('酷狗h5 Demo收到wsReport', res);
      dispatch({
        type: KugouStateAction.UpdateDeviceData,
        payload: res.deviceData,
      });
      // 额外操作，正常情况更新物模型即可
      // 1.设备端更新歌曲
      if (res.deviceData.cur_song_id) {
        getSongData(res.deviceData.cur_song_id.Value).then((newSong) => {
          dispatch({
            type: KugouStateAction.UpdateCurrentPlaySong,
            payload: newSong,
          });
        });
      }
    };
    sdk.on('wsReport', handleWsReport);
  };

  /**
   * 初始化：首页数据
   */
  const initHomePageData = () => {
    // 日推歌曲
    getRecommendSong().then((res) => {
      dispatch({
        type: KugouStateAction.UpdateRecommendSongs,
        payload: res.data.songs,
      });
    });
    // 推荐歌单
    getRecommendPlayList(1, 6).then((res) => {
      dispatch({
        type: KugouStateAction.UpdateRecommendPlaylists,
        payload: res.data.playlists,
      });
    });
    // 周杰伦专辑
    getSingerAlbums(1, 10, '3520', 1).then((res) => {
      dispatch({
        type: KugouStateAction.UpdateAlbums,
        payload: res.data.albums,
      });
    });
    // 新歌首发
    getNewSongs(1, 6, 1).then((res) => {
      dispatch({
        type: KugouStateAction.UpdateNewSongs,
        payload: res.data.songs,
      });
    });
  };

  /**
   * 初始化：同步设备歌曲、歌
   */
  const initSyncDeviceSong = async () => {
    const { deviceData } = kugouState;
    const CurSongId = deviceData[CurSongIdKey];
    let CurPlayList = deviceData[CurPlayListKey];
    if (!CurSongId) return;
    if (!CurPlayList) return;

    CurPlayList = JSON.parse(CurPlayList);
    // 同步歌曲
    const newSong = await getSongData(CurSongId);
    dispatch({
      type: KugouStateAction.UpdateCurrentPlaySong,
      payload: newSong,
    });
    // 同步歌单
    if (CurPlayList.play_type === 'v2/album/info') {
      const { page, size, album_id: id } = CurPlayList.play_params;
      const res1 = await getSongsByAlbum(page, size, id);
      const { songs } = res1.data;
      const songsId = songs.map(item => item.song_id);
      const res2 = await getSongsInfo(songsId);
      dispatch({
        type: KugouStateAction.UpdateCurrentPlayQueue,
        payload: {
          songs: res2.data.songs,
          queueId: id,
        },
      });
    } else if (CurPlayList.play_type === 'v2/playlist/song') {
      const { page, size, playlist_id: id } = CurPlayList.play_params;
      const res1 = await getSongsByPlaylist(page, size, id);
      const { songs } = res1.data;
      const songsId = songs.map(item => item.song_id);
      const res2 = await getSongsInfo(songsId);
      dispatch({
        type: KugouStateAction.UpdateCurrentPlayQueue,
        payload: {
          total: res1.data.total,
          songs: res2.data.songs,
          queueId: id,
        },
      });
    }
  };

  const initData = () => {
    initHandleWsReport();
    initHomePageData();
    initSyncDeviceSong();
  };

  const loginAuth = async () => {
    try {
      await login();
      setIsLogin(true);
      initData();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        await checkLoginAuth();
        initData();
      } catch (e) {
        setIsLogin(false);
        loginAuth();
      }
    };
    init();
  }, []);

  const [currentTab, setCurrentTab] = useState('DevicePanel');

  return (
    <div className="kugou-warp">
      {
        isLogin && <KugouContext.Provider value={{ kugouState, dispatch, currentTab, setCurrentTab }}>
          <HashRouter>
            <Switch>
              <Route exact path={'/'} component={KugouHome}/>
              <Route path={'/playlists'} component={PlaylistsPage}/>
              <Route path={'/newSongsPage'} component={NewSongsPage}/>
              <Route path={'/playlistSongsPage'} component={PlaylistSongsPage}/>
              <Route path={'/musicPlayer'} component={MusicPlayer}/>
            </Switch>
          </HashRouter>
        </KugouContext.Provider>
      }
      {!isLogin && <div className="page-loginAuth">
        <div className="button" onClick={loginAuth}>酷狗登录</div>
      </div>}
    </div>
  );
}

entryWrap(App);
