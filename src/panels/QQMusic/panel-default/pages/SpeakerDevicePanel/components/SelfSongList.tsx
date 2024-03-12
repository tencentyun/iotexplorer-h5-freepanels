import React, { useState } from 'react';
import { useRequest } from 'ahooks';
import { QQMusicPlayListType, QQMusicSelfSongList } from '../../../lib/qqMusicTypes';
import { describeError } from '../../../utils';
import { PlayListEntry } from '../../../components/PlayListEntry';
import { PlayList } from '../../../components/PlayList';

const sdk = (window as any).h5PanelSdk;

export function SelfSongList() {
  const { data, loading, error } = useRequest<QQMusicSelfSongList[], never>(
    () => sdk.qqMusic.describeSelfSongList(),
  );

  const [viewSongListId, setViewSongListId] = useState<number | null>(null);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>加载失败: {describeError(error)}</div>
  }

  if (viewSongListId) {
    return <div>
      <PlayList
        type={QQMusicPlayListType.SongList}
        id={viewSongListId}
        operation={<div onClick={() => setViewSongListId(null)}>&lt; 返回</div>}
      />
    </div>;
  }

  return <div>
    {data
      ? data.map((songList) => (
        <PlayListEntry
          key={songList.DissId}
          type={QQMusicPlayListType.SongList}
          id={songList.DissId}
          title={songList.DissName}
          coverUrl={songList.DissPic}
          desc={`${songList.SongNum} 首歌曲`}
          onClick={() => setViewSongListId(songList.DissId)}
        />
      ))
      : null}
  </div>;
}
