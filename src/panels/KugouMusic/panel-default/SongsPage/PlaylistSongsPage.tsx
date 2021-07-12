import React, { useEffect, useState } from 'react';
import './SongsPage.less';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { getSongsByPlaylist, getSongsInfo } from '@src/models/kugou';
import { SongListItem } from '@src/panels/KugouMusic/panel-default/components/SongListItem/SongListItem';
import { usePlayMode } from '@src/panels/KugouMusic/panel-default/hooks/usePlayMode';
import { useSongsPageParams } from '@src/panels/KugouMusic/panel-default/hooks/useSongsPageParams';

export const PlaylistSongsPage = () => {
  useDocumentTitle('推荐歌单');
  const [total, setTotal] = useState(0);
  const [curSongs, setCurSongs] = useState<Song[]>([]);
  const [playModeText, playModeIcon] = usePlayMode();
  const pageParams = useSongsPageParams();

  useEffect(() => {
    getSongsByPlaylist(1, 20, pageParams.id).then(async (res) => {
      const { songs } = res.data;
      const songsId = songs.map(item => item.song_id);
      const res2 = await getSongsInfo(songsId);
      setCurSongs(res2.data.songs);
      setTotal(res.data.total);
    });
  }, []);

  return (
    <div className="page-musicList">
      {/* 歌曲列表主体 */}
      <main className="list-main">
        <header className="list-main-header">
          <div className="left">
            <div className="circle"/>
            <span>全部播放 （{total}）</span>
          </div>
          <div className="right">
            <img className="icon-playMode" src={playModeIcon}/>
            <span>{playModeText}</span>
          </div>
        </header>
        {
          curSongs.map(item => (
            <SongListItem
              key={item.song_id}
              song={item}
              curSongs={curSongs}
              queueType={'playlist'}
              newQueueId={pageParams.id}
            />
          ))
        }
      </main>
    </div>
  );
};
