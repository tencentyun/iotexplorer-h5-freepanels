import React from "react";
import { useDeviceInfo } from "@hooks/useDeviceInfo";
import { CameraPanel } from "./CameraPanel";
import { entryWrap } from "@src/entryWrap";

function App() {
  const [
    { deviceInfo, deviceData, productInfo, templateMap, offline, powerOff },
    { doControlDeviceData },
  ] = useDeviceInfo();

  return (
    <CameraPanel
      deviceInfo={deviceInfo}
      deviceData={deviceData}
      offline={offline}
      powerOff={powerOff}
      doControlDeviceData={doControlDeviceData}
    ></CameraPanel>
  );
}

entryWrap(App);
