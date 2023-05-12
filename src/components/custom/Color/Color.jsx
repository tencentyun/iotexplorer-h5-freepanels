import iro from '@jaames/iro';
import React, { useState, useEffect } from 'react';

function Color(props) {
  const {
    onChange,
    onEnd,
    value,
    colorOption
  } = props;

  const [colorPicker, setColorPicker] = useState(null)
  useEffect(() => {
    console.log("-------色值的颜色:",value)

    colorPicker && colorPicker.color.set(value)
  }, [value])

  // 切换事件
  function colorChangeCallback(color) {
    onChange && onChange(color);
  }

  const colorEndCallback = (color) => {
    onEnd && onEnd(color);
  }

  useEffect(() => {
    console.log("进行初始化----")
    const colorInstance = new iro.ColorPicker("#picker", {
      width: 200,
      color: "#f00",
      // 滚轮形式
      layout: [
        {
          component: iro.ui.Wheel,
          options: {}
        },
      ],
      ...colorOption
    });
    setColorPicker(colorInstance)
    colorInstance.on("color:change", colorChangeCallback);
    colorInstance.on("input:end", colorEndCallback);

  }, [])

  return (
    <div id="picker"></div>
  );
}

export const ColorPicker = Color;