import React, { useContext } from 'react';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';
import { Icon } from '@custom/Icon';
import '../../panel-qualityWhite/MusicPlayer/MusicPlayer.less'
import {
    controlDevice,
    controlPause,
    controlPlay,
    controlPlayNext,
    controlPlayPre,
  } from '@src/models/kugou';

enum PlayStatus {
    Pause = 0,
    Play = 1
  }

export function MusicPlayer({ deviceData }) {
    const PausePlay = deviceData['_sys_pause_play'] || 0;
  /**
   * 播控按钮Icon切换
   */
  const getPlayStatusIcon = () => {
    if (PausePlay === PlayStatus.Play) return 'iconPlay';
    if (PausePlay === PlayStatus.Pause) return 'iconPause';
  };

  // 播放暂停
  const handleClickPlay = () => {
    if (PausePlay === PlayStatus.Play) controlDevice(controlPause);
    if (PausePlay === PlayStatus.Pause) controlDevice(controlPlay);
  };

  // 上一首下一首
  const handleClickPreOrNext = (type: 'pre' | 'next') => {
    if (type === 'pre') controlDevice(controlPlayPre);
    if (type === 'next') controlDevice(controlPlayNext);
  };

  return (
    <div className="music-player">
      <div className="song-info">
        <h2>正在播放：笨⼩孩-刘德华{}</h2>
      </div>
      {/* 底部播控 */}
      <div className="bottom-control">
        <Icon className='iconPre' onClick={() => handleClickPreOrNext('pre')}></Icon> 
        <Icon className={getPlayStatusIcon()} onClick={() => handleClickPlay}></Icon> 
        <Icon className='iconNext' onClick={() => handleClickPreOrNext('next')}></Icon> 
      </div>
    </div>
  );
};
