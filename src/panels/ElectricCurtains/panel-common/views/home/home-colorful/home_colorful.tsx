import React from 'react';
import classNames from 'classnames';
import './home_colorful.less';
import Colorful_head from './colorful_head/colorful_head';
import Colorful_body from './colorful_body/colorful_body';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
export function HomeColorful() {
  return (
        <article
          className={classNames(
            sdk.deviceData.power_switch === 0 && 'power-off'
          )}
        >
            <Colorful_head />
            <Colorful_body />
        </article>
  );
}
export default HomeColorful;
