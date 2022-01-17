import React from 'react';
import './heater_foot.less'
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {apiControlDeviceData} from '@hooks/useDeviceData';

export function Normal_Foot() {
  const onSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  }
  const onMinus = () => {
    if (sdk.deviceData.power_switch === 1) {
      const current = sdk.deviceData.temp_set ? sdk.deviceData.temp_set : 0;
      if (current > 0) {
        const currentNow = current - 1;
        apiControlDeviceData({temp_set: currentNow});
      }
    }
  };
  const onAdd = () => {
    if (sdk.deviceData.power_switch === 1) {
      const current = sdk.deviceData.temp_set ? sdk.deviceData.temp_set : 0;
      if (current < 50) {
        const currentNow = current + 1;
        apiControlDeviceData({temp_set: currentNow});
      }
    }
  };
  return (
    <article id={'morandi_foot'} className={classNames('morandi_foot')}>
      <div className="foot_card">
        <div className="foot_botton">
          <div className="botton_span">
            <div onClick={onMinus}><SvgIcon
              name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-subtract-morandi2' || 'icon-water-heater-subtract-morandi'}
              width={280} height={280}/></div>
            <div onClick={onSwitch}><SvgIcon
              name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-switch-morandi2' || 'icon-water-heater-switch-morandi'}
              width={200} height={200}/></div>
            <div onClick={onAdd}><SvgIcon
              name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-add-morandi2' || 'icon-water-heater-add-morandi'}
              width={280} height={280}/></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default Normal_Foot;

