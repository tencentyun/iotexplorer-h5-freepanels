import React, { useContext, useState } from 'react';
import { useRequest } from 'ahooks';
import { FakePlayList } from '../../components/FakePlayList';
import { MusicPlayerContext } from '../../context';
import { QQMusicFreeSongGroupItem, QQMusicFreeSongInfo, QQMusicPlayListType } from '../../lib/qqMusicTypes';
import { describeError, withResult } from '../../utils';

const sdk = window.h5PanelSdk as any;
const windowHeight = window.innerHeight || document.documentElement.clientHeight;

function FreeSongGroup({
  groupInfo,
}: {
  groupInfo: QQMusicFreeSongGroupItem;
}) {
  const { musicQuality } = useContext(MusicPlayerContext);
  const [expanded, setExpanded] = useState(false);

  const title = groupInfo.Name;
  const desc = `${groupInfo.SongList.length} 首歌曲`;
  const coverUrl = groupInfo.BannerPic;

  const onPlaySong = (song: { SongId: number; SongToken: string }, index: number) => {
    withResult((async () => {
      const songInfo: QQMusicFreeSongInfo = await sdk.qqMusic.describeFreeSongInfo({
        SongId: song.SongId,
        SongToken: song.SongToken,
      });

      sdk.qqMusic.syncSongList({
        Id: String(groupInfo.Number),
        Name: groupInfo.Name,
        Type: QQMusicPlayListType.NoLoginArea,
        Quality: musicQuality,
        Total: groupInfo.SongList.length,
        Page: index + 1,
        PageSize: 1,
        SongList: sdk.qqMusic.pickSongInfoForSync([songInfo], {
          quality: musicQuality,
          necessarySongId: songInfo.SongId,
        }),
        PlaySongId: songInfo.SongId,
      });
    })());
  };

  return (
    <>
      <div className="play-list-entry" onClick={() => setExpanded(value => !value)}>
        <div className="play-list-entry__cover" style={{ backgroundImage: coverUrl ? `url(${coverUrl})` : undefined }}></div>
        <div className="play-list-entry__text">
          <div className="play-list-entry__title">{title}</div>
          <div className="play-list-entry__desc">{desc}</div>
        </div>
      </div>
      {expanded ? (
        <div className="album-detail">
          <FakePlayList
            songs={groupInfo.SongList}
            onPlaySong={onPlaySong}
          />
        </div>
      ) : null}
    </>
  );
};

export function NoLoginArea() {
  const { data, loading, error } = useRequest<QQMusicFreeSongGroupItem[], never>(
    () => sdk.qqMusic.describeFreeSongList(),
  );

  const renderContent = () => {
    if (loading) {
      return <div>加载中...</div>;
    }

    if (error) {
      return <div>{describeError(error)}</div>;
    }

    return data?.map(groupInfo => <FreeSongGroup groupInfo={groupInfo} key={groupInfo.Name} />);
  };
  
  return (
    <div
      className="common-page-container"
      style={{ minHeight: `${windowHeight}px` }}
    >
      <div className="page-title">免登录专区</div>
      {renderContent()}
    </div>
  );
}
