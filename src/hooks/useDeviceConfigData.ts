
import { useEffect, useState } from 'react';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

// 持久化设备数据操作
const DEVICE_CONFIG_API = {
  SET: 'AppSetDeviceConfig',
  GET: 'AppGetDeviceConfig'
};


export const useDeviceConfig = (deviceKey) => {

  const [deviceConfigData, setDevice] = useState({});

  useEffect(() => {
    getDeviceConfigData(deviceKey);
  }, [deviceKey]);


  const doConfig = async (action, data = {}) => {
    let key = sdk.deviceId;
    const param = {
      DeviceKey: key,
      DeviceId: key,
      ...data
    }
    const result = await sdk.requestTokenApi(action, param);
    return JSON.parse(result?.Configs?.[key] || '{}');
  }

  /**
   * 
   * @param DeviceKey  是字段对应key
   */
  const getDeviceConfigData = async (DeviceKey) => {
    const result = await doConfig(DEVICE_CONFIG_API.GET);
    setDevice(result);
    console.log('requestTokenApi===== AppGetDeviceConfig =========', result);
    return DeviceKey ? result[DeviceKey] : result;
  };


  const setDeviceConfigData = async (DeviceKey, DeviceValue) => {
    
    let param = {
      DeviceValue: JSON.stringify({[DeviceKey]:DeviceValue}),
    }
    const result = await doConfig(DEVICE_CONFIG_API.SET, param);
    console.log('requestTokenApi===== AppSetDeviceConfig =========',result,param);
    return result;
  };

  const doDeviceConfigData = async (DeviceKey, DeviceValue) => {
    await setDeviceConfigData(DeviceKey, DeviceValue)
    let result = await getDeviceConfigData(DeviceKey);
    return result;
  }

  return [{ deviceConfigData, getDeviceConfigData, doDeviceConfigData, setDeviceConfigData }];
};
