/*
 * @Description: 无感解锁页面
 */

import React, { useState } from 'react';
import { Block } from '@components/layout';
import { Cell, Switch } from '@components/base';
import { ValuePicker } from '@components/business';
import { AuthorizationDialog } from '../components';

export function SenselessUnlock() {
  // const state = useDeviceData(sdk);
  // const deviceData = state.deviceData || {};

  // 无感解锁
  const [unlockStatus, onToggleUnlockStatus] = useState(false);
  const [distanceVisible, onToggleDistance] = useState(false);
  const [authorization, onToggleAuthorization] = useState(false);
  const [enter, setEnter] = useState(true);
  const [distanceValue, setDistanceValue] = useState('中（推荐）');

  // 处理无感解锁
  const handleUnlock = () => {
    onToggleUnlockStatus(true);
  };

  return (
    <main className="senseless-unlock">
      <Block className="header-block">
        <img className="car-unlock-image" src="https://tencent-1305105198.cos.ap-guangzhou.myqcloud.com/electric-car/19331640748320_.pic_hd.jpg"></img>
        <div className="tips">
          <div className="icon-unlock"></div>
          <p className="tips-name">手机靠近车辆自动解锁</p>
        </div>
      </Block>

      <Block className="setting-block">
        <Cell
          title="无感解锁"
          size="medium"
          isLink={false}
          value={
            <Switch
              name="mode"
              checked={false}
              onChange={handleUnlock}
            />
          }
        ></Cell>
      </Block>
      <Block className="setting-block">
        <Cell
          title="无感距离"
          size="medium"
          isLink={true}
          value={[distanceValue]}
          valueStyle={'gray'}
          onClick={() => {
            if (enter) {
              onToggleAuthorization(true);
            } else {
              onToggleDistance(true);
            }
          }}
        >
          <ValuePicker
            visible={distanceVisible}
            value={[distanceValue]}
            title="无感距离"
            columns={[['近','中（推荐）', '远']]}
            onCancel={() => onToggleDistance(false)}
            onConfirm={value => {
              if (value && value.length > 0) {
                setDistanceValue(value[0] || '');
              } 
              onToggleDistance(false);
            }}
          />
        </Cell>
        <p className="tips">若出现解锁失败或者异常关锁情况时，可将距离设置为远</p>
      </Block>
      <AuthorizationDialog
        visible={authorization}
        title="获取授权"
        onCancel={() => {
          onToggleAuthorization(false);
          setEnter(false);
        }}
        onConfirm={(vlaue) => {
          console.log(vlaue);
          onToggleAuthorization(false);
          setEnter(false);
        }}
      ></AuthorizationDialog>
    </main>
  );
}
