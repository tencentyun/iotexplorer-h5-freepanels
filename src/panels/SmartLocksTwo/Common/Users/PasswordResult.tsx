/*
 * @Description: 用户密码
 */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Cell } from '@custom/Cell';
import { Icon } from '@custom/Icon';

export function PasswordResult({
  deviceData,
  templateMap,
  doControlDeviceData,
  history: { push, PATH, query },
}) {
  useTitle('用户编辑');
  const [userList, setUserList] = useState([{ name: '我', type: '指纹1 密码1' }, { name: '妈妈', type: '指纹2' }, { name: '我', type: '指纹1 密码1' }]);
  const [status, setStatus] = useState(true);

  const synch_method = {
    fingerprint: 'fingerprint',
    password: 'password',
    card: 'card',
    face: 'face',
  };

  return (
    <main className={classNames('user-password')}>

      {status ? (
        <>
          <div className="tips">请在门锁的指纹识别区按压指纹</div>
          <div className="scan-area">
            <div className="scan-icon">
              <Icon name={synch_method[query.type]}></Icon>
            </div>
            <div className="scan-line"></div>
          </div>
        </>
      ) : (
        <>
          <div className="result-icon">
            <Icon name="success"></Icon>
          </div>
          <div className="result-tips">指纹添加成功</div>
        </>
      )}

      <footer className={classNames('footer', status ? '' : 'retry')}>
        {status ? (
          <div className="footer-button" onClick={() => {
            push(PATH.USERS_EDIT);
          }}>确认</div>
        ) : (
          <>
            <div className="cancel-button" onClick={() => {}}>取消</div>
            <div className="footer-button" onClick={() => {}}>重试</div>
          </>
        )}
      </footer>
    </main>
  );
}
