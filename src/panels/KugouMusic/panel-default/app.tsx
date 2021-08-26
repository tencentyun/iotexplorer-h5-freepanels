import React, { useEffect, useReducer, useState } from 'react';
import { entryWrap } from '@src/entryWrap';
import './style.less';
import { HashRouter, Route, Switch } from 'react-router-dom';
import { MusicPlayer } from '@src/panels/KugouMusic/panel-default/MusicPlayer/MusicPlayer';
import { PlaylistsPage } from '@src/panels/KugouMusic/panel-default/PlaylistsPage/PlaylistsPage';
import { KugouHome } from '@src/panels/KugouMusic/panel-default/KugouHome/KugouHome';
import {
  checkLoginAuth, getCurrentPlayQueue, getCurrentPlaySong, getNewSongs, getRecommendPlayList,
  getRecommendDaily, getSongData, login, setTMESdk, sdk,
} from '@src/models/kugou';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { NewSongsPage } from '@src/panels/KugouMusic/panel-default/SongsPage/NewSongsPage';
import { PlaylistSongsPage } from '@src/panels/KugouMusic/panel-default/SongsPage/PlaylistSongsPage';
import { PlayFloatWindow } from '@src/panels/KugouMusic/panel-default/components/PlayFloatWindow/PlayFloatWindow';
import { LoginAuthPage } from '@src/panels/KugouMusic/panel-default/LoginAuthPage/LoginAuthPage';
import { CUR_SONG_ID_KEY } from '@src/panels/KugouMusic/panel-default/constants';
import { KugouState, IKugouContext, KugouDeviceData } from '@src/panels/KugouMusic/panel-default/types';

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

function kugouInitState(sdk): KugouState {
  return {
    recommendSongs: [],
    recommendPlaylists: [],
    albums: [],
    newSongs: [],
    showPlaylistModel: false,
    currentPlayQueue: { songs: [], queueId: '', total: 0, playType: 'playlist' },
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
            playType: payload.playType,
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

export const KugouContext = React.createContext({} as IKugouContext);

function App() {
  useDocumentTitle('酷狗音乐');
  const [kugouState, dispatch] = useReducer<Reducer, any>(reducer, sdk, kugouInitState);
  // boolean会闪一下默认界面
  const [loginStatus, setLoginStatus] = useState<'init' | 'success' | 'fail'>('init');

  /**
   * 初始化：wsReport
   */
  const initHandleWsReport = () => {
    const handleWsReport = (res) => {
      console.log('酷狗h5 Demo收到wsReport', res);
      dispatch({
        type: KugouStateAction.UpdateDeviceData,
        payload: res.deviceData,
      });
      // 额外操作，正常情况更新物模型即可
      // 1.设备端更新歌曲
      const curSongId = res.deviceData[CUR_SONG_ID_KEY];
      if (curSongId) {
        getSongData(curSongId.Value)
          .then((res) => {
            dispatch({
              type: KugouStateAction.UpdateCurrentPlaySong,
              payload: res.data,
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
    getRecommendDaily()
      .then((res) => {
        dispatch({
          type: KugouStateAction.UpdateRecommendSongs,
          payload: res.data.songs,
        });
      });
    // 新歌首发
    getNewSongs(1, 6, 1)
      .then((res) => {
        dispatch({
          type: KugouStateAction.UpdateNewSongs,
          payload: res.data.songs,
        });
      });
    // 推荐歌单
    getRecommendPlayList(1, 9)
      .then((res) => {
        dispatch({
          type: KugouStateAction.UpdateRecommendPlaylists,
          payload: res.data.playlists,
        });
      });
  };

  /**
   * 初始化：同步设备歌曲、歌
   */
  const initSyncDeviceSong = async () => {
    const { data: curSong } = await getCurrentPlaySong();
    dispatch({
      type: KugouStateAction.UpdateCurrentPlaySong,
      payload: curSong,
    });
    // 同步歌单
    const res = await getCurrentPlayQueue();
    const { total, songs, queueId, playType } = res.data;
    dispatch({
      type: KugouStateAction.UpdateCurrentPlayQueue,
      payload: {
        total,
        songs,
        queueId,
        playType,
      },
    });
  };

  const initData = () => {
    initHandleWsReport();
    initHomePageData();
    initSyncDeviceSong();
  };

  const loginAuth = async () => {
    try {
      await login();
      setLoginStatus('success');
      initData();
    } catch (e) {
      console.error('登录授权错误', e);
    }
  };

  useEffect(() => {
    const init = async () => {
      try {
        const tmeSdk = await sdk.getTMESdk();
        // @ts-ignore
        window.tmeSdk = tmeSdk;
        setTMESdk(tmeSdk);
        await checkLoginAuth();
        initData();
        setLoginStatus('success');
      } catch (e) {
        setLoginStatus('fail');
        console.log(e);
      }
    };
    init();
  }, []);

  const [showPlayFloat, setShowPlayFloat] = useState(true);

  return (
    <div className="kugou-warp">
      {
        loginStatus === 'success' && <KugouContext.Provider value={{ kugouState, dispatch, setShowPlayFloat }}>
          <HashRouter>
            {kugouState.currentPlaySong && showPlayFloat && <PlayFloatWindow/>}
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
      {loginStatus === 'fail' && <LoginAuthPage loginAuth={loginAuth}/>}
    </div>
  );
}

entryWrap(App);
