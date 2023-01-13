import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import classNames from 'classnames';
import { CustomPickerView } from '@custom/CustomPicker';
import { getOptions } from '@utils';

const getRecentTemp = (value) => {
  if (value) {
    return value < 10 ? '0' + value : value
  }
  return '-';
}

export function Temperature(props) {
  const {
    templateMap,
    deviceData,
    doControlDeviceData,
    history: { PATH, push },
  } = { ...props };
  const [heatVisible, setHeatVisible] = useState(false);
  const getList = (attr) => {
    const min = Number(templateMap[attr].define.min);
    const max = Number(templateMap[attr].define.max);
    const step = Number(templateMap[attr].define.step);
    let num = min - 1;
    let list = [] as number[];
    while (num < max) {
      num = num + step;
      list.push(num);
    }
    return list;
  }
  return (
    <main className={classNames("keep-temperature")}>


      <div className="current-status" style={{ backgroundImage: `url(https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/HealthPotV3/bg.png)` }}>
        <div className="mask"></div>
        <div className="current-list">
          <Cell
            title="保温温度"
            subTitle={`${getRecentTemp(deviceData.insulation_temp)}°C`}
            isLink={true}
            onClick={(value) => {
              setHeatVisible(true)
            }}
          />
        </div>
        <Icon name="pot" />
      </div>
      <div className={classNames("footer", deviceData.status === 4 ? 'doing' : 'not-doing')}>
        <div className="cook-item">
          <div className="cook-icon">
            <Icon name={`mode-${deviceData.working_mode}`} />
          </div>
          <span className="title">{getOptions(templateMap, 'working_mode').filter(item => item.value === '' + deviceData.working_mode)[0]?.label}</span>
          <span className="working-status">{getOptions(templateMap, 'status').filter(item => item.value === '' + deviceData.status)[0]?.label || '-'}</span>
        </div>
        <div className="cook-btns">
          <div className="btn" onClick={() => {
            if (deviceData.status === 4) {
              doControlDeviceData('status', 2);
              return;
            }
            doControlDeviceData('status', 4);
          }}>
            <Icon name="cook-time" />
            <span>{deviceData.status === 4 ? '暂停保温' : '开始保温'}</span>
          </div>
          <div className="btn" onClick={() => doControlDeviceData('status', 0)}>
            <Icon name="stop" />
            <span>重置</span>
          </div>
        </div>
      </div>



      {/* <div className="header" style={{ backgroundImage: `url(https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/HealthPotV3/bg.png)` }}>
        <div className="mask">
          <div className={classNames("title", !deviceData.power_switch ? 'not-doing' : 'doing')}>{!deviceData.power_switch ? `待机中` : `保温中`}</div>
        </div>
        <Icon name="pot"></Icon>
      </div>
      <div className="list">
        <Cell
          className="custom-cell"
          title="保温模式"
          subTitle={`${deviceData.insulation_temp ? deviceData.insulation_temp : '-'}°C`}
          prefixIcon={<Icon name="home-mode-2"></Icon>}
          isLink={true}
          onClick={(value) => {
            setHeatVisible(true)
          }}
        />
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
          <span>{deviceData.status === 4 ? '暂停保温' : '开始保温'}</span>
        </div>
        <div className="btn" onClick={() => doControlDeviceData('status', 0)}>
          <Icon name="stop" />
          <span>重置</span>
        </div>
      </div> */}
      <CustomPickerView
        {...props}
        title={"保温温度"}
        visible={heatVisible}
        optionValues={getList('insulation_temp')}
        value={[!deviceData.insulation_temp ? 0 : deviceData.insulation_temp]}
        onCancel={setHeatVisible.bind(null, false)}
        onConfirm={([value]) => {
          setHeatVisible(false);
          doControlDeviceData('insulation_temp', parseInt(value));
        }}
      />
    </main>
  );
}
