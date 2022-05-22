import React, { useState } from 'react';


export function ScenePage({
  deviceData: { brightness, power_switch },
  doControlDeviceData,
}) {
  const [feedNum, setFeedNum] = useState(9);

  return (
    <div className={`light-bright ${power_switch ? 'on-switch' : 'off-switch'}`}>
      {/* <ImageSlider
        value={feedNum}
        // onChange={setFeedNum}
      /> */}
    </div>
  );
}
