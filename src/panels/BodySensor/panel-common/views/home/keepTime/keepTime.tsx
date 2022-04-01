import React, { useState } from 'react';
import classNames from 'classnames';
import { stringKey } from '@libs/global';
import { Modal } from '@components/base';
import { enumToArray } from '@libs/utillib';
import { List, Radio } from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';

export const enumSprayMode: stringKey = {
  thirtySecond: '有人30S',
  sixtySecond: '有人60S',
  oneHundredAndTwentySecond: '有人120S',
};

const KeepTime = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      keep_time: dataUser,
    });
    onClose();
  };

  const domList = enumToArray(enumSprayMode).map(({ label, value }) => (
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
    <Modal
      title={'有人保持时间'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Radio.Group
        value={dataUser}
        onChange={(val: any) => {
          setDataUser(val);
        }}
      >
        <List className={classNames('no-border')}>{domList}</List>
      </Radio.Group>
    </Modal>
  );
};

export default KeepTime;
