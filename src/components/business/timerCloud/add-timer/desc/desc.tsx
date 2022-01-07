/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-10-31 19:12:08
 * @LastEditors:
 * @LastEditTime:
 */
import React from 'react';
//import PropTypes from 'prop-types';
import { DeviceSateContext } from '@/products/air-conditioner/deviceStateContext';
import classNames from 'classnames';
import { List } from 'antd-mobile';

const Desc = () => {
  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <List.Item prefix={'备注'} extra={''} onClick={() => {}} />
      )}
    </DeviceSateContext.Consumer>
  );
};

//Desc.propTypes = {
//};

export default Desc;
