import React from 'react';
import './detail.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import Environment from './environment/environment';
import {LightBright} from '@components/business/light-bright/light-bright';
import {onControlDevice} from '@hooks/useDeviceData';

export function Detail() {
  const changeLightBright = (val, endTouch) => {
    if (endTouch) {
      onControlDevice('brightness', val);
    }
  }
  return (
    <article className={classNames('detail')}>
      {/*温度和湿度*/}
      <div className='lightbright_card'>
        <article className={classNames('lightbright')}>
          <LightBright defaultValue={sdk.deviceData.brightness ? sdk.deviceData.brightness : 80}
                       onChange={changeLightBright}/>
        </article>
      </div>
      <Environment/>
    </article>
  );
}
