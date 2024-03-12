import { createContext } from 'react';
import { QQMusicPlayListType, QQMusicQualityType } from './lib/qqMusicTypes';
import { DeviceDataState } from '../../../hooks/useDeviceData';

export const MusicPlayerContext = createContext<{
  deviceState: DeviceDataState;
  playingSongId: number;
  onPlaySongInList: (
    type: QQMusicPlayListType,
    id: number,
    startSongId: number | null,
    startSongIndex: number,
  ) => Promise<void>;
  onPlaySongInStaticList: (
    list: {
      title: string;
      id: string | number;
      type: QQMusicPlayListType;
      total: number;
    },
    startSongId: number,
    songs: { SongId: number }[],
  ) => Promise<void>;
  onPlaySingleSong: (songId: number) => Promise<void>;
  musicQuality: QQMusicQualityType;
}>(null as any);
