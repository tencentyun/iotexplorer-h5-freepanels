import React from 'react';
import './LoginAuthPage.less';

export const LoginAuthPage = ({ loginAuth }) => (
    <div className='page-loginAuth'>
      <main>
        <p className="title">酷狗音乐未授权</p>
        <p className="subTitle">您还没有进行“酷狗音乐”授权，请前往授权</p>
        <div className="bottomBtn" onClick={loginAuth}>确定</div>
      </main>
    </div>
);
