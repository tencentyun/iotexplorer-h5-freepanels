import React from 'react';
import './scenario-display.less';
import classNames from 'classnames';
import { getThemeType } from '@libs/theme';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@components/common/icon';

export function ScenarioDisplay() {
  const themeType = getThemeType();
  return (
        <article id={'scenario-display-content'} className={classNames('scenario-display-content')}>
            <div className="rotundity">
              <SvgIcon name={`icon-five-bw-${sdk.deviceData.scene === 4 && 'downy' || (sdk.deviceData.scene == 2 && 'sleep' || 'leisure')}-${themeType}`} color="#000000" width={330} height={312}/>
            </div>
        </article>
  );
}
