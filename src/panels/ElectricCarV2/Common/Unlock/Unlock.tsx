/*
 * @Description: 无感解锁页面
 */
import React, { useState } from 'react';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { Switch } from '@custom/Switch';
import { ListPopup } from './ListPopup';
import { AuthorizationDialog } from './AuthorizationDialog';

export function Unlock(props) {
  // 无感解锁
  const [unlockStatus, onToggleUnlockStatus] = useState(false);
  const [distanceVisible, onToggleDistance] = useState(false);
  const [authorization, onToggleAuthorization] = useState(false);
  const [enter, setEnter] = useState(true);
  const [distanceValue, setDistanceValue] = useState('中（推荐）');

  return (
    <main className="senseless-unlock">
      <section className="header-block">
        <div className="car-unlock-image"></div>
        <div className="tips">
          <Icon name="senseless-lock"></Icon>
          <p className="tips-name">手机靠近车辆自动解锁</p>
        </div>
      </section>

      <section className="unlock-setting">
        <Cell
          title="无感解锁"
          size="medium"
          isLink={false}
          value={
            <Switch
              checked={unlockStatus}
              onChange={(checked) => {
                onToggleUnlockStatus(checked);
              }}
            />
          }
        ></Cell>
        <Cell
          title="无感距离"
          size="medium"
          value={distanceValue}
          onClick={()=>{
            if (enter) {
              onToggleAuthorization(true);
            } else {
              onToggleDistance(true);
            }
          }}
        >
        </Cell>
        <p className='tips'>若出现解锁失败或者异常关锁情况时，可将距离设置为远。</p>
      </section>
      <ListPopup
        visible={distanceVisible}
        value={[distanceValue]}
        title="无感距离"
        options={[{
          label: '近',
          value: '近',
        },{
          label: '中（推荐）',
          value: '中（推荐）',
        },{
          label: '远',
          value: '远',
        }]}
        onCancel={() => onToggleDistance(false)}
        onConfirm={value => {
          if (value && value.length > 0) {
            setDistanceValue(value[0] || '');
          } 
          onToggleDistance(false);
        }}
      ></ListPopup>
      <AuthorizationDialog
        visible={authorization}
        title="无感功能授权"
        onCancel={() => {
          onToggleAuthorization(false);
        }}
        onConfirm={(vlaue) => {
          onToggleAuthorization(false);
          setEnter(false);
        }}
      ></AuthorizationDialog>
    </main>
  );
}
