/*
 * @Description: 电量统计插座首页
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { Block } from '@components/layout';
import { SvgIcon } from '@components/common';
import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { onControlDevice } from '@hooks/useDeviceData';
import { CurrentSkinProps } from '../skinProps';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

const themeType = getThemeType();

// 聚合数据接口内结构
interface AggsDataProps {
  Data: number; // 数据
  Date: string; // 日期
  TimestampMs: number; // 时间戳
}

export function Home() {
  const history = useHistory();
  const [dayElectricity, setDayElectricity] = useState(0.0);
  const [monthElectricity, setMonthElectricity] = useState(0.0);

  const buttonProps = {
    width: 295,
    height: 300
  };

  useEffect(() => {
    // 获取当日电量
    const getDeviceElectricityData = async () => {
      try {
        const time = new Date();
        const startTime = time.setHours(0, 0, 0, 0);
        const endTime = time.setHours(23, 59, 59, 59);

        const electricityData = await sdk.requestTokenApi(
          'AppGetDeviceAggsData',
          {
            Action: 'AppGetDeviceAggsData',
            DeviceId: sdk.deviceId,
            AggMethod: 'sum',
            Interval: '1d',
            FieldName: 'power',
            MinTime: startTime,
            MaxTime: endTime
          }
        );
        console.log('get electricityData', electricityData);
        if (electricityData.Results && electricityData.Results.length > 0) {
          setDayElectricity(electricityData.Results[0].Data * 24);
        } else {
          setDayElectricity(0);
        }
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    // 获取当月电量
    const getDeviceElectricityTotalData = async () => {
      try {
        const nowDate = new Date();
        const fullYear = nowDate.getFullYear();
        const month = nowDate.getMonth() + 2; // 本月
        const monthDays = new Date(fullYear, month, 0).getDate(); // 计算本月天数

        const startOfMonth = new Date(
          fullYear,
          month - 1,
          1,
          0,
          0,
          0
        ).getTime();
        const endOfMonth = new Date(
          fullYear,
          month - 1,
          monthDays,
          23,
          59,
          59
        ).getTime();

        console.log(startOfMonth, endOfMonth);

        const electricityTotalData = await sdk.requestTokenApi(
          'AppGetDeviceAggsData',
          {
            Action: 'AppGetDeviceAggsData',
            DeviceId: sdk.deviceId,
            AggMethod: 'sum',
            Interval: monthDays + 'd',
            FieldName: 'power',
            MinTime: startOfMonth,
            MaxTime: endOfMonth
          }
        );
        console.log('get electricityTotalData', electricityTotalData);

        if (
          electricityTotalData.Results &&
          electricityTotalData.Results.length > 0
        ) {
          setMonthElectricity(
            electricityTotalData.Results[0].Data * monthDays * 24
          );
        } else {
          setMonthElectricity(0);
        }
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceElectricityData();
    getDeviceElectricityTotalData();
  }, []);

  // 定时跳转
  const handleTiming = () => {
    history.push('/timing');
  };

  // 检测跳转
  const handleElectricity = () => {
    history.push('/monitoring');
  };

  // 设置处理
  const handleSettings = () => {
    sdk.showDeviceDetail();
  };

  // 开关电源
  const handlePower = (value: number) => {
    onControlDevice('power_switch', Number(!value));
  };

  const currentColor = (status: number, key: string) => {
    const skin = CurrentSkinProps[key];
    const currentStatus = status === 1 ? 'active' : 'default';
    return skin[currentStatus];
  };

  const renderHeader = (deviceData: any) => {
    return (
      <ul className="header-content">
        <li className="content-item">
          <p className="num">{dayElectricity}</p>
          <p className="label">当日电量</p>
        </li>
        <li className="split"></li>
        <li className="content-item">
          <p className="num">{monthElectricity}</p>
          <p className="label">当月电量</p>
        </li>
      </ul>
    );
  };
  // 电源按钮渲染
  const renderPower = (value: number) => {
    return (
      <div
        className={classNames(
          'total-switch',
          value === 1 ? 'total-switch-open' : ''
        )}
        onClick={() => {
          handlePower(value);
        }}
      >
        <SvgIcon
          className="switch-icon"
          name="icon-arom-power"
          {...currentColor(value, 'switch')}
        />
      </div>
    );
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="electricity-stats-receptacle">
          {themeType === 'normal' || themeType === 'colorful'
            ? renderHeader(deviceData)
            : null}

          <div className="morandi-wrap">
            <div className="receptacle-wrap">
              <SvgIcon
                className="receptacle-icon"
                name="icon-receptacle"
                {...CurrentSkinProps.receptacle}
              />
              <p className="receptacle-status font_line_2">
                {deviceData.power_switch ? '插座已开启' : '插座已关闭'}
              </p>
            </div>
            {themeType === 'morandi' ? renderHeader(deviceData) : null}
          </div>

          {themeType === 'blueWhite' ||
          themeType === 'dark' ||
          themeType === 'morandi'
            ? renderPower(deviceData.power_switch)
            : null}
          {themeType === 'blueWhite' || themeType === 'dark'
            ? renderHeader(deviceData)
            : null}
          {/* 设置按钮 */}
          <div className="receptacle-setting">
            <Block
              className="setting-button"
              {...buttonProps}
              onClick={handleTiming}
            >
              <SvgIcon
                className="button-icon"
                name="icon-clock"
                {...currentColor(deviceData.power_switch, 'clock')}
              />
              <p className="button-name">定时</p>
            </Block>
            <Block
              className="setting-button"
              {...buttonProps}
              onClick={handleElectricity}
            >
              <SvgIcon
                className="button-icon"
                name="icon-electricity"
                {...currentColor(deviceData.power_switch, 'electricity')}
              />
              <p className="button-name">电量</p>
            </Block>
            <Block
              className="setting-button"
              {...buttonProps}
              onClick={handleSettings}
            >
              <SvgIcon
                className="button-icon"
                name="icon-setting"
                {...currentColor(deviceData.power_switch, 'setting')}
              />
              <p className="button-name">设置</p>
            </Block>
          </div>
          {themeType === 'normal' || themeType === 'colorful'
            ? renderPower(deviceData.power_switch)
            : null}
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
