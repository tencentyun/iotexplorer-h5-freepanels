import React, { useContext } from 'react';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';
import { iconClose } from '@icons/kugou';
import './PlayFloatWindow.less';
import { useHistory } from 'react-router-dom';

export const PlayFloatWindow = () => {
  const { kugouState, setShowPlayFloat } = useContext(KugouContext);
  const { currentPlaySong: song } = kugouState;
  const history = useHistory();
  return (
    <div className="PlayFloatWindow">
      <img className="albumImg" src={song?.album_img_mini} onClick={() => {
        history.push('/musicPlayer');
      }}/>
      <div className="right">
        <img className="iconClose" src={iconClose} onClick={() => {
          setShowPlayFloat(false);
        }}/>
      </div>
    </div>
  );
};
