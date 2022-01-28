import React, { useState } from 'react';
import { Modal } from '@components/base';
import { Input } from 'antd-mobile';
import {useUserInfo} from "@hooks/useUserInfo";

const NickName = ({ isShow, onClose }) => {
  const [userInfo, { onUpdateUserInfo }] = useUserInfo();
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    onUpdateUserInfo({ nickName: dataUser })
    onClose();
  };

  return (
    <Modal
      title={'编辑昵称'}
      visible={isShow}
      onClose={onClose}
      onConfirm={handleCommit}
    >
      <Input
        placeholder="请输入昵称"
        value={dataUser}
        onChange={val => {
          setDataUser(val);
        }}
      />
    </Modal>
  );
};

export default NickName;
