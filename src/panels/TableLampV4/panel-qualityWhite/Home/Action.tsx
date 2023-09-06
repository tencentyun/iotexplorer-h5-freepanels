import React, { useEffect, useRef, useState } from 'react';
import { Icon } from '@custom/Icon';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions } from '@utils';
import { Cell } from '@custom/Cell';
import { CountDown, CountDownRef } from '../../Common/CountDown';

const MODE_LIST = ['关闭', '自拍补光', '无极调光', '美妆补光'];

const Action = (props) => {
  const {
    templateMap,
    deviceData: { power_switch, working_mode },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
    setCountDown,
  } = props;
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(1);

  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };

  const countRef = useRef<CountDownRef>(null);
  const modeList = getOptions(templateMap, 'working_mode');

  useEffect(() => {
    setModeValue(modeList[working_mode - 1 || 0].value as number);
  }, [working_mode]);

  const actions = [
    {
      label: '定时',
      name: 'time',
      onClick: () => {
        if (power_switch) {
          push(PATH.TIMER_LIST, { isModule: true });
        }
      },
      isChecked: isExistTimer,
    },
    {
      label: '开关',
      name: 'switch',
      onClick: onSwitchChange,
      isChecked: !!power_switch,
    },
    {
      label: '倒计时',
      name: 'countdown',
      onClick: () => {
        if (power_switch) {
          countRef.current?.onOpen();
        }
      },
      isChecked: !!power_switch,
    },
  ];

  const sceneData = [
    { groupName: '场景按键1', groupKey: 'key1' },
    { groupName: '场景按键2', groupKey: 'key2' },
    { groupName: '场景按键3', groupKey: 'key3' },
    { groupName: '场景按键4', groupKey: 'key4' },
  ];

  const goScenePage = () => {
    if (power_switch) {
      push(PATH.SCENE_SETTING);
    }
  };

  return (
    <>
      <div className={'action action-off'}>
        {actions.map(({ label, name, onClick }, index) => (
          <div
            key={index}
            className={`action-item  action-item-${index + 1}`}
            onClick={onClick}
          >
            <div className={`action-ele action-ele-${index}`}>
              <Icon name={name} />
              <div>{label}</div>
            </div>
          </div>
        ))}
        <Cell
          className='cell-settings mode-btn-settings'
          title='补光模式'
          isLink={true}
          prefixIcon={<Icon name='mode' />}
          onClick={() => {
            power_switch && setModeVisible(true);
          }}
          subTitle={MODE_LIST[working_mode - 1 || 0]}
        >
          <OptionDialog
            visible={modeVisible}
            title='模式'
            value={[modeValue]}
            options={modeList}
            onCancel={() => {
              setModeVisible(false);
            }}
            onConfirm={(value) => {
              setModeValue(value[0]);
              doControlDeviceData('working_mode', parseInt(value[0]));
            }}
          />
        </Cell>
        <CountDown
          ref={countRef}
          {...props}
          onChange={(count_down) => {
            setCountDown && setCountDown(count_down);
          }}
        />

        <div className='scene-panel'>
          {sceneData.map((item, index) => (
            <div
              key={index}
              onClick={goScenePage}
              className={`scene-item item-${index}`}
            >
              {item?.groupName || ''}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Action;
