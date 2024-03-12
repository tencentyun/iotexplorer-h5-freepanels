import React, { useContext } from "react";
import classNames from "classnames";
import { useQQMusicHomepageSongList } from "../../../hooks/useQQMusicHomepageSongList";
import { describeError, withResult } from "../../../utils";
import { MusicPlayerContext } from "../../../context";
import { QQMusicPlayListType } from "../../../lib/qqMusicTypes";

import './HomepageSongList.less';

function SongListItem({
  title,
  coverUrl,
  loading,
  onClick,
}: {
  title: string;
  coverUrl: string;
  loading?: boolean;
  onClick?: () => void;
}) {
  return (
    <div className={classNames('homepage-song-list__item', { 'is-loading': loading })} onClick={onClick}>
      <div className="homepage-song-list__item-cover">
        {loading
          ? <div className="homepage-song-list__item-cover-img"></div>
          : <img src={coverUrl} className="homepage-song-list__item-cover-img" />
        }
      </div>
      <div className="homepage-song-list__item-title">
        {title}
      </div>
    </div>
  )
}

export function HomepageSongList() {
  const { onPlaySongInList } = useContext(MusicPlayerContext);
  const { data, loading, error } = useQQMusicHomepageSongList({
    Type: '500', // 歌单
    SN: (window as any).h5PanelSdk.deviceId,
  });

  const onPlaySongList = (id: string) => {
    withResult(onPlaySongInList(QQMusicPlayListType.SongList, Number(id), null, 0));
  };

  const renderContent = () => {
    if (loading) {
      return (
        <>
          {[null, null, null].map((_, index) => (
            <SongListItem key={index} title="歌单标题" coverUrl="" loading />
          ))}
        </>
      );
    }

    if (error) {
      return <div>{describeError(error)}</div>;
    }

    const songLists: Array<{ title: string; coverUrl: string; id: string }> = [];

    data?.ShelfArr.forEach(shelf => {
      shelf.CardArr.forEach(card => {
        songLists.push({
          title: card.Title,
          coverUrl: card.Cover,
          id: card.Id,
        });
      });
    });

    return (
      <>
        {songLists.slice(0, 3).map((songList) => (
          <SongListItem
            key={songList.id}
            title={songList.title}
            coverUrl={songList.coverUrl}
            onClick={() => onPlaySongList(songList.id)}
          />
        ))}
      </>
    );
  };

  return (
    <div className="homepage-song-list">
      {renderContent()}
    </div>
  );
}
