/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-16 14:58:45
 * @LastEditors:
 * @LastEditTime:
 */

import React from 'react';
import { DeviceSateContext } from '../../../deviceStateContext';
import classNames from 'classnames';
import { Cell } from '@/components/base';
import { useHistory } from 'react-router-dom';

const CloudTiming = () => {
  const history = useHistory();
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <section className={classNames('CloudTiming-wrap')}>
          <Cell
            title="云定时"
            valueStyle={'gray'}
            size="medium"
            isLink={true}
            onClick={() => {
              history.push('/timer');
            }}
          ></Cell>
        </section>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default CloudTiming;
