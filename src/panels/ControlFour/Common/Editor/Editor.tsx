import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Layout } from '../Layout';
import { Btn } from '@custom/Btn';
import { Icon } from '@custom/Icon';
import { Popup } from '@custom/Popup';
import { Tabs } from '@custom/Tabs';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Cell } from '@custom/Cell';
import classNames from 'classnames';

const getSceneList = async () => {
  try {
    await sdk.requestTokenApi('AppGetSceneList', {
      Action: 'AppGetSceneList',
      AccessToken: 'AccessToken',
      RequestId: sdk.requestId,
      FamilyId: sdk.familyId,
      Offset: 1,
      Limit: 50
    });

  } catch (err) {
    console.error('get info fail', err);
  }
};

const serviceList = [
  ['时钟', 'time'],
  ['天气', 'weather']
];

const Device = () => {
  return <>设备</>
}

const ServicePopup = forwardRef((props: any, ref) => {

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(null);

  useImperativeHandle(ref, () => ({
    open: (v) => {
      setValue(v);
      setVisible(true)
    },
    close: () => setVisible(false)
  }))

  return (
    <Popup
      className="switch-scene-popup"
      visible={visible}
      onMaskClick={() => setVisible(false)}
    >
      <Tabs defaultActiveKey='1' className="custom-tabs">
        <Tabs.Tab title='设备' key='1'>
          <Device />
        </Tabs.Tab>
        <Tabs.Tab title='服务' key='2'>
          <div className="service-list">
            {serviceList.map(([name, id], index) => (
              // <div
              //   key={index}
              //   className={classNames("service-item", value === id ? 'selected' : '')}
              //   onClick={() => { }} > {name}</div>
              <Cell className="custom-cell" title={name} ele="checkbox" isLink={false} eleValue={value === id} onChange={() => setValue(id)} />
            ))}
          </div>
        </Tabs.Tab>
      </Tabs>
    </Popup >

  )
});

const ScenePopup = forwardRef((props: any, ref) => {
  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState(null);
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
    open: (v) => {
      setValue(v);
      setVisible(true)
    },
    close: () => setVisible(false)
  }))
  return (
    <Popup
      className="switch-scene-popup"
      visible={visible}
      onMaskClick={() => setVisible(false)}
    >
      <Tabs defaultActiveKey='1' className="custom-tabs">
        <Tabs.Tab title='设备' key='1'>
          <Device />
        </Tabs.Tab>
        <Tabs.Tab title='场景' key='2'>
          {sceneList.map(({ SceneId, SceneName, Actions = [] }, index) => (
            <Cell
              className="custom-cell"
              title={SceneName}
              subTitle={`${Actions.length}个设备`}
              ele="switch"
              isLink={false}
              eleValue={SceneId === value}
              onChange={() => {
                setValue(SceneId)
              }}
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
          onBlackClick={() => serviceRef.current.open()}
          onWhiteClick={() => sceneRef.current.open()}
        >
        </Layout>
      </div>
      {JSON.parse(query.isEdit || 'false') ? <div className="footer">
        <Btn className="delete-btn" onClick={() => {
          // doControlDeviceData('card_config', )
          push('/home');
        }}>删除屏幕</Btn></div> : <></>}

      <Popup
        visible={infoVisible}
        onMaskClick={() => setInfoVisible(false)}
      >
        <div
          className="layout-info-popup"
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
      <ScenePopup ref={sceneRef} />
      <ServicePopup ref={serviceRef} />
    </div>
  );
}
