import React, {useState} from 'react';
import classNames from 'classnames';
import {stringKey} from '@libs/global';
import {Modal} from '@components/base';
import {enumToArray} from '@libs/utillib';
import {List, Radio} from 'antd-mobile';
import { apiControlDeviceData } from '@hooks/useDeviceData';
import IconChecked from '@components/base/icon-checked/icon-checked';

export const enumSprayMode: stringKey = {
  alarm_sound: '声音报警',
  alarm_light: '光亮报警',
  alarm_sound_light: '声光报警',
  normal: '正常'
};

const AlarmStatus = ({isShow, onClose}) => {
  const [dataUser, setDataUser] = useState();
  const handleCommit = () => {
    apiControlDeviceData({
      alarm_state: dataUser
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
    <div className="alarmStatus_card">
      <Modal
        title={'报警器状态'}
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
    </div>
  );
};

export default AlarmStatus;
