import React, { useState, useEffect } from 'react';
import { RgbColorPicker } from 'react-colorful';

function ColorPicker(props) {
  const {
    deviceData: { colour },
    doControlDeviceData
  } = { ...props };
  const [color, setColor] = useState({ r: 255, g: 255, b: 255 });
  useEffect(() => {
    const data = { r: colour?.red || 255, g: colour?.green || 255, b: colour?.blue || 255 }
    setColor(data);
  }, [colour]);
  return (
    <div>
      <RgbColorPicker color={color} onChange={(deg) => {
        setColor(deg);
        const data = {
          red: deg.r,
          green: deg.g,
          blue: deg.b
        }
        doControlDeviceData('colour', data);
      }} />
    </div>
  );
}

export default ColorPicker;
