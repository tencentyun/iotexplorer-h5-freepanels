import { controlPlaySong, controlDevice } from '@src/models/kugou';
import { KugouStateAction } from '@src/panels/KugouMusic/panel-default/app';
import { KugouState, Song } from '@src/panels/KugouMusic/panel-default/types';


/**
 * 切歌
 * @param playType 播放类型
 * @param newQueueId 新队列ID
 * @param newSongId 点击歌曲的ID
 */
type PlayType = 'album' | 'playlist' | 'newSongs' | 'recommendDaily';

export const syncPlayQueueAndSong = async (
  playType: PlayType,
  newQueueId: string | number,
  newSong: Song,
  newSongIndex: number,
  kugouState: KugouState,
  dispatch,
) => {
  const { data } = await controlDevice(controlPlaySong, newSong.song_id, newSongIndex, newQueueId, playType);
  const { playQueue } = data;
  const { currentPlayQueue } = kugouState;
  if (newQueueId !== currentPlayQueue.queueId) {
    dispatch({
      type: KugouStateAction.UpdateCurrentPlayQueue,
      payload: {
        songs: playQueue.songs,
        queueId: newQueueId,
        total: playQueue.total,
        playType,
      },
    });
  }
};
