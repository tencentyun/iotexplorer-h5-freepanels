import React from 'react';
import { Btn } from '@custom/Btn';

const COLOR_MODULE = [
  ['单色模式', 0, 'white'],
  ['双色模式', 1, 'colour'],
  ['彩色模式', 2, 'colorfull'],
  ['情景模式', 10, 'sence'],
];



const Ticker = ({
  deviceData: {
    color_mode,
    power_switch
  },
  context: { workMode },
  productColorMode = 1,
  setContext,
}) => {

  // 颜色模式
  const colorMode = color_mode === void 0 ? productColorMode : color_mode;
  debugger;
  const currentModule = COLOR_MODULE[colorMode];

  const CONFIG = currentModule ? [currentModule, COLOR_MODULE[3]] : null;

  // 默认选择的场景
  const work_mode = workMode == void 0 ? CONFIG?.[0][1] : workMode;

  const isSwitchOff = power_switch !== 1;

  const isChecked = (val: number | string) => work_mode === val;

  const cls = isSwitchOff ? 'ticker-off' : '';


  return (
    <div className={`ticker ${cls}`}>
      <div className="content">
        {CONFIG ? CONFIG.map(([name, index, value]) => (
          <Btn
            className={isSwitchOff && isChecked(index) ? 'btn-disable' : ''}
            key={index}
            type={!isSwitchOff && isChecked(index) ? 'primary' : 'reverse'}
            onClick={() => {
              if (!isSwitchOff) {
                setContext({ workMode: index });
              }
            }}
          >
            <div className="title">{name}</div>
          </Btn>
        )) : null}
      </div>
    </div>
  );
};

export default Ticker;
