import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './KugouHome.less';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';

export const KugouHome = () => {
  const { kugouState } = useContext(KugouContext);
  const { newSongs, recommendPlaylists: playlists } = kugouState;
  const history = useHistory();

  return (
    <div className="kugou-home">
      {/* 新歌首发 */}
      <div className="home-box">
        <header>
          <span className="title">新歌首发</span>
          <span className="more" onClick={() => history.push('/newSongsPage')}>更多 {'>'}</span>
        </header>
        <main>
          {
            newSongs.map(song => (
              <div key={song.song_id} className="home-box-item">
                <img className="img-album" src={song.album_img_mini}/>
                <p className="line-1">{song.song_name}</p>
                <p className="line-2">{song.singer_name}</p>
              </div>
            ))
          }
        </main>
      </div>

      {/* 推荐歌单 */}
      <div className="home-box">
        <header>
          <span className="title">热门歌单</span>
          <span className="more" onClick={() => history.push('/playlists')}>更多 {'>'}</span>
        </header>
        <main>
          {
            playlists.map(item => (
              <div key={item.playlist_id} className="home-box-item">
                <img className="img-album" src={item.pic} onClick={() => {
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
                <p className="line-1-playlist">{item.playlist_name}</p>
              </div>
            ))
          }
        </main>
      </div>
    </div>
  );
};
