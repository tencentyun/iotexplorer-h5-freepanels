import React, { useState } from 'react';
import { Modal } from '@components/base';
import { Input } from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';

const TwoWifiPassword = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      sta_config_24g: dataUser
    });
    onClose();
  };

  return (
    <Modal
      title={'设置2.4G Wi-Fi密码'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Input
        placeholder="请输入密码"
        value={dataUser}
        onChange={val => {
          setDataUser(val);
          apiControlDeviceData({ name_24g: val });
        }}
      />
    </Modal>
  );
};

export default TwoWifiPassword;
