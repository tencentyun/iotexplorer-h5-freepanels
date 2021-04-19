import React from "react";
import { RuyingLayout } from "../../RuyingLayout";
const wordsList = [
  "打开LED吸顶灯",
  "关闭筒灯",
  "我要出门啦",
  "我回来啦",
  "打开房间的灯光",
];

export function MultiSwitchPanel() {
  return
  <RuyingLayout
  wordsList={wordsList}
  displayName="如影智慧中控屏"
  beforeChildren={(
    <div>haha</div>
  )}
  afterChildren={(
    <div>hahaha

    </div>
  )}
   />;
}
