/**
 * @Description:
 * @Author: RuiXue
 * @Date: 2021-09-29 15:19:53
 * @LastEditors:
 * @LastEditTime:
 */

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { DeviceSateContext } from '../../../../deviceStateContext';
import { Modal } from '@components/base';
import { List, Radio } from 'antd-mobile';
import { stringKey } from '@libs/global';
import { enumToArray } from '@libs/utillib';
import classNames from 'classnames';
import './modalSprayVolume.less';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';

/**
 * 喷雾量
 */
export const enumSprayVolume: stringKey = {
  large: '多',
  middle: '中',
  small: '少'
};

// @ts-ignore
const ModalSprayVolume = ({ isShow = false, onClose }) => {
  const [dataUser, setDataUser] = useState();

  const handleCommit = () => {
    apiControlDeviceData({
      spray_volume: dataUser
    });
    onClose();
  };
  const domList = enumToArray(enumSprayVolume).map(({ label, value }) => (
    <List.Item
      key={label}
      prefix={value}
      extra={
        <Radio
          value={label}
          icon={checked => <IconChecked isChecked={checked} />}
        />
      }
    />
  ));

  return (
    <DeviceSateContext.Consumer>
      {() => (
        <Modal
          title={'喷雾量'}
          visible={isShow}
          onClose={onClose}
          onConfirm={handleCommit}
          confirmText={'完成'}
        >
          <Radio.Group
            value={dataUser}
            onChange={(val: any) => {
              setDataUser(val);
            }}
          >
            <List className={classNames('no-border', 'adm-list-item-center')}>
              {domList}
            </List>
          </Radio.Group>
        </Modal>
      )}
    </DeviceSateContext.Consumer>
  );
};

ModalSprayVolume.propTypes = {
  isShow: PropTypes.bool,
  onClose: PropTypes.func
};

export default ModalSprayVolume;
