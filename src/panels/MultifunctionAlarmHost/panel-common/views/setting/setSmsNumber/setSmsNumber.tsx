import React, { useState } from 'react';
import { Modal } from '@components/base';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Input } from 'antd-mobile';
import {apiControlDeviceData} from "@hooks/useDeviceData";

const SetSmsNumber = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState(sdk.deviceData.alarm_sms_number);
  const handleCommit = () => {
    apiControlDeviceData({
      alarm_sms_number: dataUser
    });
    onClose();
  };

  return (
    <Modal
      title={'报警短信号码'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Input
        placeholder="请输入报警短信号码"
        value={dataUser}
        onChange={val => {
          setDataUser(val);
        }}
      />
    </Modal>
  );
};

export default SetSmsNumber;
