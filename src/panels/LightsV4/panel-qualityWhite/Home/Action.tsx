import React, { useRef, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { Modal } from '@custom/Modal';
import { Btn as Button, BtnGroup } from '@custom/Btn';
import { CountDown } from '../../Common/CountDown';
import { CellBtn } from '@components/Btn/CellBtn';
import { t } from '@locales';


const Action = (props) => {
  const {
    deviceData: {
      power_switch,
      color_mode,
    },
    history: { PATH, push },
    timer: { isExistTimer },
    doControlDeviceData,
    templateMap,
    getLocal,
    utils,
    setLocal,
    sdk,
    work_mode,
  } = props;
  const onSwitchChange = () => {
    doControlDeviceData({ power_switch: power_switch ? 0 : 1 });
  };

  // 筒灯和射灯只有两种模式的选择 单色和双色 而 REG有三色模式
  // 通过物模型的配置个数进行辨识
  const COLOR_MODULE = utils.getOptionsArray(templateMap, 'color_mode');

  const countRef = useRef(null);
  const isSwitchOff = power_switch !== 1;

  // 是否支持模式选择
  const isSupportColorMode = !!templateMap?.color_mode;

  // 第一次进入页面弹出模式选择框
  const localKey = 'isEnterd';
  const isFirstEnter = getLocal(localKey) == void 0;
  const [modeVisible, setModeVisible] = useState(isSupportColorMode && isFirstEnter);


  const [selected, setSelected] = useState(0);

  const actions = [
    [
      t('定时'),

      isSwitchOff ? 'timing' : 'timing-checked',
      () => sdk.goTimingProjectPage(),
      // push.bind(null, PATH.TIMER_LIST, { isModule: true }),
      isExistTimer,
    ],
    [
      t('开关'),
      power_switch ? 'switch-checked' : 'switch',
      onSwitchChange,
      !!power_switch,
    ],
    [
      t('更多'),
      'timmer',
      push.bind(null, PATH.MORE_SETTING, { isModule: true }),
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
      {work_mode != 10 && (
        <div className={'action action-off'}>
          {actions.map(([label, name, onClick], index) => (
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
      )}
      <div className='custom-modal'>
        <Modal
          visible={modeVisible}
        >
          <div className='modal-title'>
            <div className='title'>{t('模式')}</div>
            <div className='second-title'>{t('请根据您的实际使用场景，选择合适的控制场景')}</div>
          </div>
          <div className='custom-radio'>
            {COLOR_MODULE.map(([name, key]) => (
              <label
                className='radio-item'
                htmlFor={`label-${key}`}
                key={key}
                onClick={() => {
                  onRadioClick(key);
                }}>
                <input
                  className='radio-item-radio'
                  type='radio'
                  id={`label-${key}`}
                  name='mode'
                  checked={selected == key}
                />
                <span className='radio-item-label'>{name}</span>
              </label>
            ))}
          </div>

          <div className='modal-footer'>
            <BtnGroup
              layout='flex'
            >
              <Button
                className='btn-cancel'
                onClick={() => {
                  setLocal(localKey, true);
                  setModeVisible(false);
                }}
              >
                {t('取消')}
              </Button>
              <Button
                className='btn-save'
                onClick={() => {
                  setModeVisible(false);
                  setLocal(localKey, true);
                  doControlDeviceData({ color_mode: selected });
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
      {/* // 不存在物模型的配置时 不显示模式选择 */}

      <CellBtn
        onClick={() => {
          sdk.goScenePage({ sceneType: 'default' });
        }}>
         {t('智能场景')}
      </CellBtn>
      {/* {*/}
      {/*  isSupportColorMode*/}
      {/*    ? <div className='module-check'>*/}
      {/*      <Cell prefixIcon={<Icon name='mode-checked' />} value={COLOR_MODULE[color_mode]?.[0] || ''}*/}
      {/*            onClick={() => {*/}
      {/*              setSelected(color_mode);*/}
      {/*              setModeVisible(true);*/}
      {/*            }} title='模式选择'></Cell>*/}
      {/*    </div>*/}
      {/*    : null*/}
      {/* }*/}
    </>
  );
};

export default Action;
