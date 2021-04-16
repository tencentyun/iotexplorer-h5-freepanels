import React, { useState } from "react";
import { iconFan } from "@icons/device/freePanel";
import classNames from "classnames";
import { IconBtn, RawBtn, SquareBtn } from "@components/Btn";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { PanelMoreBtn } from "@components/PanelMoreBtn";
import { getCountdownStr, getStatusStr } from "@components/FuncFooter";
import { Switch } from "@components/Switch";
import "./FanPanel.less";
import { PanelComponentProps } from "@src/entryWrap";
import * as freePanelIcons from "@icons/device/freePanel";
import { Slider } from "@components/Slider";
// import { throttle }
// import * as fanPanelIcons from '@icons/device/'
export function FanPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  templateMap,
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
  };
  console.log(deviceInfo,deviceData,templateMap)
  const [mode, setMode] = useState("自然风");
  const [speed, setSpeed] = useState("自动");
  const [sliderValue, setSliderValue] = useState(0);
  const changeSpeed = v => {
    console.log('comehere')
    setSliderValue(v)
  }
  const formatTip = v => {
    let windSpeedMap = templateMap.windspeed.define.mapping
    // 根据map的分段来划分档位
    let labelLength = 100/Object.keys(windSpeedMap).length
    let label = Math.round(v/labelLength)
    // doControlDeviceData('windSpeedMap',label);
    return windSpeedMap[label === 0 ? label : label - 1]
  }
  return (
    // <FreePanelLayout
    //   className={classNames("free-fan-page", {
    //     "power-off": powerOff,
    //   })}
    //   title={deviceInfo.displayName}
    //   doControlDeviceData={doControlDeviceData}
    //   offline={offline}
    //   powerOff={powerOff}
    //   deviceData={deviceData}
    //   onGoTimingProject={onGoTimingProject}

    // >
    //   <PanelMoreBtn onClick={onGoDeviceDetail} theme="dark" />
    //   {renderPanelStatus()}
    <>
      <div className="free-fan-page">
        <div className="fan-body">
          <div className="fan-status">
            <div style={{ marginRight: "80px" }}>模式: {mode}</div>
            <div>风速: {speed}</div>
          </div>
          <img className={classNames("fan-logo")} src={iconFan} />

          {/* 风扇按钮 */}
          <div className="fan-btn-groups">
            <SquareBtn
              onClick={() =>
                doControlDeviceData("power_switch", powerOff ? 1 : 0)
              }
              title="风扇开"
              icon={freePanelIcons.iconSwitchOpen}
              size="40px"
              // iconBackground="#fff"
            ></SquareBtn>

            <SquareBtn
              onClick={() =>
                doControlDeviceData("power_switch", powerOff ? 1 : 0)
              }
              title="摇头开"
              // icon={freePanelIcons.iconSwitchOpen}
              // size="40px"
              // iconBackground="#fff"
            >
              <Switch checked={false} onChange={() => {}} />
            </SquareBtn>

            {/* <div className="square-btn-container">
          <div></div>
        </div> */}

            <SquareBtn
              className="speed-square"
              onClick={() =>
                doControlDeviceData("power_switch", powerOff ? 1 : 0)
              }
              title="风速"
            >
              <Slider
                className="fans-slider"
                value={sliderValue}
                onChange={changeSpeed}
                tooltip={true}
                min={0}
                max={100}
                format={formatTip}
              ></Slider>
            </SquareBtn>

            <SquareBtn className="fan-square-group-btn">
              <div className="group-wrapper">
                <IconBtn
                  title="自然风"
                  icon={freePanelIcons.iconNaturalWind}
                ></IconBtn>
                <IconBtn
                  title="正常风"
                  icon={freePanelIcons.iconNormalWind}
                ></IconBtn>
                <IconBtn
                  title="睡眠风"
                  icon={freePanelIcons.iconSleepWind}
                ></IconBtn>
                <IconBtn
                  title="智能模式"
                  icon={freePanelIcons.iconSmartMode}
                ></IconBtn>
              </div>
            </SquareBtn>

            {/* 从物模型的map里面去枚举 */}
            <SquareBtn title="定时" className="fan-count-down-container">
              <div className="count-down-btn">
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
                <div style={{ width: "80px" }}>1</div>
              </div>
            </SquareBtn>
          </div>
        </div>
      </div>

    </>
  );
}
