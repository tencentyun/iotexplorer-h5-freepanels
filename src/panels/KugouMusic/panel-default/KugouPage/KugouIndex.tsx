import React, { useEffect, useReducer, useState } from 'react';
import { Route, useLocation, useHistory } from 'react-router-dom';
import { TabBar } from '@src/panels/KugouMusic/panel-default/components/TabBar/TabBar';
import { RecommendDaily } from '@src/panels/KugouMusic/panel-default/KugouPage/RecommendDailyPanel/RecommendDaily';
import { PlaylistPanel } from '@src/panels/KugouMusic/panel-default/KugouPage/PlaylistPanel/PlaylistPanel';
import { AlbumPanel } from '@src/panels/KugouMusic/panel-default/KugouPage/AlbumPanel/AlbumPanel';
import {
  getRecommendSong,
  getRecommendPlayList,
  getSingerAlbums,
  getSongsByAlbum,
  getSongsByPlaylist,
  getSongData,
} from '@src/models/kugou';
import { MusicPlayer } from '@src/panels/KugouMusic/panel-default/KugouPage/MusicPlayer/MusicPlayer';
import { iconMusicPlayer } from '@icons/kugou';
import './KugouIndex.less';
import { MusicListPage } from '@src/panels/KugouMusic/panel-default/KugouPage/MusicListPage/MusicListPage';
import { CurrentPlaylist } from '@src/panels/KugouMusic/panel-default/components/CurrentPlaylist/CurrentPlaylist';

declare type Reducer = (state: KugouState, action: ReducerAction<KugouStateAction>) => KugouState;

export const enum KugouStateAction {
  UpdateCurrentPlayQueue = 'UpdateCurrentPlayQueue',
  UpdateCurrentPlaySong = 'UpdateCurrentPlaySong',
  UpdateRecommendSongs = 'UpdateRecommendSongs',
  UpdateRecommendPlaylists = 'UpdateRecommendPlaylists',
  UpdateAlbums = 'UpdateAlbums',
  UpdateDeviceData = 'UpdateDeviceData'
}

function kugouInitState(sdk): KugouState {
  return {
    recommendSongs: [],
    recommendPlaylists: [],
    albums: [],
    showPlaylistModel: false,
    currentPlayQueue: { songs: [], queueId: '' },
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
      case KugouStateAction.UpdateRecommendSongs: {
        return {
          ...state,
          recommendSongs: payload,
        };
      }
      case KugouStateAction.UpdateRecommendPlaylists: {
        return {
          ...state,
          recommendPlaylists: payload,
        };
      }
      case KugouStateAction.UpdateAlbums: {
        return {
          ...state,
          albums: payload,
        };
      }
      case KugouStateAction.UpdateCurrentPlaySong: {
        return {
          ...state,
          currentPlaySong: payload,
        };
      }
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
          },
        };
      }
    }
    return state;
  })();
  console.log('next state => ', nextState);
  return nextState;
}

function MusicPlayerIcon({ goMusicPlayer }) {
  return (
    <div onClick={goMusicPlayer}>
      <img className="iconMusicPlayer" src={iconMusicPlayer} alt=""/>
    </div>
  );
}

export const KugouContext = React.createContext({} as KugouContext);

