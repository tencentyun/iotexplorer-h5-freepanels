/**
 * @Description:滤芯复位
 * @Author: RuiXue
 * @Date: 2021-09-29 09:01:12
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import classNames from 'classnames';
import { Block } from '@components/layout';
import { Cell } from '@components/base';
import { DeviceSateContext } from '../../../deviceStateContext';
import { Modal } from '@components/base';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './filter-reset.less';

const FilterReset = () => {
  const [isShow, setIsShow] = useState(false);

  const handleCommit = () => {
    apiControlDeviceData({
      filter_reset: 1
    });
  };

  const handleOpen = () => {
    setIsShow(true);
  };

  const handleClose = () => {
    setIsShow(false);
  };

  return (
    <DeviceSateContext.Consumer>
      {({ deviceData }) => (
        <article className={classNames('filter-reset-wrap')}>
          <Block className="setting-block">
            <Cell
              title="滤芯复位"
              size="medium"
              isLink={true}
              onClick={handleOpen}
            ></Cell>
          </Block>
          <Modal
            visible={isShow}
            onClose={handleClose}
            onConfirm={handleCommit}
            confirmText={'完成'}
          >
            <div className={classNames('text-align-center', 'text-margin')}>
              确定要复位滤网吗?
            </div>
          </Modal>
        </article>
      )}
    </DeviceSateContext.Consumer>
  );
};

export default FilterReset;
