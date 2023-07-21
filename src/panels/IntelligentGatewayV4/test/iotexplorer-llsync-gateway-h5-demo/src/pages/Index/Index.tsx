/* eslint-disable no-nested-ternary */
import { useRequest } from 'ahooks';
import h5PanelSdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useNavigate } from 'react-router-dom';
import { Icon } from 'tdesign-icons-react';
import { Cell, CellGroup, Divider, Fab, Loading, Tag } from 'tdesign-mobile-react';
import { useDeviceStatus } from '../../hooks/useDeviceStatus';
import { getErrorMsg } from '../../utils';

import './Index.css';

h5PanelSdk.productInfo.ProductType = 5;

export function Index() {
  const navigate = useNavigate();

  const [{ status: deviceStatus, loading: deviceStatusLoading }, refreshDeviceStatus] = useDeviceStatus({
    deviceId: h5PanelSdk.deviceId,
  });

  const subDevListReq = useRequest(() => h5PanelSdk.getSubDeviceList());

  const isOnline = deviceStatus > 0;

  const goDeviceDetail = () => {
    h5PanelSdk.goDeviceDetailPage();
  };

  const goDevicePanel = (deviceId: string) => {
    h5PanelSdk.goDevicePanelPage(deviceId);
  };

  const goAddSubDevice = () => {
    navigate('/addSubDevice');
  };

  return (
    <div className="page-index">
      <CellGroup>
        <Cell
          title={String(h5PanelSdk.deviceDisplayName)}
          description={<>
            {String(h5PanelSdk.deviceId)}
          </>}
          image={
            h5PanelSdk.productInfo?.IconUrl
              ? <img src={h5PanelSdk.productInfo?.IconUrl} width={56} height={56} />
              : null
          }
          arrow
          onClick={goDeviceDetail}
        />
        <Cell
          title="在线状态"
          note={<>
            {deviceStatusLoading ? <Loading theme="spinner" /> : (
              isOnline ? <Tag theme="success">在线</Tag> : <Tag theme="warning">离线</Tag>
            )}
          </>}
          onClick={() => {
            if (!deviceStatusLoading) {
              refreshDeviceStatus();
            }
          }}
        />
      </CellGroup>

      <Divider align="center" content="子设备" style={{
        margin: '16px',
      }}></Divider>

      <CellGroup>
        {subDevListReq.loading && (
          <Cell title={<Loading theme="spinner" text="加载中..." />} />
        )}
        {!!subDevListReq.error && (
          <Cell title={<Loading theme="error" text={getErrorMsg(subDevListReq.error)} />} />
        )}
        {!!subDevListReq.data?.subDeviceList && (
          <>
            {
              subDevListReq.data?.subDeviceList.map(device => (
                <Cell
                  key={device.DeviceId}
                  title={<>
                    {String(device.AliasName)}
                  </>}
                  description={<>
                    {String(device.DeviceId)}
                  </>}
                  image={
                    device.IconUrl
                      ? <img src={device.IconUrl} width={56} height={56} />
                      : null
                  }
                  arrow
                  onClick={() => goDevicePanel(device.DeviceId)}
                />
              ))
            }
          </>
        )}
        {!!subDevListReq.data?.syncFailList && (
          <>
            {
              subDevListReq.data?.syncFailList.map(device => (
                <Cell
                  key={device.DeviceId}
                  title={String(device.AliasName)}
                  description={<>
                    {String(device.DeviceId)}
                    <Tag theme="warning">未添加到家庭</Tag>
                  </>}
                  image={
                    device.IconUrl
                      ? <img src={device.IconUrl} width={56} height={56} />
                      : null
                  }
                  arrow
                  onClick={() => goDevicePanel(device.DeviceId)}
                />
              ))
            }
          </>
        )}
      </CellGroup>

      <Fab
        icon={<Icon name="add" />}
        text="添加子设备"
        style={{ right: '16px', bottom: '32px', position: 'fixed' }}
        buttonProps={{ size: 'large' }}
        onClick={goAddSubDevice}
      />
    </div>
  );
}
