import React, { useEffect, useState } from 'react';
import './SongsPage.less';
import { useDocumentTitle } from '@src/panels/KugouMusic/panel-default/hooks/useDocumentTitle';
import { getNewSongs } from '@src/models/kugou';
import { SongListItem } from '@src/panels/KugouMusic/panel-default/components/SongListItem/SongListItem';
import { usePlayMode } from '@src/panels/KugouMusic/panel-default/hooks/usePlayMode';

const regionMap = [
  { text: '华语', topId: 1 },
  { text: '欧美', topId: 2 },
  { text: '日韩', topId: 3 },
];

export const NewSongsPage = () => {
  useDocumentTitle('新歌首发');
  const [curTabIndex, setCurTabIndex] = useState(0);
  const [total, setTotal] = useState(0);
  const [curSongs, setCurSongs] = useState<Song[]>([]);
  const [playModeText, playModeIcon] = usePlayMode();

  useEffect(() => {
    getNewSongs(1, 20, regionMap[curTabIndex].topId).then(res => {
      const { total, songs } = res.data;
      setCurSongs(songs);
      setTotal(total);
    });
  }, [curTabIndex]);

  return (
    <div className="page-musicList">
      {/* 头部tab */}
      <header className="header-tab">
        {
          regionMap.map((item, index) => (
            <span
              key={item.topId}
              className={curTabIndex === index ? 'active' : ''}
              onClick={() => {
                console.log('切换歌单');
                setCurTabIndex(index);
              }}>
              {item.text}
            </span>
          ))
        }
      </header>
      {/* 歌曲列表主体 */}
      <main className="list-main">
        <header className="list-main-header">
          <div className="left">
            <div className="circle"/>
            <span>全部播放 （{total}）</span>
          </div>
          <div className="right">
            <img className="icon-playMode" src={playModeIcon}/>
            <span>{playModeText}</span>
          </div>
        </header>
        {
          curSongs.map(item => (
            <SongListItem
              key={item.song_id}
              song={item}
              queueType={'newSongs'}
              newQueueId={regionMap[curTabIndex].topId}
              curSongs={curSongs}
            />
          ))
        }
      </main>
    </div>
  );
};
