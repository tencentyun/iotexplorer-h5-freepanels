import React from 'react';
import './LoginAuthPage.less';
import { iconKugouAuth } from '@icons/kugou';

export const LoginAuthPage = ({ loginAuth }) => (
  <div className="page-loginAuth">
    <img className="iconKugouAuth" src={iconKugouAuth}/>
    <p className="title">酷狗音乐未授权</p>
    <p className="sub-title">您还没有进行“酷狗音乐”授权，请前往授权</p>
    <div className="btn-auth" onClick={loginAuth}>前往授权</div>
  </div>
);
