/*
 * @Description: 燃气报警器首页
 */

import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useHistory } from 'react-router-dom';
import { SvgIcon } from '@components/common';
import { Block } from '@components/layout';
import { Battery } from '@components/business';
import { DataShowDisk } from '../components/data-show-disk/data-show-disk';

// @ts-ignore
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';

import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { CurrentSkinProps } from '../skinProps';

const themeType = getThemeType();

export function Home() {
  const history = useHistory();
  const [recordTime, setRecordTime] = useState('');
  const [recordStatus, setRecordStatus] = useState('');

  useEffect(() => {
    // 获取历史记录
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'gas_sensor_state',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 1
        });
        console.log('get info', recordListInfo.Results);
        setRecordTime(recordListInfo.Results[0]?.Time || '');
        setRecordStatus(recordListInfo.Results[0]?.Value || '');
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
  }, []);

  // 获取时间
  const date = dayjs(Number(recordTime));

  const statusLabel: any = {
    1: '燃气报警',
    2: '正常',
    3: '检测中',
    4: '未知'
  };

  // 设置
  const handleSetting = () => {
    history.push('/settings');
  };

  // 更多记录
  const handleMoreRecording = () => {
    history.push('/record');
  };

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="gas-alarm">
          {themeType === 'morandi' ? (
            <div className="alarm-header-morandi">
              <header className="alarm-header">
                {/* 电源模块 */}
                <Battery
                  isShowPercent={true}
                  isShowTip={false}
                  value={deviceData.battery_percentage}
                  {...CurrentSkinProps.battery}
                />
                <div
                  className={classNames(
                    'label',
                    deviceData.gas_sensor_state === 'alarm' ? 'active' : ''
                  )}
                >
                  {deviceData.gas_sensor_state === 'alarm'
                    ? '注意，检测到燃气报警'
                    : '当前没有烟雾报警'}
                </div>
              </header>

              <DataShowDisk
                status={deviceData.gas_sensor_state}
                value={deviceData.gas_sensor_value}
                unit={'%'}
              />
            </div>
          ) : (
            <>
              <header className="alarm-header">
                {/* 电源模块 */}
                <Battery
                  isShowPercent={true}
                  isShowTip={false}
                  value={deviceData.battery_percentage}
                  {...CurrentSkinProps.battery}
                />
                <div
                  className={classNames(
                    'label',
                    deviceData.gas_sensor_state === 'alarm' ? 'active' : ''
                  )}
                >
                  {deviceData.gas_sensor_state === 'alarm'
                    ? '注意，检测到燃气报警'
                    : '当前没有燃气报警'}
                </div>
              </header>

              <DataShowDisk
                status={deviceData.gas_sensor_state}
                value={deviceData.gas_sensor_value}
                unit={'%'}
              />
            </>
          )}
          <div className="tips">
            {recordStatus ? (
              <span>
                {date.format('YYYY-MM-DD HH:mm')}&nbsp;&nbsp;
                {statusLabel[Number(recordStatus)]
                  ? statusLabel[Number(recordStatus)]
                  : '未知'}
              </span>
            ) : null}
          </div>
          <div className="footer-button">
            <Block className="button-block" onClick={handleMoreRecording}>
              {/* <div className="button-icon icon-record"></div> */}
              <SvgIcon
                className="button-icon"
                name="icon-record"
                color="#999"
                // {...CurrentSkinProps.settings}
              />
              <p className="button-name">更多记录</p>
            </Block>
            <Block className="button-block" onClick={handleSetting}>
              <SvgIcon
                className="button-icon"
                name="icon-setting"
                {...CurrentSkinProps.settings}
              />
              <p className="button-name">设置</p>
            </Block>
          </div>
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
