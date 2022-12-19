import React, { useEffect, useRef, useState, useMemo } from 'react';
import dayjs from 'dayjs';
import { Steps } from '@custom/Step';
import { StatusTip } from '@src/components/StatusTip';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { useLoadMore } from './useLoadMore';
import { InfiniteScroll, Dropdown, Radio, Space } from 'antd-mobile';

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

type LogItem = {label: string, time: string, data: any, event: string };
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

type LogType = 'all' | 'doorbell' | 'event';

const logTypeNames: Record<LogType, string> = {
  all: '全部日志',
  doorbell: '门铃呼叫',
  event: '告警信息',
};

export function LogList({ activeKey, dateTime, templateMap }: LogListProps) {
  // 默认显示最近一个月的数据
  const alarmTipMap = templateMap?.alarm_lock.params[0].define.mapping;
  const dropdownRef = useRef<any>();
  const [data, setData] = useState<LogItem[]>([]);
  const [isLoaded, setLoaded] = useState(false);
  const isEmpty = isLoaded && !data.length;
  const [logType, setLogType] = useState<LogType>('all');
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
        event: log.EventId,
        data: JSON.parse(log.Data),
        time: dayjs(log.TimeStamp).format('YYYY-MM-DD HH:mm'),
      })),
    };
  };
  // 后端加载日志数据
  const loadLog = async (context) => {
    try {
      const logList = await getEventlog(context);
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

  const SPLIT_STR = '$*$';
  const renderLabelNode = ({ label, data, event }) => {
    let labelNode: React.ReactNode = label;
    switch (label) {
      case '门锁告警':
        labelNode = (
          <div>{label}: <span className='adm-step-description'>
            {alarmTipMap[data.alarm_tip]}
            </span>
          </div>
        );
        break;
      case '指纹解锁':
      case '卡片解锁':
      case '密码解锁':
      case '人脸解锁': {
        const [id, name] = data.id.split(SPLIT_STR);
        if (name) {
          labelNode = `${name}使用${label}`;
        }
      }
        break;
    }
    return labelNode;
  };

  useEffect(() => {
    dropdownRef.current?.close();
  }, [logType]);

  const filteredData = useMemo(() => {
    if (logType === 'all') {
      return data;
    }
    if (logType === 'doorbell') {
      return data.filter(item => item.event === 'doorbell');
    }
    return data.filter(item => item.event !== 'doorbell');
  }, [data, logType]);

  return (
    <div className="log-list">
      <div>
        <Dropdown ref={dropdownRef}>
          <Dropdown.Item title={logTypeNames[logType]} key="logType">
            <div style={{ padding: 12 }}>
              <Radio.Group defaultValue='all' onChange={(v: LogType) => setLogType(v)}>
                {
                  Object.keys(logTypeNames).map((key) => (
                    <Space direction='vertical' block key={key}>
                      <Radio block value={key} style={{ marginTop: 10 }}>
                        {logTypeNames[key]}
                      </Radio>
                    </Space>
                  ))
                }
              </Radio.Group>
                </div>
            </Dropdown.Item>
          </Dropdown>
      </div>

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
                  {filteredData.map(({ label, time, data, event }, index) => {
                    const labelNode = renderLabelNode({ label, data, event });
                    return <Step
                      key={index}
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
