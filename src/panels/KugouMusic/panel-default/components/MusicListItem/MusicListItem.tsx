import React from 'react';
import './MusicListItem.less';

interface Props {
  song: Song
}

export function MusicListItem({ song }: Props) {
  return (
    <div className="music-list-item">
      <img src={song.album_img_mini}/>
      <div className="song-info">
        <p className="info-song-name">{song.song_name}</p>
        <p className="info-singer">{song.singer_name} - {song.album_name}</p>
      </div>
    </div>
  );
}
