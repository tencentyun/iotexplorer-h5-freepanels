import React, { useState } from "react";
import classNames from "classnames";
import { PanelMoreBtn } from "@components/PanelMoreBtn";
import { BorderSwitch } from "./BorderSwitch";
import { PanelComponentProps } from "@src/entryWrap";
import "./AirPurifierPanel.less";
import { FreePanelLayout } from "@components/FreePanelLayout";
import { AirPurifierFuncFooter } from "./AirPurifierFuncFooter";

export function AirPurifierPanel({
  deviceInfo,
  deviceData,
  offline,
  powerOff,
  templateMap,
  isShareDevice,
  doControlDeviceData,
  onGoTimingProject,
  onGoDeviceDetail,
  onSwitchChange,
}: PanelComponentProps) {
  const airPurifierDisabled = offline || powerOff;
  const [wetEnable, setWetdownEnable] = useState(deviceData.wet ? true : false);
  const [anionEnable, setAniondownEnable] = useState(
    deviceData.anion ? true : false
  );
  const [uvEnable, setUvdownEnable] = useState(deviceData.uv ? true : false);

  const transformShow = (val, defalut) => {
    if (airPurifierDisabled) {
      return "-";
    } else {
      if (deviceData[val] || deviceData[val] === 0) {
        return (
          deviceData[val] +
          (templateMap[val].define.unit === "day"
            ? "天"
            : templateMap[val].define.unit)
        );
      } else {
        if (deviceInfo.isVirtualDevice) {
          return defalut;
        } else {
          return "-";
        }
      }
    }
  };

  const transformShowMapping = (val, defalut) => {
    if (airPurifierDisabled) {
      return "-";
    } else {
      if (deviceData[val] || deviceData[val] === 0) {
        return templateMap[val].define.mapping[deviceData[val]];
      } else {
        if (deviceInfo.isVirtualDevice) {
          return defalut;
        } else {
          return "-";
        }
      }
    }
  };

  const transformRotate = (rotate) => {
    if (airPurifierDisabled) {
      return 50;
    } else {
      if (rotate) {
        return 50 + (260 / 500) * rotate;
      } else {
        if (deviceInfo.isVirtualDevice) {
          return 50 + (260 / 500) * 300;
        } else {
          return 50;
        }
      }
    }
  };

  return (
    <FreePanelLayout
      doControlDeviceData={doControlDeviceData}
      offline={offline}
      powerOff={powerOff}
      deviceData={deviceData}
      title={deviceInfo.displayName}
      className={classNames("free-air-purifier-page", {
        warning:
          !powerOff && deviceData.air_quality && deviceData.air_quality > 1,
        "power-off": powerOff,
      })}
      defaultFooter={false}
    >
      <PanelMoreBtn onClick={onGoDeviceDetail} theme="dark" />
      <div className="air-purifier-container">
        <div className="air-purifier-body">
          {!airPurifierDisabled && (
            <div className="mode-speed">
              <span className="mode">
                模式：{transformShowMapping("mode", "自动")}
              </span>
              <span>风速：{transformShowMapping("windspeed", "高档")}</span>
            </div>
          )}
          <div className="air-circle">
            <div className="air-circle-inner">
              {airPurifierDisabled ? (
                <div className="close-down">
                  {offline ? "已离线" : "已关机"}
                </div>
              ) : (
                <div>
                  <div className="pm">PM2.5</div>
                  <div className="pm-value">
                    {deviceData.pm2_5 || deviceData.pm2_5 === 0
                      ? deviceData.pm2_5
                      : deviceInfo.isVirtualDevice
                      ? "300"
                      : "-"}
                  </div>
                  <div>
                    室内空气质量：{transformShowMapping("air_quality", "优")}
                  </div>
                </div>
              )}
            </div>
            <div
              className="air-circle-dot-container"
              style={{
                transform: `rotate(${transformRotate(deviceData.pm2_5)}deg)`,
              }}
            >
              {!airPurifierDisabled &&
                (deviceData.pm2_5 ||
                  deviceData.pm2_5 === 0 ||
                  deviceInfo.isVirtualDevice) && <div className="dot"></div>}
            </div>
          </div>
          <div className="air-purifier-property-body">
            <div className="air-purifier-property">
              <div className="label">TVOC</div>
              <div className="value">{transformShow("tvoc", "1ppm")}</div>
            </div>
            <div className="air-purifier-property">
              <div className="label">湿度</div>
              <div className="value">{transformShow("humidity", "50%")}</div>
            </div>
            <div className="air-purifier-property">
              <div className="label">温度</div>
              <div className="value">{transformShow("temperature", "22℃")}</div>
            </div>
          </div>
          <div className="air-purifier-property-body">
            <div className="air-purifier-property">
              <div className="label">滤芯剩余寿命</div>
              <div className="value">
                {transformShow("filter_left_level", "70%")}
              </div>
            </div>
            <div className="air-purifier-property">
              <div className="label">滤芯剩余天数</div>
              <div className="value">
                {transformShow("filter_left_days", "200天")}
              </div>
            </div>
            <div className="air-purifier-property">
              <div className="label">滤芯已使用</div>
              <div className="value">
                {transformShow("filter_used_days", "22天")}
              </div>
            </div>
          </div>

          <div className="air-purifier-switch-group">
            <div>
              <span className="air-purifier-switch-label">加湿</span>
              <BorderSwitch
                checked={wetEnable}
                onChange={(val) => {
                  setWetdownEnable(val);
                  doControlDeviceData("wet", val ? 1 : 0);
                }}
                className="air-purifier-switch"
                disabled={airPurifierDisabled}
              />
            </div>
            <div>
              <span className="air-purifier-switch-label">负离子</span>
              <BorderSwitch
                checked={anionEnable}
                onChange={(val) => {
                  setAniondownEnable(val);
                  doControlDeviceData("anion", val ? 1 : 0);
                }}
                className="air-purifier-switch"
                disabled={airPurifierDisabled}
              />
            </div>
            <div>
              <span className="air-purifier-switch-label">UV杀菌</span>
              <BorderSwitch
                checked={uvEnable}
                onChange={(val) => {
                  setUvdownEnable(val);
                  doControlDeviceData("uv", val ? 1 : 0);
                }}
                className="air-purifier-switch"
                disabled={airPurifierDisabled}
              />
            </div>
          </div>
        </div>
      </div>

      <AirPurifierFuncFooter
        onSwitchChange={onSwitchChange}
        offline={offline}
        powerOff={powerOff}
        controlDeviceData={doControlDeviceData}
        deviceData={deviceData}
        isShareDevice={isShareDevice}
        templateMap={templateMap}
      />
    </FreePanelLayout>
  );
}
