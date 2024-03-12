import { useRequest } from 'ahooks';
import { DescribeLyricResp } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const useQQMusicSongLyrics = (songId: number): {
  loading: boolean;
  data: DescribeLyricResp | undefined;
  error: any;
} => {
  const { data, loading, error } = useRequest<DescribeLyricResp, never>(
    () => sdk.qqMusic.describeLyric({ SongId: songId }),
    {
      ready: !!songId,
      refreshDeps: [songId],
    }
  );

  return { loading, data, error };
};
