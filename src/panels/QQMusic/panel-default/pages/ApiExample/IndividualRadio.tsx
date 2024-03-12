import React, { useContext } from 'react';
import { FakePlayList } from '../../components/FakePlayList';
import { MusicPlayerContext } from '../../context';
import { useQQMusicIndividualRadio } from '../../hooks/useQQMusicIndividualRadio';
import { QQMusicIndividualRadioSongItem, QQMusicPlayListType } from '../../lib/qqMusicTypes';
import { describeError, withResult } from '../../utils';
import { Button } from 'antd-mobile';

const windowHeight = window.innerHeight || document.documentElement.clientHeight;

export function IndividualRadio() {
  const { onPlaySongInStaticList } = useContext(MusicPlayerContext);
  const { data, loading, error, refresh } = useQQMusicIndividualRadio();

  const renderContent = () => {
    if (loading) {
      return <div>加载中...</div>;
    }

    if (error) {
      return <div>{describeError(error)}</div>;
    }

    const onPlaySong = (song: QQMusicIndividualRadioSongItem, _index: number) => {
      withResult(onPlaySongInStaticList(
        {
          id: '',
          title: '私人电台',
          type: QQMusicPlayListType.Recommend,
          total: data!.length,
        },
        song.SongId,
        data!,
      ));
    };

    return (
      <>
        <FakePlayList songs={data} onPlaySong={onPlaySong} />
        <Button fill="outline" block onClick={refresh}>
          换一批
        </Button>
      </>
    );
  };

  return (
    <div
      className="common-page-container"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <div className="page-title">个性化推荐</div>
      {renderContent()}
    </div>
  );
}
