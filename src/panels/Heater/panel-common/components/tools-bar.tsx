import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import { ListPopup } from './list-popup';

import { onControlDevice } from '@hooks/useDeviceData';
import { DeviceContext } from '../deviceContext';
import './tools-bar.less';

interface IFunExampleProps {
  status: number;
}

// console.log(sdk.deviceId);
export function ToolsBar() {
  const history = useHistory();
  const [color, setColor] = useState('blue');
  // 工作模式弹窗
  const [modeVisible, setModeVisible] = useState(false);
  const [modeValue, setModeValue] = useState(0);
  // 档位弹窗
  const [gearVisible, setGearVisible] = useState(false);
  const [gearValue, setGearValue] = useState(0);

  return (
    <DeviceContext.Consumer>
      {({ deviceData }) => (
        <section className="tools-bar-wrap">
          <div
            className={classNames(
              'item',
              deviceData.power_switch ? 'active' : ''
            )}
            onClick={() => {
              if (!deviceData.power_switch) return;
              setModeVisible(true);
            }}
          >
            <div
              className="item-icon icon-mode"
              onClick={() => {
                setModeVisible(true);
              }}
            ></div>
            <div className="label">模式</div>
          </div>
          <div
            className={classNames(
              'item',
              deviceData.power_switch ? 'active' : ''
            )}
            onClick={() => {
              if (!deviceData.power_switch) return;
              setGearVisible(true);
            }}
          >
            <div className="item-icon icon-gear"></div>
            <div className="label">档位</div>
          </div>
          <div
            className={classNames(
              'item',
              deviceData.power_switch ? 'active' : ''
            )}
            onClick={() => {
              history.push('/timing');
            }}
          >
            <div className="item-icon icon-time"></div>
            <div className="label">定时</div>
          </div>
          <ListPopup
            visible={modeVisible}
            title="工作模式"
            value={['cup']}
            options={[
              {
                label: '智能模式',
                value: '0'
              },
              {
                label: '自动模式',
                value: '1'
              },
              {
                label: 'ECO模式',
                value: '2'
              },
              {
                label: '舒适模式',
                value: '3'
              },
              {
                label: '防霜冻模式',
                value: '4'
              },
              {
                label: '手动模式',
                value: '5'
              }
            ]}
            layoutType="normal"
            onCancel={() => {
              setModeVisible(false);
            }}
            onConfirm={value => {
              onControlDevice('work_mode', value[0]);
            }}
          ></ListPopup>
          <ListPopup
            visible={gearVisible}
            title="档位"
            options={[
              {
                label: '自动',
                value: '0'
              },
              {
                label: '低档',
                value: '1'
              },
              {
                label: '中档',
                value: '2'
              },
              {
                label: '高档',
                value: '3'
              }
            ]}
            layoutType="middle"
            onCancel={() => {
              setGearVisible(false);
            }}
            onConfirm={value => {
              onControlDevice('heat_level', value[0]);
            }}
          ></ListPopup>
        </section>
      )}
    </DeviceContext.Consumer>
  );
}
