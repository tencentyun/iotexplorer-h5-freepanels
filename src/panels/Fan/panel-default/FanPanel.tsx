import React, { useRef, useEffect, useState } from "react";
import { iconFan } from "@icons/device/freePanel";
import classNames from "classnames";
import { IconBtn, SquareBtn } from "@components/Btn";
import { Switch } from "@components/Switch";
import "./FanPanel.less";
import { PanelComponentProps } from "@src/entryWrap";
import * as freePanelIcons from "@icons/device/freePanel";
import { Slider } from "@components/Slider";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import { PanelMoreBtn } from "@components/PanelMoreBtn";
export function FanPanel({
  deviceData,
  offline,
  powerOff,
  templateMap,
  doControlDeviceData,
}: PanelComponentProps) {
  // 风速是拖动条，如果由devicedata来控制，会给人非常明显的卡顿感
  const [sliderValue, setSliderValue] = useState(
    (deviceData["windspeed"] * 100) /
      (Object.keys(templateMap.windspeed.define.mapping).length - 1)|| 0
  );
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);
  const labelLength =
    100 / (Object.keys(templateMap.windspeed.define.mapping).length - 1);
  // 根据拖动值获取风的等级
  const getLabel = (v) => {
    // 根据map的分段来划分档位
    let label = Math.max(Math.round(v / labelLength), 0);
    return label;
  };
  // 根据风的等级获取拖动值
  const getSpeed = (label) => {
    let v = label * labelLength;
    return v;
  };
  const changeSpeed = (v) => {
    setSliderValue(v);
    let label = getLabel(v);
    let newValue = getSpeed(label);
    console.log(v, label, newValue);
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      let label = getLabel(v);
      setSliderValue(newValue);
      doControlDeviceData("windspeed", label);
    }, 100);
  };

  useEffect(() => {
    let label = getLabel(sliderValue);
    if (label === deviceData["windspeed"]) {
      setSliderValue(sliderValue);
    }
  }, [deviceData["windspeed"]]);

  const formatTip = (v) => {
    let windSpeedMap = templateMap.windspeed.define.mapping;
    let label = getLabel(v);
    // doControlDeviceData('windSpeedMap',label);
    return windSpeedMap[label];
  };
  const debounceTimerRef = useRef(-1); // 防抖，针对快速连续点赞

  enum modeMap {
    "正常风" = 0,
    "自然风" = 1,
    "睡眠风" = 2,
    "智能模式" = 3,
  }

  const modeMapGroups = [
    {
      mode: "自然风",
      value: 0,
      icon: freePanelIcons.iconNaturalWind,
      activeIcon: freePanelIcons.iconNaturalWindActive,
    },
    {
      mode: "正常风",
      value: 1,
      icon: freePanelIcons.iconNormalWind,
      activeIcon: freePanelIcons.iconNormalWindActive,
    },
    {
      mode: "睡眠风",
      value: 2,
      icon: freePanelIcons.iconSleepWind,
      activeIcon: freePanelIcons.iconSleepWindActive,
    },
    {
      mode: "智能模式",
      value: 3,
      icon: freePanelIcons.iconSmartMode,
      activeIcon: freePanelIcons.iconSmartModeActive,
    },
  ];
  return (
    <div
      className={classNames("free-fan-page", {
        "free-fan-dark-page": powerOff,
      })}
    >
      <PanelMoreBtn theme="dark"></PanelMoreBtn>
      <div className="fan-body">
        <div className="fan-status">
          <div style={{ marginRight: "80px" }}>
            模式: &#32;{modeMap[deviceData["mode"]]}
          </div>
          <div>
            {/* // (deviceData["windspeed"] * 100) /
              //   (Object.keys(templateMap.windspeed.define.mapping).length -
              //     1) || 0 */}
            风速:&#32;
            {formatTip(getSpeed(deviceData["windspeed"]))}
          </div>
        </div>
        <img className={classNames("fan-logo")} src={iconFan} />

        {/* 风扇按钮 */}
        <div className="fan-btn-groups">
          <div
            className="fan-btn-inline"
            style={{ display: "flex", justifyContent: "space-between" }}
          >
            <SquareBtn
              style={{ marginRight: "24px" }}
              onClick={() => {
                console.log(offline, deviceData["power_switch"], powerOff);
                doControlDeviceData(
                  "power_switch",
                  deviceData["power_switch"] ? 0 : 1
                );
              }}
              title={`风扇${
                deviceData["power_switch"] && !powerOff ? "开" : "关"
              }`}
              disabled={powerOff}
              icon={
                powerOff
                  ? freePanelIcons.iconFanSwitchClose
                  : freePanelIcons.iconFanSwitchOpen
              }
              size="38px"
              iconBackground={"none"}
              // iconStyle={{ width: "80px", height: "80px" }}
              // iconBackground={powerOff ? "rgba(255,255,255,0.4)" : "#fff"}
            ></SquareBtn>

            <SquareBtn
              title={`摇头${deviceData["swing"] ? "开" : "关"}`}
              disabled={powerOff}
            >
              <Switch
                disabled={powerOff}
                className="fan-switch"
                onColor="#FFFFFF"
                onHandleColor="#0099CC"
                checked={deviceData["swing"]}
                onChange={(value) => {
                  doControlDeviceData("swing", value);
                  // setSwing(value);
                }}
              />
            </SquareBtn>
          </div>
          <SquareBtn className="speed-square" title="风速">
            <Slider
              className="fans-slider"
              value={sliderValue}
              onChange={changeSpeed}
              alwaysShowTip={true}
              min={0}
              max={100}
              format={(v) => {
                return "风速: " + formatTip(v);
              }}
            ></Slider>
          </SquareBtn>

          <SquareBtn className="fan-square-group-btn">
            <div className="group-wrapper">
              {modeMapGroups.map((item, index) => (
                <IconBtn
                  disabled={powerOff}
                  className="mode-btn"
                  iconBackground={
                    !powerOff && deviceData["mode"] === item.value
                      ? "#FFFFFF"
                      : "rgba(255, 255, 255, 0.2)"
                  }
                  title={item.mode}
                  icon={
                    deviceData["mode"] === item.value
                      ? item.activeIcon
                      : item.icon
                  }
                  onClick={() => {
                    // setMode(item.mode);
                    doControlDeviceData("mode", item.value);
                  }}
                  style={{ color: "#fff" }}
                ></IconBtn>
              ))}
            </div>
          </SquareBtn>

          {/* 从物模型的map里面去枚举 */}
          <SquareBtn title="定时" className="fan-timer-container">
            <div className="timer-btn">
              {
                // templateMap.windspeed.define.mapping
                Object.keys(templateMap.timer.define.mapping).map(
                  (item: string | number) => {
                    return (
                      <div
                        className={classNames("fan-timer-item", {
                          "fan-timer-item-active":
                            deviceData["timer"] === item && !powerOff,
                          "fan-dark-timer-item-active":
                            deviceData["timer"] === item && !!powerOff,
                        })}
                        onClick={() => {
                          // setCountDown(item);
                          doControlDeviceData("timer", item);
                        }}
                      >
                        {templateMap.timer.define.mapping[item]}
                      </div>
                    );
                  }
                )
              }
            </div>
          </SquareBtn>
        </div>
      </div>
    </div>
  );
}
