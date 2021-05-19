import React, { useState } from 'react';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import './Subpage.less';

export function Subpage({
  doControlDeviceData,
  templateMap,
  deviceData,
}: {
  doControlDeviceData: DoControlDeviceData,
  templateMap?: any,
  deviceData?: any,
}) {

  return (
    <>
      <div className="water-heater-subpage clearfix">
      </div>
    </>
  );
}
