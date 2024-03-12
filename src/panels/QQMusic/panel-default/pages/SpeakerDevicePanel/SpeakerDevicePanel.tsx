import React from 'react';
import { useHistory } from 'react-router-dom';
import { DeviceDataState } from '../../../../../hooks/useDeviceData';
import { SpeakerHeader } from './components/SpeakerHeader';
import { SpeakerMusic } from './components/SpeakerMusic';
import { CurrentPlaying } from './components/CurrentPlaying';
import { CurrentPlayList } from './components/CurrentPlayList';
import './SpeakerDevicePanel.less';

export function SpeakerDevicePanel({
  deviceState,
  showPlayList = false,
}: {
  deviceState: DeviceDataState;
  showPlayList?: boolean;
}) {
  const history = useHistory();

  const handleOpenPlayList = () => {
    history.push('/playing/playlist');
  };

  return (
    <div className="speaker-device-panel">
      <SpeakerHeader />
      <SpeakerMusic />
      <CurrentPlaying onOpenPlayList={handleOpenPlayList} />
      <CurrentPlayList visible={showPlayList} onClose={() => { history.go(-1) }} />
    </div>
  );
}
