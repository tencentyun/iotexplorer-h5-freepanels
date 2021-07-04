import React, { useContext } from 'react';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/KugouPage/KugouIndex';
import './CurrentPlaylist.less';

const MusicListItem = ({ song }: { song: Song }) => {
  return (
    <div className="music-list-item">
      <div className="song-info">
        <p className="info-song-name">{song.song_name}</p>
        <p className="info-singer">{song.singer_name} - {song.album_name}</p>
      </div>
    </div>
  );
};

export const CurrentPlaylist = () => {
  const { kugouState, setShowPlaylistModel } = useContext(KugouContext);
  const { currentPlayQueue } = kugouState;
  return (
    <>
      <div className="model-warp" onClick={() => {
        setShowPlaylistModel(false);
      }}>
      </div>
      <div className="playlist-warp">
        <div className="current-playlist">
          {
            currentPlayQueue.songs.map((item) => {
              return <MusicListItem key={item.song_id} song={item}/>;
            })
          }
        </div>
      </div>
    </>
  );
};
