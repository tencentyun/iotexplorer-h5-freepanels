import React, { useContext } from 'react';
import { FakePlayList } from '../../components/FakePlayList';
import { useQQMusicDailySongs } from '../../hooks/useQQMusicDailySongs';
import { describeError, withResult } from '../../utils';
import { QQMusicDailySongItem, QQMusicPlayListType } from '../../lib/qqMusicTypes';
import { MusicPlayerContext } from '../../context';

const windowHeight = window.innerHeight || document.documentElement.clientHeight;

export function DailySongs() {
  const { onPlaySongInStaticList } = useContext(MusicPlayerContext);
  const { data, loading, error } = useQQMusicDailySongs();

  const renderContent = () => {
    if (loading) {
      return <div>加载中...</div>;
    }

    if (error) {
      return <div>{describeError(error)}</div>;
    }

    const onPlaySong = (song: QQMusicDailySongItem, _index: number) => {
      withResult(onPlaySongInStaticList(
        {
          id: 'DailySongs',
          title: '每日推荐',
          type: QQMusicPlayListType.Recommend,
          total: data!.length,
        },
        song.SongId,
        data!,
      ));
    };

    return <FakePlayList songs={data} onPlaySong={onPlaySong} />;
  };

  return (
    <div
      className="common-page-container"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <div className="page-title">每日推荐</div>
      {renderContent()}
    </div>
  );
}
