import React, { useContext, useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { RecommendDaily } from '@src/panels/KugouMusic/panel-default/KugouIndex/RecommendDailyPanel/RecommendDaily';
import { PlaylistPanel } from '@src/panels/KugouMusic/panel-default/KugouIndex/PlaylistPanel/PlaylistPanel';
import { AlbumPanel } from '@src/panels/KugouMusic/panel-default/KugouIndex/AlbumPanel/AlbumPanel';
import {
  getRecommendSong,
  getRecommendPlayList,
  getSingerAlbums,
  getSongsByAlbum,
  getSongsByPlaylist,
  getSongData,
} from '@src/models/kugou';
import { iconMusicPlayer } from '@icons/kugou';
import './KugouIndex.less';
import { DeviceInfo } from '@src/panels/KugouMusic/panel-default/KugouIndex/DeviceInfo/DeviceInfo';
import { LoginPanel } from '@src/panels/KugouMusic/panel-default/KugouIndex/LoginPanel/LoginPanel';
import { KugouContext, KugouStateAction } from '@src/panels/KugouMusic/panel-default/app';

export const KugouIndex = () => {
  const sdk = window.h5PanelSdk;
  const history = useHistory();
  const { kugouState, dispatch, setShowPlaylistModel, showPlaylistModel } = useContext(KugouContext);

  // 初始化wsReport回调
  useEffect(() => {
    const handleWsReport = async (res) => {
      console.log('酷狗h5 Demo收到wsReport', res);
      dispatch({
        type: KugouStateAction.UpdateDeviceData,
        payload: res.deviceData,
      });
      // 额外操作，正常情况更新物模型即可
      // 1.设备端更新歌曲
      if (res.deviceData.cur_song_id) {
        const newSong = await getSongData(res.deviceData.cur_song_id.Value);
        dispatch({
          type: KugouStateAction.UpdateCurrentPlaySong,
          payload: newSong,
        });
      }
    };
    sdk.on('wsReport', handleWsReport);
    return () => {
      sdk.off('wsReport', handleWsReport);
    };
  }, []);

  // 初始化，拉日推，歌单，专辑
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

  // 初始化，同步设备当前的歌单和歌
  useEffect(() => {
    const syncDevicePlaylistAndSong = async () => {
      // 同步歌单
      const { deviceData } = kugouState;
      let { cur_play_list } = deviceData;
      const { cur_song_id } = deviceData;
      cur_play_list = JSON.parse(cur_play_list);
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

  function MusicPlayerIcon() {
    return (
      <div onClick={() => {
        history.push('/musicPlayer');
      }}>
        <img className="iconMusicPlayer" src={iconMusicPlayer} alt=""/>
      </div>
    );
  }

  const [currentTab, setCurrentTab] = useState('DevicePanel');

  const renderView = () => {
    switch (currentTab) {
      case 'DevicePanel':
        return <DeviceInfo/>;
      case 'LoginPanel':
        return <LoginPanel/>;
      case 'RecommendDaily':
        return <RecommendDaily/>;
      case 'AlbumPanel':
        return <AlbumPanel/>;
      case 'PlaylistPanel':
        return <PlaylistPanel/>;
    }
  };

  const TabBar = () => {
    const tabList = [
      { text: '设备', path: 'DevicePanel' },
      { text: '登录', path: 'LoginPanel' },
      { text: '日推', path: 'RecommendDaily' },
      { text: '专辑', path: 'AlbumPanel' },
      { text: '歌单', path: 'PlaylistPanel' },
    ];
    return (
      <div className="tabBar">
        {
          tabList.map(item => (
            <span
              className="link"
              key={item.path}
              onClick={() => {
                setCurrentTab(item.path);
              }}
            >
              {item.text}
            </span>
          ))
        }
      </div>
    );
  };

  return (
    <KugouContext.Provider value={{
      kugouState,
      dispatch,
      showPlaylistModel,
      setShowPlaylistModel,
    }}>
      <div className="kugou-index">
        {renderView()}
        <TabBar/>
        <MusicPlayerIcon/>
      </div>
    </KugouContext.Provider>
  );
};
