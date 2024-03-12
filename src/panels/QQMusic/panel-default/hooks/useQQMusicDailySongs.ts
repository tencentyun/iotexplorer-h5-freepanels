import { useRequest } from 'ahooks';
import { QQMusicDailySongItem } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const useQQMusicDailySongs = (): {
  loading: boolean;
  data: QQMusicDailySongItem[] | undefined;
  error: any;
} => {
  const { data, loading, error } = useRequest<QQMusicDailySongItem[], never>(
    () => sdk.qqMusic.describeDailySongs(),
  );

  return { loading, data, error };
};
