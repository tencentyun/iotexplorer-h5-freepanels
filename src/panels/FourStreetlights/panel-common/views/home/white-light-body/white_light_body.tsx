import React, {useRef, useState} from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './white_light_body.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import {onControlDevice} from '@hooks/useDeviceData';
import {SvgIcon} from '@components/common/icon';

export function White_light_body() {
  const wrapper = useRef();
  const [brightness, onToggleSetBrightness] = useState(
    sdk.deviceData.brightness ? sdk.deviceData.brightness : 40
  );
  const currentHeight = brightness + '%';

  const updateValue = (pageY: any) => {
    const {clientHeight: height, offsetTop} = wrapper.current as any;
    let value = 1 - (pageY - offsetTop) / height;
    value = parseInt(value * 100);

    if (value < 0) {
      value = 0;
    } else if (value > 100) {
      value = 100;
    }
    onToggleSetBrightness(value);
    onControlDevice('brightness', value);
  };

  const onTouchEnd = (e: TouchEvent) => {
    const {pageY} = e.changedTouches[0];
    updateValue(pageY)
  }
  return (
    <article ref={wrapper} id={'body'} className={classNames('body')} onTouchEnd={onTouchEnd}>
      <div className="body_icon">
        <SvgIcon name={sdk.deviceData.power_switch == 1 ? 'icon-four-bw-brightnessicon-' + getThemeType() : 'icon-four-bw-brightnessicon-' + getThemeType() +'2'} color="#000000" width={310} height={315}/>
      </div>

      <div id="body_brightness" className="body_brightness" style={{height: currentHeight}}>
        <div className="brightness_withe"></div>
        <div className="brightness_percent">{brightness}%</div>
        <div className="brightness_font">亮度</div>
      </div>

    </article>
  );
};
