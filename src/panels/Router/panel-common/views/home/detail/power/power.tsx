import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './power.less';
import addIcon from '../../../icons/normal/add.svg';

export function Power() {
  return (
    <article className={classNames('power-tools-bar')}>
      <button
        id={'power'}
        className={classNames('btn-power-switch')}
        onClick={() => sdk.goGatewayAddSubDevicePage(sdk.deviceId)}
      >
        <img className="img" src={addIcon} alt="" />
      </button>
    </article>
  );
}
