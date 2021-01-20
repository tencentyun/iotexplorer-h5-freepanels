import React, { useMemo } from 'react';
import classNames from 'classnames';
import sdk from 'qcloud-iotexplorer-h5-panel-sdk';
import { StatusTip } from '@components/StatusTip';
import { SectionList } from '@components/SectionList';
import { ScrollView } from '@components/ScrollView';
import { useInfiniteList } from '@hooks/useInfiniteList';
import { DeviceFenceEvent, AlertConditionType } from '../../types';
import { padNumber } from '../../utils';
import * as models from '../../models';

import './FenceEventList.less';

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
    <div className="locator-fence-event-group">
      <div className="locator-fence-event-group-time">
        <span className="locator-fence-event-group-date">{data.date}</span>
        <span className="locator-fence-event-group-month">{data.month}月</span>
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

interface FenceEventListContext {
  offset: number;
  startTime: number;
  endTime: number;
}

const EventListMaxLenTime = 365 * 24 * 60 * 60 * 1000;
const EventListPageSize = 100;

export function FenceEventList() {
  const [listState, { loadMore, statusTip }] = useInfiniteList({
    statusTipOpts: {
      emptyMessage: '暂无报警',
      fillContainer: true,
    },
    getData: async ({ context } : { context: FenceEventListContext }) => {
      if (!context) {
        const now = Date.now();
        context = {
          offset: 0,
          endTime: now,
          startTime: now - EventListMaxLenTime,
        };
      }

      const resp = await models.getFenceEventList({
        ProductId: sdk.productId,
        DeviceName: sdk.deviceName,
        Offset: context.offset,
        Limit: EventListPageSize,
        StartTime: context.startTime,
        EndTime: context.endTime,
      });

      const list: DeviceFenceEvent[] = resp.list;
      list.sort((a, b) => b.CreateTime - a.CreateTime);

      const nextOffset = context.offset + EventListPageSize;

      return {
        context: {
          ...context,
          offset: nextOffset,
        },
        list,
        loadFinish: nextOffset >= resp.total,
      };
    },
  });

  const groupedList = useMemo(() => groupEventByDate(listState.list), [listState.list]);

  return statusTip ? (
    <StatusTip
      {...statusTip}
    />
  ) : (
    <ScrollView
      className="locator-fence-event-list-container"
      onReachBottom={() => {
        if (!listState.loadFinish && !listState.loading) {
          loadMore();
        }
      }}
    >
      <div className={classNames('locator-fence-event-list', { empty: listState.list.length === 0 })}>
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
