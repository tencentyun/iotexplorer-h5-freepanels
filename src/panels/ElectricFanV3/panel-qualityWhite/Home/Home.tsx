import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { CountDown } from '../../Common/CountDown';
import { Slider } from '@custom/Slider';

export function Home(props) {
  const {
    deviceData,
    doControlDeviceData,
    history: { PATH, push },
  } = { ...props };

  const countRef = useRef(null);

  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    setSpeed(deviceData.wind_speed || 0)
  }, [deviceData.wind_speed])

  const handleToggle = (isAdd: boolean) => {
    if (deviceData.power_switch !== 1) return;

    const action = 'wind_speed';
    const max = 100;
    const oldVal = deviceData.wind_speed || 0;

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

  const onSwitchClick = () => {
    doControlDeviceData('power_switch', Number(!deviceData.power_switch));
  }

  const onModeClick = (value) => {
    if (!deviceData.power_switch) {
      return;
    }
    doControlDeviceData('working_mode', value);
  }

  const onCountDownClick = () => {
    if (!deviceData.power_switch) {
      return;
    }
    countRef.current.onOpen();
  }

  const onTimeClick = () => {
    if (!deviceData.power_switch) {
      return;
    }
    push(PATH.TIMER_LIST, { isModule: false });
  }

  const onPlusClick = () => {
    if (!deviceData.power_switch) {
      return;
    }
    handleToggle(true);
  }

  const onMinusClick = () => {
    if (!deviceData.power_switch) {
      return;
    }
    handleToggle(false);
  }

  return (
    <main
      className={classNames(
        'home',
        deviceData.power_switch === 1 ? 'power-on' : 'power-off',
      )}
    >
      {/* 表盘 */}
      <div className={classNames('disk-wrap')}>
        <div className="outer">

        </div>
        <div className="center">
          <div className="inner">
            <div className="title">风速</div>
            <div className="content">
              <div className="value">{deviceData.wind_speed || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* 设置按钮 */}
      <footer
        className={classNames('home-footer')}
      >
        <div className="add-reduce">
          <div className="btn" onClick={onMinusClick}>
            <Icon name="minus" />
          </div>
          <div className="custom-slider">
            <div className="scale-list">
              <div className='scale scale-1'></div>
              <div className='scale scale-2'></div>
              <div className='scale scale-3'></div>
              <div className='scale scale-4'></div>
              <div className='scale scale-5'></div>
              <div className='scale scale-6'></div>
              <div className='scale scale-7'></div>
              <div className='scale scale-8'></div>
              <div className='scale scale-9'></div>
            </div>
            <Slider
              step={1}
              min={0}
              max={100}
              value={speed}
              // marks={marks}
              onChange={(val) => {
                if (!deviceData.power_switch) {
                  return;
                }
                setSpeed(val);
                doControlDeviceData({
                  wind_speed: val,
                });
              }}
            >
            </Slider>

          </div>
          <div className="btn" onClick={onPlusClick}>
            <Icon name="plus" />
          </div>
        </div>
        <div className="actions">
          <Cell
            className="cell-second"
            title="定时"
            isLink={true}
            prefixIcon={<Icon name="time" />}
            onClick={onTimeClick}
          ></Cell>
          <Cell
            className="cell-second"
            title="开关"
            isLink={true}
            prefixIcon={<Icon name="switch" />}
            onClick={onSwitchClick}
          ></Cell>
          <Cell
            className="cell-second"
            title="倒计时"
            isLink={true}
            prefixIcon={<Icon name="count" />}
            onClick={onCountDownClick}
          >
          </Cell>
        </div>
        <div className="actions">
          <Cell
            className="cell-first"
            title="默认"
            isLink={true}
            prefixIcon={<Icon name="mode1" />}
            onClick={() => { onModeClick(0) }}
          ></Cell>
          <Cell
            className="cell-first"
            title="左右摇头"
            isLink={true}
            prefixIcon={<Icon name="mode2" />}
            onClick={() => { onModeClick(1) }}
          >
          </Cell>
          <Cell
            className="cell-first"
            title="上下摇头"
            isLink={true}
            prefixIcon={<Icon name="mode3" />}
            onClick={() => { onModeClick(2) }}
          ></Cell>
          <Cell
            className="cell-first"
            title="循环模式"
            isLink={true}
            prefixIcon={<Icon name="mode4" />}
            onClick={() => { onModeClick(3) }}
          >
          </Cell>
        </div>

      </footer>

      <CountDown ref={countRef} {...props} />
    </main>
  );
}
