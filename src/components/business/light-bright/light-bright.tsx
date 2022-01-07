import React, { useRef, useState, useEffect } from 'react';
import classNames from 'classnames';
import './light-bright.less';
import { StyledProps, ThemeType } from '@libs/global';
import { SvgIcon } from '@components/common/icon';
import { onControlDevice } from '@hooks/useDeviceData';
import { getThemeType } from '@libs/theme';

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
  const [dataUser, setDataUser] = useState(props.defaultValue);
  const currentWidth = (dataUser-min_value)*100/(max_value-min_value)+'%';
  const slider = useRef();

  const updateBrightVal =(val) => {
    if(val<min_value) {
      val = min_value;
    }else if(val>max_value){
      val = max_value;
    }
    setDataUser(val);
    onControlDevice('brightness', val);
  }

  useEffect(() => {
    props.onChange && props.onChange(dataUser);
  }, [dataUser]);

  const handleSelectBrightness = (e: React.MouseEvent) => {
    let val = (e.clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    let tmp = parseInt(val * (max_value-min_value))+min_value;
    updateBrightVal(tmp);
  };

  const handleMoveBrightness = (e: React.MouseEvent) => {
    let val = (e.changedTouches[0].clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    let tmp = parseInt(val * (max_value-min_value))+min_value;
  };

  const handleEndMoveBrightness = (e: React.MouseEvent) => {
    let val = (e.changedTouches[0].clientX - slider.current.offsetLeft) / slider.current.clientWidth;
    let tmp = parseInt(val * (max_value-min_value))+min_value;
    updateBrightVal(tmp);
  };
  return (
          <div className={'lightbright-container'}>
            <div className={classNames('lightbright-mark')}>
              <div>-</div>
              <div className={classNames('lightbright-value-wrap')}>
                <SvgIcon name={'icon-brightness-'+theme} color="#0F0F0F" width={160} height={160}/>
                <div className={classNames('lightbright-value-text')}>{dataUser}</div>
              </div>
              <div>+</div>
            </div>
            <div ref={slider} className={classNames('lightbright-slider')} onClick={handleSelectBrightness} onTouchMove={handleMoveBrightness} onTouchEnd={handleEndMoveBrightness}>
              <div className={classNames('lightbright-progress')} style={{width:currentWidth}}>
                <div className={classNames('lightbright-progress-dot')}>
                </div>
              </div>
            </div>
          </div>
  );
};
