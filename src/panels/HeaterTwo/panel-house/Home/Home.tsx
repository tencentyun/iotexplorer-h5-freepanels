import React, { useState } from 'react';
import classNames from 'classnames';
import { Icon } from '@custom/Icon';
import { Disk } from './Disk';
import { ListPopup } from './ListPopup';

export function Home({
  deviceData,
  doControlDeviceData,
  history: { PATH, push },
  timer,
}) {
  // 工作模式弹窗
  const [modeVisible, setModeVisible] = useState(false);
  // 档位弹窗
  const [gearVisible, setGearVisible] = useState(false);

  const enumWorkMode: any = {
    0: '智能模式',
    1: '自动模式',
    2: 'ECO模式',
    3: '舒适模式',
    4: '防霜冻模式',
    5: '手动模式',
  };

  const enumGear: any = {
    0: '自动',
    1: '低档',
    2: '中档',
    3: '高档',
  };

  return (
    <main className="home">
      {/* 顶部 */}
      <header>
        {/* 童锁 */}
        <div
          className={classNames(
            'child-lock-status',
            { 'open-status': deviceData.power_switch === 1 },
          )}>{deviceData.child_lock ? '童锁开' : '童锁关'}</div>
        {/* 更多 */}
        <div className="more-btn" onClick={() => {
          push(PATH.SETTINGS);
        }}>
          <Icon name='more'></Icon>
        </div>
      </header>
      {/* 表盘 */}
      <div className="disk-wrap">
        <Disk
          status={deviceData.power_switch === 1}
          value={
            deviceData.unit_convert === 0
              ? deviceData.current_c_temp
              : deviceData.current_f_temp
          }
          scaleLineColor={'rgba(216, 216, 216, 0.5)'}
          progressColor={deviceData.power_switch === 1 ? '#26313D' : 'rgba(151, 160, 166, 1)'}
        ></Disk>
      </div>
      {/* 表盘控制区 */}
      <div className={classNames(
        'control-wrap',
        { 'open-status': deviceData.power_switch === 1 },
      )}>
        <div
          className="minus-btn"
          onClick={() => {
            if (!deviceData.power_switch) return;
            const key = deviceData.unit_convert === 0
              ? 'current_c_temp'
              : 'current_f_temp';
            let value = deviceData[key] ? deviceData[key] - 1 : 0;
            if (value <= 0) {
              value = 0;
            }
            doControlDeviceData(key, value);
          }}
        >
          <Icon name="minus"></Icon>
        </div>
        <div
          className="plus-btn"
          onClick={() => {
            if (!deviceData.power_switch) return;
            const key = deviceData.unit_convert === 0
              ? 'current_c_temp'
              : 'current_f_temp';
            let value = deviceData[key] ? deviceData[key] + 1 : 1;
            if (value >= 100) {
              value = 100;
            }
            doControlDeviceData(key, value);
          }}
        >
          <Icon name="plus"></Icon>
        </div>
      </div>

      {/* 设置按钮 */}
      <footer>
        <div className={classNames(
          'footer-top',
          { 'open-status': deviceData.power_switch === 1 },
        )}>
          <div
            className="block-button-word"
            onClick={() => {
              setModeVisible(true);
            }}
          >
            <p className="button-value">
              {deviceData.work_mode
                ? enumWorkMode[deviceData.work_mode]
                : '暂无数据'
              }
            </p>
            <p className="button-label">模式</p>
            <ListPopup
              name={'mode-popup'}
              visible={modeVisible}
              title="工作模式"
              value={[deviceData.work_mode]}
              options={[
                {
                  label: '智能模式',
                  value: '0',
                },
                {
                  label: '自动模式',
                  value: '1',
                },
                {
                  label: 'ECO模式',
                  value: '2',
                },
                {
                  label: '舒适模式',
                  value: '3',
                },
                {
                  label: '防霜冻模式',
                  value: '4',
                },
                {
                  label: '手动模式',
                  value: '5',
                },
              ]}
              layoutType="normal"
              onCancel={() => {
                setModeVisible(false);
              }}
              onConfirm={(value) => {
                doControlDeviceData('work_mode', value[0]);
              }}
            ></ListPopup>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              setGearVisible(true);
            }}
          >
            <p className="button-value">
              {deviceData.heat_level
                ? enumGear[deviceData.heat_level]
                : '暂无数据'
              }
            </p>
            <p className="button-label">档位</p>
            <ListPopup
              name={'gear-popup'}
              visible={gearVisible}
              title="档位"
              value={[deviceData.heat_level]}
              options={[
                {
                  label: '自动',
                  value: '0',
                },
                {
                  label: '低档',
                  value: '1',
                },
                {
                  label: '中档',
                  value: '2',
                },
                {
                  label: '高档',
                  value: '3',
                },
              ]}
              layoutType="middle"
              onCancel={() => {
                setGearVisible(false);
              }}
              onConfirm={(value) => {
                doControlDeviceData('heat_level', value[0]);
              }}
            ></ListPopup>
          </div>
          <div
            className="block-button-word"
            onClick={() => {
              push(PATH.TIMER_LIST);
            }}
          >
            <p className="button-value">{timer.isExistTimer ? '已设置' : '未设置'}</p>
            <p className="button-label">定时</p>
          </div>
        </div>
        <div className={classNames(
          'footer-bottom',
          { 'open-status': deviceData.power_switch === 1 },
        )}>
          <div
            className="rectangle-button"
            onClick={() => {
              doControlDeviceData('child_lock', Number(!deviceData.child_lock));
            }}
          >
            <Icon name={deviceData.child_lock ? 'lock' : 'unlock'}/>
            <p className="button-name">儿童锁</p>
          </div>
          <div
            className="rectangle-button"
            onClick={() => {
              doControlDeviceData('power_switch', Number(!deviceData.power_switch));
            }}
          >
            <Icon name="switch"/>
            <p className="button-name">开关</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
