import h5PanelSdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useEffect, useState } from 'react';

export function useDeviceStatus({
  deviceId,
}: {
  deviceId: string;
}) {
  const [status, setStatus] = useState(h5PanelSdk.deviceId === deviceId ? h5PanelSdk.deviceStatus : 1);
  const [loading, setLoading] = useState(false);

  const handleWsStatusChange = ({ deviceId: deviceIdFromEvent, deviceStatus }: {
    deviceId: string;
    deviceStatus: number;
  }) => {
    if (deviceId === deviceIdFromEvent) {
      setStatus(deviceStatus);
    }
  };

  const refresh = () => {
    if (loading) return;
    setLoading(true);
    h5PanelSdk.getDeviceStatus({
      deviceId,
    })
      .then((status) => {
        console.log('[useDeviceStatus] 查询设备在线状态成功', status);
        setStatus(status);
        setLoading(false);
      })
      .catch((err) => {
        console.error('[useDeviceStatus] 查询设备在线状态失败', err);
        setLoading(false);
      });
  };

  useEffect(() => {
    h5PanelSdk.on('wsStatusChange', handleWsStatusChange);
    refresh();

    return () => {
      h5PanelSdk.off('wsStatusChange', handleWsStatusChange);
    };
  }, [deviceId]);

  return [{ status, loading }, refresh] as const;
}
