import { useRequest } from 'ahooks';
import { QQMusicSongInfo } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const useQQMusicSongInfo = (songId: number): {
  loading: boolean;
  data: QQMusicSongInfo | undefined;
  error: any;
} => {
  const { data, loading, error } = useRequest<QQMusicSongInfo[], never>(
    () => sdk.qqMusic.describeSongInfoBatch({ SongIds: [songId] }),
    {
      ready: !!songId,
      refreshDeps: [songId],
    }
  );

  return { loading, data: data?.[0], error };
};
