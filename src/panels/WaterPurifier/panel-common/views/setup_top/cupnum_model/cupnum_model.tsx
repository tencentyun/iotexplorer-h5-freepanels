import React, {useState} from 'react';
import classNames from 'classnames';
import {stringKey} from '@libs/global';
import {Modal} from '@components/base';
import {enumToArray} from '@libs/utillib';
import {List, Radio} from 'antd-mobile';
import {apiControlDeviceData} from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';

export const enumSprayMode: stringKey = {
  continue: '持续出水',
  oneHundredMl: '100ML',
  twoHundredMl: '200ML',
  threeHundredMl: '300ML'
};

const Temperature = ({isShow, onClose}) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      flow: dataUser
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
      title={'取水杯量'}
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

export default Temperature;
