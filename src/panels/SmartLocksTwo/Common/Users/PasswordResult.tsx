/*
 * @Description: 用户密码
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

export function PasswordResult({
  history: { push, PATH, query, goBack },
}) {
  useTitle('用户编辑');
  const [status, setStatus] = useState(true);

  const synch_method = {
    fingerprint: 'fingerprint',
    password: 'password',
    card: 'card',
    face: 'face',
  };
  const synchMethodEvent = {
    fingerprint: 'add_fingerprint_result',
    password: 'add_password_result',
    card: 'add_card_result',
    face: 'add_face_result',
  };

  useEffect(() => {
    sdk.once('wsEventReport', ({ Payload, deviceId }) => {
      console.log('receive event:', Payload, deviceId);
      if (deviceId === sdk.deviceId && Payload.eventId === synchMethodEvent[query.type]) {
        // TODO: 这里判断添加指纹是否成功
        goBack();
      }
      // 这里等待返回结果
    });
  }, []);

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
            goBack();
          }}>确认</div>
        ) : (
          <>
            <div className="cancel-button" onClick={() => {
              push(PATH.USERS_EDIT);
            }}>取消</div>
            <div className="footer-button" onClick={() => {
              setStatus(false);
            }}>重试</div>
          </>
        )}
      </footer>
    </main>
  );
}
