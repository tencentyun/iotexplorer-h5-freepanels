/*
 * @Description: 用户密码
 */
import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { useTitle } from '@hooks/useTitle';
import { Icon } from '@custom/Icon';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { sleep } from '../utils';

// 0 添加中 1 添加成功 2 添加失败
type Status = 0 | 1 | 2;
export function PasswordResult({
  history: { query, goBack },
}) {
  useTitle('用户编辑');
  const [status, setStatus] = useState<Status>(0);

  const synch_method = {
    fingerprint: '指纹',
    password: '密码',
    card: '卡片',
    face: '面容ID',
  };
  const synchMethodEvent = {
    fingerprint: 'add_fingerprint_result',
    password: 'add_password_result',
    card: 'add_card_result',
    face: 'add_face_result',
  };

  const synchMethodTips = {
    fingerprint: '请在门锁的指纹识别区按压指纹',
    password: '请在门锁键盘上输入密码',
    card: '请在门锁刷卡区贴近卡片',
    face: '请将面部靠近门锁的摄像头',
  };

  const cancel = async (shouldGoBack?: boolean) => {
    if (status === 0) {
      await sdk.callDeviceAction({}, `cancel_add_${query.type}`);
      shouldGoBack && goBack();
    }
  };

  useEffect(() => {
    const handler = async ({ Payload, deviceId }) => {
      console.log('receive event:', Payload, deviceId);
      if (deviceId === sdk.deviceId && Payload.eventId === synchMethodEvent[query.type]) {
        // TODO: 这里判断添加指纹是否成功
        setStatus(Payload.params.result === 1 ? 1 : 2);
        await sleep(2000);
      }
      // 这里等待返回结果
    };
    sdk.once('wsEventReport', handler);
    return () => {
      sdk.off('wsEventReport', handler);
    };
  }, []);

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [status]);

  return (
    <main className={classNames('user-password')}>

      {!status ? (
        <>
          <div className="tips">{synchMethodTips[query.type]}</div>
          <div className="scan-area">
            <div className="scan-icon">
              <Icon name={query.type}></Icon>
            </div>
            <div className="scan-line"></div>
          </div>
        </>
      ) : (
        <>
          <div className="result-icon">
            <Icon name={ status === 1 ? 'success' : 'failure'}></Icon>
          </div>
          <div className="result-tips">{synch_method[query.type]}添加{ status === 1 ? '成功' : '失败'}</div>
        </>
      )}

      <footer className={classNames('footer', !status ? '' : 'retry')}>
        {status === 0 ? (
          <div className="footer-button" onClick={() => cancel(true)}>取消</div>
        ) : (
          <>
            <div className="cancel-button" onClick={() => {
              goBack();
            }}>返回</div>
            {/* <div className="footer-button" onClick={() => {
              setStatus(false);
            }}>重试</div> */}
          </>
        )}
      </footer>
    </main>
  );
}
