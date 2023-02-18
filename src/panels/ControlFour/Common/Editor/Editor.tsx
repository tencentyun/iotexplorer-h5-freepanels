import React, { useEffect, useState } from 'react';
import { Layout } from '../Layout';
import { Btn } from '@custom/Btn';
import { Icon } from '@custom/Icon';
import { Popup } from '@custom/Popup';

export function Editor({ ...props }) {
  const { history: { query },  } = { ...props };
  const [infoVisible, setInfoVisible] = useState(false);

  useEffect(() => {
    if (!query.isEdit || !JSON.parse(query.isEdit)) {
      setInfoVisible(true);
    }
  }, [query.isEdit])
  return (
    <div className="editor-layout">
      <div className="header">
        <span>点击卡片可进行编辑</span>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ marginRight: 4 }}>布局说明</span>
          <div onClick={() => setInfoVisible(true)}><Icon name="info"></Icon></div>
        </div>
      </div>
      <div className="content">
        <Layout {...props} selected={JSON.parse(query.selected || '[]')} >
        </Layout>
      </div>
      {JSON.parse(query.isEdit || 'false') ? <div className="footer"><Btn className="delete-btn">删除</Btn></div> : <></>}

      <Popup
        visible={infoVisible}
        onMaskClick={() => setInfoVisible(false)}
      >
        <div
          className="layout-info-popup"
        >
          <div className="header">
            屏幕布局
          </div>
          <div className="content">
            <div className="info">
              黑色区可配置：
              设备（更详细的设备控制）、服务（时钟、天气）
            </div>
            <div className="info-photo">
              <Icon name="info-layout" />
            </div>
            <div className="info">
              按键区可配置：
              设备开关、场景，点击即控
            </div>
            <div className="arrow-1">
              <Icon name="arrow-left" />
            </div>
            <div className="arrow-2">
              <Icon name="arrow-right" />
            </div>
          </div>
          <div className="footer">
            <Btn className="custom-btn" onClick={() => setInfoVisible(false)}>我知道了</Btn>
          </div>
        </div>
      </Popup>
    </div>
  );
}
