import React, {useState} from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import './temperature.less';
import { getThemeType } from '@libs/theme';
import {onControlDevice} from '@hooks/useDeviceData';
import {SvgIcon} from '@components/common/icon';

export function Light_temperature() {
  const themeType = getThemeType();
  const [temperatureness_val, onToggletemperaturenessVal] = useState(sdk.deviceData.color_temp && sdk.deviceData.color_temp >= 2000 && sdk.deviceData.color_temp <= 7000 ? sdk.deviceData.color_temp : 7000);

  const MIN_VALUE = 2000;
  const MAX_VALUE = 7000;

  const currentWidth = (5 + (temperatureness_val - MIN_VALUE) * 95 / (MAX_VALUE - MIN_VALUE)) + '%';
  const toggleReduce = () => {
    if (temperatureness_val <= MIN_VALUE) {
      return;
    }
    let new_val = temperatureness_val - 1;
    onControlDevice('color_temp', new_val);
    onToggletemperaturenessVal(new_val);
  }

  const toggleAdd = () => {
    if (temperatureness_val >= MAX_VALUE) {
      return;
    }
    let new_val = temperatureness_val + 1;
    onControlDevice('color_temp', new_val);
    onToggletemperaturenessVal(new_val);
  }

  const handleSelecttemperatureness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lighttemperature-slider');
    const progress = document.getElementById('lighttemperature-progress');
    const dot = document.getElementById('lighttemperature-progress-dot');

    let temperatureness = (e.clientX - slider.offsetLeft) / slider.clientWidth;
    let temperatureness_val = parseInt(temperatureness * (MAX_VALUE - MIN_VALUE) + MIN_VALUE); // 亮度数值
    if (temperatureness_val < MIN_VALUE) {
      temperatureness_val = MIN_VALUE;
    } else if (temperatureness_val > MAX_VALUE) {
      temperatureness_val = MAX_VALUE;
    }
    onControlDevice('color_temp', temperatureness_val);
    onToggletemperaturenessVal(temperatureness_val);

    // let x = e.clientX - slider.offsetLeft - dot.clientWidth / 2;
    // if (x < 0) x = 0;
    // if (x > slider?.clientWidth - dot.clientWidth)
    //   x = slider?.clientWidth - dot.clientWidth;
    // // dot.style.marginLeft = x + 'px';
    // progress.style.width = (x + dot.clientWidth*1.2) + 'px';
  };

  const handleMovetemperatureness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lighttemperature-slider');
    const progress = document.getElementById('lighttemperature-progress');
    const dot = document.getElementById('lighttemperature-progress-dot');

    let temperatureness = (e.changedTouches[0].clientX - slider.offsetLeft) / slider.clientWidth;
    let temperatureness_val = parseInt(temperatureness * (MAX_VALUE - MIN_VALUE) + MIN_VALUE); // 亮度数值
    if (temperatureness_val < MIN_VALUE) {
      temperatureness_val = MIN_VALUE;
    } else if (temperatureness_val > MAX_VALUE) {
      temperatureness_val = MAX_VALUE;
    }
    onToggletemperaturenessVal(temperatureness_val);

    // let x = e.changedTouches[0].clientX - slider.offsetLeft - dot.clientWidth / 2;
    // if (x < 0) x = 0;
    // if (x > slider?.clientWidth - dot.clientWidth)
    //   x = slider?.clientWidth - dot.clientWidth;
    // // dot.style.marginLeft = x + 'px';
    // progress.style.width = (x + dot.clientWidth*1.2) + 'px';
  };

  const handleEndMovetemperatureness = (e: React.MouseEvent) => {
    const slider = document.getElementById('lighttemperature-slider');

    let temperatureness = (e.changedTouches[0].clientX - slider.offsetLeft) / slider.clientWidth;
    let temperatureness_val = parseInt(temperatureness * (MAX_VALUE - MIN_VALUE) + MIN_VALUE); // 亮度数值
    if (temperatureness_val < MIN_VALUE) {
      temperatureness_val = MIN_VALUE;
    } else if (temperatureness_val > MAX_VALUE) {
      temperatureness_val = MAX_VALUE;
    }
    console.log(temperatureness_val);
    onToggletemperaturenessVal(temperatureness_val);
    onControlDevice('color_temp', temperatureness_val);
  };
  return (
    <article id={'lighttemperature'} className={classNames('lighttemperature')}>
      <div className={'lighttemperature-container'}>
        <div id={'lighttemperature-mark'} className={classNames('lighttemperature-mark')}>
          <div className={classNames('lighttemperature-mark-op-btn')} onClick={toggleReduce}>-</div>
          <div id={'lighttemperature-value-wrap'} className={classNames('lighttemperature-value-wrap')}>
            {/* <img src={temperaturenessIcon} alt="" /> */}
            <SvgIcon name={'icon-five-bw-temperature-' + themeType} color="#0F0F0F" width={40} height={40}/>
            <div id={'lighttemperature-value-text'}
                 className={classNames('lighttemperature-value-text')}>{temperatureness_val}</div>
          </div>
          <div className={classNames('lighttemperature-mark-op-btn')} onClick={toggleAdd}>+</div>
        </div>
        <div id={'lighttemperature-slider'} className={classNames('lighttemperature-slider')}
             onClick={handleSelecttemperatureness} onTouchMove={handleMovetemperatureness}
             onTouchEnd={handleEndMovetemperatureness}>
          <div id={'lighttemperature-progress'} className={classNames('lighttemperature-progress')}
               style={{width: currentWidth}}>
            <div id={'lighttemperature-progress-dot'} className={classNames('lighttemperature-progress-dot')}>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};
