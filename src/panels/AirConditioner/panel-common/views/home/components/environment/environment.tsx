/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-26 13:25:07
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '../../../../deviceStateContext';
import classNames from 'classnames';
import './environment.less';
import { enumGear } from '../../../home/components/tools-bar/gear/gear';

export enum enumStatus {
  heating = '加热中',
  cooling = '制冷中',
  ventilation = '换气中',
  off = '关闭',
  auto = '自动模式',
  arefaction = '除湿中',
  auto_clean = '自动清洁',
  eco = 'ECO'
}

const Environment = () => (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('environment')}>
          <div className={'environment-wrap'}>
            <div className={classNames('temperature')}>
              <strong className={classNames('text-primary')}>
                {enumGear[deviceData.fan_speed_enum] || '暂无'}
              </strong>
              <div className="label">风速</div>
            </div>
            <span className="line" />
            <div className={classNames('humidity')}>
              <strong className={classNames('text-primary')}>
                {(enumStatus as any)[deviceData.status] || '暂无'}
              </strong>
              <div className="label">状态</div>
            </div>
          </div>
        </article>
      )}
    </DeviceSateContext.Consumer>
);

export default Environment;
