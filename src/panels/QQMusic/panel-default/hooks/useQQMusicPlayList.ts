import { useInfiniteScroll } from 'ahooks';
import { QQMusicPlayListType, QQMusicSongInDiss, QQMusicSongInfo } from '../lib/qqMusicTypes';
import { useEffect, useState } from 'react';

const sdk = (window as any).h5PanelSdk;

const FETCH_PAGE_SIZE = 10;

export const useQQMusicPlayList = (type: QQMusicPlayListType, id: number): {
  data: QQMusicSongInfo[] | undefined;
  loading: boolean;
  error: any;
  loadingMore: boolean;
  loadMore: () => void;
  noMore: boolean;
} => {
  const [error, setError] = useState<any>(undefined);

  const { data, loading, loadingMore, loadMore, noMore, reload } = useInfiniteScroll(
    async ({ nextId }: { nextId?: number; list?: QQMusicSongInfo[] } = {}) => {
      const page = nextId ?? 0;

      let songIds: number[] = [];
      let total = 0;
      switch (type) {
        case QQMusicPlayListType.SongList: {
          const songListDetail = await sdk.qqMusic.describeSongList({
            DissId: id,
            Page: page,
            PageSize: FETCH_PAGE_SIZE,
          });
          songIds = songListDetail.SongList.map((song: QQMusicSongInDiss) => song.SongId)
          total = songListDetail.TotalNum;
          break;
        }
        case QQMusicPlayListType.Album: {
          songIds = [];
          total = 0;
          break;
        }
        default:
          throw new Error('Not implemented PlayListType = ' + type);
      }

      const songInfoList = songIds.length
        ? await sdk.qqMusic.describeSongInfoBatch({
            SongIds: songIds,
          })
        : Promise.resolve([]);

      return {
        list: songInfoList,
        nextId: FETCH_PAGE_SIZE * (page + 1) >= total ? undefined : page + 1,
      };
    },
    {
      manual: true,
      onBefore: () => {
        setError(null);
      },
      onError: (err) => {
        console.error('[useQQMusicPlayList] request fail', err);
        setError(err);
      },
      isNoMore: data => !!data && !data.nextId,
    },
  );

  useEffect(() => {
    if (type && id) {
      reload();
    }
  }, [type, id]);

  return { data: data?.list, loading, error, loadMore, loadingMore, noMore };
};
