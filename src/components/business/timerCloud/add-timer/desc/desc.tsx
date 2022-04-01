import React from 'react';
import { DeviceSateContext } from '@/products/air-conditioner/deviceStateContext';
import { List } from 'antd-mobile';
const Desc = () => (
    <DeviceSateContext.Consumer>
      {() => <List.Item prefix={'备注'} extra={''} onClick={() => {}} />}
    </DeviceSateContext.Consumer>
);

export default Desc;
