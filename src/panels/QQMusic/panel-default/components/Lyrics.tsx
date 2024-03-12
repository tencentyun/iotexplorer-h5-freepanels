import React, { useMemo } from 'react';
import { useQQMusicSongLyrics } from '../hooks/useQQMusicSongLyrics';
import { describeError } from '../utils';

import './Lyrics.less';

export function Lyrics({
  songId,
}: {
  songId: number;
}) {
  const { data, loading, error } = useQQMusicSongLyrics(songId);

  const lyricLines = useMemo(() => {
    if (!data) return [];

    return data.SongLyric
      .split('\n')
      .map(line => /^\[((?:\d{2}):(?:\d{2})(?:\.\d+)?)\]\s*(.+)/.exec(line))
      .filter(match => !!match)
      .map((match: RegExpExecArray | null) => ({
        time: match![1],
        text: match![2],
      }));
  }, [data]);

  if (loading) return <div>加载中...</div>;
  if (error) return <div>{describeError(error)}</div>;

  return (
    <div className="lyrics">
      {lyricLines?.length ? (
        lyricLines.map((item, index) => (
          <div className="lyrics__row" key={index}>
            <span>{item.text}</span>
          </div>
        )
      )
    ) : '暂无歌词'}
    </div>
  );
}
