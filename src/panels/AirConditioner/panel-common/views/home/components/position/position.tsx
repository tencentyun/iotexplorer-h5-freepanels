/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-27 14:38:56
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import classNames from 'classnames';
import './position.less';
import { DeviceSateContext } from '../../../../deviceStateContext';

const Position = () => (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <div className={classNames('position-wrap', 'text-align-center')}>
          <ul className={classNames('position-row', 'flex', 'space-between')}>
            <li>
              <strong className={classNames('text-primary')}>
                {deviceData.position || '静眠'}
              </strong>
              <br />
              风速
            </li>
            <li />
            <li>
              <strong className={classNames('text-primary')}>
                {deviceData.weather || '制热中'}
              </strong>
              <br />
              状态
            </li>
          </ul>
        </div>
      )}
    </DeviceSateContext.Consumer>
);

export default Position;
