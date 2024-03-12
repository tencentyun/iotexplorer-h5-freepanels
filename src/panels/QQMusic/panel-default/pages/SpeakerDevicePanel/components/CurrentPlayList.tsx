import React, { useContext } from 'react';
import { useRequest } from 'ahooks';
import { Mask } from 'antd-mobile';
import classNames from 'classnames';
import { MusicPlayerContext } from '../../../context';
import { deviceGetRawSongList, devicePlaySong } from '../../../deviceController';
import { useQQMusicPlayList } from '../../../hooks/useQQMusicPlayList';
import { QQMusicPlayListType } from '../../../lib/qqMusicTypes';
import { describeError, withResult } from '../../../utils';

import './CurrentPlayList.less';

const sdk = window.h5PanelSdk as any;

interface FakePlayListSongInfo {
  SongId: number;
  SongTitle: string;
  SingerName: string;
  AlbumPic: string;
  UnplayableCode?: number;
  Try30SUrl?: string;
  UnplayableMsg?: string;
}

function FakePlayList<T extends FakePlayListSongInfo>(props: {
  onPlaySong: (song: T, index: number) => void;
  songIds?: number[];
  songs?: T[];
}) {
  const { onPlaySong } = props;
  const { data, loading, error } = useRequest<T[], never>(
    () => props.songs ? Promise.resolve(props.songs) : sdk.qqMusic.describeSongInfoBatch({ SongIds: props.songIds }),
    {
      ready: !!props.songIds?.length || !!props.songs?.length,
      refreshDeps: [props.songIds?.join(','), props.songs?.map(s => s.SongId).join(',')],
    }
  );

  if (loading) {
    return <div>加载中...</div>;
  }

  if (error) {
    return <div>{describeError(error)}</div>;
  }

  if (!Array.isArray(data)) {
    return null;
  }

  return <>{data.map((song, index) => (
    <SongEntry
      key={song.SongId}
      id={song.SongId}
      title={song.SongTitle}
      artist={song.SingerName}
      onClick={() => {
        onPlaySong(song, index);
      }}
    />
  ))}</>
}

function SongEntry({
  id,
  title,
  artist,
  onClick,
}: {
  id: number;
  title: string;
  artist: string;
  onClick: () => void;
}) {
  const { playingSongId } = useContext(MusicPlayerContext);

  const isPlaying = playingSongId === id;

  return (
    <div className={classNames('current-song-entry', { 'is-playing': isPlaying })} onClick={onClick}>
      {isPlaying && <div className="current-song-entry__playing"></div>}
      <div className="current-song-entry__title">{title}</div>
      <div className="current-song-entry__split">-</div>
      <div className="current-song-entry__artist">
        {artist}
      </div>
    </div>
  );
}

function PlayList({
  type,
  id,
}: {
  type: QQMusicPlayListType;
  id: number;
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
      {songList.map((song, index) => (
        <SongEntry
          key={song.SongId}
          id={song.SongId}
          title={song.SongTitle}
          artist={song.SingerName}
          onClick={() => {
            play(index);
          }}
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
}

export function CurrentPlayList({
  visible,
  onClose,
}: {
  visible: boolean;
  onClose: () => void;
}) {
  const { deviceState: { deviceData } } = useContext(MusicPlayerContext);

  // 播放列表
  const rawSongList = deviceGetRawSongList(deviceData);
  // const songList = useMemo(() => deviceGetSongList(deviceData), [rawSongList]);
  const songList = {
    songListId: 0,
    songListType: QQMusicPlayListType.Song,
    songList: [990, 991, 992, 993, 994, 995, 996, 997, 998, 999],
  };

  return (
    <Mask visible={visible} onMaskClick={() => onClose()}>
      <div className="current-play-list">
        <div className="current-play-list__header">
          <span>当前播放</span>
          <span className="close" onClick={onClose}>关闭</span>
        </div>
        <div className="current-play-list__content">
          {songList.songListType !== QQMusicPlayListType.Song
            ? (
              <PlayList
                type={songList.songListType}
                id={songList.songListId}
              />
            )
            : (
              <FakePlayList
                songIds={songList.songList}
                onPlaySong={(song) => {
                  withResult(devicePlaySong(song.SongId));
                }}
              />
            )}
        </div>
      </div>
    </Mask>
  );
}
