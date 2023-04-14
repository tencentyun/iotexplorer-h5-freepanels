import React, { useEffect, useRef } from 'react';
import { Icon } from '@custom/Icon';
import { getOptions } from '@utils';
import { CountDown } from '../CountDown';
import { Switch } from '@custom/Switch';
import classNames from 'classnames';

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
          {getOptions(templateMap, 'working_mode').map((item, index) => {
            return (
              <div className={classNames('item', deviceData.working_mode === index + 1 ? 'checked' : '')} key={index} onClick={() => { doControlDeviceData('working_mode', parseInt(item.value)) }}>
                <div className="mode-bg" style={{ backgroundImage: `url(https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/WallBreakerV3/mode-${index}.png)` }}></div>
                <div className="title">{item.label}</div>
              </div>
            );
          })}
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
            <span className={deviceData.status === 2 ? 'no-after' : ''}>{deviceData.status === 2 ? '继续烹饪' : '开始'}</span>
          </div>
          <div className="custom-btn" onClick={() => countRef.current.onOpen()}>
            <Icon name="time" />
            <span>定时</span>
          </div>
        </div>
        <CountDown ref={countRef} {...props} />

      </main>
    </div>

  );
}
