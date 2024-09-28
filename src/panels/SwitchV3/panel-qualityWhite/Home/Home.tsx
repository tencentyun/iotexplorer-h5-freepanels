import React, { useEffect, useRef } from 'react';
import { LightSwitch } from '../../Common/Home/LightSwitch';
import { Detail } from './Detail';
import { useSwitchNameMap } from '@src/panels/SwitchV3/hooks/useSwitchNameMap';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^button/.test(v)).length || 1;


export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {} } = props;
  console.log('templateMap',templateMap)
  const isEightSwitch = Object.keys(templateMap).includes('switch_type_8')
  const allSwitch = [
    ['switch_1', deviceData.name_button1 || '开关一'],
    ['switch_2', deviceData.name_button2 || '开关二'],
    ['switch_3', deviceData.name_button3 || '开关三'],
    ['switch_4', deviceData.name_button4 || '开关四'],
    ['switch_5', deviceData.name_button5 || '开关五'],
  ];

  const switchNum = getSwitchNum(templateMap);
  console.log('switchNum',switchNum)
  const currentSwitch = allSwitch.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);

  useEffect(() => {
    setContext({ switchNum });
  }, []);

  const { data: switchNameMap = {} } = useSwitchNameMap({ switchNum, sdk: props.sdk });

  const Label = ({ name }) => {
    const time = deviceData?.[name];
    if (time) {
      const hour = `${Math.floor(time / 3600)}`;
      const minute = `${Math.floor((time % 3600) / 60)}`;
      return <div>
        <div>
          <span>{hour}</span>
          h
          <span>{minute}</span>
          min
        </div>
        <div>
          后关闭
        </div>
      </div>;
    }
    return <></>;
  };

  const detailRef = useRef(null);


  return (
    <div className='home'>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '16px 24px',
      }}>
        {/* @ts-ignore */}
        <div style={{ display: 'flex', alignItems: 'center' }} onClick={() => detailRef.current.editName()}>
          <Icon className='operator-icon' name='editor' size='large' />
        </div>
        <div
          className={'cus-dev-detail switchv3'}
          onClick={() => sdk.goDeviceDetailPage()}
        >
          <Icon name='dev-detail' className='dev-more' />
        </div>
      </div>
      <div className={`dashboard switch-${switchNum}`}>
        {currentSwitch.map(([key], index) => (
          <LightSwitch
            key={key}
            hasCount={false}
            name={switchNameMap[`switch_${index + 1}`]}
            count={<Label name={`count_down${index + 1}`}></Label>}
            value={!!deviceData[key]}
            className={`light-switch-${index + 1}`}
            onChange={v => onChange(key, v)}
          />
        ))}
      </div>
      <Detail ref={detailRef} {...props} currentSwitch={currentSwitch} switchNum={switchNum} isEightSwitch={isEightSwitch}/>
    </div>
  );
}