import React from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import {getThemeType} from '@libs/theme';
import {SvgIcon} from '@components/common/icon';
import './ticker.less';

const Ticker = () => {
  const themeType = getThemeType();
  const handleSelectColor = (flag: number) => {
    apiControlDeviceData({
      color_mode: flag
    });
  };

  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'ticker'} className={classNames('ticker')}>
      <div className={classNames('white_title')}>
        <div
          className={classNames('title_left')}
          onClick={() => handleSelectColor(0)}
        >
          <SvgIcon
            name={
              (sdk.deviceData.power_switch === 1 && sdk.deviceData.color_mode != 1) && ('icon-whitemode-' + themeType) || ('icon-whitemode-' + themeType + '2')
            }
            width={50}
            height={50}
          />
          <span
            className={classNames(
              'white_font',
              (sdk.deviceData.power_switch === 1 && sdk.deviceData.color_mode != 1) && 'select',
            )}
          >
                白光
              </span>
        </div>

        <div className={classNames('title_center')}></div>

        <div
          className={classNames('title_right')}
          onClick={() => handleSelectColor(1)}
        >
          <SvgIcon
            name={
              (sdk.deviceData.power_switch === 1 && sdk.deviceData.color_mode === 1) && ('icon-white-lamp-scene-' + themeType) || ('icon-white-lamp-scene-' + themeType + '2')
            }
            width={50}
            height={50}
          />
          <span
            className={classNames(
              'white_font',
              (sdk.deviceData.power_switch === 1 && sdk.deviceData.color_mode === 1) && 'select'
            )}
          >
                情景
              </span>
        </div>
      </div>
    </article>
  );
};

export default Ticker;
