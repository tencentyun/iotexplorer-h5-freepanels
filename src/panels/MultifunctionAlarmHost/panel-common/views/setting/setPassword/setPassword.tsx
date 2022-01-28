import React, { useState } from 'react';
import { Modal } from '@components/base';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Input } from 'antd-mobile';
import {apiControlDeviceData} from "@hooks/useDeviceData";

const SetPassword = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState(sdk.deviceData.password);
  const handleCommit = () => {
    apiControlDeviceData({
      password: dataUser
    });
    onClose();
  };

  return (
    <Modal
      title={'设置密码'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Input
        placeholder="请输入密码"
        value={dataUser}
        onChange={val => {
          setDataUser(val);
        }}
      />
    </Modal>
  );
};

export default SetPassword;
