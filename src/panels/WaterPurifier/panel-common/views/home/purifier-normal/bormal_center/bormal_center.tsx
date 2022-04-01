import React from 'react';
import './bormal_center.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Bormal_center() {
  const statusSrc = (status: string) => {
    switch (status) {
      case 'purified':
        return '净水中';
      case 'heating':
        return '加热中';
      case 'water_intake':
        return '取水中';
      case 'standby':
        return '待机中';
      case 'washing':
        return '冲洗中';
      case 'sterilization':
        return '杀菌中';
      default:
        return '-';
    }
  };
  return (
    <article id={'bormal_center'} className={classNames('bormal_center')}>

      <div className="center_card">
        <div className="card_span">
          <div>{sdk.deviceData.status ? statusSrc(sdk.deviceData.status) : '-'}</div>
          <div>工作状态</div>
        </div>

        <div className="vertical"></div>

        <div className="card_span">
          <div>{sdk.deviceData.temp_current ? sdk.deviceData.temp_current : '-'}℃</div>
          <div>当前温度</div>
        </div>

        <div className="vertical"></div>

        <div className="card_span">
          <div>{sdk.deviceData.desalting_rate ? sdk.deviceData.desalting_rate : '-'}％</div>
          <div>脱盐率</div>
        </div>
      </div>
    </article>
  );
}

export default Bormal_center;

