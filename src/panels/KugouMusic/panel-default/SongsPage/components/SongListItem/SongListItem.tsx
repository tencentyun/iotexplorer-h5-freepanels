import React, { useContext } from 'react';
import './SongListItem.less';
import { useHistory } from 'react-router-dom';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';
import { useSyncPlayQueueAndSong } from '@src/panels/KugouMusic/panel-default/hooks/useSyncPlayQueueAndSong';
import { iconLikeGrey } from '@icons/kugou';

interface SongListItemProps {
  song: Song;
  playType: 'album' | 'playlist' | 'newSongs' | 'recommendDaily' | 'curPlayQueue';
  newQueueId: string | number;
  songIndex: number;
}

export const SongListItem = ({ song, songIndex, playType, newQueueId }: SongListItemProps) => {
  const { dispatch, kugouState } = useContext(KugouContext);
  const history = useHistory();

  const handleSongClick = async () => {
    useSyncPlayQueueAndSong(playType, newQueueId, song, songIndex, kugouState, dispatch).then(() => {
      history.push('/musicPlayer');
    });
  };

  return (
    <div className="song-list-item" onClick={handleSongClick}>
      <img className="album" src={song.album_img}/>
      <div className="middle-view">
        <p className={(song.playable_code === 0 || song.playable_code === 3) ? 'song-view' : 'song-view not-play-color'}>
          <span className="song-name">{song.song_name}</span>
          {song.is_vip_song === 1 && <span className="vipIcon">VIP</span>}
        </p>
        <p className={(song.playable_code === 0 || song.playable_code === 3) ? 'singer' : 'singer not-play-color'}>
          {song.singer_name}
        </p>
      </div>
      <img className="iconLikeGrey" src={iconLikeGrey}/>
    </div>
  );
};
