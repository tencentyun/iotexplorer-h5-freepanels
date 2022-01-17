import React, {useState} from 'react';
import './heater_center.less'
import classNames from 'classnames';
import Two_Thousand from '../../pop-up/two_thousand/two_thousand';
import Automatic from '../../pop-up/automatic/automatic';
import {SvgIcon} from '@components/common/icon';
import {useHistory} from 'react-router-dom';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {apiControlDeviceData} from '@hooks/useDeviceData';

export function Normal_Center() {
  const history = useHistory();
  const [selectTheAutomatic, theAutomatic] = useState(false);
  const [selectTheTwo_Thousand, theTwo_Thousand] = useState(false);

  const onTwo_Thousand = () => {
    if (sdk.deviceData.power_switch === 1) {
      theTwo_Thousand(true);
    }
  }

  const onAutomatic = () => {
    if (sdk.deviceData.power_switch === 1) {
      theAutomatic(true);
    }
  }
  const onSetup = () => {
    if (sdk.deviceData.power_switch === 1) {
      return history.push('/setup');
    }
  };
  const onSwitch = () => {
    apiControlDeviceData({
      power_switch: sdk.deviceData.power_switch === 1 ? 0 : 1
    });
  }

  const modeSrc = (mode: String) => {
    switch (mode) {
      case 'manual':
        return '手动模式';
      case 'smart':
        return '智能模式';
      case 'comfortable':
        return '舒适模式';
      case 'auto':
        return '自动模式';
      case 'eco':
        return 'ECO模式';
      case 'low':
        return '低档模式';
      case 'high':
        return '高档模式';
      case 'middle':
        return '中档模式';
      case 'antifreeze':
        return '防冻模式';
      default:
        return '-';
    }
  };
  const capacitySrc = (capacity: String) => {
    switch (capacity) {
      case 'twoThousand':
        return '2000W';
      case 'ThreeThousand':
        return '3000W';
      case 'fourThousand':
        return '4000W';
      default:
        return '-';
    }
  };
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
    <article id={'colorful_center'} className={classNames('colorful_center')}>
      <div className="foot_botton">
        <div className="botton_span">
          <div onClick={onMinus}><SvgIcon
            name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-subtract-colorful2' || 'icon-water-heater-subtract-colorful'}
            width={280} height={280}/></div>
          <div onClick={onSwitch}><SvgIcon
            name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-switch-colorful2' || 'icon-water-heater-switch-colorful'}
            width={200} height={200}/></div>
          <div onClick={onAdd}><SvgIcon
            name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-add-colorful2' || 'icon-water-heater-add-colorful'}
            width={280} height={280}/></div>
        </div>
      </div>
      <div className="normal_card">
        <div className="center_botton"
             onClick={onAutomatic}
        >
          <SvgIcon
            name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-automatic-colorful2' || 'icon-water-heater-automatic-colorful'}
            width={82} height={82}/>
          <div className="botton_font">
            {sdk.deviceData.mode ? modeSrc(sdk.deviceData.mode) : '-'}
          </div>
        </div>

        <div className="center_botton"
             onClick={onTwo_Thousand}
        >
          <SvgIcon
            name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-2000w-colorful2' || 'icon-water-heater-2000w-colorful'}
            width={77} height={77}/>
          <div className="botton_font">
            {sdk.deviceData.capacity_set ? capacitySrc(sdk.deviceData.capacity_set) : '-'}
          </div>
        </div>

        <div
          className="center_botton"
          onClick={onSetup}
        >
          <SvgIcon
            name={sdk.deviceData.power_switch == 1 && 'icon-water-heater-more-colorful2' || 'icon-water-heater-more-colorful'}
            width={74} height={74}/>
          <div className="botton_font">
            设置
          </div>
        </div>
      </div>
      <Automatic
        isShow={selectTheAutomatic}
        onClose={() => {
          theAutomatic(false);
        }}
      />

      <Two_Thousand
        isShow={selectTheTwo_Thousand}
        onClose={() => {
          theTwo_Thousand(false);
        }}
      />

    </article>
  );
};

export default Normal_Center;

