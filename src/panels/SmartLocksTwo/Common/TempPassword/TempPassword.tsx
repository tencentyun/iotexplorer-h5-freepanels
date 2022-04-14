import React, { useEffect, useState } from 'react';
import { useTitle } from '@hooks/useTitle';
import { Btn } from '@custom/Btn';
import dayjs from 'dayjs';
import { List } from '@custom/List';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { arrWeek } from './AddTempPassword';
interface PasswordItem {
  BeginTime: number
  DeviceName: string
  Expired: number
  OTPPassword: string
  ProductId: string
  Status: 0 | 1
}

export function TempPassword({ history: { push, PATH }, tips, deviceData }) {
  useTitle('临时密码');
  const [data, setData] = useState([]);
  const cyclePasswordList = deviceData.cycle_password_list || [];
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

  const removeSinglePassword = (id: string) => {
    sdk.requestTokenApi('AppRemoveDeviceOTP', {
      PropertyId: id,
      DeviceId: sdk.deviceId,
    }).then((res) => {
      console.log(res);
    });
  };

  const onDeleteCyclePassword = async (item) => {
    try {
      await sdk.callDeviceAction({ id: item.id }, 'del_cycle_password');
    } catch (err) {
      console.error(err);
      tips.showError('删除失败, 请重试');
    }
  };

  // 删除单条密码
  const onDelete = async (item) => {
    // TODO 执行删除指定的密码
    await removeSinglePassword(item.PropertyId);
    getPasswordList();
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
        <div style={{ marginTop: '0.42rem' }}></div>
        <List
          data={cyclePasswordList}
          onDelete={onDeleteCyclePassword}
          render={({ take_effect_date, invalid_date, isLose, take_effect_time, invalid_time, week }, index) => {
            const weekStr = week.split('').map((index) => arrWeek[index]).join(',');
            return (<div key={index} className="item">
              <span>
                <div>周期</div>
                <div>
                  <div>{`${take_effect_date} ${take_effect_time} - ${invalid_date} ${invalid_time}`}</div>
                  <div>{`${weekStr}`}</div>
                </div>
              </span>
              <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span>
            </div>);
          }
        }
        />
      </div>
      <div className="fix-bottom-btn">
        {/* <Btn btnText="清空" type="danger" onClick={onCleanClick} /> */}
      </div>
    </div>
  );
}
