import React, { useContext } from 'react';
import { useSyncPlayQueueAndSong } from '@src/panels/KugouMusic/panel-default/hooks/useSyncPlayQueueAndSong';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';
import { useHistory } from 'react-router-dom';
import { usePlayMode } from '@src/panels/KugouMusic/panel-default/hooks/usePlayMode';
import { controlDevice, controlPlayMode } from '@src/models/kugou';
import { PlayModeKey } from '@src/panels/KugouMusic/panel-default/constants';
import { iconPlayAll } from '@icons/kugou';

interface Props {
  curSongs: Song[];
  curListId: number | string;
  total: number;
  playType: 'album' | 'playlist' | 'newSongs' | 'recommendDaily' | 'curPlayQueue';
}

export const SongListHeader = ({ playType, curSongs, curListId, total }: Props) => {
  const { kugouState, dispatch } = useContext(KugouContext);
  const history = useHistory();
  const [playModeText, playModeIcon] = usePlayMode();

  const { deviceData } = kugouState;
  const PlayMode = deviceData[PlayModeKey];

  // 切换播放模式
  const handleTogglePlayMode = () => {
    let next_play_mode;
    if (PlayMode === 2) {
      next_play_mode = 0;
    } else {
      next_play_mode = PlayMode + 1;
    }
    controlDevice(controlPlayMode, next_play_mode);
  };

  return (
    <header className="list-main-header">
      <div className="left" onClick={async () => {
        // 找到第一个能播放的歌曲
        const songIndex = curSongs.findIndex(item => item.playable_code === 0);
        const song = curSongs[songIndex];
        useSyncPlayQueueAndSong(playType, curListId, song, songIndex, kugouState, dispatch).then(() => {
          history.push('/musicPlayer');
        });
      }}>
        <img className="iconPlayAll" src={iconPlayAll}/>
        <span>全部播放 （{total}）</span>
      </div>
      <div className="right" onClick={handleTogglePlayMode}>
        <img className="icon-playMode" src={playModeIcon}/>
        <span>{playModeText}</span>
      </div>
    </header>
  );
};
