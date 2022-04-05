import React from 'react';
import './dashboard.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@components/common/icon';

const dashboard = () => {
  const themeType = getThemeType();
  // const [lampSrc] = useState(lampIcon);
  return (
    <article id={'dashboard'} className={classNames('dashboard')}>
      <div className={classNames('receptacle_round')}>
        <span className={classNames('receptacle_size1')}></span>

        <div className={classNames('receptacle_img')}>
          <SvgIcon name={sdk.deviceData.power_switch === 1 && `icon-receptacle-${themeType}2` || `icon-receptacle-${themeType}`}/>
        </div>
        <span className={classNames('receptacle_size')}>{sdk.deviceData.power_switch === 1 ? '插座已开启' : '插座已关闭'}</span>
      </div>

    </article>
  );
};

export default dashboard;
