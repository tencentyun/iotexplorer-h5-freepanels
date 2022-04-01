import React, { useState } from 'react';
import { stringKey } from '@libs/global';
import { Modal } from '@components/base';
import { Radio } from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import './end_prompt.less';
export const enumSprayMode: stringKey = {};

const End_Prompt = ({ isShow, onClose }) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({ work_state: '7', operation_control: '2' });
    onClose();
  };
  return (
    <Modal
      title={''}
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
        <div className="message">
          确定结束烹饪吗？
        </div>
      </Radio.Group>
    </Modal>
  );
};

export default End_Prompt;
