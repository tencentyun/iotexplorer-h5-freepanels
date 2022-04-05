import React, { useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Modal } from '@components/base';
import { Input } from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';

const SetCallNumber = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState(sdk.deviceData.alarm_call_number);
  const handleCommit = () => {
    apiControlDeviceData({
      alarm_call_number: dataUser,
    });
    onClose();
  };

  return (
    <Modal
      title={'报警电话号码'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Input
        placeholder="请输入报警电话号码"
        value={dataUser}
        onChange={(val) => {
          setDataUser(val);
        }}
      />
    </Modal>
  );
};

export default SetCallNumber;
