import React, { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { Layout } from '../Layout';
import { Btn } from '@custom/Btn';
import { Icon } from '@custom/Icon';
import { Popup } from '@custom/Popup';
import { Tabs } from '@custom/Tabs';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { Cell } from '@custom/Cell';
import { OptionDialog } from '@custom/OptionDialog';
import { setNewToOld, setOldToNew } from '../Layout/constant';
import { useTitle } from '@hooks/useTitle';
import Item from 'antd-mobile/es/components/dropdown/item';



const serviceList = [
  ['天气', '01', 'weather']
];

// 4、屏幕配置品类核对：
// 黑区：
// 小组件区域（黑区）能添加的设备品类：
// 精选彩光灯带 	635
// 智能窗帘电机 	622
// 精选冷暖灯带  	620
// 超薄磁吸灯  	620
// 智能筒射灯  	620
// 嵌入式磁吸灯  	620
// 精选双色射灯  	621
// 精选双色筒灯  	618
// 窗帘电机 W1_C3 	622
// 温湿度传感器  	616
// 小组件区域（黑区）能添加的服务：天气
// 白区：
// 按键能添加的设备：(能影射到设备的每路开关)
// 智控屏 637					有3路开关
// 三位智能开关(零火)  630
// 二位智能开关(零火)  629
// 一位智能开关(零火)  627
// 三位智能开关(单火)  630
// 二位智能开关(单火)  629
// 一位智能开关(单火)  627
// PLC开关三开（临时）630
// PLC开关二开（临时）629
// 按键能添加的场景：能关联到同一账号下的所有手动场景

// old
// const category = {
//   black: [616, 618, 620, 621, 622, 626],
//   white: [618, 620, 621, 626]
// }

const category = {
  black: [635, 622, 620, 621, 622, 618, 616],
  white: [637, 630, 629, 627]
}

// 按键能添加的设备：(能影射到设备的每路开关)
// 智控屏 637					有3路开关
// 三位智能开关(零火)  630
// 二位智能开关(零火)  629
// 一位智能开关(零火)  627
// 三位智能开关(单火)  630
// 二位智能开关(单火)  629
// 一位智能开关(单火)  627
// PLC开关三开（临时）630
// PLC开关二开（临时）629

// 固定卡开关个数
const swtichNum = {
  637: 3,
  630: 3,
  629: 2,
  627: 1
}

// 获取下拉内容
const getOptions = num => {
  let opt = [];
  for (let i = 0; i < num; i++) {
    opt.push({ label: `开关${i+1}`, value: i+1 })
  }
  return opt;
}

const Device = (props) => {
  const {
    setValue = () => { },
    selectedIndex,
    type = 'black',
    dataSource = []
  } = { ...props };
  const [list, setList] = useState([]);

  const onConfirm = (values) => {
    console.log("确定的值:", values)
  }
  const [opts, setOpts] = useState({
    title: '',
    visible: false,
    value: [],
    _data:{
      DeviceId:"",
      AliasName:"",
    },
    type: 'radio',
    options: [{ label: "开关1", value: 1 }],
    defaultValue: [],
    // confirmText?: string;
    // cancelText?: string;
    // onCancel?: () => void;
    onConfirm: onConfirm
  }
  )

  const setData = (data) => {
    setOpts({ ...opts, ...data })
  }

  const getDeviceList = async () => {
    try {
      const { DeviceList } = await sdk.requestTokenApi('AppGetFamilyDeviceList', {
        Action: 'AppGetFamilyDeviceList',
        // AccessToken: 'AccessToken',
        // RequestId: uuidv4(),
        FamilyId: sdk.familyId,
        RoomId: sdk.roomId,
        Offset: 0,
        Limit: 50
      });





      const ProductIds = DeviceList.map(item => item.ProductId);
      const { Products } = await sdk.requestTokenApi('AppGetProducts', {
        Action: 'AppGetProducts',
        ProductIds: ProductIds,
      });
      const oProducts = {};
      Products.forEach(element => {
        oProducts[element?.ProductId] = element;
      });
      const data = Products.filter(item => category[type].includes(item.CategoryId)).map(item => item.ProductId);
      let _data = DeviceList.filter(item => data.includes(item.ProductId))
      _data = _data.map(item => ({ ...item, CategoryId: oProducts[item.ProductId]?.CategoryId }))




      // _data = [{
      //   ProductId: "XW3IPM35AA",
      //   DeviceName: "dev_01",
      //   DeviceId: "XW3IPM35AA/dev_01",
      //   AliasName: "三位开关630",
      //   UserID: "163617832796426240",
      //   RoomId: "0",
      //   CategoryId: 630,
      //   FamilyId: "f_d8c9fa66e8e34c5c9e95143bd6023a61",
      //   IconUrl: "https://iot.gtimg.com/cdn/ad/leonchi/1686051558033.png",
      //   IconUrlGrid: "https://iot.gtimg.com/cdn/ad/leonchi/1686051558033.png",
      //   DeviceType: 0,
      //   FamilyCategoryId: "",
      //   CreateTime: 1699945492,
      //   UpdateTime: 1699945492,
      //   Online: 0
      // },
      // {
      //   ProductId: "DTOJV7TTQQ",
      //   DeviceName: "dev_01",
      //   DeviceId: "DTOJV7TTQQ/dev_01",
      //   AliasName: "一位开关627",
      //   CategoryId: 627,
      //   UserID: "163617832796426240",
      //   RoomId: "0",
      //   FamilyId: "f_d8c9fa66e8e34c5c9e95143bd6023a61",
      //   IconUrl: "https://iot.gtimg.com/cdn/ad/leonchi/1686051499190.png",
      //   IconUrlGrid: "https://iot.gtimg.com/cdn/ad/leonchi/1686051499190.png",
      //   DeviceType: 0,
      //   FamilyCategoryId: "",
      //   CreateTime: 1699945450,
      //   UpdateTime: 1699945450,
      //   Online: 0
      // },
      // {
      //   ProductId: "DCHL4OUHP5",
      //   DeviceName: "dev_01",
      //   DeviceId: "DCHL4OUHP5/dev_01",
      //   AliasName: "精选-射灯621",
      //   CategoryId: 621,
      //   UserID: "163617832796426240",
      //   RoomId: "0",
      //   FamilyId: "f_d8c9fa66e8e34c5c9e95143bd6023a61",
      //   IconUrl: " https://iot.gtimg.com/cdn/ad/leonchi/1686051437350.png",
      //   IconUrlGrid: " https://iot.gtimg.com/cdn/ad/leonchi/1686051437350.png",
      //   DeviceType: 0,
      //   FamilyCategoryId: "",
      //   CreateTime: 1699945273,
      //   UpdateTime: 1699945273,
      //   Online: 0
      // },
      // {
      //   ProductId: "QGV29W098U",
      //   DeviceName: "dev_01",
      //   DeviceId: "QGV29W098U/dev_01",
      //   AliasName: "二位开关629",
      //   CategoryId: 629,
      //   UserID: "163617832796426240",
      //   RoomId: "0",
      //   FamilyId: "f_d8c9fa66e8e34c5c9e95143bd6023a61",
      //   IconUrl: "https://iot.gtimg.com/cdn/ad/leonchi/1686051522948.png",
      //   IconUrlGrid: "https://iot.gtimg.com/cdn/ad/leonchi/1686051522948.png",
      //   DeviceType: 0,
      //   FamilyCategoryId: "",
      //   CreateTime: 1699944595,
      //   UpdateTime: 1699944595,
      //   Online: 0
      // }]


      setList(_data);
      // setList(DeviceList);
      console.log("aaaaaaaaaa------------>", { data, _data, type })

    } catch (err) {
      console.error('get info fail', err);
    }
  };
  useEffect(() => {
    getDeviceList();
  }, [type]);

  let isWhite = type === "white";

  /**
   * 点击每个栏目
   */
  const handleClick = (itemData,item) => {
    let valueItem = dataSource.filter(item => item.device === itemData?.DeviceId)[0] || {};
    console.log("选中的值",valueItem)
    setData({
      visible: true,
      title: item?.title,
      value:[valueItem?.switch], // TODO 回显值
      options: getOptions(swtichNum[itemData?.CategoryId]),
      _data:itemData,
    })
    console.log("点击每个栏目:", item,itemData)
  }

  // 模态框矿确认
  const onDialogConfirm = (value) => {
    let  {DeviceId, AliasName} = opts._data || {};
    setValue(DeviceId, AliasName, 'device',value[0])
    console.log("模态框确认:", DeviceId, AliasName, 'device',value[0]);
  }

  console.log("dataSource值:",dataSource)

  return (<div className="service-list">
    
    <OptionDialog {...opts} onCancel={() => setData({ visible: false })} onConfirm={onDialogConfirm}></OptionDialog>

    {list.map((item, index) => {
     let { AliasName, DeviceId, IconUrl } = item;
      return isWhite ?
        <Cell
          key={`device_white_${index}`}
          className="custom-cell"
          prefixIcon={IconUrl ? <img className="device-img" style={{ height: 24, width: 24 }} src={IconUrl} /> : <></>}
          title={AliasName}
          // ele="checkbox"
          isLink={true}
          onClick={handleClick.bind(null,item)}
        // eleValue={!!dataSource.filter(item => item.device === DeviceId).length}
        // onChange={() => {
        //   if (!!dataSource.filter(item => item.device === DeviceId).length) {
        //     return;
        //   }
        //   setValue(DeviceId, AliasName, 'device')
        // }}
        />
        : <Cell
          key={`device_black_${index}`}
          className="custom-cell"
          prefixIcon={IconUrl ? <img className="device-img" style={{ height: 24, width: 24 }} src={IconUrl} /> : <></>}
          title={AliasName}
          ele="checkbox"
          isLink={false}
          eleValue={!!dataSource.filter(item => item.device === DeviceId).length}
          onChange={() => {
            if (!!dataSource.filter(item => item.device === DeviceId).length) {
              return;
            }
            setValue(DeviceId, AliasName, 'device')
          }}
        />
    })}
  </div>)
}

const ServicePopup = forwardRef((props: any, ref) => {
  const { dataSource = [], history: { query } } = { ...props };
  const [visible, setVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  useImperativeHandle(ref, () => ({
    open: (index) => {
      setSelectedIndex(index);
      setVisible(true)
    },
    close: () => setVisible(false)
  }))

  const setSelectedValue = (id, name, type,switchNum) => {
    const data = [...dataSource].map(item => item);
    // debugger;
    if (selectedIndex || selectedIndex === 0) {
      data[selectedIndex].device = id;
      data[selectedIndex].name = name;
      data[selectedIndex]._type = type;
      if(switchNum){
        data[selectedIndex].switch = switchNum;
      }
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
                key={`service_${index}}`}
                className="custom-cell"
                prefixIcon={icon ? <Icon name={icon}></Icon> : <></>}
                title={name}
                ele="checkbox"
                isLink={false}
                eleValue={!!dataSource.filter(item => item.device === id).length}
                onChange={() => {
                  if (!!dataSource.filter(item => item.device === id).length) {
                    return;
                  }
                  setSelectedValue(id, name, 'service')
                }}
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
  const [sceneList, setSceneList] = useState([]);
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

  const setSelectedValue = (id, name, type,switchNum) => {
    const data = [...dataSource];
    if (selectedIndex || selectedIndex === 0) {
      data[selectedIndex].device = id;
      data[selectedIndex].name = name;
      data[selectedIndex]._type = type;
      if(switchNum){
        data[selectedIndex].switch = switchNum;
      }
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
          <Device {...props} dataSource={dataSource} selectedIndex={selectedIndex} setValue={setSelectedValue} type={'white'} />
        </Tabs.Tab>
        <Tabs.Tab title='场景' key='tab_2'>
          {sceneList.map(({ SceneId, SceneName, SceneIcon, Actions = [] }, index) => (
            <Cell
              key={`service_${SceneId}_${new Date().getTime()}`}
              className="custom-cell"
              // prefixIcon={icon ? <Icon name={icon}></Icon> : <></>}
              title={SceneName}
              ele="checkbox"
              isLink={false}
              eleValue={!!dataSource.filter(item => item.device === SceneId).length}
              onChange={() => {
                if (!!dataSource.filter(item => item.device === SceneId).length) {
                  return;
                }
                setSelectedValue(SceneId, SceneName, 'scene')
              }}
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
    // debugger;
    nData[Number(query?.index)] = setOldToNew(data);
    // debugger;
    doControlDeviceData('screen_page', nData);
  }
  useEffect(() => {
    if (!query.isEdit || !JSON.parse(query.isEdit)) {
      setInfoVisible(true);
    }
  }, [query.isEdit])

  console.log("显示的数据:", dataSource)

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
