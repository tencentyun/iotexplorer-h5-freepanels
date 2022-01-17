import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './progress_bar.less';
import classNames from 'classnames';
import {LightBright} from '@components/business/light-bright/light-bright';
import {onControlDevice} from '@hooks/useDeviceData';

export function Progress_bar() {
  const changeBrightness = (val, endTouch) => {
    if (endTouch) {
      onControlDevice('brightness', val);
    }
  }
  return (
    <article className={classNames('lightbright')}>
      <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                   onChange={changeBrightness}/>
    </article>
  );
};
