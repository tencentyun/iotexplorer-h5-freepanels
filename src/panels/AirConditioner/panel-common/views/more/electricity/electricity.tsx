/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-16 10:17:06
 * @LastEditors:
 * @LastEditTime:
 */

import React, { Component } from 'react';
import classNames from 'classnames';
import { DeviceSateContext } from '../../../deviceStateContext';
import './electricity.less';

class Electricity extends Component {
  render() {
    return (
      <DeviceSateContext.Consumer>
        {({ deviceData }) => (
          <article className={classNames('electricity-wrap')}>
            <section className="text-regular">
              <strong className="text-primary">
                {deviceData.power_consumption || 0}Kwh
              </strong>
              <span className="label">耗电</span>
            </section>
            <section className="text-regular">
              <strong className="text-primary">
                {deviceData.temp_unit_convert === 'fahrenheit'
                  ? deviceData.temp_current_f || 0
                  : deviceData.temp_current || 0}
                <i>&#176;</i>
                {deviceData.temp_unit_convert === 'fahrenheit' ? 'F' : 'C'}
              </strong>
              <span className="label">当前温度</span>
            </section>
          </article>
        )}
      </DeviceSateContext.Consumer>
    );
  }
}

export default Electricity;
