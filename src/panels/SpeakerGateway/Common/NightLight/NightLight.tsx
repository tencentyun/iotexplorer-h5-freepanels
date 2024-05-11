import React, { useState,useEffect } from 'react';
import { useTitle } from '@hooks/useTitle';
import { List, Switch, Slider,Divider } from 'antd-mobile';
import './NightLight.less';
export function NightLight(props) {
  const { 
    deviceData, 
    doControlDeviceData,
    sdk
  } = props;

  useTitle('夜灯设置');

  const marks = {
    0: 0,
    1: 1,
    2: 2,
    3: 3,
    4: 4,
    5: 5,
    6: 6
  }

  const [isEnabled, setIsEnabled] = useState(deviceData.night_light === 0 ? false : true);
  const [sliderValue, setSliderValue] = useState(deviceData.night_light?deviceData.night_light:0);
  // console.log('deviceData',deviceData)
  const handleToggleSwitch = () => {
    setIsEnabled((prev) => !prev);
    console.log(isEnabled);
    if(isEnabled){
      setSliderValue(0)
      doControlDeviceData({
        night_light: 0,
      });
    }else{
      setSliderValue(3)
      doControlDeviceData({
        night_light: 3,
      });
    }
  };

  // useEffect(() => {
  //   console.log('deviceData',deviceData)
  //   deviceData.night_light === 0 ? setIsEnabled(false) : setIsEnabled(true)
  //   setSliderValue(deviceData.night_light)
  // }, [deviceData.night_light]);


  return (
    <>
      <List header='夜灯设置'>
        <List.Item
          extra={(
            <Switch
              checked={isEnabled}
              onChange={handleToggleSwitch} />
          )}
        >
          夜灯开关
        </List.Item>
        <Divider style={{ 'margin': 0 }}/>
        <div className='slider-box'>
          <Slider
            style={{ '--fill-color': '#30414D' }}
            marks={marks}
            ticks
            step={1}
            min={0}
            max={6}
            value={sliderValue}
            disabled={!isEnabled}
            onChange={(val) => {
              setSliderValue(val);
              doControlDeviceData({
                night_light: val,
              });
              if(val === 0){
                setIsEnabled(false)
              }
            }}
          >
          </Slider>
        </div>
        <div
        className='fexid-btn center'
        onClick={() => sdk.goTimingProjectPage()}
      >
        创建夜灯定时
      </div>
      </List>
    </>
  );
}

