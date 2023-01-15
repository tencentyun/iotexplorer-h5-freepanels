import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { CountDown } from '../../Common/CountDown';
import { Slider } from '@custom/Slider';
import { OptionDialog } from '@custom/OptionDialog';

const MODE_LIST = ['默认模式', '左右摇头', '上下摇头', '循环模式'];
export function Home(props) {
  const {
    deviceData,
    doControlDeviceData,
    history: { PATH, push },
  } = { ...props };

  const countRef = useRef(null);

  const [speed, setSpeed] = useState(0);
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(0);

  useEffect(() => {
    setModeValue(deviceData.working_mode || 0)
  }, [deviceData.working_mode])

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
            className="cell-first"
            title="开关"
            isLink={true}
            prefixIcon={<Icon name="switch" />}
            onClick={onSwitchClick}
          ></Cell>
          <Cell
            className="cell-first"
            title="定时"
            isLink={true}
            prefixIcon={<Icon name="time" />}
            onClick={onTimeClick}
          >
          </Cell>
          <Cell
            className="cell-first"
            title="倒计时"
            isLink={true}
            prefixIcon={<Icon name="count" />}
            onClick={onCountDownClick}
          ></Cell>
          <Cell
            className="cell-first"
            title="模式"
            isLink={true}
            prefixIcon={<Icon name="mode" />}
            onClick={() => {
              if (!deviceData.power_switch) {
                return;
              }
              setModeVisible(true)
            }}
          >
          </Cell>
        </div>
      </footer>
      <OptionDialog
        visible={modeVisible}
        title="模式"
        value={[modeValue || 0]}
        options={MODE_LIST.map((item, index) => ({ label: item, value: index }))}
        onCancel={() => {
          setModeVisible(false);
        }}
        onConfirm={(value) => {
          setModeValue(value[0]);
          doControlDeviceData('working_mode', value[0]);
        }}
      ></OptionDialog>
      <CountDown ref={countRef} {...props} isModule={true} />
    </main>
  );
}
