import React, { useState, useRef } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';
import { CountDown } from '../../Common/CountDown';

const Action = (props) => {
  const {
    deviceData: {
      power_switch,
      count_down,
      color_mode
    },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
    templateMap,
    getLocal,
    utils,
    setLocal
  } = { ...props };
  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };

  // 筒灯和射灯只有两种模式的选择 单色和双色 而 REG有三色模式
  // 通过物模型的配置个数进行辨识
  let COLOR_MODULE = utils.getOptionsArray(templateMap, 'color_mode');

  const countRef = useRef(null);
  const isSwitchOff = power_switch !== 1;

  // 是否支持模式选择
  const isSupportColorMode = !!templateMap?.color_mode;

  // 第一次进入页面弹出模式选择框
  let localKey = 'isEnterd';
  let isFirstEnter = getLocal(localKey) == void 0 ? true : false;
  const [modeVisible, setModeVisible] = useState(isSupportColorMode && isFirstEnter);



  const [selected, setSelected] = useState(0);

  const actions = [
    [
      '定时',

      isSwitchOff ? 'timing' : 'timing-checked',
      push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
    ],
    [
      '开关',
      power_switch ? 'switch-checked' : 'switch',
      onSwitchChange,
      !!power_switch,
    ],
    [
      '倒计时',
      isSwitchOff ? 'timmer' : 'timmer',
      !!count_down ? push.bind(null, PATH.TIMER_COUNTDOWNPAGE, { value: count_down }) : () => { countRef.current.onOpen() },
      isExistTimer,
    ],
    // [
    //   '定时',
    //   isSwitchOff ? 'timing' : 'timing-checked',
    //   push.bind(null, PATH.TIMER_COUNTDOWN, { isModule: true }),
    //   isExistTimer,
    // ],
  ];


  const onRadioClick = (value) => {
    setSelected(1 * value);
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
            <div className="title">模式</div>
            <div className="second-title">请根据您的实际使用场景，选择合适的控制场景</div>
          </div>
          <div className="custom-radio">
            {COLOR_MODULE.map(([name, key, value]) => (
              <label
                className="radio-item"
                htmlFor={`label-${key}`}
                key={key}
                onClick={() => {
                  onRadioClick(key);
                }}>
                <input
                  className="radio-item-radio"
                  type="radio"
                  id={`label-${key}`}
                  name="mode"
                  checked={selected == key}
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
                  setLocal(localKey, true);
                  setModeVisible(false);
                }}
              >
                取消
              </Button>
              <Button
                className="btn-save"
                onClick={() => {
                  setModeVisible(false);
                  setLocal(localKey, true);
                  doControlDeviceData({ color_mode: selected });
                }}
              >
                确定
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
      {/* // 不存在物模型的配置时 不显示模式选择 */}

      {
        isSupportColorMode ?
          <div className='module-check'>
            <Cell prefixIcon={<Icon name="mode-checked" />} value={COLOR_MODULE[color_mode]?.[0] || ''}
              onClick={() => {
                setSelected(color_mode)
                setModeVisible(true)
              }} title="模式选择"></Cell>
          </div>
          : null
      }
    </>
  );
};

export default Action;
