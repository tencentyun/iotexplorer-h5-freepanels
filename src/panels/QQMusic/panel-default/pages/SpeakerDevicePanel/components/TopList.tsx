import React, { useContext } from 'react';
import { useRequest } from 'ahooks';
import { QQMusicFreeSongGroupItem, QQMusicFreeSongInfo, QQMusicPlayListType } from '../../../lib/qqMusicTypes';
import { SongListCard } from './SongListCard';
import { withResult } from '../../../utils';
import { MusicPlayerContext } from '../../../context';

const sdk = window.h5PanelSdk as any;

export function TopList() {
  const { musicQuality } = useContext(MusicPlayerContext);

  const { data } = useRequest<QQMusicFreeSongGroupItem[], never>(
    () => sdk.qqMusic.describeFreeSongList(),
  );

  if (!data) {
    return null;
  }

  const onPlaySongList = (groupInfo: QQMusicFreeSongGroupItem) => {
    withResult((async () => {
      const index = 0;
      const song = groupInfo.SongList[index];

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
      {data.map((item) => (
        <SongListCard
          key={item.Name}
          coverUrl={item.BannerPic}
          songs={item.SongList.slice(0, 3).map(song => ({
            id: song.SongId,
            title: song.SongTitle,
            artist: song.SingerName,
          }))}
          onClick={() => onPlaySongList(item)}
        />
      ))}
    </>
  );
}
