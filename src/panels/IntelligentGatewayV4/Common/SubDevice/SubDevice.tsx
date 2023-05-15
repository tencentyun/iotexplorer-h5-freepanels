import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Cell } from '@custom/Cell';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { SearchBar } from 'antd-mobile';
// const a = [{ AliasName: 'test', ProductId: '516IR4HEA8' }]
export function SubDevice(props) {
  const [list, setList] = useState([]);
  const [defaultList, setDefaultList] = useState([]);
  const { deviceInfo = {}, history } = { ...props }

  const getDeviceList = async () => {
    try {
      const { DeviceList } = await sdk.requestTokenApi('AppGetFamilySubDeviceList', {
        Action: 'AppGetFamilySubDeviceList',
        AccessToken: 'AccessToken',
        RequestId: uuidv4(),
        GatewayProductId: deviceInfo.ProductId,
        GatewayDeviceName: deviceInfo.DeviceName,
        Offset: 1,
        Limit: 50
      });
      setList(DeviceList);
      setDefaultList(DeviceList);
    } catch (err) {
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
    </div>
  );
}

