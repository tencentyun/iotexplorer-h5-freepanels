import React from 'react';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Scene(props) {
  const { deviceData: { doorbell }, doControlDeviceData } = props;
  const RING_LIST = [
    { label: '普通', value: 0 },
    { label: '轻快', value: 1 },
    { label: '古典', value: 2 },
  ];

  useTitle('门铃场景');

  const onRadioClick = (value) => {
    doControlDeviceData('doorbell', value);
  };

  return (
    <div className='ring-scene'>
      <div className='banner'>
        点击试听各报警提示音后，可前往创建您想要的门铃场景比如当门锁打开，自动播放轻快门铃声
      </div>
      <div className='ring-list'>
        <div className='title'>门铃</div>
        <div className='list'>
          <div className='custom-radio'>
            {RING_LIST.map(({ label, value }, index) => (
              <label
                className='radio-item'
                htmlFor={`label-${value}`}
                key={index}
                onClick={() => {
                  onRadioClick(value);
                }}>
                <input
                  className='radio-item-radio'
                  type='radio'
                  id={`label-${value}`}
                  name='mode'
                  checked={(doorbell || 0) == value}
                />
                <span className='radio-item-label'>{label}</span>
              </label>
            ))}
          </div>
        </div>
      </div>
      <div
        className='fexid-btn center'
        onClick={() => sdk.goScenePage({
          sceneType: 'auto',
          sceneOptions: {
            Actions: [
              {
                ActionType: 0,
                ProductId: sdk.productId,
                DeviceName: sdk.deviceName,
                TemplateId: 'doorbell',
                TemplateValue: doorbell || 0,
              },
            ],
            freezeAction: true,
          },
        })}
      >
        创建门铃场景
      </div>
    </div>
  );
}

