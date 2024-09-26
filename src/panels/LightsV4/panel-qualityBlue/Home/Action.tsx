import React, { useState, useRef } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';
import { CountDown } from '../../Common/CountDown';
import { t } from '@locales';


const Action = (props) => {
  const {
    deviceData: { power_switch, count_down, work_mode = 'white' },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
  } = { ...props };
  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };

  const countRef = useRef(null);
  const isSwitchOff = power_switch !== 1;
  const actionCls = isSwitchOff ? 'action-off' : '';

  const [modeVisible, setModeVisible] = useState(false);
  const [selected, setSelected] = useState(0);

  const actions = [
    [
      t('定时'),
      isSwitchOff ? 'timing' : 'timing-checked',
      !!count_down ? push.bind(null, PATH.TIMER_COUNTDOWNPAGE, { value: count_down }) : () => { countRef.current.onOpen() },
      isExistTimer,
    ],
    [
      t('开关'),
      power_switch ? 'switch-checked' : 'switch',
      onSwitchChange,
      !!power_switch,
    ],
    [
      t('模式选择'),
      power_switch ? 'mode-checked' : 'mode',
      () => { setModeVisible(true) },
      !!power_switch
    ]
    // [
    //   '定时',
    //   isSwitchOff ? 'timing' : 'timing-checked',
    //   push.bind(null, PATH.TIMER_COUNTDOWN, { isModule: true }),
    //   isExistTimer,
    // ],
  ];
  const modeList = [
    [t('白光'), 0, 'white'],
    [t('彩光'), 1, 'colour'],
    [t('场景'), 2, 'scene'],
  ];

  const onRadioClick = (value) => {
    // let data = [...modeCache];
    // data[selected].value = value;
    // setModeCache(data);
    setSelected(value);
  };

  return (
    <>
      <div className={`action action-off`}>
        {actions.map(([label, name, onClick, isChecked], index) => (
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
      </div>
      <div className='custom-modal'>
        <Modal
          visible={modeVisible}
        >
          <div className="modal-title">
            <div className="title">{t('模式')}</div>
          </div>
          <div className="custom-radio">
            {modeList.map(([name, index, value]) => (
              <label
                className="radio-item"
                htmlFor={`label-${value}`}
                key={index}
                onClick={() => {
                  onRadioClick(index);
                }}>
                <input
                  className="radio-item-radio"
                  type="radio"
                  id={`label-${value}`}
                  name="mode"
                  checked={modeList[selected][2] === value}
                />
                <span className="radio-item-label">{name}</span>
              </label>
            ))}
          </div>

          <div className='modal-footer'>
            <BtnGroup
              layout='flex'
            >
              <Button
                className="btn-cancel"
                onClick={() => {
                  setModeVisible(false);
                  modeList.forEach(([name, index, value]) => {
                    if (value === work_mode) {
                      setSelected(index)
                    }
                  })
                  doControlDeviceData({ work_mode: work_mode });
                }}
              >
                {t('取消')}
              </Button>
              <Button
                className="btn-save"
                onClick={() => {
                  // if (!isSwitchOff) {
                  //   setModeVisible(false);
                  //   doControlDeviceData({ work_mode: modeList[selected][2] });
                  // }
                  setModeVisible(false);
                  doControlDeviceData({ work_mode: modeList[selected][2] });
                }}
              >
                {t('确定')}
              </Button>

            </BtnGroup>
          </div>

        </Modal>
        <CountDown
          ref={countRef}
          {...props}
          isModal={true}
          isPopUp={false}
        />
      </div>
    </>
  );
};

export default Action;
