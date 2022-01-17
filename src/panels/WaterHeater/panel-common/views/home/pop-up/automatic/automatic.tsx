import React, {useState} from 'react';
import classNames from 'classnames';
import {stringKey} from '@libs/global';
import {Modal} from '@components/base';
import {enumToArray} from '@libs/utillib';
import {List, Radio} from 'antd-mobile';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';

export const enumSprayMode: stringKey = {
  auto: '自动模式',
  manual: '手动模式',
  smart: '智能模式',
  comfortable: '舒适模式',
  eco: 'ECO模式',
  low: '低档模式',
  middle: '中档模式',
  high: '高档模式',
  antifreeze: '防冻模式',

};

const Automatic = ({isShow, onClose}) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      mode: dataUser
    });
    onClose();
  };

  const domList = enumToArray(enumSprayMode).map(({label, value}) => (
    <List.Item
      key={label}
      prefix={value}
      extra={
        <Radio
          value={label}
          icon={checked => <IconChecked isChecked={checked}/>}
        />
      }
    />
  ));

  return (
    <Modal
      title={'模式'}
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

export default Automatic;
