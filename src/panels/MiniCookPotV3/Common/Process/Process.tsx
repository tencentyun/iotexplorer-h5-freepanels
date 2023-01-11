import React from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import { getOptions } from '@utils';
import classNames from 'classnames';

const getCountdownTime = (value) => {
  if (value) {
    const hour = `${Math.floor(value / 3600)}`;
    const minute = `${Math.floor((value % 3600) / 60)}`;
    return `${hour < 10 ? '0' + hour : hour}:${minute < 10 ? '0' + minute : minute}`;
  }
  return '-';
};

const getRecentTemp = (value) => {
  console.log(value)
  if (value) {
    return value < 10 ? '0' + value : value
  }
  return '-';
}

export function Process(props) {
  const { templateMap, deviceData, doControlDeviceData } = props;
  return (
    <div className="cook-process">
      <div className="current-status" style={{ backgroundImage: `url(https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/MiniCookPotV3/bg.png)` }}>
        <div className="mask"></div>
        <div className="current-list">
          <div className="current-item">
            <div className="value">{getCountdownTime(deviceData.cooking_time_left)}</div>
            <div className="label">剩余时间</div>
          </div>
          <div className="current-item">
            <div className="value">{`${getRecentTemp(deviceData.temperature)}°C`}</div>
            <div className="label">当前温度</div>
          </div>
        </div>
        <Icon name="pot" />
      </div>
      <div className={classNames("footer", deviceData.status === 4 ? 'doing' : 'not-doing')}>
        <div className="cook-item">
          <div className="cook-icon">
            <Icon name={`mode-${deviceData.working_mode}`} />
          </div>
          <span>{getOptions(templateMap, 'working_mode').filter(item => item.value === '' + deviceData.working_mode)[0]?.label}</span>
        </div>
        <div className="cook-setting">
          <Cell
            title="烹饪温度"
            prefixIcon={<Icon name="temperature" />}
            subTitle={`${getRecentTemp(deviceData.temperature_set)}°C`}
            isLink={true}
          />
          {/* <Cell
            title="保温功能"
            prefixIcon={<Icon name="cook-time" />}
            isLink={false}
            ele="switch"
            eleValue={!!deviceData.insulation_mode}
          /> */}
        </div>
        <div className="cook-btns">
          <div className="btn" onClick={() => {
            if (deviceData.status === 4) {
              doControlDeviceData('status', 2);
              return;
            }
            doControlDeviceData('status', 4);
          }}>
            <Icon name="temperature" />
            <span>{deviceData.status === 4 ? '暂停烹饪' : '继续烹饪'}</span>
          </div>
          <div className="btn" onClick={() => doControlDeviceData('status', 0)}>
            <Icon name="stop" />
            <span>重置</span>
          </div>
        </div>
      </div>
    </div>
  );
}
