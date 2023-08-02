import React from 'react';
import { useTitle } from '@hooks/useTitle';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Alarm(props) {
  const { deviceData: { alram_voice_tips }, doControlDeviceData } = props;
  const RING_LIST = [
    // { label: '门铃声', value: 0 },
    { label: '警报声', value: 1 },
    { label: '防盗告警', value: 2 },
    { label: '燃气报警', value: 3 },
    { label: '水浸报警', value: 4 },
    { label: '烟雾报警', value: 5 },
    { label: '紧急SOS', value: 6 }];

  useTitle('安防告警');
  // const [radioData, setRadioData] = useState(0);

  // useEffect(() => {})
  const onRadioClick = (value) => {
    // setRadioData(value);
    doControlDeviceData('alram_voice_tips', value);
  };
  return (
    <div className='alarm-scene'>
      <div className='banner'>
        点击试听各报警提示音后，可前往创建您想要的安防报警场景
        比如当烟雾告警开启，自动播放烟雾报警铃声
      </div>
      <div className='ring-list'>
        <div className='title'>警报声试听</div>
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
                  checked={(alram_voice_tips || 1) === value}
                />
                <span className='radio-item-label'>{label}</span>
              </label>
            ))}
          </div>

        </div>
      </div>
      {/* <div className="scene-list">
        <div className="title">已创建场景</div>
        <div className="list">
          <SceneList {...props} sdk={sdk} />
        </div>
      </div> */}
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
                TemplateId: 'alarm_voice',
                TemplateValue: alram_voice_tips || 0,
              },
            ],
            freezeAction: true,
          },
        })}
      >
        创建安防场景
      </div>
    </div>
  );
}

