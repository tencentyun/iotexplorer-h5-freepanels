import React from 'react';
import classNames from 'classnames';
import { SvgIcon } from '@components/common/icon';
import { onControlDevice } from '@hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import './control-area.less';

interface IFunExampleProps {
  status: number;
}

export function ControlArea(props: IFunExampleProps) {
  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <div className="control-area">
          <div
            className={classNames(
              'setting-button',
              'minus-btn',
              deviceData.power_switch === 1 ? 'button-active' : '',
            )}
            onClick={() => {
              if (!deviceData.power_switch) return;
              const key = !deviceData.unit_convert
                ? 'target_c_temp'
                : 'target_f_temp';
              let value = deviceData[key] ? deviceData[key] - 1 : 0;
              if (value <= 0) {
                value = 0;
              }
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
              deviceData.power_switch === 1 ? 'power-open' : '',
            )}
            onClick={() => {
              onControlDevice('power_switch', Number(!deviceData.power_switch));
            }}
          >
            <SvgIcon className="icon-power" name="icon-power" color="#FFFFFF" />
          </div>
          <div
            className={classNames(
              'setting-button',
              'add-btn',
              deviceData.power_switch === 1 ? 'button-active' : '',
            )}
            onClick={() => {
              if (!deviceData.power_switch) return;
              const key = !deviceData.unit_convert
                ? 'target_c_temp'
                : 'target_f_temp';
              let value = deviceData[key] ? deviceData[key] + 1 : 1;
              if (value >= 100) {
                value = 100;
              }
              onControlDevice(key, value);
            }}
          >
            <SvgIcon className="control-icon icon-ther-add" name="icon-ther-add" />
          </div>
        </div>
      )}
    </DeviceContext.Consumer>
  );
}
