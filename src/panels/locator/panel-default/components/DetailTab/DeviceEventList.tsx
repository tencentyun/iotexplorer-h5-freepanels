import React, { useMemo } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { StatusTip } from '@components/StatusTip';
import { SectionList } from '@components/SectionList';
import { ScrollView } from '@components/ScrollView';
import { useInfiniteList } from '@hooks/useInfiniteList';
import { DeviceFenceEvent, AlertConditionType } from '../../types';
import * as models from '../../models';

import './DeviceEventList.less';

const padNumber = num => num < 10 ? `0${num}` : `${num}`;

interface DeviceFenceEventGroup {
  year: number;
  month: number;
  date: number;
  events: {
    type: AlertConditionType;
    timeStr: string;
  }[];
}

const groupEventByDate = (list: DeviceFenceEvent[]) => {
  const result: DeviceFenceEventGroup[] = [];

  list.sort((a, b) => b.CreateTime - a.CreateTime)
    .forEach((event) => {
      const d = new Date(event.CreateTime);
      const year = d.getFullYear();
      const month = d.getMonth() + 1;
      const date = d.getDate();
      const hour = d.getHours();
      const minute = d.getMinutes();
      const second = d.getSeconds();

      let group = result.length > 0 ? result[result.length - 1] : null;
      if (!group || group.date !== date || group.month !== month || group.year !== year) {
        group = { year, month, date, events: [] };
        result.push(group);
      }

      group.events.push({
        type: event.EventType,
        timeStr: `${year}/${padNumber(month)}/${padNumber(date)} ${padNumber(hour)}:${padNumber(minute)}:${padNumber(second)}`,
      });
    });

  return result;
};


function DeviceEventGroup(data: DeviceFenceEventGroup) {
  return (
    <div className="locator-device-event-group">
      <div className="locator-device-event-group-time">
        <span className="locator-device-event-group-date">{data.date}</span>
        <span className="locator-device-event-group-month">{data.month}月</span>
      </div>
      <SectionList>
        {data.events.map((event, index) => (
          <SectionList.Item
            key={index}
            label={event.type === AlertConditionType.In ? '进入围栏' : '走出围栏'}
          >
            {event.timeStr}
          </SectionList.Item>
        ))}
      </SectionList>
    </div>
  );
}

export function DeviceEventList() {
  const [listState, { loadMore, statusTip }] = useInfiniteList({
    statusTipOpts: {
      emptyMessage: '暂无告警',
      fillContainer: true,
    },
    getData: async ({ context: offset }) => {
      offset = offset || 0;

      const now = Date.now();

      // TODO: AppGetFenceEventList 接口调整
      let { list, total } = await models.getFenceEventList({
        ProductId: sdk.productId,
        DeviceName: sdk.deviceName,
        Offset: offset,
        Limit: 100,
        FenceId: 0,
        StartTime: now - 30 * 24 * 60 * 60 * 1000,
        EndTime: now,
      });

      const nextOffset = list.length + offset;

      if (!list.length) {
        return { loadFinish: true };
      }

      return { context: nextOffset, list, loadFinish: nextOffset >= total };
    },
  });

  const groupedList = useMemo(() => groupEventByDate(listState.list), [listState.list]);

  return statusTip ? (
    <StatusTip
      {...statusTip}
    />
  ) : (
    <ScrollView
      className="locator-device-event-list-container"
      onReachBottom={() => {
        if (!listState.loadFinish && !listState.loading) {
          loadMore();
        }
      }}
    >
      <div className={classNames('locator-device-event-list', { empty: listState.list.length === 0 })}>
        {groupedList.map((data) => (
          <DeviceEventGroup
            key={`${data.year}/${data.month}/${data.date}`}
            {...data}
          />
        ))}

        {listState.loading && (
          <StatusTip status="loading" />
        )}
      </div>
    </ScrollView>
  );
}
