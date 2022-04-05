import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './home.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import { SvgIcon } from '@components/common/icon';
import { Normal_progress_bar } from '../normal-progress-bar/normal_progress_bar';
import { ProductSetting } from '../product-setting/product-setting';

export function Home() {
  const themeType = getThemeType();

  const statusSrc = (status: string) => {
    switch (status) {
      case 'low':
        return '低';
      case 'middle':
        return '中';
      case 'high':
        return '高';
      default:
        return '-';
    }
  };
  return (
            <article id={'emergency_button_normal'} className={classNames('emergency_button_normal')}>
            <div className="emergency_head">
                <div className="head-icon">
                    <SvgIcon name={`icon-emergency-button-${themeType}`} width={150} height={150}/>
                </div>

                <div id={'center_scale'}>
                    <Normal_progress_bar />
                </div>

                <div className="scale_foot_state">
                    <div className="state_span">
                        <div className="state_font">{sdk.deviceData.sos_state === '1' ? '打开' : '关闭' }</div>
                        <div className="state_font1">紧急报警</div>
                    </div>

                    <div className="vertical"></div>

                    <div className="state_span">
                        <div className="state_font">{sdk.deviceData.tamper_alarm === '1' ? '打开' : '关闭' }</div>
                        <div className="state_font1">防拆报警</div>
                    </div>

                    <div className="vertical"></div>

                    <div className="state_span">
                        <div className="state_font">{sdk.deviceData.battery_state ? statusSrc(sdk.deviceData.battery_state) : '-' }</div>
                        <div className="state_font1">电池状态</div>
                    </div>
                </div>
            </div>
            <ProductSetting />

        </article>
  );
}

export default Home;
