import React, { useMemo } from 'react';
import './SceneTab.less';
import { TabProps } from '../../Panel';
import { SceneSlider, SceneSliderOption } from './SceneSlider';
import { SceneId } from '../../constants';

/**
 * 0 - 工作
 * 1 - 阅读
 * 2 - 睡眠
 * 3 - 休闲
 * 4 - 柔和
 */
const SceneBgMap = {
  0: 'https://main.qcloudimg.com/raw/c66eba8032cacf2d933b08fcd61567f6/work.jpg',
  1: 'https://main.qcloudimg.com/raw/ef5ca4d29e8fa7427235ceb1f63e4bda/read.jpg',
  2: 'https://main.qcloudimg.com/raw/a5c8294883b32dc59ee0c4f047bbb512/sleep.jpg',
  3: 'https://main.qcloudimg.com/raw/a814365fba575ed498e09b7e8b1c9f08/relax.jpg',
  4: 'https://main.qcloudimg.com/raw/37e71ba7f674439d09d36cf7a0a6780b/soft.jpg',
};

export function SceneTab({
  templateMap,
  deviceData,
  doControlDeviceData,
}: TabProps) {
  const sceneOptions = useMemo<SceneSliderOption[]>(() => {
    const { define } = templateMap[SceneId];

    return Object.keys(define.mapping).map(key => ({
      text: define.mapping[key],
      value: Number(key),
      image: SceneBgMap[key],
    }));
  }, [templateMap[SceneId]]);

  return (
    <div className='scene-tab light-panel-tab'>
      <SceneSlider
        options={sceneOptions}
        value={deviceData[SceneId]}
        onChange={value => doControlDeviceData(SceneId, value)}
      />
    </div>
  );
}
