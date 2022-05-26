import React, { useState } from 'react';
import classNames from 'classnames';
import { SceneSlider } from './SceneSlider';

/**
 * 0 - 工作
 * 1 - 阅读
 * 2 - 睡眠
 * 3 - 休闲
 * 4 - 柔和
 * 5 - 斑斓
 * 6 - 缤纷
 * 7 - 炫彩
 */
const SceneBgMap = [
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fwork.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fread.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsleep.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Frelax.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsoft.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fbeautiful.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Friotous.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fcolorful.png',
];

const SceneNameMap = ['工作', '阅读', '睡眠', '休闲', '柔和', '斑斓', '缤纷', '炫彩'];

export function SceneTab({ deviceData, doControlDeviceData }) {
  const [value, setValue] = useState(deviceData.scene || 3);

  return (
    <div className={classNames('scene-tab', deviceData.power_switch !== 1 ?  'off-scene' : '')}>
      <SceneSlider
        options={SceneBgMap}
        optionsName={SceneNameMap}
        value={value}
        onChange={(value) => {
          console.log('外部值的变化:', value);
          setValue(value);
          doControlDeviceData('scene', value);
        }}
      />
    </div>
  );
}
