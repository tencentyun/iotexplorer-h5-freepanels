import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './airFlow.less';
import { Slider } from './slider';
import { Block } from '@components/layout';

const AirFlow = () => (
    <article className={classNames('fan-adjust')}>
      <Block className="setting-panel">
        <div className="setting-slider">
          <Slider value={sdk.deviceData.windspeed ? sdk.deviceData.windspeed : 0.5} />
        </div>
      </Block>
    </article>
);

export default AirFlow;
