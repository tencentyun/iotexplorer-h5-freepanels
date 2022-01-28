import React from 'react';
import classNames from 'classnames';
import './position.less';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
const Position = () => {
  return (
    <div
      id={'position-wrap'}
      className={classNames('position-wrap', 'text-align-center')}
    >
      <ul className={classNames('flex', 'space-between')}>
        <li>
          <strong className={classNames('font_36')}>室内温度</strong>
          <br />
          {sdk.deviceData.temperature
            ? sdk.deviceData.temperature + '℃'
            : '-'}
        </li>
        <li className="line">|</li>
        <li>
          <strong className={classNames('font_36')}>
            {/*{deviceData.pm25}*/}
            室内湿度
          </strong>
          <br />
          {sdk.deviceData.humidity ? sdk.deviceData.humidity + '%' : '-'}
        </li>
        <li className="line">|</li>
        <li>
          <strong className={classNames('font_36')}>
            {/*{deviceData.tvoc}ppm*/}
            滤芯使用率
          </strong>
          <br />
          {sdk.deviceData.filter_left_level
            ? sdk.deviceData.filter_left_level
            : '-'}
        </li>
      </ul>
    </div>
  );
};

export default Position;
