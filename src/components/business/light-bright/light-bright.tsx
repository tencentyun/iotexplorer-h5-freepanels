import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import './light-bright.less';
import { StyledProps } from '@libs/global';
import { SvgIcon } from '@components/common/icon';
import { onControlDevice } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';
import '@icons/themes/icons/svg/common';

export interface LightBrightProps extends StyledProps {
  defaultValue?: number; // 0 - 100
  desc?: string;
  onChange?: any;
  maxValue?: number;
  minValue?: number;
}

export function LightBright(props: LightBrightProps) {
  const theme = getThemeType();
  const max_value = props.maxValue || 100;
  const min_value = props.minValue || 0;
  const [dataInfo, setDataInfo] = useState({dataUser:props.defaultValue,endTouch:false});
  const currentWidth = (5+(dataInfo.dataUser-min_value)*95/(max_value-min_value))+'%'; 
  const slider = useRef();

  const updateBrightVal =(val, endTouch) => {
    if(val<min_value) {
      val = min_value;
    }else if(val>max_value){
      val = max_value;
    }
    // setDataUser(val);
    // onControlDevice('brightness', val);
    setDataInfo({dataUser:val,endTouch:endTouch});
  }

  useEffect(() => {
    props.onChange && props.onChange(dataInfo.dataUser, dataInfo.endTouch);
  }, [dataInfo]);

  const toggleReduce = () => {
    updateBrightVal(dataInfo.dataUser-1, true);
  }

  const toggleAdd= () => {
    updateBrightVal(dataInfo.dataUser+1, true);
  }

  // const handleSelectBrightness = (e: React.MouseEvent) => {
  //   let val = (e.clientX - slider.current.offsetLeft) / slider.current.clientWidth;
  //   let tmp = parseInt(val * (max_value-min_value))+min_value;
  //   updateBrightVal(tmp, true);
  // };

  const handleMoveBrightness = (e: TouchEvent) => {
    // let val = (e.changedTouches[0].clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    let val = (e.touches[0].clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    let tmp = parseInt(val * (max_value-min_value))+min_value;
    updateBrightVal(tmp, false);
  };

  const handleEndMoveBrightness = (e: TouchEvent) => {
    e.preventDefault();
    e.stopPropagation();
    document.removeEventListener('touchmove', handleMoveBrightness);
    document.removeEventListener('touchend', handleEndMoveBrightness);

    let val = (e.changedTouches[0].clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    // let val = (e.touches[0].clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    let tmp = parseInt(val * (max_value-min_value))+min_value;
    updateBrightVal(tmp, true);
  };

  const handleStartMoveBrightness = (e: TouchEvent) => {
    document.addEventListener('touchmove', handleMoveBrightness);
    document.addEventListener('touchend', handleEndMoveBrightness);
  };

  return (
          <div className={'lightbright-container'}>
            <div className={classNames('lightbright-mark')}>
              <div className={classNames('lightbright-mark-op-btn')} onClick={toggleReduce}>-</div>
              <div className={classNames('lightbright-value-wrap')}>
                <SvgIcon name={'icon-brightness-'+theme} color="#0F0F0F" width={160} height={160}/>
                <div className={classNames('lightbright-value-text')}>{dataInfo.dataUser}</div>
              </div>
              <div className={classNames('lightbright-mark-op-btn')} onClick={toggleAdd}>+</div>
            </div>
            {/* <div ref={slider} className={classNames('lightbright-slider')} onClick={handleSelectBrightness} onTouchMove={handleMoveBrightness} onTouchEnd={handleEndMoveBrightness}> */}

            <div className={classNames('lightbright_border')} onTouchStart={handleStartMoveBrightness}>
              <div ref={slider} className={classNames('lightbright-slider')}>
                <div className={classNames('lightbright-progress')} style={{width:currentWidth}}>
                  <div className={classNames('lightbright-progress-dot')}>
                  </div>
                </div>
              </div>
            </div>

          </div>
  
  );
};
