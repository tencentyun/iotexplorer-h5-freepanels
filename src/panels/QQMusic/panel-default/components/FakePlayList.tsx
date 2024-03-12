import React from 'react';
import { useRequest } from 'ahooks';
import { describeError } from '../utils';
import { SongEntry } from './SongEntry';

import './SongEntry.less';

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

export function FakePlayList<T extends FakePlayListSongInfo>(props: {
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
      songId={song.SongId}
      title={song.SongTitle}
      artist={song.SingerName}
      coverUrl={song.AlbumPic}
      onClick={() => {
        onPlaySong(song, index);
      }}
      unplayableCode={song.UnplayableCode}
      hasTryPlay={!!song.Try30SUrl}
      unplayableMsg={song.UnplayableCode ? song.UnplayableMsg || '该歌曲暂不能播放' : undefined}
    />
  ))}</>
};
