import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { useHistory } from 'react-router';
import { onControlDevice } from '@hooks/useDeviceData';
import { Cell } from '@components/base';
import './environment.less';

import TimingImage from '../../../icons/normal/timing.svg';
import TimingImageClose from '../../../icons/normal/timing-close.svg';

const Environment = () => {
  const themeType = getThemeType();
  const timingImageSrc = () => {
    switch (themeType) {
      case 'normal':
        return sdk.deviceData.power_switch === 1
          ? cellIcon(TimingImage)
          : cellIcon(TimingImageClose);
      default:
        return '';
    }
  };
  const handleUpMode = (val: string) => {
    if (sdk.deviceData.child_lock !== 1) {
      onControlDevice('up_mode', val);
    }
  };
  const handleDownMode = (val: string) => {
    if (sdk.deviceData.child_lock !== 1) {
      onControlDevice('down_mode', val);
    }
  };
  const cellIcon = (url: string) => (
    <img className="details-icon" src={url}></img>
  );
  const history = useHistory();
  const handleToggle = () => {
    if (sdk.deviceData.child_lock !== 1) {
      // 更多跳转
      return history.push('/timing');
    }
    return '';
  };
  return (
    <article className={classNames('environment')}>
      <div className={'environment-wrap'}>
        <ul>
          <li className={classNames('item-list', 'up-mode')}>
            <div id={'title-up'} className="title">上层模式</div>
            <div id={'operation-up'} className="operation-btn">
              <button
                id={'close-up'}
                className={classNames(
                  'button-fillet-small',
                  sdk.deviceData.up_mode === '0' ? 'active' : '',
                )}
                onClick={() => handleUpMode('0')}
              >
                <div className="label">关闭</div>
              </button>
              <button
                id={'clean-up'}
                className={classNames(
                  'button-fillet-small',
                  sdk.deviceData.up_mode === '1' ? 'active' : '',
                )}
                onClick={() => handleUpMode('1')}
              >
                <div className="label">保洁</div>
              </button>
              <button
                id={'bioclean-up'}
                className={classNames(
                  'button-fillet-small',
                  sdk.deviceData.up_mode === '2' ? 'active' : '',
                )}
                onClick={() => handleUpMode('2')}
              >
                <div className="label">无菌</div>
              </button>
            </div>
          </li>
          <li className={classNames('item-list', 'down-mode')}>
            <div id={'title-down'} className="title">下层模式</div>
            <div id={'operation-down'} className="operation-btn">
              <button
                id={'close-down'}
                className={classNames(
                  'button-fillet-small',
                  sdk.deviceData.down_mode === '0' ? 'active' : '',
                )}
                onClick={() => handleDownMode('0')}
              >
                <div className="label">关闭</div>
              </button>
              <button
                id={'clean-down'}
                className={classNames(
                  'button-fillet-small',
                  sdk.deviceData.down_mode === '1' ? 'active' : '',
                )}
                onClick={() => handleDownMode('1')}
              >
                <div className="label">保洁</div>
              </button>
              <button
                id={'bioclean-down'}
                className={classNames(
                  'button-fillet-small',
                  sdk.deviceData.down_mode === '2' ? 'active' : '',
                )}
                onClick={() => handleDownMode('2')}
              >
                <div className="label">无菌</div>
              </button>
            </div>
          </li>
          <li id={'timing'} className={classNames('item-list', 'timing')}>
            <Cell
              size="medium"
              title="云定时"
              prefixIcon={timingImageSrc()}
              value=""
              valueStyle="gray"
              onClick={handleToggle}
            />
          </li>
        </ul>
      </div>
    </article>
  );
};

export default Environment;
