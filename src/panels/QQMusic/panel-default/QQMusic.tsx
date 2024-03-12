import React, { useEffect, useMemo, useState } from 'react';
import {
  Route,
  HashRouter as Router,
  Switch,
} from 'react-router-dom';
import { useDeviceData } from '../../../hooks/useDeviceData';
import { deviceGetRawSongList, deviceGetSongId, deviceGetSongList, devicePlaySong } from './deviceController';
import { QQMusicPlayListType, QQMusicQualityType, QQMusicSongInDiss } from './lib/qqMusicTypes';
import { MusicPlayerContext } from './context';
import { SelfSongList } from './pages/ApiExample/SelfSongList';
import { Search } from './pages/ApiExample/Search';
import { NoLoginArea } from './pages/ApiExample/NoLoginArea';
import { DailySongs } from './pages/ApiExample/DailySongs';
import { IndividualRadio } from './pages/ApiExample/IndividualRadio';
import { SpeakerDevicePanel } from './pages/SpeakerDevicePanel';
import { DevicePanel } from './pages/DevicePanel';

import './style.less';

const sdk = window.h5PanelSdk as any;
const IOT_SONG_LIST_PAGE_SIZE = 10;
const musicQuality = QQMusicQualityType.HQ;

export function QQMusic() {
  const [sdkReady, setSdkReady] = useState(false);

  useEffect(() => {
    sdk.sdkReady().then(() => setSdkReady(true));
  }, []);

  const [deviceState, { onDeviceDataChange, onDeviceStatusChange }] = useDeviceData(
    sdk
  );

  // 正在播放的歌曲 ID
  const songId = deviceGetSongId(deviceState.deviceData);
  // 播放列表
  const rawSongList = deviceGetRawSongList(deviceState.deviceData);
  const songList = useMemo(() => deviceGetSongList(deviceState.deviceData), [rawSongList]);

  // 监听设备物模型
  useEffect(() => {
    const handleWsControl = ({ deviceId, deviceData }: {
      deviceId: string;
      deviceData: Record<string, { Value: unknown; LastUpdate: number }>;
    }) => {
      if (deviceId === sdk.deviceId) {
        // 设备收到控制指令
      }
    };

    const handleWsReport = ({ deviceId, deviceData }: {
      deviceId: string;
      deviceData: Record<string, { Value: unknown; LastUpdate: number }>;
    }) => {
      if (deviceId === sdk.deviceId) {
        Object.keys(deviceData).forEach((key) => {
          if (key.startsWith('k_sys')) {
            sdk.deviceData[key.substring(1)] = sdk.deviceData[key];
            delete deviceData[key];
          }
        });
        // 设备属性上报
        onDeviceDataChange(deviceData);
      }
    };

    const handleWsStatusChange = ({ deviceId, deviceStatus }: {
      deviceId: string;
      deviceStatus: number;
    }) => {
      if (deviceId === sdk.deviceId) {
        onDeviceStatusChange(deviceStatus);
      }
    };

    // 可监听的事件列表参考文档 https://cloud.tencent.com/document/product/1081/67452
    sdk
      .on('wsControl', handleWsControl)
      .on('wsReport', handleWsReport)
      .on('wsStatusChange', handleWsStatusChange);

    sdk.getDeviceData()
      .then((res: Record<string, any>) => {
        sdk.emit('wsReport', { deviceId: sdk.deviceId, deviceData: res });
      });

    return () => {
      sdk
        .off('wsControl', handleWsControl)
        .off('wsReport', handleWsReport)
        .off('wsStatusChange', handleWsStatusChange);
    };
  }, []);

  // 下发播放列表
  const syncSongList = async (type: QQMusicPlayListType, id: number, page = 0, startSongId: number | null = null) => {
    let songIds: number[] = [];
    let title = '正在播放';
    let total = 0;

    switch (type) {
      case QQMusicPlayListType.SongList: {
        const songListDetail = await sdk.qqMusic.describeSongList({
          DissId: id,
          Page: page,
          PageSize: IOT_SONG_LIST_PAGE_SIZE,
        });
        songIds = songListDetail.SongList.map((item: QQMusicSongInDiss) => item.SongId);
        title = songListDetail.DissTitle;
        total = songListDetail.TotalNum;
        break;
      }
      case QQMusicPlayListType.Song: {
        if (!startSongId) {
          throw new Error('startSongId is required when type is Song');
        }
        songIds = [startSongId];
        page = 0;
        total = 1;
        title = '正在播放';
        break;
      }
      default:
        throw {
          code: 'NOT_IMPLEMENTED_PLAYLIST_TYPE',
        };
    }

    const songInfoList = await sdk.qqMusic.describeSongInfoBatch({
      SongIds: songIds,
    });

    const songListPayload = sdk.qqMusic.pickSongInfoForSync(songInfoList, {
      quality: musicQuality,
      necessarySongId: startSongId,
    });

    if (!songListPayload.length) {
      throw new Error('歌单内没有可播放的歌曲');
    }

    if (startSongId && !songListPayload.find((song: { SongId: number }) => song.SongId === startSongId)) {
      throw new Error('歌单中未找到指定歌曲');
    }

    return sdk.qqMusic.syncSongList({
      Id: String(id),
      Name: title,
      Type: QQMusicPlayListType.SongList,
      Quality: musicQuality,
      Total: total,
      Page: page,
      PageSize: IOT_SONG_LIST_PAGE_SIZE,
      SongList: songListPayload,
      PlaySongId: startSongId || songListPayload[0].SongId,
    });
  };

  const onPlaySongInList = async (type: QQMusicPlayListType, id: number, startSongId: number | null, startSongIndex: number) => {
    const deviceSongList = songList;
    const page = Math.floor(startSongIndex / IOT_SONG_LIST_PAGE_SIZE);
    if (startSongId
      && typeof startSongIndex === 'number'
      && deviceSongList
      && deviceSongList.songListType === type
      && deviceSongList.songListId
      && deviceSongList.songListId === id
      && Array.isArray(deviceSongList.songList)
      && deviceSongList.songList.includes(startSongId)
    ) {
      // 相同播放列表且设备已缓存指定歌曲的信息，直接跳转
      return devicePlaySong(startSongId);
    } else {
      // 下发播放列表
      return syncSongList(type, id, page, startSongId);
    }
  };

  const onPlaySongInStaticList = async (list: {
    title: string;
    id: string | number;
    type: QQMusicPlayListType;
    total: number;
  }, startSongId: number, songs: { SongId: number }[]) => {
    const deviceSongList = songList;
    const startSongIndex = songs.findIndex(song => song.SongId === startSongId);

    if (startSongIndex === -1) {
      throw new Error('onPlaySongInCompleteList: cannot find startSongId in provided songs');
    }

    const page = Math.floor(startSongIndex / IOT_SONG_LIST_PAGE_SIZE);
    if (startSongId
      && deviceSongList
      && deviceSongList.songListType === list.type
      && deviceSongList.songListId
      && deviceSongList.songListId === startSongId
      && Array.isArray(deviceSongList.songList)
      && deviceSongList.songList.includes(startSongId)
    ) {
      // 相同播放列表且设备已缓存指定歌曲的信息，直接跳转
      return devicePlaySong(startSongId);
    } else {
      // 下发播放列表
      const songListPayload = sdk.qqMusic.pickSongInfoForSync(
        songs.slice(page * IOT_SONG_LIST_PAGE_SIZE, (page + 1) * IOT_SONG_LIST_PAGE_SIZE),
        {
          quality: musicQuality,
          necessarySongId: startSongId,
        },
      );
      return sdk.qqMusic.syncSongList({
        Id: String(list.id),
        Name: list.title,
        Type: QQMusicPlayListType.SongList,
        Quality: musicQuality,
        Total: list.total,
        Page: page,
        PageSize: IOT_SONG_LIST_PAGE_SIZE,
        SongList: songListPayload,
        PlaySongId: startSongId,
      });
    }
  };

  const onPlaySingleSong = async (songId: number) => {
    return syncSongList(QQMusicPlayListType.Song, 0, 0, songId);
  };

  return !sdkReady
    ? <div>loading...</div>
    : (
      <MusicPlayerContext.Provider value={{
        playingSongId: songId,
        onPlaySongInList,
        onPlaySongInStaticList,
        onPlaySingleSong,
        musicQuality,
        deviceState,
      }}>
        <Router basename="/">
          <div>
            <Switch>
              <Route path='/' exact>
                <DevicePanel
                  deviceState={deviceState}
                />
              </Route>
              <Route path='/playing/playlist'>
                <SpeakerDevicePanel
                  deviceState={deviceState}
                  showPlayList
                />
              </Route>
              <Route path='/playing'>
                <SpeakerDevicePanel
                  deviceState={deviceState}
                />
              </Route>
              <Route path='/selfSongList'>
                <SelfSongList />
              </Route>
              <Route path='/search'>
                <Search />
              </Route>
              <Route path='/noLoginArea'>
                <NoLoginArea />
              </Route>
              <Route path='/dailySongs'>
                <DailySongs />
              </Route>
              <Route path='/individualRadio'>
                <IndividualRadio />
              </Route>
            </Switch>
          </div>
        </Router>
      </MusicPlayerContext.Provider>
    );
}
