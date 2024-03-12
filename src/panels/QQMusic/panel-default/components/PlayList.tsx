import React, { useContext } from 'react';
import { describeError, withResult } from '../utils';
import { SongEntry } from './SongEntry';
import { QQMusicPlayListType } from '../lib/qqMusicTypes';
import { useQQMusicPlayList } from '../hooks/useQQMusicPlayList';
import { MusicPlayerContext } from '../context';

import './PlayList.less';

export function PlayList({
  type,
  id,
  operation,
  showPlayAllButton = true,
}: {
  type: QQMusicPlayListType;
  id: number;
  operation?: React.ReactNode;
  showPlayAllButton?: boolean;
}) {
  const { onPlaySongInList } = useContext(MusicPlayerContext);

  const { data: songList, loading, error, loadingMore, loadMore, noMore } = useQQMusicPlayList(type, id);

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>{describeError(error)}</div>;
  }

  if (!songList || songList.length === 0) {
    return <div>暂无歌曲</div>;
  }

  const play = (index?: number) => {
    const song = index !== undefined ? songList[index] : null;
    withResult(onPlaySongInList(type, id, song ? song.SongId : null, index || 0));
  };

  return (
    <>
      <div className="play-list__operation">
        {operation}
        {!!showPlayAllButton && (
          <div className="play-list__play-all-btn">
            <div className="play-list__play-icon"></div>
            <div className="play-list__play-text">全部播放</div>
          </div>
        )}
      </div>
      {songList.map((song, index) => (
        <SongEntry
          key={song.SongId}
          songId={song.SongId}
          title={song.SongTitle}
          artist={song.SingerName}
          coverUrl={song.AlbumPic}
          onClick={() => {
            play(index);
          }}
          unplayableCode={song.UnplayableCode}
          hasTryPlay={!!song.Try30SUrl}
          unplayableMsg={song.UnplayableMsg}
        />
      ))}
      {!loadingMore && !!error && (
        <div>{describeError(error)}</div>
      )}
      {!loadingMore && !noMore && (
        <div><button onClick={loadMore}>加载更多</button></div>
      )}
      {loadingMore && (
        <div>加载中...</div>
      )}
    </>
  );
};