export const KugouIndex = () => {
  const sdk = window.h5PanelSdk;
  const [kugouState, dispatch] = useReducer<Reducer, any>(reducer, sdk, kugouInitState);
  const [showTabBar, setShowTabBar] = useState(true);
  const [showPlaylistModel, setShowPlaylistModel] = useState(false);

  const location = useLocation();
  const history = useHistory();

  function goMusicPlayer() {
    history.push('/kugou/musicPlayer');
  }

  useEffect(() => {
    sdk.on('wsReport', (res) => {
      console.log('酷狗h5 Demo收到wsReport', res);
      dispatch({
        type: KugouStateAction.UpdateDeviceData,
        payload: res.deviceData,
      });
      // 设备端更新歌曲
      const updateSong = async () => {
        if (res.deviceData.cur_song_id) {
          const newSong = await getSongData(res.deviceData.cur_song_id.Value);
          dispatch({
            type: KugouStateAction.UpdateCurrentPlaySong,
            payload: newSong,
          });
        }
      };
      updateSong();
    });
  }, []);

  useEffect(() => {
    getRecommendSong().then((res) => {
      dispatch({
        type: KugouStateAction.UpdateRecommendSongs,
        payload: res.data.songs,
      });
    });
    getRecommendPlayList(1, 10).then((res) => {
      dispatch({
        type: KugouStateAction.UpdateRecommendPlaylists,
        payload: res.data.playlists,
      });
    });
    getSingerAlbums(1, 10, '3520', 1).then((res) => {
      dispatch({
        type: KugouStateAction.UpdateAlbums,
        payload: res.data.albums,
      });
    });
  }, []);

  useEffect(() => {
    // 初始化，同步设备当前的歌单和歌
    const syncDevicePlaylistAndSong = async () => {
      // 同步歌单
      const { deviceData } = kugouState;
      let { cur_play_list } = deviceData;
      const { cur_song_id } = deviceData;
      cur_play_list = JSON.parse(cur_play_list);
      console.log('同步设备歌单，歌曲', cur_play_list, cur_song_id);
      if (cur_play_list.play_type === 'v2/album/info') {
        const { page, size, album_id: id } = cur_play_list.play_params;
        const res = await getSongsByAlbum(page, size, id);
        dispatch({
          type: KugouStateAction.UpdateCurrentPlayQueue,
          payload: {
            songs: res.data.songs,
            queueId: id,
          },
        });
      } else if (cur_play_list.play_type === 'v2/playlist/song') {
        const { page, size, playlist_id: id } = cur_play_list.play_params;
        const res = await getSongsByPlaylist(page, size, id);
        dispatch({
          type: KugouStateAction.UpdateCurrentPlayQueue,
          payload: {
            songs: res.data.songs,
            queueId: id,
          },
        });
      }

      // 同步歌曲
      const newSong = await getSongData(cur_song_id);
      dispatch({
        type: KugouStateAction.UpdateCurrentPlaySong,
        payload: newSong,
      });
    };
    syncDevicePlaylistAndSong();
  }, []);

  useEffect(() => {
    const checkShowTabBar = () => {
      const { pathname } = location;
      const isNoTabBarPage = tabs.some((item) => {
        if (item.path === pathname && item.notShowTab) {
          return true;
        }
      });
      setShowTabBar(!isNoTabBarPage);
    };
    checkShowTabBar();
  });

  const tabs = [
    {
      name: '每日推荐',
      path: '/kugou/recommendDaily',
      render: () => <RecommendDaily/>,
    },
    {
      name: '歌手专辑',
      path: '/kugou/albums',
      render: () => <AlbumPanel/>,
    },
    {
      name: '推荐歌单',
      path: '/kugou/playlist',
      render: () => <PlaylistPanel/>,
    },
    {
      name: '音乐播放器',
      path: '/kugou/musicPlayer',
      render: () => <MusicPlayer/>,
      notShowTab: true,
    },
    {
      name: '歌曲列表',
      path: '/kugou/musicList',
      render: () => <MusicListPage/>,
      notShowTab: true,
    },
  ];

  return (
    <KugouContext.Provider value={{
      kugouState,
      dispatch,
      showPlaylistModel,
      setShowPlaylistModel,
    }}>
      <div className="kugou-index">
        {
          tabs.map(({ path, render }) => (
            <Route key={path} path={path} render={render}/>
          ))
        }
        {showTabBar && (
          <>
            <TabBar tabs={tabs}/>
            <MusicPlayerIcon goMusicPlayer={goMusicPlayer}/>
          </>
        )}
        {showPlaylistModel && <CurrentPlaylist/>}
      </div>
    </KugouContext.Provider>
  );
};
