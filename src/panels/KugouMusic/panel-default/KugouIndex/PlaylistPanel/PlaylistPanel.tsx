import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './PlaylistPanel.less';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';

function PlaylistItem({ playlist }: { playlist: Playlist }) {
  const {
    playlist_id,
    playlist_name,
    pic,
    intro,
  } = playlist;
  const history = useHistory();

  function goPlayListMusicList() {
    history.push({
      pathname: '/musicList',
      params: {
        type: 'playlist',
        id: playlist_id,
        title: playlist_name,
        img: pic,
        intro: intro.substr(0, 100),
      },
    });
  }

  return (
    <div className="playlist-item" onClick={goPlayListMusicList}>
      {/* 加载不出来 */}
      <img src={pic} alt=""/>
      <div className="playlist-info">
        <p className="playlist-name">{playlist_name}</p>
        <p className="playlist-id">歌单id: {playlist_id}</p>
      </div>
    </div>
  );
}

export const PlaylistPanel = () => {
  const { kugouState } = useContext(KugouContext);
  const { recommendPlaylists: playlists } = kugouState;
  return (
    <div className="panel-playlist">
      <h3>歌单推荐</h3>
      {
        playlists.map(item => (
          <PlaylistItem
            key={item.playlist_id}
            playlist={item}
          />
        ))
      }
    </div>
  );
};
