import React, { useEffect, useState, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import './MusicListPage.less';
import {
  controlCurMusicList, controlSetCurSongId,
  getSongsByAlbum,
  getSongsByPlaylist,
  getSongsInfo,
  getSongUrl,
} from '@src/models/kugou';
import { KugouContext, KugouStateAction } from '@src/panels/KugouMusic/panel-default/KugouPage/KugouIndex';

interface PageParams {
  type: 'album' | 'playlist';
  id: string;
  img: string;
  title: string;
  intro: string;
}

const MusicListItem = ({ song, pageParams }: { song: Song, pageParams: PageParams }) => {
  const { dispatch, kugouState } = useContext(KugouContext);
  const history = useHistory();

  // 下发给端
  async function sendMusicListToDevice() {
    const { queueId } = kugouState.currentPlayQueue;
    // 是当前播放队列的，只切歌，不是同步歌单+歌
    let p1;
    if (queueId !== pageParams.id) {
      if (pageParams.type === 'album') {
        p1 = controlCurMusicList('GetSongsByAlbum', { page: 1, size: 10, album_id: pageParams.id });
      } else if (pageParams.type === 'playlist') {
        p1 = controlCurMusicList('GetSongsByPlaylist', { page: 1, size: 10, playlist_id: pageParams.id });
      }
    } else {
      p1 = Promise.resolve();
    }
    const p2 = controlSetCurSongId(song.song_id);
    await Promise.all([p1, p2]);
  }

  // 获取歌 UI更新
  async function updateUI() {
    // 更新歌曲
    const res = await Promise.all([getSongUrl(song.song_id), getSongsInfo([song.song_id])]);
    const songUrl = res[0].data;
    const songInfo = res[1].data.songs[0];
    const newSong = Object.assign({}, songUrl, songInfo);
    dispatch({
      type: KugouStateAction.UpdateCurrentPlaySong,
      payload: newSong,
    });
    // 换歌单，更新歌单queue
    const { queueId } = kugouState.currentPlayQueue;
    if (queueId !== pageParams.id) {
      let res;
      let idKey;
      if (pageParams.type === 'album') {
        res = await getSongsByAlbum(1, 10, pageParams.id);
        idKey = 'album_id';
      } else if (pageParams.type === 'playlist') {
        res = await getSongsByPlaylist(1, 10, pageParams.id);
        idKey = 'playlist_id';
      }
      dispatch({
        type: KugouStateAction.UpdateCurrentPlayQueue,
        payload: {
          songs: res.data.songs,
          queueId: res.data[idKey],
        },
      });
    }
    history.push('/kugou/musicPlayer');
  }

  const handleClick = async () => {
    window.h5PanelSdk.tips.showLoading('同步中');
    try {
      await sendMusicListToDevice();
      await updateUI();
      window.h5PanelSdk.tips.hideLoading();
    } catch (err) {
      console.error(err);
      window.h5PanelSdk.tips.hideLoading();
      window.h5PanelSdk.tips.alert(err.error_msg);
    }
  };

  return (
    <div className="music-list-item" onClick={handleClick}>
      <div className="song-info">
        <p className="info-song-name">{song.song_name}</p>
        <p className="info-singer">{song.singer_name} - {song.album_name}</p>
      </div>
    </div>
  );
};

export const MusicListPage = () => {
  const [musicList, setMusicList] = useState<Song[]>([]);
  const [pageParams, setPageParams] = useState<PageParams | null>(null);
  const location = useLocation();

  useEffect(() => {
    const { params } = location;
    if (params) {
      setPageParams({ ...params });
      sessionStorage.setItem('musicListPageParams', JSON.stringify(params));
    } else {
      const localPageParams: PageParams = JSON.parse(sessionStorage.getItem('musicListPageParams') as string);
      setPageParams({ ...localPageParams });
    }
  }, []);

  useEffect(() => {
    if (!pageParams) return;
    const getMusicList = async () => {
      if (pageParams.type === 'album') {
        const res = await getSongsByAlbum(1, 20, pageParams.id);
        setMusicList(res.data.songs);
      } else if (pageParams.type === 'playlist') {
        const res = await getSongsByPlaylist(1, 20, pageParams.id);
        setMusicList(res.data.songs);
      }
    };
    getMusicList();
  }, [pageParams]);

  return (
    pageParams && <div className="page-music-list">
      <header>
        <img src={pageParams.img} alt=""/>
        <div className="right">
          <p className="title">{pageParams.title}</p>
          <p className="intro">{pageParams.intro}</p>
        </div>
      </header>
      <div className="list-warp">
        {
          musicList.map(song => <MusicListItem key={song.song_id} song={song} pageParams={pageParams}/>)
        }
      </div>
    </div>
  );
};
