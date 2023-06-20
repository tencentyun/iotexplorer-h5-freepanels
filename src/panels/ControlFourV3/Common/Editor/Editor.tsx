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
import { setNewToOld, setOldToNew } from '../Layout/constant';
import { useTitle } from '@hooks/useTitle';

const serviceList = [
  ['天气', '01', 'weather']
];

const category = {
  black: [616, 618, 620, 621, 622, 626],
  white: [618, 620, 621, 626]
}

const Device = (props) => {
  const {
    setValue = () => { },
    selectedIndex,
    type = 'black',
    dataSource = []
  } = { ...props };
  const [list, setList] = useState([]);
  const getDeviceList = async () => {
    try {
      const { DeviceList } = await sdk.requestTokenApi('AppGetFamilyDeviceList', {
        Action: 'AppGetFamilyDeviceList',
        // AccessToken: 'AccessToken',
        // RequestId: uuidv4(),
        FamilyId: sdk.familyId,
        RoomId: sdk.RoomId,
        Offset: 0,
        Limit: 50
      });
      const ProductIds = DeviceList.map(item => item.ProductId);
      const { Products } = await sdk.requestTokenApi('AppGetProducts', {
        Action: 'AppGetProducts',
        ProductIds: ProductIds,
      });
      const data = Products.filter(item => category[type].includes(item.CategoryId)).map(item => item.ProductId);
      const _data = data.filter(item => data.includes(item.ProductId))
      // setList(_data);
      setList(DeviceList);
    } catch (err) {
      console.error('get info fail', err);
    }
  };
  useEffect(() => {
    getDeviceList();
  }, [type])
  return (<div className="service-list">
    {list.map(({ AliasName, DeviceId, IconUrl }, index) => (
      <Cell
        key={`device_${index}`}
        className="custom-cell"
        prefixIcon={IconUrl ? <img className="device-img" style={{ height: 24, width: 24 }} src={IconUrl} /> : <></>}
        title={AliasName}
        ele="checkbox"
        isLink={false}
        eleValue={dataSource[index]?.device === DeviceId}
        onChange={() => setValue(DeviceId, AliasName, 'device')}
      />
      // <div key={`cell_${index}`} className="device-item" onClick={() => setValue(DeviceId, AliasName, 'device')}>
      //   <div
      //     className={classNames("device-bg", (DeviceId === dataSource[selectedIndex]?.device) ? 'selected' : '')}
      //     style={!IconUrl ? { backgroundColor: '#D9D9D9' } : {}}
      //   >
      //     <img className="device-img" src={IconUrl} />
      //   </div>
      //   <div className="device-title">{AliasName}</div>
      // </div>
    ))}
  </div>)
}

const ServicePopup = forwardRef((props: any, ref) => {
  const { dataSource = [], history: { query } } = { ...props };
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  useImperativeHandle(ref, () => ({
    open: (index) => {
      setSelectedIndex(index);
      setVisible(true)
    },
    close: () => setVisible(false)
  }))

  const setSelectedValue = (id, name, type) => {
    const data = [...dataSource].map(item => item);
    if (selectedIndex || selectedIndex === 0) {
      data[selectedIndex].device = id;
      data[selectedIndex].name = name;
      data[selectedIndex]._type = type;
    }
    props.onChange(data);
    setVisible(false)
  }

  return (
    <Popup
      className="switch-scene-popup"
      visible={visible}
      onMaskClick={() => setVisible(false)}
    >
      <Tabs defaultActiveKey='tab_1' className="custom-tabs">
        <Tabs.Tab title='设备' key='tab_1'>
          <Device {...props} dataSource={dataSource} selectedIndex={selectedIndex} setValue={setSelectedValue} type={'black'} />
        </Tabs.Tab>
        <Tabs.Tab title='服务' key='tab_2'>
          <div className="service-list">
            {serviceList.map(([name, id, icon], index) => (
              <Cell
                key={`service_${index}`}
                className="custom-cell"
                prefixIcon={icon ? <Icon name={icon}></Icon> : <></>}
                title={name}
                ele="checkbox"
                isLink={false}
                eleValue={dataSource[selectedIndex]?.device === id}
                onChange={() => setSelectedValue(id, name, 'service')}
              />
            ))}
          </div>
        </Tabs.Tab>
      </Tabs>
    </Popup >

  )
});

