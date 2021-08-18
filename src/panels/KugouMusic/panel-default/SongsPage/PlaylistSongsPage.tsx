import React, { useEffect, useState } from 'react';
import './SongsPage.less';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { getSongsByPlaylist, getSongsInfo } from '@src/models/kugou';
import { SongListItem } from '@src/panels/KugouMusic/panel-default/SongsPage/components/SongListItem/SongListItem';
import { useSongsPageParams } from '@src/panels/KugouMusic/panel-default/hooks/useSongsPageParams';
import { SongListHeader } from '@src/panels/KugouMusic/panel-default/SongsPage/components/SongListHeader/SongListHeader';
import { onScrollToBottomLoad } from '@src/panels/KugouMusic/panel-default/utils/onScrollToBottomLoad';
import { Song } from '@src/panels/KugouMusic/panel-default/types';

export const PlaylistSongsPage = () => {
  useDocumentTitle('推荐歌单');
  const [total, setTotal] = useState(0);
  const [curSongs, setCurSongs] = useState<Song[]>([]);
  const [curPage, setCurPage] = useState(2);
  const pageParams = useSongsPageParams();

  useEffect(() => {
    getSongsByPlaylist(1, 15, pageParams.id).then(async (res1) => {
      const { songs } = res1.data;
      const songsId = songs.map(item => item.song_id);
      const res2 = await getSongsInfo(songsId);
      setCurSongs(res2.data.songs);
      setTotal(res1.data.total);
      setCurPage(2);
    });
  }, []);

  return (
    <div className="page-songsList" onScroll={onScrollToBottomLoad(async () => {
      const res = await getSongsByPlaylist(curPage, 15, pageParams.id);
      const { songs } = res.data;
      if (songs.length === 0) return;
      const songsId = songs.map(item => item.song_id);
      const res2 = await getSongsInfo(songsId);
      setCurSongs([...curSongs, ...res2.data.songs]);
      setCurPage(curPage + 1);
    })}>
      {/* 歌曲列表主体 */}
      <main className="list-main">
        <SongListHeader playType={'playlist'} curSongs={curSongs} curListId={pageParams.id} total={total}/>
        {
          curSongs.map((item, index) => (
            <SongListItem
              key={item.song_id}
              song={item}
              playType={'playlist'}
              newQueueId={pageParams.id}
              songIndex={index}
            />
          ))
        }
      </main>
    </div>
  );
};
