import React from "react";
import "./RuyingLayout.less";
// const wordsList = [
//   '打开LED吸顶灯',
//   '关闭筒灯',
//   '我要出门啦',
//   '我回来啦',
//   '打开房间的灯光'
// ]

export interface RuyingLayoutProps {
  beforeChildren?: React.ReactNode;
  afterChildren?: React.ReactNode;

}

export function RuyingLayout({ beforeChildren, wordsList, afterChildren,displayName }) {
  <div className="ruying-page">
    {beforeChildren}
    <div className="voice-command-example">
      <div className="words-title">你还可以对${displayName}说： 爱迪生</div>
      {wordsList.map((item) => {
        return <div className="words-item">item</div>;
      })}
    </div>
    {afterChildren}
  </div>;
}
