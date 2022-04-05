import React from 'react';
import './scenario_content.less';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SvgIcon } from '@components/common/icon';
import { getThemeType } from '@libs/theme';

export function ScenarioContent() {
  const themeType = getThemeType();
  return (
    <article id={'scenario_content'} className={classNames('scenario_content')}>
      <div className="rotundity">
        <SvgIcon
          name={`icon-four-bw-${sdk.deviceData.scene === 4 && 'downy' || (sdk.deviceData.scene == 2 && 'leisure' || 'sleep')}-${themeType}`}
          color="#000000" width={330} height={312}/>
      </div>
    </article>
  );
}

