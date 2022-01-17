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
        <div className="switch-top">
          <BizSwitch
            name="开关1"
            value={sdk.deviceData.switch_1 === 1}
            onChange={value => {
              if (sdk.deviceData.switch_1 != value) {
                onControlDevice('switch_1', value ? 1 : 0);
              }
            }}
          />
          <BizSwitch
            name="开关2"
            value={sdk.deviceData.switch_2 === 1}
            onChange={value => {
              if (sdk.deviceData.switch_2 != value) {
                onControlDevice('switch_2', value ? 1 : 0);
              }
            }}
          />
        </div>
        <div className="switch-bottom">
          <BizSwitch
            name="开关3"
            value={sdk.deviceData.switch_3 === 1}
            onChange={value => {
              if (sdk.deviceData.switch_3 != value) {
                onControlDevice('switch_3', value ? 1 : 0);
              }
            }}
          />
          <BizSwitch
            name="开关4"
            value={sdk.deviceData.switch_4 === 1}
            onChange={value => {
              if (sdk.deviceData.switch_4 != value) {
                onControlDevice('switch_4', value ? 1 : 0);
              }
            }}
          />
        </div>
      </section>
      {/*详情区域*/}
      <Detail />
    </article>
  );
}