const ScenePopup = forwardRef((props: any, ref) => {
  const { dataSource = [], history: { query } } = { ...props };
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState();
  const [sceneList, setSceneList] = useState([
    // { SceneName: '123', SceneId: '122', Actions: [1] },
    // { SceneName: '123', SceneId: '12', Actions: [1] },
    // { SceneName: '123', SceneId: '1222', Actions: [1] },
    // { SceneName: '123', SceneId: '12232', Actions: [1] },
  ]);
  const getSceneList = async () => {
    try {
      const { SceneList } = await sdk.requestTokenApi('AppGetSceneList', {
        Action: 'AppGetSceneList',
        // AccessToken: 'AccessToken',
        RequestId: sdk.requestId,
        FamilyId: sdk.familyId,
        Offset: 0,
        Limit: 50
      });
      setSceneList(SceneList);
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

  const setSelectedValue = (id, name, type) => {
    const data = [...dataSource];
    if (selectedIndex || selectedIndex === 0) {
      data[selectedIndex].device = id;
      data[selectedIndex].name = name;
      data[selectedIndex]._type = type;
    }
    props.onChange(data)
    setVisible(false)
  }
  return (
    <Popup
      className="switch-scene-popup"
      visible={visible}
      onMaskClick={() => setVisible(false)}
    >
      <Tabs defaultActiveKey='tab_1' className="custom-tabs">
        <Tabs.Tab title='设备开关' key='tab_1'>
          <Device {...props} dataSource={dataSource} selectedIndex={selectedIndex} setValue={setSelectedValue} type={'black'} />
        </Tabs.Tab>
        <Tabs.Tab title='场景' key='tab_2'>
          {sceneList.map(({ SceneId, SceneName, SceneIcon, Actions = [] }, index) => (
            // <Cell
            //   style={{ backgroundImage: `url(${SceneIcon})` }}
            //   key={'scene_${index}'}
            //   className="custom-cell"
            //   title={SceneName}
            //   subTitle={`${Actions.length}个设备`}
            //   ele="switch"
            //   isLink={false}
            //   eleValue={dataSource[selectedIndex]?.device === SceneId}
            //   onChange={() => setSelectedValue(SceneId, SceneName, 'scene')}
            // />
            <Cell
              key={`service_${SceneId}`}
              className="custom-cell"
              // prefixIcon={icon ? <Icon name={icon}></Icon> : <></>}
              title={SceneName}
              ele="checkbox"
              isLink={false}
              eleValue={dataSource[selectedIndex]?.device === SceneId}
              onChange={() => setSelectedValue(SceneId, SceneName, 'scene')}
            />
          ))}
        </Tabs.Tab>
      </Tabs>
    </Popup>
  )
});

export function Editor({ ...props }) {
  useTitle('屏幕布局');
  const { history: { query, push }, deviceData = {},
    doControlDeviceData
  } = { ...props };
  const [infoVisible, setInfoVisible] = useState(false);
  const { screen_page = [] } = { ...deviceData };
  const dataSource = screen_page.length ? [...setNewToOld([...screen_page][Number(query?.index)])] : [];
  const serviceRef = useRef(null);
  const sceneRef = useRef(null);
  const onChange = (data) => {
    const nData = [...screen_page];
    nData[Number(query?.index)] = setOldToNew(data);
    doControlDeviceData('screen_page', nData);
  }
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
          selected={dataSource}
          onBlackClick={(index) => serviceRef.current.open(index)}
          onWhiteClick={(index) => sceneRef.current.open(index)}
        >
        </Layout>
      </div>
      {JSON.parse(query.isEdit || 'false') ? <div className="footer">
        <Btn className="delete-btn" onClick={() => {
          // doControlDeviceData('screen_page', )
          let nData = [...screen_page];
          query?.index && nData.splice(Number(query?.index), 1);
          doControlDeviceData('screen_page', nData);
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
      <ScenePopup {...props} ref={sceneRef} dataSource={dataSource} onChange={onChange} />
      <ServicePopup {...props} ref={serviceRef} dataSource={dataSource} onChange={onChange} />
    </div>
  );
}
