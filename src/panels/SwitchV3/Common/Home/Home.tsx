import React, { useState, useEffect } from 'react';
import { LightSwitch } from './LightSwitch';
import { Detail } from './Detail';
import { ConfirmModal } from '@components/Modal';
import { Icon } from '@custom/Icon';


const allSwitch = [
  ['switch_1', '开关一'],
  ['switch_2', '开关二'],
  ['switch_3', '开关三'],
  ['switch_4', '开关四'],
  ['switch_5', '开关五'],
];

const getSwitchNum = (templateMap = {}) => Object.keys(templateMap).filter(v => /^switch/.test(v)).length || 1;

export function Home(props) {
  const { doControlDeviceData, templateMap, setContext, deviceData = {} } = props;
  const switchNum = getSwitchNum(templateMap);
  const currentSwitch = allSwitch.slice(0, switchNum);
  const onChange = (key, value) => doControlDeviceData(key, value ? 1 : 0);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentName, setCurrentName] = useState('');
  useEffect(() => {
    setContext({ switchNum });
    // setCurrentName(deviceData['name_button1'])
  }, []);
  return (
    <div className="home">
      <div className={`dashboard switch-${switchNum}`}>
        <div className="operator">
          <div className="operator-btn editor" onClick={() => setModalVisible(true)}>
            <Icon className="operator-icon"  name="editor" size="large" />
          </div>
          <div className="operator-btn setting"></div>
        </div>
        {currentSwitch.map(([key, name], index) => (
          <LightSwitch
            key={key}
            name={name}
            value={!!deviceData[key]}
            className={`light-switch-${index + 1}`}
            onChange={onChange.bind(null, key)}
          />
        ))}
      </div>
      <Detail {...props} currentSwitch={currentSwitch} />
      <div className='socket-container-modal'>
        <ConfirmModal
          btnFootClass='no-outline' // 底部按钮class
          visible={modalVisible}
          title='修改名称'
          content={<input
            value={currentName}
            autoFocus
            className='edit-name-modal'
            placeholder='请输入名称'
            onChange={(event) => {
              setCurrentName(event.currentTarget.value);
            }}
          />}
          onCancel={() => setModalVisible(false)}
          onConfirm={() => {
            doControlDeviceData('name_button1', currentName);
            setModalVisible(false);
          }} />
      </div>
    </div>
  );
}
