import React, { useState, useEffect } from 'react';
import { ColorPicker } from '@custom/Color';

const RGBColor = ({
    brightness = 80,
    deviceData: {
        bright_value = 80,
        color_temp = 2700,  // 色温  2700-6500  步长1
        rgb_color = { blue: 255, green: 255, red: 255 },
        work_mode,
        white_data,
        colour_data,
        power_switch },
    doControlDeviceData,
}) => {

    const rgb = {
        r: rgb_color?.red || 0,
        b: rgb_color?.blue || 0,
        g: rgb_color?.green || 0,
    }


    const setRgb = ({ r, g, b }) => {
        doControlDeviceData('rgb_color', { red: r, blue: b, green: g })
    }
    return <div style={{ opacity: brightness / 100 }}>
        <ColorPicker value={rgb} onEnd={color => setRgb(color.rgb)} colorOption={{ width: 260 }}></ColorPicker>
    </div>
}

export default RGBColor;