import React, { useEffect, useState } from 'react';
import './PlaylistsPage.less';
import { getRecommendPlayList } from '@src/models/kugou';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { useHistory } from 'react-router-dom';

export const PlaylistsPage = () => {
  useDocumentTitle('热门歌单');
  const [playlists, setPlaylists] = useState<Playlist[]>([]);

  useEffect(() => {
    getRecommendPlayList(1, 20).then((res) => {
      setPlaylists([...playlists, ...res.data.playlists]);
    });
  }, []);

  const history = useHistory();
  return (
    <div className="page-playlists">{
      playlists.map(item => (
        <div key={item.playlist_id} className="playlist-item">
          <img className="pic" src={item.pic} onClick={() => {
            history.push({
              pathname: '/playlistSongsPage',
              params: {
                type: 'playlist',
                id: item.playlist_id,
                title: item.playlist_name,
                img: item.pic,
                intro: item.intro.substr(0, 100),
              },
            });
          }}/>
          <p className="name">{item.playlist_name}</p>
        </div>
      ))
    }
    </div>
  );
};
