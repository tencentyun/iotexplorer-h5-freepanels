import React, { useState } from 'react';
import classNames from 'classnames';
import { SceneSlider } from './SceneSlider';

/**
 * 0 - 晚安
 * 1 - 阅读
 * 2 - 工作
 * 3 - 休闲
 * 4 - 柔和
 * 5 - 缤纷
 * 6 - 炫彩
 * 7 - 斑斓
 */
const SceneBgMap = [
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsleep.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fread.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fwork.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Frelax.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fsoft.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fcolorful.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Fbeautiful.png',
  'https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/scene_bg_map%2Fscene%2Friotous.png',
];
// 晚安、阅读、工作、休闲、柔和、缤纷、炫彩、斑斓
const SceneNameMap = ['晚安', '阅读', '工作', '休闲', '柔和', '缤纷', '炫彩', '斑斓'];
const SceneValueMap = ['sleep', 'read', 'work', 'relax', 'soft', 'colorful', 'beautiful', 'riotous'];

const getIndex = (key) => {
  let index = 2;
  SceneValueMap.map((item, i) => {
    if (item === key) {
      index = i;
    }
  });
  return index + 1;
};

export function SceneTab({ deviceData, doControlDeviceData }) {
  const [value, setValue] = useState(getIndex(deviceData.scene_data));

  return (
    <div className={classNames('scene-tab', deviceData.switch_led !== 1 ?  'off-scene' : '')}>
      <SceneSlider
        options={SceneBgMap}
        optionsName={SceneNameMap}
        value={value}
        onChange={(value) => {
          console.log('外部值的变化:', value);
          setValue(value);
          doControlDeviceData('scene_data', SceneValueMap[value]);
        }}
      />
    </div>
  );
}
