import React, { useEffect, useMemo, useState } from "react";
import classNames from "classnames";
import { DoControlDeviceData } from "@hooks/useDeviceInfo";
import { FuncFooter } from "../FuncFooter";
import sdk from "qcloud-iotexplorer-h5-panel-sdk";
import "./FreePanelLayout.less";
import { isFullScreen, px2rpx, rpx2rem } from "@utillib";
import * as wxlib from "@wxlib";
import { Modal } from "@components/Modal";
import { iconGoShop, iconShop } from "@icons/device/index";
import { requestStaticConfig } from "@src/libs/request";

export interface FreePanelLayoutProps extends StyledProps {
  children: React.ReactNode;
  doControlDeviceData: DoControlDeviceData;
  offline: boolean;
  powerOff: boolean;
  title: string;
  deviceData: any;
  darkMode?: boolean;
  onGoTimingProject?: () => any;
  onGoCountDown?: () => any;
  onSwitchChange?: () => any;
  isShareDevice?: boolean;
}

export const getFooterHeight = (): number => (isFullScreen() ? 256 : 188);

export function FreePanelLayout({
  children,
  className,
  style,
  doControlDeviceData,
  offline,
  powerOff,
  // title,
  deviceData,
  darkMode,
  onGoCountDown,
  onSwitchChange,
  isShareDevice,
  onGoTimingProject,
}: FreePanelLayoutProps) {
  const [showShopCard, setShowShopCard] = useState(false);
  useEffect(() => {
    if (offline) {
      sdk.offlineTip.show();
    } else {
      sdk.offlineTip.hide();
    }
  }, [offline]);

  const bodyHeight = useMemo(() => {
    return rpx2rem(
      px2rpx(document.documentElement.clientHeight) - getFooterHeight()
    );
  }, []);

  const doGoTimingProject = () => {
    if (sdk.isMock) {
      // return sdk.tips.showInfo("模拟设备无法访问定时任务");
      setShowShopCard(true);
      return;
    }

    if (typeof onGoTimingProject === "function") {
      return onGoTimingProject();
    }

    wxlib.router.go(
      "/pages/Device/TimingProject/TimingProjectList/TimingProjectList",
      {
        deviceId: sdk.deviceId,
      }
    );
  };

  const goShop = async () => {
    try {
      const res = window.location.search.split("&").find((item) => {
        return item.indexOf("panelId") !== -1;
      });
      if (res) {
        const { data } = await requestStaticConfig("/51/config3.js");
        const item = data.find((item) => {
          console.log(item.panelId, res.split("=")[1]);
          return item.panelId === res.split("=")[1];
        });
        wxlib.router.go("/pages/Functional/RedirectTo3rdMP/RedirectTo3rdMP", {
          appid: "wx32540bd863b27570",
          path: item.url,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div
      className={classNames("free-panel-layout clearfix", className)}
      style={style}
    >
      <div
        className="free-panel-body clearfix"
        style={{
          height: bodyHeight,
        }}
      >
        {children}
      </div>
      {sdk.isMock && (
        <div className="go-shop-btn" onClick={goShop}>
          <img className="shop-btn-icon" src={iconShop}></img>
        </div>
      )}
      <FuncFooter
        darkMode={darkMode}
        onGoTimingProject={doGoTimingProject}
        onGoCountDown={onGoCountDown}
        onSwitchChange={onSwitchChange}
        offline={offline}
        powerOff={powerOff}
        controlDeviceData={doControlDeviceData}
        countdown={deviceData.count_down as number}
        isShareDevice={isShareDevice}
      />

      {/* 跳转拼多多的弹窗卡片 */}
      <Modal
        visible={showShopCard}
        fixedBottom={true}
        onClose={() => {
          setShowShopCard(false);
        }}
        maskClosable={true}
      >
        <Modal.Body>
          <div className="go-shop-text">选购真实设备，体验更多智能功能!</div>
          <img className="go-shop-img" src={iconGoShop}></img>
        </Modal.Body>
        <Modal.Footer>
          <Modal.FooterConfirmBtnGroup
            cancelColor="#15161A"
            cancelText="取消"
            confirmText="去看看"
            onCancel={() => {
              setShowShopCard(false);
            }}
            onConfirm={goShop}
            isInFixedBottomModal={true}
          />
        </Modal.Footer>
      </Modal>
    </div>
  );
}
