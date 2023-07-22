import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
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

      // const DeviceList = [
      //   {
      //     "ProductId": "LAEG4YJE1A",
      //     "DeviceName": "subdev2",    //子设备的deviceName
      //     "DeviceId": "LAEG4YJE1A/subdev2", //子设备的deviceId
      //     "AliasName": "AliasName",
      //     "IconUrl": "",
      //     "BindStatus": 0   //未绑定到家庭
      //   }, {
      //     "ProductId": "LAEG4YJE1A",
      //     "DeviceName": "subdev1",
      //     "DeviceId": "LAEG4YJE1A/subdev1",
      //     "AliasName": "AliasName1",
      //     "IconUrl": "",
      //     "BindStatus": 1,  //已经绑定到家庭
      //     onLine: true,
      //   }
      // ];




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
        {/* <div className="top">
          <SearchBar
            placeholder="搜索"
            onSearch={(value) => {
              const newList = list.filter(item => item.AliasName.includes(value));
              setList(newList)
            }}
            onChange={value => !value && setList(defaultList)}
          />
        </div> */}
        <div className="content">
          {
            list.map(({ AliasName, ProductId, DeviceName, IconUrl, onLine }) => {
              return <div className="bind-production" onClick={() => {
                history.push(`https://iot.cloud.tencent.com/h5panel/developing?deviceName=${AliasName}&productId=${ProductId}`)
              }}>
                <div className='left-content center'>
                  {/* 图标 */}
                  <div>
                    {
                      IconUrl ? <img src={IconUrl} width={56} height={56} /> :
                        <img src="https://main.qcloudimg.com/raw/05ca75c84bb7c1e2dbc9d762cf3af1f1.png" width={56} height={56} />
                    }
                  </div>
                  <div className='tite-content'>
                    {/* 名称 */}
                    <div className="name-flag">{AliasName}</div>
                    {/* 产品名称 */}
                    <div>{DeviceName}</div>
                  </div>
                </div>
                <div className={` center bind-on-line ${onLine ? 'on-line' : 'off-line'}`}>
                  {onLine ? '在线' : '离线'}
                  <div className='arrow-icon'> <Icon name="arrow"></Icon></div>
                </div>
              </div >

            })
          }

          {/* {list.map(({ AliasName, ProductId }, index) => <Cell
            key={index}
            title={AliasName}
            prefixIcon=''
            ele={''}
            onClick={() => {
              history.push(`https://iot.cloud.tencent.com/h5panel/developing?deviceName=${AliasName}&productId=${ProductId}`)
            }}
            isLink={true}
            className="border"
          ></Cell>)} */}
        </div>
      </> : <div className="no-page">
        <div className="bg"></div>
        <div className="title">暂未添加设备</div>
        <div className="title">{message}</div>
      </div>
      }

      <div className="fexid-btn center" onClick={() => history?.push('/search/device', { start: Math.random() })}>+添加子设备</div>
    </div >
  );
}

