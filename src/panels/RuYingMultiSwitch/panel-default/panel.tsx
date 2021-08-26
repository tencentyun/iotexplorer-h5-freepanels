import React, { useEffect } from "react";
import { RuyingLayout } from "@src/components/RuyingLayout";
import { iconLamp } from "@icons/device/freePanel";
import { PanelMoreBtn } from "@components/PanelMoreBtn";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import "./panel.less";
const wordsList = [
  "打开LED吸顶灯",
  "关闭筒灯",
  "我要出门啦",
  "我回来啦",
  "打开房间的灯光",
];

export function MultiSwitchPanel({
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  switchList,
  onGoDeviceDetail,
}) {
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);
  return (
    <RuyingLayout
      wordsList={wordsList}
      displayName="如影智慧中控屏"
      beforeChildren={
        <>
          <PanelMoreBtn theme="dark" onClick={onGoDeviceDetail}></PanelMoreBtn>
          <div className="switch-list-wrapper">
            {switchList.map((item) => {
              return (
                <div
                  className="switch-item"
                  style={{
                    background: deviceData[item.id] ? "#C4CBDE" : "#222631",
                  }}
                  onClick={() => {
                    doControlDeviceData(item.id, deviceData[item.id] ? 0 : 1);
                  }}
                >
                  <div
                    className="switch-name switch-info"
                    style={{
                      color: deviceData[item.id] ? "#000" : "#fff",
                    }}
                  >
                    {deviceData[item.switchName] || "小灯"}
                  </div>
                  <img className="switch-icon switch-info" src={iconLamp}></img>
                  <div
                    className="status-icon switch-info"
                    style={{
                      background: deviceData[item.id] ? "#2ae9ae" : "#4A4D5E",
                    }}
                  ></div>
                </div>
              );
            })}
          </div>
        </>
      }
    />
  );
}
