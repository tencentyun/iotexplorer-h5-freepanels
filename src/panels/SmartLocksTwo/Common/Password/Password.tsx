/*
 * @Description: 密码
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Steps } from '@src/components/custom/Steps';

export function Password(props) {
  useTitle('临时密码');
  const [userList, setUserList] = useState([]);


  return (
    <main className={classNames('users')}>
      {userList.length > 0 ? (
          <div/>
      ) : (
        <div className="no-record-tips">暂无用户</div>
      )}

      <footer className="footer">
        <div className="footer-button" onClick={() => {}}>
          添加用户
        </div>
      </footer>
    </main>
  );
}
