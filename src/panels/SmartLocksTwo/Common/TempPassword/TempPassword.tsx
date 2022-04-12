import React, { useEffect, useState } from 'react';
import { useTitle } from '@hooks/useTitle';
import { Btn } from '@custom/Btn';
import dayjs from 'dayjs';
import { List } from '@custom/List';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';

// 密码类型
const PASSWORD_TYPE = ['单次', '周期'];

interface PasswordItem {
  BeginTime: number
  DeviceName: string
  Expired: number
  OTPPassword: string
  ProductId: string
  Status: 0 | 1
}

export function TempPassword({ history: { push, PATH }, tips }) {
  useTitle('临时密码');
  const [data, setData] = useState([]);

  const getPasswordList = async () => {
    try {
      const { OTPPasswordProperties: passwords } = await sdk.requestTokenApi('AppGetDeviceOTPList', {
        DeviceId: sdk.deviceId,
      });
      setData(passwords);
    } catch (err) {
      console.log('获取密码列表出错', err);
      tips.showError('获取密码列表出错');
    }
  };

  const getsign = async (payload: string) => {
    const res = await sdk.requestTokenApi('AppDeviceCustomSignature', {
      DeviceId: sdk.deviceId,
      Content: payload,
      SignMethod: 'hmacsha1',
    });
    return res.Signature;
  };

  getsign('123456');

  // 删除单条密码
  const onDelete = (item) => {
    // TODO 执行删除指定的密码
    setData(data.filter(({ id }) => item.id !== id));
  };

  // 清空密码
  const onCleanClick = async () => {
    const isClean = await tips.confirm('确认清空');
    if (isClean) {
      // TODO
      setData([]);
      // getPasswordList();
    }
  };

  useEffect(() => {
    getPasswordList();
  }, []);

  return (
    <div className="temp-password">
      <Btn className="add-btn" onClick={() => push(PATH.TEMP_PASSWORD_ADD)}>
        添加+{' '}
      </Btn>
      <div className="password-list">
        <List
          data={data}
          onDelete={onDelete}
          render={({ OTPPassword, Expired, Status }: PasswordItem, index) => {
            const isLose = Status === 1 || Expired * 1000 < Date.now();
            return (
              <div key={index} className="item">
                <span>
                  <div>单次</div>
                  <div>将于 {dayjs(Expired * 1000).format('YYYY/MM/DD  HH:mm:ss')} 失效</div>
                </span>
                <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span>
              </div>
            );
          }
          }
        />
        <List
          data={data}
          onDelete={onDelete}
          render={({ loseTime, type, isLose, startTime, endTime, week }, index) => (
            <div key={index} className="item">
              <span>
                <div>{PASSWORD_TYPE[type]}</div>
                {type === 1
                  ? <div>
                    <div>{`${dayjs(startTime).format('YYYY/MM/DD HH:mm')} - ${dayjs(endTime).format('YYYY/MM/DD HH:mm')}`}</div>
                    <div>{`${week} ${dayjs(loseTime).format('HH:mm')}`}</div>
                  </div>
                  : <div>将于{dayjs(loseTime).format('YYYY/MM/DD  HH:mm:ss')}失效</div>
                }

              </span>
              <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span>
            </div>
          )}
        />
      </div>
      <div className="fix-bottom-btn">
        <Btn btnText="清空" type="danger" onClick={onCleanClick} />
      </div>
    </div>
  );
}
