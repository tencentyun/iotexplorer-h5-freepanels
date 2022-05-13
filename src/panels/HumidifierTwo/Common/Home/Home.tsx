import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import { Slider } from './Slider';
import { OptionDialog } from '@custom/OptionDialog';
import { getOptions, getDesc } from '@utils';

export function Home({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push },
}) {
  // 工作模式弹窗
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(deviceData.mode || '');
  // 档位弹窗
  const [gearVisible, setGearVisible] = useState(false);
  const [gearValue, setGearValue] = useState(deviceData.fan_speed_enum || '');

  const [isShow, setShow] = useState(false);
  const handleScroll = (event) => {
    const scrollY: number = window.screenY;
    console.log(event.srcElement.scrollTop, 'asdfasdfsdf====');
    if (event.srcElement.scrollTop > 0) {
      setShow(true);
    } else {
      setShow(false);
    }
    // console.log(window.innerHeight, 'handleResize');
    // setWindowHeight(window.innerHeight);
  };
  useEffect(() => {
    // 监听
    window.addEventListener('scroll', handleScroll, true);
    // 销毁
    return () => window.removeEventListener('scroll', handleScroll, true);
  });

  const handleToggle = (isAdd: boolean) => {
    if (deviceData.power_switch !== 1) return;

    const action = 'set_humidity';
    const max = 100;
    const oldVal = deviceData.set_humidity || 0;

    if (isAdd) {
      if (oldVal < max) {
        doControlDeviceData({
          [action]: oldVal + 1,
        });
      }
    } else {
      if (oldVal > 0) {
        doControlDeviceData({
          [action]: oldVal - 1,
        });
      }
    }
  };

  return (
    <main
      className={classNames(
        'home',
        deviceData.power_switch === 1 ? 'power-on' : 'power-off',
      )}
    >
      {/* 顶部 */}
      <ul  className="content-wrap">
        <li className="content-item">
          <div className="content">{deviceData.current_temp || 0}{'°'}<span>{deviceData.temp_unit_convert === 1 ? 'F' : 'C'}</span></div>
          <div className="label">环境温度</div>
        </li>
        <li className="content-item">
          <div className="content">{deviceData.current_humidity || 0}<span>%</span></div>
          <div className="label">环境湿度</div>
        </li>
      </ul>
      {/* 表盘 */}
      <div className={classNames(!isShow ? 'disk-wrap' : 'slider-wrap')}>
        {!isShow
          ? <Disk
            status={deviceData.power_switch === 1}
            value={deviceData.set_humidity || 0}
            valueWater={deviceData.current_level}
            // maxValue={}
            // minValue={}
          ></Disk>
          : <Slider defaultValue={deviceData.set_humidity || 0}></Slider>
        }
      </div>

      {/* 设置按钮 */}
      <footer
        className={classNames(
          'home-footer',
          isShow ? 'footer-open' : 'footer-close',
        )}
      >
        <div className="control-wrap">
          <div
            className="control-btn"
            onClick={() => {
              handleToggle(false);
            }}
          >
            <Icon name="minus"></Icon>
          </div>
          <div
            className="power-btn"
            onClick={() => {
              doControlDeviceData('power_switch', Number(!deviceData.power_switch));
            }}
          >
            <Icon name="switch"></Icon>
          </div>
          <div
            className="control-btn"
            onClick={() => {
              handleToggle(true);
            }}
          >
            <Icon name="plus"></Icon>
          </div>
        </div>
        <div className="setting-button-wrap">
          <div
            className="block-button-word"
            onClick={() => {
              setModeVisible(true);
            }}
          >
            <Icon name="mode"/>
            <p className="button-name">{modeValue ? getDesc(templateMap, 'work_mode', modeValue) : '超声波'}</p>
            <OptionDialog
              visible={modeVisible}
              title="工作模式"
              defaultValue={[modeValue ? modeValue : '']}
              options={getOptions(templateMap, 'work_mode')}
              onCancel={() => {
                setModeVisible(false);
              }}
              onConfirm={(value) => {
                setModeValue(value[0]);
                doControlDeviceData('work_mode', value[0]);
              }}
            ></OptionDialog>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              setGearVisible(true);
            }}
          >
            <Icon name="gear"/>
            <p className="button-name">{gearValue ? getDesc(templateMap, 'spray_gears', gearValue) : '档位'}</p>
            <OptionDialog
              visible={gearVisible}
              title="喷雾档位"
              defaultValue={[gearValue ? gearValue : '']}
              options={getOptions(templateMap, 'spray_gears')}
              onCancel={() => {
                setGearVisible(false);
              }}
              onConfirm={(value) => {
                setGearValue(value[0]);
                doControlDeviceData('spray_gears', value[0]);
              }}
            ></OptionDialog>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.SETTINGS);
            }}
          >
            <Icon name="settings"/>
            <p className="button-name">更多</p>
          </div>
        </div>
        {isShow
          ? <div className="desc-content-wrap">
            <div className="top">
              <div className="item">
                <span className="value">{deviceData.eco2 || 0}ppm</span>
                <span className="label">eCO2</span>
              </div>
              <div className="item">
                <span className="value">{deviceData.pm25 || 0}</span>
                <span className="label">PM2,5</span>
              </div>
              <div className="item">
                <span className="value">{deviceData.tvoc || 0}ppm</span>
                <span className="label">TVOC</span>
              </div>
            </div>
            <div className="bottom">
              <div className="item">
                <span className="value">深圳</span>
                <span className="label">位置</span>
              </div>
              <div className="item">
                <span className="value">多云</span>
                <span className="label">天气</span>
              </div>
            </div>
          </div> : null
        }
      </footer>
    </main>
  );
}
