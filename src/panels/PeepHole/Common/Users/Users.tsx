/*
 * @Description: 用户管理
 */
import React, { useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { InputDialog } from './InputDialog';
import { List } from '@custom/List';
import { shortid } from '../utils';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { StatusTip } from '@components/StatusTip';

export function Users({
  history: { PATH, push },
  doControlDeviceData,
  deviceData,
}) {
  useTitle('用户管理');
  const [userList, setUserList] = useState(deviceData.users || []);
  const [addUserVisible, setAddUserVisible] = useState(false);
  const {
    fingerprints = [],
    cards = [],
    faces = [],
    passwords = [],
  } = deviceData;

  const getAuth = (userid: string) => {
    const filterAuthByUserid = (authArr, name) => {
      const { length } = authArr
        .filter(item => item.userid === userid);
      return length > 0 ? `${name}${length}个` : '';
    };

    const authSummary = [
      filterAuthByUserid(passwords, '密码'),
      filterAuthByUserid(fingerprints, '指纹'),
      filterAuthByUserid(cards, '卡片'),
      filterAuthByUserid(faces, '面容'),
    ].filter(name => name !== '');

    return authSummary.length > 0
      ? authSummary.map(name => <span key={name} className="auth-item">{name}</span>)
      : <span>未录入开锁方式</span>;
  };
  // 删除用户
  const onDelete = (item) => {
    const newUsers = userList.filter(({ userid }) => item.userid !== userid);
    setUserList(newUsers);
    doControlDeviceData('users', newUsers);
  };

  return (
    <main className={classNames('users')}>

    {userList.length > 0
      ? <List
        data={userList}
        onDelete={onDelete}
        render={({ name, userid }) => (
          <Cell
            key={userid}
            className="cell-user"
            title={name}
            subTitle={<>
              {
                getAuth(userid)
              }
            </>}
            prefixIcon={<Icon name="avatar"></Icon>}
            onClick={() => {
              push(PATH.USERS_EDIT, { userName: name, userid });
            }}
          ></Cell>
        )}
      />
      : <div className="no-record-tips">
          <StatusTip emptyMessage='暂无用户' status='empty' className='empty'/>
        </div>
    }

      <footer className="footer">
        <div className="footer-button" onClick={() => {
          setAddUserVisible(true);
        }}>
          添加用户
        </div>
      </footer>
      <InputDialog
        visible={addUserVisible}
        title="添加用户"
        defaultValue={''}
        max={5}
        onCancel={() => {
          setAddUserVisible(false);
        }}
        onConfirm={async (value) => {
          const trimedValue = value.trim();
          if (trimedValue.trim() === '') {
            return;
          }
          const id = shortid();
          await sdk.callDeviceAction({ name: value, userid: id }, 'add_user');
          // 跳转到用户编辑
          push(PATH.USERS_EDIT, { userName: value, userid: id });
        }}
      />
    </main>
  );
}
