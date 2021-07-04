import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './AlbumPanel.less';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/KugouPage/KugouIndex';

function AlbumItem({ album }: { album: Album }) {
  const history = useHistory();

  function goAlbumMusicList() {
    history.push({
      pathname: '/kugou/musicList',
      params: {
        type: 'album',
        id: album.album_id,
        img: album.album_img_small,
        title: album.album_name,
        intro: album.intro.substr(0, 100),
      },
    });
  }

  return (
    <div className="album-item" onClick={goAlbumMusicList}>
      <img src={album.album_img_mini} alt=""/>
      <div className="album-info">
        <p className="album-name">{album.album_name}</p>
        <p className="singer">{album.singer_name} {album.publish_time}</p>
      </div>
    </div>
  );
}

export function AlbumPanel() {
  const { kugouState } = useContext(KugouContext);
  const { albums } = kugouState;
  return (
    <div className="panel-albums">
      <h3>周杰伦专辑</h3>
      {
        albums.map(item => (
          <AlbumItem
            key={item.album_id}
            album={item}
          />
        ))
      }
    </div>
  );
}
