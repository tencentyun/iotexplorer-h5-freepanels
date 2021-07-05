import React from 'react';
import './LoginPanel.less';
import { Button } from '../../components/Button';

const sdk = window.h5PanelSdk;
const tmeSdk = window.h5PanelSdk.TMESdk.h5 as TMESDK;
export const LoginPanel = () => {
  return (
    <div className="login-panel">
      <Button onClick={() => {
        sdk.showDeviceDetail();
      }}>
        H5 设备详情视图
      </Button>

      <Button
        onClick={async () => {
          try {
            const res = await tmeSdk.login();
            sdk.tips.alert(res.error_msg);
          } catch (err) {
            console.error('登录报错', err);
            sdk.tips.alert(err.error_msg);
          }
        }}
      >
        酷狗登录
      </Button>

      <Button
        onClick={async () => {
          const res = await tmeSdk.logout();
          console.log(res);
        }}
      >
        用户登出
      </Button>

      <Button onClick={async () => {
        const res = await tmeSdk.getUserInfo();
        console.log(res);
      }}>
        获取用户信息
      </Button>

      <Button onClick={async () => {
        const res = await tmeSdk.checkDeviceAuth();
        console.log(res);
      }}>
        校验设备授权
      </Button>
    </div>
  );
};
