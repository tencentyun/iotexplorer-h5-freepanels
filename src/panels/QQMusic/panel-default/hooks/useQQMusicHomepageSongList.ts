import { useRequest } from 'ahooks';
import { DescribeHomepageSongListReq, DescribeHomepageSongListResp } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

export const useQQMusicHomepageSongList = (req: DescribeHomepageSongListReq): {
  loading: boolean;
  data: DescribeHomepageSongListResp | undefined;
  error: any;
  refresh: () => void;
} => {
  const { data, loading, error, refresh } = useRequest<DescribeHomepageSongListResp, never>(
    () => sdk.qqMusic.describeHomepageSongList(req),
  );

  return { loading, data, error, refresh };
};
