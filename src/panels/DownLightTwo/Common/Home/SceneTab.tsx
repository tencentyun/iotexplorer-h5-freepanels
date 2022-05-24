import React, { useMemo } from 'react';
import { SceneSlider, SceneSliderOption } from './SceneSlider';

/**
 * 0 - 工作
 * 1 - 阅读
 * 2 - 睡眠
 * 3 - 休闲
 * 4 - 柔和
 * 5 - 斑斓
 * 6 - 缤纷
 */
const SceneBgMap = {
  0: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fwork.png',
  1: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fread.png',
  2: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsleep.png',
  3: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Frelax.png',
  4: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsoft.png',
  5: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fbeautiful.png',
  6: 'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Friotous.png',
};

export function SceneTab({
  templateMap,
  deviceData,
  doControlDeviceData,
}) {
  const sceneOptions = useMemo<SceneSliderOption[]>(() => {
    // const { define: any } = {
    const mapping = { 0: 'night', 1: 'read' };
    // };

    return Object.keys(mapping).map(key => ({
      text: mapping[key],
      value: Number(key),
      image: SceneBgMap[key],
    }));
  }, [templateMap.scene]);

  return (
    <div className='scene-tab light-panel-tab'>
      <SceneSlider
        options={sceneOptions}
        value={deviceData.scene}
        onChange={value => doControlDeviceData('scene', value)}
      />
    </div>
  );
}
