import { useContext } from 'react';
import { iconModeOrderGrey, iconModeRandomGrey, iconModeSingleGrey } from '@icons/kugou';
import { KugouContext } from '@src/panels/KugouMusic/panel-default/app';
import { PlayModeKey } from '@src/panels/KugouMusic/panel-default/constants';

enum PlayModeType {
  Order = 0,
  Single = 1,
  Random = 2
}

export const usePlayMode = () => {
  const PlayMode = useContext(KugouContext).kugouState.deviceData[PlayModeKey];
  if (PlayMode === PlayModeType.Order) return ['顺序播放', iconModeOrderGrey];
  if (PlayMode === PlayModeType.Single) return ['单曲循环', iconModeSingleGrey];
  if (PlayMode === PlayModeType.Random) return ['随机播放', iconModeRandomGrey];
  return ['顺序播放', iconModeOrderGrey];
};
