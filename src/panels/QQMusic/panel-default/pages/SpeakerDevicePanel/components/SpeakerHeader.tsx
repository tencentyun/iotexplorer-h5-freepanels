import React, { useContext, useState } from 'react';
import { Slider } from 'antd-mobile';
import classNames from 'classnames';
import { deviceGetVolume, deviceSetVolume } from '../../../deviceController';
import { MusicPlayerContext } from '../../../context';

import './SpeakerHeader.less';

function BatteryView({
  percent,
}: {
  percent: number;
}) {
  return (
    <svg width="18" height="10" viewBox="0 0 18 10" fill="none">
      <rect opacity="0.3" x="0.4" y="0.4" width="15.2" height="9.2" rx="0.6" stroke="#132847" strokeWidth="0.8" />
      <rect opacity="0.75" x="1.5" y="1.5" width={13 * Math.max(0, Math.min(100, percent)) / 100} height="7" rx="1" fill="#132847" />
      <path opacity="0.3" fillRule="evenodd" clipRule="evenodd" d="M16.5 6.937V3.06302C17.3626 3.28504 18 4.06809 18 5.00001C18 5.93193 17.3626 6.71498 16.5 6.937Z" fill="#132847" />
    </svg>
  );
}

function SpeakerHeaderBtn({
  icon,
  onClick,
}: {
  icon: 'voice-skill' | 'more';
  onClick?: () => void;
}) {
  return (
    <div className="speaker-header__btn" onClick={onClick}>
      <div className={classNames('speaker-header__btn-icon', `speaker-header__btn-icon--${icon}`)} />
    </div>
  );
}

export function SpeakerHeader() {
  const [tempVolume, setTempVolume] = useState<number | null>(null);
  const { deviceState: { deviceData } } = useContext(MusicPlayerContext);

  const volume = deviceGetVolume(deviceData);
  const setVolume = (volume: number) => {
    deviceSetVolume(volume);
  };

  const batteryPercent = 80;
  
  return (
    <div className="speaker-header">
      <div className="speaker-header__row-1">
        <div className="speaker-header__icon">
          <img
            src="https://iot.gtimg.com/cdn/ad/7ab43613493c80711d6687f525f95c54/music-speaker-icon-168x198+1709622181375.png"
            className="speaker-header__icon-img"
          />
        </div>
        <div className="speaker-header__info">
          <div>
            <span className="speaker-header__battery-container">
              <BatteryView percent={batteryPercent} />
              {' '}
              {batteryPercent}%
            </span>
          </div>
          <div className="speaker-header__btn-container">
            <SpeakerHeaderBtn icon="voice-skill" />
            <SpeakerHeaderBtn icon="more" />
          </div>
        </div>
      </div>
      <div className="speaker-header-volume">
        <div className="speaker-header-volume__aside">
          <i className="speaker-header-volume__mute-icon" />
        </div>
        <div className="speaker-header-volume__control">
          <Slider
            step={1}
            min={0}
            max={100}
            value={tempVolume !== null ? tempVolume : volume}
            onChange={(value) => {
              setTempVolume(value as number);
            }}
            onAfterChange={(value) => {
              setTempVolume(null);
              setVolume(value as number);
            }}
            popover
          />
        </div>
        <div className="speaker-header-volume__aside">
          <i className="speaker-header-volume__volume-icon" />
        </div>
      </div>
    </div>
  );
}
