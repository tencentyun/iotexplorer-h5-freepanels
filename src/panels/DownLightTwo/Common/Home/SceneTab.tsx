import { useValidatedState } from 'beautiful-react-hooks';
import React, { useMemo, useState } from 'react';
import { SceneSlider } from './SceneSlider';

/**
 * 0 - 工作
 * 1 - 阅读
 * 2 - 睡眠
 * 3 - 休闲
 * 4 - 柔和
 * 5 - 斑斓
 * 6 - 缤纷
 *
 */
const SceneBgMap = [
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fwork.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fread.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsleep.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Frelax.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsoft.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fbeautiful.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Friotous.png',
];

export function SceneTab({ templateMap, deviceData, doControlDeviceData }) {
  // const sceneOptions = useMemo<SceneSliderOption[]>(() => {
  //   // const { define: any } = {
  //   const mapping = { 0: 'night', 1: 'read' };
  //   // };

  //   return Object.keys(mapping).map(key => ({
  //     text: mapping[key],
  //     value: Number(key),
  //     image: SceneBgMap[key],
  //   }));
  // }, [templateMap.scene]);
  const [value, setValue] = useState(3);

  return (
    <div className="scene-tab light-panel-tab">
      <SceneSlider
        options={SceneBgMap}
        value={value}
        onChange={(value) => {
          console.log('外部值的变化:', value);
          setValue(value);
        }}
      />
    </div>
  );
}
