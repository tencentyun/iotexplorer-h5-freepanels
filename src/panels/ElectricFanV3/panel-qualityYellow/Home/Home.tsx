import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { OptionDialog } from '@custom/OptionDialog';
import { Cell } from '@custom/Cell';
import { CountDown } from '../CountDown';
import { Switch } from '@custom/Switch';


const MODE_LIST = ['默认模式', '左右摇头', '上下摇头', '循环模式'];

export function Home(props) {
  const {
    deviceData,
    doControlDeviceData,
    history: { PATH, push },
  } = { ...props };

  const countRef = useRef(null);

  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(deviceData.working_mode || '');


  const handleToggle = (isAdd: boolean) => {
    if (deviceData.power_switch !== 1) return;

    const action = 'humidity_set';
    const max = 100;
    const oldVal = deviceData.humidity_set || 0;

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

  const onModeClick = () => {
    if (!deviceData.power_switch) {
      return;
    }
    setModeVisible(true);
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
      {/* 模式 */}
      <div className="top">
      </div>
      {/* 表盘 */}
      <div className={classNames('disk-wrap')}>
        <div className="switch-total">
          <div className="switch-title">开关</div>
          <Switch
            className="reverse custom-switch"
            checked={!!deviceData.power_switch}
            onChange={onSwitchClick}
          />
        </div>
        <div className="right">
          <Icon name="fan" />
        </div>
      </div>

      {/* 设置按钮 */}
      <footer
        className={classNames('home-footer')}
      >
        <div className="mode-text">
          {`模式：${MODE_LIST[deviceData?.working_mode || 0]}`}
        </div>
        <div className="actions">
          <Cell
            className="cell-settings"
            title="定时"
            isLink={true}
            prefixIcon={<Icon name="time" />}
            onClick={onTimeClick}
          ></Cell>
          <Cell
            className="cell-settings"
            title="倒计时"
            isLink={true}
            prefixIcon={<Icon name="count" />}
            onClick={onCountDownClick}
          >
          </Cell>
          <Cell
            className="cell-settings mode-btn-settings"
            title="模式"
            isLink={true}
            prefixIcon={<Icon name="mode" />}
            onClick={onModeClick}
          >
          </Cell>
          <div className="add-reduce">
            <div className="btn" onClick={onMinusClick}>
              <Icon name="minus" />
            </div>
            <div className="btn" onClick={onPlusClick}>
              <Icon name="plus" />
            </div>
          </div>
        </div>
        <CountDown ref={countRef} {...props} />
        <OptionDialog
          visible={modeVisible}
          title="模式"
          defaultValue={[modeValue ? modeValue : 0]}
          options={MODE_LIST.map((item, index) => ({ label: item, value: index }))}
          onCancel={() => {
            setModeVisible(false);
          }}
          onConfirm={(value) => {
            setModeValue(value[0]);
            doControlDeviceData('working_mode', value[0]);
          }}
        ></OptionDialog>
      </footer>
    </main>
  );
}
