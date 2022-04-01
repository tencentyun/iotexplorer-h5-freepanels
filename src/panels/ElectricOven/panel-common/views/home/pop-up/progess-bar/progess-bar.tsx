import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import './progess-bar.less';
import { StyledProps } from 'styled-components';

export interface ProgressBarProps extends StyledProps {
  defaultValue?: number; // 0 - 100
  unit?: string;
  onChange?: any;
  maxValue?: number;
  minValue?: number;
}

export function ProgressBar(props: ProgressBarProps) {
  const max_value = props.maxValue || 100;
  const min_value = props.minValue || 0;
  const [dataUser, setDataUser] = useState(props.defaultValue);
  const [touchEnd, setTouchEnd] = useState(false);
  const [unit] = useState(props.unit);
  console.log(`defaultValue:${props.defaultValue}`);
  // const [dataUser, setDataUser] = useState(sdk.deviceData.flow_set ? sdk.deviceData.flow_set : 300);

  // const currentWidth = (dataUser - min_value) * 100 / (max_value - min_value) + '%';
  // 这么设置的原因是因为进度条左端初始值有min-width影响,前5%的移动看不出变化
  const currentWidth = `${5 + (dataUser - min_value) * 95 / (max_value - min_value)}%`;

  const updateVolumetricVal = (val, touchEnd) => {
    setTouchEnd(touchEnd);
    if (val < min_value) {
      val = min_value;
    } else if (val > max_value) {
      val = max_value;
    }
    setDataUser(val);
  };

  const toggleReduce = () => {
    updateVolumetricVal(dataUser - 1, true);
  };
  const toggleAdd = () => {
    updateVolumetricVal(dataUser + 1, true);
  };

  useEffect(() => {
    props.onChange && props.onChange(dataUser, touchEnd);
  }, [dataUser]);

  const handleSelectBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');

    const val = (e.clientX - slider.offsetLeft) / slider.clientWidth;
    const tmp = parseInt(val * (max_value - min_value)) + min_value;
    updateVolumetricVal(tmp, true);
  };

  const handleMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');

    const val = (e.changedTouches[0].clientX - slider.offsetLeft) / slider.clientWidth;
    const tmp = parseInt(val * (max_value - min_value)) + min_value;
    updateVolumetricVal(tmp, false);
  };

  const handleEndMoveBrightness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lightbright-slider');

    const val = (e.changedTouches[0].clientX - slider.offsetLeft) / slider.clientWidth;
    const tmp = parseInt(val * (max_value - min_value)) + min_value;
    updateVolumetricVal(tmp, true);
  };
  return (
    <div className={'lightbright-container'}>
      <div className={classNames('lightbright-mark')}>
        <div className={classNames('lightbright-mark-op-btn')} onClick={toggleReduce}>-</div>
        <div className={classNames('lightbright-value-wrap')}>
          <div className={classNames('lightbright-value-text')}>{dataUser}{unit}</div>
        </div>
        <div className={classNames('lightbright-mark-op-btn')} onClick={toggleAdd}>+</div>
      </div>
      <div id={'lightbright-slider'} className={classNames('lightbright-slider')} onClick={handleSelectBrightness}
           onTouchMove={handleMoveBrightness} onTouchEnd={handleEndMoveBrightness}>
        <div className={classNames('lightbright-progress')} style={{ width: currentWidth }}>
          <div className={classNames('lightbright-progress-dot')}>
          </div>
        </div>
      </div>
    </div>
  );
}
