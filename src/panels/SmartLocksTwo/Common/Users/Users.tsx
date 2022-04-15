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
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function Users({
  history: { PATH, push },
  doControlDeviceData,
  deviceData,
}) {
  useTitle('用户管理');
  const [userList, setUserList] = useState(deviceData.users || []);
  const [addUserVisible, setAddUserVisible] = useState(false);

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
        render={({ name, type, id }) => (

          <Cell
            key={id}
            className="cell-user"
            title={name}
            subTitle={type}
            prefixIcon={<Icon name="avatar"></Icon>}
            onClick={() => {
              push(PATH.USERS_EDIT, { userName: name, id });
            }}
          ></Cell>
        )}
      />
      : <div className="no-record-tips"></div>
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
        max={10}
        onCancel={() => {
          setAddUserVisible(false);
        }}
        onConfirm={async (value) => {
          const trimedValue = value.trim();
          if (trimedValue.trim() === '') {
            return;
          }
          const id = sdk.appDevSdk.utils.shortid();
          // 更新users物模型
          await doControlDeviceData('users', [...userList, { name: value, id }]);
          // 跳转到用户编辑
          push(PATH.USERS_EDIT, { userName: value, id });
        }}
      />
    </main>
  );
}
