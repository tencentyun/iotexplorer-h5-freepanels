import React, { useMemo } from 'react';
import { useHistory } from 'react-router-dom';
import { Button, Card, Space } from 'antd-mobile';
import { DeviceDataState } from '../../../../hooks/useDeviceData';
import './DevicePanel.less';

const sdk = window.h5PanelSdk as any;
const windowHeight = window.innerHeight || document.documentElement.clientHeight;

export function DevicePanel({
  deviceState,
}: {
  deviceState: DeviceDataState;
}) {
  const history = useHistory();

  const qqMusicServiceEnabled = useMemo(() => {
    if (typeof sdk.qqMusic.isQQMusicServiceEnabled === 'function') {
      return sdk.qqMusic.isQQMusicServiceEnabled();
    }

    return true;
  }, []);

  // 打开设备详情
  const goDeviceDetailPage = () => {
    sdk.goDeviceDetailPage();
  };

  // QQ 音乐登录授权
  const goAuthPage = () => {
    try {
      sdk.qqMusic.goAuthPage();
    } catch (error) {
      sdk.tips.showError(error);
    }
  };

  // QQ 音乐查询授权状态
  const getAuthStatus = () => {
    sdk.tips.showLoading('查询中');
    sdk.qqMusic.getAuthStatus()
      .then((authStatus: boolean) => {
        if (authStatus) {
          sdk.tips.showSuccess('当前用户已授权 QQ 音乐');
        } else {
          sdk.tips.showInfo('当前用户未授权 QQ 音乐');
        }
      })
      .catch((err: any) => {
        sdk.tips.showError(err);
      });
  };

  const goCurrentPlaying = () => {
    history.push('/playing');
  };

  const goSelfSongList = () => {
    history.push('/selfSongList');
  };

  const goSearch = () => {
    history.push('/search');
  };

  const goNoLoginArea = () => {
    history.push('/noLoginArea');
  };

  const goDailySongs = () => {
    history.push('/dailySongs');
  };

  const goIndividualRadio = () => {
    history.push('/individualRadio');
  };

  return (
    <div>
      <div
        className="common-page-container device-panel"
        style={{ minHeight: `${windowHeight}px` }}
      >
        <Card title="设备">
          <div>
            <div className="text-row">设备 ID: {sdk.deviceId}</div>
            <div className="text-row">在线状态: {deviceState.deviceStatus}</div>
          </div>
          <div>
            <Button color="primary" fill="outline" onClick={goDeviceDetailPage}>
              打开设备详情
            </Button>
          </div>
        </Card>

        <Card title="QQ 音乐">
          {!qqMusicServiceEnabled && (
            <div style={{ marginBottom: 8, color: '#ff4d4f' }}>当前产品未开通 QQ 音乐增值服务</div>
          )}
          <Space wrap>
            <Button color="primary" fill="outline" onClick={goAuthPage}>
              登录授权
            </Button>

            <Button fill="outline" onClick={getAuthStatus}>
              查询授权状态
            </Button>
          </Space>
        </Card>

        <Card title="Demo">
          <Space wrap direction="vertical" style={{ width: '100%' }}>
            <Button color="primary" fill="outline" block onClick={goCurrentPlaying}>
              音箱首页
            </Button>

            <Button fill="outline" block onClick={goSelfSongList}>
              API: 我的收藏歌单
            </Button>

            <Button fill="outline" block onClick={goSearch}>
              API: 搜索
            </Button>

            <Button fill="outline" block onClick={goNoLoginArea}>
              API: 免登录专区
            </Button>

            <Button fill="outline" block onClick={goDailySongs}>
              API: 每日推荐30首
            </Button>

            <Button fill="outline" block onClick={goIndividualRadio}>
              API: 个性化推荐歌曲
            </Button>
          </Space>
        </Card>
      </div>
    </div>
  );
}
