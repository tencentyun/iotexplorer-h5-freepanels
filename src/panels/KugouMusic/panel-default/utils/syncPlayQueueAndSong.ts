import {
  controlCurrentPlayQueue,
  controlDevice, controlQuality, controlSongIdAndIndex,
  getNewSongs, getRecommendDaily,
  getSongsByAlbum,
  getSongsByPlaylist, getSongsInfo,
} from '@src/models/kugou';
import { KugouStateAction } from '@src/panels/KugouMusic/panel-default/app';
import Toast from '@src/panels/KugouMusic/panel-default/components/Toast/Toast';
import { KugouState, Song } from '@src/panels/KugouMusic/panel-default/types';

/**
 * 下发给端
 * 是当前播放队列的，只切歌，不是同步歌单+歌
 * 1.同步设备 2.同步UI
 * @param playType 播放类型
 * @param newQueueId 新队列ID
 * @param newSongId 点击歌曲的ID
 */
type PlayType = 'album' | 'playlist' | 'newSongs' | 'recommendDaily' | 'curPlayQueue';

export const syncPlayQueueAndSong = async (
  playType: PlayType,
  newQueueId: string | number,
  newSong: Song,
  newSongIndex: number,
  kugouState: KugouState,
  dispatch,
) => {
  // const { kugouState, dispatch } = useContext(KugouContext);
  if (newSong.playable_code !== 0 && newSong.playable_code !== 3) {
    Toast.open('当前歌曲暂不支持播放哦~');
    return Promise.reject();
  }
  if (newSong.song_id === kugouState.currentPlaySong?.song_id) {
    Toast.open('正在播放当前歌曲~');
    return;
  }
  const { queueId: curQueueId } = kugouState.currentPlayQueue;
  const playTypeParamsMap = {
    playlist: { page: 1, size: 10, playlist_id: newQueueId },
    newSongs: { page: 1, size: 10, top_id: newQueueId },
    album: { page: 1, size: 10, album_id: newQueueId },
    recommendDaily: {},
  };
  // 歌单不一致，同步歌单
  if (curQueueId !== newQueueId) {
    // 设备-下发
    await controlDevice(controlCurrentPlayQueue, playType, playTypeParamsMap[playType]);
    // UI-拉取歌单列表
    let getSongsFn;
    switch (playType) {
      case 'playlist':
        getSongsFn = getSongsByPlaylist;
        break;
      case 'newSongs':
        getSongsFn = getNewSongs;
        break;
      case 'album':
        getSongsFn = getSongsByAlbum;
        break;
      case 'recommendDaily':
        getSongsFn = getRecommendDaily;
        break;
    }
    const args = Object.values(playTypeParamsMap[playType]);
    const res = await getSongsFn(...args);
    // 拿歌的详情
    const songsId = res.data.songs.map(item => item.song_id);
    const res2 = await getSongsInfo(songsId);
    dispatch({
      type: KugouStateAction.UpdateCurrentPlayQueue,
      payload: {
        songs: res2.data.songs,
        queueId: newQueueId,
        total: res.data.total,
        playType,
      },
    });
  }
  // 切换音质为标准
  await controlDevice(controlQuality, 0);
  // -同步歌曲，不用拉取，在wsReport中处理了-
  // await controlDevice(controlSetCurSongId, newSong.song_id);
  // ------------------------------
  // 同步歌曲：改为song_id 与 song_index 一起下发
  await controlDevice(controlSongIdAndIndex, newSong.song_id, newSongIndex);
};
