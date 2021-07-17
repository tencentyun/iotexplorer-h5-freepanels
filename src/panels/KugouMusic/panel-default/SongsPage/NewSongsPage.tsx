import React, { useEffect, useState } from 'react';
import './SongsPage.less';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { getNewSongs } from '@src/models/kugou';
import { SongListItem } from '@src/panels/KugouMusic/panel-default/SongsPage/components/SongListItem/SongListItem';
import { SongListHeader } from '@src/panels/KugouMusic/panel-default/SongsPage/components/SongListHeader/SongListHeader';
import { onScrollToBottomLoad } from '@src/panels/KugouMusic/panel-default/utils/utils';

const regionMap = [
  {
    text: '华语',
    topId: 1,
    bannerImg: 'https://qzonestyle.gtimg.cn/qzone/qzact/act/external/iot/h5panel/release/bannerChinese.png',
  },
  {
    text: '欧美',
    topId: 2,
    bannerImg: 'https://qzonestyle.gtimg.cn/qzone/qzact/act/external/iot/h5panel/release/bannerEurope.png',
  },
  {
    text: '日韩',
    topId: 3,
    bannerImg: 'https://qzonestyle.gtimg.cn/qzone/qzact/act/external/iot/h5panel/release/bannerKorea.png',
  },
];

export const NewSongsPage = () => {
  useDocumentTitle('新歌首发');
  const [curTabIndex, setCurTabIndex] = useState<number>(Number(sessionStorage.getItem('kugou_newSongs_tabIndex')));
  const [total, setTotal] = useState(0);
  const [curSongs, setCurSongs] = useState<Song[]>([]);
  const [curPage, setCurPage] = useState(2);

  // 记录tab状态
  // useEffect(() => {
  //   const tabIndex = sessionStorage.getItem('kugou_newSongs_tabIndex');
  //   if (tabIndex) setCurTabIndex(Number(tabIndex));
  // }, []);

  useEffect(() => {
    getNewSongs(1, 20, regionMap[curTabIndex].topId).then((res) => {
      const { total, songs } = res.data;
      setCurSongs(songs);
      setTotal(total);
      setCurPage(2);
    });
    sessionStorage.setItem('kugou_newSongs_tabIndex', String(curTabIndex));
  }, [curTabIndex]);

  return (
    <div className="page-songsList" onScroll={onScrollToBottomLoad(async () => {
      const res = await getNewSongs(curPage, 20, regionMap[curTabIndex].topId);
      const { songs } = res.data;
      if (songs.length === 0) return;
      setCurSongs([...curSongs, ...songs]);
      setCurPage(curPage + 1);
    })}>
      {/* 头部tab */}
      <header className="header-tab">
        {
          regionMap.map((item, index) => (
            <span
              key={item.topId}
              className={curTabIndex === index ? 'active' : ''}
              onClick={() => {
                setCurTabIndex(index);
                document.querySelector('.page-songsList')!.scrollTop = 0;
              }}>
              {item.text}
            </span>
          ))
        }
      </header>
      {/* 头部banner部分 */}
      <header className="header-banner" style={{ backgroundImage: `url(${regionMap[curTabIndex].bannerImg})` }}>
        <div className="title">{regionMap[curTabIndex].text}</div>
        <div className="subTitle">最/新/单/曲</div>
      </header>
      {/* 歌曲列表主体 */}
      <main className="list-main" style={{
        borderRadius: '16px',
        transform: 'translateY(-12px)',
        backgroundColor: '#fff',
      }}>
        <SongListHeader
          playType={'newSongs'}
          curSongs={curSongs}
          curListId={regionMap[curTabIndex].topId}
          total={total}
        />
        {
          curSongs.map((item, index) => (
            <SongListItem
              key={item.song_id}
              song={item}
              playType={'newSongs'}
              newQueueId={regionMap[curTabIndex].topId}
              songIndex={index}
            />
          ))
        }
      </main>
    </div>
  );
};
