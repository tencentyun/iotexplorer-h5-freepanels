import { useRequest } from 'ahooks';
import { QQMusicIndividualRadioSongItem } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const useQQMusicIndividualRadio = (): {
  loading: boolean;
  data: QQMusicIndividualRadioSongItem[] | undefined;
  error: any;
  refresh: () => void;
} => {
  const { data, loading, error, refresh } = useRequest<QQMusicIndividualRadioSongItem[], never>(
    () => sdk.qqMusic.describeIndividualRadio(),
  );

  return { loading, data, error, refresh };
};
