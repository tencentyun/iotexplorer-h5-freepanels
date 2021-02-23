import React, { useState } from 'react';
import { DoControlDeviceData } from '@hooks/useDeviceInfo';
import * as wxlib from '@wxlib';
import { SectionList } from "@components/SectionList";
import { Switch } from "@components/Switch";
import { NumberModal } from '@components/NumberModal';
import { TimePeriodSetting } from '@components/TimePeriodSetting';
import { WaterHeaterSetting } from './WaterHeaterSetting';
import './Subpage.less';

export function Subpage({
  doControlDeviceData,
  templateMap,
  deviceData,
}: {
  doControlDeviceData: DoControlDeviceData,
  templateMap?: any,
  deviceData?: any,
}) {

  const [disinfectionEnable, setDisinfectionEnable] = useState(deviceData.disinfection ? true : false);
  const [nightPowerEnable, setNightPowerEnable] = useState(deviceData.night_power ? true : false);
  const [switchMicrowaveEnable, setSwitchMicrowaveEnable] = useState(deviceData.switch_microwave ? true : false);
  const [childLockEnable, setChildLockEnable] = useState(deviceData.child_lock ? true : false);
  const [ecoEnable, setECOEnable] = useState(deviceData.ECO ? true : false);

  const height = 22,
    width = 38,
    handleDiameter = 20;

  const [waterHeaterSettingVisible, setWaterHeaterSettingVisible] = useState(false);
  const [identifier, setIdentifier] = useState('');
  const [identifierValue, setIdentifierValue] = useState(null);

  const [numberPanelInfo, setNumberPanelInfo] = useState({
    visible: false,
    templateId: '',
  });

  const [timePeriodSettingVisible, setTimePeriodSettingVisible] = useState(false);

  const handleTimePeriodSettingConfirm = async ({ enable, value }) => {
    if (value[0] > value[1]) {
      wxlib.tips.showInfo('开始时间不能大于结束时间');
      return;
    }
    if (!enable) {
      await doControlDeviceData('water_consum', {
        start_time: 0,
        completion_time: 0,
      });
    } else {
      await doControlDeviceData('water_consum', {
        start_time: value[0],
        completion_time: value[1],
      });
    }

    setTimePeriodSettingVisible(false);
  };

  const second2HourMinute = (time = 0): [number, number] => {
    if (!time || time <= 0) return [0, 0];

    const hours = Math.floor(time / 3600);
    const minutes = Math.ceil((time - hours * 3600) / 60);

    return [hours, minutes];
  };

  const toTens = (value) => {
    if (value < 10) {
      return '0' + value;
    } else {
      return value;
    }
  }

  const second2HourMinuteGroup = (time, timeLatter) => {
    if ((!time || time <= 0) && !timeLatter || timeLatter <= 0) return '';

    const hours = Math.floor(time / 3600);
    const minutes = Math.ceil((time - hours * 3600) / 60);
    const hoursLateer = Math.floor(timeLatter / 3600);
    const minutesLatter = Math.ceil((timeLatter - hoursLateer * 3600) / 60);
    const timeGroup = toTens(hours) + ':' + toTens(minutes) + ' ~ ' + toTens(hoursLateer) + ':' + toTens(minutesLatter);

    return timeGroup;
  }


  const transformShowMapping = (val) => {
    if (deviceData[val] || deviceData[val] === 0) {
      return templateMap[val].define.mapping[deviceData[val]]
    } else {
      return '摄氏度';
    }
  };

  const {
    define: {
      start = 2000,
    } = {},
  } = templateMap['water_set'] || {};


  return (
    <>
      <div className="water-heater-subpage clearfix">
        <SectionList>
          <SectionList.Item
            label={'预约用水'}
            onClick={() => {
              setTimePeriodSettingVisible(true);
            }}
          >
            {second2HourMinuteGroup(deviceData.water_consum && deviceData.water_consum.start_time, deviceData.water_consum && deviceData.water_consum.completion_time)}
          </SectionList.Item>
          <SectionList.Item
            label={'水位设置'}
            onClick={() => {
              setNumberPanelInfo({
                visible: true,
                templateId: 'water_set',
              });
            }}
          >
            {`${deviceData.water_set || start}ml`}
          </SectionList.Item>
          <SectionList.Item
            label={'温标切换'}
            onClick={() => {
              setIdentifier('temp_unit_convert');
              setIdentifierValue(deviceData.temp_unit_convert);
              setWaterHeaterSettingVisible(true);
            }}
          >
            {transformShowMapping('temp_unit_convert')}
          </SectionList.Item>
        </SectionList>
        <SectionList className="switch-item">
          <SectionList.Item
            label={'ECO模式'}
            clickable={false}
          >
            <Switch
              checked={ecoEnable}
              onChange={(value) => {
                setECOEnable(value);
                doControlDeviceData('ECO', value ? 1 : 0);
              }}
              className='water-heater-switch'
              height={height}
              width={width}
              handleDiameter={handleDiameter}
            />
          </SectionList.Item>
          <SectionList.Item
            label={'消毒'}
            clickable={false}
          >
            <Switch
              checked={disinfectionEnable}
              onChange={(value) => {
                setDisinfectionEnable(value);
                doControlDeviceData('disinfection', value ? 1 : 0);
              }}
              className='water-heater-switch'
              height={height}
              width={width}
              handleDiameter={handleDiameter}
            />
          </SectionList.Item>
          <SectionList.Item
            label={'夜电'}
            clickable={false}
          >
            <Switch
              checked={nightPowerEnable}
              onChange={(value) => {
                setNightPowerEnable(value);
                doControlDeviceData('night_power', value ? 1 : 0);
              }}
              className='water-heater-switch'
              height={height}
              width={width}
              handleDiameter={handleDiameter}
            />
          </SectionList.Item>
          <SectionList.Item
            label={'微波开关'}
            clickable={false}
          >
            <Switch
              checked={switchMicrowaveEnable}
              onChange={(value) => {
                setSwitchMicrowaveEnable(value);
                doControlDeviceData('switch_microwave', value ? 1 : 0);
              }}
              className='water-heater-switch'
              height={height}
              width={width}
              handleDiameter={handleDiameter}
            />
          </SectionList.Item>
          <SectionList.Item
            label={'童锁开关'}
            clickable={false}
          >
            <Switch
              checked={childLockEnable}
              onChange={(value) => {
                setChildLockEnable(value);
                doControlDeviceData('child_lock ', value ? 1 : 0);
              }}
              className='water-heater-switch'
              height={height}
              width={width}
              handleDiameter={handleDiameter}
            />
          </SectionList.Item>
        </SectionList>
      </div>
      {waterHeaterSettingVisible && (
        <WaterHeaterSetting
          visible={true}
          onClose={() => setWaterHeaterSettingVisible(false)}
          controlDeviceData={doControlDeviceData}
          identifier={identifier}
          identifierValue={identifierValue}
          templateMap={templateMap}
        />
      )}
      {numberPanelInfo.visible && (
        <NumberModal
          visible={true}
          templateId={numberPanelInfo.templateId}
          templateConfig={templateMap[numberPanelInfo.templateId]}
          value={deviceData[numberPanelInfo.templateId]}
          onChange={async (id, value) => {
            await doControlDeviceData(id, value);
            setNumberPanelInfo(({ visible: false, templateId: '' }));
          }}
          onClose={() => setNumberPanelInfo({ visible: false, templateId: '' })}
          showBackBtn={true}
        />
      )}
      {timePeriodSettingVisible && (
        <TimePeriodSetting
          visible={true}
          value={[...second2HourMinute(deviceData.water_consum && deviceData.water_consum.start_time), ...second2HourMinute(deviceData.water_consum && deviceData.water_consum.completion_time)]}
          onCancel={() => setTimePeriodSettingVisible(false)}
          onConfirm={handleTimePeriodSettingConfirm}
        />
      )}
    </>
  );
}
