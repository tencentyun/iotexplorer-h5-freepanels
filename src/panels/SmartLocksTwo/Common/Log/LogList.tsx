import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Steps } from '@custom/Step';
import { Icon } from '@custom/Icon';
import { DatePicker } from '@custom/DatePicker';
import { Empty } from '@custom/Empty';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { tips } from '@src/libs/wxlib';
const { Step } = Steps;

const eventMap = {
  doorbell: '门铃呼叫',
  unlock_fingerprint: '指纹解锁',
  unlock_card: '卡片解锁',
  unlock_password: '密码解锁',
  unlock_face: '人脸解锁',
  alarm_lock: '门锁告警',
  unlock_key: '钥匙解锁',
  unlock_temporary_password: '临时密码解锁',
  add_fingerprint_result: '上报指纹添加成功',
  add_password_result: '上报密码添加成功',
  add_card_result: '上报卡片添加成功',
  add_face_result: '上报人脸添加成功',
  door_locked: '门已上锁',
  open_inside: '门从内侧打开',
  unlock_remote_result: '远程解锁',
};

interface Log{
  groupDate: number,
  children: {label: string, time: string}[]
}

type LogGroup = Log[];

const getStartDate = () => {
  const date = new Date();
  date.setHours(0);
  return date;
};

export function LogList({ logType, activeKey }) {
  // 默认显示最近一个月的数据
  const [dateTime, setDateTime] = useState([getStartDate(), new Date()]);
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState<LogGroup>([]);
  const [isLoaded, setLoaded] = useState(false);
  const isEmpty = isLoaded && !data.length;
  const getActionLog = async (date: [Date, Date]) => {
    // tips.showLoading();
    const res = await sdk.requestTokenApi('AppGetDeviceMultiActionHistories', {
      DeviceId: sdk.deviceId,
      MinTime: +dayjs(date[0]).startOf('day'),
      MaxTime: +dayjs(date[0]).endOf('day'),
      Limit: 500,
      ActionIds: ['unlock_remote', 'add_fingerprint', 'add_card', 'add_face'],
    });
    // tips.hide();
    const logList = res.ActionHistories.filter(log => log.ActionId !== 'get_ipc_device_id');
    return [
      {
        groupDate: date[0].getTime(), // 分组时间
        children: logList.map(log => ({
          label: log.ActionName,
          time: dayjs.unix(log.RspTime).format('YYYY-MM-DD HH:mm'),
        })),
      },
    ];
  };
  const getEventlog = async (date) => {
    // tips.showLoading();
    const res = await sdk.requestTokenApi('AppListEventHistory', {
      DeviceId: sdk.deviceId,
      StartTime: Math.floor(+dayjs(date[0]).startOf('day') / 1000),
      EndTime: Math.floor(+dayjs(date[0]).endOf('day') / 1000),
      Limit: 500,
    });
    // tips.hide();
    const logList = res.EventHistory;
    return [
      {
        groupDate: date[0].getTime(), // 分组时间
        children: logList.map(log => ({
          label: eventMap[log.EventId],
          time: dayjs(log.TimeStamp).format('YYYY-MM-DD HH:mm'),
        })),
      },
    ];
  };
  // 后端加载日志数据
  const loadLog = async (dateTime, logType) => {
    try {
      const logList = await (logType === 'action' ? getActionLog(dateTime) : getEventlog(dateTime));
      console.log({ logList });
      setLoaded(true);
      setData(logList);
    } catch (err) {
      console.error('get log err', err);
      tips.showError('获取日志信息出错');
    }
  };

  useEffect(() => {
    if (logType === activeKey) {
      loadLog(dateTime, logType);
    }
  }, [dateTime, activeKey]);

  return (
    <div className="log-list">
      {isEmpty ? (
        <Empty />
      ) : (
        <>
          {data.map(({ groupDate, children }, index) => (
            <div key={index}>
              <div className="group">{dayjs(groupDate).format('YYYY年MM月DD日') || ''}</div>
              <div className="list">
                <Steps direction="vertical">
                  {children.map(({ label, time }, index) => (
                    <Step
                      key={index}
                      // icon={<div>aaa</div>}
                      title={label}
                      status={index ? 'wait' : 'finish'}
                      description={time}
                    />
                  ))}
                </Steps>
              </div>
            </div>
          ))}
          <div className="date-pick" onClick={setVisible.bind(null, true)}>
            <Icon name="date" size="large"></Icon>
          </div>

          <DatePicker
            visible={visible}
            showSemicolon={false}
            value={dateTime[0]}
            showUnit={true}
            mask={false}
            showTime={false}
            itemHeight={58}
            height={175}
            showTwoDigit={true}
            onConfirm={(startDate) => {
              setDateTime([startDate, new Date()]);
              setVisible(false);
            }}
            onCancel={setVisible.bind(null, false)}
          />
        </>
      )}
    </div>
  );
}
