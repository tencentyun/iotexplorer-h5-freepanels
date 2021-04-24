import React from "react";
import { RuyingCard } from "./panel";
import "./SubDeviceList.less";
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
// import goDevicePanel from "@tencent/iotexplorer-go-device-panel";
export function SubDeviceList({ deviceList }) {

  return (
    <div className="sub-device-page">
      {deviceList.map((item) => {
        return (
          <RuyingCard>
            <img className="device-icon" src={item.icon}></img>
            <div
              className="device-name"
              onClick={() => {
                // console.log(item.DeviceId)
               sdk.goDevicePanelPage(item.DeviceId)
              }}
            >
              {item.text}
            </div>
          </RuyingCard>
        );
      })}
    </div>
  );
}
