import React from 'react';
import './curtain_button.less';
import classNames from 'classnames';
import {SvgIcon} from '@components/common/icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {onControlDevice} from '@hooks/useDeviceData';

export function Curtain_button() {
  // const [openRatio, onToggleOpenRatio] = useState(sdk.deviceData.percent_state?sdk.deviceData.percent_state:55);

  const openLeave = (openRatio) => {
    if (openRatio === 0) {
      onControlDevice('control', 'open');
    } else {
      onControlDevice('control', 'close');
    }
  }


  const onSwitch = () => {
    onControlDevice('control', 'pause');
  }

  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'curtain_button'} className={classNames('curtain_button')}>
      <div className="curtain_button_body">
        <div className={classNames("button_right", sdk.deviceData.control === 'open' && "button_select")}
             onClick={() => openLeave(0)}>
          <SvgIcon
            name={sdk.deviceData.control === 'open' && 'icon-curtains-open-unlock-normal' || 'icon-curtains-open-normal'}
            color="#FFFFF" width={89} height={32}/>
          <div className="curtain_button_font">
            开启
          </div>
        </div>
        <div className="button_center" id="power" onClick={onSwitch}>
          <SvgIcon
            name={!sdk.deviceData.control || sdk.deviceData.control === 'pause' ? 'icon-curtains-total-unlock-normal' : 'icon-curtains-total-paused-normal'}
            color="#000000" width={180} height={180}/>
        </div>

        <div className={classNames("button_left", sdk.deviceData.control === 'close' && "button_select")}
             onClick={() => openLeave(100)}>
          <SvgIcon
            name={sdk.deviceData.control === 'close' && 'icon-curtains-close-unlock-normal' || 'icon-curtains-close-normal'}
            color="#FFFFF" width={89} height={32}/>
          <div className="curtain_button_font">
            关闭
          </div>
        </div>
      </div>

    </article>
  );
};

export default Curtain_button;
