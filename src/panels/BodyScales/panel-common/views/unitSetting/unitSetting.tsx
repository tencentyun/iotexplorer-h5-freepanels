import React from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import classNames from 'classnames';
import { Cell } from '@components/base';
import { getThemeType } from '@libs/theme';
import { onControlDevice} from '@hooks/useDeviceData';
import './unitSetting.less';


export function UnitSetting() {

  return (
    <article className={classNames('unit_data')}>

    </article>
  );
}
export default UnitSetting;
