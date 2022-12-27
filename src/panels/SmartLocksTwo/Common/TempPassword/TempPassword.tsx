import React, { useEffect, useState } from 'react';
import { useTitle } from '@hooks/useTitle';
import { Btn } from '@custom/Btn';
import dayjs from 'dayjs';
import { List } from '@custom/List';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { arrWeek } from './AddTempPassword';
import { StatusTip } from '@components/StatusTip';
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

  const validCyclePasswords = cyclePasswordList.filter(({ invalid_date, invalid_time }) => {
    const invalidTime = +dayjs(`${invalid_date} ${invalid_time}`);
    return Date.now() < invalidTime;
  });

  const totalListLength = data.length + cyclePasswordList.length;

  const removeSinglePassword = (id: string) => {
    sdk.requestTokenApi('AppRemoveDeviceOTP', {
      PropertyId: id,
      DeviceId: sdk.deviceId,
    }).then((res) => {
      console.log(res);
    });
  };

  // 过期了的话，自动删除，不显示提示
  const onDeleteCyclePassword = async (item, showTip = true) => {
    console.log('to delete', item);
    try {
      const result = await sdk.callDeviceAction({ id: item.id }, 'del_cycle_password');
      if (result.OutputParams && JSON.parse(result.OutputParams).result === 1) {
        showTip && tips.showInfo('删除成功');
      } else {
        showTip && tips.showInfo('删除失败');
      }
    } catch (err) {
      console.error(err);
      showTip && tips.showError('删除失败, 请重试');
    }
  };

  const deleteInvalidCyclePasswords = async () => {
    for (let i = 0; i < cyclePasswordList.length; i++) {
      const item = cyclePasswordList[i];
      const { invalid_date, invalid_time } = item;
      const invalidTime = +dayjs(`${invalid_date} ${invalid_time}`);
      if (Date.now() >= invalidTime) {
        await onDeleteCyclePassword(item, false);
      }
    }
  };

  // 删除单条密码
  const onDelete = async (item) => {
    // TODO 执行删除指定的密码
    await removeSinglePassword(item.PropertyId);
    getPasswordList();
    setData(data.filter(({ id }) => item.id !== id));
  };

  useEffect(() => {
    getPasswordList();
    deleteInvalidCyclePasswords();
  }, []);

  return (
    <div className="temp-password">
      <div className='password-wrapper'>
        <div className="password-list">
          <List
            data={data}
            onDelete={onDelete}
            render={({ Expired }: PasswordItem, index) => {
              const expired = Expired + 1200; /* 有效期20分钟 */
              return (
                <div key={index} className="item">
                  <span>
                    <div>单次</div>
                    <div>将于 {dayjs(expired * 1000).format('YYYY/MM/DD  HH:mm:ss')} 失效</div>
                  </span>
                  {/* <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span> */}
                </div>
              );
            }
            }
          />
          <div style={{ marginTop: '0.42rem' }}></div>
          <List
            data={validCyclePasswords}
            onDelete={onDeleteCyclePassword}
            render={({ take_effect_date, invalid_date, take_effect_time, invalid_time, week }, index) => {
              const weekStr = week.split('').map(index => arrWeek[index])
                .join(' ');
              return (<div key={index} className="item">
                <span>
                  <div>周期</div>
                  <div>
                    <div>{`${take_effect_date} ${take_effect_time} - ${invalid_date} ${invalid_time}`}</div>
                    <div>{`${weekStr}`}</div>
                  </div>
                </span>
                {/* <span className={isLose ? 'flag fail' : 'flag success'}>{isLose ? '已失效' : '生效中'}</span> */}
              </div>);
            }
          }
          />
        </div>
        { totalListLength === 0 && <StatusTip emptyMessage='暂无数据' status='empty' className='empty'/>}
        <Btn className="add-btn" onClick={() => push(PATH.TEMP_PASSWORD_ADD)}>
          添加+{' '}
        </Btn>
      </div>
      <div className="temp-password-tip">
        <div>注意：</div>
        <div>1、为保证门锁安全，密码值无法通过任何方式二次查阅</div>
        <div>2、此列表仅展示有效期内的密码，密码失效后将自动从列表中移除。</div>
      </div>
    </div>
  );
}
