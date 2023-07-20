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
        RoomId: sdk.roomId,
        Offset: 0,
        Limit: 50
      });
      const ProductIds = DeviceList.map(item => item.ProductId);
      const { Products } = await sdk.requestTokenApi('AppGetProducts', {
        Action: 'AppGetProducts',
        ProductIds: ProductIds,
      });

    //  let Products = {
    //     "code": 0,
    //     "msg": "",
    //     "data": {
    //         "Products": [{
    //             "ProductId": "48UDRJSYRU",
    //             "Name": "三键开关",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"switch_1\",\"name\":\"继电开关1\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"继电开关2\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_3\",\"name\":\"继电开关3\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_1_name\",\"name\":\"继电开关1显示名\",\"desc\":\"在开关键上显示的名称\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"required\":false},{\"id\":\"switch_2_name\",\"name\":\"继电开关2显示名\",\"desc\":\"在开关键上显示的名称\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"required\":false},{\"id\":\"switch_3_name\",\"name\":\"继电开关3显示名\",\"desc\":\"在开关键上显示的名称\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"required\":false},{\"id\":\"current_power\",\"name\":\"当前功率\",\"desc\":\"功率发生变化，且变化在一定幅度才上报\",\"mode\":\"rw\",\"define\":{\"type\":\"float\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"瓦\"},\"required\":false},{\"id\":\"today_ec\",\"name\":\"今日用电\",\"desc\":\"date为YYYYMM，ec为截止当前时间，今天的用电量，每半小时上报一次\",\"mode\":\"rw\",\"define\":{\"type\":\"struct\",\"specs\":[{\"id\":\"date\",\"name\":\"日期\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"ec\",\"name\":\"用电量\",\"dataType\":{\"type\":\"float\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"度\"}}]},\"required\":false},{\"id\":\"safe_pwd\",\"name\":\"安全密码\",\"desc\":\"6位数字安全密码\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"},\"required\":false},{\"id\":\"screen_layout\",\"name\":\"屏幕布局\",\"desc\":\"对屏幕黑色区域和按键区域功能配置\",\"mode\":\"rw\",\"define\":{\"arrayInfo\":{\"type\":\"struct\",\"specs\":[{\"id\":\"id\",\"name\":\"屏幕页号\",\"dataType\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"6\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"config\",\"name\":\"布局配置\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}]},\"type\":\"array\"},\"required\":false},{\"id\":\"theme_style\",\"name\":\"主题风格\",\"desc\":\"设备使用的主题风格编号\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"10\"},\"required\":false},{\"id\":\"power_switch\",\"name\":\"电灯开关\",\"desc\":\"控制电灯开灭\",\"required\":true,\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}}}],\"events\":[],\"actions\":[{\"id\":\"update_theme_style\",\"name\":\"主题风格更新\",\"desc\":\"用户选择更新主题风格，设备收到下载地址，需响应回复小程序收到更新通知\",\"input\":[{\"id\":\"id\",\"name\":\"编号\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"10\"}},{\"id\":\"url\",\"name\":\"下载地址\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"md5\",\"name\":\"md5\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"100\"}}],\"output\":[{\"id\":\"result\",\"name\":\"响应\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未收到\",\"1\":\"收到\"}}}],\"required\":false}],\"profile\":{\"ProductId\":\"48UDRJSYRU\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi",
    //             "CategoryId": 618,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1688027308
    //         },
    //         {
    //             "ProductId": "G9G7BO9NBA",
    //             "Name": "台灯",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"brightness\",\"name\":\"亮度调节\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"1\",\"max\":\"100\",\"start\":\"1\",\"step\":\"1\",\"unit\":\"%\"},\"required\":false},{\"id\":\"color_temp\",\"name\":\"色温调节\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"1000\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"},\"required\":false},{\"id\":\"color_mode\",\"name\":\"工作模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"夜灯模式\",\"2\":\"温馨模式\",\"3\":\"阅读模式\",\"4\":\"工作模式\"}},\"required\":false},{\"id\":\"mode_switch1\",\"name\":\"按键1模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"开关模式\",\"1\":\"场景模式\"}},\"required\":false},{\"id\":\"mode_switch2\",\"name\":\"按键2模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"开关模式\",\"1\":\"场景模式\"}},\"required\":false},{\"id\":\"mode_switch3\",\"name\":\"按键3模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"开关模式\",\"1\":\"场景模式\"}},\"required\":false},{\"id\":\"mode_switch4\",\"name\":\"按键3模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"开关模式\",\"1\":\"场景模式\"}},\"required\":false},{\"id\":\"scene_linkage\",\"name\":\"场景联动\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"场景按键1\",\"1\":\"场景按键2\",\"2\":\"场景按键3\",\"3\":\"场景按键4\"}},\"required\":false},{\"id\":\"switch_names\",\"name\":\"场景名称\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"arrayInfo\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"type\":\"array\"},\"required\":false},{\"id\":\"switch_scene_ids\",\"name\":\"场景id\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"arrayInfo\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"},\"type\":\"array\"},\"required\":false},{\"id\":\"scene_switch\",\"name\":\"场景模式开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"working_mode\",\"name\":\"补光模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"关闭\",\"2\":\"自拍补光\",\"3\":\"无极调光\",\"4\":\"美妆补光\"}},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"G9G7BO9NBA\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi",
    //             "CategoryId": 622,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1687786936
    //         },
    //         {
    //             "ProductId": "GNLK2L55U7",
    //             "Name": "秒空开关四寸",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"switch_1\",\"name\":\"继电开关1\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"继电开关2\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_3\",\"name\":\"继电开关3\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_1_name\",\"name\":\"继电开关1显示名\",\"desc\":\"在开关键上显示的名称\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"required\":false},{\"id\":\"switch_2_name\",\"name\":\"继电开关2显示名\",\"desc\":\"在开关键上显示的名称\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"required\":false},{\"id\":\"switch_3_name\",\"name\":\"继电开关3显示名\",\"desc\":\"在开关键上显示的名称\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"20\"},\"required\":false},{\"id\":\"current_power\",\"name\":\"当前功率\",\"desc\":\"功率发生变化，且变化在一定幅度才上报\",\"mode\":\"rw\",\"define\":{\"type\":\"float\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"瓦\"},\"required\":false},{\"id\":\"today_ec\",\"name\":\"今日用电\",\"desc\":\"date为YYYYMM，ec为截止当前时间，今天的用电量，每半小时上报一次\",\"mode\":\"rw\",\"define\":{\"type\":\"struct\",\"specs\":[{\"id\":\"date\",\"name\":\"日期\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"ec\",\"name\":\"用电量\",\"dataType\":{\"type\":\"float\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"度\"}}]},\"required\":false},{\"id\":\"safe_pwd\",\"name\":\"安全密码\",\"desc\":\"6位数字安全密码\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"},\"required\":false},{\"id\":\"screen_layout\",\"name\":\"屏幕布局\",\"desc\":\"对屏幕黑色区域和按键区域功能配置\",\"mode\":\"rw\",\"define\":{\"arrayInfo\":{\"type\":\"struct\",\"specs\":[{\"id\":\"id\",\"name\":\"屏幕页号\",\"dataType\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"6\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"config\",\"name\":\"布局配置\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}]},\"type\":\"array\"},\"required\":false},{\"id\":\"theme_style\",\"name\":\"主题风格\",\"desc\":\"设备使用的主题风格编号\",\"mode\":\"rw\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"10\"},\"required\":false}],\"events\":[],\"actions\":[{\"id\":\"update_theme_style\",\"name\":\"主题风格更新\",\"desc\":\"用户选择更新主题风格，设备收到下载地址，需响应回复小程序收到更新通知\",\"input\":[{\"id\":\"id\",\"name\":\"编号\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"10\"}},{\"id\":\"url\",\"name\":\"下载地址\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"md5\",\"name\":\"md5\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"100\"}}],\"output\":[{\"id\":\"result\",\"name\":\"响应\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未收到\",\"1\":\"收到\"}}}],\"required\":false}],\"profile\":{\"ProductId\":\"GNLK2L55U7\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1688466284
    //         },
    //         {
    //             "ProductId": "Q19Z8U71GG",
    //             "Name": "cw灯带",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"总开关\",\"desc\":\"总开关\",\"required\":true,\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}}},{\"id\":\"switch_1\",\"name\":\"按键1_开关\",\"desc\":\"按键_1的开关\",\"required\":true,\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}}},{\"id\":\"count_down1\",\"name\":\"按键1倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"秒\"},\"required\":false},{\"id\":\"button1\",\"name\":\"按键1\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"1\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"按键2_开关\",\"desc\":\"按键_2的开关\",\"required\":false,\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}}},{\"id\":\"button2\",\"name\":\"按键2\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"1\"}},\"required\":false},{\"id\":\"count_down2\",\"name\":\"按键2倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"秒\"},\"required\":false},{\"id\":\"mode_switch1\",\"name\":\"按键1模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"开关模式\",\"1\":\"场景模式\"}},\"required\":false},{\"id\":\"mode_switch2\",\"name\":\"按键2模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"开关模式\",\"1\":\"场景模式\"}},\"required\":false},{\"id\":\"scene_switch\",\"name\":\"场景模式开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"add_elec\",\"name\":\"增加电量\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"float\",\"min\":\"0\",\"max\":\"50000\",\"start\":\"0\",\"step\":\"0.01\",\"unit\":\"kwh（度）\"},\"required\":false},{\"id\":\"current_power\",\"name\":\"当前功率\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"99999\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"W\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"Q19Z8U71GG\",\"CategoryId\":\"553\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi",
    //             "CategoryId": 553,
    //             "CategoryKey": "TwoRoadSwitch",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/b9928b2f7e67700037737c2ef7e8fbab.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/b9928b2f7e67700037737c2ef7e8fbab.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1684138665
    //         },
    //         {
    //             "ProductId": "2Y1E9JRC2K",
    //             "Name": "五路开关1",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"电源开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_1\",\"name\":\"按键1_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"按键2_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_3\",\"name\":\"按键3_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_4\",\"name\":\"按键4_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_5\",\"name\":\"按键5_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"count_down_1\",\"name\":\"插座1_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_2\",\"name\":\"插座2_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_3\",\"name\":\"插座3_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_4\",\"name\":\"插座4_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_5\",\"name\":\"插座5_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"2Y1E9JRC2K\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1653983674
    //         },
    //         {
    //             "ProductId": "MTOBXKBY8N",
    //             "Name": "宠物喂养器",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"quick_feed\",\"name\":\"快速喂食\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"slow_feed\",\"name\":\"慢放喂食\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"export_calibrate\",\"name\":\"出粮校准\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"weight_calibrate\",\"name\":\"余粮校准\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"reset_factory\",\"name\":\"恢复出厂\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"export_state\",\"name\":\"出粮校准状态\",\"desc\":\"枚举值：true，false\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"true\":\"成功\",\"false\":\"失败\"}},\"required\":false},{\"id\":\"unit_switch\",\"name\":\"单位转换\",\"desc\":\"枚举值：cup、oz、grid\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"cup\":\"杯子\",\"oz\":\"碗\",\"grid\":\"碟\"}},\"required\":false},{\"id\":\"feed_state\",\"name\":\"喂食状态\",\"desc\":\"枚举值：standby，feeding，done\",\"mode\":\"r\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"standby\":\"准备中\",\"feeding\":\"喂食中\",\"done\":\"结束\"}},\"required\":false},{\"id\":\"drying_left\",\"name\":\"烘干剩余时间\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"},\"required\":false},{\"id\":\"manual_feed\",\"name\":\"手动喂食\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"1\",\"max\":\"12\",\"start\":\"0\",\"step\":\"1\"},\"required\":false},{\"id\":\"battery_percentage\",\"name\":\"电池电量\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"%\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"MTOBXKBY8N\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1649573084
    //         },
    //         {
    //             "ProductId": "RDP2D46OUD",
    //             "Name": "五路开关2",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"电源开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_1\",\"name\":\"按键1_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"按键2_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_3\",\"name\":\"按键3_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_4\",\"name\":\"按键4_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_5\",\"name\":\"按键5_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"count_down_1\",\"name\":\"插座1_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_2\",\"name\":\"插座2_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_3\",\"name\":\"插座3_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_4\",\"name\":\"插座4_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_5\",\"name\":\"插座5_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"RDP2D46OUD\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1653983694
    //         },
    //         {
    //             "ProductId": "2Y1E9JRC2K",
    //             "Name": "五路开关1",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"电源开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_1\",\"name\":\"按键1_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"按键2_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_3\",\"name\":\"按键3_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_4\",\"name\":\"按键4_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_5\",\"name\":\"按键5_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"count_down_1\",\"name\":\"插座1_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_2\",\"name\":\"插座2_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_3\",\"name\":\"插座3_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_4\",\"name\":\"插座4_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_5\",\"name\":\"插座5_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"2Y1E9JRC2K\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1653983674
    //         },
    //         {
    //             "ProductId": "1O3A17A7JY",
    //             "Name": "五路开关",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"电源开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_1\",\"name\":\"按键1_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_2\",\"name\":\"按键2_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_3\",\"name\":\"按键3_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_4\",\"name\":\"按键4_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_5\",\"name\":\"按键5_开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"count_down_1\",\"name\":\"插座1_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_2\",\"name\":\"插座2_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_3\",\"name\":\"插座3_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_4\",\"name\":\"插座4_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false},{\"id\":\"count_down_5\",\"name\":\"插座5_倒计时\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"86400\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"s\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"1O3A17A7JY\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1653978778
    //         },
    //         {
    //             "ProductId": "5D8QB7GDFD",
    //             "Name": "智能门锁",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"manual_lock\",\"name\":\"手动落锁\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未上锁\",\"1\":\"上锁\"}},\"required\":false},{\"id\":\"dormant_switch\",\"name\":\"休眠开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未开启\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"lock_motor_state\",\"name\":\"落锁状态\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未落锁\",\"1\":\"已落锁\"}},\"required\":false},{\"id\":\"child_lock\",\"name\":\"童锁\",\"desc\":\"童锁状态变化上报\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未上锁\",\"1\":\"已上锁\"}},\"required\":false},{\"id\":\"anti_lock_outside\",\"name\":\"上提反锁\",\"desc\":\"在门锁外部，进行上提反锁后上报\",\"mode\":\"r\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未反锁\",\"1\":\"已反锁\"}},\"required\":false},{\"id\":\"reverse_lock\",\"name\":\"反锁\",\"desc\":\"门锁硬件上进行反锁/解除反锁的操作后上报\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解除反锁\",\"1\":\"已反锁\"}},\"required\":false},{\"id\":\"unlock_method\",\"name\":\"开锁方式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"struct\",\"specs\":[{\"id\":\"fingerprint\",\"name\":\"指纹\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"password\",\"name\":\"密码\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"card\",\"name\":\"卡片\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"face\",\"name\":\"人脸\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}}]},\"required\":false},{\"id\":\"sd_status\",\"name\":\"存储卡状态\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"异常\",\"1\":\"正常\"}},\"required\":false},{\"id\":\"record_switch\",\"name\":\"SD卡录像开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"wireless_awake\",\"name\":\"唤醒状态\",\"desc\":\"设备主动上报当前低功耗是否处于唤醒状态\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"休眠状态\",\"1\":\"唤醒状态\"}},\"required\":false},{\"id\":\"basic_nightvision\",\"name\":\"红外夜视\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"自动切换\",\"1\":\"始终关闭\",\"2\":\"始终打开\"}},\"required\":false},{\"id\":\"automatic_lock\",\"name\":\"自动落锁\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"不自动落锁\",\"1\":\"自动落锁\"}},\"required\":false},{\"id\":\"auto_lock_time\",\"name\":\"落锁延迟时间\",\"desc\":\"自动落锁开启后，需设定每次解锁后距离自动落锁之间的延时，下发给门锁本地保存参数，设置时长1s到30分钟\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"1\",\"max\":\"1800\",\"start\":\"1\",\"step\":\"1\",\"unit\":\"秒\"},\"required\":false},{\"id\":\"open_inside\",\"name\":\"门从内侧打开\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"打开\"}},\"required\":false},{\"id\":\"stay_capture_mode\",\"name\":\"逗留抓拍模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"逗留仅抓拍图片\",\"2\":\"逗留抓拍10s视频\"}},\"required\":false},{\"id\":\"link_mode\",\"name\":\"连接模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"wifi保活\",\"1\":\"休眠模式\",\"2\":\"电源不可用模式\"}},\"required\":false},{\"id\":\"stay_alarm_mode\",\"name\":\"逗留告警模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"关闭\",\"1\":\"普通模式\",\"2\":\"高级模式\"}},\"required\":false},{\"id\":\"stay_trigger_distance\",\"name\":\"逗留感应距离\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"远\",\"2\":\"中\",\"3\":\"近\"}},\"required\":false},{\"id\":\"record_mode\",\"name\":\"录像模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"事件触发\",\"2\":\"一直录像\"}},\"required\":false},{\"id\":\"stay_hold_time\",\"name\":\"逗留保持时间\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"5\",\"max\":\"20\",\"start\":\"5\",\"step\":\"5\",\"unit\":\"秒\"},\"required\":false},{\"id\":\"battery_percentage\",\"name\":\"电池电量\",\"desc\":\"-1表示未获取到电量\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"-1\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"百分比\"},\"required\":false},{\"id\":\"ipc_battery_percentage\",\"name\":\"IPC电池电量\",\"desc\":\"-1表示未获取到电量\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"-1\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"百分比\"},\"required\":false},{\"id\":\"dormant_time_set\",\"name\":\"休眠时间设置\",\"desc\":\"设置每天休眠时间段，格式为121212\",\"mode\":\"rw\",\"define\":{\"type\":\"struct\",\"specs\":[{\"id\":\"start_time\",\"name\":\"开始时间\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"截止时间\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}]},\"required\":false},{\"id\":\"beep_volume\",\"name\":\"导航音量\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"静音\",\"1\":\"低\",\"2\":\"中\",\"3\":\"高\"}},\"required\":false},{\"id\":\"unlock_switch\",\"name\":\"多重验证\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"单一开锁\",\"1\":\"指纹和密码\",\"2\":\"指纹和门卡\",\"3\":\"指纹和人脸\",\"4\":\"密码和门卡\",\"5\":\"密码和人脸\",\"6\":\"门卡和人脸\"}},\"required\":false},{\"id\":\"doorbell_song\",\"name\":\"门铃铃声\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"铃声0\",\"1\":\"铃声1\",\"2\":\"铃声2\",\"3\":\"铃声3\"}},\"required\":false},{\"id\":\"arming_switch\",\"name\":\"离家布防\",\"desc\":\"开启后，门从内侧打开触发报警\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"detect_message\",\"name\":\"侦测消息推送\",\"desc\":\"摄像头侦测人员逗留消息是否上报\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"power_switch\",\"name\":\"电灯开关\",\"desc\":\"控制电灯开灭\",\"required\":true,\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}}}],\"events\":[{\"id\":\"doorbell\",\"name\":\"门铃呼叫\",\"desc\":\"有人按门铃上报\",\"type\":\"info\",\"params\":[{\"id\":\"remind\",\"name\":\"门铃呼叫提醒\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"没人按门铃\",\"1\":\"有人按门铃\"}}}],\"required\":false},{\"id\":\"unlock_fingerprint\",\"name\":\"指纹解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}}],\"required\":false},{\"id\":\"unlock_card\",\"name\":\"卡片解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}}],\"required\":false},{\"id\":\"unlock_password\",\"name\":\"密码解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}},{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"unlock_face\",\"name\":\"人脸解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"脸部id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未开锁\",\"1\":\"开锁\"}}}],\"required\":false},{\"id\":\"sd_format_state\",\"name\":\"SD格式化状态上报\",\"desc\":\"\",\"type\":\"alert\",\"params\":[{\"id\":\"result\",\"name\":\"格式化成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"格式化失败\",\"1\":\"格式化成功\"}}}],\"required\":false},{\"id\":\"alarm_lock\",\"name\":\"门锁告警\",\"desc\":\"\",\"type\":\"alert\",\"params\":[{\"id\":\"alarm_tip\",\"name\":\"告警提示\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"错误指纹\",\"1\":\"错误密码\",\"2\":\"错误卡\",\"3\":\"低电量\",\"4\":\"门未锁好\",\"5\":\"门未关\",\"6\":\"锁被撬\",\"7\":\"布防模式被打破\"}}}],\"required\":false},{\"id\":\"unlock_key\",\"name\":\"钥匙解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}}],\"required\":false},{\"id\":\"unlock_temporary_password\",\"name\":\"临时密码解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}},{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"unlock_temporary_clear_single\",\"name\":\"单条临时密码清空上报\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"unlock_temporary_clear\",\"name\":\"临时密码清空上报\",\"desc\":\"\",\"type\":\"alert\",\"params\":[],\"required\":false},{\"id\":\"add_fingerprint_result\",\"name\":\"上报指纹添加成功状态\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"add_face_result\",\"name\":\"上报人脸添加成功状态\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"add_password_result\",\"name\":\"上报密码添加成功状态\",\"desc\":\"\",\"type\":\"alert\",\"params\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"add_card_result\",\"name\":\"上报卡片添加成功状态\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false}],\"actions\":[{\"id\":\"delete_fingerprint\",\"name\":\"删除指纹\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"delete_card\",\"name\":\"删除卡片\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"卡id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"delete_password\",\"name\":\"删除密码\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"unlock_remote\",\"name\":\"远程解锁\",\"desc\":\"\",\"input\":[],\"output\":[{\"id\":\"result\",\"name\":\"开锁成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"开锁失败\",\"1\":\"开锁成功\"}}}],\"required\":false},{\"id\":\"synch_method\",\"name\":\"同步开锁方式\",\"desc\":\"\",\"input\":[],\"output\":[{\"id\":\"fingerprint\",\"name\":\"指纹\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"password\",\"name\":\"密码\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"card\",\"name\":\"卡片\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"face\",\"name\":\"人脸\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}}],\"required\":false},{\"id\":\"delete_face\",\"name\":\"删除人脸\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"format_sd_card\",\"name\":\"格式化SD卡\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"modify_temporary_password\",\"name\":\"修改临时密码\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"times\",\"name\":\"临时密码使用次数\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"take_effect_time\",\"name\":\"临时密码生效时间\",\"define\":{\"type\":\"timestamp\"}},{\"id\":\"invalid_time\",\"name\":\"临时密码失效时间\",\"define\":{\"type\":\"timestamp\"}},{\"id\":\"check_code\",\"name\":\"临时密码校验码\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_fingerprint\",\"name\":\"修改指纹\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_face\",\"name\":\"修改人脸\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_card\",\"name\":\"修改卡\",\"desc\":\"week取值格式1111111，每个字符代表星期一~星期7，选择为1，未选择为0\",\"input\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_password\",\"name\":\"修改密码\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"cancel_add_fingerprint\",\"name\":\"取消添加指纹\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"cancel_add_password\",\"name\":\"取消添加密码\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"cancel_add_card\",\"name\":\"取消添加卡片\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"cancel_add_face\",\"name\":\"取消添加人脸\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"add_fingerprint\",\"name\":\"添加指纹\",\"desc\":\"\",\"input\":[{\"id\":\"wait_timeout\",\"name\":\"等待添加超时时间\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"60\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false},{\"id\":\"add_card\",\"name\":\"添加卡片\",\"desc\":\"\",\"input\":[{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"wait_timeout\",\"name\":\"等待添加超时时间\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"60\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false},{\"id\":\"add_face\",\"name\":\"添加人脸\",\"desc\":\"\",\"input\":[{\"id\":\"wait_timeout\",\"name\":\"等待添加超时时间\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"60\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false},{\"id\":\"add_temporary_password\",\"name\":\"添加临时密码\",\"desc\":\"\",\"input\":[{\"id\":\"times\",\"name\":\"使用次数\",\"define\":{\"type\":\"int\",\"min\":\"-1\",\"max\":\"100\",\"start\":\"-1\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"check_code\",\"name\":\"校验码\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}}],\"required\":false},{\"id\":\"add_password\",\"name\":\"添加密码\",\"desc\":\"\",\"input\":[{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false}],\"profile\":{\"ProductId\":\"5D8QB7GDFD\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1648711426
    //         },
    //         {
    //             "ProductId": "BZ31ZNI9MY",
    //             "Name": "可视对讲门锁",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"manual_lock\",\"name\":\"手动落锁\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未上锁\",\"1\":\"上锁\"}},\"required\":false},{\"id\":\"dormant_switch\",\"name\":\"休眠开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未开启\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"lock_motor_state\",\"name\":\"落锁状态\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未落锁\",\"1\":\"已落锁\"}},\"required\":false},{\"id\":\"child_lock\",\"name\":\"童锁\",\"desc\":\"童锁状态变化上报\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未上锁\",\"1\":\"已上锁\"}},\"required\":false},{\"id\":\"anti_lock_outside\",\"name\":\"上提反锁\",\"desc\":\"在门锁外部，进行上提反锁后上报\",\"mode\":\"r\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未反锁\",\"1\":\"已反锁\"}},\"required\":false},{\"id\":\"reverse_lock\",\"name\":\"反锁\",\"desc\":\"门锁硬件上进行反锁/解除反锁的操作后上报\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解除反锁\",\"1\":\"已反锁\"}},\"required\":false},{\"id\":\"unlock_method\",\"name\":\"开锁方式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"struct\",\"specs\":[{\"id\":\"fingerprint\",\"name\":\"指纹\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"password\",\"name\":\"密码\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"card\",\"name\":\"卡片\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"face\",\"name\":\"人脸\",\"dataType\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}}]},\"required\":false},{\"id\":\"sd_status\",\"name\":\"存储卡状态\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"异常\",\"1\":\"正常\"}},\"required\":false},{\"id\":\"record_switch\",\"name\":\"SD卡录像开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"wireless_awake\",\"name\":\"唤醒状态\",\"desc\":\"设备主动上报当前低功耗是否处于唤醒状态\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"休眠状态\",\"1\":\"唤醒状态\"}},\"required\":false},{\"id\":\"basic_nightvision\",\"name\":\"红外夜视\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"自动切换\",\"1\":\"始终关闭\",\"2\":\"始终打开\"}},\"required\":false},{\"id\":\"automatic_lock\",\"name\":\"自动落锁\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"不自动落锁\",\"1\":\"自动落锁\"}},\"required\":false},{\"id\":\"auto_lock_time\",\"name\":\"落锁延迟时间\",\"desc\":\"自动落锁开启后，需设定每次解锁后距离自动落锁之间的延时，下发给门锁本地保存参数，设置时长1s到30分钟\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"1\",\"max\":\"1800\",\"start\":\"1\",\"step\":\"1\",\"unit\":\"秒\"},\"required\":false},{\"id\":\"open_inside\",\"name\":\"门从内侧打开\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"打开\"}},\"required\":false},{\"id\":\"stay_capture_mode\",\"name\":\"逗留抓拍模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"逗留仅抓拍图片\",\"2\":\"逗留抓拍10s视频\"}},\"required\":false},{\"id\":\"link_mode\",\"name\":\"连接模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"wifi保活\",\"1\":\"休眠模式\",\"2\":\"电源不可用模式\"}},\"required\":false},{\"id\":\"stay_alarm_mode\",\"name\":\"逗留告警模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"关闭\",\"1\":\"普通模式\",\"2\":\"高级模式\"}},\"required\":false},{\"id\":\"stay_trigger_distance\",\"name\":\"逗留感应距离\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"远\",\"2\":\"中\",\"3\":\"近\"}},\"required\":false},{\"id\":\"record_mode\",\"name\":\"录像模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"1\":\"事件触发\",\"2\":\"一直录像\"}},\"required\":false},{\"id\":\"stay_hold_time\",\"name\":\"逗留保持时间\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"5\",\"max\":\"20\",\"start\":\"5\",\"step\":\"5\",\"unit\":\"秒\"},\"required\":false},{\"id\":\"battery_percentage\",\"name\":\"电池电量\",\"desc\":\"-1表示未获取到电量\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"-1\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"百分比\"},\"required\":false},{\"id\":\"ipc_battery_percentage\",\"name\":\"IPC电池电量\",\"desc\":\"-1表示未获取到电量\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"-1\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"百分比\"},\"required\":false},{\"id\":\"dormant_time_set\",\"name\":\"休眠时间设置\",\"desc\":\"设置每天休眠时间段，格式为121212\",\"mode\":\"rw\",\"define\":{\"type\":\"struct\",\"specs\":[{\"id\":\"start_time\",\"name\":\"开始时间\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"截止时间\",\"dataType\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}]},\"required\":false},{\"id\":\"beep_volume\",\"name\":\"导航音量\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"静音\",\"1\":\"低\",\"2\":\"中\",\"3\":\"高\"}},\"required\":false},{\"id\":\"unlock_switch\",\"name\":\"多重验证\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"单一开锁\",\"1\":\"指纹和密码\",\"2\":\"指纹和门卡\",\"3\":\"指纹和人脸\",\"4\":\"密码和门卡\",\"5\":\"密码和人脸\",\"6\":\"门卡和人脸\"}},\"required\":false},{\"id\":\"doorbell_song\",\"name\":\"门铃铃声\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"铃声0\",\"1\":\"铃声1\",\"2\":\"铃声2\",\"3\":\"铃声3\"}},\"required\":false},{\"id\":\"arming_switch\",\"name\":\"离家布防\",\"desc\":\"开启后，门从内侧打开触发报警\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"detect_message\",\"name\":\"侦测消息推送\",\"desc\":\"摄像头侦测人员逗留消息是否上报\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开启\"}},\"required\":false},{\"id\":\"lac\",\"name\":\"地区区域码\",\"desc\":\"地区区域码\",\"required\":true,\"mode\":\"r\",\"define\":{\"type\":\"int\",\"unit\":\"\",\"step\":\"1\",\"min\":\"0\",\"max\":\"32\",\"start\":\"0\"}},{\"id\":\"cid\",\"name\":\"基站码\",\"desc\":\"基站码\",\"required\":true,\"mode\":\"r\",\"define\":{\"type\":\"int\",\"unit\":\"\",\"step\":\"1\",\"min\":\"0\",\"max\":\"32\",\"start\":\"0\"}}],\"events\":[{\"id\":\"doorbell\",\"name\":\"门铃呼叫\",\"desc\":\"有人按门铃上报\",\"type\":\"info\",\"params\":[{\"id\":\"remind\",\"name\":\"门铃呼叫提醒\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"没人按门铃\",\"1\":\"有人按门铃\"}}}],\"required\":false},{\"id\":\"unlock_fingerprint\",\"name\":\"指纹解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}}],\"required\":false},{\"id\":\"unlock_card\",\"name\":\"卡片解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}}],\"required\":false},{\"id\":\"unlock_password\",\"name\":\"密码解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}},{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"unlock_face\",\"name\":\"人脸解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"脸部id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"未开锁\",\"1\":\"开锁\"}}}],\"required\":false},{\"id\":\"sd_format_state\",\"name\":\"SD格式化状态上报\",\"desc\":\"\",\"type\":\"alert\",\"params\":[{\"id\":\"result\",\"name\":\"格式化成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"格式化失败\",\"1\":\"格式化成功\"}}}],\"required\":false},{\"id\":\"alarm_lock\",\"name\":\"门锁告警\",\"desc\":\"\",\"type\":\"alert\",\"params\":[{\"id\":\"alarm_tip\",\"name\":\"告警提示\",\"define\":{\"type\":\"enum\",\"mapping\":{\"0\":\"错误指纹\",\"1\":\"错误密码\",\"2\":\"错误卡\",\"3\":\"低电量\",\"4\":\"门未锁好\",\"5\":\"门未关\",\"6\":\"锁被撬\",\"7\":\"布防模式被打破\"}}}],\"required\":false},{\"id\":\"unlock_key\",\"name\":\"钥匙解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}}],\"required\":false},{\"id\":\"unlock_temporary_password\",\"name\":\"临时密码解锁\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"state\",\"name\":\"开锁状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"解锁失败\",\"1\":\"解锁成功\"}}},{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"unlock_temporary_clear_single\",\"name\":\"单条临时密码清空上报\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"unlock_temporary_clear\",\"name\":\"临时密码清空上报\",\"desc\":\"\",\"type\":\"alert\",\"params\":[],\"required\":false},{\"id\":\"add_fingerprint_result\",\"name\":\"上报指纹添加成功状态\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"add_face_result\",\"name\":\"上报人脸添加成功状态\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"add_password_result\",\"name\":\"上报密码添加成功状态\",\"desc\":\"\",\"type\":\"alert\",\"params\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false},{\"id\":\"add_card_result\",\"name\":\"上报卡片添加成功状态\",\"desc\":\"\",\"type\":\"info\",\"params\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"添加成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"required\":false}],\"actions\":[{\"id\":\"delete_fingerprint\",\"name\":\"删除指纹\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"delete_card\",\"name\":\"删除卡片\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"卡id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"delete_password\",\"name\":\"删除密码\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"unlock_remote\",\"name\":\"远程解锁\",\"desc\":\"\",\"input\":[],\"output\":[{\"id\":\"result\",\"name\":\"开锁成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"开锁失败\",\"1\":\"开锁成功\"}}}],\"required\":false},{\"id\":\"synch_method\",\"name\":\"同步开锁方式\",\"desc\":\"\",\"input\":[],\"output\":[{\"id\":\"fingerprint\",\"name\":\"指纹\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"password\",\"name\":\"密码\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"card\",\"name\":\"卡片\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}},{\"id\":\"face\",\"name\":\"人脸\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关闭\",\"1\":\"开通\"}}}],\"required\":false},{\"id\":\"delete_face\",\"name\":\"删除人脸\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[{\"id\":\"result\",\"name\":\"删除状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"删除失败\",\"1\":\"删除成功\"}}}],\"required\":false},{\"id\":\"format_sd_card\",\"name\":\"格式化SD卡\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"modify_temporary_password\",\"name\":\"修改临时密码\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"times\",\"name\":\"临时密码使用次数\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"take_effect_time\",\"name\":\"临时密码生效时间\",\"define\":{\"type\":\"timestamp\"}},{\"id\":\"invalid_time\",\"name\":\"临时密码失效时间\",\"define\":{\"type\":\"timestamp\"}},{\"id\":\"check_code\",\"name\":\"临时密码校验码\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_fingerprint\",\"name\":\"修改指纹\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"指纹id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_face\",\"name\":\"修改人脸\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"人脸id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_card\",\"name\":\"修改卡\",\"desc\":\"week取值格式1111111，每个字符代表星期一~星期7，选择为1，未选择为0\",\"input\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"卡片id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"modify_password\",\"name\":\"修改密码\",\"desc\":\"\",\"input\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"修改失败\",\"1\":\"修改成功\"}}}],\"required\":false},{\"id\":\"cancel_add_fingerprint\",\"name\":\"取消添加指纹\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"cancel_add_password\",\"name\":\"取消添加密码\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"cancel_add_card\",\"name\":\"取消添加卡片\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"cancel_add_face\",\"name\":\"取消添加人脸\",\"desc\":\"\",\"input\":[],\"output\":[],\"required\":false},{\"id\":\"add_fingerprint\",\"name\":\"添加指纹\",\"desc\":\"\",\"input\":[{\"id\":\"wait_timeout\",\"name\":\"等待添加超时时间\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"60\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false},{\"id\":\"add_card\",\"name\":\"添加卡片\",\"desc\":\"\",\"input\":[{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"wait_timeout\",\"name\":\"等待添加超时时间\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"60\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false},{\"id\":\"add_face\",\"name\":\"添加人脸\",\"desc\":\"\",\"input\":[{\"id\":\"wait_timeout\",\"name\":\"等待添加超时时间\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"60\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false},{\"id\":\"add_temporary_password\",\"name\":\"添加临时密码\",\"desc\":\"\",\"input\":[{\"id\":\"times\",\"name\":\"使用次数\",\"define\":{\"type\":\"int\",\"min\":\"-1\",\"max\":\"100\",\"start\":\"-1\",\"step\":\"1\",\"unit\":\"\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"check_code\",\"name\":\"校验码\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}}],\"output\":[{\"id\":\"id\",\"name\":\"密码id\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}},{\"id\":\"result\",\"name\":\"修改成功状态\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"添加失败\",\"1\":\"添加成功\"}}}],\"required\":false},{\"id\":\"add_password\",\"name\":\"添加密码\",\"desc\":\"\",\"input\":[{\"id\":\"week\",\"name\":\"生效星期\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"7\"}},{\"id\":\"take_effect_time\",\"name\":\"生效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"invalid_time\",\"name\":\"失效时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"14\"}},{\"id\":\"start_time\",\"name\":\"每日可用开始时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"end_time\",\"name\":\"每日可用结止时间\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"6\"}},{\"id\":\"token\",\"name\":\"请求标识\",\"define\":{\"type\":\"string\",\"min\":\"0\",\"max\":\"2048\"}}],\"output\":[],\"required\":false}],\"profile\":{\"ProductId\":\"BZ31ZNI9MY\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "cellular",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1648431475
    //         },
    //         {
    //             "ProductId": "59T13CT7HD",
    //             "Name": "水浸报警器",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"alarm_switch\",\"name\":\"报警开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"muffling\",\"name\":\"消音\",\"desc\":\"0：不消音； 1：消音\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"不消音\",\"1\":\"消音\"}},\"required\":false},{\"id\":\"sensor_probe\",\"name\":\"传感器探头状态\",\"desc\":\"枚举值: normal, fault\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"normal\":\"正常\",\"fault\":\"错误\"}},\"required\":false},{\"id\":\"tamper_alarm\",\"name\":\"防拆报警\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"alarm_vol\",\"name\":\"报警音量\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"low\":\"low\",\"middle\":\"middle\",\"high\":\"high\",\"mute\":\"mute\"}},\"required\":false},{\"id\":\"alarm_ringtone\",\"name\":\"报警铃声\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"ringtone_1\":\"ringtone_1\",\"ringtone_2\":\"ringtone_2\",\"ringtone_3\":\"ringtone_3\",\"ringtone_4\":\"ringtone_4\",\"ringtone_5\":\"ringtone_5\"}},\"required\":false},{\"id\":\"battery_state\",\"name\":\"电池电量状态\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"low\":\"low\",\"middle\":\"middle\",\"high\":\"high\"}},\"required\":false},{\"id\":\"battery_percentage\",\"name\":\"电池电量\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"%\"},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"59T13CT7HD\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi-ble",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1642870930
    //         },
    //         {
    //             "ProductId": "B0KPO3OMYT",
    //             "Name": "空调",
    //             "Description": "",
    //             "State": "",
    //             "DataTemplate": "{\"version\":\"1.0\",\"properties\":[{\"id\":\"power_switch\",\"name\":\"电源开关\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"child_lock\",\"name\":\"童锁\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"auto\",\"name\":\"自动\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"eco\",\"name\":\"ECO模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"drying\",\"name\":\"烘干\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}}},{\"id\":\"ventilation\",\"name\":\"换气\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"heat\",\"name\":\"加热\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"anion\",\"name\":\"负离子\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"sleep\",\"name\":\"睡眠\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"beep\",\"name\":\"蜂鸣\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"light\",\"name\":\"灯光\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"cleaning\",\"name\":\"清洁\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_vertical\",\"name\":\"上下摆风\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"switch_horizontal\",\"name\":\"左右摆风\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"display\",\"name\":\"屏显\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"health\",\"name\":\"健康\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"fresh_air_valve\",\"name\":\"新风阀\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"uv\",\"name\":\"UV\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"swing_3d\",\"name\":\"3D扫风\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"bool\",\"mapping\":{\"0\":\"关\",\"1\":\"开\"}},\"required\":false},{\"id\":\"temp_unit_convert\",\"name\":\"温标切换\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"celsius\":\"摄氏度\",\"fahrenheit\":\"华氏度\"}},\"required\":false},{\"id\":\"temp_current\",\"name\":\"当前温度\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"-20\",\"max\":\"50\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"°C\"},\"required\":false},{\"id\":\"temp_current_f\",\"name\":\"当前温度\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"-40\",\"max\":\"200\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"°F\"},\"required\":false},{\"id\":\"temp_set\",\"name\":\"温度设置\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"50\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"°C\"},\"required\":false},{\"id\":\"temp_set_f\",\"name\":\"温度设置\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"°F\"},\"required\":false},{\"id\":\"power_consumption\",\"name\":\"耗电量\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"999999\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"kW-h\"},\"required\":false},{\"id\":\"humidity_current\",\"name\":\"当前湿度\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"%\"},\"required\":false},{\"id\":\"humidity_set\",\"name\":\"湿度设置\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"100\",\"start\":\"0\",\"step\":\"1\",\"unit\":\"%\"},\"required\":false},{\"id\":\"angle_vertical\",\"name\":\"上下摆风角度\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"180\",\"start\":\"0\",\"step\":\"1\"},\"required\":false},{\"id\":\"angle_horizontal\",\"name\":\"左右摆风角度\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"int\",\"min\":\"0\",\"max\":\"180\",\"start\":\"0\",\"step\":\"1\"},\"required\":false},{\"id\":\"wind_shake\",\"name\":\"风摆\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"horizontal\":\"水平\",\"vertical\":\"垂直\"}},\"required\":false},{\"id\":\"status\",\"name\":\"状态\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"heating\":\"加热中\",\"cooling\":\"制冷中\",\"ventilation\":\"换气中\",\"off\":\"关闭\",\"auto\":\"自动清洁\",\"arefaction\":\"除湿中\",\"wind\":\"送风中\",\"eco\":\"ECO\"}},\"required\":false},{\"id\":\"fault\",\"name\":\"故障告警\",\"desc\":\"\",\"mode\":\"r\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"normal\":\"正常\",\"fault\":\"故障\"}},\"required\":false},{\"id\":\"gear_vertical\",\"name\":\"上下摆风档位\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"off\":\"关闭\",\"opposite\":\"相向摆风\",\"same\":\"同向摆风\"}},\"required\":false},{\"id\":\"gear_horizontal\",\"name\":\"左右摆风档位\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"off\":\"关闭\",\"opposite\":\"相向摆风\",\"same\":\"同向摆风\"}},\"required\":false},{\"id\":\"mode\",\"name\":\"模式\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"cold\":\"制冷\",\"hot\":\"制热\",\"wind\":\"送风\",\"auto\":\"自动\",\"eco\":\"ECO\",\"arefaction\":\"除湿\",\"floor_heat\":\"地暖\",\"floor_heat_and_heat\":\"辅热\"}},\"required\":false},{\"id\":\"fan_speed_enum\",\"name\":\"风速\",\"desc\":\"\",\"mode\":\"rw\",\"define\":{\"type\":\"stringenum\",\"mapping\":{\"mute\":\"静音\",\"natural\":\"自然\",\"strong\":\"强力\",\"auto\":\"自动\",\"sleep\":\"睡眠\",\"health\":\"健康\",\"low\":\"低风\",\"middle\":\"中风\",\"high\":\"高风\"}},\"required\":false}],\"events\":[],\"actions\":[],\"profile\":{\"ProductId\":\"B0KPO3OMYT\",\"CategoryId\":\"1\"}}",
    //             "AppTemplate": "",
    //             "NetType": "wifi",
    //             "CategoryId": 1,
    //             "CategoryKey": "UserDefined",
    //             "ProductType": 0,
    //             "IconUrl": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "IconUrlGrid": "https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png",
    //             "DevStatus": "dev",
    //             "UpdateTime": 1644491733
    //         }],
    //         "RequestId": "3xWtg@vWok"
    //     }
    // }.data.Products;

      const data = Products.filter(item => category[type].includes(item.CategoryId)).map(item => item.ProductId);
      const _data = DeviceList.filter(item => data.includes(item.ProductId))
      setList(_data);
      // setList(DeviceList);
    console.log("aaaaaaaaaa------------>",{data,_data,type})

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
          <Device {...props} dataSource={dataSource} selectedIndex={selectedIndex} setValue={setSelectedValue} type={'white'} />
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
