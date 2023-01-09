import React, { useEffect } from 'react';
import { Icon } from '@custom/Icon';
import { Switch } from '@custom/Switch';
import { Cell } from '@custom/Cell';
import classNames from 'classnames';

export function Home(props) {
  const {
    deviceData,
    doControlDeviceData,
    history: { PATH, push },
  } = { ...props };

  // useEffect(() => {
  //   if (!!deviceData.power_switch) {
  //     if (deviceData.status === 4) {
  //       push(PATH.PROCESS);
  //       return;
  //     }
  //     push(PATH.OPERATOR)
  //   }
  // }, [deviceData.power_switch])

  const onSwitchClick = () => {
    doControlDeviceData('power_switch', Number(!deviceData.power_switch));
  }

  return (
    <main className={classNames("home", !deviceData.power_switch ? 'is-off' : '')}>
      <div className="switch-total">
        <div className="switch-title">开关</div>
        <Switch
          className="reverse custom-switch"
          checked={!!deviceData.power_switch}
          onChange={onSwitchClick}
        />
      </div>
      <div className="header">
        <div className="mask">
          <div className={classNames("title", !deviceData.power_switch ? 'not-doing' : 'doing')}>{!deviceData.power_switch ? `设备已关闭` : `设备已开启`}</div>
        </div>
        <Icon name="pot"></Icon>
      </div>
      <div className="list">
        <Cell
          className="custom-cell"
          title="烹饪模式"
          prefixIcon={<Icon name="home-mode-1"></Icon>}
          isLink={true}
          onClick={() => {
            if (!deviceData.power_switch) {
              return;
            }
            push(PATH.OPERATOR);
          }}
        />
         <Cell
          className="custom-cell"
          title="保温模式"
          prefixIcon={<Icon name="home-mode-2"></Icon>}
          ele="switch"
          isLink={false}
          eleValue={!!deviceData.insulation_mode}
          onChange={(value) => {
            if (!deviceData.power_switch) {
              return;
            }
            doControlDeviceData('insulation_mode', Number(value))
          }}
        />
        {/* <Cell
          className="custom-cell"
          title="清洗模式"
          prefixIcon={<Icon name="home-mode-3"></Icon>}
          ele="switch"
          isLink={false}
          eleValue={!!deviceData.cleaning_mode}
          onChange={(value) => {
            if (!deviceData.power_switch) {
              return;
            }
            doControlDeviceData('cleaning_mode', Number(value))
          }}
        /> */}
        {/* <Cell
          className="custom-cell"
          title="点动模式"
          prefixIcon={<Icon name="home-mode-4"></Icon>}
          ele="switch"
          isLink={false}
        /> */}
      </div>
      <div className="operator" onClick={() => {
        doControlDeviceData('power_switch', Number(!deviceData.power_switch))
      }}>
        <Icon name="switch" />
        <div className="title">开关</div>
      </div>
    </main>
  );
}
