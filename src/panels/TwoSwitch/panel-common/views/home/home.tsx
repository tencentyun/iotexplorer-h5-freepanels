import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { BizSwitch } from '@components/business';
import { Detail } from './detail/detail';
import './home.less';
import {onControlDevice} from '@hooks/useDeviceData';

export function Home() {
  return (
    <article className={classNames('home')}>
      {/*开关*/}
      <section className={classNames('dashboard')}>
        <BizSwitch
          name="开关1"
          value={Boolean(sdk.deviceData.switch_1)}
          onChange={value => {
            if (sdk.deviceData.switch_1 != value) {
              onControlDevice('switch_1', value ? 1 : 0);
            }
          }}
        />
        <BizSwitch
          name="开关2"
          value={Boolean(sdk.deviceData.switch_2)}
          onChange={value => {
            if (sdk.deviceData.switch_2 != value) {
              onControlDevice('switch_2', value ? 1 : 0);
            }
          }}
        />
      </section>
      {/*详情区域*/}
      <Detail />
    </article>
  );
}
