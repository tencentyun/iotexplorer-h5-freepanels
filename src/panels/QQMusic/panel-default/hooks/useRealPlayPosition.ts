import { useEffect, useState } from 'react';
import { DeviceDataState } from '../../../../hooks/useDeviceData';
import { deviceGetPausePlay, deviceGetPlayPosition, PlayStatus } from '../deviceController';

const MAX_DELTA_LIMIT = 15;

// 定时更新实际播放进度
export const useRealPlayPosition = (
  deviceState: DeviceDataState
) => {
  const calcPlayPosition = (): number | null => {
    const { deviceData, deviceDataLastUpdate } = deviceState;

    const playStatus = deviceGetPausePlay(deviceData);
    const playPosition = deviceGetPlayPosition(deviceData);
    const playPositionLastUpdate = deviceDataLastUpdate._sys_play_position as number;
    const playStatusLastUpdate = deviceDataLastUpdate._sys_pause_play as number;

    // 限制播放进度为非负数
    const positiveLimit = (value: number) => value < 0 ? 0 : value;
    // 设备定期上报播放进度，前端在一定时间内（略大于上报间隔）推算实际播放进度的偏移量
    const deltaLimit = (value: number) => value > MAX_DELTA_LIMIT ? MAX_DELTA_LIMIT : value;

    if (!playPositionLastUpdate) {
      return null;
    }

    if (playStatus !== PlayStatus.Play) {
      if (playStatusLastUpdate && playPositionLastUpdate >= playStatusLastUpdate) {
        return positiveLimit(playPosition);
      } else {
        return positiveLimit(playPosition + deltaLimit(Math.floor((playStatusLastUpdate - playPositionLastUpdate) / 1000) - 1));
      }
    }

    return positiveLimit(playPosition + deltaLimit(Math.floor((Date.now() - playPositionLastUpdate) / 1000)));
  };

  const [realPlayPosition, setRealPlayPosition] = useState(calcPlayPosition);

  useEffect(() => {
    const timer = setInterval(() => {
      setRealPlayPosition(calcPlayPosition());
    }, 1000);

    return () => clearInterval(timer);
  }, [deviceState.deviceData._sys_play_position, deviceState.deviceDataLastUpdate._sys_play_position]);

  return realPlayPosition;
};
