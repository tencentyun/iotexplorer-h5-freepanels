import React, { useState } from 'react';
import * as freePanelIcons from '@icons/device/freePanel';
import './FuncFooter.less';
import { CountdownSetting, second2HourMinute } from '../CountdownSetting';
import * as wxlib from '@wxlib';
import { FooterBtnConfig, PageFooter } from '@components/PageFooter';

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
	isShareDevice?: boolean;
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
  isShareDevice,
}: FuncFooterProps) {
  const [countdownVisible, setCountdownVisible] = useState(false);

  const handleCountdownConfirm = async ({ enable, value }) => {
    if (!enable) {
      await controlDeviceData('count_down', 0);
    } else {
      await controlDeviceData('count_down', value);
    }

    setCountdownVisible(false);
  };

  const getBtnConfig = (): FooterBtnConfig[] => {
    const itemClassName = darkMode ? 'dark-mode' : '';

    const configMap: {
			timing: FooterBtnConfig;
			switch: FooterBtnConfig;
			countdown: FooterBtnConfig;
		} = {
		  timing: {
		    text: '定时',
		    disabled: offline,
		    btnClassName: isShareDevice ? 'disabled' : '',
		    className: itemClassName,
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
		    className: itemClassName,
		    onClick: onSwitchChange ? onSwitchChange : () => controlDeviceData('power_switch', powerOff ? 1 : 0),
		  },
		  countdown: {
		    text: '倒计时',
		    disabled: offline,
		    className: itemClassName,
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

  return (
		<>
			<PageFooter
				footerConfig={getBtnConfig()}
			/>

			{countdownVisible && (
				<CountdownSetting
					visible={true}
					value={countdown || 0}
					onCancel={() => setCountdownVisible(false)}
					onConfirm={handleCountdownConfirm}
				/>
			)}
		</>
  );
}
