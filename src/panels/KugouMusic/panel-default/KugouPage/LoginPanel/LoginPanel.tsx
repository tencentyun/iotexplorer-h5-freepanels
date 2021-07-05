import React from 'react';
import './LoginPanel.less';
import { Button } from '../../components/Button';

const sdk = window.h5PanelSdk;
const tmeSdk = window.h5PanelSdk.TMESdk.h5 as TMESDK;
export const LoginPanel = () => (
    <div className="login-panel">
      {/* <Button onClick={() => {*/}
      {/*  sdk.showDeviceDetail();*/}
      {/* }}>*/}
      {/*  H5 设备详情视图*/}
      {/* </Button>*/}

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
          tmeSdk.logout()
            .then(res => console.log(res))
            .catch(err => sdk.tips.alert(err.error_msg));
        }}
      >
        用户登出
      </Button>

      <Button onClick={async () => {
        tmeSdk.getUserInfo()
          .then(res => console.log(res))
          .catch((err) => {
            console.error(err);
            sdk.tips.alert(err.error_msg);
          });
      }}>
        获取用户信息
      </Button>

      <Button onClick={async () => {
        tmeSdk.checkDeviceAuth()
          .then(res => console.log(res))
          .catch(err => sdk.tips.alert(err.error_msg));
      }}>
        校验设备授权
      </Button>
    </div>
);
