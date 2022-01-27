import React, { useState } from 'react';
import { Modal } from '@components/base';
import { Input } from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';

const FiveWifiName = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      name_5g: dataUser
    });
    onClose();
  };

  return (
    <Modal
      title={'设置5G Wi-Fi名称'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Input
        placeholder="请输入名称"
        value={dataUser}
        onChange={val => {
          setDataUser(val);
          apiControlDeviceData({ name_24g: val });
        }}
      />
    </Modal>
  );
};

export default FiveWifiName;
