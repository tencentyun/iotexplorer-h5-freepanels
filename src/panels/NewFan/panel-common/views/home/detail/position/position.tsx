import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './position.less';

const Position = () => (
    <div className={classNames('position-wrap', 'text-align-center')}>
      <ul className={classNames('flex', 'space-between')}>
        <li>
          <strong className={classNames('font_36')}>CO2清新</strong>
          <br />
          {sdk.deviceData.tvoc ? sdk.deviceData.tvoc : 0}
        </li>
        <li className="line">|</li>
        <li>
          <strong className={classNames('font_36')}>温度(℃)</strong>
          <br />
          {sdk.deviceData.temperature ? sdk.deviceData.temperature : 0}
        </li>
        <li className="line">|</li>
        <li>
          <strong className={classNames('font_36')}>湿度(%)</strong>
          <br />
          {sdk.deviceData.humidity ? sdk.deviceData.humidity : 0}
        </li>
      </ul>
    </div>
);

export default Position;
