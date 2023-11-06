import { h5PanelSdk } from '@src/panels-next/h5PanelSdk';
import { useRef } from 'react';

function getSwitchNum() {
  const num: number = h5PanelSdk.dataTemplate.properties
    .map(item => item.id)
    .filter(v => /^switch_\d$/.test(v)).length;
  return num || 1;
}

export function useSwitchNum() {
  const switchNum = useRef(getSwitchNum());
  return switchNum.current;
}
