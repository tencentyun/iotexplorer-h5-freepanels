import React, {  useRef } from "react";
import { iconFan } from "@icons/device/freePanel";
import classNames from "classnames";
import { IconBtn,  SquareBtn } from "@components/Btn";
import { Switch } from "@components/Switch";
import "./FanPanel.less";
import { PanelComponentProps } from "@src/entryWrap";
import * as freePanelIcons from "@icons/device/freePanel";
import { Slider } from "@components/Slider";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
export function FanPanel({
  deviceData,
  offline,
  powerOff,
  templateMap,
  doControlDeviceData,
}: PanelComponentProps) {
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);
  const getLabel = (v) => {
    let windSpeedMap = templateMap.windspeed.define.mapping;
    // 根据map的分段来划分档位
    let labelLength = 100 / Object.keys(windSpeedMap).length;
    let label = Math.round(v / labelLength);
    return label;
  };
  const changeSpeed = (v) => {
    // setSliderValue(v);
    clearTimeout(debounceTimerRef.current);
    debounceTimerRef.current = setTimeout(() => {
      let label = getLabel(v);
      doControlDeviceData("windspeed", label);
    }, 200);
  };

  const formatTip = (v) => {
    let windSpeedMap = templateMap.windspeed.define.mapping;
    let label = getLabel(v);
    // doControlDeviceData('windSpeedMap',label);
    return windSpeedMap[label === 0 ? label : label - 1];
  };
  const darkMode = offline;

  // const [powerSwitch, setPowerSwitch] = useState(
  //   deviceData["power_switch"] || true
  // );
  // const [swing, setSwing] = useState(deviceData[""swing"] || false);
  // const [mode, setMode] = useState(deviceData["mode"] || "自然风");
  // const [countdown, setCountDown] = useState(deviceData["timer"] || 0);
  // const [sliderValue, setSliderValue] = useState(
  //   (deviceData["windspeed"] * 100) /
  //     Object.keys(templateMap.windspeed.define.mapping).length || 0
  // );
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
        "free-fan-dark-page": darkMode,
      })}
    >
      <div className="fan-body">
        <div className="fan-status">
          <div style={{ marginRight: "80px" }}>模式: {modeMap[deviceData["mode"]]}</div>
          <div>
            风速:{" "}
            {formatTip(
              (deviceData["windspeed"] * 100) /
                Object.keys(templateMap.windspeed.define.mapping).length || 0
            )}
          </div>
        </div>
        <img className={classNames("fan-logo")} src={iconFan} />

        {/* 风扇按钮 */}
        <div className="fan-btn-groups">
          <SquareBtn
            onClick={() => doControlDeviceData("power_switch", powerOff ? 0 : 1)}
            title={`风扇${
              deviceData["power_switch"] && !darkMode ? "开" : "关"
            }`}
            disabled={darkMode}
            icon={
              darkMode
                ? freePanelIcons.iconSwitch
                : (deviceData["power_switch"]
                ? freePanelIcons.iconSwitchOpen
                : freePanelIcons.iconSwitchClose)
            }
            size="40px"
            iconBackground={darkMode ? "rgba(255,255,255,0.4)" : "#fff"}
          ></SquareBtn>

          <SquareBtn
            title={`摇头${deviceData["swing"] ? "开" : "关"}`}
            disabled={darkMode}
          >
            <Switch
              disabled={darkMode}
              className="fan-switch"
              checked={deviceData["swing"]}
              onChange={(value) => {
                doControlDeviceData("swing", value);
                // setSwing(value);
              }}
            />
          </SquareBtn>
          <SquareBtn className="speed-square" title="风速">
            <Slider
              className="fans-slider"
              value={
                (deviceData["windspeed"] * 100) /
                  Object.keys(templateMap.windspeed.define.mapping).length || 0
              }
              onChange={changeSpeed}
              tooltip={true}
              min={0}
              max={100}
              format={formatTip}
            ></Slider>
          </SquareBtn>

          <SquareBtn className="fan-square-group-btn">
            <div className="group-wrapper">
              {modeMapGroups.map((item, index) => (
                <IconBtn
                  disabled={darkMode}
                  className="mode-btn"
                  iconBackground={
                    !darkMode && deviceData["mode"] === item.value
                      ? "#FFFFFF"
                      : "rgba(255, 255, 255, 0.2)"
                  }
                  title={item.mode}
                  icon={deviceData["mode"] === item.value ? item.activeIcon : item.icon}
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
                          "fan-timer-item-active": deviceData["timer"] === item && !darkMode,
                          "fan-dark-timer-item-active": deviceData["timer"]=== item && !!darkMode
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
