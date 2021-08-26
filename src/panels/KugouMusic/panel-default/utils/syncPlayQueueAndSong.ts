import { controlDevice, controlPlaySong, getCurrentPlayQueue } from '@src/models/kugou';
import { KugouState, PlayType, Song } from '@src/panels/KugouMusic/panel-default/types';
import { KugouStateAction } from '@src/panels/KugouMusic/panel-default/app';


/**
 * 点击某个歌曲 同步歌单
 * @param playType
 * @param newQueueId
 * @param newSong
 * @param newSongIndex
 * @param kugouState
 * @param dispatch
 */
export const syncPlayQueueAndSong = async (
  playType: PlayType,
  newQueueId: string | number,
  newSong: Song,
  newSongIndex: number,
  kugouState: KugouState,
  dispatch,
) => {
  const params = {
    songId: newSong.song_id,
    songIndex: newSongIndex,
    newQueueType: playType,
  };
  if (playType !== PlayType.RecommendDaily) {
    (params as any).newQueueId = newQueueId;
  }
  await controlDevice(controlPlaySong, params);

  const { currentPlayQueue } = kugouState;

  if (newQueueId !== currentPlayQueue.queueId) {
    const { data } = await getCurrentPlayQueue();
    dispatch({
      type: KugouStateAction.UpdateCurrentPlayQueue,
      payload: {
        songs: data.songs,
        queueId: newQueueId,
        total: data.total,
        playType,
      },
    });
  }
};
