/*
 * @Description: 用户管理
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';
import { InputDialog } from './InputDialog';
import { List } from '@custom/List';

export function Users({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { PATH, push }
}) {
  useTitle('用户管理');
  const [userList, setUserList] = useState([{name: '我', type: '指纹1 密码1'},{name: '妈妈', type: '指纹2'},{name: '我2', type: '指纹1 密码1'}]);
  const [addUserVisible, setAddUserVisible] = useState(false);

  // 删除用户
  const onDelete = (item) => {
    // TODO 执行删除指定的密码
    setUserList(userList.filter(({ name }) => item.name !== name));
  };

  return (
    <main className={classNames('users')}>
      {/* {userList.length > 0 ? (
        userList.length > 0 && userList.map((item, index) => (
          <Cell
            className="cell-user"
            title={item.name}
            subTitle={item.type}
            prefixIcon={<Icon name="avatar"></Icon>}
            onClick={()=>{push(PATH.USERS_EDIT, {userName: item.name});}}
          ></Cell>
        ))
      ) : (
        <div className="no-record-tips">暂无用户</div>
      )} */}

      <List
        data={userList}
        onDelete={onDelete}
        render={({ name, type }, index) => (

          <Cell
            className="cell-user"
            title={name}
            subTitle={type}
            prefixIcon={<Icon name="avatar"></Icon>}
            onClick={()=>{push(PATH.USERS_EDIT, {userName: name});}}
          ></Cell>
        )}
      />

      <footer className="footer">
        <div className="footer-button" onClick={()=>{setAddUserVisible(true)}}>
          添加用户
        </div>
      </footer>
      <InputDialog
        visible={addUserVisible}
        title="添加用户"
        defaultValue={''}
        max={10}
        onCancel={()=>{setAddUserVisible(false)}}
        onConfirm={(value)=>{
          if (value == '') {
            return;
          }
          push(PATH.USERS_EDIT, {userName: value});
        }}
      ></InputDialog>
    </main>
  );
}
