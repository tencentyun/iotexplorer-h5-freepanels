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
        tmeSdk.checkDeviceAuth()
          .then(() => {
            sdk.tips.alert('用户已登录');
          })
          .catch(async () => {
            try {
              const res = await tmeSdk.login();
              sdk.tips.alert(res.error_msg);
            } catch (err) {
              console.error('登录报错', err);
              sdk.tips.alert(err.error_msg);
            }
          });
      }}
    >
      酷狗登录dev
    </Button>

    <Button
      onClick={async () => {
        tmeSdk.logout()
          .then(() => sdk.tips.alert('操作成功'))
          .catch(err => sdk.tips.alert(err.error_msg));
      }}
    >
      用户登出
    </Button>

    <Button onClick={async () => {
      tmeSdk.getUserInfo()
        .then(res => {
          console.log(res);
          sdk.tips.alert(JSON.stringify(res.data));
        })
        .catch((err) => {
          console.error(err);
          sdk.tips.alert(err.error_msg);
        });
    }}>
      获取用户信息
    </Button>

    <Button onClick={async () => {
      tmeSdk.checkDeviceAuth()
        .then(res => {
          console.log(res);
          sdk.tips.alert(JSON.stringify(res.data));
        })
        .catch(err => sdk.tips.alert(err.error_msg));
    }}>
      校验设备授权
    </Button>
  </div>
);
