import React, { useState } from 'react';
import classNames from 'classnames';
import { SvgIcon } from '@/components/common/icon';
// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { onControlDevice } from '@/business';
import './control-area.less';

interface IFunExampleProps {
  status: number;
}

export function ControlArea(props: IFunExampleProps) {
  const handleUpdate = () => {
    //   console.log('asdfasd')
    sdk.checkFirmwareUpgrade();
  };

  const handleCommit = () => {
    // if (modalType === WORK_MODE) {
    //   (cRefWorkMode.current as any).commit();
    // } else {
    //   (cRefGear.current as any).commit();
    // }
  };

  const handleClose = () => {
    // setIsVisible(false);
    // if (modalType === 'gear') ClassGear.apiSetGear(888);
  };

  const handleToggle = () => {};

  return (
    <div className="control-area">
      <div
        className={classNames(
          'setting-button',
          'minus-btn',
          sdk.deviceData.power_switch === 1 ? 'button-active' : ''
        )}
        onClick={() => {
          if (sdk.deviceData.power_switch === 0) return;
          const key =
            sdk.deviceData.unit_convert === 0
              ? 'current_c_temp'
              : 'current_f_temp';
          const value = sdk.deviceData[key] ? sdk.deviceData[key] - 1 : 0;
          onControlDevice(key, value);
        }}
      >
        <SvgIcon
          className="control-icon icon-ther-minus"
          name="icon-ther-minus"
        />
      </div>
      <div
        className={classNames(
          'control-power',
          sdk.deviceData.power_switch === 1 ? 'power-open' : ''
        )}
        onClick={() => {
          onControlDevice('power_switch', Number(!sdk.deviceData.power_switch));
        }}
      >
        <SvgIcon className="icon-power" name="icon-power" color="#FFFFFF" />
      </div>
      <div
        className={classNames(
          'setting-button',
          'add-btn',
          sdk.deviceData.power_switch === 1 ? 'button-active' : ''
        )}
        onClick={() => {
          if (sdk.deviceData.power_switch === 0) return;
          const key =
            sdk.deviceData.unit_convert === 0
              ? 'current_c_temp'
              : 'current_f_temp';
          const value = sdk.deviceData[key] ? sdk.deviceData[key] + 1 : 1;
          onControlDevice(key, value);
        }}
      >
        <SvgIcon className="control-icon icon-ther-add" name="icon-ther-add" />
      </div>
    </div>
  );
}
