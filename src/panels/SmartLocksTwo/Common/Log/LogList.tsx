import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { Steps } from '@custom/Step';
import { StatusTip } from '@src/components/StatusTip';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { tips } from '@src/libs/wxlib';
import { useLoadMore } from './useLoadMore';
import { InfiniteScroll } from 'antd-mobile';

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

type LogItem = {label: string, time: string, data: any};
interface Log{
  hasMore: boolean,
  context: string;
  children: LogItem[]
}

interface LogListProps {
  logType: 'action' | 'event';
  activeKey: 'action' | 'event';
  dateTime: [Date, Date];
  templateMap: any;
}

export function LogList({ logType, activeKey, dateTime, templateMap }: LogListProps) {
  // 默认显示最近一个月的数据
  const alarmTipMap = templateMap?.alarm_lock.params[0].define.mapping;

  const [data, setData] = useState<LogItem[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const isEmpty = isLoaded && !data.length;
  const getActionLog = async (context): Promise<Log> => {
    // tips.showLoading();
    const date = dateTime;
    const res = await sdk.requestTokenApi('AppGetDeviceMultiActionHistories', {
      DeviceId: sdk.deviceId,
      Context: context,
      MinTime: +dayjs(date[0]).startOf('day'),
      MaxTime: +dayjs(date[0]).endOf('day'),
      Limit: 20,
      ActionIds: ['unlock_remote', 'add_fingerprint', 'add_card', 'add_face'],
    });
    // tips.hide();
    const logList = res.ActionHistories.filter(log => log.ActionId !== 'get_ipc_device_id');
    return {
      hasMore: !res.Listover,
      context: res.Context,
      children: logList.map(log => ({
        label: log.ActionName,
        time: dayjs.unix(log.RspTime).format('YYYY-MM-DD HH:mm'),
      })),
    };
  };
  const getEventlog = async (context): Promise<Log> => {
    // tips.showLoading();
    const date = dateTime;
    const res = await sdk.requestTokenApi('AppListEventHistory', {
      DeviceId: sdk.deviceId,
      Context: context,
      StartTime: Math.floor(+dayjs(date[0]).startOf('day') / 1000),
      EndTime: Math.floor(+dayjs(date[0]).endOf('day') / 1000),
      Size: 20,
    });
    // tips.hide();
    const logList = res.EventHistory;
    return {
      hasMore: !res.Listover,
      context: res.Context,
      children: logList.map(log => ({
        label: eventMap[log.EventId],
        data: JSON.parse(log.Data),
        time: dayjs(log.TimeStamp).format('YYYY-MM-DD HH:mm'),
      })),
    };
  };
  // 后端加载日志数据
  const loadLog = async (context) => {
    try {
      const logList = await (logType === 'action' ? getActionLog(context) : getEventlog(context));
      setLoaded(true);
      setData([...data, ...logList.children]);
      return logList;
    } catch (err) {
      console.error('get log err', err);
      // tips.showError('获取日志信息出错');
      throw err;
    }
  };
  const { loadMore, hasMore, reset } = useLoadMore(loadLog);
  useEffect(() => {
    setData([]);
    reset();
    setLoaded(false);
  }, [dateTime, activeKey]);

  return (
    <div className="log-list">
      {isEmpty ? (
        <div className="no-record-tips">
          <StatusTip emptyMessage='暂无数据' status='empty' className='empty'/>
        </div>
      ) : (
        <>
          <div className="group">{dayjs(dateTime[0]).format('YYYY年MM月DD日') || ''}</div>
            <div>
              <div className="list">
                <Steps direction="vertical">
                  {data.map(({ label, time, data }, index) => {
                    let labelNode: React.ReactNode = label;
                    if (label === '门锁告警') {
                      labelNode = (
                        <div>{label}: <span className='adm-step-description'>
                          {alarmTipMap[data.alarm_tip]}
                          </span>
                        </div>
                      );
                    }
                    return <Step
                      key={index}
                      // icon={<div>aaa</div>}
                      title={labelNode}
                      status={index ? 'wait' : 'finish'}
                      description={time}
                    />;
                  })}
                </Steps>
                <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
              </div>
            </div>
        </>
      )}
    </div>
  );
}
