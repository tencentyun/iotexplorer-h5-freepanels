import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import './KugouIndex.less';
import { iconMusicPlayer } from '@icons/kugou';
import { RecommendDaily } from '@src/panels/KugouMusic/panel-default/KugouIndex/RecommendDailyPanel/RecommendDaily';
import { PlaylistPanel } from '@src/panels/KugouMusic/panel-default/KugouIndex/PlaylistPanel/PlaylistPanel';
import { AlbumPanel } from '@src/panels/KugouMusic/panel-default/KugouIndex/AlbumPanel/AlbumPanel';
import { DeviceInfo } from '@src/panels/KugouMusic/panel-default/KugouIndex/DeviceInfo/DeviceInfo';
import { LoginPanel } from '@src/panels/KugouMusic/panel-default/KugouIndex/LoginPanel/LoginPanel';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';

export const KugouIndex = () => {
  const history = useHistory();
  const { currentTab, setCurrentTab } = useContext(KugouContext);

  function MusicPlayerIcon() {
    return (
      <div onClick={() => {
        history.push('/musicPlayer');
      }}>
        <img className="iconMusicPlayer" src={iconMusicPlayer} alt=""/>
      </div>
    );
  }

  const renderView = () => {
    switch (currentTab) {
      case 'DevicePanel':
        return <DeviceInfo/>;
      case 'LoginPanel':
        return <LoginPanel/>;
      case 'RecommendDaily':
        return <RecommendDaily/>;
      case 'AlbumPanel':
        return <AlbumPanel/>;
      case 'PlaylistPanel':
        return <PlaylistPanel/>;
    }
  };

  const TabBar = () => {
    const tabList = [
      { text: '设备', path: 'DevicePanel' },
      { text: '登录', path: 'LoginPanel' },
      { text: '日推', path: 'RecommendDaily' },
      { text: '专辑', path: 'AlbumPanel' },
      { text: '歌单', path: 'PlaylistPanel' },
    ];
    return (
      <div className="tabBar">
        {
          tabList.map(item => (
            <span
              className="link"
              key={item.path}
              onClick={() => {
                setCurrentTab(item.path);
              }}
            >
              {item.text}
            </span>
          ))
        }
      </div>
    );
  };

  return (
    <div className="kugou-index">
      {renderView()}
      <TabBar/>
      <MusicPlayerIcon/>
    </div>
  );
};
