import { useInfiniteScroll } from 'ahooks';
import { useEffect, useState } from 'react';
import { QQMusicSearchType, QQMusicSearchMusicItem } from '../lib/qqMusicTypes';

const sdk = (window as any).h5PanelSdk;

const FETCH_PAGE_SIZE = 20;

export const useQQMusicSearchSong = (type: QQMusicSearchType, keyword: string): {
  data: QQMusicSearchMusicItem[] | undefined;
  loading: boolean;
  error: any;
  loadingMore: boolean;
  loadMore: () => void;
  noMore: boolean;
} => {
  const [error, setError] = useState<any>(undefined);

  const { data, loading, loadingMore, loadMore, noMore, reload, mutate } = useInfiniteScroll(
    async ({ nextId }: { nextId?: number; list?: QQMusicSearchMusicItem[] } = {}) => {
      const page = nextId ?? 1;

      const resp = await sdk.qqMusic.searchMusic({
        SearchType: type,
        KeyWord: keyword,
        Page: page,
        Num: FETCH_PAGE_SIZE,
      });
      const songList = resp.List as QQMusicSearchMusicItem[];
      const total = resp.TotalNum;

      return {
        list: songList,
        nextId: FETCH_PAGE_SIZE * (page + 1) >= total ? undefined : page + 1,
      };
    },
    {
      manual: true,
      onBefore: () => {
        setError(null);
      },
      onError: (err) => {
        console.error('[useQQMusicSearchSong] request fail', err);
        setError(err);
      },
      isNoMore: data => !!data && !data.nextId,
    },
  );

  useEffect(() => {
    if (keyword) {
      mutate(undefined);
      reload();
    }
  }, [type, keyword]);

  return { data: data?.list, loading, error, loadMore, loadingMore, noMore };
};
