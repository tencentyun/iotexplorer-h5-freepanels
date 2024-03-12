import React from 'react';
import { useRequest } from 'ahooks';
import { QQMusicPlayListType, QQMusicSelfSongList } from '../../lib/qqMusicTypes';
import { describeError } from '../../utils';
import { PlayListEntry } from '../../components/PlayListEntry';

import './SelfSongList.less';

const sdk = (window as any).h5PanelSdk;
const windowHeight = window.innerHeight || document.documentElement.clientHeight;

function SelfSongListComp() {
  const { data, loading, error } = useRequest<QQMusicSelfSongList[], never>(
    () => sdk.qqMusic.describeSelfSongList(),
  );

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>加载失败: {describeError(error)}</div>
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
        />
      ))
      : null}
  </div>;
}

export function SelfSongList() {
  return (
    <div
      className="common-page-container"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <div className="page-title">我的收藏歌单</div>

      <SelfSongListComp />
    </div>
  );
}
