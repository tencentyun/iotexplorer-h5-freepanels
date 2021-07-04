import React, { useEffect, useState } from 'react';
import './DeviceInfo.less';


const sdk = window.h5PanelSdk;

export const DeviceInfo = () => {
  const [controlJSON, setControlJSON] = useState('{}');
  const [reportJSON, setReportJSON] = useState('{}');
  const [deviceStatus, setDeviceStatus] = useState<number>(sdk.deviceStatus);

  useEffect(() => {
    sdk.on('wsControl', (res: any) => setLiveData(res.deviceData, 'control'));
    sdk.on('wsReport', (res: any) => setLiveData(res.deviceData, 'report'));
    sdk.on('wsStatusChange', ({ deviceStatus }: any) => {
      setDeviceStatus(deviceStatus);
    });
    return () => {
      sdk.off('wsControl');
      sdk.off('wsReport');
      sdk.off('wsStatusChange');
    };
  }, []);

  function setLiveData(deviceData: any, type: string) {
    console.log(type);
    for (const key in deviceData) {
      deviceData[key] = deviceData[key].Value;
    }
    const str = JSON.stringify(deviceData, null, 2);
    if (type === 'control') setControlJSON(str);
    if (type === 'report') setReportJSON(str);
  }

  return (
    <div className="info-panel">
      <h3 className="title">设备信息</h3>
      <p>设备ID：deviceId={sdk.deviceId}</p>
      <p>产品ID：productId={sdk.productId}</p>
      <p>设备名称：deviceName={sdk.deviceName}</p>
      <p>在线状态：deviceStatus={deviceStatus}
        -
        {
          deviceStatus ? <span className="deviceStatus-online">在线</span>
            : <span className="deviceStatus-offline">离线</span>
        }
      </p>

      <div className="box-live">
        <div>
          <h4>Control</h4>
          <pre>{controlJSON}</pre>
        </div>
        <div>
          <h4>Report</h4>
          <pre>{reportJSON}</pre>
        </div>
      </div>
    </div>
  );
};
