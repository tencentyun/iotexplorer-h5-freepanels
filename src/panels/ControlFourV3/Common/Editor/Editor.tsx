import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Layout } from '../Layout';
import { Btn } from '@custom/Btn';
import { Icon } from '@custom/Icon';
import { Popup } from '@custom/Popup';
import { Tabs } from '@custom/Tabs';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Cell } from '@custom/Cell';
import classNames from 'classnames';
import { v4 as uuidv4 } from 'uuid';

const serviceList = [
  ['时钟', 'time'],
  ['天气', 'weather']
];

const Device = (props) => {
  const {
    deviceData = {},
    setValue = () => { },
    selectedIndex
  } = { ...props };
  const { card_config = [] } = deviceData;
  const [list, setList] = useState([]);
  const getDeviceList = async () => {
    try {
      const { DeviceList } = await sdk.requestTokenApi('AppGetFamilyDeviceList', {
        Action: 'AppGetFamilyDeviceList',
        AccessToken: 'AccessToken',
        RequestId: uuidv4(),
        FamilyId: sdk.familyId,
        RoomId: sdk.RoomId,
        Offset: 1,
        Limit: 50
      });
      setList(DeviceList);
    } catch (err) {
      console.error('get info fail', err);
    }
  };

  useEffect(() => {
    getDeviceList();
  }, [])
  return (<div className="device-list">
    {list.map(({ AliasName, DeviceId, IconUrl }, index) => (
      <div key={index} className="device-item" onClick={() => setValue(DeviceId, AliasName)}>
        <div
          className={classNames("device-bg", DeviceId === card_config[selectedIndex]?.deviceid ? 'selected' : '')}
          style={!IconUrl ? { backgroundColor: '#D9D9D9' } : {}}
        >
          <img className="device-img" src={IconUrl} />
        </div>
        <div className="device-title">{AliasName}</div>
      </div>
    ))}
  </div>)
}

const ServicePopup = forwardRef((props: any, ref) => {
  const { deviceData = {}, doControlDeviceData } = { ...props };
  const { card_config = [] } = deviceData;
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();

  useImperativeHandle(ref, () => ({
    open: (index) => {
      setSelectedIndex(index);
      setVisible(true)
    },
    close: () => setVisible(false)
  }))

  const setSelectedValue = (id, name) => {
    const new_card_config = [...card_config];
    if (selectedIndex || selectedIndex === 0) {
      new_card_config[selectedIndex].deviceid = id;
      new_card_config[selectedIndex].name = name;
    }
    doControlDeviceData('card_config', new_card_config);
  }

  return (
    <Popup
      className="switch-scene-popup"
      visible={visible}
      onMaskClick={() => setVisible(false)}
    >
      <Tabs defaultActiveKey='1' className="custom-tabs">
        <Tabs.Tab title='设备' key='1'>
          <Device {...props} selectedIndex={selectedIndex} setValue={setSelectedValue} />
        </Tabs.Tab>
        <Tabs.Tab title='服务' key='2'>
          <div className="service-list">
            {serviceList.map(([name, id], index) => (
              <Cell
                className="custom-cell"
                title={name}
                ele="checkbox"
                isLink={false}
                eleValue={card_config[selectedIndex]?.deviceid === id}
                onChange={() => setSelectedValue(id, name)}
              />
            ))}
          </div>
        </Tabs.Tab>
      </Tabs>
    </Popup >

  )
});

