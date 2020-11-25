import React, { useState, useEffect } from 'react';
import { RawBtn } from '@components/Btn';
import classNames from 'classnames';
import * as freePanelIcons from '@icons/device/freePanel';
import { noop, delay } from '@utillib';
import './FuncFooter.less';
import { CountdownSetting, second2HourMinute } from '../CountdownSetting';
import { useIpx } from "@hooks/useIpx";
import * as wxlib from '@wxlib';

export const getStatusStr = (powerOff: boolean): string => (!powerOff ? '开启' : '关闭');

export const getCountdownStr = (countdown: number, powerOff: boolean) => {
  const [hour, minute] = second2HourMinute(countdown);
  return `设备将在 ${hour}小时 ${minute}分 后${getStatusStr(!powerOff)}`;
};

export const getCountdownStrWithoutDevice = (countdown: number, powerOff: boolean) => {
  const [hour, minute] = second2HourMinute(countdown);
  return `${hour}小时${minute}分后${getStatusStr(!powerOff)}`;
};

export interface FuncFooterProps {
  offline?: boolean;
  powerOff?: boolean;
  countdown?: number;
  controlDeviceData: (id, value) => any;
  darkMode?: boolean;
  onGoTimingProject: () => any;
  onGoCountDown?: () => any;
  onSwitchChange?: () => any;
  onFreePanelFooterHeight?: (height) => any;
  isShareDevice?: boolean;
}

export interface FuncBtnConfig {
  text: string;
  icon?: string;
  actived?: boolean;
  btnClassName?: string;
  disabled?: boolean;
  onClick?: any;
}

/**
 * 按钮本身只有两种状态，actived不透明，默认带半透明
 *
 * 定时
 *
 * @param btnConfig
 * @constructor
 */
export function FuncFooter({
  offline,
  powerOff,
  controlDeviceData,
  countdown,
  darkMode,
  onGoTimingProject,
  onGoCountDown,
  onSwitchChange,
  onFreePanelFooterHeight = noop,
  isShareDevice,
}: FuncFooterProps) {
  const ipx = useIpx();
  const [countdownVisible, setCountdownVisible] = useState(false);

  const handleCountdownConfirm = async ({ enable, value }) => {
    if (!enable) {
      await controlDeviceData('count_down', 0);
    } else {
      await controlDeviceData('count_down', value);
    }

    setCountdownVisible(false);
  };

  const getBtnConfig = (): FuncBtnConfig[] => {
    const configMap: {
      timing: FuncBtnConfig;
      switch: FuncBtnConfig;
      countdown: FuncBtnConfig;
    } = {
      timing: {
        text: '定时',
        disabled: offline,
        btnClassName: isShareDevice ? 'disabled' : '',
        onClick: () => {
          if (isShareDevice) {
            wxlib.tips.showInfo('被分享者无权设置定时任务');
          } else {
            onGoTimingProject();
          }
        },
      },
      switch: {
        text: '开启',
        disabled: offline,
        onClick: onSwitchChange ? onSwitchChange : () => controlDeviceData('power_switch', powerOff ? 1 : 0),
      },
      countdown: {
        text: '倒计时',
        disabled: offline,
        onClick: onGoCountDown ? onGoCountDown : () => {
          setCountdownVisible(true);
        },
      },
    };

    if (darkMode) {
      if (!offline && !powerOff) {
        configMap.switch.actived = true;
      }
    } else {
      configMap.switch.actived = !offline;
    }

    if (!powerOff) {
      configMap.timing.icon = freePanelIcons.iconTiming;
      configMap.switch.icon = darkMode ? freePanelIcons.iconSwitch : freePanelIcons.iconSwitchOpen;
      configMap.countdown.icon = freePanelIcons.iconCountdown;
    } else {
      configMap.timing.icon = freePanelIcons.iconTiming;

      if (darkMode) {
        configMap.switch.icon = freePanelIcons.iconSwitch;
      } else {
        configMap.switch.icon = !offline ? freePanelIcons.iconSwitchClose : freePanelIcons.iconSwitch;
      }

      configMap.switch.text = '关闭';
      configMap.countdown.icon = freePanelIcons.iconCountdown;
    }

    return [configMap.timing, configMap.switch, configMap.countdown];
  };


  const initPosition = async () => {
    let rect: any;
    while (!rect) {
      await delay(50);
      // rect = await wxlib.wxapi.boundingClientRect('.free-panel-func-footer', wxlib.router.currentPage);
    }
    const { height = 0 } = rect || {};
    onFreePanelFooterHeight(height);
  };

  useEffect(() => {
    initPosition();
  }, []);

  return (
    <div className={classNames('free-panel-func-footer', { ipx })}>
      <div className='func-footer-mask'/>

      <div className='func-btn-list'>
        {getBtnConfig().map((item, index) => (
          <div
            className={classNames('func-btn-item', {
              actived: item.actived,
              'dark-mode': darkMode,
            })}
            key={index}
          >
            <RawBtn
              className={classNames('func-btn', item.btnClassName, {
                disabled: item.disabled,
              })}
              onClick={item.disabled ? noop : item.onClick}
              hoverClass={item.disabled ? 'none' : 'hover'}
            >
              <img
                className='func-btn-icon'
                src={item.icon as string}
              />
            </RawBtn>
            <div className='func-btn-text'>
              {item.text}
            </div>
          </div>
        ))}
      </div>

      {countdownVisible && (
        <CountdownSetting
          visible={true}
          value={countdown || 0}
          onCancel={() => setCountdownVisible(false)}
          onConfirm={handleCountdownConfirm}
        />
      )}
    </div>
  );
}
