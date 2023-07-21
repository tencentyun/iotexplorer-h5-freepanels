import React, { useEffect, useState } from 'react';
import { Cell } from '@custom/Cell';
import { Btn } from '@custom/Btn';
import { SearchBar } from 'antd-mobile';
import { useTitle } from '@hooks/useTitle';

/**
 *  子设备列表
 */

export function SubDevice(props) {
  useTitle('子设备列表')
  const [list, setList] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const [message, setMessage] = useState('');
  const { deviceInfo = {}, history, sdk, log } = props;

  // 原有接口
  // const getDeviceList = async () => {
  //   try {
  //     const { DeviceList } = await sdk.requestTokenApi('AppGetFamilySubDeviceList', {
  //       Action: 'AppGetFamilySubDeviceList',
  //       AccessToken: 'AccessToken',
  //       // RequestId: uuidv4(),
  //       GatewayProductId: deviceInfo.ProductId,
  //       GatewayDeviceName: deviceInfo.DeviceName,
  //       Offset: 1,
  //       Limit: 50
  //     });
  //     log.mi("获取到的制设备数据:", DeviceList)

  //     setList(DeviceList);
  //     setDefaultList(DeviceList);
  //   } catch (err) {
  //     console.error('get info fail', err);
  //     setMessage(err)
  //   }
  // };

  // 最近提供接口  但是不能通
  const getDeviceList = async () => {
    try {
      const { DeviceList } = await sdk.getSubDeviceList();
      setList(DeviceList);
      setMessage('');
      setDefaultList(DeviceList);
    } catch (err) {
      setMessage(err);
      console.error('get info fail', err);
    }
  };

  useEffect(() => {
    getDeviceList();
    return () => {
      setList([])
      setDefaultList([]);
    }
  }, [])
  return (
    <div className="sub-device">
      {list.length ? <>
        <div className="top">
          <SearchBar
            placeholder="搜索"
            onSearch={(value) => {
              const newList = list.filter(item => item.AliasName.includes(value));
              setList(newList)
            }}
            onChange={value => !value && setList(defaultList)}
          />
        </div>
        <div className="content">
          {list.map(({ AliasName, ProductId }, index) => <Cell
            key={index}
            title={AliasName}
            prefixIcon=''
            ele={''}
            onClick={() => {
              history.push(`https://iot.cloud.tencent.com/h5panel/developing?deviceName=${AliasName}&productId=${ProductId}`)
            }}
            isLink={true}
            className="border"
          ></Cell>)}
        </div>
      </> : <div className="no-page">
        <div className="bg"></div>
        <div className="title">暂未添加设备</div>
        <div className="title">{message}</div>
      </div>}

      <div className="operator">
        <Btn>+添加子设备</Btn>
      </div>
    </div>
  );
}

