import { useRequest } from 'ahooks';
import { QQMusicSongInfo } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const useQQMusicSongInfoBatch = (songIds: number[]): {
  data: QQMusicSongInfo[] | undefined;
  loading: boolean;
  error: any;
} => {
  const { data, loading, error } = useRequest<QQMusicSongInfo[], never>(
    () => songIds.length ? sdk.qqMusic.describeSongInfoBatch({ SongIds: songIds }) : Promise.resolve([]),
    {
      refreshDeps: [songIds.join(',')],
    }
  );

  return { data, loading, error };
};
