import React, { useState } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { BizSwitch } from '@components/business';
import { Detail } from './detail/detail';
import './home.less';
import { onControlDevice } from '@hooks/useDeviceData';

export function Home() {
  const [enterFlag, setEnterFlag] = useState(false);
  const [enterFlagTwo, setEnterFlagTwo] = useState(false);
  return (
    <article className={classNames('home')}>
      {/* 开关*/}
      <section className={classNames('dashboard')}>
        <BizSwitch
          name="开关1"
          value={sdk.deviceData.switch_1 === 1}
          onInitChange={(value) => {
            setEnterFlag(value);
          }}
          onChange={(value) => {
            if (enterFlag) {
              onControlDevice('switch_1', value ? 1 : 0);
            }
          }}
        />
        <BizSwitch
          name="开关2"
          value={sdk.deviceData.switch_2 === 1}
          onInitChange={(value) => {
            setEnterFlagTwo(value);
          }}
          onChange={(value) => {
            if (enterFlagTwo) {
              onControlDevice('switch_2', value ? 1 : 0);
            }
          }}
        />
      </section>
      {/* 详情区域*/}
      <Detail />
    </article>
  );
}