const ScenePopup = forwardRef((props: any, ref) => {
  const { deviceData = {}, doControlDeviceData } = { ...props };
  const { card_config = [] } = deviceData;

  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [sceneList, setSceneList] = useState([
    { SceneName: '123', SceneId: '122', Actions: [1] },
    { SceneName: '123', SceneId: '12', Actions: [1] },
    { SceneName: '123', SceneId: '1222', Actions: [1] },
    { SceneName: '123', SceneId: '12232', Actions: [1] },
  ]);
  const getSceneList = async () => {
    try {
      const { SceneList } = await sdk.requestTokenApi('AppGetSceneList', {
        Action: 'AppGetSceneList',
        AccessToken: 'AccessToken',
        RequestId: sdk.requestId,
        FamilyId: sdk.familyId,
        Offset: 1,
        Limit: 50
      });
      // setSceneList(SceneList);
    } catch (err) {
      console.error('get info fail', err);
    }
  };

  useEffect(() => {
    getSceneList();
  }, [])

  useImperativeHandle(ref, () => ({
    open: (index) => {
      setSelectedIndex(index);
      setVisible(true)
    },
    close: () => setVisible(false)
  }));

  const setSelectedValue = (id, name) => {
    const new_card_config = [...card_config];
    if (selectedIndex || selectedIndex === 0) {
      new_card_config[selectedIndex].deviceid = id;
      new_card_config[selectedIndex].name = name;
    }
    doControlDeviceData('card_config', new_card_config);
  }
  return (
    <Popup
      className="switch-scene-popup"
      visible={visible}
      onMaskClick={() => setVisible(false)}
    >
      <Tabs defaultActiveKey='1' className="custom-tabs">
        <Tabs.Tab title='设备' key='1'>
          <Device {...props} selectedIndex={selectedIndex} setValue={setSelectedValue} />
        </Tabs.Tab>
        <Tabs.Tab title='场景' key='2'>
          {sceneList.map(({ SceneId, SceneName, Actions = [] }, index) => (
            <Cell
              className="custom-cell"
              title={SceneName}
              subTitle={`${Actions.length}个设备`}
              ele="switch"
              isLink={false}
              eleValue={card_config[selectedIndex]?.deviceid === SceneId}
              onChange={() => setSelectedValue(SceneId, SceneName)}
            />
          ))}
        </Tabs.Tab>
      </Tabs>
    </Popup>
  )
});

export function Editor({ ...props }) {
  const { history: { query, push }, doControlDeviceData } = { ...props };
  const [infoVisible, setInfoVisible] = useState(false);

  const serviceRef = useRef(null);
  const sceneRef = useRef(null);

  useEffect(() => {
    if (!query.isEdit || !JSON.parse(query.isEdit)) {
      setInfoVisible(true);
    }
  }, [query.isEdit])
  return (
    <div className="editor-layout">
      <div className="header">
        <span>点击卡片可进行编辑</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 4 }}>布局说明</span>
          <div onClick={() => setInfoVisible(true)}><Icon name="info"></Icon></div>
        </div>
      </div>
      <div className="content">
        <Layout
          {...props}
          selected={JSON.parse(query.selected || '[]')}
          onBlackClick={(index) => serviceRef.current.open(index)}
          onWhiteClick={(index) => sceneRef.current.open(index)}
        >
        </Layout>
      </div>
      {JSON.parse(query.isEdit || 'false') ? <div className="footer">
        <Btn className="delete-btn" onClick={() => {
          // doControlDeviceData('card_config', )
          push('/home');
        }}>删除屏幕</Btn></div> : <></>}

      <Popup
        className="layout-info-popup"
        visible={infoVisible}
        onMaskClick={() => setInfoVisible(false)}
      >
        <div
          className="popup-content"
        >
          <div className="header">
            屏幕布局
          </div>
          <div className="content">
            <div className="info">
              黑色区可配置：
              设备（更详细的设备控制）、服务（时钟、天气）
            </div>
            <div className="info-photo">
              <Icon name="info-layout" />
            </div>
            <div className="info">
              按键区可配置：
              设备开关、场景，点击即控
            </div>
            <div className="arrow-1">
              <Icon name="arrow-left" />
            </div>
            <div className="arrow-2">
              <Icon name="arrow-right" />
            </div>
          </div>
          <div className="footer">
            <Btn className="custom-btn" onClick={() => setInfoVisible(false)}>我知道了</Btn>
          </div>
        </div>
      </Popup>
      <ScenePopup {...props} ref={sceneRef} />
      <ServicePopup {...props} ref={serviceRef} />
    </div>
  );
}
