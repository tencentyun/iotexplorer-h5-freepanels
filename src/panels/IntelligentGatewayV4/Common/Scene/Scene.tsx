import React, { useState } from 'react';
import { Btn } from '@custom/Btn';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SceneList } from '@custom/Scene';

export function Scene(props) {
  const { templateMap = {}, history: { PATH, push }, doControlDeviceData } = { ...props };
  const RING_LIST = [{ label: '普通', value: 0 }, { label: '轻快', value: 1 }, { label: '古典', value: 2 }]
  useTitle('门铃场景')
  const [radioData, setRadioData] = useState(0);

  // useEffect(() => {})
  const onRadioClick = (value) => {
    setRadioData(value);
    doControlDeviceData('doorbell_tips', value)
  };
  return (
    <div className="ring-scene">
      <div className="banner">
        点击试听各报警提示音后，可前往创建您想要的门铃场景比如当门锁打开，自动播放轻快门铃声
      </div>
      <div className="ring-list">
        <div className="title">门铃</div>
        <div className="list">
          <div className="custom-radio">
            {RING_LIST.map(({ label, value }, index) => (
              <label
                className="radio-item"
                htmlFor={`label-${value}`}
                key={index}
                onClick={() => {
                  onRadioClick(value);
                }}>
                <input
                  className="radio-item-radio"
                  type="radio"
                  id={`label-${value}`}
                  name="mode"
                  checked={radioData === value}
                />
                <span className="radio-item-label">{label}</span>
              </label>
            ))}
          </div>

        </div>
      </div>
      <div className="scene-list">
        <div className="title">已创建场景</div>
        <div className="list">
          <SceneList {...props} sdk={sdk} />
        </div>
      </div>
      <div className="operator">
        <Btn onClick={() => sdk.goScenePage({ type: "auto" })}>创建门铃场景</Btn>
      </div>
    </div>
  );
}

