import React, { useEffect, useState } from 'react';
import { Icon } from '@custom/Icon';
import { Cell } from '@custom/Cell';
import classNames from 'classnames';
import { CustomPickerView } from '@custom/CustomPicker';

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
      <div className="header">
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
      </div>
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
