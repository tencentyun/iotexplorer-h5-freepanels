import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Swiper } from '@custom/Swiper';
import { getOptions } from '@utils';
import { Cell } from '@custom/Cell';
import { CountDown } from '../CountDown';
import { CustomPickerView } from '@custom/CustomPicker';
import { Switch } from '@custom/Switch';


const getCountdownTime = (value) => {
  if (value) {
    const hour = `${Math.floor(value / 3600)}`;
    const minute = `${Math.floor((value % 3600) / 60)}`;
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
  }
  return '-';
};

export function Operator(props) {
  const {
    templateMap,
    deviceData,
    doControlDeviceData,
    history: { PATH, push, goBack },
  } = { ...props };

  useEffect(() => {
    if (deviceData.power_switch === 0) {
      push(PATH.HOME);
    }
  }, [deviceData.power_switch])

  const countRef = useRef(null);
  const cookRef = useRef(null);

  const [visible, setVisible] = useState(false);

  const getTemperatureList = () => {
    const temperatureMax = Number(templateMap['temperature_set'].define.max);
    const temperatureStep = Number(templateMap['temperature_set'].define.step);
    let num = 0;
    let temperatureList = [] as number[];
    while (num < temperatureMax) {
      num = num + temperatureStep;
      temperatureList.push(num);
    }
    return temperatureList;
  }

  const onSwitchClick = () => {
    doControlDeviceData('power_switch', 0);
  }

  return (
    <div className="operator-page">
      <div className="operator-header">
        <div className="switch-total">
          <div className="switch-title">开关</div>
          <Switch
            className="reverse custom-switch"
            checked={true}
            onChange={onSwitchClick}
          />
        </div>
        <Icon name="pot" />
      </div>
      <main className="operator-list">
        <div className="list">
          <Swiper
            stuckAtBoundary={false}
            slideSize={16}
            indicator={() => null} >
            {getOptions(templateMap, 'working_mode').map((item, index) => {
              return (
                <Swiper.Item key={index} onClick={() => { doControlDeviceData('working_mode', parseInt(item.value)) }}>
                  <div className="item">
                    <div className="icon-bg">
                      <Icon name={`mode-${index}`} />
                    </div>
                    <div className="title">{item.label}</div>
                  </div>
                </Swiper.Item>
              );
            })}
          </Swiper>
        </div>
        <div className="desc">若您已选烹饪模式后，无需再手动定义下方烹饪参数</div>
        <div className={classNames('options', `${deviceData.working_mode !== 0 ? 'is-disabled' : ''}`)}>
          <div className="title">烹饪参数</div>
          <div className="options-list">
            <Cell
              className="cell-item"
              title="烹饪温度"
              subTitle={`${!deviceData.temperature_set ? '-' : deviceData.temperature_set}°C`}
              isLink={true}
              prefixIcon={<Icon name="temperature" />}
              onClick={() => {
                if (deviceData.working_mode !== 0) {
                  return;
                }
                setVisible(true);
              }}
            />
            <Cell
              className="cell-item"
              title="保温功能"
              isLink={false}
              prefixIcon={<Icon name="cook-time" />}
              ele="switch"
              eleValue={!!deviceData.insulation_mode}
              onChange={(value) => {
                if (deviceData.working_mode !== 0) {
                  return;
                }
                doControlDeviceData('insulation_mode', Number(value));
              }}
            />
          </div>
        </div>
        {deviceData.status === 4 ? <div className="cooking" onClick={() => push(PATH.PROCESS)}><span>美食</span><span>烹饪中</span></div> : null}
        <div className="footer">
          <div className="custom-btn" onClick={() => { doControlDeviceData('power_switch', 0); }}>
            <Icon name="switch" />
          </div>
          <div className="custom-btn" onClick={() => {
            doControlDeviceData('status', 4);
            push(PATH.PROCESS);
          }}>
            <Icon name="start" />
            <span>{deviceData.status === 2 ? '继续烹饪' : '开始'}</span>
          </div>
          <div className="custom-btn" onClick={() => countRef.current.onOpen()}>
            <Icon name="time" />
            <span>定时</span>
          </div>
        </div>
        <CountDown ref={countRef} {...props} />
        {/* <CountDown ref={cookRef} {...props} attr="cooking_time" title="烹饪时间" /> */}
        <CustomPickerView
          {...props}
          title={"烹饪温度"}
          visible={visible}
          optionValues={getTemperatureList()}
          value={[!deviceData.temperature_set ? 0 : deviceData.temperature_set]}
          onCancel={setVisible.bind(null, false)}
          onConfirm={([value]) => {
            setVisible(false);
            doControlDeviceData('temperature_set', parseInt(value));
          }}
        />
      </main>
    </div>

  );
}
