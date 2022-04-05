/*
 * @Description: 温湿度传感器首页
 */
import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Block } from '@components/layout';
import { Cell } from '@components/base';
import { SvgIcon } from '@components/common';
import { LineChart } from '../components/line-chart';
// 模版数据
import { DeviceContext } from '../deviceContext';
import { getThemeType } from '@libs/theme';
import { SkinProps } from '../skinProps';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import dayjs from 'dayjs';

// 聚合数据接口内结构
interface AggsDataProps {
  Data: number; // 数据
  Date: string; // 日期
  TimestampMs: number; // 时间戳
}

interface ChartItem {
  x: string;
  y: number;
}

// 测试数据
const data1: any = [
  {
    x: '12:00',
    y: 32,
  },
  {
    x: '13:00',
    y: 34,
  },
  {
    x: '14:00',
    y: 36,
  },
  {
    x: '15:00',
    y: 35,
  },
  {
    x: '16:00',
    y: 33,
  },
];

const data2: any = [
  {
    x: '12:00',
    y: 44,
  },
  {
    x: '13:00',
    y: 54,
  },
  {
    x: '14:00',
    y: 80,
  },
  {
    x: '15:00',
    y: 20,
  },
  {
    x: '16:00',
    y: 33,
  },
];

export function Home() {
  const themeType = getThemeType();
  const CurrentSkinProps: any = SkinProps[themeType];
  const history = useHistory();

  // 历史记录
  const [recordList, setRecordList] = useState([]);
  // 温度
  const [tempChartList, setTempChart] = useState<ChartItem>();
  // 湿度
  const [humidityChartList, setHumidityChart] = useState<ChartItem>();

  useEffect(() => {
    // 获取历史记录 防拆报警
    const getDeviceDataHistory = async () => {
      try {
        const time = new Date();
        const currentTime = new Date().getTime();
        const lastYear = new Date().getFullYear() - 1;
        const lastYearTime = time.setFullYear(lastYear);

        const recordListInfo = await sdk.getDeviceDataHistory({
          FieldName: 'tamper_event',
          MaxTime: currentTime,
          MinTime: lastYearTime,
          Limit: 3,
        });
        setRecordList(recordListInfo.Results);
      } catch (err) {
        console.error('get history fail', err);
      }
    };
    // 温度折线图
    const getDeviceTempChartData = async () => {
      try {
        const time = new Date();
        const startTime = time.setHours(12, 0, 0, 0);
        const endTime = time.setHours(16, 0, 0, 0);

        const chartData = await sdk.requestTokenApi('AppGetDeviceAggsData', {
          Action: 'AppGetDeviceAggsData',
          DeviceId: sdk.deviceId,
          AggMethod: 'avg',
          Interval: '1h',
          FieldName: 'current_temp',
          MinTime: startTime,
          MaxTime: endTime,
        });
        console.log('get chartData', chartData);
        if (chartData.Results && chartData.Results.length > 0) {
          const data: any = [];
          chartData.Results.map((value: AggsDataProps) => {
            const obj = { x: '', y: 0 };
            obj.x = formatGetTime(value.TimestampMs).toString();
            obj.y = value.Data;
            data.push(obj);
          });
          setTempChart(data);
        } else {
          setTempChart(data1);
        }
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    // 湿度折线图
    const getDeviceHumidityChartData = async () => {
      try {
        const time = new Date();
        const startTime = time.setHours(12, 0, 0, 0);
        const endTime = time.setHours(16, 0, 0, 0);

        const chartData = await sdk.requestTokenApi('AppGetDeviceAggsData', {
          Action: 'AppGetDeviceAggsData',
          DeviceId: sdk.deviceId,
          AggMethod: 'avg',
          Interval: '1h',
          FieldName: 'current_humidity',
          MinTime: startTime,
          MaxTime: endTime,
        });

        if (chartData.Results && chartData.Results.length > 0) {
          const data: any = [];
          chartData.Results.map((value: AggsDataProps) => {
            const obj = { x: '', y: 0 };
            obj.x = formatGetTime(value.TimestampMs).toString();
            obj.y = value.Data;
            data.push(obj);
          });
          setHumidityChart(data);
        } else {
          setHumidityChart(data2);
        }
      } catch (err) {
        console.error('get info fail', err);
      }
    };
    getDeviceDataHistory();
    getDeviceTempChartData();
    getDeviceHumidityChartData();
  }, []);

  const statusLabel: any = {
    1: '防拆报警',
    2: '正常',
    3: '检测中',
    4: '未知',
  };

  // 温度图标
  const temperatureIcon = () => (
      <SvgIcon
        className="svg-icon"
        name="icon-temperature"
        {...CurrentSkinProps.temperature}
      />
  );

  // 设置图标
  const setIcon = () => <div className="svg-icon set-hollow"></div>;

  // 历史记录图标
  const historyIcon = () => (
      <SvgIcon
        className="svg-icon"
        name="icon-history"
        {...CurrentSkinProps.history}
      />
  );

  const formatTime = (time: string) => dayjs(Number(time)).format('YYYY.MM.DD HH:mm:ss');

  const formatGetTime = (time: number) => dayjs(time).format('HH:mm');

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <main className="temperature-humidity-sensor">
          {themeType === 'blueWhite' || themeType === 'morandi' ? (
            <div className="block-header-wrap">
              <section className="block-header">
                <div className="item">
                  <div className="num">
                    {deviceData.current_temp ? deviceData.current_temp : 0}°C
                  </div>
                  <div className="label">温度</div>
                </div>
                <div className="split"></div>
                <div className="item">
                  <div className="num">
                    {deviceData.current_humidity
                      ? deviceData.current_humidity
                      : 0}
                    %
                  </div>
                  <div className="label">湿度</div>
                </div>
              </section>
              <div className="chart-wrap">
                <div className="chart-block">
                  <div className="chart-name">温度</div>
                  {tempChartList ? (
                    <LineChart
                      data={tempChartList}
                      {...CurrentSkinProps.tempChart}
                    ></LineChart>
                  ) : null}
                </div>
                <div className="chart-block">
                  <div className="chart-name">湿度</div>
                  {humidityChartList ? (
                    <LineChart
                      data={humidityChartList}
                      {...CurrentSkinProps.humidityChart}
                    ></LineChart>
                  ) : null}
                </div>
              </div>
            </div>
          ) : (
            <Block className="sensor-block">
              <section className="block-header">
                <div className="item">
                  <div className="num">
                    {deviceData.current_temp ? deviceData.current_temp : 0}°C
                  </div>
                  <div className="label">温度</div>
                </div>
                <div className="split"></div>
                <div className="item">
                  <div className="num">
                    {deviceData.current_humidity
                      ? deviceData.current_humidity
                      : 0}
                    %
                  </div>
                  <div className="label">湿度</div>
                </div>
              </section>
              <div className="chart-wrap">
                <div className="chart-block">
                  <div className="chart-name">温度</div>
                  {tempChartList ? (
                    <LineChart
                      data={tempChartList}
                      {...CurrentSkinProps.tempChart}
                    ></LineChart>
                  ) : null}
                </div>
                <div className="chart-block">
                  <div className="chart-name">湿度</div>
                  {humidityChartList ? (
                    <LineChart
                      data={humidityChartList}
                      {...CurrentSkinProps.humidityChart}
                    ></LineChart>
                  ) : null}
                </div>
              </div>
            </Block>
          )}
          {themeType === 'blueWhite'
          || themeType === 'dark'
          || themeType === 'colorful' ? (
            <div className="cell-wrap">
              <Block className="sensor-block">
                <Cell
                  title="当前温度热，空气潮湿"
                  prefixIcon={temperatureIcon()}
                  size="medium"
                  isLink={false}
                ></Cell>
              </Block>
              <Block className="sensor-block">
                <Cell
                  title="设置"
                  prefixIcon={setIcon()}
                  valueStyle={'gray'}
                  size="medium"
                  onClick={() => {
                    history.push('/settings');
                  }}
                ></Cell>
              </Block>
              <Block className="sensor-block">
                <Cell
                  title="历史记录"
                  prefixIcon={historyIcon()}
                  valueStyle={'gray'}
                  size="medium"
                ></Cell>
                <ul className="history-items">
                  {recordList.map((value: any, index) => (
                    <li className="item" key={index}>
                      {formatTime(value.Time)}{' '}
                      {statusLabel[Number(value.Value)]}
                    </li>
                  ))}
                  {recordList.length === 0 ? (
                    <>
                      <li className="item">暂无数据</li>
                    </>
                  ) : null}
                </ul>
              </Block>
            </div>
            ) : (
            <>
              <Block className="sensor-block">
                <Cell
                  title="当前温度热，空气潮湿"
                  prefixIcon={temperatureIcon()}
                  size="medium"
                  isLink={false}
                ></Cell>
              </Block>
              <Block className="sensor-block">
                <Cell
                  title="设置"
                  prefixIcon={setIcon()}
                  valueStyle={'gray'}
                  size="medium"
                  onClick={() => {
                    history.push('/settings');
                  }}
                ></Cell>
              </Block>
              <Block className="sensor-block">
                <Cell
                  title="历史记录"
                  prefixIcon={historyIcon()}
                  valueStyle={'gray'}
                  size="medium"
                ></Cell>
                <ul className="history-items">
                  {recordList.map((value: any, index) => (
                    <li className="item" key={index}>
                      {formatTime(value.Time)}{' '}
                      {statusLabel[Number(value.Value)]}
                    </li>
                  ))}
                  {recordList.length === 0 ? (
                    <>
                      <li className="item">暂无数据</li>
                    </>
                  ) : null}
                </ul>
              </Block>
            </>
            )}
        </main>
      )}
    </DeviceContext.Consumer>
  );
}
