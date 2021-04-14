import React, { useState } from "react";
import { iconFan } from "@icons/device/freePanel";
import classNames from "classnames";
import { RawBtn } from "@components/Btn";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { PanelMoreBtn } from "@components/PanelMoreBtn";
import { getCountdownStr, getStatusStr } from "@components/FuncFooter";
import "./FanPanel.less";
import { PanelComponentProps } from "@src/entryWrap";

export function FanPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  doControlDeviceData,
  onGoTimingProject,
  onGoDeviceDetail,
}: PanelComponentProps) {
  const renderPanelStatus = () => {
    if (offline) {
      return <div className="fan-msg">设备已离线</div>;
    }
    if (deviceData.count_down && deviceData.count_down > 0) {
      return (
        <div className="fan-msg">
          {getCountdownStr(deviceData.count_down, powerOff)}
        </div>
      );
    }
    return <div className="fan-msg">插座已{getStatusStr(powerOff)}</div>;
  };
  const [mode, setMode] = useState("自然风");
  const [speed, setSpeed] = useState("自动");
  return (
    <FreePanelLayout
      className={classNames("free-fan-page", {
        "power-off": powerOff,
      })}
      title={deviceInfo.displayName}
      doControlDeviceData={doControlDeviceData}
      offline={offline}
      powerOff={powerOff}
      deviceData={deviceData}
      onGoTimingProject={onGoTimingProject}
    >
      <PanelMoreBtn onClick={onGoDeviceDetail} theme="dark" />
      <div className="fan-body">
        <div className="fan-status">
          <div style={{ marginRight: "80px" }}>模式: {mode}</div>
          <div>风速: {speed}</div>
        </div>
        <div className="fan-logo-btn">
          <img className={classNames("fan-logo")} src={iconFan} />
        </div>
        {/* 风扇按钮 */}
        <div>
          <div className="fan-btn-wrapper">
            <span>风扇开</span>
            <RawBtn
              onClick={() =>
                doControlDeviceData("power_switch", powerOff ? 1 : 0)
              }
            ></RawBtn>
          </div>

          <div className="fan-btn-wrapper">
            <span>摇头开</span>
            <RawBtn
              onClick={() =>
                doControlDeviceData("power_switch", powerOff ? 1 : 0)
              }
            ></RawBtn>
          </div>
        </div>

        {renderPanelStatus()}
      </div>
    </FreePanelLayout>
  );
}
