import React, { useContext } from 'react';
import './SongListItem.less';
import Toast from '@src/panels/KugouMusic/panel-default/components/Toast/Toast';
import {
  controlCurMusicList,
  controlDevice,
  controlSetCurSongId,
  getSongData,
  getSongsByAlbum,
  getSongsByPlaylist,
} from '@src/models/kugou';
import { useHistory } from 'react-router-dom';
import { KugouContext, KugouStateAction } from '@src/panels/KugouMusic/panel-default/app';

interface SongListItemProps {
  song: Song;
  queueType: 'album' | 'playlist' | 'newSongs' | 'curPlayQueue';
  newQueueId: string | number;
  curSongs: Song[]; // 少拿一次详情吧
}

export const SongListItem = ({ song, queueType, newQueueId, curSongs }: SongListItemProps) => {
  const { dispatch, kugouState } = useContext(KugouContext);
  const history = useHistory();

  /**
   * 下发给端
   * 是当前播放队列的，只切歌，不是同步歌单+歌
   * 1.同步设备 2.同步UI
   */
  async function syncPlayQueueAndSong() {
    // 同步歌单
    const { queueId: curQueueId } = kugouState.currentPlayQueue;
    if (curQueueId !== newQueueId) {
      let res;
      switch (queueType) {
        case 'album':
          await controlDevice(controlCurMusicList, 'GetSongsByAlbum', {
            page: 1,
            size: 10,
            album_id: newQueueId,
          });
          res = await getSongsByAlbum(1, 10, newQueueId as string);
          break;
        case 'newSongs':
          Toast.open('新歌首发播控下发');
          return;
        case 'playlist':
          await controlDevice(controlCurMusicList, 'GetSongsByPlaylist', {
            page: 1,
            size: 10,
            playlist_id: newQueueId,
          });
          res = await getSongsByPlaylist(1, 10, newQueueId as string);
          dispatch({
            type: KugouStateAction.UpdateCurrentPlayQueue,
            payload: {
              songs: curSongs,
              queueId: newQueueId,
              total: res.data.total,
            },
          });
          break;
      }
    }
    // 同步歌曲，不用拉取，在wsReport中处理了
    controlDevice(controlSetCurSongId, song.song_id).then(async () => {
      await getSongData(song.song_id);
      // dispatch({
      //   type: KugouStateAction.UpdateCurrentPlaySong,
      //   payload: newSong,
      // });
      history.push('/musicPlayer');
    });
  }

  const handleSongClick = async () => {
    if (song.playable_code !== 0) {
      Toast.open('当前歌曲暂不支持播放哦~');
      return;
    }
    if (song.song_id === kugouState.currentPlaySong!.song_id) {
      Toast.open('正在播放当前歌曲~');
      return;
    }
    syncPlayQueueAndSong();
  };

  return (
    <div className="song-list-item" onClick={handleSongClick}>
      <img className="album" src={song.album_img}/>
      <div className="middle-view">
        <p className={song.playable_code === 0 ? 'song-view' : 'song-view not-play-color'}>
          <span className="song-name">{song.song_name}</span>
          {song.is_vip_song === 1 && <span className="vipIcon">VIP</span>}
        </p>
        <p className={song.playable_code === 0 ? 'singer' : 'singer not-play-color'}>
          {song.singer_name}
        </p>
      </div>
    </div>
  );
};
