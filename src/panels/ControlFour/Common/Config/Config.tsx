import React from 'react';
import { ThemeList } from './ThemeList';
import { CardList } from './CardList';

export function Config(props) {
  return (
    <div className="control-config">
      <div className="editor-name">
        <div className="title">修改名称</div>
      </div>
      <div className="card">
        <div className="title">卡片编辑</div>
        <div className="list">
          <CardList />
        </div>
      </div>
      <div className="card">
        <div className="title">卡片主题</div>
        <div className="list">
          <ThemeList {...props}></ThemeList>
        </div>
      </div>
    </div>
  );
}
