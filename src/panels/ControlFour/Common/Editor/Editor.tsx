import React from 'react';
import { Layout } from '../Layout';
import layout from '../Layout/constant';


export function Editor({ ...props }) {
  const { history: { query = {} } } = { ...props };
  return (
    <div className="editor-layout">
      <div className="header">
        <span>点击卡片可进行编辑</span>
        <span>布局说明</span>
      </div>
      <div className="content">
        <Layout {...props} selected={JSON.parse(query.selected || '[]')}>
        </Layout>
      </div>
    </div>
  );
}
